"""Tado CE Dynamic Bridge Sensor — single generic class for all Bridge API fields.

Replaces the previous hardcoded TadoBridgeBaseSensor, TadoBoilerWiringStateSensor,
and TadoBoilerOutputTemperatureSensor with a data-driven approach. Each sensor is
initialised from a ResolvedEntity produced by the discovery engine.
"""

from __future__ import annotations

import logging
from typing import TYPE_CHECKING, Any

from homeassistant.components.sensor import (
    SensorDeviceClass,
    SensorEntity,
    SensorStateClass,
)
from homeassistant.const import EntityCategory
from homeassistant.core import callback
from homeassistant.helpers.update_coordinator import CoordinatorEntity

from .bridge_type_inference import format_display_value
from .device_manager import get_hub_device_info
from .helpers import parse_iso_datetime

if TYPE_CHECKING:
    from .bridge_discovery import ResolvedEntity
    from .coordinator import TadoDataUpdateCoordinator

_LOGGER = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# Named formatter registry — maps value_formatter strings to callables.
# Populated lazily on first use to avoid circular imports.
# ---------------------------------------------------------------------------

_FORMATTER_REGISTRY: dict[str, Any] | None = None


def _get_formatter_registry() -> dict[str, Any]:
    """Build and cache the named formatter registry."""
    global _FORMATTER_REGISTRY
    if _FORMATTER_REGISTRY is None:
        from . import format_helpers as fh

        _FORMATTER_REGISTRY = {
            "format_bridge_wiring_state": fh.format_bridge_wiring_state,
            "format_boolean_connected": fh.format_boolean_connected,
            "format_boolean_yes_no": fh.format_boolean_yes_no,
        }
    return _FORMATTER_REGISTRY


# ---------------------------------------------------------------------------
# Helper functions
# ---------------------------------------------------------------------------


def _resolve_dot_path(data: dict[str, object], path: str) -> object | None:
    """Navigate nested dict by dot-notation path.

    Returns None if any key is missing along the path.
    """
    current: object = data
    for key in path.split("."):
        if not isinstance(current, dict):
            return None
        current = current.get(key)
        if current is None:
            return None
    return current


def _detect_value_type(data: dict[str, object] | None, path: str) -> str:
    """Detect the runtime value type at a dot-path for extra_state_attributes."""
    if data is None:
        return "unknown"
    value = _resolve_dot_path(data, path)
    if value is None:
        return "unknown"
    if isinstance(value, bool):
        return "boolean"
    if isinstance(value, (int, float)):
        return "number"
    return "string"


def _format_value(
    value: object,
    path: str,
    value_type: str,
    formatter_name: str | None,
) -> str | float:
    """Format a raw value using a named formatter or type inference fallback.

    For numeric sensor values (temperature etc.), returns float directly
    so HA can apply unit conversion. For everything else, returns a string.
    """
    # Named formatter takes priority
    if formatter_name:
        registry = _get_formatter_registry()
        fn = registry.get(formatter_name)
        if fn is not None:
            return fn(value)  # type: ignore[no-any-return]
        _LOGGER.debug("Formatter %s not found in registry, falling back to inference", formatter_name)

    # Numeric values: return as float for HA native_value
    if isinstance(value, (int, float)) and not isinstance(value, bool):
        return float(value)

    # Fallback to type inference display formatting
    return format_display_value(value, value_type, path)


# ---------------------------------------------------------------------------
# Dynamic Bridge Sensor
# ---------------------------------------------------------------------------


class TadoDynamicBridgeSensor(
    CoordinatorEntity["TadoDataUpdateCoordinator"],
    SensorEntity,
):
    """Generic sensor for any discovered Bridge API field."""

    _attr_has_entity_name = True

    def __init__(
        self,
        coordinator: TadoDataUpdateCoordinator,
        resolved: ResolvedEntity,
    ) -> None:
        """Initialize from a ResolvedEntity."""
        super().__init__(coordinator)
        self._field_path = resolved.path
        self._value_type = resolved.value_type
        self._value_formatter_name: str | None = None
        self._attr_device_info = get_hub_device_info(coordinator.home_id)
        self._attr_available = False
        self._attr_native_value = None

        # Unique ID
        self._attr_unique_id = f"tado_ce_{coordinator.home_id}_{resolved.unique_id_suffix}"

        # Translation key (enriched fields have one, inferred fields use suggested_name)
        if resolved.translation_key:
            self._attr_translation_key = resolved.translation_key
        else:
            self._attr_name = resolved.suggested_name

        self._attr_entity_registry_enabled_default = resolved.enabled_default

        # Device class
        if resolved.device_class:
            self._attr_device_class = SensorDeviceClass(resolved.device_class)

        # State class
        if resolved.state_class:
            self._attr_state_class = SensorStateClass(resolved.state_class)

        # Unit
        if resolved.unit_of_measurement:
            self._attr_native_unit_of_measurement = resolved.unit_of_measurement

        # Icon
        if resolved.icon:
            self._attr_icon = resolved.icon

        # Entity category
        if resolved.entity_category:
            self._attr_entity_category = EntityCategory(resolved.entity_category)

        # Store value_formatter name from enrichment (if source is enrichment)
        if resolved.source == "enrichment":
            from .bridge_enrichment import FIELD_ENRICHMENT

            enrichment = FIELD_ENRICHMENT.get(resolved.path)
            if enrichment and enrichment.value_formatter:
                self._value_formatter_name = enrichment.value_formatter

    @callback
    def _handle_coordinator_update(self) -> None:
        """Update sensor from coordinator bridge data."""
        bridge = self.coordinator.data.get("bridge")
        if not bridge:
            self._attr_available = False
            self.async_write_ha_state()
            return

        value = _resolve_dot_path(bridge, self._field_path)
        if value is None:
            self._attr_available = False
        else:
            # Timestamp device class requires datetime object, not raw string
            if getattr(self, "_attr_device_class", None) == SensorDeviceClass.TIMESTAMP and isinstance(value, str):
                try:
                    self._attr_native_value = parse_iso_datetime(value)
                except (ValueError, TypeError):
                    _LOGGER.debug("Failed to parse timestamp: %s", value)
                    self._attr_native_value = None
            else:
                self._attr_native_value = _format_value(
                    value,
                    self._field_path,
                    self._value_type,
                    self._value_formatter_name,
                )
            self._attr_available = self._attr_native_value is not None
        self.async_write_ha_state()

    @property
    def extra_state_attributes(self) -> dict[str, object]:
        """Return source metadata for debugging and auto-documentation."""
        return {
            "source_path": self._field_path,
            "value_type": _detect_value_type(
                self.coordinator.data.get("bridge"),
                self._field_path,
            ),
        }
