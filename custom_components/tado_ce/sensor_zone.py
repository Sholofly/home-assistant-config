"""Tado CE Zone Sensors — temperature, humidity, heating power, overlay, etc."""

from __future__ import annotations

import logging
from typing import TYPE_CHECKING, Any

from homeassistant.components.sensor import (
    SensorDeviceClass,
    SensorEntity,
    SensorStateClass,
)
from homeassistant.const import PERCENTAGE, UnitOfTemperature
from homeassistant.core import callback
from homeassistant.helpers.update_coordinator import CoordinatorEntity

from .device_manager import get_hub_device_info, get_zone_device_info
from .entity_registry import ENTITY_REGISTRY, get_entity_category

if TYPE_CHECKING:
    from .coordinator import TadoDataUpdateCoordinator

_LOGGER = logging.getLogger(__name__)


class TadoZoneSensor(CoordinatorEntity["TadoDataUpdateCoordinator"], SensorEntity):
    """Represent a base Tado zone sensor."""

    _attr_has_entity_name = True

    """Base class for Tado zone sensors (CoordinatorEntity pattern)."""

    def __init__(
        self, coordinator: TadoDataUpdateCoordinator, zone_id: str, zone_name: str, zone_type: str = "HEATING",
    ) -> None:
        """Initialize the Zone Sensor."""
        super().__init__(coordinator)
        self._home_id = coordinator.home_id
        self._zone_id = zone_id
        self._zone_name = zone_name
        self._zone_type = zone_type
        self._attr_available = False
        self._attr_native_value = None
        self._attr_device_info = get_zone_device_info(zone_id, zone_name, zone_type, coordinator.home_id)

    def _get_zone_data(self) -> dict[str, Any] | None:
        """Get zone data from coordinator data."""
        try:
            data = self.coordinator.data
            if data:
                zone_states = (data.get("zones") or {}).get("zoneStates") or {}
                return zone_states.get(self._zone_id)
            return None
        except Exception:  # noqa: BLE001 — defensive helper for entity update path
            _LOGGER.debug("Failed to get zone data for zone %s", self._zone_id)
            return None

    @callback
    def _handle_coordinator_update(self) -> None:
        """Handle updated data from the coordinator."""
        zone_data = self._get_zone_data()
        if zone_data:
            self._update_from_zone_data(zone_data)
            self._attr_available = True
        else:
            self._attr_available = False
        self.async_write_ha_state()

    @callback
    def _update_from_zone_data(self, zone_data: dict[str, Any]) -> None:
        pass

    @property
    def _base_zone_attributes(self) -> dict[str, str]:
        """Base extra_state_attributes shared by all zone sensors."""
        from .format_helpers import format_zone_type

        return {"zone_type": format_zone_type(self._zone_type)}


class TadoTemperatureSensor(TadoZoneSensor):
    """Represent a Tado zone temperature sensor."""

    _attr_has_entity_name = True

    """Current temperature sensor."""

    def __init__(
        self, coordinator: TadoDataUpdateCoordinator, zone_id: str, zone_name: str, zone_type: str = "HEATING",
    ) -> None:
        """Initialize the Temperature Sensor."""
        super().__init__(coordinator, zone_id, zone_name, zone_type)
        _meta = ENTITY_REGISTRY["sensor_temperature"]
        self._attr_translation_key = _meta.translation_key
        self._attr_unique_id = f"tado_ce_{coordinator.home_id}_{_meta.unique_id_suffix.format(zone_id=zone_id)}"
        self._attr_device_class = SensorDeviceClass.TEMPERATURE
        self._attr_native_unit_of_measurement = UnitOfTemperature.CELSIUS
        self._attr_state_class = SensorStateClass.MEASUREMENT

    @callback
    def _handle_coordinator_update(self) -> None:
        """Mark unavailable if no temperature data (HOT_WATER combi boilers)."""
        zone_data = self._get_zone_data()
        if zone_data:
            self._update_from_zone_data(zone_data)
            self._attr_available = self._attr_native_value is not None
        else:
            self._attr_available = False
        self.async_write_ha_state()

    @callback
    def _update_from_zone_data(self, zone_data: dict[str, Any]) -> None:
        # Use 'or {}' pattern for null safety (API may return null for these fields)
        sensor_data = zone_data.get("sensorDataPoints") or {}
        self._attr_native_value = (sensor_data.get("insideTemperature") or {}).get("celsius")


class TadoHumiditySensor(TadoZoneSensor):
    """Represent a Tado zone humidity sensor."""

    _attr_has_entity_name = True

    """Humidity sensor."""

    def __init__(
        self, coordinator: TadoDataUpdateCoordinator, zone_id: str, zone_name: str, zone_type: str = "HEATING",
    ) -> None:
        """Initialize the Humidity Sensor."""
        super().__init__(coordinator, zone_id, zone_name, zone_type)
        _meta = ENTITY_REGISTRY["sensor_humidity"]
        self._attr_translation_key = _meta.translation_key
        self._attr_unique_id = f"tado_ce_{coordinator.home_id}_{_meta.unique_id_suffix.format(zone_id=zone_id)}"
        self._attr_device_class = SensorDeviceClass.HUMIDITY
        self._attr_native_unit_of_measurement = PERCENTAGE
        self._attr_state_class = SensorStateClass.MEASUREMENT

    @callback
    def _handle_coordinator_update(self) -> None:
        """Mark unavailable if no humidity data."""
        zone_data = self._get_zone_data()
        if zone_data:
            self._update_from_zone_data(zone_data)
            self._attr_available = self._attr_native_value is not None
        else:
            self._attr_available = False
        self.async_write_ha_state()

    @callback
    def _update_from_zone_data(self, zone_data: dict[str, Any]) -> None:
        # Use 'or {}' pattern for null safety (API may return null for these fields)
        sensor_data = zone_data.get("sensorDataPoints") or {}
        self._attr_native_value = (sensor_data.get("humidity") or {}).get("percentage")


class TadoHeatingPowerSensor(TadoZoneSensor):
    """Represent a Tado heating power percentage sensor."""

    _attr_has_entity_name = True

    """Heating power sensor."""

    def __init__(
        self, coordinator: TadoDataUpdateCoordinator, zone_id: str, zone_name: str, zone_type: str = "HEATING",
    ) -> None:
        """Initialize the Heating Power Sensor."""
        super().__init__(coordinator, zone_id, zone_name, zone_type)
        _meta = ENTITY_REGISTRY["sensor_heating_power"]
        self._attr_translation_key = _meta.translation_key
        self._attr_unique_id = f"tado_ce_{coordinator.home_id}_{_meta.unique_id_suffix.format(zone_id=zone_id)}"
        self._attr_native_unit_of_measurement = PERCENTAGE
        self._attr_icon = _meta.icon
        self._attr_entity_category = get_entity_category(_meta)
        self._attr_state_class = SensorStateClass.MEASUREMENT

    @callback
    def _update_from_zone_data(self, zone_data: dict[str, Any]) -> None:
        # Use 'or {}' pattern for null safety (API may return null for these fields)
        activity_data = zone_data.get("activityDataPoints") or {}
        power = (activity_data.get("heatingPower") or {}).get("percentage")
        self._attr_native_value = power if power is not None else 0


class TadoACPowerSensor(TadoZoneSensor):
    """Represent a Tado AC power state sensor."""

    _attr_has_entity_name = True

    """AC power sensor."""

    def __init__(
        self, coordinator: TadoDataUpdateCoordinator, zone_id: str, zone_name: str, zone_type: str = "AIR_CONDITIONING",
    ) -> None:
        """Initialize the ACPower Sensor."""
        super().__init__(coordinator, zone_id, zone_name, zone_type)
        _meta = ENTITY_REGISTRY["sensor_ac_power"]
        self._attr_translation_key = _meta.translation_key
        self._attr_unique_id = f"tado_ce_{coordinator.home_id}_{_meta.unique_id_suffix.format(zone_id=zone_id)}"
        self._attr_native_unit_of_measurement = PERCENTAGE
        self._attr_icon = _meta.icon
        self._attr_entity_category = get_entity_category(_meta)
        self._attr_state_class = SensorStateClass.MEASUREMENT

    @callback
    def _update_from_zone_data(self, zone_data: dict[str, Any]) -> None:
        # Use 'or {}' pattern for null safety (API may return null for these fields)
        activity_data = zone_data.get("activityDataPoints") or {}
        ac_power = activity_data.get("acPower") or {}
        # Try percentage first (older API), then value (newer API returns 'ON'/'OFF')
        power = ac_power.get("percentage")
        if power is None:
            value = ac_power.get("value")
            power = 100 if value == "ON" else 0
        self._attr_native_value = power if power is not None else 0


class TadoBoilerFlowTemperatureSensor(CoordinatorEntity["TadoDataUpdateCoordinator"], SensorEntity):
    """Represent a Tado boiler flow temperature sensor."""

    _attr_has_entity_name = True

    """Boiler flow temperature sensor - reads from HEATING zones.

    This is a Hub-level sensor that reads boilerFlowTemperature from
    any HEATING zone that has this data available.
    """

    def __init__(self, coordinator: TadoDataUpdateCoordinator) -> None:
        """Initialize the Boiler Flow Temperature Sensor."""
        super().__init__(coordinator)
        _meta = ENTITY_REGISTRY["sensor_boiler_flow_temp"]
        self._attr_translation_key = _meta.translation_key
        self._attr_unique_id = f"tado_ce_{coordinator.home_id}_{_meta.unique_id_suffix}"
        self._attr_device_class = SensorDeviceClass.TEMPERATURE
        self._attr_native_unit_of_measurement = UnitOfTemperature.CELSIUS
        self._attr_state_class = SensorStateClass.MEASUREMENT
        self._attr_icon = _meta.icon
        self._attr_entity_category = get_entity_category(_meta)
        self._attr_device_info = get_hub_device_info(coordinator.home_id)
        self._attr_available = False
        self._attr_native_value = None
        self._source_zone = None

    @property
    def extra_state_attributes(self) -> dict[str, Any] | None:
        """Return extra state attributes."""
        return {
            "source_zone": self._source_zone,
        }

    @callback
    def _handle_coordinator_update(self) -> None:
        """Handle updated data from the coordinator."""
        try:
            data = self.coordinator.data
            if not data:
                self._attr_available = False
                self.async_write_ha_state()
                return

            zone_states = (data.get("zones") or {}).get("zoneStates") or {}
            for zone_id, zone_data in zone_states.items():
                activity_data = zone_data.get("activityDataPoints") or {}
                flow_temp = (activity_data.get("boilerFlowTemperature") or {}).get("celsius")
                if flow_temp is not None:
                    self._attr_native_value = flow_temp
                    self._source_zone = zone_id
                    self._attr_available = True
                    self.async_write_ha_state()
                    return

            self._attr_native_value = None
            self._source_zone = None
            self._attr_available = False
        except Exception:  # noqa: BLE001 — HA entity update pattern
            _LOGGER.debug("Failed to update boiler flow temperature sensor")
            self._attr_available = False
        self.async_write_ha_state()


class TadoTargetTempSensor(TadoZoneSensor):
    """Represent a Tado target temperature sensor."""

    _attr_has_entity_name = True

    """Target temperature sensor."""

    def __init__(
        self, coordinator: TadoDataUpdateCoordinator, zone_id: str, zone_name: str, zone_type: str = "HEATING",
    ) -> None:
        """Initialize the Target Temp Sensor."""
        super().__init__(coordinator, zone_id, zone_name, zone_type)
        _meta = ENTITY_REGISTRY["sensor_target"]
        self._attr_translation_key = _meta.translation_key
        self._attr_unique_id = f"tado_ce_{coordinator.home_id}_{_meta.unique_id_suffix.format(zone_id=zone_id)}"
        self._attr_device_class = SensorDeviceClass.TEMPERATURE
        self._attr_native_unit_of_measurement = UnitOfTemperature.CELSIUS
        self._attr_icon = _meta.icon

    @callback
    def _update_from_zone_data(self, zone_data: dict[str, Any]) -> None:
        # Use 'or {}' pattern for null safety (API may return null for setting)
        setting = zone_data.get("setting") or {}
        if setting.get("power") == "ON":
            self._attr_native_value = (setting.get("temperature") or {}).get("celsius")
        else:
            self._attr_native_value = None


class TadoOverlaySensor(TadoZoneSensor):
    """Represent a Tado overlay mode sensor."""

    _attr_has_entity_name = True

    """Overlay status sensor (Manual/Schedule)."""

    def __init__(
        self, coordinator: TadoDataUpdateCoordinator, zone_id: str, zone_name: str, zone_type: str = "HEATING",
    ) -> None:
        """Initialize the Overlay Sensor."""
        super().__init__(coordinator, zone_id, zone_name, zone_type)
        _meta = ENTITY_REGISTRY["sensor_overlay"]
        self._attr_translation_key = _meta.translation_key
        self._attr_unique_id = f"tado_ce_{coordinator.home_id}_{_meta.unique_id_suffix.format(zone_id=zone_id)}"
        self._attr_icon = _meta.icon
        self._attr_entity_category = get_entity_category(_meta)
        self._next_change = None
        self._next_temp = None
        self._overlay_expiry: str | None = None
        self._overlay_remaining: int | None = None

    @property
    def extra_state_attributes(self) -> dict[str, Any] | None:
        """Return extra state attributes."""
        attrs: dict[str, Any] = {
            "next_change": self._next_change,
            "next_temperature": self._next_temp,
        }
        if self._overlay_expiry is not None:
            attrs["overlay_expiry"] = self._overlay_expiry
        if self._overlay_remaining is not None:
            attrs["overlay_remaining_seconds"] = self._overlay_remaining
        return attrs

    @callback
    def _update_from_zone_data(self, zone_data: dict[str, Any]) -> None:
        overlay_type = zone_data.get("overlayType")
        setting = zone_data.get("setting") or {}
        power = setting.get("power")

        if power == "OFF":
            self._attr_native_value = "Off"
        elif overlay_type == "MANUAL":
            self._attr_native_value = "Manual"
        else:
            self._attr_native_value = "Schedule"

        # Extract overlay timer expiry if present
        overlay = zone_data.get("overlay") or {}
        termination = overlay.get("termination") or {}
        if termination.get("type") == "TIMER":
            self._overlay_expiry = termination.get("expiry") or termination.get("projectedExpiry")
            self._overlay_remaining = termination.get("remainingTimeInSeconds")
        else:
            self._overlay_expiry = None
            self._overlay_remaining = None

        # Next change: use overlay expiry for Timer overlays, otherwise next schedule change
        if self._overlay_expiry:
            self._next_change = self._overlay_expiry
            self._next_temp = None  # timer returns to schedule — no specific temp
        else:
            next_change = zone_data.get("nextScheduleChange")
            if next_change:
                self._next_change = next_change.get("start")
                next_setting = next_change.get("setting")
                if next_setting:
                    temp = next_setting.get("temperature")
                    self._next_temp = temp.get("celsius") if temp else None
                else:
                    self._next_temp = None
            else:
                self._next_change = None
                self._next_temp = None


class TadoHotWaterPowerSensor(TadoZoneSensor):
    """Represent a Tado hot water power state sensor."""

    _attr_has_entity_name = True

    """Hot water power sensor (ON/OFF)."""

    def __init__(
        self, coordinator: TadoDataUpdateCoordinator, zone_id: str, zone_name: str, zone_type: str = "HOT_WATER",
    ) -> None:
        """Initialize the Hot Water Power Sensor."""
        super().__init__(coordinator, zone_id, zone_name, zone_type)
        _meta = ENTITY_REGISTRY["sensor_power"]
        self._attr_translation_key = _meta.translation_key
        self._attr_unique_id = f"tado_ce_{coordinator.home_id}_{_meta.unique_id_suffix.format(zone_id=zone_id)}"
        self._attr_icon = _meta.icon
        self._attr_entity_category = get_entity_category(_meta)

    @callback
    def _update_from_zone_data(self, zone_data: dict[str, Any]) -> None:
        setting = zone_data.get("setting") or {}
        power = setting.get("power")
        self._attr_native_value = power or "Unknown"
