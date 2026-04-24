"""Tado CE Bridge Number — boiler max output temperature control.

Provides a NumberEntity for setting the boiler max output temperature
via the Bridge API. Range 25-80°C with 0.5°C step. Uses optimistic
update: value reflects the set value immediately, then syncs with
the server on the next coordinator poll.
"""

from __future__ import annotations

import logging
from typing import TYPE_CHECKING

from homeassistant.components.number import NumberDeviceClass, NumberEntity
from homeassistant.const import UnitOfTemperature
from homeassistant.core import callback
from homeassistant.exceptions import HomeAssistantError
from homeassistant.helpers.update_coordinator import CoordinatorEntity

from .bridge_api import FLOW_TEMP_STEP, MAX_FLOW_TEMP, MIN_FLOW_TEMP
from .device_manager import get_hub_device_info
from .entity_registry import ENTITY_REGISTRY, get_entity_category
from .exceptions import TadoBridgeApiError

if TYPE_CHECKING:
    from .coordinator import TadoDataUpdateCoordinator

_LOGGER = logging.getLogger(__name__)


class TadoBoilerMaxOutputTemperatureNumber(
    CoordinatorEntity["TadoDataUpdateCoordinator"],
    NumberEntity,
):
    """Number entity for controlling boiler max output temperature."""

    _attr_has_entity_name = True
    _attr_native_min_value = MIN_FLOW_TEMP
    _attr_native_max_value = MAX_FLOW_TEMP
    _attr_native_step = FLOW_TEMP_STEP
    _attr_native_unit_of_measurement = UnitOfTemperature.CELSIUS
    _attr_device_class = NumberDeviceClass.TEMPERATURE
    _attr_icon = "mdi:thermometer-water"

    def __init__(self, coordinator: TadoDataUpdateCoordinator) -> None:
        """Initialize the TadoBoilerMaxOutputTemperatureNumber."""
        super().__init__(coordinator)
        _meta = ENTITY_REGISTRY["number_boiler_max_output_temperature"]
        self._attr_translation_key = _meta.translation_key
        self._attr_unique_id = f"tado_ce_{coordinator.home_id}_{_meta.unique_id_suffix}"
        if _meta.icon:
            self._attr_icon = _meta.icon
        self._attr_entity_category = get_entity_category(_meta)
        self._attr_device_info = get_hub_device_info(coordinator.home_id)
        self._attr_available = False
        self._attr_native_value: float | None = None

    async def async_set_native_value(self, value: float) -> None:
        """Set boiler max output temperature via Bridge API.

        Uses optimistic update: sets _attr_native_value immediately on
        success. The next coordinator poll will confirm or correct the
        value (server is source of truth).
        """
        client = self.coordinator.bridge_api_client
        if client is None:
            msg = "Bridge API client not available"
            raise HomeAssistantError(msg)
        try:
            await client.async_set_max_output_temperature(value)
        except TadoBridgeApiError as err:
            _LOGGER.exception("Failed to set boiler max output temperature")
            msg = "Failed to set boiler max output temperature"
            raise HomeAssistantError(msg) from err
        # Optimistic update — reflect new value immediately
        self._attr_native_value = round(value * 2) / 2
        self.async_write_ha_state()

    @callback
    def _handle_coordinator_update(self) -> None:
        """Handle coordinator data update."""
        bridge = self.coordinator.data.get("bridge")
        _LOGGER.debug("Number entity update - bridge data: %s", bridge)
        if not bridge:
            _LOGGER.debug("Number entity update - no bridge data available")
            self._attr_available = False
            self.async_write_ha_state()
            return
        temp = bridge.get("boilerMaxOutputTemperatureInCelsius")
        _LOGGER.debug("Number entity update - boilerMaxOutputTemperatureInCelsius: %s", temp)
        if temp is not None:
            self._attr_native_value = float(temp)
            self._attr_available = True
            _LOGGER.debug("Number entity update - successfully set value to %s°C", float(temp))
        else:
            _LOGGER.debug("Number entity update - boilerMaxOutputTemperatureInCelsius field missing")
            self._attr_available = False
        self.async_write_ha_state()
