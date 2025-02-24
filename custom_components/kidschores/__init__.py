# File: __init__.py
"""Initialization file for the KidsChores integration.

Handles setting up the integration, including loading configuration entries,
initializing data storage, and preparing the coordinator for data handling.

Key Features:
- Config entry setup and unload support.
- Coordinator initialization for data synchronization.
- Storage management for persistent data handling.
"""

from __future__ import annotations

import asyncio

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.typing import ConfigType
from homeassistant.exceptions import ConfigEntryNotReady

from .const import (
    DOMAIN,
    LOGGER,
    NOTIFICATION_EVENT,
    STORAGE_KEY,
    PLATFORMS,
)
from .coordinator import KidsChoresDataCoordinator
from .notification_action_handler import async_handle_notification_action
from .storage_manager import KidsChoresStorageManager
from .services import async_setup_services, async_unload_services


async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:
    """Set up the integration via configuration.yaml (if supported in the future).

    Args:
        hass: Home Assistant core object.
        config: Configuration dictionary.

    Returns:
        bool: True if successful, False otherwise.

    """
    LOGGER.info("Setting up KidsChores integration via YAML is currently unsupported")
    return True


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up the integration from a config entry.

    Args:
        hass: Home Assistant core object.
        entry: Configuration entry created via the UI.

    Returns:
        bool: True if successful, raises an exception otherwise.

    """
    LOGGER.info("Starting setup for KidsChores entry: %s", entry.entry_id)

    # Initialize the storage manager to handle persistent data.
    storage_manager = KidsChoresStorageManager(hass, STORAGE_KEY)
    # Initialize new file.
    await storage_manager.async_initialize()

    # Create the data coordinator for managing updates and synchronization.
    coordinator = KidsChoresDataCoordinator(hass, entry, storage_manager)

    try:
        # Perform the first refresh to load data.
        await coordinator.async_config_entry_first_refresh()
    except ConfigEntryNotReady as e:
        LOGGER.error("Failed to refresh coordinator data: %s", e)
        raise ConfigEntryNotReady from e

    # Store the coordinator and data manager in hass.data.
    hass.data.setdefault(DOMAIN, {})[entry.entry_id] = {
        "coordinator": coordinator,
        "storage_manager": storage_manager,
    }

    # Set up services required by the integration.
    async_setup_services(hass)

    # Forward the setup to supported platforms (sensors, buttons, etc.).
    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)

    # Listen for notification actions from the companion app.
    hass.bus.async_listen(
        NOTIFICATION_EVENT,
        lambda event: asyncio.run_coroutine_threadsafe(
            async_handle_notification_action(hass, event), hass.loop
        ),
    )

    LOGGER.info("KidsChores setup complete for entry: %s", entry.entry_id)
    return True


async def async_unload_entry(hass, entry):
    """Unload a config entry.

    Args:
        hass: Home Assistant instance.
        entry: Config entry to unload.

    """
    LOGGER.info("Unloading KidsChores entry: %s", entry.entry_id)

    # Unload platforms
    unload_ok = await hass.config_entries.async_unload_platforms(entry, PLATFORMS)

    if unload_ok:
        hass.data[DOMAIN].pop(entry.entry_id)

        # Await service unloading
        await async_unload_services(hass)

    return unload_ok


async def async_remove_entry(hass: HomeAssistant, entry: ConfigEntry) -> None:
    """Handle removal of a config entry."""
    LOGGER.info("Removing KidsChores entry: %s", entry.entry_id)

    # Safely check if data exists before attempting to access it
    if DOMAIN in hass.data and entry.entry_id in hass.data[DOMAIN]:
        storage_manager: KidsChoresStorageManager = hass.data[DOMAIN][entry.entry_id][
            "storage_manager"
        ]
        await storage_manager.async_delete_storage()

    LOGGER.info("KidsChores entry data cleared: %s", entry.entry_id)
