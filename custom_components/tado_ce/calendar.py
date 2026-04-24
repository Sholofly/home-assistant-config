"""Tado CE Calendar Platform — zone heating schedules."""

from __future__ import annotations

from datetime import date, datetime, timedelta
import logging
from typing import TYPE_CHECKING, Any

from homeassistant.components.calendar import CalendarEntity, CalendarEvent
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.entity import DeviceInfo  # type: ignore[attr-defined]
from homeassistant.helpers.update_coordinator import CoordinatorEntity
from homeassistant.util import dt as dt_util

from .const import DOMAIN, MANUFACTURER, get_data_file
from .entity_registry import ENTITY_REGISTRY
from .storage import load_json_sync, save_json_sync

if TYPE_CHECKING:
    from homeassistant.core import Event
    from homeassistant.helpers.entity_platform import AddConfigEntryEntitiesCallback

    from .coordinator import TadoConfigEntry, TadoDataUpdateCoordinator
    from .data_loader import DataLoader

_LOGGER = logging.getLogger(__name__)

PARALLEL_UPDATES = 0


# Day type mappings
DAY_TYPES = {
    "ONE_DAY": ["MONDAY_TO_SUNDAY"],
    "THREE_DAY": ["MONDAY_TO_FRIDAY", "SATURDAY", "SUNDAY"],
    "SEVEN_DAY": ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"],
}

DAY_TYPE_TO_WEEKDAYS = {
    "MONDAY_TO_SUNDAY": [0, 1, 2, 3, 4, 5, 6],
    "MONDAY_TO_FRIDAY": [0, 1, 2, 3, 4],
    "SATURDAY": [5],
    "SUNDAY": [6],
    "MONDAY": [0],
    "TUESDAY": [1],
    "WEDNESDAY": [2],
    "THURSDAY": [3],
    "FRIDAY": [4],
}


def get_schedule_device_info(home_id: str) -> DeviceInfo:
    """Get device info for Heating Schedule device.

    Uses home_id in identifiers and via_device for multi-home support.

    Args:
        home_id: The home ID (required).
    """
    schedule_identifier = f"tado_ce_{home_id}_heating_schedule" if home_id != "unknown" else "tado_ce_heating_schedule"
    hub_identifier = f"tado_ce_hub_{home_id}" if home_id != "unknown" else "tado_ce_hub"

    return DeviceInfo(
        configuration_url="https://app.tado.com",
        identifiers={(DOMAIN, schedule_identifier)},
        name="Heating Schedule",
        manufacturer=MANUFACTURER,
        model="Zone Schedules",
        via_device=(DOMAIN, hub_identifier),
    )


async def async_setup_entry(
    hass: HomeAssistant,
    entry: TadoConfigEntry,
    async_add_entities: AddConfigEntryEntitiesCallback,
) -> None:
    """Set up Tado CE calendar entities."""
    coordinator = entry.runtime_data
    data_loader = coordinator.data_loader
    home_id = coordinator.home_id
    zones_info = await hass.async_add_executor_job(data_loader.load_zones_info_file)

    if not zones_info:
        _LOGGER.warning("No zones found for calendar setup")
        return

    # Fetch all schedules first
    client = coordinator.api_client
    schedules = {}

    for zone_data in zones_info:
        zone_id = str(zone_data.get("id", ""))
        zone_name = zone_data.get("name", f"Zone {zone_id}")
        zone_type = zone_data.get("type", "HEATING")

        # Only fetch HEATING zones
        if zone_type != "HEATING":
            continue

        try:
            schedule_data = await client.get_zone_schedule(zone_id)
            if schedule_data:
                schedules[zone_id] = {
                    "name": zone_name,
                    "type": schedule_data.get("type", "ONE_DAY"),
                    # Tado API may return null for existing keys; 'or {}' handles None correctly
                    "blocks": schedule_data.get("blocks") or {},
                }
        except Exception:
            _LOGGER.exception("Failed to fetch schedule for %s", zone_name)

    # Save schedules to file
    await _async_save_schedules(hass, schedules, home_id, data_loader=data_loader)

    # Create calendar entity for each zone
    calendars = []
    for zone_id, schedule in schedules.items():
        calendars.append(
            TadoZoneScheduleCalendar(
                coordinator,
                zone_id,
                schedule["name"],
                schedule,
                home_id,
            ),
        )

    async_add_entities(calendars)
    _LOGGER.info("Added %s Tado schedule calendars", len(calendars))


async def _async_save_schedules(
    hass: HomeAssistant,
    schedules: dict[str, Any],
    home_id: str | None = None,
    data_loader: DataLoader | None = None,
) -> None:
    """Save schedules to file using atomic write."""
    schedules_file = get_data_file("schedules", home_id)

    def _save() -> None:
        save_json_sync(schedules_file, schedules)

    await hass.async_add_executor_job(_save)

    # Write-through: update DataLoader cache
    if data_loader is not None:
        data_loader.update_cache("schedules", schedules)


class TadoZoneScheduleCalendar(CoordinatorEntity["TadoDataUpdateCoordinator"], CalendarEntity):
    """Calendar entity for a single zone's heating schedule."""

    _attr_has_entity_name = True
    _attr_supported_features = 0  # Read-only

    def __init__(
        self,
        coordinator: TadoDataUpdateCoordinator,
        zone_id: str,
        zone_name: str,
        schedule: dict[str, Any],
        home_id: str = "",
    ) -> None:
        """Initialize the calendar."""
        super().__init__(coordinator)
        self._zone_id = zone_id
        self._zone_name = zone_name
        self._schedule = schedule
        # Convenience alias — used for home_id lookups
        self._entry_id = coordinator.config_entry.entry_id

        # Short name for calendar sidebar (just zone name)
        _meta = ENTITY_REGISTRY["calendar_schedule"]
        self._attr_translation_key = _meta.translation_key
        self._attr_unique_id = f"tado_ce_{home_id}_{_meta.unique_id_suffix.format(zone_id=zone_id)}"
        self._attr_device_info = get_schedule_device_info(home_id)
        if _meta.icon:
            self._attr_icon = _meta.icon

        self._event: CalendarEvent | None = None
        self._unsub_schedule_update = None

    async def async_added_to_hass(self) -> None:
        """Register event listener when entity is added.

        CoordinatorEntity handles update subscription.
        Bus event listener PRESERVED — this is how RefreshScheduleButton
        communicates with calendar entities (not a coordinator update).
        """
        await super().async_added_to_hass()

        @callback
        def _handle_schedule_update(event: Event) -> None:
            """Handle schedule update event from Refresh Schedule button."""
            event_zone_id = event.data.get("zone_id")
            if event_zone_id == self._zone_id:
                _LOGGER.debug("Schedule update event received for %s", self._zone_name)
                # Reload schedule from file and trigger update
                self.hass.async_create_task(self._async_reload_schedule())

        self._unsub_schedule_update = self.hass.bus.async_listen(  # type: ignore[assignment]
            f"{DOMAIN}_schedule_updated",
            _handle_schedule_update,
        )

    async def async_will_remove_from_hass(self) -> None:
        """Unregister event listener when entity is removed."""
        if self._unsub_schedule_update:
            self._unsub_schedule_update()
            self._unsub_schedule_update = None
        await super().async_will_remove_from_hass()

    async def _async_reload_schedule(self) -> None:
        """Reload schedule from DataLoader cache (or disk fallback)."""
        try:
            # Prefer DataLoader cache (populated by button.py write-through)
            cached = self.coordinator.data_loader.get_cached("schedules")
            if cached and isinstance(cached, dict) and self._zone_id in cached:
                self._schedule = cached[self._zone_id]
                _LOGGER.info("Reloaded schedule for %s (from cache)", self._zone_name)
                self.async_write_ha_state()
                return

            # Fallback to disk read
            def _load() -> dict[str, Any]:
                home_id = self.coordinator.home_id
                schedules_file = get_data_file("schedules", home_id)
                data = load_json_sync(schedules_file)
                return data if data is not None else {}  # type: ignore[return-value]

            schedules = await self.hass.async_add_executor_job(_load)
            if self._zone_id in schedules:
                self._schedule = schedules[self._zone_id]
                _LOGGER.info("Reloaded schedule for %s (from disk)", self._zone_name)
                self.async_write_ha_state()
        except Exception:
            _LOGGER.exception("Failed to reload schedule for %s", self._zone_name)

    @property
    def event(self) -> CalendarEvent | None:
        """Return the current or next upcoming event."""
        return self._event

    async def async_update(self) -> None:
        """Update the current event."""
        now = dt_util.now()
        today = now.date()

        events = await self.async_get_events(self.hass, today, today + timedelta(days=1))

        self._event = None
        for event in sorted(events, key=lambda e: e.start):
            if event.start <= now < event.end or event.start > now:
                self._event = event
                break

    async def async_get_events(
        self,
        hass: HomeAssistant,
        start_date: date,
        end_date: date,
    ) -> list[CalendarEvent]:
        """Return calendar events within a datetime range."""
        events = []
        timetable_type = self._schedule.get("type", "ONE_DAY")
        blocks_by_day = self._schedule.get("blocks") or {}

        current = start_date
        while current < end_date:
            weekday = current.weekday()
            day_blocks = self._get_blocks_for_weekday(weekday, timetable_type, blocks_by_day)

            for block in day_blocks:
                event = self._block_to_event(block, current)
                if event:
                    events.append(event)

            current += timedelta(days=1)

        return events

    def _get_blocks_for_weekday(
        self,
        weekday: int,
        timetable_type: str,
        blocks_by_day: dict[str, Any],
    ) -> list[dict[str, Any]]:
        """Get schedule blocks for a specific weekday."""
        day_types = DAY_TYPES.get(timetable_type, ["MONDAY_TO_SUNDAY"])

        for day_type in day_types:
            weekdays = DAY_TYPE_TO_WEEKDAYS.get(day_type, [])
            if weekday in weekdays:
                # Tado API may return null for existing keys; 'or []' handles None correctly
                return blocks_by_day.get(day_type) or []

        return []

    def _block_to_event(self, block: dict[str, Any], event_date: date) -> CalendarEvent | None:
        """Convert a schedule block to a calendar event."""
        start_time = block.get("start", "00:00")
        end_time = block.get("end", "00:00")
        setting = block.get("setting") or {}

        # Skip OFF blocks
        power = setting.get("power", "OFF")
        if power != "ON":
            return None

        temp = setting.get("temperature") or {}
        if not temp:
            return None

        start_h, start_m = map(int, start_time.split(":"))
        end_h, end_m = map(int, end_time.split(":"))

        tz = dt_util.get_default_time_zone()
        start_dt = datetime(event_date.year, event_date.month, event_date.day, start_h, start_m, tzinfo=tz)

        if end_time == "00:00" and start_time != "00:00":
            end_dt = datetime(event_date.year, event_date.month, event_date.day, 23, 59, 59, tzinfo=tz)
        else:
            end_dt = datetime(event_date.year, event_date.month, event_date.day, end_h, end_m, tzinfo=tz)

        if start_dt >= end_dt:
            return None

        temp_c = temp.get("celsius", 0)

        # Include zone name in summary for calendar view
        return CalendarEvent(
            start=start_dt,
            end=end_dt,
            summary=f"{self._zone_name} {temp_c}°C",
        )
