"""Tado CE Heating Climate Entity — TRV/thermostat control, timer, overlay."""  # zone config values are heterogeneous
  # HA entity interface
from __future__ import annotations

import asyncio
import logging
import time
from typing import TYPE_CHECKING, Any

from homeassistant.components.climate import ATTR_HVAC_MODE, ClimateEntity  # type: ignore[attr-defined]
from homeassistant.components.climate.const import (
    PRESET_AWAY,
    PRESET_HOME,
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
    update_offset,
    update_preset_mode,
)
from .const import DOMAIN
from .device_manager import get_zone_device_info
from .entity_registry import ENTITY_REGISTRY
from .format_helpers import (
    format_overlay_type as _format_overlay_type,
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


class TadoClimate(CoordinatorEntity["TadoDataUpdateCoordinator"], ClimateEntity, RestoreEntity):
    """Tado CE Heating Climate Entity."""

    _attr_has_entity_name = True

    def __init__(self, coordinator: TadoDataUpdateCoordinator, zone_id: str, zone_name: str, home_id: str) -> None:
        """Initialize."""
        super().__init__(coordinator)
        self._zone_id = zone_id
        self._zone_name = zone_name
        self._home_id = home_id
        self._entry_id = coordinator.config_entry.entry_id
        self._entity_type = "climate_heating"

        _meta = ENTITY_REGISTRY["climate_heating"]
        self._attr_name = None
        self._attr_translation_key = _meta.translation_key
        # Use zone_id for unique_id to maintain entity_id stability across zone name changes
        self._attr_unique_id = f"tado_ce_{home_id}_{_meta.unique_id_suffix.format(zone_id=zone_id)}"
        self._attr_temperature_unit = UnitOfTemperature.CELSIUS
        self._attr_device_info = get_zone_device_info(zone_id, zone_name, "HEATING", home_id)
        self._attr_supported_features = (
            ClimateEntityFeature.TARGET_TEMPERATURE
            | ClimateEntityFeature.TURN_OFF
            | ClimateEntityFeature.TURN_ON
            | ClimateEntityFeature.PRESET_MODE
        )
        self._attr_hvac_modes = [HVACMode.HEAT, HVACMode.OFF, HVACMode.AUTO]
        self._attr_preset_modes = [PRESET_HOME, PRESET_AWAY]
        self._attr_target_temperature_step = 0.5

        # Per-zone min/max temp (will be updated in update() from zone_config_manager)
        self._attr_min_temp = 5
        self._attr_max_temp = 25

        self._attr_current_temperature = None
        self._attr_target_temperature = None
        self._attr_hvac_mode = None
        self._attr_hvac_action = None
        self._attr_available = False
        self._attr_current_humidity = None

        # Extra attributes
        self._overlay_type = None
        self._heating_power = None
        self._offset_celsius = None  # Temperature offset (optional, enabled in config)
        self._attr_preset_mode = PRESET_HOME

        # External sensor override tracking
        self._temperature_source = "tado"
        self._humidity_source = "tado"
        self._external_temp_sensor = ""
        self._external_humidity_sensor = ""

        # Track last target temp from API for heating cycle detection
        self._last_target_temp_from_api: float | None = None

        # Optimistic state tracking with sequence numbers
        self._optimistic_set_at: float | None = None
        self._optimistic_sequence: int | None = None
        self._optimistic_preserved: dict[str, Any] | None = None
        self._expected_hvac_mode: HVACMode | None = None
        self._expected_hvac_action: HVACAction | None = None

        # Unsubscribe callback for zones_updated signal
        self._unsub_zones_updated = None

        # Unsubscribe callback for zone config changes
        self._unsub_zone_config = None

        # Unsubscribe callbacks for external sensor state change listeners
        self._unsub_external_sensors: list[CALLBACK_TYPE] = []

    def _calculate_hvac_action(self, target_temp: float | None = None) -> HVACAction:
        """Calculate hvac_action for heating zone.

        Updated for optimistic update fix.

        Priority:
        1. If hvac_mode == OFF -> OFF
        2. If target_temp provided (optimistic call) -> HEATING
        3. If in optimistic window with expected action -> return expected action
        4. If heating_power > 0 -> HEATING (API confirms active heating)
        5. If hvac_mode == HEAT and target > current + 0.5 -> HEATING (temperature fallback)
        6. Otherwise -> IDLE

        Args:
            target_temp: Optional target temperature for optimistic updates.
                        If None, uses self._attr_target_temperature.

        Returns:
            HVACAction.HEATING, HVACAction.IDLE, or HVACAction.OFF

        """
        # OFF mode always returns OFF
        if self._attr_hvac_mode == HVACMode.OFF:
            return HVACAction.OFF

        # If target_temp is provided (optimistic call), assume HEATING
        # This MUST be checked before _expected_hvac_action to ensure new
        # optimistic updates override stale expected actions
        if target_temp is not None and self._attr_hvac_mode == HVACMode.HEAT:
            return HVACAction.HEATING

        # If we have optimistic state with expected action, use it
        # This ensures optimistic updates work even when current temp >= target
        if self._expected_hvac_action is not None:
            return self._expected_hvac_action

        # API confirms heating (highest priority when available)
        if self._heating_power and self._heating_power > 0:
            return HVACAction.HEATING

        # Temperature-aware fallback for HEAT mode
        # This handles the case where API hasn't updated heating_power yet
        if self._attr_hvac_mode == HVACMode.HEAT:
            target = self._attr_target_temperature
            current = self._attr_current_temperature
            if target is not None and current is not None:
                # 0.5°C buffer for hysteresis to prevent flip-flopping
                if target > current + 0.5:
                    return HVACAction.HEATING

        return HVACAction.IDLE

    async def async_added_to_hass(self) -> None:
        """Register listeners when entity is added to hass.

        CoordinatorEntity handles update subscription
        automatically — removed manual SIGNAL_ZONES_UPDATED dispatcher signal.
        Zone config listener retained (not a coordinator update).
        """
        await super().async_added_to_hass()

        # Restore last known target temperature across HA restarts (#182)
        last_state = await self.async_get_last_state()
        if last_state and last_state.attributes.get(ATTR_TEMPERATURE) is not None:
            self._attr_target_temperature = last_state.attributes[ATTR_TEMPERATURE]
            _LOGGER.debug(
                "%s: Restored target temperature %s from previous state",
                self._zone_name,
                self._attr_target_temperature,
            )
        elif self._attr_target_temperature is None:
            # First install or no previous state — default to 20°C so climate
            # card controls are usable immediately (#182 follow-up)
            self._attr_target_temperature = 20.0
            _LOGGER.debug(
                "%s: No previous state, defaulting target temperature to %s",
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
                    _LOGGER.debug("%s: Zone config %s changed to %s", self._zone_name, key, value)

            self._unsub_zone_config = zone_config_manager.add_listener(_handle_zone_config_change)  # type: ignore[assignment]
            # Initial update of temp limits
            self._update_temp_limits()

        # Subscribe to external sensor state changes for real-time updates
        self._subscribe_external_sensors()

    async def async_will_remove_from_hass(self) -> None:
        """Unregister listeners when entity is removed.

        CoordinatorEntity handles update unsubscription.
        Only zone config listener needs manual cleanup.
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
            """Handle external sensor state change — update climate entity."""
            ext_temp = read_external_sensor(self.hass, zcm, self._zone_id, "external_temp_sensor")
            if ext_temp is not None:
                self._attr_current_temperature = ext_temp
                self._temperature_source = "external"

            ext_hum = read_external_sensor(self.hass, zcm, self._zone_id, "external_humidity_sensor")
            if ext_hum is not None:
                self._attr_current_humidity = ext_hum
                self._humidity_source = "external"

            self.async_write_ha_state()
            _LOGGER.debug("%s: External sensor updated → refreshed climate state", self._zone_name)

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
        If user never set min/max_temp in Zone Configuration, use
        defaults (5°C / 25°C) — consistent with AC fix (#180).
        """
        zone_config_manager = self.coordinator.zone_config_manager
        if zone_config_manager:
            if zone_config_manager.has_zone_override(self._zone_id, "min_temp"):
                self._attr_min_temp = zone_config_manager.get_zone_value(self._zone_id, "min_temp", 5.0)
            else:
                self._attr_min_temp = 5.0

            if zone_config_manager.has_zone_override(self._zone_id, "max_temp"):
                self._attr_max_temp = zone_config_manager.get_zone_value(self._zone_id, "max_temp", 25.0)
            else:
                self._attr_max_temp = 25.0

    @property
    def extra_state_attributes(self) -> dict[str, Any] | None:
        """Return extra state attributes."""
        attrs: dict[str, Any] = {
            "overlay_type": _format_overlay_type(self._overlay_type),
            "heating_power": self._heating_power,
            "zone_id": self._zone_id,
            "temperature_source": self._temperature_source,
            "humidity_source": self._humidity_source,
            "external_temp_sensor": self._external_temp_sensor,
            "external_humidity_sensor": self._external_humidity_sensor,
        }
        # Only include offset_celsius if enabled and available
        if self._offset_celsius is not None:
            attrs["offset_celsius"] = self._offset_celsius
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

        Replaces manual SIGNAL_ZONES_UPDATED handler.
        CoordinatorEntity calls this automatically after each coordinator poll.
        """
        self.update()
        self.async_write_ha_state()

    def _update_sensor_data(self, zone_data: dict) -> None:
        """Extract sensor data and apply external sensor overrides."""
        sensor_data = zone_data.get("sensorDataPoints") or {}
        self._attr_current_temperature = (sensor_data.get("insideTemperature") or {}).get("celsius")
        self._attr_current_humidity = (sensor_data.get("humidity") or {}).get("percentage")

        # External sensor overrides
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

        # Track configured entity_ids for extra_state_attributes
        if zcm:
            zc = zcm.get_zone_config(self._zone_id)
            self._external_temp_sensor = zc.get("external_temp_sensor", "")
            self._external_humidity_sensor = zc.get("external_humidity_sensor", "")

    def _determine_api_hvac_mode(self, power: str | None, zone_data: dict) -> HVACMode:
        """Determine HVAC mode from API power state and overlay type."""
        self._overlay_type = zone_data.get("overlayType")

        if power == "ON":
            setting = zone_data.get("setting") or {}
            temp = (setting.get("temperature") or {}).get("celsius")
            self._attr_target_temperature = temp
            self._schedule_heating_cycle_update(temp)
            return HVACMode.HEAT if self._overlay_type == "MANUAL" else HVACMode.AUTO

        # Power is OFF
        return HVACMode.OFF if self._overlay_type == "MANUAL" else HVACMode.AUTO

    def _schedule_heating_cycle_update(self, temp: float | None) -> None:
        """Schedule async heating cycle coordinator update if applicable."""
        if temp is None or self._attr_current_temperature is None:
            return
        heating_cycle_coordinator = self.coordinator.heating_cycle_coordinator
        if not heating_cycle_coordinator:
            return

        _zone_id = self._zone_id
        _zone_name = self._zone_name
        _current_temp = self._attr_current_temperature

        async def _safe_heating_cycle_update() -> None:
            """Fire-and-forget wrapper with error logging."""
            try:
                await heating_cycle_coordinator.on_zone_update(
                    _zone_id, temp, _current_temp,
                )
            except (KeyError, TypeError, ValueError):
                _LOGGER.debug(
                    "HeatingCycleCoordinator update failed for zone %s",
                    _zone_name,
                    exc_info=True,
                )

        self.hass.async_create_task(_safe_heating_cycle_update())

    def _apply_optimistic_or_api_state(
        self, api_hvac_mode: HVACMode, api_hvac_action: HVACAction, power: str | None,
    ) -> None:
        """Apply optimistic or API state based on sequence comparison."""
        result = resolve_optimistic_update(
            self,
            api_values={"hvac_mode": api_hvac_mode, "hvac_action": api_hvac_action},
            entry_id=self._entry_id,
        )

        if result == OptimisticUpdateResult.PRESERVE_OPTIMISTIC:
            self._attr_hvac_mode = self._expected_hvac_mode
            self._attr_hvac_action = self._expected_hvac_action
            _LOGGER.debug(
                "%s: Using optimistic state: mode=%s, action=%s",
                self._zone_name, self._attr_hvac_mode, self._attr_hvac_action,
            )
        else:
            self._attr_hvac_mode = api_hvac_mode
            self._attr_hvac_action = api_hvac_action
            if power != "ON" and api_hvac_mode == HVACMode.OFF:
                self._attr_hvac_action = HVACAction.OFF

    def _record_smart_comfort(self) -> None:
        """Record temperature for Smart Comfort analytics."""
        _scm = self.coordinator.smart_comfort_manager
        if not (_scm and _scm.is_enabled and self._attr_current_temperature is not None):
            return
        try:
            _scm.record_temperature(
                zone_id=self._zone_id,
                zone_name=self._zone_name,
                temperature=self._attr_current_temperature,
                is_heating=(self._heating_power is not None and self._heating_power > 0),
                target_temperature=self._attr_target_temperature,
            )
        except (KeyError, TypeError, ValueError) as e:
            _LOGGER.debug("Failed to record smart comfort data for %s: %s", self._zone_name, e)

    @callback
    def update(self) -> None:
        """Update climate state from JSON file."""
        if self.coordinator.is_entity_fresh(self.entity_id):
            _LOGGER.debug("%s: Skipping update (entity is fresh)", self._zone_name)
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

            self._update_sensor_data(zone_data)

            # Heating power
            activity_data = zone_data.get("activityDataPoints") or {}
            self._heating_power = (activity_data.get("heatingPower") or {}).get("percentage", 0)

            # Determine API state
            setting = zone_data.get("setting") or {}
            power = setting.get("power")
            api_hvac_mode = self._determine_api_hvac_mode(power, zone_data)

            # Calculate hvac_action
            old_hvac_mode = self._attr_hvac_mode
            self._attr_hvac_mode = api_hvac_mode
            api_hvac_action = self._calculate_hvac_action()
            self._attr_hvac_mode = old_hvac_mode

            # Apply state
            self._apply_optimistic_or_api_state(api_hvac_mode, api_hvac_action, power)
            self._attr_available = True

            self._record_smart_comfort()
            self._update_preset_mode()
            self._update_offset()

        except Exception as e:  # noqa: BLE001 — HA entity update pattern
            _LOGGER.warning("Failed to update %s: %s", self.name, e)
            self._attr_available = False

    @callback
    def _update_offset(self) -> None:
        """Update temperature offset from cached offsets file.

        Delegates to shared climate_helpers.update_offset().
        """
        self._offset_celsius = update_offset(self.coordinator, self._zone_id)  # type: ignore[assignment]

    @callback
    def _update_preset_mode(self) -> None:
        """Update preset mode based on home state.

        Delegates to shared climate_helpers.update_preset_mode().
        """
        result = update_preset_mode(self.coordinator)
        if result is not None:
            self._attr_preset_mode = result

    async def async_set_preset_mode(self, preset_mode: str) -> None:
        """Set preset mode (Home/Away).

        Uses 1 API call to set presence lock.

        Added timeout protection for consistency with other methods.
        Added bootstrap reserve check - blocks action when quota critically low.
        Added Action Guard for write optimization.
        """
        # Action Guard — skip if preset already matches current state
        if ActionGuard.should_skip_preset_mode(preset_mode, self._attr_preset_mode):
            _LOGGER.debug(
                "Action Guard: skip %s set_preset_mode (already %s)",
                self._zone_name, preset_mode,
            )
            return

        await _check_bootstrap_reserve_or_raise(self.hass, self._zone_name, coordinator=self.coordinator)

        client = self.coordinator.api_client
        state = "AWAY" if preset_mode == PRESET_AWAY else "HOME"

        # Optimistic update BEFORE API call
        old_preset = self._attr_preset_mode
        self._attr_preset_mode = preset_mode
        self._optimistic_set_at = time.monotonic()
        self.async_write_ha_state()

        api_success = False
        try:
            async with asyncio.timeout(10):
                api_success = await client.set_presence_lock(state)
        except TimeoutError:
            _LOGGER.warning("TIMEOUT: %s preset mode API call timed out", self._zone_name)
        except Exception as e:  # noqa: BLE001 — HA entity action pattern
            _LOGGER.warning("ERROR: %s preset mode API call failed (%s)", self._zone_name, e)

        if api_success:
            _LOGGER.info("Set %s preset mode to %s", self._zone_name, preset_mode)
            await async_trigger_immediate_refresh(self.hass, self.entity_id, "preset_mode_change")
        else:
            _LOGGER.warning("ROLLBACK: %s preset mode failed", self._zone_name)
            self._attr_preset_mode = old_preset
            clear_optimistic_state(self)
            self.async_write_ha_state()

    async def _execute_set_temp_api(
        self,
        client: object,
        setting: dict,
        termination: dict,
        temperature: float,
        old_temp: float | None,
        old_mode: object,
        old_action: object,
        *,
        raise_on_failure: bool = False,
    ) -> None:
        """Execute set_zone_overlay API call with rollback on failure."""
        api_success = False
        try:
            async with asyncio.timeout(10):
                api_success = await client.set_zone_overlay(self._zone_id, setting, termination)  # type: ignore[union-attr]
        except TimeoutError:
            _LOGGER.warning("TIMEOUT: %s API call timed out, reverting to %s", self._zone_name, old_temp)
        except Exception as e:  # noqa: BLE001 — HA entity action pattern
            _LOGGER.warning("ERROR: %s API call failed (%s), reverting to %s", self._zone_name, e, old_temp)

        if api_success:
            _LOGGER.info("Set %s to %s°C", self._zone_name, temperature)
            heating_cycle_coordinator = self.coordinator.heating_cycle_coordinator
            if heating_cycle_coordinator:
                await heating_cycle_coordinator.on_setpoint_change(
                    self._zone_id, temperature, self._attr_current_temperature,
                )
            await async_trigger_immediate_refresh(self.hass, self.entity_id, "temperature_change")
        else:
            self._attr_target_temperature = old_temp
            self._attr_hvac_mode = old_mode  # type: ignore[assignment]
            self._attr_hvac_action = old_action  # type: ignore[assignment]
            clear_optimistic_state(self)
            self.async_write_ha_state()
            if raise_on_failure:
                raise HomeAssistantError(
                    f"{self._zone_name}: Set temperature to {temperature}°C failed",
                    translation_domain=DOMAIN,
                )

    async def async_set_temperature(self, **kwargs: Any) -> None:
        """Set new target temperature.

        Optimized to use single API call when both temperature and hvac_mode are provided.
        This saves 1 API call (1% of 100-call limit) compared to calling set_hvac_mode first.

        Changed from fire-and-forget to await pattern to fix grey loading state issue.
        Service call now awaits API completion (with timeout) for proper HA Frontend state sync.

        Added bootstrap reserve check - blocks action when quota critically low.
        Added Action Guard + Smart Actions debounce for write optimization.
        """
        temperature = kwargs.get(ATTR_TEMPERATURE)
        hvac_mode = kwargs.get(ATTR_HVAC_MODE)

        # Handle hvac_mode without temperature (delegate to set_hvac_mode)
        if hvac_mode is not None and temperature is None:
            await self.async_set_hvac_mode(hvac_mode)
            return

        # Handle OFF/AUTO mode specially (no temperature needed)
        if hvac_mode in (HVACMode.OFF, HVACMode.AUTO):
            await self.async_set_hvac_mode(hvac_mode)
            return

        if temperature is None:
            return

        # Action Guard — skip if temp + mode already match current state
        if ActionGuard.should_skip_temperature(
            temperature, self._attr_target_temperature,
            HVACMode.HEAT, self._attr_hvac_mode,
        ):
            _LOGGER.debug(
                "Action Guard: skip %s set_temperature (already %s°C)",
                self._zone_name, temperature,
            )
            return

        await _check_bootstrap_reserve_or_raise(self.hass, self._zone_name, coordinator=self.coordinator)

        # Capture current state before overlay (state restoration)
        await self.coordinator.async_capture_state(
            self._zone_id, self._entity_type, "set_temperature",
        )

        old_temp = self._attr_target_temperature
        old_mode = self._attr_hvac_mode
        old_action = self._attr_hvac_action
        self._attr_target_temperature = temperature
        self._attr_hvac_mode = HVACMode.HEAT
        self._overlay_type = "MANUAL"  # type: ignore[assignment]
        new_hvac_action = self._calculate_hvac_action(target_temp=temperature)
        self._attr_hvac_action = new_hvac_action
        await set_optimistic_fields(
            self, self.coordinator,
            expected={"hvac_mode": HVACMode.HEAT, "hvac_action": new_hvac_action},
        )
        _LOGGER.debug(
            "Optimistic update: %s target_temp=%s, hvac_action=%s",
            self._zone_name, temperature, self._attr_hvac_action,
        )
        self.async_write_ha_state()

        # Build API call parameters
        client = self.coordinator.api_client
        setting = {
            "type": "HEATING",
            "power": "ON",
            "temperature": {"celsius": temperature},
        }
        termination = get_zone_overlay_termination(self.hass, self._zone_id, entry_id=self._entry_id)

        # Smart Actions debounce
        debounce_window = self.coordinator.config_manager.get_smart_actions_debounce_seconds()
        if debounce_window > 0:
            async def _execute_api_call() -> None:
                """Execute the debounced API call."""
                await self._execute_set_temp_api(
                    client, setting, termination, temperature,
                    old_temp, old_mode, old_action,
                )

            await self.coordinator.action_debouncer.debounce(
                self._zone_id, _execute_api_call, window=float(debounce_window),
            )
        else:
            await self._execute_set_temp_api(
                client, setting, termination, temperature,
                old_temp, old_mode, old_action, raise_on_failure=True,
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
                "Action Guard: skip %s set_hvac_mode (already %s)",
                self._zone_name, hvac_mode,
            )
            return

        await _check_bootstrap_reserve_or_raise(self.hass, self._zone_name, coordinator=self.coordinator)

        client = self.coordinator.api_client

        if hvac_mode == HVACMode.HEAT:
            # Capture current state before overlay (state restoration)
            await self.coordinator.async_capture_state(
                self._zone_id, self._entity_type, "set_hvac_mode",
            )

            temp = self._attr_target_temperature or 20
            setting = {
                "type": "HEATING",
                "power": "ON",
                "temperature": {"celsius": temp},
            }
            termination = get_zone_overlay_termination(self.hass, self._zone_id, entry_id=self._entry_id)
            new_hvac_action = self._calculate_hvac_action(target_temp=temp)
            await api_call_with_rollback(
                self,
                client.set_zone_overlay(self._zone_id, setting, termination),
                hvac_mode=HVACMode.HEAT,
                hvac_action=new_hvac_action,
                target_temp=temp,
                reason=f"Set HEAT mode at {temp}°C",
            )

        elif hvac_mode == HVACMode.OFF:
            # Capture current state before overlay (state restoration)
            await self.coordinator.async_capture_state(
                self._zone_id, self._entity_type, "set_hvac_mode",
            )

            setting = {
                "type": "HEATING",
                "power": "OFF",
            }
            termination = get_zone_overlay_termination(self.hass, self._zone_id, entry_id=self._entry_id)
            await api_call_with_rollback(
                self,
                client.set_zone_overlay(self._zone_id, setting, termination),
                hvac_mode=HVACMode.OFF,
                hvac_action=HVACAction.OFF,
                reason="Set OFF mode",
            )

        elif hvac_mode == HVACMode.AUTO:
            await api_call_with_rollback(
                self,
                client.delete_zone_overlay(self._zone_id),
                hvac_mode=HVACMode.AUTO,
                hvac_action=HVACAction.IDLE,
                overlay_type=None,
                reason="Set AUTO mode (deleted overlay)",
            )

    async def async_set_timer(
        self, temperature: float, duration_minutes: int | None = None, overlay: str | None = None,
    ) -> bool:
        """Set temperature with timer or overlay type.

        Args:
            temperature: Target temperature in Celsius
            duration_minutes: Duration in minutes (for TIMER termination)
            overlay: Overlay type - 'next_time_block' for TADO_MODE, None for MANUAL

        Added bootstrap reserve check - blocks action when quota critically low.

        """
        await _check_bootstrap_reserve_or_raise(self.hass, self._zone_name, coordinator=self.coordinator)

        # Capture current state before overlay (state restoration)
        await self.coordinator.async_capture_state(
            self._zone_id, self._entity_type, "set_timer",
        )

        client = self.coordinator.api_client

        setting = {
            "type": "HEATING",
            "power": "ON",
            "temperature": {"celsius": temperature},
        }

        # Determine termination type
        # DRY — use shared build_timer_termination
        termination = build_timer_termination(
            duration_minutes=duration_minutes,
            overlay=overlay,
            hass=self.hass,
            zone_id=self._zone_id,
            entry_id=self._entry_id,
        )
        if duration_minutes:
            term_desc = f"for {duration_minutes} minutes"
        elif overlay and overlay.upper() == "NEXT_TIME_BLOCK":
            term_desc = "until next schedule block"
        else:
            term_desc = "manually"

        # Added timeout protection for consistency
        api_success = False
        try:
            async with asyncio.timeout(10):
                api_success = await client.set_zone_overlay(self._zone_id, setting, termination)
        except TimeoutError:
            _LOGGER.warning("TIMEOUT: %s set_timer API call timed out", self._zone_name)
        except Exception as e:  # noqa: BLE001 — HA entity action pattern
            _LOGGER.warning("ERROR: %s set_timer API call failed (%s)", self._zone_name, e)

        if api_success:
            _LOGGER.info("Set %s to %s°C %s", self._zone_name, temperature, term_desc)
            return True
        return False
