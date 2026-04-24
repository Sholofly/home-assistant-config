"""Tado CE Button Platform — manual refresh, schedule reload."""

from __future__ import annotations

import asyncio
import logging
from typing import TYPE_CHECKING, Any

from homeassistant.components.button import ButtonEntity
from homeassistant.helpers.update_coordinator import CoordinatorEntity

from .const import DOMAIN
from .coordinator import TadoDataUpdateCoordinator
from .device_manager import get_hub_device_info, get_zone_device_info
from .entity_registry import ENTITY_REGISTRY, get_entity_category
from .helpers import async_trigger_immediate_refresh, build_timer_termination
from .ratelimit import async_check_bootstrap_reserve_or_raise as _check_bootstrap_reserve_or_raise

if TYPE_CHECKING:
    from homeassistant.core import HomeAssistant
    from homeassistant.helpers.entity_platform import AddConfigEntryEntitiesCallback

    from .coordinator import TadoConfigEntry

_LOGGER = logging.getLogger(__name__)

_MIN_BOOST_HEATING_RATE = 0.1  # °C/h — minimum meaningful rate for smart boost calculation

PARALLEL_UPDATES = 1

# Default timer preset durations (in minutes)
DEFAULT_TIMER_PRESETS = [30, 60, 90]


async def async_setup_entry(
    hass: HomeAssistant,
    entry: TadoConfigEntry,
    async_add_entities: AddConfigEntryEntitiesCallback,
) -> None:
    """Set up Tado CE buttons from a config entry."""
    _LOGGER.debug("Tado CE button: Setting up...")
    coordinator = entry.runtime_data
    data_loader = coordinator.data_loader
    home_id = coordinator.home_id
    zones_info = await hass.async_add_executor_job(data_loader.load_zones_info_file)

    # Get config manager to check feature toggles
    config_manager = coordinator.config_manager
    schedule_calendar_enabled = config_manager.get_schedule_calendar_enabled() if config_manager else False
    boost_buttons_enabled = config_manager.get_boost_buttons_enabled() if config_manager else True

    buttons: list[ButtonEntity] = []

    # Add Resume All Schedules button (hub-level)
    buttons.append(TadoResumeAllSchedulesButton(coordinator, home_id))

    # Add Refresh AC Capabilities button (hub-level) - only if there are AC zones
    has_ac_zones = any(z.get("type") == "AIR_CONDITIONING" for z in (zones_info or []))
    if has_ac_zones:
        buttons.append(TadoRefreshACCapabilitiesButton(coordinator, home_id))

    if zones_info:
        for zone in zones_info:
            zone_id = str(zone.get("id"))
            zone_name = zone.get("name", f"Zone {zone_id}")
            zone_type = zone.get("type")

            # Create timer preset buttons for hot water zones
            if zone_type == "HOT_WATER":
                buttons.extend(
                    TadoWaterHeaterTimerButton(coordinator, zone_id, zone_name, duration, home_id)
                    for duration in DEFAULT_TIMER_PRESETS
                )

            # Create boost buttons for heating zones (controlled by boost_buttons_enabled)
            if zone_type == "HEATING" and boost_buttons_enabled:
                # Boost button (official Tado-style: max temp for 30 min)
                buttons.append(
                    TadoBoostButton(coordinator, zone_id, zone_name, home_id),
                )
                # Smart Boost button (calculated duration based on heating rate)
                buttons.append(
                    TadoSmartBoostButton(coordinator, zone_id, zone_name, home_id),
                )

            # Create refresh schedule button for heating zones (only if calendar enabled)
            if zone_type == "HEATING" and schedule_calendar_enabled:
                buttons.append(
                    TadoRefreshScheduleButton(coordinator, zone_id, zone_name, home_id),
                )

    if buttons:
        async_add_entities(buttons, True)
        _LOGGER.info("Tado CE buttons loaded: %s", len(buttons))
    else:
        _LOGGER.info("Tado CE: No buttons to create")


class TadoResumeAllSchedulesButton(CoordinatorEntity[TadoDataUpdateCoordinator], ButtonEntity):
    """Button to resume schedules for all zones (delete all overlays)."""

    _attr_has_entity_name = True

    def __init__(self, coordinator: TadoDataUpdateCoordinator, home_id: str) -> None:
        """Initialize the TadoResumeAllSchedulesButton."""
        super().__init__(coordinator)
        _meta = ENTITY_REGISTRY["button_resume_all"]
        # Convenience alias for entry identification
        self._entry_id = coordinator.config_entry.entry_id

        self._attr_translation_key = _meta.translation_key
        self._attr_unique_id = f"tado_ce_{home_id}_{_meta.unique_id_suffix}"
        self._attr_device_info = get_hub_device_info(home_id)
        self._attr_icon = _meta.icon

    async def async_press(self) -> None:
        """Handle button press - resume schedules for all zones.

        Added bootstrap reserve check - blocks action when quota critically low.
        DRY refactor - uses shared async_trigger_immediate_refresh().
        """
        await _check_bootstrap_reserve_or_raise(self.hass, "Immediate Refresh", coordinator=self.coordinator)

        _LOGGER.info("Resume All Schedules button pressed")

        client = self.coordinator.api_client
        zones_info = await self.hass.async_add_executor_job(self.coordinator.data_loader.load_zones_info_file)

        if not zones_info:
            _LOGGER.warning("No zones found to resume schedules")
            return

        success_count = 0
        fail_count = 0

        for zone in zones_info:
            zone_id = str(zone.get("id"))
            zone_name = zone.get("name", f"Zone {zone_id}")

            try:
                if await client.delete_zone_overlay(zone_id):
                    _LOGGER.debug("Resumed schedule for %s (zone %s)", zone_name, zone_id)
                    success_count += 1
                else:
                    # API returned False - might mean no overlay existed
                    _LOGGER.debug("No overlay to delete for %s (zone %s)", zone_name, zone_id)
                    success_count += 1  # Still count as success
            except Exception:
                _LOGGER.exception("Failed to resume schedule for %s", zone_name)
                fail_count += 1

        if fail_count == 0:
            _LOGGER.info("Resume All Schedules complete: %s zones processed", success_count)
        else:
            _LOGGER.warning("Resume All Schedules: %s succeeded, %s failed", success_count, fail_count)

        # Trigger immediate refresh to update all entities
        await async_trigger_immediate_refresh(
            self.hass,
            self.entity_id,
            "resume_all_schedules",
            force=True,
            skip_debounce=True,
        )


class TadoRefreshACCapabilitiesButton(CoordinatorEntity[TadoDataUpdateCoordinator], ButtonEntity):
    """Button to refresh AC capabilities cache."""

    _attr_has_entity_name = True

    def __init__(self, coordinator: TadoDataUpdateCoordinator, home_id: str) -> None:
        """Initialize the TadoRefreshACCapabilitiesButton."""
        super().__init__(coordinator)
        _meta = ENTITY_REGISTRY["button_refresh_ac"]
        self._entry_id = coordinator.config_entry.entry_id

        self._attr_translation_key = _meta.translation_key
        self._attr_unique_id = f"tado_ce_{home_id}_{_meta.unique_id_suffix}"
        self._attr_device_info = get_hub_device_info(home_id)
        self._attr_entity_category = get_entity_category(_meta)
        self._attr_icon = _meta.icon

    async def async_press(self) -> None:
        """Handle button press - refresh AC capabilities from API."""
        from .const import get_data_file

        _LOGGER.info("Refresh AC Capabilities button pressed")

        # Use home-aware file path (TECH-2)
        home_id = self.coordinator.home_id
        ac_caps_file = get_data_file("ac_capabilities", home_id)

        # Delete existing cache to force re-fetch
        def _delete_cache() -> None:
            if ac_caps_file.exists():
                ac_caps_file.unlink()
                _LOGGER.debug("Deleted AC capabilities cache")

        await self.hass.async_add_executor_job(_delete_cache)

        # Fetch fresh capabilities
        client = self.coordinator.api_client
        zones_info = await self.hass.async_add_executor_job(self.coordinator.data_loader.load_zones_info_file)

        if not zones_info:
            _LOGGER.warning("No zones found")
            return

        # Call the sync method to re-fetch AC capabilities
        try:
            await client._sync_ac_capabilities(zones_info)
            _LOGGER.info("AC capabilities refreshed successfully")

            # Trigger coordinator refresh so AC entities
            # pick up new capabilities via _handle_coordinator_update()
            await self.coordinator.async_request_refresh()
            _LOGGER.debug("Triggered coordinator refresh for AC capabilities")
        except Exception:
            _LOGGER.exception("Failed to refresh AC capabilities")


class TadoWaterHeaterTimerButton(CoordinatorEntity[TadoDataUpdateCoordinator], ButtonEntity):
    """Button to set water heater timer with preset duration."""

    _attr_has_entity_name = True

    def __init__(
        self, coordinator: TadoDataUpdateCoordinator, zone_id: str, zone_name: str, duration: int, home_id: str,
    ) -> None:
        """Initialize the TadoWaterHeaterTimerButton.

        Args:
            coordinator: Data update coordinator
            zone_id: Zone ID
            zone_name: Zone name
            duration: Timer duration in minutes
            home_id: Tado home ID

        """
        super().__init__(coordinator)
        _meta = ENTITY_REGISTRY["button_timer"]
        self._entry_id = coordinator.config_entry.entry_id
        self._zone_id = zone_id
        self._zone_name = zone_name
        self._duration = duration

        self._attr_name = f"{duration}min Timer"
        self._attr_unique_id = f"tado_ce_{home_id}_{_meta.unique_id_suffix.format(zone_id=zone_id, duration=duration)}"
        self._attr_device_info = get_zone_device_info(zone_id, zone_name, "HOT_WATER", home_id)
        self._attr_entity_category = get_entity_category(_meta)
        self._attr_icon = _meta.icon

    async def async_press(self) -> None:
        """Handle button press - set water heater timer with preset duration."""
        from homeassistant.exceptions import HomeAssistantError
        from homeassistant.helpers import entity_registry as er

        _LOGGER.info("Timer button pressed - %s for %s minutes", self._zone_name, self._duration)

        # Capture state before timer overlay (state restoration)
        await self.coordinator.async_capture_state(
            self._zone_id, "water_heater", "set_timer",
        )

        # Find water heater entity by unique_id (more reliable than constructing from name)
        # This handles cases where HA adds suffix like _2 due to entity_id conflicts
        registry = er.async_get(self.hass)
        unique_id = f"tado_ce_{self.coordinator.home_id}_zone_{self._zone_id}_water_heater"
        entry = registry.async_get_entity_id("water_heater", DOMAIN, unique_id)

        if entry:
            water_heater_entity_id = entry
        else:
            # Fallback to name-based construction for backwards compatibility
            water_heater_entity_id = f"water_heater.{self._zone_name.lower().replace(' ', '_')}"

        # Verify entity exists before calling service
        if not self.hass.states.get(water_heater_entity_id):
            _LOGGER.error("Timer button failed - water heater entity not found: %s", water_heater_entity_id)
            raise HomeAssistantError(
                f"Water heater entity not found: {water_heater_entity_id}",
                translation_domain=DOMAIN,
                translation_key="water_heater_not_found",
                translation_placeholders={"entity_id": water_heater_entity_id},
            )

        # Convert duration (minutes) to HH:MM:SS format
        hours = self._duration // 60
        minutes = self._duration % 60
        time_period = f"{hours:02d}:{minutes:02d}:00"

        _LOGGER.info("Calling set_water_heater_timer for %s with %s", water_heater_entity_id, time_period)

        try:
            # Call the set_water_heater_timer service
            await self.hass.services.async_call(
                "tado_ce",
                "set_water_heater_timer",
                {
                    "entity_id": water_heater_entity_id,
                    "time_period": time_period,
                },
                blocking=True,
            )

            _LOGGER.info("Timer set successfully - %s for %s minutes", self._zone_name, self._duration)

        except HomeAssistantError:
            # Re-raise HomeAssistantError as-is (already has good error message)
            raise
        except Exception as e:
            # Catch any other unexpected errors and provide detailed message
            _LOGGER.exception("Timer button failed - %s min timer for %s", self._duration, self._zone_name)
            raise HomeAssistantError(
                f"Failed to set {self._duration}min timer for {self._zone_name}: {e}",
                translation_domain=DOMAIN,
                translation_key="timer_set_failed",
                translation_placeholders={
                    "duration": str(self._duration),
                    "zone_name": self._zone_name,
                    "error": str(e),
                },
            ) from e


class TadoRefreshScheduleButton(CoordinatorEntity[TadoDataUpdateCoordinator], ButtonEntity):
    """Button to refresh schedule for a specific zone."""

    _attr_has_entity_name = True

    def __init__(self, coordinator: TadoDataUpdateCoordinator, zone_id: str, zone_name: str, home_id: str) -> None:
        """Initialize the TadoRefreshScheduleButton.

        Args:
            coordinator: Data update coordinator
            zone_id: Zone ID
            zone_name: Zone name
            home_id: Tado home ID

        """
        super().__init__(coordinator)
        _meta = ENTITY_REGISTRY["button_refresh_schedule"]
        self._entry_id = coordinator.config_entry.entry_id
        self._zone_id = zone_id
        self._zone_name = zone_name

        self._attr_translation_key = _meta.translation_key
        self._attr_unique_id = f"tado_ce_{home_id}_{_meta.unique_id_suffix.format(zone_id=zone_id)}"
        self._attr_device_info = get_zone_device_info(zone_id, zone_name, "HEATING", home_id)
        # No entity_category = Controls section (action button, not config)
        self._attr_icon = _meta.icon

    async def async_press(self) -> None:
        """Handle button press - refresh schedule for this zone."""
        from .const import get_data_file
        from .storage import load_json_sync, save_json_sync

        _LOGGER.info("Refresh Schedule button pressed for %s (zone %s)", self._zone_name, self._zone_id)

        client = self.coordinator.api_client

        try:
            # Fetch fresh schedule from API
            schedule_data = await client.get_zone_schedule(self._zone_id)

            if not schedule_data:
                _LOGGER.warning("No schedule data returned for %s", self._zone_name)
                return

            # Get per-home schedules file path
            home_id = self.coordinator.home_id
            schedules_file = get_data_file("schedules", home_id)

            # Load existing schedules
            def _load_schedules() -> dict[str, Any]:
                data = load_json_sync(schedules_file)
                return data if isinstance(data, dict) else {}

            schedules = await self.hass.async_add_executor_job(_load_schedules)

            # Update this zone's schedule
            schedules[self._zone_id] = {
                "name": self._zone_name,
                "type": schedule_data.get("type", "ONE_DAY"),
                # Tado API may return null for existing keys; 'or {}' handles None correctly
                "blocks": schedule_data.get("blocks") or {},
            }

            # Save back to file using atomic write
            def _save_schedules() -> None:
                save_json_sync(schedules_file, schedules)

            await self.hass.async_add_executor_job(_save_schedules)

            # Write-through: update DataLoader cache
            self.coordinator.data_loader.update_cache("schedules", schedules)

            _LOGGER.info("Schedule refreshed for %s", self._zone_name)

            # Fire event to notify calendar entity to update
            self.hass.bus.async_fire(
                f"{DOMAIN}_schedule_updated",
                {"zone_id": self._zone_id, "zone_name": self._zone_name},
            )

        except Exception:
            _LOGGER.exception("Failed to refresh schedule for %s", self._zone_name)


# Boost button constants
BOOST_TEMPERATURE = 25.0  # Maximum temperature for boost
BOOST_DURATION_MINUTES = 30  # Default boost duration

# Smart Boost constants
SMART_BOOST_MIN_DURATION = 15  # Minimum duration in minutes
SMART_BOOST_MAX_DURATION = 180  # Maximum duration in minutes (3 hours)
SMART_BOOST_DEFAULT_RATE = 1.0  # Default heating rate if unknown (°C/h)


class TadoBoostButton(CoordinatorEntity[TadoDataUpdateCoordinator], ButtonEntity):
    """Button to boost heating to maximum temperature for 30 minutes.

    Mimics official Tado app boost functionality:
    - Sets zone to maximum temperature (25°C)
    - Timer for 30 minutes
    - Automatically resumes schedule after timer expires
    """

    _attr_has_entity_name = True

    def __init__(self, coordinator: TadoDataUpdateCoordinator, zone_id: str, zone_name: str, home_id: str) -> None:
        """Initialize the TadoBoostButton."""
        super().__init__(coordinator)
        _meta = ENTITY_REGISTRY["button_boost"]
        self._entry_id = coordinator.config_entry.entry_id
        self._zone_id = zone_id
        self._zone_name = zone_name

        self._attr_translation_key = _meta.translation_key
        self._attr_unique_id = f"tado_ce_{home_id}_{_meta.unique_id_suffix.format(zone_id=zone_id)}"
        self._attr_device_info = get_zone_device_info(zone_id, zone_name, "HEATING", home_id)
        self._attr_icon = _meta.icon

    async def async_press(self) -> None:
        """Handle button press - boost heating to max for 30 minutes.

        Added bootstrap reserve check - blocks action when quota critically low.
        DRY refactor - uses shared async_trigger_immediate_refresh().
        """
        await _check_bootstrap_reserve_or_raise(self.hass, f"Boost {self._zone_name}", coordinator=self.coordinator)

        _LOGGER.info("Boost button pressed for %s", self._zone_name)

        # Capture state before boost overlay (state restoration)
        await self.coordinator.async_capture_state(
            self._zone_id, "climate_heating", "boost",
        )

        client = self.coordinator.api_client

        setting = {
            "type": "HEATING",
            "power": "ON",
            "temperature": {"celsius": BOOST_TEMPERATURE},
        }
        termination = build_timer_termination(duration_minutes=BOOST_DURATION_MINUTES)

        api_success = False
        try:
            async with asyncio.timeout(10):
                api_success = await client.set_zone_overlay(self._zone_id, setting, termination)
        except TimeoutError:
            _LOGGER.warning("Boost TIMEOUT: %s API call timed out", self._zone_name)
        except Exception:
            _LOGGER.exception("Boost ERROR: %s API call failed ", self._zone_name)

        if api_success:
            _LOGGER.info(
                "Boost activated: %s set to %s°C for %s minutes",
                self._zone_name,
                BOOST_TEMPERATURE,
                BOOST_DURATION_MINUTES,
            )
            # Trigger immediate refresh
            await async_trigger_immediate_refresh(self.hass, self.entity_id, "boost_activated")
        else:
            _LOGGER.error("Boost failed for %s", self._zone_name)


class TadoSmartBoostButton(CoordinatorEntity[TadoDataUpdateCoordinator], ButtonEntity):
    """Button to smart boost heating with calculated duration.

    Uses heating rate sensor to calculate optimal boost duration:
    - Target: Schedule's next target temperature (or current + 3°C if unavailable)
    - Duration: (target - current) / heating_rate
    - Capped between 15 minutes and 3 hours
    """

    _attr_has_entity_name = True

    def __init__(self, coordinator: TadoDataUpdateCoordinator, zone_id: str, zone_name: str, home_id: str) -> None:
        """Initialize the TadoSmartBoostButton."""
        super().__init__(coordinator)
        _meta = ENTITY_REGISTRY["button_smart_boost"]
        self._entry_id = coordinator.config_entry.entry_id
        self._zone_id = zone_id
        self._zone_name = zone_name

        self._attr_translation_key = _meta.translation_key
        self._attr_unique_id = f"tado_ce_{home_id}_{_meta.unique_id_suffix.format(zone_id=zone_id)}"
        self._attr_device_info = get_zone_device_info(zone_id, zone_name, "HEATING", home_id)
        self._attr_icon = _meta.icon

    def _get_heating_rate(self) -> float:
        """Get heating rate with fallback chain.

        Priority:
        1. HeatingCycleCoordinator (°C/h)
        2. SmartComfortManager (°C/h)
        3. Default rate

        Returns:
            Heating rate in °C/h

        """
        # Strategy 1: HeatingCycleCoordinator (most accurate)
        heating_cycle_coordinator = self.coordinator.heating_cycle_coordinator
        if heating_cycle_coordinator:
            zone_data = heating_cycle_coordinator.get_zone_data(self._zone_id)
            if zone_data and zone_data.get("heating_rate") is not None:
                # HeatingCycleCoordinator rate is already in °C/h
                rate = zone_data.get("heating_rate")
                if rate > _MIN_BOOST_HEATING_RATE:  # type: ignore[operator]
                    _LOGGER.debug("Smart Boost: Using HeatingCycleCoordinator rate %.2f°C/h", rate)
                    return rate  # type: ignore[return-value]

        # Strategy 2: SmartComfortManager
        smart_comfort_manager = self.coordinator.smart_comfort_manager
        if smart_comfort_manager:
            rate = smart_comfort_manager.get_heating_rate(self._zone_id)
            if rate is not None and rate > _MIN_BOOST_HEATING_RATE:
                _LOGGER.debug("Smart Boost: Using SmartComfort rate %.2f°C/h", rate)
                return rate

        # Strategy 3: Default
        _LOGGER.debug("Smart Boost: Using default rate %s°C/h", SMART_BOOST_DEFAULT_RATE)
        return SMART_BOOST_DEFAULT_RATE

    async def async_press(self) -> None:
        """Handle button press - smart boost with calculated duration.

        Added bootstrap reserve check - blocks action when quota critically low.
        DRY refactor - uses shared async_trigger_immediate_refresh().
        """
        await _check_bootstrap_reserve_or_raise(self.hass, f"Smart Boost {self._zone_name}", coordinator=self.coordinator)

        _LOGGER.info("Smart Boost button pressed for %s", self._zone_name)

        # Capture state before smart boost overlay (state restoration)
        await self.coordinator.async_capture_state(
            self._zone_id, "climate_heating", "smart_boost",
        )

        coord_data = self.coordinator.data or {}
        zones_data = coord_data.get("zones") or {}
        zone_states = zones_data.get("zoneStates") or {}
        zone_data = zone_states.get(self._zone_id) or zone_states.get(str(self._zone_id))

        if not zone_data:
            _LOGGER.error("Smart Boost: No zone data for %s", self._zone_name)
            return

        sensor_data = zone_data.get("sensorDataPoints") or {}
        current_temp = (sensor_data.get("insideTemperature") or {}).get("celsius")
        if current_temp is None:
            _LOGGER.error("Smart Boost: No current temperature for %s", self._zone_name)
            return

        # Get target temperature from zone overlay/schedule setting
        setting = zone_data.get("setting") or {}
        setting_temp = (setting.get("temperature") or {}).get("celsius")
        target_temp = setting_temp
        if target_temp is None or target_temp <= current_temp:
            # No schedule target or already at/above target, use current + 3°C
            target_temp = min(current_temp + 3.0, 25.0)
            _LOGGER.debug("Smart Boost: Using default target %s°C (current + 3)", target_temp)

        # Get heating rate using fallback chain
        heating_rate = self._get_heating_rate()

        # Calculate duration: (target - current) / rate * 60 minutes
        temp_diff = target_temp - current_temp
        if temp_diff <= 0:
            _LOGGER.info("Smart Boost: Already at or above target (%s°C >= %s°C)", current_temp, target_temp)
            return

        duration_hours = temp_diff / heating_rate
        duration_minutes = int(duration_hours * 60)

        # Apply caps
        duration_minutes = max(SMART_BOOST_MIN_DURATION, min(duration_minutes, SMART_BOOST_MAX_DURATION))

        _LOGGER.info(
            "Smart Boost calculation: %s°C → %s°C, rate=%s°C/h, duration=%smin",
            current_temp,
            target_temp,
            heating_rate,
            duration_minutes,
        )

        # Set the overlay
        client = self.coordinator.api_client

        setting = {
            "type": "HEATING",
            "power": "ON",
            "temperature": {"celsius": target_temp},
        }
        termination = build_timer_termination(duration_minutes=duration_minutes)

        api_success = False
        try:
            async with asyncio.timeout(10):
                api_success = await client.set_zone_overlay(self._zone_id, setting, termination)
        except TimeoutError:
            _LOGGER.warning("Smart Boost TIMEOUT: %s API call timed out", self._zone_name)
        except Exception:
            _LOGGER.exception("Smart Boost ERROR: %s API call failed ", self._zone_name)

        if api_success:
            _LOGGER.info(
                "Smart Boost activated: %s set to %s°C for %s minutes (rate: %s°C/h)",
                self._zone_name,
                target_temp,
                duration_minutes,
                heating_rate,
            )
            # Trigger immediate refresh
            await async_trigger_immediate_refresh(self.hass, self.entity_id, "smart_boost_activated")
        else:
            _LOGGER.error("Smart Boost failed for %s", self._zone_name)
