"""Tado CE helper functions — optimistic update window, overlay termination config.

Optimistic update window calculation and overlay termination configuration.
"""

from __future__ import annotations

from datetime import UTC, datetime
import logging
import random
from typing import TYPE_CHECKING, Any

from .const import MAX_RETRY_DELAY, OVERLAY_MODE_DEFAULT, RETRY_BASE_DELAY, TIMER_DURATION_DEFAULT

if TYPE_CHECKING:
    from homeassistant.core import HomeAssistant

    from .coordinator import TadoDataUpdateCoordinator

_LOGGER = logging.getLogger(__name__)

# Tado API only accepts: MANUAL, TADO_MODE, TIMER
_OVERLAY_API_MAP: dict[str, str] = {
    "NEXT_TIME_BLOCK": "TADO_MODE",
}


def _map_overlay_to_api(mode: str) -> str:
    """Map internal overlay mode to Tado API-accepted value."""
    return _OVERLAY_API_MAP.get(mode, mode)


def retry_delay(attempt: int, base_delay: float = RETRY_BASE_DELAY) -> float:
    """Calculate jittered retry delay for the given attempt number.

    Uses full jitter pattern: uniform random between 0 and base_delay^attempt.
    """
    return random.uniform(0, min(MAX_RETRY_DELAY, base_delay**attempt))  # noqa: S311 — not crypto


def _get_coordinator(hass: HomeAssistant, entry_id: str) -> TadoDataUpdateCoordinator:
    """Get coordinator from entry_id, or None."""
    try:
        entry = hass.config_entries.async_get_entry(entry_id)
        if entry and hasattr(entry, "runtime_data") and entry.runtime_data is not None:
            return entry.runtime_data  # type: ignore[no-any-return]
    except (AttributeError, TypeError):
        pass
    return None  # type: ignore[return-value]


def parse_iso_datetime(iso_str: str) -> datetime:
    """Parse an ISO 8601 datetime string to a timezone-aware UTC datetime.

    Python 3.11+ ``fromisoformat`` handles 'Z' suffix natively.
    Naive datetimes (no tzinfo) are assumed UTC.

    Args:
        iso_str: ISO 8601 datetime string.

    Returns:
        Timezone-aware datetime in UTC.

    Raises:
        ValueError: If the string cannot be parsed as ISO 8601.

    """
    dt = datetime.fromisoformat(iso_str)
    if dt.tzinfo is None:
        dt = dt.replace(tzinfo=UTC)
    return dt


async def async_trigger_immediate_refresh(
    hass: HomeAssistant,
    entity_id: str,
    reason: str,
    force: bool = False,
    skip_debounce: bool = False,
    include_home_state: bool = False,
) -> None:
    """Trigger immediate refresh after state change.

    Args:
        hass: Home Assistant instance
        entity_id: Entity ID that triggered the refresh
        reason: Reason for the refresh (for logging)
        force: If True, force refresh even if recently refreshed (for buttons)
        skip_debounce: If True, skip debounce delay (for buttons)
        include_home_state: If True, also fetch home state (for presence mode changes)

    """
    try:
        from homeassistant.helpers import entity_registry as er

        entity_registry = er.async_get(hass)
        entity_entry = entity_registry.async_get(entity_id)
        if entity_entry and entity_entry.config_entry_id:
            coordinator = _get_coordinator(hass, entity_entry.config_entry_id)
            if coordinator and coordinator.refresh_handler:
                await coordinator.refresh_handler.trigger_refresh(
                    entity_id,
                    reason,
                    force=force,
                    skip_debounce=skip_debounce,
                    include_home_state=include_home_state,
                )
                return
        _LOGGER.warning("No refresh handler found for entity %s", entity_id)
    except (KeyError, TypeError, ValueError) as e:
        _LOGGER.warning("Failed to trigger immediate refresh: %s", e)


def get_optimistic_window(hass: HomeAssistant, entry_id: str | None = None) -> float:
    """Get the optimistic update window duration in seconds.

    The optimistic window = debounce_seconds + 2.0 seconds buffer.
    During this window, entities ignore API updates to preserve optimistic state.

    Args:
        hass: Home Assistant instance
        entry_id: Optional config entry ID for per-entry config lookup

    Returns:
        Optimistic window duration in seconds (default: 17.0 = 15 + 2)

    """
    try:
        if entry_id:
            coordinator = _get_coordinator(hass, entry_id)
            if coordinator and coordinator.config_manager:
                return float(coordinator.config_manager.get_refresh_debounce_seconds()) + 2.0
    except (AttributeError, TypeError, ValueError) as err:
        _LOGGER.debug("Failed to get optimistic window from config: %s", err)
    return 17.0  # Default: 15s debounce + 2s buffer


def get_overlay_termination(hass: HomeAssistant, entry_id: str | None = None) -> dict[str, Any]:
    """Get the termination dict for overlay API calls.

    Args:
        hass: Home Assistant instance
        entry_id: Optional config entry ID for per-entry lookup

    Returns:
        {"type": "TADO_MODE"} or {"type": "MANUAL"} or {"type": "TIMER", "durationInSeconds": ...}
        Note: Tado API only accepts MANUAL, TADO_MODE, TIMER (not NEXT_TIME_BLOCK)

    """
    mode = OVERLAY_MODE_DEFAULT
    duration = TIMER_DURATION_DEFAULT
    if entry_id:
        try:
            coordinator = _get_coordinator(hass, entry_id)
            if coordinator:
                mode = coordinator.overlay_mode or OVERLAY_MODE_DEFAULT
                duration = coordinator.timer_duration or TIMER_DURATION_DEFAULT
        except (AttributeError, TypeError):
            pass

    # Map internal storage values to API-accepted values
    mode = _map_overlay_to_api(mode)

    if mode == "TIMER":
        return {"type": "TIMER", "durationInSeconds": duration * 60}

    return {"type": mode}


def get_zone_overlay_termination(hass: HomeAssistant, zone_id: str, entry_id: str | None = None) -> dict[str, Any]:
    """Get the termination dict for overlay API calls with per-zone support.

    Priority:
    1. Per-zone overlay_mode (if zone_config_manager available and zone has override)
    2. Global overlay_mode (from coordinator)

    Args:
        hass: Home Assistant instance
        zone_id: Zone ID to get overlay mode for
        entry_id: Optional config entry ID for per-entry lookup

    Returns:
        {"type": "..."} or {"type": "...", "durationInSeconds": ...} for Timer mode

    """
    zone_config_manager = None
    if entry_id:
        try:
            coordinator = _get_coordinator(hass, entry_id)
            if coordinator:
                zone_config_manager = coordinator.zone_config_manager
        except (AttributeError, TypeError):
            pass

    if zone_config_manager:
        # Get per-zone overlay mode (UPPERCASE values)
        zone_mode = zone_config_manager.get_zone_value(zone_id, "overlay_mode", None)

        if zone_mode and zone_mode != "TADO_MODE":
            # Map to API values
            api_mode = _map_overlay_to_api(zone_mode)

            # Handle Timer mode with duration
            if api_mode == "TIMER":
                duration = zone_config_manager.get_zone_value(zone_id, "timer_duration", TIMER_DURATION_DEFAULT)
                return {"type": "TIMER", "durationInSeconds": duration * 60}

            return {"type": api_mode}

    # Fallback to global overlay mode (handles TADO_MODE and when no per-zone config)
    return get_overlay_termination(hass, entry_id=entry_id)


def build_timer_termination(
    duration_minutes: int | None = None,
    overlay: str | None = None,
    hass: HomeAssistant | None = None,
    zone_id: str | None = None,
    entry_id: str | None = None,
) -> dict[str, Any]:
    """Build termination dict for set_timer / set_overlay calls.

    Consolidates the duplicated termination-building logic from:
    - TadoClimate.async_set_timer (heating.py)
    - TadoACClimate.async_set_timer (ac.py)
    - TadoACClimate._async_set_ac_overlay (ac.py)

    Priority:
    1. If duration_minutes provided → TIMER termination
    2. If overlay == 'next_time_block' → TADO_MODE termination
    3. If overlay == 'manual' → MANUAL termination
    4. Otherwise → per-zone overlay termination (from config)

    Args:
        duration_minutes: Timer duration in minutes (takes highest priority)
        overlay: Overlay type string ('next_time_block', 'manual', or None)
        hass: Home Assistant instance (needed for per-zone config fallback)
        zone_id: Zone ID (needed for per-zone config fallback)
        entry_id: Config entry ID (needed for per-zone config fallback)

    Returns:
        Termination dict for Tado API, e.g. {"type": "TIMER", "durationInSeconds": 3600}

    """
    if duration_minutes:
        return {"type": "TIMER", "durationInSeconds": duration_minutes * 60}

    if overlay:
        overlay_upper = overlay.upper()
        api_mode = _map_overlay_to_api(overlay_upper)
        if api_mode in ("TADO_MODE", "MANUAL"):
            return {"type": api_mode}

    # Fall back to per-zone / global overlay config
    if hass and zone_id:
        return get_zone_overlay_termination(hass, zone_id, entry_id=entry_id)
    if hass:
        return get_overlay_termination(hass, entry_id=entry_id)

    # Ultimate fallback
    return {"type": "MANUAL"}
