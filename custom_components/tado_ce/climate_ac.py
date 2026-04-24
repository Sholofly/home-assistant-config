"""Tado CE Air Conditioning Climate Entity — AC mode, fan speed, swing control."""  # zone config values are heterogeneous
  # HA entity interface
from __future__ import annotations

import asyncio
import logging
from typing import TYPE_CHECKING, Any

from homeassistant.components.climate import ATTR_HVAC_MODE, ClimateEntity  # type: ignore[attr-defined]
from homeassistant.components.climate.const import (
    FAN_AUTO,
    FAN_HIGH,
    FAN_LOW,
    FAN_MEDIUM,
    SWING_ON,
    ClimateEntityFeature,
    HVACAction,
    HVACMode,
)
from homeassistant.const import ATTR_TEMPERATURE, UnitOfTemperature
from homeassistant.core import CALLBACK_TYPE, Event, EventStateChangedData, callback
from homeassistant.exceptions import HomeAssistantError
from homeassistant.helpers.restore_state import RestoreEntity
from homeassistant.helpers.update_coordinator import CoordinatorEntity

from .climate_helpers import (
    api_call_with_rollback,
    read_external_sensor,
    subscribe_external_sensors,
    unsubscribe_external_sensors,
)
from .const import DOMAIN
from .device_manager import get_zone_device_info
from .entity_registry import ENTITY_REGISTRY
from .format_helpers import (
    format_overlay_type as _format_overlay_type,
)
from .format_helpers import (
    format_zone_type as _format_zone_type,
)
from .helpers import (
    async_trigger_immediate_refresh,
    build_timer_termination,
    get_zone_overlay_termination,
)
from .optimistic_helpers import (
    OptimisticUpdateResult,
    clear_optimistic_state,
    resolve_optimistic_update,
    set_optimistic_fields,
)
from .ratelimit import async_check_bootstrap_reserve_or_raise as _check_bootstrap_reserve_or_raise
from .schedule_helpers import get_current_schedule_target
from .write_optimizer import ActionGuard

if TYPE_CHECKING:
    from .coordinator import TadoDataUpdateCoordinator

_LOGGER = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# AC HVAC / Fan mode mappings (inlined from climate_maps.py)
# ---------------------------------------------------------------------------

TADO_TO_HA_HVAC_MODE = {
    "COOL": HVACMode.COOL,
    "HEAT": HVACMode.HEAT,
    "DRY": HVACMode.DRY,
    "FAN": HVACMode.FAN_ONLY,
    "AUTO": HVACMode.HEAT_COOL,
}

HA_TO_TADO_HVAC_MODE = {v: k for k, v in TADO_TO_HA_HVAC_MODE.items()}

# Fan level mapping - Tado uses SILENT, LEVEL1-5, AUTO
# Map to HA's limited fan modes (auto, low, medium, high)
TADO_TO_HA_FAN = {
    "AUTO": FAN_AUTO,
    "SILENT": FAN_LOW,
    "LEVEL1": FAN_LOW,
    "LEVEL2": FAN_LOW,
    "LEVEL3": FAN_MEDIUM,
    "LEVEL4": FAN_HIGH,
    "LEVEL5": FAN_HIGH,
    # Legacy mappings
    "HIGH": FAN_HIGH,
    "MIDDLE": FAN_MEDIUM,
    "LOW": FAN_LOW,
}

HA_TO_TADO_FAN = {
    FAN_AUTO: "AUTO",
    FAN_LOW: "LEVEL1",
    FAN_MEDIUM: "LEVEL3",
    FAN_HIGH: "LEVEL5",
}

# Canonical ordering of Tado fan levels (quietest → loudest)
_TADO_FAN_ORDER = [
    "SILENT",
    "LOW",
    "LEVEL1",
    "ONE",
    "MIDDLE",
    "LEVEL2",
    "TWO",
    "LEVEL3",
    "THREE",
    "LEVEL4",
    "FOUR",
    "HIGH",
    "LEVEL5",
]


def _assign_fan_bucket(index: int, low_end: int, high_start: int) -> str:
    """Assign a fan level index to a low/medium/high HA bucket."""
    if index < low_end:
        return FAN_LOW
    if index >= high_start:
        return FAN_HIGH
    return FAN_MEDIUM


def build_fan_mapping(fan_levels: set[Any]) -> tuple[dict[str, Any], dict[str, Any]]:
    """Build bidirectional fan level mapping from actual AC capabilities.

    Strategy:
      1. AUTO always maps to FAN_AUTO
      2. SILENT always maps to FAN_LOW (quietest)
      3. Remaining levels sorted and divided evenly into low/medium/high buckets
      4. ha→tado picks the HIGHEST tado level in each bucket
    """
    tado_to_ha: dict[str, str] = {}
    ha_to_tado: dict[str, str] = {}

    if "AUTO" in fan_levels:
        tado_to_ha["AUTO"] = FAN_AUTO
        ha_to_tado[FAN_AUTO] = "AUTO"

    if "SILENT" in fan_levels:
        tado_to_ha["SILENT"] = FAN_LOW

    other_levels = sorted(
        [f for f in fan_levels if f not in ("AUTO", "SILENT")],
        key=lambda x: _TADO_FAN_ORDER.index(x) if x in _TADO_FAN_ORDER else 99,
    )

    n = len(other_levels)
    if n == 0:
        if "SILENT" in fan_levels:
            ha_to_tado[FAN_LOW] = "SILENT"
        return tado_to_ha, ha_to_tado

    low_end = max(1, n // 3)
    high_start = n - max(1, n // 3)

    for i, level in enumerate(other_levels):
        tado_to_ha[level] = _assign_fan_bucket(i, low_end, high_start)

    for ha_mode in [FAN_LOW, FAN_MEDIUM, FAN_HIGH]:
        candidates = [lvl for lvl, ha in tado_to_ha.items() if ha == ha_mode and lvl not in ("AUTO", "SILENT")]
        if candidates:
            ha_to_tado[ha_mode] = candidates[-1]

    if FAN_LOW not in ha_to_tado and "SILENT" in fan_levels:
        ha_to_tado[FAN_LOW] = "SILENT"

    return tado_to_ha, ha_to_tado


def _build_fan_modes(
    ac_caps: dict[str, Any], zone_id: str,
) -> tuple[dict[str, Any], dict[str, Any], list[str]]:
    """Build fan mode mappings from AC capabilities.

    Returns (tado_to_ha, ha_to_tado, fan_modes_list).
    """
    fan_levels: set[str] = set()
    for mode_caps in ac_caps.values():
        if isinstance(mode_caps, dict):
            if "fanLevel" in mode_caps:
                fan_levels.update(mode_caps["fanLevel"])
            elif "fanSpeeds" in mode_caps:
                fan_levels.update(mode_caps["fanSpeeds"])

    if fan_levels:
        tado_to_ha, ha_to_tado = build_fan_mapping(fan_levels)
        fan_modes = list(dict.fromkeys(tado_to_ha.values()))
        _LOGGER.debug(
            "AC zone %s fan modes: %s (from %s), ha→tado: %s",
            zone_id, fan_modes, fan_levels, ha_to_tado,
        )
        return tado_to_ha, ha_to_tado, fan_modes

    return dict(TADO_TO_HA_FAN), dict(HA_TO_TADO_FAN), [FAN_AUTO, FAN_LOW, FAN_MEDIUM, FAN_HIGH]


def _build_swing_modes(ac_caps: dict[str, Any], zone_id: str) -> list[str]:
    """Build swing mode list from AC capabilities."""
    all_v_swings: set[str] = set()
    all_h_swings: set[str] = set()
    for mode in ("COOL", "HEAT", "DRY", "FAN", "AUTO"):
        mode_caps = ac_caps.get(mode) or {}
        if "verticalSwing" in mode_caps:
            all_v_swings.update(mode_caps["verticalSwing"])
        if "horizontalSwing" in mode_caps:
            all_h_swings.update(mode_caps["horizontalSwing"])

    swing_modes: list[str] = []
    has_v_off = "OFF" in all_v_swings
    has_h_off = "OFF" in all_h_swings
    has_v_on = any(v != "OFF" for v in all_v_swings)
    has_h_on = any(h != "OFF" for h in all_h_swings)

    if has_v_off or has_h_off or (not all_v_swings and not all_h_swings):
        swing_modes.append("off")
    if has_v_on:
        swing_modes.append("vertical")
    if has_h_on:
        swing_modes.append("horizontal")
    if has_v_on and has_h_on:
        swing_modes.append("both")

    result = swing_modes or ["off"]
    _LOGGER.debug(
        "AC zone %s swing modes: %s (v_swings=%s, h_swings=%s)",
        zone_id, result, all_v_swings, all_h_swings,
    )
    return result


class TadoACClimate(CoordinatorEntity["TadoDataUpdateCoordinator"], ClimateEntity, RestoreEntity):
    """Tado CE Air Conditioning Climate Entity."""

    _attr_has_entity_name = True

    @staticmethod
    def _build_hvac_modes(ac_caps: dict[str, Any]) -> list[HVACMode]:
        """Build HVAC modes list from AC capabilities."""
        modes: list[HVACMode] = [HVACMode.OFF]
        for tado_mode in ["COOL", "HEAT", "DRY", "FAN"]:
            if tado_mode in ac_caps:
                ha_mode = TADO_TO_HA_HVAC_MODE.get(tado_mode)
                if ha_mode and ha_mode not in modes:
                    modes.append(ha_mode)
        if "AUTO" in ac_caps and HVACMode.HEAT_COOL not in modes:
            modes.append(HVACMode.HEAT_COOL)
        return modes

    @staticmethod
    def _extract_temp_range(ac_caps: dict[str, Any]) -> tuple[float, float, float]:
        """Extract min/max/step temperature from AC capabilities."""
        for mode in ["COOL", "HEAT", "AUTO", "DRY"]:
            if mode in ac_caps and "temperatures" in ac_caps[mode]:
                temp_caps = ac_caps[mode]["temperatures"].get("celsius") or {}
                return temp_caps.get("min", 16), temp_caps.get("max", 30), temp_caps.get("step", 1)
        return 16, 30, 1

    def __init__(
        self,
        coordinator: TadoDataUpdateCoordinator,
        zone_id: str,
        zone_name: str,
        capabilities: dict[str, Any],
        home_id: str,
    ) -> None:
        """Initialize."""
        super().__init__(coordinator)
        self._zone_id = zone_id
        self._zone_name = zone_name
        self._home_id = home_id
        self._capabilities = capabilities
        self._entry_id = coordinator.config_entry.entry_id
        self._entity_type = "climate_ac"

        _meta = ENTITY_REGISTRY["climate_ac"]
        self._attr_name = None
        self._attr_translation_key = _meta.translation_key
        self._attr_unique_id = f"tado_ce_{home_id}_{_meta.unique_id_suffix.format(zone_id=zone_id)}"
        self._attr_temperature_unit = UnitOfTemperature.CELSIUS
        self._attr_device_info = get_zone_device_info(zone_id, zone_name, "AIR_CONDITIONING", home_id)

        ac_caps = capabilities.get("ac_capabilities") or {}

        # Build supported features
        features = (
            ClimateEntityFeature.TARGET_TEMPERATURE | ClimateEntityFeature.TURN_OFF | ClimateEntityFeature.TURN_ON
        )
        has_fan = any(
            (ac_caps.get(mode) or {}).get("fanLevel") or (ac_caps.get(mode) or {}).get("fanSpeeds")
            for mode in ["COOL", "HEAT", "DRY", "FAN", "AUTO"]
        )
        if has_fan:
            features |= ClimateEntityFeature.FAN_MODE
        has_swing = any(
            (ac_caps.get(mode) or {}).get("verticalSwing") or (ac_caps.get(mode) or {}).get("horizontalSwing")
            for mode in ["COOL", "HEAT", "DRY", "FAN", "AUTO"]
        )
        if has_swing:
            features |= ClimateEntityFeature.SWING_MODE
        self._attr_supported_features = features

        self._attr_hvac_modes = self._build_hvac_modes(ac_caps)
        _LOGGER.debug("AC zone %s HVAC modes: %s", zone_id, self._attr_hvac_modes)

        self._tado_to_ha_fan, self._ha_to_tado_fan, self._attr_fan_modes = _build_fan_modes(ac_caps, zone_id)
        self._attr_swing_modes = _build_swing_modes(ac_caps, zone_id) if has_swing else None

        self._attr_min_temp, self._attr_max_temp, self._attr_target_temperature_step = self._extract_temp_range(ac_caps)

        self._attr_current_temperature = None
        self._attr_target_temperature = None
        self._attr_hvac_mode = None
        self._attr_hvac_action = None
        self._attr_fan_mode = self._attr_fan_modes[0] if self._attr_fan_modes else None
        self._attr_swing_mode = self._attr_swing_modes[0] if self._attr_swing_modes else None
        self._attr_available = False
        self._attr_current_humidity = None

        self._overlay_type = None
        self._ac_power_percentage = None

        self._temperature_source = "tado"
        self._humidity_source = "tado"
        self._external_temp_sensor = ""
        self._external_humidity_sensor = ""

        self._optimistic_set_at: float | None = None
        self._optimistic_sequence: int | None = None
        self._optimistic_preserved: dict[str, Any] | None = None
        self._expected_hvac_mode: HVACMode | None = None
        self._expected_hvac_action: HVACAction | None = None

        # Unsubscribe callback for zones_updated signal
        self._unsub_zones_updated = None

        # Unsubscribe callback for zone config changes
        self._unsub_zone_config = None

        # Unsubscribe callback for AC capabilities updated signal
        self._unsub_ac_caps = None

        # Unsubscribe callbacks for external sensor state change listeners
        self._unsub_external_sensors: list[CALLBACK_TYPE] = []

    def _calculate_hvac_action(self, hvac_mode: HVACMode | None = None, ac_power_on: bool | None = None) -> HVACAction:
        """Calculate hvac_action for AC zone.

        Updated for optimistic update fix.

        Priority:
        1. If hvac_mode == OFF → OFF
        2. If in optimistic window with expected action → return expected action
        3. If API confirms AC is off → IDLE
        4. Mode-based action (COOL→COOLING, HEAT→HEATING, etc.)

        Args:
            hvac_mode: Optional mode for optimistic updates.
                      If None, uses self._attr_hvac_mode.
            ac_power_on: Optional AC power state from API.
                        If None, assumes AC is ON (for optimistic updates).
                        If False, returns IDLE (API confirms AC is off).

        Returns:
            HVACAction based on mode (COOLING, HEATING, DRYING, FAN, IDLE, or OFF)

        """
        mode = hvac_mode if hvac_mode is not None else self._attr_hvac_mode

        # OFF mode always returns OFF
        if mode == HVACMode.OFF:
            return HVACAction.OFF

        # If we have optimistic state with expected action, use it
        # This ensures optimistic updates work immediately
        if self._expected_hvac_action is not None:
            return self._expected_hvac_action

        # If API confirms AC is off, return IDLE
        if ac_power_on is False:
            return HVACAction.IDLE

        # Mode-based action (AC is ON or assumed ON for optimistic)
        if mode == HVACMode.COOL:
            return HVACAction.COOLING
        if mode == HVACMode.HEAT:
            return HVACAction.HEATING
        if mode == HVACMode.DRY:
            return HVACAction.DRYING
        if mode == HVACMode.FAN_ONLY:
            return HVACAction.FAN
        if mode == HVACMode.HEAT_COOL:
            # Tado AUTO mode - AC decides to heat or cool as needed
            return HVACAction.IDLE

        return HVACAction.IDLE

    async def async_added_to_hass(self) -> None:
        """Register listeners when entity is added to hass.

        CoordinatorEntity handles update subscription
        automatically — removed manual SIGNAL_ZONES_UPDATED and
        SIGNAL_AC_CAPABILITIES_UPDATED dispatcher signals.
        AC capabilities now read from coordinator.data["ac_capabilities"]
        in _handle_coordinator_update().
        Zone config listener retained (not a coordinator update).
        """
        await super().async_added_to_hass()

        # Restore last known target temperature across HA restarts (#182)
        last_state = await self.async_get_last_state()
        if last_state and last_state.attributes.get(ATTR_TEMPERATURE) is not None:
            self._attr_target_temperature = last_state.attributes[ATTR_TEMPERATURE]
            _LOGGER.debug(
                "AC %s: Restored target temperature %s from previous state",
                self._zone_name,
                self._attr_target_temperature,
            )
        elif self._attr_target_temperature is None:
            # First install or no previous state — default to 24°C so climate
            # card controls are usable immediately (#182 follow-up)
            self._attr_target_temperature = 24.0
            _LOGGER.debug(
                "AC %s: No previous state, defaulting target temperature to %s",
                self._zone_name,
                self._attr_target_temperature,
            )

        # Listen for zone config changes
        zone_config_manager = self.coordinator.zone_config_manager
        if zone_config_manager:

            @callback
            def _handle_zone_config_change(zone_id: str, key: str, value: Any) -> None:
                """Handle zone config change."""
                if zone_id == self._zone_id and key in ("min_temp", "max_temp"):
                    self._update_temp_limits()
                    self.async_write_ha_state()
                    _LOGGER.debug("AC %s: Zone config %s changed to %s", self._zone_name, key, value)

            self._unsub_zone_config = zone_config_manager.add_listener(_handle_zone_config_change)  # type: ignore[assignment]
            # Initial update of temp limits
            self._update_temp_limits()

        # Subscribe to external sensor state changes for real-time updates
        self._subscribe_external_sensors()

    async def async_will_remove_from_hass(self) -> None:
        """Unregister listeners when entity is removed.

        CoordinatorEntity handles update unsubscription.
        Only zone config and external sensor listeners need manual cleanup.
        """
        self._unsubscribe_external_sensors()
        if self._unsub_zone_config:
            self._unsub_zone_config()
            self._unsub_zone_config = None
        await super().async_will_remove_from_hass()

    @callback
    def _subscribe_external_sensors(self) -> None:
        """Subscribe to external sensor state changes for real-time updates."""
        unsubscribe_external_sensors(self._unsub_external_sensors)

        zcm = self.coordinator.zone_config_manager

        @callback
        def _on_external_sensor_change(event: Event[EventStateChangedData]) -> None:
            """Handle external sensor state change — update AC climate entity."""
            ext_temp = read_external_sensor(self.hass, zcm, self._zone_id, "external_temp_sensor")
            if ext_temp is not None:
                self._attr_current_temperature = ext_temp
                self._temperature_source = "external"

            ext_hum = read_external_sensor(self.hass, zcm, self._zone_id, "external_humidity_sensor")
            if ext_hum is not None:
                self._attr_current_humidity = ext_hum
                self._humidity_source = "external"

            self.async_write_ha_state()
            _LOGGER.debug("AC %s: External sensor updated → refreshed climate state", self._zone_name)

        self._unsub_external_sensors = subscribe_external_sensors(
            self, self._zone_id, _on_external_sensor_change,
        )

    @callback
    def _unsubscribe_external_sensors(self) -> None:
        """Unsubscribe from external sensor state change listeners."""
        unsubscribe_external_sensors(self._unsub_external_sensors)

    @callback
    def _update_temp_limits(self) -> None:
        """Update min/max temp from zone config.

        Only applies user-explicit overrides (has_zone_override check).
        If user never set min/max_temp in Zone Configuration, use API
        capabilities directly — avoids DEFAULT_ZONE_CONFIG (25°C max)
        capping AC zones that support up to 30°C (fixes #180).
        """
        zone_config_manager = self.coordinator.zone_config_manager
        if zone_config_manager:
            caps_min = self._get_capabilities_temp_limit("min", 16)
            caps_max = self._get_capabilities_temp_limit("max", 30)

            if zone_config_manager.has_zone_override(self._zone_id, "min_temp"):
                # User explicitly set min_temp — clamp to hardware minimum
                user_min = zone_config_manager.get_zone_value(self._zone_id, "min_temp", caps_min)
                self._attr_min_temp = max(float(user_min), caps_min)
            else:
                self._attr_min_temp = caps_min

            if zone_config_manager.has_zone_override(self._zone_id, "max_temp"):
                # User explicitly set max_temp — clamp to hardware maximum
                user_max = zone_config_manager.get_zone_value(self._zone_id, "max_temp", caps_max)
                self._attr_max_temp = min(float(user_max), caps_max)
            else:
                self._attr_max_temp = caps_max

    def _get_capabilities_temp_limit(self, limit_type: str, default: float) -> float:
        """Get temperature limit from AC capabilities.

        Args:
            limit_type: 'min' or 'max'
            default: Default value if not found in capabilities

        Returns:
            Temperature limit from capabilities or default

        """
        ac_caps = self._capabilities.get("ac_capabilities") or {}
        for mode in ["COOL", "HEAT", "AUTO", "DRY"]:
            if mode in ac_caps and "temperatures" in ac_caps[mode]:
                temp_caps = ac_caps[mode]["temperatures"].get("celsius") or {}
                if limit_type in temp_caps:
                    return temp_caps[limit_type]  # type: ignore[no-any-return]
        return default

    @property
    def extra_state_attributes(self) -> dict[str, Any] | None:
        """Return extra state attributes."""
        attrs: dict[str, Any] = {
            "overlay_type": _format_overlay_type(self._overlay_type),
            "ac_power_percentage": self._ac_power_percentage,
            "zone_id": self._zone_id,
            "zone_type": _format_zone_type("AIR_CONDITIONING"),
            "temperature_source": self._temperature_source,
            "humidity_source": self._humidity_source,
            "external_temp_sensor": self._external_temp_sensor,
            "external_humidity_sensor": self._external_humidity_sensor,
        }
        # Schedule Preview — show current schedule target temperature
        scheduled_temp = get_current_schedule_target(
            self._zone_id,
            data_loader=self.coordinator.data_loader,
        )
        if scheduled_temp is not None:
            attrs["scheduled_target_temperature"] = scheduled_temp
        return attrs

    @callback
    def _handle_coordinator_update(self) -> None:
        """Handle coordinator data update.

        Replaces manual SIGNAL_ZONES_UPDATED and
        SIGNAL_AC_CAPABILITIES_UPDATED handlers. CoordinatorEntity calls
        this automatically after each coordinator poll.
        Also reloads AC capabilities from coordinator.data if changed.
        """
        # Reload AC capabilities from coordinator data (replaces SIGNAL_AC_CAPABILITIES_UPDATED)
        coord_data = self.coordinator.data or {}
        ac_caps_all = coord_data.get("ac_capabilities") or {}
        zone_caps = ac_caps_all.get(self._zone_id)
        if zone_caps and zone_caps != self._capabilities.get("ac_capabilities"):
            self._capabilities["ac_capabilities"] = zone_caps
            # Rebuild fan mapping from new capabilities
            fan_levels = set()
            for mode_caps in zone_caps.values():
                if isinstance(mode_caps, dict):
                    if "fanLevel" in mode_caps:
                        fan_levels.update(mode_caps["fanLevel"])
                    elif "fanSpeeds" in mode_caps:
                        fan_levels.update(mode_caps["fanSpeeds"])
            if fan_levels:
                self._tado_to_ha_fan, self._ha_to_tado_fan = build_fan_mapping(fan_levels)
                self._attr_fan_modes = list(dict.fromkeys(self._tado_to_ha_fan.values()))
                _LOGGER.info("AC %s: Rebuilt fan mapping: %s", self._zone_name, self._ha_to_tado_fan)

        self.update()
        self.async_write_ha_state()

    def _extract_ac_power_state(
        self,
        setting: dict[str, Any],
        zone_data: dict[str, Any],
        ac_power_value: str | None,
    ) -> None:
        """Extract AC power-on state from zone data into entity attributes."""
        # Temperature
        temp = (setting.get("temperature") or {}).get("celsius")
        self._attr_target_temperature = temp

        # Mode
        tado_mode = setting.get("mode")
        self._attr_hvac_mode = TADO_TO_HA_HVAC_MODE.get(tado_mode, HVACMode.AUTO)  # type: ignore[arg-type]

        # Fan - API returns fanLevel (newer firmware) or fanSpeed (older firmware)
        fan_level = setting.get("fanLevel") or setting.get("fanSpeed")
        self._attr_fan_mode = self._tado_to_ha_fan.get(fan_level) or TADO_TO_HA_FAN.get(fan_level, FAN_AUTO)  # type: ignore[arg-type]

        # Swing - map to unified swing mode: off/vertical/horizontal/both
        vertical_swing = setting.get("verticalSwing")
        horizontal_swing = setting.get("horizontalSwing")
        v_on = vertical_swing is not None and vertical_swing != "OFF"
        h_on = horizontal_swing is not None and horizontal_swing != "OFF"

        if v_on and h_on:
            self._attr_swing_mode = "both"
        elif v_on:
            self._attr_swing_mode = "vertical"
        elif h_on:
            self._attr_swing_mode = "horizontal"
        else:
            self._attr_swing_mode = self._attr_swing_modes[0] if self._attr_swing_modes else "off"

        self._overlay_type = zone_data.get("overlayType")

        # HVAC action
        ac_power_on = ac_power_value == "ON"
        api_hvac_action = self._calculate_hvac_action(hvac_mode=self._attr_hvac_mode, ac_power_on=ac_power_on)

        # Sequence-based optimistic state handling
        result = resolve_optimistic_update(
            self,
            api_values={"hvac_mode": self._attr_hvac_mode, "hvac_action": api_hvac_action},
            entry_id=self._entry_id,
        )

        if result == OptimisticUpdateResult.PRESERVE_OPTIMISTIC:
            self._attr_hvac_mode = self._expected_hvac_mode
            self._attr_hvac_action = self._expected_hvac_action
            if self._optimistic_preserved:
                if self._optimistic_preserved.get("fan_mode") is not None:
                    self._attr_fan_mode = self._optimistic_preserved["fan_mode"]
                if self._optimistic_preserved.get("swing_mode") is not None:
                    self._attr_swing_mode = self._optimistic_preserved["swing_mode"]
            _LOGGER.debug(
                "AC %s: Using optimistic state: mode=%s, action=%s",
                self._zone_name,
                self._attr_hvac_mode,
                self._attr_hvac_action,
            )
        else:
            self._attr_hvac_action = api_hvac_action

    def _handle_ac_off_state(self) -> None:
        """Handle AC power-off state with optimistic state resolution."""
        if self._optimistic_sequence is not None:
            result = resolve_optimistic_update(
                self,
                api_values={"hvac_mode": HVACMode.OFF, "hvac_action": HVACAction.OFF},
                entry_id=self._entry_id,
            )
            if result == OptimisticUpdateResult.PRESERVE_OPTIMISTIC:
                _LOGGER.debug(
                    "AC %s: Preserving optimistic state (expected=%s, API shows OFF)",
                    self._zone_name,
                    self._expected_hvac_mode,
                )
                self._attr_hvac_mode = self._expected_hvac_mode
                self._attr_hvac_action = self._expected_hvac_action
            else:
                self._attr_hvac_mode = HVACMode.OFF
                self._attr_hvac_action = HVACAction.OFF
        else:
            self._attr_hvac_mode = HVACMode.OFF
            self._attr_hvac_action = HVACAction.OFF

    def _update_ac_sensor_data(self, zone_data: dict) -> None:
        """Extract sensor data and apply external sensor overrides for AC."""
        sensor_data = zone_data.get("sensorDataPoints") or {}
        self._attr_current_temperature = (sensor_data.get("insideTemperature") or {}).get("celsius")
        self._attr_current_humidity = (sensor_data.get("humidity") or {}).get("percentage")

        zcm = self.coordinator.zone_config_manager
        ext_temp = read_external_sensor(self.hass, zcm, self._zone_id, "external_temp_sensor")
        if ext_temp is not None:
            self._attr_current_temperature = ext_temp
            self._temperature_source = "external"
        else:
            self._temperature_source = "tado"

        ext_hum = read_external_sensor(self.hass, zcm, self._zone_id, "external_humidity_sensor")
        if ext_hum is not None:
            self._attr_current_humidity = ext_hum
            self._humidity_source = "external"
        else:
            self._humidity_source = "tado"

        if zcm:
            zc = zcm.get_zone_config(self._zone_id)
            self._external_temp_sensor = zc.get("external_temp_sensor", "")
            self._external_humidity_sensor = zc.get("external_humidity_sensor", "")

    @callback
    def update(self) -> None:
        """Update AC climate state from JSON file."""
        if self.coordinator.is_entity_fresh(self.entity_id):
            _LOGGER.debug("AC %s: Skipping update (entity is fresh)", self._zone_name)
            return

        try:
            coord_data = self.coordinator.data or {}
            config = coord_data.get("config")
            if config:
                self._home_id = config.get("home_id")

            data = coord_data.get("zones")
            zone_data = (data.get("zoneStates") or {}).get(self._zone_id) if data else None

            if not zone_data:
                self._attr_available = False
                return

            self._update_ac_sensor_data(zone_data)

            activity_data = zone_data.get("activityDataPoints") or {}
            ac_power = activity_data.get("acPower") or {}
            ac_power_value = ac_power.get("value")
            self._ac_power_percentage = ac_power.get("percentage")

            setting = zone_data.get("setting") or {}
            power = setting.get("power")

            if power == "ON":
                self._extract_ac_power_state(setting, zone_data, ac_power_value)
            else:
                self._handle_ac_off_state()

            self._attr_available = True

            _scm = self.coordinator.smart_comfort_manager
            if _scm and _scm.is_enabled and self._attr_current_temperature is not None:
                try:
                    _scm.record_temperature(
                        zone_id=self._zone_id, zone_name=self._zone_name,
                        temperature=self._attr_current_temperature,
                        is_heating=(ac_power_value == "ON"),
                        target_temperature=self._attr_target_temperature,
                    )
                except (KeyError, TypeError, ValueError) as e:
                    _LOGGER.debug("Failed to record smart comfort data for %s: %s", self._zone_name, e)

        except Exception as e:  # noqa: BLE001 — HA entity update pattern
            _LOGGER.warning("Failed to update %s: %s", self.name, e)
            self._attr_available = False

    def _resolve_ac_mode_for_temp_change(
        self, hvac_mode: HVACMode | None, temperature: float,
    ) -> HVACMode:
        """Resolve the HVAC mode when setting temperature on an AC that may be OFF.

        Smart mode selection (#182): pick COOL/HEAT based on current vs target temp.
        """
        if hvac_mode is not None:
            return hvac_mode
        if (
            self._attr_current_temperature is not None
            and HVACMode.HEAT in self._attr_hvac_modes
            and temperature > self._attr_current_temperature
        ):
            return HVACMode.HEAT
        return HVACMode.COOL

    async def async_set_temperature(self, **kwargs: Any) -> None:
        """Set new target temperature.

        Optimized to use single API call when both temperature and hvac_mode are provided.
        """
        temperature = kwargs.get(ATTR_TEMPERATURE)
        hvac_mode = kwargs.get(ATTR_HVAC_MODE)

        # Delegate mode-only changes
        if hvac_mode is not None and temperature is None:
            await self.async_set_hvac_mode(hvac_mode)
            return
        if hvac_mode in (HVACMode.OFF, HVACMode.AUTO):
            await self.async_set_hvac_mode(hvac_mode)
            return
        if temperature is None:
            return

        # Action Guard — skip when AC is ON and already at target
        if self._attr_hvac_mode != HVACMode.OFF and ActionGuard.should_skip_temperature(
            temperature, self._attr_target_temperature,
            hvac_mode or self._attr_hvac_mode, self._attr_hvac_mode,
        ):
            _LOGGER.debug("Action Guard: skip AC %s set_temperature (already %s°C)", self._zone_name, temperature)
            return

        await _check_bootstrap_reserve_or_raise(self.hass, f"AC {self._zone_name}", coordinator=self.coordinator)
        await self.coordinator.async_capture_state(self._zone_id, self._entity_type, "set_temperature")

        tado_mode = HA_TO_TADO_HVAC_MODE.get(hvac_mode) if hvac_mode else None

        # Optimistic update
        old_temp = self._attr_target_temperature
        old_mode = self._attr_hvac_mode
        old_action = self._attr_hvac_action

        self._attr_target_temperature = temperature
        if hvac_mode is not None:
            self._attr_hvac_mode = hvac_mode
        if old_mode == HVACMode.OFF:
            self._attr_hvac_mode = self._resolve_ac_mode_for_temp_change(hvac_mode, temperature)

        new_hvac_action = self._calculate_hvac_action()
        self._attr_hvac_action = new_hvac_action
        self._overlay_type = "MANUAL"  # type: ignore[assignment]
        await set_optimistic_fields(
            self, self.coordinator,
            expected={"hvac_mode": self._attr_hvac_mode, "hvac_action": new_hvac_action},
            preserved_attrs={"fan_mode": self._attr_fan_mode, "swing_mode": self._attr_swing_mode},
        )
        self.async_write_ha_state()

        debounce_window = self.coordinator.config_manager.get_smart_actions_debounce_seconds()

        async def _execute_api_call() -> None:
            """Execute the AC temperature API call."""
            await self._execute_ac_temp_api(
                temperature, tado_mode, old_temp, old_mode, old_action,
                raise_on_failure=(debounce_window <= 0),
            )

        if debounce_window > 0:
            await self.coordinator.action_debouncer.debounce(
                self._zone_id, _execute_api_call, window=float(debounce_window),
            )
        else:
            await _execute_api_call()

    async def _execute_ac_temp_api(
        self,
        temperature: float,
        tado_mode: str | None,
        old_temp: float | None,
        old_mode: HVACMode | None,
        old_action: HVACAction | None,
        *,
        raise_on_failure: bool = False,
    ) -> None:
        """Execute AC set_temperature API call with rollback on failure."""
        api_success = False
        try:
            async with asyncio.timeout(10):
                api_success = await self._async_set_ac_overlay(temperature=temperature, mode=tado_mode)
        except TimeoutError:
            _LOGGER.warning("AC TIMEOUT: %s temperature change timed out", self._zone_name)
        except Exception as e:  # noqa: BLE001 — HA entity action pattern
            _LOGGER.warning("AC ERROR: %s temperature change failed (%s)", self._zone_name, e)

        if api_success:
            _LOGGER.info("AC Set %s to %s°C", self._zone_name, temperature)
            await async_trigger_immediate_refresh(self.hass, self.entity_id, "temperature_change")
        else:
            _LOGGER.warning("AC ROLLBACK: %s temperature change failed", self._zone_name)
            self._attr_target_temperature = old_temp
            self._attr_hvac_mode = old_mode
            self._attr_hvac_action = old_action
            clear_optimistic_state(self)
            self.async_write_ha_state()
            if raise_on_failure:
                raise HomeAssistantError(
                    f"AC {self._zone_name}: Set temperature failed",
                    translation_domain=DOMAIN,
                )

    async def async_set_hvac_mode(self, hvac_mode: HVACMode) -> None:
        """Set new HVAC mode.

        Changed from fire-and-forget to await pattern to fix grey loading state issue.
        Service call now awaits API completion (with timeout) for proper HA Frontend state sync.

        Added bootstrap reserve check - blocks action when quota critically low.
        Added Action Guard for write optimization.
        """
        # Action Guard — skip if mode already matches current state
        if ActionGuard.should_skip_hvac_mode(hvac_mode, self._attr_hvac_mode):
            _LOGGER.debug(
                "Action Guard: skip AC %s set_hvac_mode (already %s)",
                self._zone_name, hvac_mode,
            )
            return

        await _check_bootstrap_reserve_or_raise(self.hass, f"AC {self._zone_name}", coordinator=self.coordinator)

        client = self.coordinator.api_client

        if hvac_mode == HVACMode.OFF:
            # Capture current state before overlay (state restoration)
            await self.coordinator.async_capture_state(
                self._zone_id, self._entity_type, "set_hvac_mode",
            )

            setting = {
                "type": "AIR_CONDITIONING",
                "power": "OFF",
            }
            termination = get_zone_overlay_termination(self.hass, self._zone_id, entry_id=self._entry_id)
            await api_call_with_rollback(
                self,
                client.set_zone_overlay(self._zone_id, setting, termination),
                hvac_mode=HVACMode.OFF,
                hvac_action=HVACAction.OFF,
                reason="AC Set OFF mode",
            )

        elif hvac_mode == HVACMode.AUTO:
            await api_call_with_rollback(
                self,
                client.delete_zone_overlay(self._zone_id),
                hvac_mode=HVACMode.AUTO,
                hvac_action=HVACAction.IDLE,
                overlay_type=None,
                reason="AC Set AUTO mode (deleted overlay)",
            )
        else:
            # Capture current state before overlay (state restoration)
            await self.coordinator.async_capture_state(
                self._zone_id, self._entity_type, "set_hvac_mode",
            )

            # Include all attributes that will be set by _async_set_ac_overlay
            old_mode = self._attr_hvac_mode
            old_temp = self._attr_target_temperature
            old_fan = self._attr_fan_mode
            old_swing = self._attr_swing_mode
            old_action = self._attr_hvac_action

            self._attr_hvac_mode = hvac_mode
            self._overlay_type = "MANUAL"  # type: ignore[assignment]

            # Set default temperature if not already set (matches _async_set_ac_overlay logic)
            # Clear temperature for FAN/DRY modes that don't support it
            tado_mode = HA_TO_TADO_HVAC_MODE.get(hvac_mode, "COOL")

            # Check if this mode supports temperature (from capabilities)
            ac_caps = self._capabilities.get("ac_capabilities") or {}
            mode_caps = ac_caps.get(tado_mode) or {}
            mode_has_temp = "temperatures" in mode_caps

            if tado_mode == "FAN" or not mode_has_temp:
                # FAN mode and modes without temperature support: clear temperature display
                self._attr_target_temperature = None
            elif not self._attr_target_temperature:
                # Use midpoint of capabilities range instead of hardcoded 24°C
                self._attr_target_temperature = (self._attr_min_temp + self._attr_max_temp) / 2

            # Set default fan mode if not already set
            if not self._attr_fan_mode:
                self._attr_fan_mode = "auto"

            new_hvac_action = self._calculate_hvac_action()
            self._attr_hvac_action = new_hvac_action

            await set_optimistic_fields(
                self, self.coordinator,
                expected={"hvac_mode": hvac_mode, "hvac_action": new_hvac_action},
                preserved_attrs={"fan_mode": self._attr_fan_mode, "swing_mode": self._attr_swing_mode},
            )
            self.async_write_ha_state()

            api_success = False
            try:
                async with asyncio.timeout(10):
                    api_success = await self._async_set_ac_overlay(mode=tado_mode)
            except TimeoutError:
                _LOGGER.warning("AC TIMEOUT: %s %s mode API call timed out", self._zone_name, hvac_mode)
            except Exception as e:  # noqa: BLE001 — HA entity action pattern
                _LOGGER.warning("AC ERROR: %s %s mode API call failed (%s)", self._zone_name, hvac_mode, e)

            if api_success:
                _LOGGER.info("AC Set %s to %s mode", self._zone_name, hvac_mode)
                await async_trigger_immediate_refresh(self.hass, self.entity_id, "hvac_mode_change")
            else:
                _LOGGER.warning("AC ROLLBACK: %s %s mode failed", self._zone_name, hvac_mode)
                self._attr_hvac_mode = old_mode
                self._attr_target_temperature = old_temp
                self._attr_fan_mode = old_fan
                self._attr_swing_mode = old_swing
                self._attr_hvac_action = old_action
                clear_optimistic_state(self)
                self.async_write_ha_state()
                raise HomeAssistantError(
                    f"AC {self._zone_name}: Set {hvac_mode} mode failed",
                    translation_domain=DOMAIN,
                )

    async def async_set_fan_mode(self, fan_mode: str) -> None:
        """Set new fan mode.

        Changed from fire-and-forget to await pattern to fix grey loading state issue.
        Service call now awaits API completion (with timeout) for proper HA Frontend state sync.

        Added bootstrap reserve check - blocks action when quota critically low.
        Added Action Guard for write optimization.
        """
        # Action Guard — skip if fan mode already matches current state
        if ActionGuard.should_skip_fan_mode(fan_mode, self._attr_fan_mode):
            _LOGGER.debug(
                "Action Guard: skip AC %s set_fan_mode (already %s)",
                self._zone_name, fan_mode,
            )
            return

        await _check_bootstrap_reserve_or_raise(self.hass, f"AC {self._zone_name}", coordinator=self.coordinator)

        # Capture current state before overlay (state restoration)
        await self.coordinator.async_capture_state(
            self._zone_id, self._entity_type, "set_fan_mode",
        )

        old_fan = self._attr_fan_mode
        old_mode = self._attr_hvac_mode
        old_action = self._attr_hvac_action

        self._attr_fan_mode = fan_mode

        # If AC is OFF, setting fan mode will turn it ON
        if self._attr_hvac_mode == HVACMode.OFF:
            self._attr_hvac_mode = HVACMode.COOL  # Default mode when turning on via fan
            self._overlay_type = "MANUAL"  # type: ignore[assignment]

        new_hvac_action = self._calculate_hvac_action()
        self._attr_hvac_action = new_hvac_action

        await set_optimistic_fields(
            self, self.coordinator,
            expected={"hvac_mode": self._attr_hvac_mode, "hvac_action": new_hvac_action},
            preserved_attrs={"fan_mode": self._attr_fan_mode, "swing_mode": self._attr_swing_mode},
        )
        self.async_write_ha_state()

        tado_fan = self._ha_to_tado_fan.get(fan_mode)
        if not tado_fan:
            _LOGGER.warning("AC %s: no tado fan mapping for '%s', using AUTO", self._zone_name, fan_mode)
            tado_fan = "AUTO"

        api_success = False
        try:
            async with asyncio.timeout(10):
                api_success = await self._async_set_ac_overlay(fan_level=tado_fan)
        except TimeoutError:
            _LOGGER.warning("AC TIMEOUT: %s fan mode change timed out", self._zone_name)
        except Exception as e:  # noqa: BLE001 — HA entity action pattern
            _LOGGER.warning("AC ERROR: %s fan mode change failed (%s)", self._zone_name, e)

        if api_success:
            _LOGGER.info("AC Set %s fan mode to %s", self._zone_name, fan_mode)
            await async_trigger_immediate_refresh(self.hass, self.entity_id, "fan_mode_change")
        else:
            _LOGGER.warning("AC ROLLBACK: %s fan mode change failed", self._zone_name)
            self._attr_fan_mode = old_fan
            self._attr_hvac_mode = old_mode
            self._attr_hvac_action = old_action
            clear_optimistic_state(self)
            self.async_write_ha_state()
            raise HomeAssistantError(
                f"AC {self._zone_name}: Set fan mode failed",
                translation_domain=DOMAIN,
            )

    async def async_set_swing_mode(self, swing_mode: str) -> None:
        """Set new swing mode.

        Unified swing dropdown like official Tado integration:
        - off: verticalSwing=OFF, horizontalSwing=OFF
        - vertical: verticalSwing=ON, horizontalSwing=OFF
        - horizontal: verticalSwing=OFF, horizontalSwing=ON
        - both: verticalSwing=ON, horizontalSwing=ON

        Changed from fire-and-forget to await pattern to fix grey loading state issue.
        Service call now awaits API completion (with timeout) for proper HA Frontend state sync.

        Added bootstrap reserve check - blocks action when quota critically low.
        Added Action Guard for write optimization.
        """
        # Action Guard — skip if swing mode already matches current state
        if ActionGuard.should_skip_swing_mode(swing_mode, self._attr_swing_mode):
            _LOGGER.debug(
                "Action Guard: skip AC %s set_swing_mode (already %s)",
                self._zone_name, swing_mode,
            )
            return

        await _check_bootstrap_reserve_or_raise(self.hass, f"AC {self._zone_name}", coordinator=self.coordinator)

        # Capture current state before overlay (state restoration)
        await self.coordinator.async_capture_state(
            self._zone_id, self._entity_type, "set_swing_mode",
        )

        if swing_mode == "off":
            v_swing, h_swing = "OFF", "OFF"
        elif swing_mode == "vertical":
            v_swing, h_swing = "ON", "OFF"
        elif swing_mode == "horizontal":
            v_swing, h_swing = "OFF", "ON"
        elif swing_mode == "both":
            v_swing, h_swing = "ON", "ON"
        else:
            # Fallback for legacy SWING_ON/SWING_OFF
            v_swing = "ON" if swing_mode == SWING_ON else "OFF"
            h_swing = "OFF"

        old_swing = self._attr_swing_mode
        old_mode = self._attr_hvac_mode
        old_action = self._attr_hvac_action

        self._attr_swing_mode = swing_mode

        # If AC is OFF, setting swing mode will turn it ON
        if self._attr_hvac_mode == HVACMode.OFF:
            self._attr_hvac_mode = HVACMode.COOL  # Default mode when turning on via swing
            self._overlay_type = "MANUAL"  # type: ignore[assignment]

        new_hvac_action = self._calculate_hvac_action()
        self._attr_hvac_action = new_hvac_action

        await set_optimistic_fields(
            self, self.coordinator,
            expected={"hvac_mode": self._attr_hvac_mode, "hvac_action": new_hvac_action},
            preserved_attrs={"fan_mode": self._attr_fan_mode, "swing_mode": self._attr_swing_mode},
        )
        self.async_write_ha_state()

        api_success = False
        try:
            async with asyncio.timeout(10):
                api_success = await self._async_set_ac_overlay(vertical_swing=v_swing, horizontal_swing=h_swing)
        except TimeoutError:
            _LOGGER.warning("AC TIMEOUT: %s swing mode change timed out", self._zone_name)
        except Exception as e:  # noqa: BLE001 — HA entity action pattern
            _LOGGER.warning("AC ERROR: %s swing mode change failed (%s)", self._zone_name, e)

        if api_success:
            _LOGGER.info("AC Set %s swing mode to %s", self._zone_name, swing_mode)
            await async_trigger_immediate_refresh(self.hass, self.entity_id, "swing_mode_change")
        else:
            _LOGGER.warning("AC ROLLBACK: %s swing mode change failed", self._zone_name)
            self._attr_swing_mode = old_swing
            self._attr_hvac_mode = old_mode
            self._attr_hvac_action = old_action
            clear_optimistic_state(self)
            self.async_write_ha_state()
            raise HomeAssistantError(
                f"AC {self._zone_name}: Set swing mode failed",
                translation_domain=DOMAIN,
            )

    def _resolve_fan_level(
        self,
        mode_caps: dict[str, Any],
        fan_level: str | None,
    ) -> tuple[str | None, str | None]:
        """Resolve fan level setting from capabilities.

        Returns (fan_key, fan_value) or (None, None) if not supported.
        """
        fan_key = "fanLevel" if "fanLevel" in mode_caps else ("fanSpeeds" if "fanSpeeds" in mode_caps else None)
        if not fan_key:
            return None, None

        supported = mode_caps.get(fan_key) or []
        if fan_level:
            if fan_level in supported:
                return fan_key, fan_level
            if supported:
                fallback = "AUTO" if "AUTO" in supported else supported[0]
                _LOGGER.warning("AC %s: fan level %s not supported, using %s", self._zone_name, fan_level, fallback)
                return fan_key, fallback
        elif self._attr_fan_mode:
            tado_fan = self._ha_to_tado_fan.get(self._attr_fan_mode) or HA_TO_TADO_FAN.get(
                self._attr_fan_mode, "AUTO",
            )
            if tado_fan in supported:
                return fan_key, tado_fan
            if supported:
                fallback = "AUTO" if "AUTO" in supported else supported[-1]
                _LOGGER.debug(
                    "AC %s: mapped fan %s→%s not in %s, using %s",
                    self._zone_name, self._attr_fan_mode, tado_fan, supported, fallback,
                )
                return fan_key, fallback
        elif "AUTO" in supported:
            return fan_key, "AUTO"
        elif supported:
            return fan_key, supported[0]
        return None, None

    @staticmethod
    def _resolve_swing_value(
        supported: list[str],
        explicit: str | None,
        swing_mode: str | None,
        swing_direction: str,
    ) -> str | None:
        """Resolve a single swing axis value from capabilities.

        Args:
            supported: List of supported swing values for this axis.
            explicit: Explicitly requested value (from caller), or None.
            swing_mode: Current HA swing mode (vertical/horizontal/both/off).
            swing_direction: Which direction this axis represents (vertical/horizontal).

        Returns the resolved value, or None if field should not be sent.
        """
        if explicit is not None:
            return explicit if explicit in supported else None
        if swing_mode in (swing_direction, "both"):
            if "ON" in supported:
                return "ON"
            return supported[0] if supported else None
        if "OFF" in supported:
            return "OFF"
        return None

    def _resolve_ac_mode(self, mode: str | None) -> str:
        """Resolve the Tado AC mode string for the overlay."""
        if mode:
            return mode
        if self._attr_hvac_mode and self._attr_hvac_mode not in (HVACMode.OFF, HVACMode.AUTO):
            return HA_TO_TADO_HVAC_MODE.get(self._attr_hvac_mode, "COOL")
        return "COOL"

    def _build_ac_setting(
        self,
        temperature: float | None,
        mode: str | None,
        fan_level: str | None,
        vertical_swing: str | None,
        horizontal_swing: str | None,
    ) -> dict[str, Any]:
        """Build the AC overlay setting dict from current state + changes."""
        setting: dict[str, Any] = {"type": "AIR_CONDITIONING", "power": "ON"}
        current_mode = self._resolve_ac_mode(mode)
        setting["mode"] = current_mode

        ac_caps = self._capabilities.get("ac_capabilities") or {}
        mode_caps = ac_caps.get(current_mode) or {}

        # Temperature
        if current_mode != "FAN" and "temperatures" in mode_caps:
            if temperature:
                setting["temperature"] = {"celsius": temperature}
            elif self._attr_target_temperature:
                setting["temperature"] = {"celsius": self._attr_target_temperature}
            else:
                setting["temperature"] = {"celsius": (self._attr_min_temp + self._attr_max_temp) / 2}

        # Fan level
        fan_key, fan_value = self._resolve_fan_level(mode_caps, fan_level)
        if fan_key and fan_value:
            setting[fan_key] = fan_value

        # Swing
        for swing_dir, swing_explicit in [("verticalSwing", vertical_swing), ("horizontalSwing", horizontal_swing)]:
            if swing_dir in mode_caps:
                value = self._resolve_swing_value(
                    mode_caps.get(swing_dir) or [], swing_explicit,
                    self._attr_swing_mode, swing_dir.replace("Swing", "").lower(),
                )
                if value is not None:
                    setting[swing_dir] = value

        return setting

    async def _async_set_ac_overlay(
        self,
        temperature: float | None = None,
        mode: str | None = None,
        fan_level: str | None = None,
        vertical_swing: str | None = None,
        horizontal_swing: str | None = None,
        duration_minutes: int | None = None,
        overlay: str | None = None,
    ) -> bool:
        """Set AC overlay with optional parameters."""
        client = self.coordinator.api_client
        setting = self._build_ac_setting(temperature, mode, fan_level, vertical_swing, horizontal_swing)

        termination = build_timer_termination(
            duration_minutes=duration_minutes, overlay=overlay,
            hass=self.hass, zone_id=self._zone_id, entry_id=self._entry_id,
        )

        _LOGGER.debug("AC overlay payload: setting=%s, termination=%s", setting, termination)

        if await client.set_zone_overlay(self._zone_id, setting, termination):
            _LOGGER.info("Set AC %s: %s", self._zone_name, setting)
            return True
        return False

    async def async_set_timer(
        self, temperature: float, duration_minutes: int | None = None, overlay: str | None = None,
    ) -> bool:
        """Set AC with timer or overlay type.

        Added overlay parameter for parity with TadoClimate.
        When overlay='next_time_block', uses TADO_MODE termination (no timer needed).
        When overlay='manual', uses MANUAL termination.

        Added timeout protection for consistency.
        Simplified — delegates to _async_set_ac_overlay with overlay param.
        """
        await _check_bootstrap_reserve_or_raise(self.hass, f"AC {self._zone_name}", coordinator=self.coordinator)

        # Capture current state before overlay (state restoration)
        await self.coordinator.async_capture_state(
            self._zone_id, self._entity_type, "set_timer",
        )

        api_success = False
        try:
            async with asyncio.timeout(10):
                api_success = await self._async_set_ac_overlay(
                    temperature=temperature,
                    mode=None,
                    duration_minutes=duration_minutes,
                    overlay=overlay,
                )
        except TimeoutError:
            _LOGGER.warning("AC TIMEOUT: %s set_timer API call timed out", self._zone_name)
        except Exception as e:  # noqa: BLE001 — HA entity action pattern
            _LOGGER.warning("AC ERROR: %s set_timer API call failed (%s)", self._zone_name, e)

        return api_success
