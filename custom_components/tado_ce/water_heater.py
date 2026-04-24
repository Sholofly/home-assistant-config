"""Tado CE Water Heater Platform — hot water control and scheduling."""  # HA entity interface

from __future__ import annotations

import asyncio
import json
import logging
from typing import TYPE_CHECKING, Any

from homeassistant.components.water_heater import (
    WaterHeaterEntity,
    WaterHeaterEntityFeature,
)
from homeassistant.const import STATE_OFF, UnitOfTemperature
from homeassistant.core import HomeAssistant, callback
from homeassistant.exceptions import HomeAssistantError
from homeassistant.helpers.update_coordinator import CoordinatorEntity

from .const import DOMAIN, MAX_RETRY_ATTEMPTS
from .device_manager import get_zone_device_info
from .entity_registry import ENTITY_REGISTRY
from .format_helpers import format_overlay_type as _format_overlay_type
from .helpers import async_trigger_immediate_refresh, build_timer_termination, retry_delay
from .optimistic_helpers import (
    OptimisticUpdateResult,
    clear_optimistic_state,
    resolve_optimistic_update,
    set_optimistic_fields,
)
from .ratelimit import async_check_bootstrap_reserve_or_raise as _check_bootstrap_reserve_or_raise

if TYPE_CHECKING:
    from homeassistant.helpers.entity_platform import AddConfigEntryEntitiesCallback

    from .coordinator import TadoConfigEntry, TadoDataUpdateCoordinator

_LOGGER = logging.getLogger(__name__)

PARALLEL_UPDATES = 1

# Operation modes for hot water
STATE_AUTO = "auto"  # Follow schedule (no overlay)
STATE_HEAT = "heat"  # Timer or manual heating
OPERATION_MODES = [STATE_AUTO, STATE_HEAT, STATE_OFF]


async def async_setup_entry(
    hass: HomeAssistant,
    entry: TadoConfigEntry,
    async_add_entities: AddConfigEntryEntitiesCallback,
) -> None:
    """Set up Tado CE water heater from a config entry."""
    _LOGGER.debug("Tado CE water_heater: Setting up...")
    coordinator = entry.runtime_data
    data_loader = coordinator.data_loader
    home_id = coordinator.home_id
    zones_info = await hass.async_add_executor_job(data_loader.load_zones_info_file)

    water_heaters = []

    if zones_info:
        _LOGGER.debug("Tado CE water_heater: Found %s zones", len(zones_info))
        for zone in zones_info:
            zone_id = str(zone.get("id"))
            zone_name = zone.get("name", f"Zone {zone_id}")
            zone_type = zone.get("type")

            if zone_type == "HOT_WATER":
                _LOGGER.debug("Tado CE water_heater: Creating entity for zone %s (%s)", zone_id, zone_name)
                water_heaters.append(TadoWaterHeater(coordinator, zone_id, zone_name, home_id))

    if water_heaters:
        async_add_entities(water_heaters, True)
        _LOGGER.info("Tado CE water heaters loaded: %s", len(water_heaters))
    else:
        _LOGGER.debug("Tado CE: No hot water zones found")


class TadoWaterHeater(CoordinatorEntity["TadoDataUpdateCoordinator"], WaterHeaterEntity):
    """TadoWaterHeater."""

    _attr_has_entity_name = True

    """Tado CE Water Heater Entity."""

    def __init__(self, coordinator: TadoDataUpdateCoordinator, zone_id: str, zone_name: str, home_id: str) -> None:
        """Initialize."""
        super().__init__(coordinator)
        self._zone_id = zone_id
        self._zone_name = zone_name
        self._home_id = home_id
        self._entry_id = coordinator.config_entry.entry_id

        _meta = ENTITY_REGISTRY["water_heater_hot_water"]
        self._attr_name = None
        self._attr_translation_key = _meta.translation_key
        self._attr_unique_id = f"tado_ce_{home_id}_{_meta.unique_id_suffix.format(zone_id=zone_id)}"
        self._attr_temperature_unit = UnitOfTemperature.CELSIUS
        self._attr_min_temp = 30
        self._attr_max_temp = 65
        self._attr_device_info = get_zone_device_info(zone_id, zone_name, "HOT_WATER", home_id)

        self._attr_current_operation = None
        self._attr_current_temperature = None
        self._attr_target_temperature = None
        self._attr_available = False

        # Supported features - will be updated based on zone capabilities
        self._supports_temperature = False
        self._attr_supported_features = WaterHeaterEntityFeature.OPERATION_MODE
        self._attr_operation_list = OPERATION_MODES

        self._overlay_type = None
        self._entity_type = "water_heater"

        # Optimistic update tracking
        self._optimistic_set_at: float | None = None

        # Layer 2: Sequence number tracking
        self._optimistic_sequence: int | None = None
        # Layer 3: Expected state confirmation
        self._expected_operation: str | None = None
        self._expected_temperature: float | None = None

    @property
    def extra_state_attributes(self) -> dict[str, Any] | None:
        """Return extra state attributes."""
        return {
            "overlay_type": _format_overlay_type(self._overlay_type),
            "zone_id": self._zone_id,
        }

    @callback
    def _handle_coordinator_update(self) -> None:
        """Handle coordinator data update."""
        self.update()
        self.async_write_ha_state()

    def _extract_zone_data(self) -> dict[str, Any] | None:
        """Extract and validate zone data from coordinator.

        Returns:
            Zone data dict if available and online, None otherwise.
        """
        coord_data = self.coordinator.data or {}
        data = coord_data.get("zones")
        if not data:
            _LOGGER.debug("No zones data for %s (zone %s)", self._zone_name, self._zone_id)
            return None

        zone_states = data.get("zoneStates") or {}
        zone_data = zone_states.get(self._zone_id)
        if not zone_data:
            _LOGGER.debug("No zone data for %s (zone %s)", self._zone_name, self._zone_id)
            return None

        link = zone_data.get("link") or {}
        if link.get("state") != "ONLINE":
            _LOGGER.debug("Zone %s link state: %s", self._zone_name, link.get("state"))
            return None

        return zone_data

    def _resolve_api_operation(
        self, overlay: dict[str, Any] | None, api_overlay_type: str | None, power: str | None,
    ) -> str:
        """Determine API operation mode from overlay state."""
        if not overlay or api_overlay_type is None:
            return STATE_AUTO
        if api_overlay_type == "TIMER":
            return STATE_HEAT
        if api_overlay_type == "MANUAL":
            return STATE_OFF if power == "OFF" else STATE_HEAT
        return STATE_AUTO

    @callback
    def update(self) -> None:
        """Update water heater state from JSON file."""
        _LOGGER.debug("TadoWaterHeater.update() called for %s (zone %s)", self._zone_name, self._zone_id)

        if self.coordinator.is_entity_fresh(self.entity_id):
            _LOGGER.debug("Hot water %s: Skipping update (entity is fresh)", self._zone_name)
            return

        try:
            zone_data = self._extract_zone_data()
            if not zone_data:
                self._attr_available = False
                return

            _LOGGER.debug("Zone %s link state OK, setting available=True", self._zone_name)
            setting = zone_data.get("setting") or {}
            power = setting.get("power")
            overlay = zone_data.get("overlay")
            api_overlay_type = zone_data.get("overlayType")

            # Read target temperature from setting (for systems that support it)
            temp_data = setting.get("temperature") or {}
            api_target_temp = temp_data.get("celsius")

            # Enable temperature feature if zone supports it
            if api_target_temp is not None and not self._supports_temperature:
                self._supports_temperature = True
                self._attr_supported_features = (
                    WaterHeaterEntityFeature.OPERATION_MODE | WaterHeaterEntityFeature.TARGET_TEMPERATURE
                )
                _LOGGER.debug("Hot water zone %s supports temperature control", self._zone_name)

            api_operation = self._resolve_api_operation(overlay, api_overlay_type, power)

            # Resolve optimistic state using shared helper
            result = resolve_optimistic_update(
                self,
                api_values={"operation": api_operation, "temperature": api_target_temp},
                entry_id=self._entry_id,
            )

            if result == OptimisticUpdateResult.PRESERVE_OPTIMISTIC:
                # Keep optimistic state until API confirms
                if self._expected_operation is not None:
                    self._attr_current_operation = self._expected_operation
                if self._expected_temperature is not None:
                    self._attr_target_temperature = self._expected_temperature
                _LOGGER.debug(
                    "Hot water %s: Using optimistic state: operation=%s, temp=%s",
                    self._zone_name,
                    self._attr_current_operation,
                    self._attr_target_temperature,
                )
            else:
                # No optimistic state or confirmed - use API values
                self._attr_current_operation = api_operation
                self._overlay_type = api_overlay_type
                self._attr_target_temperature = api_target_temp

            self._attr_available = True

        except FileNotFoundError as e:
            _LOGGER.warning("Data file not found for %s: %s", self.name, e)
            self._attr_available = False
        except json.JSONDecodeError as e:
            _LOGGER.warning("Invalid JSON for %s: %s", self.name, e)
            self._attr_available = False
        except Exception:
            _LOGGER.exception("Failed to update %s", self.name)
            self._attr_available = False

    async def _execute_operation_mode(self, operation_mode: str) -> bool:
        """Execute a single attempt to set the operation mode via API.

        Returns:
            True if successful, False otherwise.
        """
        client = self.coordinator.api_client
        if operation_mode == STATE_AUTO:
            success = await client.delete_zone_overlay(self._zone_id)
            if success:
                _LOGGER.info("Resumed schedule for %s", self._zone_name)
                await async_trigger_immediate_refresh(self.hass, self.entity_id, "hot_water_auto")
            return success

        if operation_mode == STATE_HEAT:
            duration = self._get_timer_duration()
            success = await self._async_set_timer(duration, None)
            if success:
                await async_trigger_immediate_refresh(self.hass, self.entity_id, "hot_water_heat")
            return success

        if operation_mode == STATE_OFF:
            success = await self._async_turn_off()
            if success:
                await async_trigger_immediate_refresh(self.hass, self.entity_id, "hot_water_off")
            return success

        return False

    async def async_set_operation_mode(self, operation_mode: str) -> None:
        """Set new operation mode with retry logic (async)."""
        await _check_bootstrap_reserve_or_raise(self.hass, f"hot water {self._zone_name}", coordinator=self.coordinator)

        # Capture state before overlay (non-AUTO only — AUTO is a restoration point)
        if operation_mode != STATE_AUTO:
            await self.coordinator.async_capture_state(
                self._zone_id, self._entity_type, "manual_override",
            )

        previous_mode = self._attr_current_operation
        previous_overlay = self._overlay_type

        # Optimistic update BEFORE API call
        self._attr_current_operation = operation_mode
        if operation_mode == STATE_AUTO:
            self._overlay_type = None
        elif operation_mode == STATE_HEAT:
            self._overlay_type = "TIMER"  # type: ignore[assignment]
        elif operation_mode == STATE_OFF:
            self._overlay_type = "MANUAL"  # type: ignore[assignment]

        # Set optimistic fields using shared helper
        await set_optimistic_fields(
            self, self.coordinator,
            expected={"operation": operation_mode},
        )

        _LOGGER.debug(
            "Hot water %s: Set optimistic state: operation=%s, seq=%s",
            self._zone_name,
            operation_mode,
            self._optimistic_sequence,
        )

        self.async_write_ha_state()

        success = False
        for attempt in range(1, MAX_RETRY_ATTEMPTS + 1):
            success = await self._execute_operation_mode(operation_mode)
            if success:
                break

            if attempt < MAX_RETRY_ATTEMPTS:
                delay = retry_delay(attempt)
                _LOGGER.warning(
                    "Failed to set operation mode to %s (attempt %s/%s), retrying in %.1fs",
                    operation_mode, attempt, MAX_RETRY_ATTEMPTS, delay,
                )
                await asyncio.sleep(delay)

        if not success:
            _LOGGER.error(
                "ROLLBACK: Failed to set operation mode to %s after %s attempts.",
                operation_mode, MAX_RETRY_ATTEMPTS,
            )
            self._attr_current_operation = previous_mode
            self._overlay_type = previous_overlay
            clear_optimistic_state(self)
            self.async_write_ha_state()
            raise HomeAssistantError(
                f"Hot water {self._zone_name}: Set {operation_mode} failed after {MAX_RETRY_ATTEMPTS} attempts",
                translation_domain=DOMAIN,
            )

    def set_operation_mode(self, operation_mode: str) -> None:
        """Set new operation mode (sync wrapper for backward compatibility).

        Home Assistant will call async_set_operation_mode() directly.
        This is kept for backward compatibility only.
        """
        # Home Assistant handles async methods automatically

    def _get_timer_duration(self) -> int:
        """Get configured timer duration in minutes (default 60)."""
        try:
            config_manager = self.coordinator.config_manager
            if config_manager:
                return config_manager.get_hot_water_timer_duration()
        except (AttributeError, TypeError) as e:
            _LOGGER.debug("Failed to get timer duration from config: %s", e)

        # Default to 60 minutes
        return 60


    async def _async_turn_off(self) -> bool:
        """Turn off hot water (async)."""
        if not self._home_id:
            _LOGGER.error("No home_id configured for hot water zone")
            return False

        # Capture state before overlay
        await self.coordinator.async_capture_state(
            self._zone_id, self._entity_type, "manual_override",
        )

        client = self.coordinator.api_client

        setting = {"type": "HOT_WATER", "power": "OFF"}
        termination = {"type": "MANUAL"}

        success = await client.set_zone_overlay(self._zone_id, setting, termination)
        if success:
            _LOGGER.info("Turned off %s", self._zone_name)
            self._attr_current_operation = STATE_OFF
        return success

    async def _async_set_timer(self, duration_minutes: int, temperature: float | None = None) -> bool:
        """Turn on hot water with timer (async)."""
        if not self._home_id:
            _LOGGER.error("No home_id configured for hot water zone")
            return False

        # Capture state before timer overlay
        await self.coordinator.async_capture_state(
            self._zone_id, self._entity_type, "set_timer",
        )

        client = self.coordinator.api_client

        # Build setting payload
        setting = {"type": "HOT_WATER", "power": "ON"}

        # Add temperature if provided (for solar water heater systems)
        if temperature is not None:
            setting["temperature"] = {"celsius": temperature}  # type: ignore[assignment]

        termination = build_timer_termination(duration_minutes=duration_minutes)

        success = await client.set_zone_overlay(self._zone_id, setting, termination)
        if success:
            temp_str = f" at {temperature}°C" if temperature is not None else ""
            _LOGGER.info("Turned on %s for %s minutes%s", self._zone_name, duration_minutes, temp_str)
            self._attr_current_operation = STATE_HEAT
        return success

    async def async_set_timer(self, duration_minutes: int, temperature: float | None = None) -> bool:
        """Public async method to set timer (for service calls)."""
        await _check_bootstrap_reserve_or_raise(self.hass, f"hot water {self._zone_name}", coordinator=self.coordinator)

        success = await self._async_set_timer(duration_minutes, temperature)
        if success:
            await async_trigger_immediate_refresh(self.hass, self.entity_id, "hot_water_timer")
        return success

    async def async_set_temperature(self, **kwargs: Any) -> None:
        """Set new target temperature (async)."""
        temperature = kwargs.get("temperature")
        if temperature is None:
            _LOGGER.warning("No temperature provided")
            return

        if not self._supports_temperature:
            _LOGGER.warning("Hot water zone %s does not support temperature control", self._zone_name)
            return

        if not self._home_id:
            _LOGGER.error("No home_id configured")
            return

        await _check_bootstrap_reserve_or_raise(self.hass, f"hot water {self._zone_name}", coordinator=self.coordinator)

        # Capture state before temperature overlay
        await self.coordinator.async_capture_state(
            self._zone_id, self._entity_type, "manual_override",
        )

        old_temp = self._attr_target_temperature
        old_operation = self._attr_current_operation
        old_overlay = self._overlay_type

        self._attr_target_temperature = temperature
        self._attr_current_operation = STATE_HEAT
        self._overlay_type = "MANUAL"  # type: ignore[assignment]

        # Set optimistic fields using shared helper
        await set_optimistic_fields(
            self, self.coordinator,
            expected={"operation": STATE_HEAT, "temperature": temperature},
        )

        _LOGGER.debug(
            "Hot water %s: Set optimistic state: temp=%s, seq=%s",
            self._zone_name,
            temperature,
            self._optimistic_sequence,
        )

        self.async_write_ha_state()

        client = self.coordinator.api_client

        # Set temperature with manual overlay
        setting = {
            "type": "HOT_WATER",
            "power": "ON",
            "temperature": {"celsius": temperature},
        }
        termination = {"type": "MANUAL"}

        api_success = False
        try:
            async with asyncio.timeout(10):
                api_success = await client.set_zone_overlay(self._zone_id, setting, termination)
        except TimeoutError:
            _LOGGER.warning("TIMEOUT: %s temperature API call timed out", self._zone_name)
        except Exception as e:  # noqa: BLE001 — HA entity action pattern
            _LOGGER.warning("ERROR: %s temperature API call failed (%s)", self._zone_name, e)

        if api_success:
            _LOGGER.info("Set %s temperature to %s°C", self._zone_name, temperature)
            await async_trigger_immediate_refresh(self.hass, self.entity_id, "hot_water_temperature")
        else:
            _LOGGER.warning("ROLLBACK: %s temperature change failed", self._zone_name)
            self._attr_target_temperature = old_temp
            self._attr_current_operation = old_operation
            self._overlay_type = old_overlay
            clear_optimistic_state(self)
            self.async_write_ha_state()
            raise HomeAssistantError(
                f"Hot water {self._zone_name}: Set temperature to {temperature}°C failed",
                translation_domain=DOMAIN,
            )
