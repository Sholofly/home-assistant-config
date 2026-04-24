"""Tado CE API Client — async HTTP with per-entry isolation for multi-home support.

Async HTTP client using aiohttp with per-entry isolation for multi-home support.
"""

from __future__ import annotations

import asyncio
from contextlib import suppress
from datetime import datetime, timedelta
from http import HTTPStatus
import logging
from typing import TYPE_CHECKING, Any

import aiohttp
from homeassistant.exceptions import HomeAssistantError
from homeassistant.util import dt as dt_util

from .api_auth import TadoAuthMixin
from .api_call_tracker import (
    CALL_TYPE_CAPABILITIES,
    CALL_TYPE_HOME_STATE,
    CALL_TYPE_MOBILE_DEVICES,
    CALL_TYPE_OVERLAY,
    CALL_TYPE_PRESENCE_LOCK,
    CALL_TYPE_WEATHER,
    CALL_TYPE_ZONE_STATES,
    CALL_TYPE_ZONES,
)
from .const import API_ENDPOINT_DEVICES, MAX_RETRY_ATTEMPTS, TADO_API_BASE
from .exceptions import TadoAuthError, TadoSyncError
from .helpers import parse_iso_datetime, retry_delay
from .storage import async_load_json, async_save_json

if TYPE_CHECKING:
    from pathlib import Path

    from homeassistant.config_entries import ConfigEntry
    from homeassistant.core import HomeAssistant

    from .api_call_tracker import APICallTracker
    from .config_manager import ConfigurationManager
    from .data_loader import DataLoader

_LOGGER = logging.getLogger(__name__)

# HTTP timeout for Tado Cloud API calls (30s covers slow responses; normal < 5s)
_API_CALL_TIMEOUT = aiohttp.ClientTimeout(total=30)

# Methods safe to retry on transient 403 (idempotent)
_RETRYABLE_METHODS = frozenset({"GET", "PUT", "DELETE"})


def _format_reset_display(
    now_utc: datetime,
    calculated_reset_seconds: int | None,
    fallback_reset_seconds: int,
) -> tuple[str | None, str | None, int]:
    """Format reset time for display.

    Returns (reset_at, reset_human, reset_seconds).
    """
    if calculated_reset_seconds and calculated_reset_seconds > 0:
        hours = calculated_reset_seconds // 3600
        minutes = (calculated_reset_seconds % 3600) // 60
        reset_human = f"{hours}h {minutes}m" if hours > 0 else f"{minutes}m"
        reset_dt = now_utc + timedelta(seconds=calculated_reset_seconds)
        return reset_dt.isoformat(), reset_human, calculated_reset_seconds
    return None, None, fallback_reset_seconds


def _detect_call_type(endpoint: str) -> int | None:
    """Detect API call type from endpoint."""
    if "zoneStates" in endpoint:
        return CALL_TYPE_ZONE_STATES
    if "weather" in endpoint:
        return CALL_TYPE_WEATHER
    if "capabilities" in endpoint:
        return CALL_TYPE_CAPABILITIES
    if "zones" in endpoint and "overlay" not in endpoint:
        return CALL_TYPE_ZONES
    if "mobileDevices" in endpoint:
        return CALL_TYPE_MOBILE_DEVICES
    if "overlay" in endpoint:
        return CALL_TYPE_OVERLAY
    if "presenceLock" in endpoint:
        return CALL_TYPE_PRESENCE_LOCK
    if endpoint == "state":
        return CALL_TYPE_HOME_STATE
    return None


class TadoApiClient(TadoAuthMixin):
    """Async Tado API client with automatic token management."""

    def __init__(
        self,
        session: aiohttp.ClientSession,
        hass: HomeAssistant | None = None,
        home_id: str | None = None,
        refresh_token: str | None = None,
        config_manager: ConfigurationManager | None = None,
        api_tracker: APICallTracker | None = None,
        data_loader: DataLoader | None = None,
        config_entry: ConfigEntry | None = None,
    ) -> None:
        """Initialize async client.

        Args:
            session: aiohttp ClientSession (should be from Home Assistant)
            hass: Home Assistant instance (for accessing config_manager)
            home_id: Tado home ID for per-home file paths.
                     If provided, client uses config_{home_id}.json instead of
                     global config.json. Required for multi-home isolation.
            refresh_token: OAuth refresh token injected from config entry data.
                           If provided, _load_config() uses this instead of reading
                           from config file. Required for multi-home isolation.
            config_manager: ConfigurationManager instance for this entry.
                           Used by save_ratelimit() for test_mode check.
            api_tracker: APICallTracker instance for this entry.
            data_loader: DataLoader instance for write-through cache updates.
            config_entry: HA ConfigEntry for persisting rotated tokens across restarts.
        """
        self._session = session
        self._hass = hass  # Store hass for real-time config access
        self._access_token: str | None = None
        self._token_expiry: datetime | None = None
        self._refresh_lock = asyncio.Lock()
        self._rate_limit: dict[str, Any] = {}
        self._home_id: str | None = home_id
        self._injected_refresh_token: str | None = refresh_token
        self._config_manager = config_manager
        self._api_tracker = api_tracker
        self._data_loader = data_loader
        self._config_entry = config_entry

    def _get_data_file(self, base_name: str) -> Path:
        """Get per-home data file path.

        Args:
            base_name: Base filename without extension (e.g., "zones", "weather")

        Returns:
            Path to the data file
        """
        from .const import get_data_file

        return get_data_file(base_name, self._home_id)

    def _extract_base_name(self, file_path: Path) -> str:
        """Extract base name from per-home file path.

        Strips the ``_{home_id}`` suffix from filenames to get the cache key.
        e.g. ``zones_12345.json`` → ``zones``, ``weather_12345.json`` → ``weather``.

        Args:
            file_path: Path to the per-home JSON file.

        Returns:
            Base name suitable for DataLoader cache key.
        """
        stem = file_path.stem
        if self._home_id and stem.endswith(f"_{self._home_id}"):
            return stem[: -(len(self._home_id) + 1)]
        return stem

    async def _ensure_home_id(self) -> str | None:
        """Ensure home_id is loaded and cached.

        If home_id was injected via constructor, returns immediately.
        Falls back to reading per-home config file if not injected.
        """
        if self._home_id is None:
            config = await self._load_config()
            self._home_id = config.get("home_id")
        return self._home_id

    def _parse_ratelimit_headers(self, headers: dict[str, Any]) -> None:
        """Parse Tado rate limit headers.

        Expected format:
        - RateLimit-Policy: "perday";q=5000;w=86400
        - RateLimit: "perday";r=4962;t=xxxxx (t= may not always be present)

        Note: Header names are case-sensitive in dict, so we do case-insensitive lookup.
        Tado may not always return 't=' (reset seconds).
        """
        # Case-insensitive header lookup (Tado uses RateLimit-Policy, not ratelimit-policy)
        policy = ""
        ratelimit = ""
        for key, value in headers.items():
            key_lower = key.lower()
            if key_lower == "ratelimit-policy":
                policy = value
            elif key_lower == "ratelimit":
                ratelimit = value

        _LOGGER.debug("Rate limit headers - policy: %s, ratelimit: %s", policy, ratelimit)

        # Parse limit from policy (q=5000)
        if "q=" in policy:
            with suppress(ValueError, IndexError):
                self._rate_limit["limit"] = int(policy.split("q=")[1].split(";")[0])

        # Parse remaining from ratelimit (r=4962)
        if "r=" in ratelimit:
            with suppress(ValueError, IndexError):
                self._rate_limit["remaining"] = int(ratelimit.split("r=")[1].split(";")[0])

        # Tado API's t= header is unreliable (points to midnight UTC, not actual reset ~11:24 UTC).
        # w=86400 is the window size, not time until reset.
        # Clear stale reset_seconds so save_ratelimit uses Strategy 2/3/4.
        self._rate_limit.pop("reset_seconds", None)

        _LOGGER.debug("Parsed rate limit: %s", self._rate_limit)

    async def _load_ratelimit(self) -> dict[str, Any]:
        """Load rate limit file using executor I/O."""
        try:
            await self._ensure_home_id()
            ratelimit_path = self._get_data_file("ratelimit")
            data = await async_load_json(self._hass, ratelimit_path)  # type: ignore[arg-type]
            if data is not None and isinstance(data, dict):
                return data
        except (OSError, ValueError) as e:
            _LOGGER.debug("Could not load ratelimit file: %s", e)
        return {}

    def _calculate_test_mode_ratelimit(
        self,
        now_utc: datetime,
        prev_data: dict[str, Any],
        last_reset_utc: str | None,
        status: str,
    ) -> dict[str, Any]:
        """Calculate simulated ratelimit values for test mode.

        Independent 24-hour cycle per Test Mode session.
        Each enable starts a fresh cycle, disable returns to Live quota.
        """
        prev_test_mode = prev_data.get("test_mode", False)
        prev_test_mode_start = prev_data.get("test_mode_start_time")
        prev_test_mode_used = prev_data.get("test_mode_used", 0)

        _LOGGER.debug(
            "Test Mode: prev_test_mode=%s, prev_test_mode_start=%s, prev_test_mode_used=%s",
            prev_test_mode,
            prev_test_mode_start,
            prev_test_mode_used,
        )

        # Detect fresh enable (transition from disabled to enabled)
        # OR first time enabling (no start time recorded)
        fresh_enable = not prev_test_mode or prev_test_mode_start is None

        # Backup live last_reset_utc when entering Test Mode
        if fresh_enable and last_reset_utc:
            _LOGGER.info("Test Mode: Backing up live last_reset_utc=%s", last_reset_utc)

        # Check for 24h cycle expiry
        cycle_expired = False
        if not fresh_enable and prev_test_mode_start:
            try:
                start_time = parse_iso_datetime(prev_test_mode_start)
                cycle_end = start_time + timedelta(hours=24)
                if now_utc >= cycle_end:
                    cycle_expired = True
                    _LOGGER.info(
                        "Test Mode: 24h cycle expired (started: %s, now: %s)",
                        prev_test_mode_start,
                        now_utc.isoformat(),
                    )
            except (ValueError, TypeError) as e:
                _LOGGER.warning("Test Mode: Failed to parse start time: %s", e)
                fresh_enable = True

        # Reset on fresh enable or cycle expiry
        if fresh_enable or cycle_expired:
            test_mode_start_time = now_utc.strftime("%Y-%m-%dT%H:%M:%SZ")
            test_mode_used = 0
            _LOGGER.info(
                "Test Mode: %s - starting new cycle at %s",
                "Fresh enable" if fresh_enable else "24h cycle reset",
                test_mode_start_time,
            )
        else:
            test_mode_start_time = prev_test_mode_start  # type: ignore[assignment]
            test_mode_used = prev_test_mode_used

        # Handle error status - preserve test_mode_used
        if status == "error":
            _LOGGER.debug("Test Mode: Error status, preserving used=%s", test_mode_used)
        else:
            test_mode_used = min(test_mode_used + 1, 100)
            _LOGGER.debug("Test Mode: Simulated used=%s", test_mode_used)

        # Calculate simulated values
        remaining = max(0, 100 - test_mode_used)

        # Calculate simulated reset time from test_mode_start_time
        try:
            start_time = parse_iso_datetime(test_mode_start_time)
            test_mode_reset_at = start_time + timedelta(hours=24)
            test_mode_reset_seconds = max(0, int((test_mode_reset_at - now_utc).total_seconds()))
        except (ValueError, TypeError) as e:
            _LOGGER.warning("Test Mode: Failed to calculate reset time: %s", e)
            test_mode_reset_at = now_utc + timedelta(hours=24)
            test_mode_reset_seconds = 86400

        _LOGGER.debug(
            "Test Mode: Storing simulated values - used=%s, remaining=%s, limit=100, reset_at=%s",
            test_mode_used,
            remaining,
            test_mode_reset_at.isoformat(),
        )

        return {
            "limit": 100,
            "used": test_mode_used,
            "remaining": remaining,
            "percentage_used": round(test_mode_used, 1),
            "test_mode_flag": True,
            "test_mode_start_time": test_mode_start_time,
            "test_mode_used": test_mode_used,
            "test_mode_reset_at": test_mode_reset_at,
            "test_mode_reset_seconds": test_mode_reset_seconds,
        }

    def _calculate_live_ratelimit(
        self,
        now_utc: datetime,
        prev_data: dict[str, Any],
        real_limit: int,
        real_remaining: int,
        prev_remaining: int | None,
        last_reset_utc: str | None,
    ) -> dict[str, Any]:
        """Calculate ratelimit values from real API headers."""
        limit = real_limit
        remaining = real_remaining
        used = limit - remaining
        percentage_used = round((used / limit) * 100, 1) if limit > 0 else 0

        # Restore live last_reset_utc when exiting Test Mode
        prev_test_mode = prev_data.get("test_mode", False)
        if prev_test_mode:
            live_last_reset_utc = prev_data.get("live_last_reset_utc")
            if live_last_reset_utc:
                last_reset_utc = live_last_reset_utc
                _LOGGER.info("Test Mode disabled: Restored live last_reset_utc=%s", last_reset_utc)
            else:
                _LOGGER.debug("Test Mode disabled: No live_last_reset_utc backup found, will re-estimate")

        # Detect if rate limit has reset (remaining increased significantly)
        if prev_remaining is not None and remaining is not None:
            reset_threshold = max(20, int(limit * 0.05))
            if remaining > prev_remaining + reset_threshold:
                last_reset_utc = now_utc.strftime("%Y-%m-%dT%H:%M:%SZ")
                _LOGGER.info(
                    "Rate limit reset detected at %s (remaining: %s -> %s, threshold: %s)",
                    last_reset_utc,
                    prev_remaining,
                    remaining,
                    reset_threshold,
                )

        return {
            "limit": limit,
            "used": used,
            "remaining": remaining,
            "percentage_used": percentage_used,
            "test_mode_flag": False,
            "last_reset_utc": last_reset_utc,
        }

    def _calculate_reset_seconds(
        self,
        now_utc: datetime,
        api_reset_seconds: int,
        last_reset_utc: str | None,
        used: int,
    ) -> tuple[int | None, str | None]:
        """Calculate seconds until reset using multiple strategies.

        Returns (calculated_reset_seconds, updated_last_reset_utc).
        """
        calculated: int | None = None

        # Strategy 1: Use API-provided reset_seconds if available and valid
        if api_reset_seconds and api_reset_seconds > 0:
            return api_reset_seconds, last_reset_utc

        # Strategy 2: Calculate from last known reset time (rolling 24h window)
        if last_reset_utc:
            calculated = self._reset_from_last_known(now_utc, last_reset_utc)
            if calculated is not None:
                return calculated, last_reset_utc

        # Strategy 3: Extrapolate from usage rate
        if used > 0:
            calculated, last_reset_utc = self._reset_from_extrapolation(
                now_utc, used, last_reset_utc,
            )
            if calculated is not None:
                return calculated, last_reset_utc

        # Strategy 4: Estimate from call history (first call mode)
        calculated = self._reset_from_call_history(now_utc)
        return calculated, last_reset_utc

    def _reset_from_last_known(
        self, now_utc: datetime, last_reset_utc: str,
    ) -> int | None:
        """Calculate reset seconds from last known reset time (rolling 24h window)."""
        try:
            last_reset = parse_iso_datetime(last_reset_utc)
            next_reset = last_reset + timedelta(hours=24)
            while next_reset <= now_utc:
                next_reset += timedelta(hours=24)
            seconds_until_reset = int((next_reset - now_utc).total_seconds())
            if seconds_until_reset > 0:
                _LOGGER.debug("Using last_reset_utc: next reset at %s UTC", next_reset.strftime("%H:%M"))
                return seconds_until_reset
        except (ValueError, TypeError) as e:
            _LOGGER.debug("Failed to calculate reset from last_reset_utc: %s", e)
        return None

    def _reset_from_extrapolation(
        self,
        now_utc: datetime,
        used: int,
        last_reset_utc: str | None,
    ) -> tuple[int | None, str | None]:
        """Extrapolate reset time from usage rate.

        Returns (calculated_reset_seconds, updated_last_reset_utc).
        """
        tracker = self._api_tracker
        if not tracker:
            return None, last_reset_utc
        try:
            estimated_reset = tracker.extrapolate_reset_time(used)
            if estimated_reset:
                if not last_reset_utc:
                    last_reset_utc = estimated_reset.strftime("%Y-%m-%dT%H:%M:%SZ")
                    _LOGGER.debug("Set last_reset_utc from extrapolation: %s", last_reset_utc)
                next_reset = estimated_reset + timedelta(hours=24)
                seconds_until_reset = int((next_reset - now_utc).total_seconds())
                if seconds_until_reset > 0:
                    _LOGGER.debug("Using extrapolated reset time: %s UTC", estimated_reset.strftime("%H:%M"))
                    return seconds_until_reset, last_reset_utc
        except (ValueError, TypeError, KeyError) as e:
            _LOGGER.debug("Failed to extrapolate reset time: %s", e)
        return None, last_reset_utc

    @staticmethod
    def _find_first_calls_by_day(all_calls: list[dict]) -> dict[str, Any]:
        """Find the earliest API call for each day from call history."""
        first_calls_by_day: dict[str, Any] = {}
        for call in all_calls:
            call_time = parse_iso_datetime(call["timestamp"])
            date_key = call_time.strftime("%Y-%m-%d")
            if date_key not in first_calls_by_day or call_time < first_calls_by_day[date_key]:
                first_calls_by_day[date_key] = call_time
        return first_calls_by_day

    @staticmethod
    def _round_to_nearest_hour(dt_val: datetime) -> int:
        """Round a datetime to the nearest hour (0-23)."""
        hour = dt_val.hour
        if dt_val.minute >= 30:  # noqa: PLR2004
            hour = (hour + 1) % 24  # noqa: PLR2004
        return hour

    @staticmethod
    def _find_most_common_reset_hour(
        first_calls_by_day: dict[str, Any],
    ) -> tuple[int, int] | None:
        """Find the most common hour from first-call-of-day data.

        Returns (most_common_hour, count) or None if insufficient data.
        """
        hour_counts: dict[int, int] = {}
        for first_call in first_calls_by_day.values():
            hour = first_call.hour
            if first_call.minute >= 30:  # noqa: PLR2004
                hour = (hour + 1) % 24  # noqa: PLR2004
            hour_counts[hour] = hour_counts.get(hour, 0) + 1

        if not hour_counts:
            return None
        most_common_hour = max(hour_counts, key=hour_counts.get)  # type: ignore[arg-type]
        count = hour_counts[most_common_hour]
        if count < 2:  # noqa: PLR2004
            return None
        return most_common_hour, count

    @staticmethod
    def _average_reset_minute(
        first_calls_by_day: dict[str, Any], target_hour: int,
    ) -> int | None:
        """Calculate average minute-of-day for calls matching the target hour."""
        minutes_in_hour = []
        for first_call in first_calls_by_day.values():
            call_hour = first_call.hour
            if first_call.minute >= 30:  # noqa: PLR2004
                call_hour = (call_hour + 1) % 24  # noqa: PLR2004
            if call_hour == target_hour:
                minutes_in_hour.append(first_call.hour * 60 + first_call.minute)
        if not minutes_in_hour:
            return None
        return sum(minutes_in_hour) // len(minutes_in_hour)

    def _reset_from_call_history(self, now_utc: datetime) -> int | None:
        """Estimate reset time from call history using first-call-of-day mode.

        Look at the first call of each day and find the most common time (mode).
        Filters out outliers like HA restarts at odd hours.
        """
        tracker = self._api_tracker
        if not tracker:
            return None
        try:
            all_calls = tracker.get_call_history(days=14)
            first_calls_by_day = self._find_first_calls_by_day(all_calls)

            if len(first_calls_by_day) < 2:  # noqa: PLR2004
                return None

            hour_result = self._find_most_common_reset_hour(first_calls_by_day)
            if hour_result is None:
                _LOGGER.debug(
                    "Not enough data for mode calculation (%s days, no hour with 2+ occurrences)",
                    len(first_calls_by_day),
                )
                return None

            most_common_hour, match_count = hour_result
            avg_minutes = self._average_reset_minute(first_calls_by_day, most_common_hour)
            if avg_minutes is None:
                return None

            reset_hour = avg_minutes // 60
            reset_minute = avg_minutes % 60

            today_reset = now_utc.replace(
                hour=reset_hour, minute=reset_minute, second=0, microsecond=0,
            )
            next_reset = today_reset + timedelta(days=1) if today_reset <= now_utc else today_reset

            seconds_until_reset = int((next_reset - now_utc).total_seconds())
            if seconds_until_reset > 0:
                _LOGGER.debug(
                    "Estimated reset at %02d:%02d UTC (mode from %s days, %s matches)",
                    reset_hour, reset_minute, len(first_calls_by_day), match_count,
                )
                return seconds_until_reset
        except (ValueError, TypeError, KeyError) as e:
            _LOGGER.debug("Failed to estimate reset from call history: %s", e)
        return None

    async def save_ratelimit(self, status: str = "ok") -> None:
        """Save current rate limit info to file for sensor updates.

        Includes advanced reset detection from tado_api.py:
        - Detects when rate limit resets (remaining increases significantly)
        - Uses multiple strategies to calculate reset time
        - Tracks last known reset time for accurate predictions

        Test Mode Full Simulation
        - When Test Mode is ON, simulates a 100-call API tier
        - Stores simulated values in ratelimit.json
        - All other components read from ratelimit.json without recalculation

        Args:
            status: Status string ("ok", "rate_limited", "error")
        """
        now_utc = dt_util.utcnow()
        prev_data = await self._load_ratelimit()

        # Get real API values from parsed headers
        real_limit = self._rate_limit.get("limit", 5000)
        real_remaining = self._rate_limit.get("remaining", 5000)
        reset_seconds = self._rate_limit.get("reset_seconds", 0)

        # Check Test Mode from config_manager (real-time, not cached)
        test_mode_enabled = self._is_test_mode_enabled()
        _LOGGER.debug("save_ratelimit: test_mode_enabled=%s", test_mode_enabled)

        prev_remaining = prev_data.get("remaining")
        last_reset_utc = prev_data.get("last_reset_utc")

        if test_mode_enabled:
            result = self._calculate_test_mode_ratelimit(
                now_utc, prev_data, last_reset_utc, status,
            )
        else:
            result = self._calculate_live_ratelimit(
                now_utc, prev_data, real_limit, real_remaining, prev_remaining, last_reset_utc,
            )

        limit = result["limit"]
        used = result["used"]
        remaining = result["remaining"]
        percentage_used = result["percentage_used"]
        test_mode_flag = result["test_mode_flag"]
        last_reset_utc = result.get("last_reset_utc", last_reset_utc)

        # Calculate reset time
        if test_mode_flag:
            # Test Mode uses its own reset time
            reset_seconds = result["test_mode_reset_seconds"]
            reset_at: str | None = result["test_mode_reset_at"].isoformat()
            hours = reset_seconds // 3600
            minutes = (reset_seconds % 3600) // 60
            reset_human: str | None = f"{hours}h {minutes}m" if hours > 0 else f"{minutes}m"
        else:
            calculated_reset_seconds, last_reset_utc = self._calculate_reset_seconds(
                now_utc, reset_seconds, last_reset_utc, used,
            )
            reset_at, reset_human, reset_seconds = _format_reset_display(
                now_utc, calculated_reset_seconds, reset_seconds,
            )

        # Update status based on usage
        if remaining == 0:
            status = "rate_limited"
        elif percentage_used > 80:  # noqa: PLR2004 — API quota warning threshold
            status = "warning"

        data: dict[str, Any] = {
            "limit": limit,
            "remaining": remaining,
            "used": used,
            "percentage_used": percentage_used,
            "reset_seconds": reset_seconds or None,
            "reset_at": reset_at,
            "reset_human": reset_human,
            "last_updated": now_utc.isoformat(),
            "last_reset_utc": last_reset_utc,
            "status": status,
            "test_mode": test_mode_flag,
        }

        self._populate_test_mode_metadata(data, test_mode_flag, result, prev_data, last_reset_utc)

        try:
            await self._save_ratelimit(data)
            if test_mode_flag:
                _LOGGER.debug("Test Mode: Rate limit saved (simulated): %s/%s", used, limit)
            else:
                _LOGGER.debug("Rate limit saved: %s/%s (%s%%)", used, limit, percentage_used)
        except (OSError, HomeAssistantError) as e:
            _LOGGER.debug("Failed to save rate limit: %s", e)

    def _is_test_mode_enabled(self) -> bool:
        """Check if test mode is enabled via config_manager."""
        config_manager = self._config_manager
        if config_manager is None:
            _LOGGER.debug("No config_manager available for test_mode check, assuming test_mode=False")
            return False
        try:
            return config_manager.get_test_mode_enabled()
        except (AttributeError, TypeError) as e:
            _LOGGER.warning("Could not get test_mode from config_manager: %s", e)
            return False

    @staticmethod
    def _populate_test_mode_metadata(
        data: dict[str, Any],
        test_mode_flag: bool,
        result: dict[str, Any],
        prev_data: dict[str, Any],
        last_reset_utc: str | None,
    ) -> None:
        """Populate test mode metadata fields in the ratelimit data dict."""
        if test_mode_flag:
            data["test_mode_start_time"] = result["test_mode_start_time"]
            data["test_mode_used"] = result["test_mode_used"]
            live_backup = prev_data.get("live_last_reset_utc") or last_reset_utc
            if live_backup:
                data["live_last_reset_utc"] = live_backup
        else:
            prev_start = prev_data.get("test_mode_start_time")
            prev_used = prev_data.get("test_mode_used")
            if prev_start is not None:
                data["test_mode_start_time"] = prev_start
            if prev_used is not None:
                data["test_mode_used"] = prev_used

    async def _save_ratelimit(self, data: dict[str, Any]) -> None:
        """Save rate limit using executor I/O with atomic write."""
        ratelimit_path = self._get_data_file("ratelimit")

        await async_save_json(self._hass, ratelimit_path, data)  # type: ignore[arg-type]

        # Write-through: update DataLoader cache (same pattern as _save_json_file)
        if self._data_loader is not None:
            self._data_loader.update_cache("ratelimit", data)

    async def _handle_401(
        self, method: str, endpoint: str, attempt: int,
    ) -> bool:
        """Handle 401 Unauthorized. Returns True if should retry (continue loop)."""
        if method == "GET" and attempt == 1:
            _LOGGER.debug("Token expired mid-call, refreshing: %s", endpoint)
            self._access_token = None
            self._token_expiry = None
            return True
        _LOGGER.warning("Token expired on %s %s — not retrying", method, endpoint)
        self._access_token = None
        self._token_expiry = None
        return False

    async def _handle_403(
        self, method: str, endpoint: str, attempt: int,
    ) -> bool:
        """Handle 403 Forbidden with retry. Returns True if should retry (continue loop)."""
        self._access_token = None
        self._token_expiry = None
        if attempt < MAX_RETRY_ATTEMPTS:
            _LOGGER.debug(
                "API 403 on %s %s, retry %s/%s",
                method, endpoint, attempt, MAX_RETRY_ATTEMPTS,
            )
            delay = retry_delay(attempt)
            await asyncio.sleep(delay)
            return True
        _LOGGER.error("API 403 after %s retries: %s %s", MAX_RETRY_ATTEMPTS, method, endpoint)
        return False

    async def _resolve_api_url(self, endpoint: str, full_url: str | None) -> str | None:
        """Resolve the API URL from endpoint or full_url."""
        if full_url:
            return full_url
        config = await self._load_config()
        home_id = config.get("home_id")
        if not home_id:
            _LOGGER.error("No home_id configured")
            return None
        return f"{TADO_API_BASE}/homes/{home_id}/{endpoint}"

    async def _handle_error_status(
        self,
        status: int,
        method: str,
        endpoint: str,
        attempt: int,
        is_safe_to_retry: bool,
    ) -> str:
        """Handle non-success HTTP status. Returns 'continue', 'return_none'."""
        if status == HTTPStatus.UNAUTHORIZED:
            if await self._handle_401(method, endpoint, attempt):
                return "continue"
            return "return_none"

        if status == HTTPStatus.FORBIDDEN and is_safe_to_retry:
            if await self._handle_403(method, endpoint, attempt):
                return "continue"
            return "return_none"

        if status == HTTPStatus.TOO_MANY_REQUESTS:
            _LOGGER.error("Rate limit exceeded: %s", endpoint)
        else:
            _LOGGER.error("API call failed: %s %s → %s", method, endpoint, status)
        return "return_none"

    async def _should_retry_network_error(
        self, attempt: int, error_type: str, method: str, endpoint: str,
    ) -> bool:
        """Check if a network error should be retried, sleeping if so.

        Returns:
            True if caller should continue the retry loop, False to give up.
        """
        if attempt < MAX_RETRY_ATTEMPTS:
            delay = retry_delay(attempt)
            _LOGGER.warning(
                "API %s (attempt %s/%s), retrying in %.1fs: %s %s",
                error_type, attempt, MAX_RETRY_ATTEMPTS, delay, method, endpoint,
            )
            await asyncio.sleep(delay)
            return True
        _LOGGER.warning("API %s after %s attempts: %s %s", error_type, MAX_RETRY_ATTEMPTS, method, endpoint)
        return False

    async def _execute_single_api_attempt(
        self,
        method: str,
        url: str,
        token: str,
        data: dict[str, Any] | None,
        success_statuses: set,
        parse_ratelimit: bool,
        attempt: int,
        tracker: object | None,
        call_type: str | None,
    ) -> tuple[dict[str, Any] | None, bool]:
        """Execute a single API attempt. Returns (result, should_continue).

        Returns (data, False) on success, (None, True) on retryable error,
        (None, False) on terminal error.
        """
        async with self._session.request(
            method, url,
            headers={"Authorization": f"Bearer {token}"},
            json=data if method in ("PUT", "POST") else None,
            timeout=_API_CALL_TIMEOUT,
        ) as resp:
            if parse_ratelimit and attempt == 1:
                self._parse_ratelimit_headers(dict(resp.headers))
            if tracker and call_type:
                await tracker.async_record_call(call_type, resp.status)  # type: ignore[union-attr]

            if resp.status in success_statuses:
                if resp.status == HTTPStatus.NO_CONTENT or resp.content_length == 0:
                    return {}, False
                return await resp.json(), False  # type: ignore[return-value]

            action = await self._handle_error_status(
                resp.status, method, url, attempt,
                method in _RETRYABLE_METHODS,
            )
            return None, action == "continue"

    async def api_call(
        self,
        endpoint: str,
        method: str = "GET",
        data: dict[str, Any] | None = None,
        parse_ratelimit: bool = True,
        full_url: str | None = None,
        extra_success_statuses: frozenset[int] | None = None,
    ) -> dict[str, Any] | None:
        """Make authenticated API call with transient 403 retry.

        GET/PUT/DELETE are idempotent — safe to retry on 403.
        POST is not retried on 403 (non-idempotent).
        401 on GET triggers one token refresh + retry; on other methods just logs.
        """
        url = await self._resolve_api_url(endpoint, full_url)
        if url is None:
            return None

        call_type = _detect_call_type(endpoint)
        tracker = self._api_tracker

        _success = {HTTPStatus.OK, HTTPStatus.CREATED, HTTPStatus.NO_CONTENT}
        if extra_success_statuses:
            _success |= extra_success_statuses  # type: ignore[arg-type]

        for attempt in range(1, MAX_RETRY_ATTEMPTS + 1):
            token = await self.get_access_token()
            if not token:
                _LOGGER.error("Failed to get access token")
                return None

            try:
                result, should_continue = await self._execute_single_api_attempt(
                    method, url, token, data, _success,
                    parse_ratelimit, attempt, tracker, call_type,
                )
                if should_continue:
                    continue
                return result
            except (TimeoutError, aiohttp.ClientError):
                if not await self._should_retry_network_error(attempt, "network error", method, endpoint):
                    return None
            except TadoAuthError:
                raise
            except Exception:
                _LOGGER.exception("Unexpected error")
                return None

        return None

    async def get_device_offset(self, serial: str) -> float | None:
        """Get temperature offset for a specific device."""
        url = f"{API_ENDPOINT_DEVICES}/{serial}/temperatureOffset"
        result = await self.api_call(
            f"devices/{serial}/temperatureOffset",
            full_url=url,
        )
        if result is None:
            return None
        return result.get("celsius")  # type: ignore[no-any-return]

    async def set_device_offset(self, serial: str, offset: float) -> bool:
        """Set temperature offset for a specific device."""
        url = f"{API_ENDPOINT_DEVICES}/{serial}/temperatureOffset"
        result = await self.api_call(
            f"devices/{serial}/temperatureOffset",
            method="PUT",
            data={"celsius": offset},
            full_url=url,
        )
        if result is not None:
            _LOGGER.info("Set offset %s°C for device %s", offset, serial)
            return True
        return False

    async def set_child_lock(self, serial: str, enabled: bool) -> bool:
        """Set child lock state for a specific device.

        Args:
            serial: Device serial number.
            enabled: True to enable, False to disable.

        Returns:
            True if successful, False otherwise.
        """
        url = f"{API_ENDPOINT_DEVICES}/{serial}/childLock"
        result = await self.api_call(
            f"devices/{serial}/childLock",
            method="PUT",
            data={"childLockEnabled": enabled},
            full_url=url,
        )
        if result is not None:
            state_str = "enabled" if enabled else "disabled"
            _LOGGER.info("Child lock %s for device %s", state_str, serial)
            return True
        return False

    async def set_zone_overlay(self, zone_id: str, setting: dict[str, Any], termination: dict[str, Any]) -> bool:
        """Set zone overlay (manual control)."""
        result = await self.api_call(
            f"zones/{zone_id}/overlay",
            method="PUT",
            data={"setting": setting, "termination": termination},
        )
        return result is not None

    async def delete_zone_overlay(self, zone_id: str) -> bool:
        """Delete zone overlay (return to schedule)."""
        result = await self.api_call(
            f"zones/{zone_id}/overlay",
            method="DELETE",
        )
        return result is not None

    async def get_zone_schedule(self, zone_id: str) -> dict[str, Any] | None:
        """Get zone schedule (timetable and blocks).

        Returns:
            dict with 'type' (timetable type) and 'blocks' (dict of day_type -> blocks)
        """
        # Step 1: Get active timetable
        active = await self.api_call(
            f"zones/{zone_id}/schedule/activeTimetable",
        )
        if active is None:
            return None

        timetable_id = active.get("id", 0)
        timetable_type = active.get("type", "ONE_DAY")

        # Determine which day types to fetch based on timetable type
        day_types_map = {
            "ONE_DAY": ["MONDAY_TO_SUNDAY"],
            "THREE_DAY": ["MONDAY_TO_FRIDAY", "SATURDAY", "SUNDAY"],
            "SEVEN_DAY": ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"],
        }
        day_types = day_types_map.get(timetable_type, ["MONDAY_TO_SUNDAY"])

        # Step 2: Fetch blocks for each day type (individual failures OK)
        blocks_by_day: dict[str, Any] = {}
        for day_type in day_types:
            blocks = await self.api_call(
                f"zones/{zone_id}/schedule/timetables/{timetable_id}/blocks/{day_type}",
            )
            if blocks is not None:
                blocks_by_day[day_type] = blocks
            else:
                _LOGGER.warning("Failed to get blocks for %s", day_type)
                blocks_by_day[day_type] = []

        return {
            "type": timetable_type,
            "timetable_id": timetable_id,
            "blocks": blocks_by_day,
        }

    async def set_presence_lock(self, state: str) -> bool:
        """Set home presence lock (HOME/AWAY)."""
        result = await self.api_call(
            "presenceLock",
            method="PUT",
            data={"homePresence": state},
        )
        if result is not None:
            _LOGGER.info("Presence lock set to %s", state)
            return True
        return False

    async def delete_presence_lock(self) -> bool:
        """Delete presence lock to resume geofencing (Auto mode).

        Deleting the presence lock allows geofencing to resume control.
        422 means presenceLock doesn't exist (already in auto mode) — treated as success.
        """
        result = await self.api_call(
            "presenceLock",
            method="DELETE",
            extra_success_statuses=frozenset({HTTPStatus.UNPROCESSABLE_ENTITY}),
        )
        if result is not None:
            _LOGGER.info("Presence lock deleted (Auto mode - geofencing resumed)")
            return True
        return False


    async def _sync_and_save(self, endpoint: str, file_key: str, label: str) -> Any:
        """Fetch an API endpoint and save to file. Returns data or None."""
        data = await self.api_call(endpoint)
        if data:
            await self._save_json_file(self._get_data_file(file_key), data)
            _LOGGER.debug("%s saved", label)
        return data

    async def _sync_quick_extras(
        self,
        *,
        weather_enabled: bool,
        home_state_sync_enabled: bool,
        mobile_devices_enabled: bool,
        mobile_devices_frequent_sync: bool,
    ) -> None:
        """Sync optional data during quick sync (weather, home state, mobile devices)."""
        if weather_enabled:
            await self._sync_and_save("weather", "weather", "Weather data")

        if home_state_sync_enabled:
            home_state = await self._sync_and_save("state", "home_state", "Home state")
            if home_state:
                _LOGGER.debug("Home state presence: %s", home_state.get("presence"))

        if mobile_devices_enabled and mobile_devices_frequent_sync:
            mobile_data = await self._sync_and_save("mobileDevices", "mobile_devices", "Mobile devices (frequent sync)")
            if mobile_data:
                _LOGGER.debug("Mobile devices count: %s", len(mobile_data))

    async def _sync_full_extras(
        self,
        *,
        mobile_devices_enabled: bool,
        offset_enabled: bool,
    ) -> None:
        """Sync additional data during full sync (zones_info, mobile, offsets, AC caps)."""
        zones_info = await self._sync_and_save("zones", "zones_info", "Zone info")
        if not zones_info:
            return

        _LOGGER.debug("Zone info: %s zones", len(zones_info))

        if mobile_devices_enabled:
            mobile_data = await self._sync_and_save("mobileDevices", "mobile_devices", "Mobile devices")
            if mobile_data:
                _LOGGER.debug("Mobile devices count: %s", len(mobile_data))

        if offset_enabled:
            await self._sync_offsets(zones_info)  # type: ignore[arg-type]

        await self._sync_ac_capabilities(zones_info)  # type: ignore[arg-type]

    async def async_sync(
        self,
        quick: bool = False,
        weather_enabled: bool = True,
        mobile_devices_enabled: bool = True,
        mobile_devices_frequent_sync: bool = False,
        offset_enabled: bool = False,
        home_state_sync_enabled: bool = False,
    ) -> None:
        """Perform async data sync from Tado API.

        Raises typed exceptions so the coordinator can distinguish auth failures
        from network failures:
        - TadoAuthError → ConfigEntryAuthFailed (triggers HA reauth flow)
        - TadoSyncError → UpdateFailed (coordinator retries on next poll)
        """
        sync_type = "quick" if quick else "full"
        _LOGGER.info("Tado CE async sync starting (%s)", sync_type)
        await self._ensure_home_id()

        try:
            # Always fetch zone states (most important)
            zones_data = await self.api_call("zoneStates")
            if zones_data is None:
                _LOGGER.error("Failed to fetch zone states")
                await self.save_ratelimit("error")
                raise TadoSyncError("Failed to fetch zone states")

            await self._save_json_file(self._get_data_file("zones"), zones_data)
            _LOGGER.debug("Zone states saved (%s zones)", len((zones_data.get("zoneStates") or {}).keys()))

            await self._sync_quick_extras(
                weather_enabled=weather_enabled,
                home_state_sync_enabled=home_state_sync_enabled,
                mobile_devices_enabled=mobile_devices_enabled,
                mobile_devices_frequent_sync=mobile_devices_frequent_sync,
            )

            if not quick:
                await self._sync_full_extras(
                    mobile_devices_enabled=mobile_devices_enabled,
                    offset_enabled=offset_enabled,
                )

            await self.save_ratelimit("ok")

            rl = self._rate_limit
            used = rl.get("limit", 0) - rl.get("remaining", 0) if rl.get("limit") else 0
            _LOGGER.info("Tado CE async sync SUCCESS (%s): %s/%s API calls used", sync_type, used, rl.get("limit", "?"))

        except TadoAuthError:
            raise
        except TadoSyncError:
            raise
        except aiohttp.ClientError as e:
            _LOGGER.exception("Tado CE async sync network error")
            await self.save_ratelimit("error")
            raise TadoSyncError(f"Network error during sync: {e}") from e
        except Exception as e:
            _LOGGER.exception("Tado CE async sync failed")
            await self.save_ratelimit("error")
            raise TadoSyncError(f"Sync failed: {e}") from e

    async def _save_json_file(self, file_path: Path, data: dict[str, Any] | list[Any]) -> None:
        """Save data to JSON file atomically using executor I/O.

        After a successful write, updates the DataLoader in-memory cache
        so that subsequent reads avoid disk I/O.

        Args:
            file_path: Path to save to.
            data: Data to serialize as JSON.
        """
        await async_save_json(self._hass, file_path, data)  # type: ignore[arg-type]

        # Write-through: update DataLoader cache
        if self._data_loader is not None:
            base_name = self._extract_base_name(file_path)
            self._data_loader.update_cache(base_name, data)

    async def _load_json_file(self, file_path: Path) -> dict[str, Any] | list[Any]:
        """Load JSON file using executor I/O."""
        return await async_load_json(self._hass, file_path)  # type: ignore[arg-type, return-value]

    async def _sync_offsets(self, zones_info: list[Any]) -> None:
        """Sync temperature offsets for all devices.

        Args:
            zones_info: List of zone info dicts from API.
        """
        offsets = {}

        for zone in zones_info:
            zone_id = str(zone.get("id"))
            zone_type = zone.get("type")

            # Only fetch offsets for heating/AC zones (not hot water)
            if zone_type not in ("HEATING", "AIR_CONDITIONING"):
                continue

            devices = zone.get("devices") or []
            for device in devices:
                serial = device.get("shortSerialNo")
                if serial:
                    try:
                        offset = await self.get_device_offset(serial)
                        if offset is not None:
                            offsets[zone_id] = offset
                            _LOGGER.debug("Offset for zone %s: %s°C", zone_id, offset)
                        break  # Only need first device per zone
                    except (KeyError, TypeError, ValueError) as e:
                        _LOGGER.warning("Failed to fetch offset for device %s: %s", serial, e)

        if offsets:
            await self._save_json_file(self._get_data_file("offsets"), offsets)
            _LOGGER.debug("Offsets saved (%s zones)", len(offsets))

    async def _sync_ac_capabilities(self, zones_info: list[Any]) -> None:
        """Sync AC zone capabilities.

        Skip fetch if cache exists - AC capabilities don't change.
        This saves API calls on every restart.

        Args:
            zones_info: List of zone info dicts from API.
        """
        # Check if cache already exists - AC capabilities don't change
        ac_caps_path = self._get_data_file("ac_capabilities")
        try:
            path_exists = await self._hass.async_add_executor_job(  # type: ignore[union-attr]
                ac_caps_path.exists,
            )
            if path_exists:
                existing = await self._load_json_file(ac_caps_path)
                if existing:
                    _LOGGER.debug("AC capabilities loaded from cache (%s zones)", len(existing))
                    return
        except (KeyError, TypeError, ValueError) as e:
            _LOGGER.debug("AC capabilities cache corrupted, fetching fresh: %s", e)

        ac_capabilities = {}

        for zone in zones_info:
            zone_id = str(zone.get("id"))
            zone_type = zone.get("type")

            # Only fetch capabilities for AC zones
            if zone_type != "AIR_CONDITIONING":
                continue

            try:
                caps = await self.api_call(f"zones/{zone_id}/capabilities")
                if caps:
                    ac_capabilities[zone_id] = caps
                    modes = [m for m in ["COOL", "HEAT", "DRY", "FAN", "AUTO"] if m in caps]
                    _LOGGER.debug("AC capabilities for zone %s: modes=%s", zone_id, modes)
            except (KeyError, TypeError, ValueError) as e:
                _LOGGER.warning("Failed to fetch AC capabilities for zone %s: %s", zone_id, e)

        if ac_capabilities:
            await self._save_json_file(self._get_data_file("ac_capabilities"), ac_capabilities)
            _LOGGER.debug("AC capabilities saved (%s zones)", len(ac_capabilities))

    async def add_meter_reading(self, reading: int, date: str | None = None) -> bool:
        """Add energy meter reading.

        Non-idempotent — no retry.

        Args:
            reading: Meter reading value
            date: Date string in YYYY-MM-DD format (defaults to today)

        Returns:
            True if successful, False otherwise
        """
        if not date:
            # Use Home Assistant's timezone for local date
            try:
                date = dt_util.now().strftime("%Y-%m-%d")
            except (ValueError, TypeError):
                date = dt_util.utcnow().strftime("%Y-%m-%d")

        result = await self.api_call(
            "meterReadings",
            method="POST",
            data={"date": date, "reading": reading},
        )
        if result is not None:
            _LOGGER.info("Added meter reading: %s on %s", reading, date)
            return True
        return False

    async def identify_device(self, device_serial: str) -> bool:
        """Make a device flash its LED to identify it.

        Non-idempotent — no retry.

        Args:
            device_serial: Device serial number

        Returns:
            True if successful, False otherwise
        """
        url = f"{API_ENDPOINT_DEVICES}/{device_serial}/identify"
        result = await self.api_call(
            f"devices/{device_serial}/identify",
            method="POST",
            full_url=url,
        )
        if result is not None:
            _LOGGER.info("Identify command sent to device %s", device_serial)
            return True
        return False

    async def set_away_configuration(
        self,
        zone_id: str,
        mode: str,
        temperature: float | None = None,
        comfort_level: int = 50,
    ) -> bool:
        """Set away configuration for a zone.

        Args:
            zone_id: Zone ID
            mode: Away mode ('auto', 'manual', or 'off')
            temperature: Target temperature for manual mode
            comfort_level: Comfort level for auto mode (0-100)

        Returns:
            True if successful, False otherwise
        """
        # Build payload based on mode
        if mode == "auto":
            payload: dict[str, Any] = {
                "type": "HEATING",
                "autoAdjust": True,
                "comfortLevel": comfort_level,
                "setting": {"type": "HEATING", "power": "OFF"},
            }
        elif mode == "manual" and temperature is not None:
            payload = {
                "type": "HEATING",
                "autoAdjust": False,
                "setting": {
                    "type": "HEATING",
                    "power": "ON",
                    "temperature": {"celsius": temperature},
                },
            }
        else:  # off
            payload = {
                "type": "HEATING",
                "autoAdjust": False,
                "setting": {"type": "HEATING", "power": "OFF"},
            }

        result = await self.api_call(
            f"zones/{zone_id}/schedule/awayConfiguration",
            method="PUT",
            data=payload,
        )
        if result is not None:
            _LOGGER.info("Set away configuration for zone %s: %s", zone_id, mode)
            return True
        return False


    async def activate_open_window(self, zone_id: str) -> bool:
        """Activate open window mode for a zone.

        Non-idempotent — no retry.

        Calls POST .../zones/{zone_id}/state/openWindow/activate

        Args:
            zone_id: Zone ID

        Returns:
            True if successful, False otherwise
        """
        result = await self.api_call(
            f"zones/{zone_id}/state/openWindow/activate",
            method="POST",
        )
        return result is not None

    async def deactivate_open_window(self, zone_id: str) -> bool:
        """Deactivate open window mode for a zone.

        Non-idempotent — no retry.

        Calls DELETE .../zones/{zone_id}/state/openWindow

        Args:
            zone_id: Zone ID

        Returns:
            True if successful, False otherwise
        """
        result = await self.api_call(
            f"zones/{zone_id}/state/openWindow",
            method="DELETE",
        )
        return result is not None

