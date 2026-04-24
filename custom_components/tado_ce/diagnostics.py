"""Tado CE diagnostics — config entry debug dump with PII redaction."""

from __future__ import annotations

import logging
from typing import TYPE_CHECKING, Any

from homeassistant.components.diagnostics import async_redact_data

if TYPE_CHECKING:
    from homeassistant.core import HomeAssistant

    from .coordinator import TadoConfigEntry

_LOGGER = logging.getLogger(__name__)

# Keys to redact from config entry data / coordinator data
TO_REDACT_CONFIG = {
    "home_id",
    "token",
    "refresh_token",
    "access_token",
    "username",
    "password",
    "email",
}


async def async_get_config_entry_diagnostics(
    hass: HomeAssistant,
    entry: TadoConfigEntry,
) -> dict[str, Any]:
    """Return diagnostics for a config entry."""
    coordinator = entry.runtime_data

    # Redact sensitive fields from entry data and options
    redacted_entry_data = async_redact_data(dict(entry.data), TO_REDACT_CONFIG)
    redacted_options = async_redact_data(dict(entry.options), TO_REDACT_CONFIG)

    # Build coordinator data summary (redact PII from nested dicts)
    coord_data = coordinator.data or {}
    redacted_coord: dict[str, Any] = {}

    # Safe keys — no PII, include as-is
    for key in ("ratelimit", "weather", "offsets"):
        if key in coord_data:
            redacted_coord[key] = coord_data[key]

    # Zone count summary (don't dump full zone state)
    zones_info = coord_data.get("zones_info") or []
    redacted_coord["zones_info_count"] = len(zones_info)
    redacted_coord["zone_types"] = _summarise_zone_types(zones_info)

    # Config manager settings (no PII)
    config_summary = {}
    if coordinator.config_manager:
        config_summary = coordinator.config_manager.get_all_config()
    redacted_coord["config_settings"] = config_summary

    # Coordinator metadata
    redacted_coord["update_interval_seconds"] = (
        coordinator.update_interval.total_seconds() if coordinator.update_interval else None
    )
    redacted_coord["last_update_success"] = coordinator.last_update_success

    # State restore captured states (privacy-safe: no temperature values)
    sr_diagnostics = coordinator.get_state_restore_diagnostics()
    if sr_diagnostics:
        redacted_coord["state_restore_captured"] = sr_diagnostics

    return {
        "entry": {
            "entry_id": entry.entry_id,
            "version": entry.version,
            "data": redacted_entry_data,
            "options": redacted_options,
        },
        "coordinator": redacted_coord,
    }


def _summarise_zone_types(zones_info: list[dict[str, Any]]) -> dict[str, int]:
    """Summarise zone types from zones_info list."""
    counts: dict[str, int] = {}
    for zone in zones_info:
        zone_type = zone.get("type", "UNKNOWN")
        counts[zone_type] = counts.get(zone_type, 0) + 1
    return counts
