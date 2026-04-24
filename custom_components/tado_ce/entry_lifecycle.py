"""Tado CE entry lifecycle — per-entry component creation and cleanup."""  # coordinator attributes are heterogeneous

from __future__ import annotations

import logging
from typing import TYPE_CHECKING, Any

if TYPE_CHECKING:
    from collections.abc import Callable

    from homeassistant.config_entries import ConfigEntry
    from homeassistant.core import HomeAssistant

    from .config_manager import ConfigurationManager
    from .coordinator import TadoDataUpdateCoordinator
    from .data_loader import DataLoader

_LOGGER = logging.getLogger(__name__)


async def async_create_entry_components(
    hass: HomeAssistant,
    entry: ConfigEntry,
    config_manager: ConfigurationManager,
    home_id: str | None,
    data_loader: DataLoader | None = None,
) -> dict[str, Any]:
    """Create per-entry infrastructure components.

    Creates: API tracker, API client, freshness cleanup timer,
    refresh handler, and runs device cleanup.

    Returns a dict with created components for coordinator construction.
    """
    from homeassistant.helpers.aiohttp_client import async_get_clientsession

    from .api_call_tracker import APICallTracker
    from .api_client import TadoApiClient
    from .const import DATA_DIR
    # Create per-entry API call tracker
    retention_days = config_manager.get_api_history_retention_days()
    api_tracker = APICallTracker(
        hass, DATA_DIR, retention_days=retention_days, home_id=home_id, config_manager=config_manager,
    )
    await api_tracker.async_init()
    _LOGGER.debug("Tado CE: Per-entry API call tracker created")

    # Create per-entry API client
    session = async_get_clientsession(hass)
    api_client = TadoApiClient(
        session,
        hass,
        home_id=home_id,
        refresh_token=entry.data.get("refresh_token", ""),
        config_manager=config_manager,
        api_tracker=api_tracker,
        data_loader=data_loader,
        config_entry=entry,
    )
    _LOGGER.debug("Tado CE: Per-entry API client created")

    # Load version early to avoid race conditions in device_manager
    from .device_manager import load_version

    await hass.async_add_executor_job(load_version)

    return {
        "api_tracker": api_tracker,
        "api_client": api_client,
    }


async def async_cleanup_entry_components(
    hass: HomeAssistant,
    coordinator: TadoDataUpdateCoordinator | None,
) -> None:
    """Clean up per-entry infrastructure components.

    Cancels timers and cleans up managers using coordinator attributes.
    """
    if coordinator is None:
        return

    def _attr(field: str) -> Any:
        """Get field from coordinator, or None if missing."""
        return getattr(coordinator, field, None)

    # --- Cancel per-entry timers ---

    cancel_func: Callable[[], None] | None = _attr("_freshness_cleanup_cancel")
    if cancel_func:
        cancel_func()
        _LOGGER.debug("Cancelled freshness cleanup timer")

    cancel_func = _attr("_heating_cycle_timeout_cancel")
    if cancel_func:
        cancel_func()
        _LOGGER.debug("Cancelled heating cycle timeout timer")

    # --- Clean up per-entry managers ---

    ac = _attr("api_client")
    if ac is not None:
        ac._access_token = None
        ac._token_expiry = None
        coordinator.api_client = None  # type: ignore[assignment]
        _LOGGER.debug("Cleaned up per-entry TadoApiClient")

    # Save data before cleanup
    scm = _attr("smart_comfort_manager")
    if scm is not None:
        scm.save_to_file()
        coordinator.smart_comfort_manager = None
        _LOGGER.debug("Cleaned up per-entry SmartComfortManager")

    # Save bridge health state before cleanup
    bht = _attr("bridge_health_tracker")
    dl = _attr("data_loader")
    if bht is not None and dl is not None:
        dl.save_bridge_health(bht.to_dict())
        _LOGGER.debug("Saved bridge health state on cleanup")

    apm = _attr("adaptive_preheat_manager")
    if apm is not None:
        await apm.async_unload()
        coordinator.adaptive_preheat_manager = None
        _LOGGER.debug("Cleaned up per-entry AdaptivePreheatManager")

    if _attr("data_loader") is not None:
        coordinator.data_loader = None  # type: ignore[assignment]
        _LOGGER.debug("Cleaned up per-entry DataLoader")
