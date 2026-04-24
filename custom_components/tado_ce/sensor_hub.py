"""Tado CE Hub Sensors — API status, home info, monitoring."""  # HA async_track_time_interval callback signature

from __future__ import annotations

import contextlib
import json
import logging
from typing import TYPE_CHECKING, Any

from homeassistant.components.sensor import (
    SensorDeviceClass,
    SensorEntity,
    SensorStateClass,
)
from homeassistant.core import callback
from homeassistant.helpers.update_coordinator import CoordinatorEntity
from homeassistant.util import dt as dt_util

from .device_manager import get_hub_device_info
from .entity_registry import ENTITY_REGISTRY, get_entity_category
from .format_helpers import format_api_status as _format_api_status
from .helpers import parse_iso_datetime
from .insights_api import calculate_api_status_recommendation

if TYPE_CHECKING:
    from .coordinator import TadoDataUpdateCoordinator

_LOGGER = logging.getLogger(__name__)


def _format_recent_calls(calls: list[dict[str, Any]]) -> list[dict[str, Any]]:
    """Format recent call entries with local timestamps."""
    result = []
    for call in calls:
        call_copy = call.copy()
        try:
            ts = parse_iso_datetime(call["timestamp"])
            local_ts = dt_util.as_local(ts)
            call_copy["timestamp"] = local_ts.strftime("%Y-%m-%d %H:%M:%S")
        except (ValueError, TypeError):
            _LOGGER.debug("Failed to convert timestamp for history call entry")
        result.append(call_copy)
    return result


def _parse_call_time_range(
    all_calls: list[dict[str, Any]],
) -> tuple[str | None, str | None]:
    """Parse oldest and newest call timestamps from sorted call list."""
    try:
        oldest_ts = parse_iso_datetime(all_calls[-1]["timestamp"])
        oldest = dt_util.as_local(oldest_ts).strftime("%Y-%m-%d %H:%M:%S")
        newest_ts = parse_iso_datetime(all_calls[0]["timestamp"])
        newest = dt_util.as_local(newest_ts).strftime("%Y-%m-%d %H:%M:%S")
        return oldest, newest
    except (KeyError, TypeError, ValueError) as e:
        _LOGGER.debug("Failed to parse oldest/newest timestamps: %s", e)
        return None, None


def _calculate_calls_per_hour(all_calls: list[dict[str, Any]]) -> float | None:
    """Calculate average API calls per hour over the last 24h."""
    try:
        from datetime import timedelta

        now = dt_util.utcnow()
        cutoff = now - timedelta(hours=24)
        last_24h = [c for c in all_calls if parse_iso_datetime(c["timestamp"]) > cutoff]
        return round(len(last_24h) / 24, 1) if last_24h else 0
    except (KeyError, TypeError, ValueError) as e:
        _LOGGER.debug("Failed to calculate calls per hour: %s", e)
        return None


def _calculate_calls_today(history_data: dict[str, Any]) -> int | None:
    """Calculate number of API calls made today."""
    try:
        today_str = dt_util.utcnow().strftime("%Y-%m-%d")
        return len(history_data.get(today_str, []))
    except (KeyError, TypeError, ValueError) as e:
        _LOGGER.debug("Failed to calculate calls today: %s", e)
        return None


def _find_most_called_endpoint(all_calls: list[dict[str, Any]]) -> str | None:
    """Find the most frequently called API endpoint."""
    try:
        endpoint_counts: dict[str, int] = {}
        for call in all_calls:
            endpoint = call.get("type_name", "unknown")
            endpoint_counts[endpoint] = endpoint_counts.get(endpoint, 0) + 1
        if endpoint_counts:
            most_called = max(endpoint_counts.items(), key=lambda x: x[1])
            return f"{most_called[0]} ({most_called[1]} calls)"
        return None
    except (KeyError, TypeError, ValueError) as e:
        _LOGGER.debug("Failed to find most called endpoint: %s", e)
        return None


class TadoHubSensor(CoordinatorEntity["TadoDataUpdateCoordinator"], SensorEntity):
    """Base class for Tado CE hub sensors.

    Provides common init (device_info, available, native_value, entity registry
    metadata) and the standard _handle_coordinator_update -> update() pattern.
    Subclasses pass a ``registry_key`` and only set sensor-specific attrs
    (e.g. ``native_unit_of_measurement``, ``device_class``) in their own
    ``__init__``.
    """

    _attr_has_entity_name = True

    def __init__(self, coordinator: TadoDataUpdateCoordinator, registry_key: str) -> None:
        """Initialize hub sensor with metadata from entity registry."""
        super().__init__(coordinator)
        _meta = ENTITY_REGISTRY[registry_key]
        self._attr_translation_key = _meta.translation_key
        self._attr_unique_id = f"tado_ce_{coordinator.home_id}_{_meta.unique_id_suffix}"
        self._attr_entity_category = get_entity_category(_meta)
        self._attr_device_info = get_hub_device_info(coordinator.home_id)
        self._attr_available = False
        self._attr_native_value = None
        # Only set static icon — subclasses with dynamic icons define @property
        if _meta.icon is not None:
            self._attr_icon = _meta.icon
        # Only override when registry says disabled (HA default is True)
        if not _meta.enabled_default:
            self._attr_entity_registry_enabled_default = False

    @callback
    def _handle_coordinator_update(self) -> None:
        self.update()
        self.async_write_ha_state()

    @callback
    def update(self) -> None:
        """Update sensor state from coordinator data. Override in subclasses."""


class TadoHomeIdSensor(TadoHubSensor):
    """Sensor showing Tado Home ID."""

    def __init__(self, coordinator: TadoDataUpdateCoordinator) -> None:
        """Initialize the TadoHomeIdSensor."""
        super().__init__(coordinator, "sensor_home_id")

    @callback
    def update(self) -> None:
        """Update sensor state from coordinator data."""
        try:
            # Use coordinator.home_id directly — always available, doesn't depend on config file
            home_id = self.coordinator.home_id
            if home_id:
                self._attr_native_value = home_id
                self._attr_available = True
            else:
                self._attr_available = False
        except Exception:  # noqa: BLE001 — HA entity update pattern
            self._attr_available = False


class TadoApiUsageSensor(TadoHubSensor):
    """Sensor for Tado API usage tracking."""

    def __init__(self, coordinator: TadoDataUpdateCoordinator) -> None:
        """Initialize the TadoApiUsageSensor."""
        super().__init__(coordinator, "sensor_api_usage")
        self._attr_native_unit_of_measurement = "calls"
        self._attr_state_class = SensorStateClass.MEASUREMENT
        self._data: dict[str, Any] = {}
        self._call_history: list[dict[str, Any]] = []

    @property
    def icon(self) -> str:
        """Return the icon for the sensor."""
        status = self._data.get("status")
        if status == "rate_limited":
            return "mdi:api-off"
        if status == "error":
            return "mdi:alert-circle"
        return "mdi:api"

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        """Return extra state attributes."""
        test_mode = self._data.get("test_mode", False)

        attrs = {
            "limit": self._data.get("limit"),
            "remaining": self._data.get("remaining"),
            "percentage_used": self._data.get("percentage_used"),
            "last_updated": self._data.get("last_updated"),
            "status": self._data.get("status"),
            "test_mode": test_mode,
        }

        if test_mode:
            attrs["test_mode_info"] = "Simulated 100-call API tier"
            test_mode_start = self._data.get("test_mode_start_time")
            test_mode_used = self._data.get("test_mode_used")
            if test_mode_start:
                attrs["test_mode_start_time"] = test_mode_start
            if test_mode_used is not None:
                attrs["test_mode_used"] = test_mode_used

        if self._call_history:
            attrs["call_history"] = self._call_history

        return attrs

    @staticmethod
    def _parse_call_history(history_data: dict | None) -> list[dict[str, Any]]:
        """Parse API call history from coordinator data into display format."""
        if not history_data or not isinstance(history_data, dict):
            return []
        all_calls: list[dict[str, Any]] = []
        for date_calls in history_data.values():
            if isinstance(date_calls, list):
                all_calls.extend(date_calls)
        all_calls.sort(key=lambda x: x.get("timestamp", ""), reverse=True)

        result: list[dict[str, Any]] = []
        for call in all_calls[:50]:
            call_copy = call.copy()
            try:
                ts = parse_iso_datetime(call["timestamp"])
                local_ts = dt_util.as_local(ts)
                call_copy["timestamp"] = local_ts.strftime("%Y-%m-%d %H:%M:%S")
            except (ValueError, TypeError):
                _LOGGER.debug("Failed to convert timestamp for call history entry")
            result.append(call_copy)
        return result

    @callback
    def update(self) -> None:
        """Update sensor state from coordinator data."""
        try:
            self._data = (self.coordinator.data or {}).get("ratelimit") or {}
            if self._data:
                used = self._data.get("used")
                if used is not None:
                    self._attr_native_value = int(used)
                    self._attr_available = True
                else:
                    self._attr_available = False
            else:
                self._attr_available = False

            try:
                history_data = (self.coordinator.data or {}).get("api_call_history")
                self._call_history = self._parse_call_history(history_data)
            except (KeyError, TypeError, ValueError) as e:
                _LOGGER.debug("Failed to load call history: %s", e)
                self._call_history = []

        except FileNotFoundError:
            _LOGGER.debug("Ratelimit file not found - first run or migration pending")
        except PermissionError:
            _LOGGER.exception("Permission denied reading ratelimit file")
        except json.JSONDecodeError:
            _LOGGER.exception("Invalid JSON in ratelimit file")
        except Exception:  # noqa: BLE001 — HA entity update pattern
            _LOGGER.exception("Unexpected error loading ratelimit data")


class TadoApiResetSensor(TadoHubSensor):
    """Sensor showing API rate limit reset time."""

    def __init__(self, coordinator: TadoDataUpdateCoordinator) -> None:
        """Initialize the TadoApiResetSensor."""
        super().__init__(coordinator, "sensor_api_reset")
        self._attr_device_class = SensorDeviceClass.TIMESTAMP
        self._reset_human: str | None = None
        self._reset_seconds: int | None = None
        self._reset_at: str | None = None
        self._last_reset: str | None = None
        self._status: str | None = None
        self._next_poll: str | None = None
        self._current_interval: int | None = None
        self._test_mode: bool = False
        self._test_mode_start_time: str | None = None  # Test Mode cycle start

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        """Return extra state attributes."""
        attrs = {
            "time_until_reset": self._reset_human,
            "reset_seconds": self._reset_seconds,
            "reset_at": self._reset_at,
            "last_reset": self._last_reset,  # When last reset happened
            "status": self._status,
            "next_poll": self._next_poll,
            "current_interval_minutes": self._current_interval,
            "test_mode": self._test_mode,
        }

        if self._test_mode:
            attrs["test_mode_info"] = "Simulated 24h cycle from enable time"
            if self._test_mode_start_time:
                attrs["test_mode_start_time"] = self._test_mode_start_time

        return attrs

    @staticmethod
    def _parse_local_timestamp(iso_str: str | None, label: str = "") -> str | None:
        """Parse ISO timestamp to local formatted string, or None on failure."""
        if not iso_str:
            return None
        try:
            dt_val = parse_iso_datetime(iso_str)
            return dt_util.as_local(dt_val).strftime("%Y-%m-%d %H:%M:%S")
        except (ValueError, TypeError) as e:
            _LOGGER.debug("Failed to parse %s: %s", label, e)
            return None

    def _update_next_poll(self, data: dict) -> None:
        """Calculate and set next poll time from ratelimit data."""
        from datetime import timedelta

        try:
            last_updated = data.get("last_updated")
            if not last_updated:
                self._next_poll = None
                self._current_interval = None
                return

            last_sync = parse_iso_datetime(last_updated)
            from .polling import get_polling_interval

            config_manager = self.coordinator.config_manager
            if config_manager:
                self._current_interval = get_polling_interval(config_manager, cached_ratelimit=data)
                next_poll_time = last_sync + timedelta(minutes=self._current_interval)
                self._next_poll = dt_util.as_local(next_poll_time).strftime("%Y-%m-%d %H:%M:%S")
            else:
                self._next_poll = None
                self._current_interval = None
        except (KeyError, TypeError, ValueError) as e:
            _LOGGER.debug("Failed to calculate next poll time: %s", e)
            self._next_poll = None
            self._current_interval = None

    @callback
    def update(self) -> None:
        """Update sensor state from coordinator data."""
        try:
            data = (self.coordinator.data or {}).get("ratelimit")
            if not data:
                return

            self._test_mode = data.get("test_mode", False)

            if data.get("test_mode_start_time") and self._test_mode:
                self._test_mode_start_time = self._parse_local_timestamp(
                    data.get("test_mode_start_time"), "test_mode_start_time",
                ) or data.get("test_mode_start_time")
            else:
                self._test_mode_start_time = None

            self._reset_human = data.get("reset_human")
            self._reset_seconds = data.get("reset_seconds")
            self._status = data.get("status", "unknown")

            reset_at = data.get("reset_at")
            if reset_at and reset_at != "unknown":
                try:
                    reset_time = parse_iso_datetime(reset_at)
                    self._attr_native_value = reset_time
                    self._attr_available = True
                    self._reset_at = dt_util.as_local(reset_time).strftime("%Y-%m-%d %H:%M:%S")
                except (ValueError, TypeError) as e:
                    _LOGGER.debug("Failed to parse reset_at: %s", e)
                    self._reset_at = None
            else:
                self._reset_at = None

            self._last_reset = self._parse_local_timestamp(data.get("last_reset_utc"), "last_reset_utc")
            self._update_next_poll(data)

        except Exception as e:  # noqa: BLE001 — HA entity update pattern
            _LOGGER.debug("Failed to update API reset sensor: %s", e)


class TadoApiLimitSensor(TadoHubSensor):
    """Sensor showing Tado API daily limit."""

    def __init__(self, coordinator: TadoDataUpdateCoordinator) -> None:
        """Initialize the TadoApiLimitSensor."""
        super().__init__(coordinator, "sensor_api_limit")
        self._attr_native_unit_of_measurement = "calls"
        self._attr_extra_state_attributes: dict[str, Any] = {}
        self._test_mode: bool = False

    @callback
    def update(self) -> None:
        """Update sensor state from coordinator data."""
        try:
            data = (self.coordinator.data or {}).get("ratelimit")
            if data:
                self._attr_native_value = data.get("limit")
                self._attr_available = self._attr_native_value is not None
                self._test_mode = data.get("test_mode", False)
            else:
                self._test_mode = False

            extra_attrs: dict[str, Any] = {
                "test_mode": self._test_mode,
            }

            if self._test_mode and data:
                extra_attrs["test_mode_info"] = "Simulated 100-call limit"

            # Load recent API calls from history (last 100 calls only to avoid DB size issues)
            try:
                from datetime import timedelta

                history = (self.coordinator.data or {}).get("api_call_history")
                if history:
                    all_calls = []
                    for calls in history.values():
                        all_calls.extend(calls)

                    all_calls.sort(key=lambda x: x["timestamp"], reverse=True)
                    raw_recent_calls = all_calls[:100]

                    recent_calls = []
                    for call in raw_recent_calls:
                        call_copy = call.copy()
                        try:
                            ts = parse_iso_datetime(call["timestamp"])
                            local_ts = dt_util.as_local(ts)
                            call_copy["timestamp"] = local_ts.strftime("%Y-%m-%d %H:%M:%S")
                        except (ValueError, TypeError):
                            _LOGGER.debug("Failed to convert timestamp for recent call entry")
                        recent_calls.append(call_copy)

                    now = dt_util.utcnow()
                    cutoff = now - timedelta(hours=24)
                    last_24h_count = sum(
                        1
                        for call in all_calls
                        if parse_iso_datetime(call["timestamp"]) > cutoff
                    )

                    extra_attrs.update(
                        {
                            "recent_calls": recent_calls,
                            "recent_calls_count": len(recent_calls),
                            "last_24h_count": last_24h_count,
                            "total_calls_tracked": len(all_calls),
                        },
                    )
            except (KeyError, TypeError, ValueError) as e:
                _LOGGER.debug("Failed to load API call history: %s", e)
                extra_attrs.update(
                    {
                        "recent_calls": [],
                        "recent_calls_count": 0,
                        "last_24h_count": 0,
                        "total_calls_tracked": 0,
                    },
                )

            self._attr_extra_state_attributes = extra_attrs
        except Exception:  # noqa: BLE001 — HA entity update pattern
            self._attr_available = False


class TadoApiStatusSensor(TadoHubSensor):
    """Sensor showing Tado API status."""

    def __init__(self, coordinator: TadoDataUpdateCoordinator) -> None:
        """Initialize the TadoApiStatusSensor."""
        super().__init__(coordinator, "sensor_api_status")
        self._remaining_calls: int | None = None
        self._total_calls: int | None = None
        self._reset_time: str | None = None
        self._recommendation: str = ""

    @property
    def icon(self) -> str:
        """Return the icon for the sensor."""
        if self._attr_native_value == "ok":
            return "mdi:check-circle"
        if self._attr_native_value == "rate_limited":
            return "mdi:alert-circle"
        return "mdi:help-circle"

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        """Return extra state attributes."""
        return {
            "remaining_calls": self._remaining_calls,
            "total_calls": self._total_calls,
            "reset_time": self._reset_time,
            "recommendation": self._recommendation,
        }

    @callback
    def update(self) -> None:
        """Update sensor state from coordinator data."""
        try:
            data = (self.coordinator.data or {}).get("ratelimit")
            if data:
                self._attr_native_value = _format_api_status(data.get("status", "unknown"))
                self._remaining_calls = data.get("remaining")
                self._total_calls = data.get("limit")
                self._reset_time = data.get("reset_human")

                self._recommendation = calculate_api_status_recommendation(
                    remaining_calls=self._remaining_calls,
                    total_calls=self._total_calls,
                    reset_time_human=self._reset_time,
                    current_interval_minutes=None,  # Could get from config_manager if needed
                )
                self._attr_available = True
            else:
                self._attr_native_value = "unknown"
                self._attr_available = True
        except Exception:  # noqa: BLE001 — HA entity update pattern
            self._attr_native_value = "error"
            self._attr_available = True


class TadoTokenStatusSensor(TadoHubSensor):
    """Sensor showing Tado token status."""

    def __init__(self, coordinator: TadoDataUpdateCoordinator) -> None:
        """Initialize the TadoTokenStatusSensor."""
        super().__init__(coordinator, "sensor_token_status")

    @property
    def icon(self) -> str:
        """Return the icon for the sensor."""
        if self._attr_native_value == "valid":
            return "mdi:key"
        return "mdi:key-alert"

    @callback
    def update(self) -> None:
        """Update sensor state from coordinator data."""
        try:
            # Check api_client's injected refresh token (from ConfigEntry.data)
            # rather than config file which may have null refresh_token
            client = self.coordinator.api_client
            if client._injected_refresh_token or client._access_token:
                self._attr_native_value = "valid"
            else:
                self._attr_native_value = "missing"
            self._attr_available = True
        except Exception:  # noqa: BLE001 — HA entity update pattern
            self._attr_native_value = "error"
            self._attr_available = True


class TadoZoneCountSensor(TadoHubSensor):
    """Sensor showing number of Tado zones."""

    def __init__(self, coordinator: TadoDataUpdateCoordinator) -> None:
        """Initialize the TadoZoneCountSensor."""
        super().__init__(coordinator, "sensor_zone_count")
        self._attr_native_unit_of_measurement = "zones"
        self._heating_zones = 0
        self._hot_water_zones = 0
        self._ac_zones = 0

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        """Return extra state attributes."""
        return {
            "heating_zones": self._heating_zones,
            "hot_water_zones": self._hot_water_zones,
            "ac_zones": self._ac_zones,
        }

    @callback
    def update(self) -> None:
        """Update sensor state from coordinator data."""
        try:
            zones = (self.coordinator.data or {}).get("zones_info")
            if zones:
                self._attr_native_value = len(zones)
                self._heating_zones = len([z for z in zones if z.get("type") == "HEATING"])
                self._hot_water_zones = len([z for z in zones if z.get("type") == "HOT_WATER"])
                self._ac_zones = len([z for z in zones if z.get("type") == "AIR_CONDITIONING"])
                self._attr_available = True
            else:
                self._attr_available = False
        except Exception:  # noqa: BLE001 — HA entity update pattern
            self._attr_available = False


class TadoLastSyncSensor(TadoHubSensor):
    """Sensor showing last sync time."""

    def __init__(self, coordinator: TadoDataUpdateCoordinator) -> None:
        """Initialize the TadoLastSyncSensor."""
        super().__init__(coordinator, "sensor_last_sync")
        self._attr_device_class = SensorDeviceClass.TIMESTAMP

    @callback
    def update(self) -> None:
        """Update sensor state from coordinator data."""
        try:
            data = (self.coordinator.data or {}).get("ratelimit")
            if data:
                last_updated = data.get("last_updated")
                if last_updated:
                    self._attr_native_value = parse_iso_datetime(last_updated)
                    self._attr_available = True
                else:
                    self._attr_available = False
            else:
                self._attr_available = False
        except Exception:  # noqa: BLE001 — HA entity update pattern
            self._attr_available = False


# ============ API Monitoring Sensors ============


class TadoNextSyncSensor(TadoHubSensor):
    """Sensor showing next API sync time."""

    def __init__(self, coordinator: TadoDataUpdateCoordinator) -> None:
        """Initialize the TadoNextSyncSensor."""
        super().__init__(coordinator, "sensor_next_sync")
        self._attr_device_class = SensorDeviceClass.TIMESTAMP
        self._countdown: str | None = None
        self._current_interval: int | None = None
        self._countdown_unsub: Any | None = None  # HA CALLBACK_TYPE

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        """Return extra state attributes."""
        return {
            "countdown": self._countdown,
            "current_interval_minutes": self._current_interval,
        }

    async def async_added_to_hass(self) -> None:
        """Start periodic countdown refresh when added to HA."""
        await super().async_added_to_hass()

        from datetime import timedelta as td

        from homeassistant.helpers.event import async_track_time_interval

        @callback
        def _refresh_countdown(_now: Any) -> None:
            """Recalculate countdown attribute periodically."""
            self._recalculate_countdown()
            self.async_write_ha_state()

        self._countdown_unsub = async_track_time_interval(
            self.hass, _refresh_countdown, td(seconds=30),
        )

    async def async_will_remove_from_hass(self) -> None:
        """Cancel periodic countdown refresh on removal."""
        if self._countdown_unsub:
            self._countdown_unsub()
            self._countdown_unsub = None
        await super().async_will_remove_from_hass()

    def _recalculate_countdown(self) -> None:
        """Recalculate countdown from current native_value."""
        from datetime import datetime

        native = self._attr_native_value
        if not isinstance(native, datetime):
            self._countdown = None
            return

        now = dt_util.utcnow()
        time_until = native - now
        if time_until.total_seconds() > 0:
            minutes = int(time_until.total_seconds() // 60)
            seconds = int(time_until.total_seconds() % 60)
            self._countdown = f"{minutes}m {seconds}s"
        else:
            self._countdown = "Overdue"

    @callback
    def update(self) -> None:
        """Update sensor state from coordinator data."""
        try:
            from datetime import timedelta

            data = (self.coordinator.data or {}).get("ratelimit")
            if not data:
                return

            last_updated = data.get("last_updated")
            if not last_updated:
                return

            last_sync = parse_iso_datetime(last_updated)

            from .polling import get_polling_interval

            config_manager = self.coordinator.config_manager
            if config_manager:
                self._current_interval = get_polling_interval(config_manager, cached_ratelimit=data)

                next_sync_time = last_sync + timedelta(minutes=self._current_interval)
                self._attr_native_value = next_sync_time
                self._attr_available = True

                self._recalculate_countdown()
            else:
                self._current_interval = None
                self._countdown = None

        except Exception as e:  # noqa: BLE001 — HA entity update pattern
            _LOGGER.debug("Failed to update Next Sync sensor: %s", e)


class TadoPollingIntervalSensor(TadoHubSensor):
    """Sensor showing current polling interval."""

    def __init__(self, coordinator: TadoDataUpdateCoordinator) -> None:
        """Initialize the TadoPollingIntervalSensor."""
        super().__init__(coordinator, "sensor_polling_interval")
        self._attr_native_unit_of_measurement = "min"
        self._attr_state_class = SensorStateClass.MEASUREMENT
        self._source: str | None = None
        self._day_interval: int | None = None
        self._night_interval: int | None = None
        self._is_night_mode: bool | None = None
        self._test_mode: bool = False

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        """Return extra state attributes."""
        return {
            "source": self._source,
            "day_interval": self._day_interval,
            "night_interval": self._night_interval,
            "is_night_mode": self._is_night_mode,
            "test_mode": self._test_mode,
        }

    @staticmethod
    def _determine_interval_source(
        *,
        user_set_custom: bool,
        custom_day: int | None,
        custom_night: int | None,
        adaptive_interval: int | None,
        baseline_interval: int,
        is_night_mode: bool,
        is_uniform_mode: bool,
    ) -> str:
        """Determine the display source label for the polling interval."""
        if user_set_custom:
            if adaptive_interval and adaptive_interval > baseline_interval:
                return "Adaptive (protecting quota)"
            if custom_day and custom_night:
                return "Custom (Day/Night)"
            if custom_day:
                return "Custom (Day only)"
            return "Custom (Night only)"
        if adaptive_interval is not None:
            if is_uniform_mode:
                return "Adaptive (Uniform Mode)"
            if is_night_mode:
                return "Adaptive (Night - fixed 120 min)"
            return "Adaptive (Day)"
        return "Default (Day/Night)"

    @callback
    def update(self) -> None:
        """Update sensor state from coordinator data."""
        try:
            from .const import DEFAULT_DAY_INTERVAL, DEFAULT_NIGHT_INTERVAL
            from .polling import _calculate_adaptive_interval, get_polling_interval

            config_manager = self.coordinator.config_manager
            if not config_manager:
                return

            ratelimit_data = (self.coordinator.data or {}).get("ratelimit")
            self._test_mode = ratelimit_data.get("test_mode", False) if ratelimit_data else False

            self._attr_native_value = get_polling_interval(config_manager, cached_ratelimit=ratelimit_data)
            self._attr_available = True

            custom_day = config_manager.get_custom_day_interval()
            custom_night = config_manager.get_custom_night_interval()
            self._day_interval = custom_day or DEFAULT_DAY_INTERVAL
            self._night_interval = custom_night or DEFAULT_NIGHT_INTERVAL

            current_hour = dt_util.now().hour
            day_start = config_manager.get_day_start_hour()
            night_start = config_manager.get_night_start_hour()
            is_uniform_mode = day_start == night_start
            self._is_night_mode = False if is_uniform_mode else not (day_start <= current_hour < night_start)

            adaptive_interval = None
            if ratelimit_data:
                with contextlib.suppress(Exception):
                    adaptive_interval = _calculate_adaptive_interval(ratelimit_data, config_manager)

            baseline_interval = self._night_interval if self._is_night_mode else self._day_interval

            self._source = self._determine_interval_source(
                user_set_custom=(custom_day is not None or custom_night is not None),
                custom_day=custom_day, custom_night=custom_night,
                adaptive_interval=adaptive_interval, baseline_interval=baseline_interval,
                is_night_mode=self._is_night_mode, is_uniform_mode=is_uniform_mode,
            )

        except Exception as e:  # noqa: BLE001 — HA entity update pattern
            _LOGGER.debug("Failed to update Polling Interval sensor: %s", e)


class TadoApiHistorySensor(TadoHubSensor):
    """Sensor showing API call history."""

    def __init__(self, coordinator: TadoDataUpdateCoordinator) -> None:
        """Initialize the TadoApiHistorySensor."""
        super().__init__(coordinator, "sensor_call_history")
        self._attr_native_unit_of_measurement = "calls"
        self._attr_state_class = SensorStateClass.MEASUREMENT
        self._history: list[dict[str, Any]] = []
        self._history_period_days: int = 14
        self._oldest_call: str | None = None
        self._newest_call: str | None = None
        self._calls_per_hour: float | None = None
        self._calls_today: int | None = None
        self._most_called_endpoint: str | None = None

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        """Return extra state attributes."""
        return {
            "history": self._history,
            "history_period_days": self._history_period_days,
            "oldest_call": self._oldest_call,
            "newest_call": self._newest_call,
            "calls_per_hour": self._calls_per_hour,
            "calls_today": self._calls_today,
            "most_called_endpoint": self._most_called_endpoint,
        }

    @callback
    def update(self) -> None:
        """Update sensor state from coordinator data."""
        try:
            try:
                _ed = self.coordinator
                self._history_period_days = _ed.config_manager.get_api_history_retention_days()
            except (AttributeError, TypeError, KeyError):
                self._history_period_days = 14

            history_data = (self.coordinator.data or {}).get("api_call_history")
            if not history_data:
                self._attr_available = True
                self._attr_native_value = 0
                self._history = []
                return

            all_calls: list[dict[str, Any]] = []
            for calls in history_data.values():
                all_calls.extend(calls)

            if not all_calls:
                self._attr_available = True
                self._attr_native_value = 0
                self._history = []
                return

            all_calls.sort(key=lambda x: x["timestamp"], reverse=True)

            self._attr_native_value = len(all_calls)
            self._attr_available = True
            self._history = _format_recent_calls(all_calls[:100])
            self._oldest_call, self._newest_call = _parse_call_time_range(all_calls)
            self._calls_per_hour = _calculate_calls_per_hour(all_calls)
            self._calls_today = _calculate_calls_today(history_data)
            self._most_called_endpoint = _find_most_called_endpoint(all_calls)

        except Exception:  # noqa: BLE001 — HA entity update pattern
            _LOGGER.exception("Failed to update Call History sensor")


class TadoApiBreakdownSensor(TadoHubSensor):
    """Sensor showing API call breakdown by type."""

    def __init__(self, coordinator: TadoDataUpdateCoordinator) -> None:
        """Initialize the TadoApiBreakdownSensor."""
        super().__init__(coordinator, "sensor_api_breakdown")
        self._breakdown_24h: dict[str, int] = {}
        self._breakdown_today: dict[str, int] = {}
        self._breakdown_total: dict[str, int] = {}
        self._top_3_types: list[dict[str, Any]] = []
        self._chart_data: list[dict[str, Any]] = []

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        """Return extra state attributes."""
        return {
            "breakdown_24h": self._breakdown_24h,
            "breakdown_today": self._breakdown_today,
            "breakdown_total": self._breakdown_total,
            "top_3_types": self._top_3_types,
            "chart_data": self._chart_data,
        }

    def _set_empty_breakdown(self) -> None:
        """Set all breakdown attributes to empty state."""
        self._attr_available = True
        self._attr_native_value = "No data"
        self._breakdown_24h = {}
        self._breakdown_today = {}
        self._breakdown_total = {}
        self._top_3_types = []
        self._chart_data = []

    @staticmethod
    def _count_by_type(calls: list[dict]) -> dict[str, int]:
        """Count API calls by type_name."""
        breakdown: dict[str, int] = {}
        for call in calls:
            type_name = call.get("type_name", "unknown")
            breakdown[type_name] = breakdown.get(type_name, 0) + 1
        return breakdown

    @callback
    def update(self) -> None:
        """Update sensor state from coordinator data."""
        try:
            from datetime import timedelta

            history_data = (self.coordinator.data or {}).get("api_call_history")
            if not history_data:
                self._set_empty_breakdown()
                return

            all_calls: list[dict] = []
            for calls in history_data.values():
                all_calls.extend(calls)

            if not all_calls:
                self._set_empty_breakdown()
                return

            now = dt_util.utcnow()
            cutoff_24h = now - timedelta(hours=24)

            calls_24h = []
            for call in all_calls:
                try:
                    ts = parse_iso_datetime(call["timestamp"])
                    if ts > cutoff_24h:
                        calls_24h.append(call)
                except (ValueError, TypeError):
                    continue

            self._breakdown_24h = self._count_by_type(calls_24h)
            self._breakdown_today = self._count_by_type(history_data.get(now.strftime("%Y-%m-%d"), []))
            self._breakdown_total = self._count_by_type(all_calls)

            if self._breakdown_24h:
                sorted_types = sorted(self._breakdown_24h.items(), key=lambda x: x[1], reverse=True)
                self._top_3_types = [{"type": t, "count": c} for t, c in sorted_types[:3]]
                self._attr_native_value = sorted_types[0][0]
            else:
                self._top_3_types = []
                self._attr_native_value = "No data"

            self._chart_data = [
                {"type": t, "count": c}
                for t, c in sorted(self._breakdown_24h.items(), key=lambda x: x[1], reverse=True)
            ]
            self._attr_available = True

        except Exception:  # noqa: BLE001 — HA entity update pattern
            _LOGGER.exception("Failed to update API Call Breakdown sensor")
