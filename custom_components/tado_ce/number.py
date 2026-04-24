"""Tado CE Number Platform — bridge number entities.

Conditionally creates the boiler max output temperature number entity
when bridge credentials (bridge_serial + bridge_auth_key) are present
in the config entry options.
"""

from __future__ import annotations

import logging
from typing import TYPE_CHECKING

from .number_bridge import TadoBoilerMaxOutputTemperatureNumber

if TYPE_CHECKING:
    from homeassistant.core import HomeAssistant
    from homeassistant.helpers.entity_platform import AddConfigEntryEntitiesCallback

    from .coordinator import TadoConfigEntry, TadoDataUpdateCoordinator

_LOGGER = logging.getLogger(__name__)

PARALLEL_UPDATES = 1


async def async_setup_entry(
    hass: HomeAssistant,
    entry: TadoConfigEntry,
    async_add_entities: AddConfigEntryEntitiesCallback,
) -> None:
    """Set up Tado CE number entities from a config entry."""
    coordinator: TadoDataUpdateCoordinator = entry.runtime_data
    entities = []

    # Bridge number entity (optional — only when bridge credentials configured
    # AND the bridge response actually contains the temperature field)
    bridge_serial = entry.options.get("bridge_serial")
    bridge_auth_key = entry.options.get("bridge_auth_key")
    if bridge_serial and bridge_auth_key:
        bridge_data = coordinator.data.get("bridge")
        if isinstance(bridge_data, dict) and "boilerMaxOutputTemperatureInCelsius" in bridge_data:
            entities.append(TadoBoilerMaxOutputTemperatureNumber(coordinator))
            _LOGGER.info("Bridge credentials found with temperature field — creating bridge number entity")
        else:
            _LOGGER.debug(
                "Bridge credentials present but boilerMaxOutputTemperatureInCelsius not in response — "
                "skipping number entity",
            )

    async_add_entities(entities, True)
