"""Tado CE rate limit management — bootstrap reserve, quota protection, notifications."""

from __future__ import annotations

from datetime import UTC, datetime, timedelta
import logging
from typing import TYPE_CHECKING, Any

from homeassistant.util import dt as dt_util

from .const import (
    _RATE_LIMIT_DEFAULT_S,
    _RATE_LIMIT_MAX_S,
    _RATE_LIMIT_MIN_S,
    DOMAIN,
    QUOTA_BOOTSTRAP_CALLS,
    get_data_file,
)
from .helpers import parse_iso_datetime
from .storage import async_load_json, async_save_json

if TYPE_CHECKING:
    from homeassistant.core import HomeAssistant

    from .config_manager import ConfigurationManager
    from .coordinator import TadoDataUpdateCoordinator
    from .data_loader import DataLoader

_LOGGER = logging.getLogger(__name__)


def _sanitize_retry_after(value: float | None) -> int:
    """Clamp retry-after to a safe range.

    Args:
        value: Seconds to wait, or None if unknown.

    Returns:
        Clamped integer in [_RATE_LIMIT_MIN_S, _RATE_LIMIT_MAX_S].
    """
    if value is None or value <= 0:
        return _RATE_LIMIT_DEFAULT_S
    return int(min(max(value, _RATE_LIMIT_MIN_S), _RATE_LIMIT_MAX_S))


def calculate_seconds_until_reset(last_reset_utc: str | None) -> int | None:
    """Calculate seconds until next API reset from last reset UTC timestamp.

    Parses the ISO 8601 timestamp, adds 24 hours, and loops forward
    until the next reset is in the future.

    Args:
        last_reset_utc: ISO 8601 UTC timestamp of last reset, or None.

    Returns:
        Seconds until next reset (positive int), or None if input is None/invalid.
    """
    if not last_reset_utc:
        return None
    try:
        last_reset = parse_iso_datetime(last_reset_utc)
        next_reset = last_reset + timedelta(hours=24)
        now_utc = dt_util.utcnow()
        while next_reset <= now_utc:
            next_reset += timedelta(hours=24)
        result = int((next_reset - now_utc).total_seconds())
        return result if result > 0 else None
    except (ValueError, TypeError):
        return None


def should_block_manual_action(
    ratelimit_data: dict[str, Any], config_manager: ConfigurationManager,
) -> tuple[bool, str]:
    """Check if manual actions should be blocked due to bootstrap reserve.

    Bootstrap Reserve - blocks ALL actions (including manual) when quota
    falls to the absolute minimum needed for auto-recovery after API reset.

    Simplified - reads directly from ratelimit_data which already contains
    simulated values when Test Mode is ON.

    Added quota_reserve_enabled check - allows users to disable protection.

    Args:
        ratelimit_data: Rate limit data with 'remaining', 'used', 'reset_seconds'
                        (already simulated when Test Mode is ON)
        config_manager: Configuration manager for feature settings

    Returns:
        Tuple of (should_block: bool, reason: str)
        - should_block: True if manual actions should be blocked
        - reason: Human-readable explanation (empty if not blocking)
    """
    # Check if Quota Reserve Protection is enabled
    if not config_manager.get_quota_reserve_enabled():
        _LOGGER.debug("Tado CE: Quota Reserve Protection disabled, not blocking manual actions")
        return False, ""

    # Check if reset time has passed - if so, allow actions to detect reset
    last_reset_utc = ratelimit_data.get("last_reset_utc")
    if last_reset_utc:
        try:
            last_reset = parse_iso_datetime(last_reset_utc)
            next_reset = last_reset + timedelta(hours=24)
            now_utc = dt_util.utcnow()

            # If next reset time has passed, allow actions to detect actual reset
            if now_utc >= next_reset:
                return False, ""
        except (ValueError, TypeError) as e:
            _LOGGER.debug("Failed to check reset time: %s", e)
    else:
        # No reset time known (fresh install / stale data) — allow actions
        # so the first API call can bootstrap rate limit data.
        _LOGGER.debug(
            "Tado CE: No reset time known, allowing manual actions to bootstrap rate limit data",
        )
        return False, ""

    # No need to recalculate - save_ratelimit() stores the correct values
    remaining = ratelimit_data.get("remaining", 100)
    test_mode = ratelimit_data.get("test_mode", False)

    _LOGGER.debug(
        "Tado CE: should_block_manual_action check - remaining=%s, bootstrap_threshold=%s, test_mode=%s",
        remaining,
        QUOTA_BOOTSTRAP_CALLS,
        test_mode,
    )

    # Check if we've hit the bootstrap reserve (hard limit)
    if remaining <= QUOTA_BOOTSTRAP_CALLS:
        _rs = ratelimit_data.get("reset_seconds")
        reset_seconds = _rs if _rs is not None else 0

        # If reset_seconds is 0/None, try to calculate from last_reset_utc
        if not reset_seconds and last_reset_utc:
            reset_seconds = calculate_seconds_until_reset(last_reset_utc) or 0

        if reset_seconds > 0:
            hours = reset_seconds // 3600
            minutes = (reset_seconds % 3600) // 60
            reset_info = f"reset in {hours}h {minutes}m"
        else:
            reset_info = "reset time unknown — will auto-recover after first successful API response"

        reason = (
            f"API limit reached ({remaining} calls remaining). "
            f"All actions blocked to preserve auto-recovery capability. "
            f"Use the Tado app for emergency changes. "
            f"Integration will auto-recover at {reset_info}."
        )
        return True, reason

    return False, ""


async def async_check_bootstrap_reserve(
    hass: HomeAssistant,
    coordinator: TadoDataUpdateCoordinator | None = None,
) -> tuple[bool, str]:
    """Async helper to check bootstrap reserve for service handlers.

    Convenience wrapper that loads ratelimit data and config manager.
    Accepts coordinator (duck-typed — any object with
    .config_manager and .data_loader attributes).

    Args:
        hass: Home Assistant instance
        coordinator: Optional object with config_manager and data_loader attrs.

    Returns:
        Tuple of (should_block: bool, reason: str)
    """
    try:
        if coordinator is not None:
            config_manager = coordinator.config_manager
            ratelimit_data = await hass.async_add_executor_job(
                coordinator.data_loader.load_ratelimit_file,
            )
        else:
            _LOGGER.debug("async_check_bootstrap_reserve called without coordinator, skipping check")
            return False, ""

        if not ratelimit_data:
            return False, ""

        return should_block_manual_action(ratelimit_data, config_manager)
    except Exception as e:  # noqa: BLE001 — defensive bootstrap check, must not block service call
        _LOGGER.debug("Failed to check bootstrap reserve: %s", e)
        return False, ""


async def async_show_api_limit_notification(hass: HomeAssistant, message: str) -> None:
    """Show a persistent notification when API limit is reached.

    Persistent notification to inform user about API limit.

    Args:
        hass: Home Assistant instance
        message: Notification message
    """
    await hass.services.async_call(
        "persistent_notification",
        "create",
        {
            "title": "Tado CE: API Limit Reached",
            "message": message + "\n\n**Tip:** Use the official Tado app for emergency temperature changes.",
            "notification_id": "tado_ce_api_limit",
        },
    )


async def async_check_bootstrap_reserve_or_raise(
    hass: HomeAssistant,
    entity_name: str = "",
    coordinator: TadoDataUpdateCoordinator = None,  # type: ignore[assignment]
) -> None:
    """Check bootstrap reserve and raise HomeAssistantError if quota critically low.

    DRY helper for all entities to check bootstrap reserve.
    Accepts coordinator instead of entry_data.

    Args:
        hass: Home Assistant instance
        entity_name: Optional entity name for logging (e.g., "Living Room", "Hot Water")
        coordinator: Optional object with config_manager and data_loader attrs.

    Raises:
        HomeAssistantError: If quota is at bootstrap reserve level
    """
    from homeassistant.exceptions import HomeAssistantError

    should_block, reason = await async_check_bootstrap_reserve(hass, coordinator=coordinator)
    if should_block:
        log_name = f" for {entity_name}" if entity_name else ""
        _LOGGER.warning("Tado CE: Blocking manual action%s - %s", log_name, reason)
        await async_show_api_limit_notification(hass, reason)
        raise HomeAssistantError(
            reason,
            translation_domain=DOMAIN,
            translation_key="api_quota_critically_low",
        )




def _find_reset_in_history(history: list[Any]) -> datetime | None:
    """Scan history states to find the API usage reset point.

    Returns:
        Reset time (datetime) or None if not detected.
    """
    min_value = float("inf")
    min_time = None
    prev_value = None

    for state in history:
        try:
            value = int(state.state)
            state_time = state.last_changed

            # Detect reset: value dropped significantly (>50% drop or to <10)
            if prev_value is not None and prev_value > 50:  # noqa: PLR2004 — threshold for meaningful usage
                if value < prev_value * 0.2 or value < 10:  # noqa: PLR2004 — reset detection threshold
                    _LOGGER.debug(
                        "HA History Detection: Reset detected! %s -> %s at %s",
                        prev_value, value, state_time,
                    )
                    return state_time.replace(tzinfo=UTC) if state_time.tzinfo is None else state_time  # type: ignore[no-any-return]

            if value < min_value:
                min_value = value
                min_time = state_time

            prev_value = value

        except (ValueError, TypeError):
            continue

    # If no clear reset detected, use minimum value time
    if min_time and min_value < 20:  # noqa: PLR2004 — low usage threshold
        _LOGGER.debug("HA History Detection: Using minimum value as reset: %s at %s", min_value, min_time)
        return min_time.replace(tzinfo=UTC) if min_time.tzinfo is None else min_time  # type: ignore[no-any-return]

    _LOGGER.debug("HA History Detection: Could not detect reset (min_value=%s)", min_value)
    return None


def _resolve_api_usage_entity_id(hass: HomeAssistant, home_id: str | None) -> str:
    """Resolve the API usage sensor entity_id, preferring registry lookup."""
    from homeassistant.helpers import entity_registry as er

    if home_id:
        target_uid = f"tado_ce_{home_id}_api_usage"
        registry = er.async_get(hass)
        entry = registry.async_get_entity_id("sensor", "tado_ce", target_uid)
        if entry:
            _LOGGER.debug("HA History Detection: Found entity via registry: %s (uid=%s)", entry, target_uid)
            return entry
        _LOGGER.debug("HA History Detection: Registry miss for uid=%s", target_uid)

    _LOGGER.debug("HA History Detection: Using fallback entity_id: sensor.tado_ce_api_usage")
    return "sensor.tado_ce_api_usage"


async def async_detect_reset_from_history(hass: HomeAssistant, home_id: str | None = None) -> datetime | None:
    """Detect API reset time from Home Assistant sensor history.

    Queries the recorder for the API usage sensor history and finds
    the time when the value dropped to its minimum (reset point).

    Args:
        hass: Home Assistant instance
        home_id: Home ID for multi-home support (finds correct entity via registry)

    Returns:
        Estimated reset time (datetime in UTC), or None if not enough data
    """
    try:
        from homeassistant.components.recorder import get_instance  # type: ignore[attr-defined]
        from homeassistant.components.recorder.history import get_significant_states

        end_time = dt_util.utcnow()
        start_time = end_time - timedelta(hours=36)

        entity_id = _resolve_api_usage_entity_id(hass, home_id)

        def _get_history() -> dict[str, list[Any]]:
            result = get_significant_states(
                hass, start_time, end_time, [entity_id],
                significant_changes_only=False,
            )
            return dict(result) if result else {}

        states = await get_instance(hass).async_add_executor_job(_get_history)

        if not states or entity_id not in states:
            available_keys = list(states.keys()) if states else []
            _LOGGER.debug(
                "HA History Detection: No history for %s (available keys: %s)",
                entity_id, available_keys[:5] if available_keys else "none",
            )
            return None

        history = states[entity_id]
        if len(history) < 10:  # noqa: PLR2004 — minimum history points
            _LOGGER.debug("HA History Detection: Not enough history points (%s) for %s", len(history), entity_id)
            return None

        return _find_reset_in_history(history)

    except ImportError:
        _LOGGER.debug("Recorder component not available")
        return None
    except Exception as e:  # noqa: BLE001 — HA entity update pattern
        _LOGGER.debug("Failed to detect reset from history: %s", e)
        return None


def _recalculate_reset_fields(data: dict[str, Any], detected_reset: datetime) -> None:
    """Recalculate reset_seconds, reset_at, reset_human from detected reset time."""
    now_utc = dt_util.utcnow()
    next_reset = detected_reset + timedelta(hours=24)

    while next_reset <= now_utc:
        next_reset += timedelta(hours=24)

    seconds_until_reset = int((next_reset - now_utc).total_seconds())

    if seconds_until_reset > 0:
        hours = seconds_until_reset // 3600
        minutes = (seconds_until_reset % 3600) // 60
        data["reset_seconds"] = seconds_until_reset
        data["reset_at"] = next_reset.isoformat()
        data["reset_human"] = f"{hours}h {minutes}m" if hours > 0 else f"{minutes}m"


async def async_update_ratelimit_reset_time(
    hass: HomeAssistant,
    detected_reset: datetime,
    home_id: str | None = None,
    data_loader: DataLoader | None = None,
) -> None:
    """Update ratelimit JSON with detected reset time from HA history.

    This is called after sync when we detect the actual reset time from
    the API usage sensor history. It's more accurate than extrapolation.

    Args:
        hass: Home Assistant instance
        detected_reset: Detected reset time (datetime in UTC)
        home_id: Home ID for per-home ratelimit file (multi-home support)
        data_loader: DataLoader instance for cache read/write-through
    """
    try:
        # Read from in-memory cache first, fall back to disk
        data: dict[str, Any] | None = None
        if data_loader is not None:
            cached = data_loader.get_cached("ratelimit")
            if isinstance(cached, dict):
                data = dict(cached)

        if data is None:
            ratelimit_path = get_data_file("ratelimit", home_id)
            loaded = await async_load_json(hass, ratelimit_path)
            if not isinstance(loaded, dict):
                return
            data = loaded

        new_reset = detected_reset.strftime("%Y-%m-%dT%H:%M:%SZ")
        if data.get("last_reset_utc") == new_reset:
            return

        data["last_reset_utc"] = new_reset
        _recalculate_reset_fields(data, detected_reset)

        ratelimit_path = get_data_file("ratelimit", home_id)
        await async_save_json(hass, ratelimit_path, data)

        if data_loader is not None:
            data_loader.update_cache("ratelimit", data)

        _LOGGER.info("Updated reset time from HA history: %s UTC", detected_reset.strftime("%H:%M"))

    except (OSError, ValueError) as e:
        _LOGGER.debug("Failed to update ratelimit reset time: %s", e)
