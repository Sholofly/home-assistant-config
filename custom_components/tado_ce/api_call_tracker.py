"""Tado CE API Call Tracker — quota monitoring, rate calculation, reset prediction."""

from __future__ import annotations

import asyncio
from datetime import UTC, datetime, timedelta
import logging
from pathlib import Path
from threading import Lock
from typing import TYPE_CHECKING, Any

from homeassistant.exceptions import HomeAssistantError
from homeassistant.util import dt as dt_util

from .helpers import parse_iso_datetime
from .storage import async_load_json, async_save_json, load_json_sync, save_json_sync

if TYPE_CHECKING:
    from homeassistant.core import HomeAssistant

    from .config_manager import ConfigurationManager

_LOGGER = logging.getLogger(__name__)

# Call type codes
CALL_TYPE_ZONE_STATES = 1
CALL_TYPE_WEATHER = 2
CALL_TYPE_ZONES = 3
CALL_TYPE_MOBILE_DEVICES = 4
CALL_TYPE_OVERLAY = 5
CALL_TYPE_PRESENCE_LOCK = 6
CALL_TYPE_HOME_STATE = 7
CALL_TYPE_CAPABILITIES = 8

CALL_TYPE_NAMES = {
    CALL_TYPE_ZONE_STATES: "zoneStates",
    CALL_TYPE_WEATHER: "weather",
    CALL_TYPE_ZONES: "zones",
    CALL_TYPE_MOBILE_DEVICES: "mobileDevices",
    CALL_TYPE_OVERLAY: "overlay",
    CALL_TYPE_PRESENCE_LOCK: "presenceLock",
    CALL_TYPE_HOME_STATE: "homeState",
    CALL_TYPE_CAPABILITIES: "capabilities",
}

# Rate extrapolation thresholds
_MIN_CALLS_FOR_RATE = 20
_MAX_REASONABLE_RATE = 100
_HOURS_IN_DAY = 24
_DEFAULT_CALLS_PER_HOUR = 15
_DEFAULT_DAY_INTERVAL_MIN = 10
_AVG_CALLS_PER_POLL = 2.5
_MIN_TIME_SPAN_HOURS = 1.0


class APICallTracker:
    """Track API calls with persistent storage.

    Async methods use hass executor for non-blocking I/O.
    Sync methods are kept for compatibility with non-async contexts.
    Supports per-home file paths for multi-home setups.
    """

    def __init__(
        self,
        hass: HomeAssistant,
        data_dir: Path,
        retention_days: int = 14,
        home_id: str | None = None,
        config_manager: ConfigurationManager | None = None,
    ) -> None:
        """Initialize API call tracker.

        Args:
            hass: Home Assistant instance.
            data_dir: Directory for storing call history
            retention_days: Number of days to retain history (0 = forever)
            home_id: Optional home ID for per-home file paths
            config_manager: Optional ConfigurationManager for config-based rate estimation
        """
        self._hass = hass
        self.data_dir = data_dir
        self.retention_days = retention_days
        self.home_id = home_id
        self._config_manager = config_manager

        # Use per-home file path if home_id provided
        from .const import get_data_file  # avoid circular import

        self.history_file = get_data_file("api_call_history", home_id)

        self._lock = Lock()
        self._async_lock = asyncio.Lock()
        self._call_history: dict[str, list[dict[str, Any]]] = {}
        self._last_cleanup_date = None
        self._initialized = False
        self._dirty = False

        # Do not call blocking mkdir here — __init__ runs in the event loop.
        # Directory creation is deferred to _save_history_sync() / _save_history_async().

    def _load_history_sync(self) -> dict[str, Any]:
        """Load call history from disk synchronously."""
        try:
            data = load_json_sync(self.history_file)
            if data is not None:
                return data  # type: ignore[return-value]
        except (OSError, HomeAssistantError):
            _LOGGER.exception("Failed to load API call history")
        return {}

    def _save_history_sync(self, data: dict[str, Any]) -> None:
        """Save call history to disk synchronously with atomic write."""
        try:
            save_json_sync(self.history_file, data)
        except (OSError, TypeError):
            _LOGGER.exception("Failed to save API call history")

    async def _load_history_async(self) -> dict[str, Any]:
        """Load call history from disk using executor."""
        try:
            data = await async_load_json(self._hass, self.history_file)
            if data is not None:
                return data  # type: ignore[return-value]
        except (OSError, HomeAssistantError):
            _LOGGER.exception("Failed to load API call history")
        return {}

    async def _save_history_async(self, data: dict[str, Any]) -> None:
        """Save call history to disk using executor with atomic write.

        Uses asyncio.Lock to serialize concurrent writes.
        """
        async with self._async_lock:
            try:
                await async_save_json(self._hass, self.history_file, data)
            except (OSError, TypeError):
                _LOGGER.exception("Failed to save API call history")

    async def async_init(self) -> None:
        """Initialize tracker asynchronously (load history from disk).

        Cleanup is performed outside the lock to avoid deadlock — async_cleanup_old_records
        calls _save_history_async which also acquires _async_lock (non-reentrant).
        Fixes #170.
        """
        if self._initialized:
            return

        async with self._async_lock:
            if self._initialized:  # Double-check after acquiring lock
                return

            self._call_history = await self._load_history_async()
            self._initialized = True
            _LOGGER.debug("Loaded API call history: %s dates", len(self._call_history))

        # Cleanup outside lock — async_cleanup_old_records → _save_history_async
        # also acquires _async_lock, so calling it inside would deadlock.
        await self.async_cleanup_old_records()
        self._last_cleanup_date = dt_util.utcnow().date()  # type: ignore[assignment]

    def _ensure_initialized_sync(self) -> None:
        """Ensure tracker is initialized synchronously.

        Should only be used when async_init() cannot be called.
        """
        if not self._initialized:
            self._call_history = self._load_history_sync()
            self._initialized = True
            _LOGGER.debug("Loaded API call history (sync): %s dates", len(self._call_history))

    @property
    def needs_save(self) -> bool:
        """Return True if there are unsaved changes."""
        return self._dirty

    async def async_save_if_dirty(self) -> None:
        """Save call history to disk if there are unsaved changes.

        Called by coordinator poll cycle and integration unload.
        """
        if not self._dirty:
            return
        await self._save_history_async(dict(self._call_history))
        self._dirty = False

    async def async_record_call(self, call_type: int, status_code: int, timestamp: datetime | None = None) -> None:
        """Record an API call asynchronously.

        Args:
            call_type: Type of API call (1-7)
            status_code: HTTP status code
            timestamp: Call timestamp (defaults to now in UTC)
        """
        if not self._initialized:
            await self.async_init()

        if timestamp is None:
            timestamp = dt_util.utcnow()
        elif timestamp.tzinfo is None:
            timestamp = timestamp.replace(tzinfo=UTC)

        date_key = timestamp.strftime("%Y-%m-%d")
        today = timestamp.date()
        should_cleanup = False

        call_record = {
            "type": call_type,
            "type_name": CALL_TYPE_NAMES.get(call_type, "unknown"),
            "status": status_code,
            "timestamp": timestamp.isoformat(),
        }

        with self._lock:
            if date_key not in self._call_history:
                self._call_history[date_key] = []
            self._call_history[date_key].append(call_record)

            if self._last_cleanup_date is None or self._last_cleanup_date < today:
                self._last_cleanup_date = today  # type: ignore[assignment]
                should_cleanup = True

        # Mark dirty — actual save happens in coordinator poll cycle or unload
        self._dirty = True

        if should_cleanup:
            await self.async_cleanup_old_records()

        _LOGGER.debug("Recorded API call: %s (status %s)", CALL_TYPE_NAMES.get(call_type), status_code)


    def get_call_history(self, days: int = 1) -> list[dict[str, Any]]:
        """Get list of API calls from the last N days.

        Args:
            days: Number of days to retrieve

        Returns:
            List of call records sorted by timestamp (newest first)
        """
        self._ensure_initialized_sync()

        cutoff_date = (dt_util.utcnow() - timedelta(days=days)).strftime("%Y-%m-%d")
        calls = []

        with self._lock:
            for date_key, date_calls in self._call_history.items():
                if date_key >= cutoff_date:
                    calls.extend(date_calls)

        calls.sort(key=lambda x: x["timestamp"], reverse=True)
        return calls

    async def async_cleanup_old_records(self) -> None:
        """Remove records older than retention period (async)."""
        if self.retention_days == 0:
            return

        cutoff_str = (dt_util.utcnow() - timedelta(days=self.retention_days)).strftime("%Y-%m-%d")
        removed = 0

        with self._lock:
            dates_to_remove = [k for k in self._call_history if k < cutoff_str]
            for date_key in dates_to_remove:
                del self._call_history[date_key]
                removed += 1

        if removed > 0:
            await self._save_history_async(dict(self._call_history))
            _LOGGER.info("Cleaned up %s days of old API call records", removed)


    def _rate_from_history(self) -> tuple[float, str] | None:
        """Estimate calls-per-hour from recent call history.

        Returns:
            Tuple of (calls_per_hour, description) or None if insufficient data.
        """
        calls = self.get_call_history(days=1)
        if len(calls) < _MIN_CALLS_FOR_RATE:
            return None

        call_times: list[datetime] = []
        for call in calls:
            try:
                call_time = parse_iso_datetime(call["timestamp"])
                call_times.append(call_time)
            except (ValueError, TypeError, KeyError):
                continue

        if len(call_times) < _MIN_CALLS_FOR_RATE:
            return None

        call_times.sort()
        time_span_hours = (call_times[-1] - call_times[0]).total_seconds() / 3600
        if time_span_hours < _MIN_TIME_SPAN_HOURS:
            return None

        rate = len(call_times) / time_span_hours
        if not 1 <= rate <= _MAX_REASONABLE_RATE:
            return None

        return rate, f"history ({len(call_times)} calls / {time_span_hours:.1f}h)"

    def _rate_from_config(self) -> tuple[float, str]:
        """Estimate calls-per-hour from polling config.

        Uses actual calls-per-sync from enabled features and a blended
        day/night interval to account for different polling rates across
        the 24-hour cycle. This avoids overestimating the rate when
        adaptive polling raises the interval or night mode uses longer intervals.

        Returns:
            Tuple of (calls_per_hour, description).
        """
        try:
            config_manager = self._config_manager
            if not config_manager:
                return _DEFAULT_CALLS_PER_HOUR, "default"

            # Use actual calls per sync based on enabled features (1-3 calls)
            from .polling import _get_calls_per_sync

            calls_per_sync = _get_calls_per_sync(config_manager)

            # Blended interval: weighted average of day and night intervals
            # This is more accurate than using day interval alone, since
            # extrapolation covers the full period since reset (which spans
            # both day and night hours).
            from .const import DEFAULT_DAY_INTERVAL, DEFAULT_NIGHT_INTERVAL

            custom_day = config_manager.get_custom_day_interval()
            custom_night = config_manager.get_custom_night_interval()
            day_interval: float = custom_day or DEFAULT_DAY_INTERVAL
            night_interval: float = custom_night or DEFAULT_NIGHT_INTERVAL

            day_start = config_manager.get_day_start_hour()
            night_start = config_manager.get_night_start_hour()

            if day_start == night_start:
                # Uniform mode — single interval all day
                blended_interval = day_interval
            else:
                # Calculate day/night durations
                day_hours = night_start - day_start if night_start > day_start else 24 - day_start + night_start
                night_hours = 24 - day_hours

                # Weighted average interval
                blended_interval = (
                    (day_hours * day_interval) + (night_hours * night_interval)
                ) / 24

            polls_per_hour = 60 / blended_interval
            rate = polls_per_hour * calls_per_sync
            desc = (
                f"config (day={day_interval:.0f}min, night={night_interval:.0f}min, "
                f"blend={blended_interval:.1f}min, cps={calls_per_sync})"
            )
            return rate, desc
        except (AttributeError, TypeError, ValueError) as e:
            _LOGGER.debug("Failed to get config rate: %s", e)
            return _DEFAULT_CALLS_PER_HOUR, "default"

    def extrapolate_reset_time(self, current_used: int) -> datetime | None:
        """Extrapolate when the API reset happened by looking at usage rate.

        Uses a hybrid approach:
        1. If call history has enough data, use actual call rate (more accurate)
        2. Otherwise, fall back to config-based rate estimation

        Args:
            current_used: Current number of API calls used today (from Tado API)

        Returns:
            Estimated reset time (datetime in UTC), or None if not enough data
        """
        if current_used <= 0:
            return None

        self._ensure_initialized_sync()

        # Try history-based rate first, fall back to config-based
        history_result = self._rate_from_history()
        if history_result is not None:
            calls_per_hour, rate_source = history_result
        else:
            calls_per_hour, rate_source = self._rate_from_config()

        if calls_per_hour < 1:
            _LOGGER.debug("Calls per hour invalid: %s", calls_per_hour)
            return None

        # Extrapolate backwards: how many hours ago was used = 0?
        hours_since_reset = current_used / calls_per_hour

        if hours_since_reset > _HOURS_IN_DAY or hours_since_reset < 0:
            _LOGGER.debug("Extrapolated reset time out of range: %.2fh ago", hours_since_reset)
            return None

        now_utc = dt_util.utcnow()
        estimated_reset = now_utc - timedelta(hours=hours_since_reset)

        _LOGGER.debug(
            "Extrapolated reset time: %s UTC (used=%s, rate=%.1f/h [%s], %.1fh ago)",
            estimated_reset.strftime("%H:%M"),
            current_used,
            calls_per_hour,
            rate_source,
            hours_since_reset,
        )

        return estimated_reset
