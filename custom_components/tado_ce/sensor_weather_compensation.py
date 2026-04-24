"""Tado CE Weather Compensation Sensors — target flow temp and engine status.

Two diagnostic sensors that expose the weather compensation engine state:
- TadoWeatherCompensationTargetSensor: calculated target flow temperature
- TadoWeatherCompensationStatusSensor: engine status (active/paused/disabled)
"""

from __future__ import annotations

import logging
from typing import TYPE_CHECKING, Any

from homeassistant.components.sensor import (
    SensorDeviceClass,
    SensorEntity,
    SensorStateClass,
)
from homeassistant.const import EntityCategory, UnitOfTemperature
from homeassistant.core import callback
from homeassistant.helpers.update_coordinator import CoordinatorEntity

from .device_manager import get_hub_device_info
from .entity_registry import get_meta

if TYPE_CHECKING:
    from .coordinator import TadoDataUpdateCoordinator

_LOGGER = logging.getLogger(__name__)


class TadoWeatherCompensationTargetSensor(
    CoordinatorEntity["TadoDataUpdateCoordinator"],
    SensorEntity,
):
    """Sensor showing the calculated target flow temperature."""

    _attr_has_entity_name = True
    _attr_entity_category = EntityCategory.DIAGNOSTIC
    _attr_device_class = SensorDeviceClass.TEMPERATURE
    _attr_state_class = SensorStateClass.MEASUREMENT
    _attr_native_unit_of_measurement = UnitOfTemperature.CELSIUS

    def __init__(self, coordinator: TadoDataUpdateCoordinator) -> None:
        """Initialize the TadoWeatherCompensationTargetSensor."""
        super().__init__(coordinator)
        meta = get_meta("sensor_wc_target_flow_temp")
        self._attr_device_info = get_hub_device_info(coordinator.home_id)
        self._attr_unique_id = f"tado_ce_{coordinator.home_id}_{meta.unique_id_suffix}"
        self._attr_translation_key = meta.translation_key
        self._attr_entity_registry_enabled_default = meta.enabled_default
        if meta.icon:
            self._attr_icon = meta.icon

    @callback
    def _handle_coordinator_update(self) -> None:
        """Update target flow temperature from coordinator data."""
        wc = self.coordinator.data.get("weather_compensation")
        if not wc:
            self._attr_available = False
            self.async_write_ha_state()
            return
        self._attr_native_value = wc.get("target_flow_temp")
        self._attr_available = self._attr_native_value is not None
        self.async_write_ha_state()

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        """Return weather compensation details as extra attributes."""
        wc = self.coordinator.data.get("weather_compensation")
        if not wc:
            return {}
        return {
            "outdoor_temperature": wc.get("smoothed_outdoor_temp"),
            "outdoor_temperature_raw": wc.get("raw_outdoor_temp"),
            "heating_system_preset": wc.get("heating_system_preset"),
            "room_compensation_offset": wc.get("room_compensation_offset"),
            "smoothing_method": wc.get("smoothing_method"),
            "smoothing_window": wc.get("smoothing_window"),
        }


class TadoWeatherCompensationStatusSensor(
    CoordinatorEntity["TadoDataUpdateCoordinator"],
    SensorEntity,
):
    """Sensor showing the weather compensation engine status."""

    _attr_has_entity_name = True
    _attr_entity_category = EntityCategory.DIAGNOSTIC

    def __init__(self, coordinator: TadoDataUpdateCoordinator) -> None:
        """Initialize the TadoWeatherCompensationStatusSensor."""
        super().__init__(coordinator)
        meta = get_meta("sensor_wc_status")
        self._attr_device_info = get_hub_device_info(coordinator.home_id)
        self._attr_unique_id = f"tado_ce_{coordinator.home_id}_{meta.unique_id_suffix}"
        self._attr_translation_key = meta.translation_key
        self._attr_entity_registry_enabled_default = meta.enabled_default
        if meta.icon:
            self._attr_icon = meta.icon

    @callback
    def _handle_coordinator_update(self) -> None:
        """Update engine status from coordinator data."""
        wc = self.coordinator.data.get("weather_compensation")
        if not wc:
            self._attr_native_value = "disabled"
            self._attr_available = True
            self.async_write_ha_state()
            return
        self._attr_native_value = wc.get("status", "disabled")
        self._attr_available = True
        self.async_write_ha_state()
