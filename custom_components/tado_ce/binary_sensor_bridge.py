"""Tado CE Bridge Connected Binary Sensor — Bridge API connectivity monitoring.

Reads health state from coordinator.bridge_health_tracker to report
whether the Bridge API is reachable. Exposes diagnostic attributes
for last successful poll time, consecutive failures, last error, and
response time.
"""

from __future__ import annotations

from typing import TYPE_CHECKING, Any

from homeassistant.components.binary_sensor import (
    BinarySensorDeviceClass,
    BinarySensorEntity,
)
from homeassistant.const import EntityCategory
from homeassistant.core import callback
from homeassistant.helpers.update_coordinator import CoordinatorEntity

from .device_manager import get_hub_device_info
from .entity_registry import get_meta

if TYPE_CHECKING:
    from .coordinator import TadoDataUpdateCoordinator


class TadoBridgeConnectedSensor(
    CoordinatorEntity["TadoDataUpdateCoordinator"],
    BinarySensorEntity,
):
    """Binary sensor for Bridge API connectivity."""

    _attr_device_class = BinarySensorDeviceClass.CONNECTIVITY
    _attr_has_entity_name = True
    _attr_entity_category = EntityCategory.DIAGNOSTIC

    def __init__(self, coordinator: TadoDataUpdateCoordinator) -> None:
        """Initialize the TadoBridgeConnectedSensor."""
        super().__init__(coordinator)
        meta = get_meta("binary_sensor_bridge_connected")
        self._attr_device_info = get_hub_device_info(coordinator.home_id)
        self._attr_unique_id = f"tado_ce_{coordinator.home_id}_{meta.unique_id_suffix}"
        self._attr_translation_key = meta.translation_key
        self._attr_entity_registry_enabled_default = meta.enabled_default
        if meta.icon:
            self._attr_icon = meta.icon

    @callback
    def _handle_coordinator_update(self) -> None:
        """Update from health tracker state."""
        health = self.coordinator.bridge_health_tracker
        if health is None:
            self._attr_available = False
        else:
            self._attr_is_on = health.state.is_connected
            self._attr_available = True
        self.async_write_ha_state()

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        """Return health metrics as extra state attributes."""
        health = self.coordinator.bridge_health_tracker
        if health is None:
            return {}
        s = health.state
        return {
            "last_successful_poll": (
                s.last_successful_poll.isoformat() if s.last_successful_poll else None
            ),
            "consecutive_failures": s.consecutive_failures,
            "last_error": s.last_error,
            "response_time_ms": s.last_response_time_ms,
        }
