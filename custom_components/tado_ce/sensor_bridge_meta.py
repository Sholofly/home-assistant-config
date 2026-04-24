"""Tado CE Bridge Meta Sensors — capabilities summary and schema version tracking.

Provides two diagnostic sensors:
- TadoBridgeCapabilitiesSensor: wiring type + capability flags
- TadoBridgeSchemaVersionSensor: field count + schema change detection
"""

from __future__ import annotations

from datetime import datetime
import logging
from typing import TYPE_CHECKING, Any

from homeassistant.components.sensor import SensorEntity
from homeassistant.const import EntityCategory
from homeassistant.core import callback
from homeassistant.helpers.update_coordinator import CoordinatorEntity
from homeassistant.util import dt as dt_util

from .bridge_discovery import (
    BridgeCapabilities,
    DiscoveredField,
    diff_responses,
    extract_capabilities,
    flatten_response,
)
from .device_manager import get_hub_device_info
from .entity_registry import get_meta

if TYPE_CHECKING:
    from .coordinator import TadoDataUpdateCoordinator

_LOGGER = logging.getLogger(__name__)


class TadoBridgeCapabilitiesSensor(
    CoordinatorEntity["TadoDataUpdateCoordinator"],
    SensorEntity,
):
    """Sensor showing bridge wiring type and available capabilities."""

    _attr_has_entity_name = True
    _attr_entity_category = EntityCategory.DIAGNOSTIC

    def __init__(self, coordinator: TadoDataUpdateCoordinator) -> None:
        """Initialize the TadoBridgeCapabilitiesSensor."""
        super().__init__(coordinator)
        meta = get_meta("sensor_bridge_capabilities")
        self._attr_device_info = get_hub_device_info(coordinator.home_id)
        self._attr_unique_id = f"tado_ce_{coordinator.home_id}_{meta.unique_id_suffix}"
        self._attr_translation_key = meta.translation_key
        self._attr_entity_registry_enabled_default = meta.enabled_default
        if meta.icon:
            self._attr_icon = meta.icon
        self._capabilities: BridgeCapabilities | None = None

    @callback
    def _handle_coordinator_update(self) -> None:
        """Update capabilities from current bridge data."""
        bridge = self.coordinator.data.get("bridge")
        if not bridge:
            self._attr_available = False
            self.async_write_ha_state()
            return
        fields = flatten_response(bridge)
        caps = extract_capabilities(fields)
        self._attr_native_value = caps.wiring_type
        self._attr_available = True
        self._capabilities = caps
        self.async_write_ha_state()

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        """Return capability flags."""
        if self._capabilities is None:
            return {}
        c = self._capabilities
        return {
            "has_temperature_monitoring": c.has_temperature_monitoring,
            "has_flow_temperature": c.has_flow_temperature,
            "has_output_temperature": c.has_output_temperature,
            "has_max_temp_control": c.has_max_temp_control,
            "discovered_field_count": c.discovered_field_count,
            "device_type": c.device_type,
        }


class TadoBridgeSchemaVersionSensor(
    CoordinatorEntity["TadoDataUpdateCoordinator"],
    SensorEntity,
):
    """Sensor tracking Bridge API response schema changes."""

    _attr_has_entity_name = True
    _attr_entity_category = EntityCategory.DIAGNOSTIC

    def __init__(self, coordinator: TadoDataUpdateCoordinator) -> None:
        """Initialize the TadoBridgeSchemaVersionSensor."""
        super().__init__(coordinator)
        meta = get_meta("sensor_bridge_schema_version")
        self._attr_device_info = get_hub_device_info(coordinator.home_id)
        self._attr_unique_id = f"tado_ce_{coordinator.home_id}_{meta.unique_id_suffix}"
        self._attr_translation_key = meta.translation_key
        self._attr_entity_registry_enabled_default = meta.enabled_default
        if meta.icon:
            self._attr_icon = meta.icon
        self._previous_fields: list[DiscoveredField] | None = None
        self._last_schema_change: datetime | None = None
        self._recent_changes: list[dict[str, str]] = []
        self._current_field_paths: list[str] = []

    @callback
    def _handle_coordinator_update(self) -> None:
        """Detect schema changes between polls."""
        bridge = self.coordinator.data.get("bridge")
        if not bridge:
            self._attr_available = False
            self.async_write_ha_state()
            return

        current_fields = flatten_response(bridge)
        self._attr_native_value = len(current_fields)
        self._attr_available = True

        if self._previous_fields is not None:
            diff = diff_responses(self._previous_fields, current_fields)
            if diff.has_changes:
                self._last_schema_change = dt_util.utcnow()
                self._recent_changes = diff.to_change_list()
                _LOGGER.info("Bridge API schema change detected: %s", diff.summary)

        self._previous_fields = current_fields
        self._current_field_paths = [f.path for f in current_fields]
        self.async_write_ha_state()

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        """Return schema metadata."""
        return {
            "field_paths": self._current_field_paths,
            "last_schema_change": (
                self._last_schema_change.isoformat() if self._last_schema_change else None
            ),
            "changes_detected": self._recent_changes,
        }
