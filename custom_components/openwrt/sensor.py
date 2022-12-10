from __future__ import annotations

from homeassistant.config_entries import ConfigEntry
from homeassistant.components.sensor import SensorEntity
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity import EntityCategory


import logging

from . import OpenWrtEntity
from .constants import DOMAIN

_LOGGER = logging.getLogger(__name__)


async def async_setup_entry(
    hass: HomeAssistant,
    entry: ConfigEntry,
    async_add_entities
) -> None:

    entities = []
    data = entry.as_dict()
    device = hass.data[DOMAIN]['devices'][entry.entry_id]
    device_id = data['data']['id']

    wireless = []
    for net_id in device.coordinator.data['wireless']:
        sensor = WirelessClientsSensor(device, device_id, net_id)
        wireless.append(sensor)
        entities.append(sensor)
    if len(wireless) > 0:
        entities.append(WirelessTotalClientsSensor(
            device, device_id, wireless))
    for net_id in device.coordinator.data['mesh']:
        entities.append(
            MeshSignalSensor(device, device_id, net_id)
        )
        entities.append(
            MeshPeersSensor(device, device_id, net_id)
        )
    for net_id in device.coordinator.data["mwan3"]:
        entities.append(
            Mwan3OnlineSensor(device, device_id, net_id)
        )
    for net_id in device.coordinator.data["wan"]:
        entities.append(
            WanRxTxSensor(device, device_id, net_id, "rx")
        )
        entities.append(
            WanRxTxSensor(device, device_id, net_id, "tx")
        )
    async_add_entities(entities)
    return True


class OpenWrtSensor(OpenWrtEntity, SensorEntity):
    def __init__(self, coordinator, device: str):
        super().__init__(coordinator, device)

    @property
    def state_class(self):
        return 'measurement'


class WirelessClientsSensor(OpenWrtSensor):

    def __init__(self, device, device_id: str, interface: str):
        super().__init__(device, device_id)
        self._interface_id = interface

    @property
    def unique_id(self):
        return "%s.%s.clients" % (super().unique_id, self._interface_id)

    @property
    def name(self):
        return "%s Wireless [%s] clients" % (super().name, self._interface_id)

    @property
    def state(self):
        return self.data['wireless'][self._interface_id]['clients']

    @property
    def icon(self):
        return 'mdi:wifi-off' if self.state == 0 else 'mdi:wifi'

    @property
    def extra_state_attributes(self):
        result = dict()
        data = self.data['wireless'][self._interface_id]
        for key, value in data.get("macs", {}).items():
            signal = value.get("signal", 0)
            result[key.upper()] = f"{signal} dBm"
        return result

    @property
    def entity_category(self):
        return EntityCategory.DIAGNOSTIC


class MeshSignalSensor(OpenWrtSensor):

    def __init__(self, device, device_id: str, interface: str):
        super().__init__(device, device_id)
        self._interface_id = interface

    @property
    def unique_id(self):
        return "%s.%s.mesh_signal" % (super().unique_id, self._interface_id)

    @property
    def name(self):
        return f"{super().name} Mesh [{self._interface_id}] signal"

    @property
    def state(self):
        value = self.data['mesh'][self._interface_id]['signal']
        return f"{value} dBm"

    @property
    def device_class(self):
        return 'signal_strength'

    @property
    def signal_strength(self):
        value = self.data['mesh'][self._interface_id]['signal']
        levels = [-50, -60, -67, -70, -80]
        for idx, level in enumerate(levels):
            if value >= level:
                return idx
        return len(levels)

    @property
    def icon(self):
        icons = ['mdi:network-strength-4', 'mdi:network-strength-3', 'mdi:network-strength-2',
                 'mdi:network-strength-1', 'mdi:network-strength-outline', 'mdi:network-strength-off-outline']
        return icons[self.signal_strength]

    @property
    def entity_category(self):
        return EntityCategory.DIAGNOSTIC


class MeshPeersSensor(OpenWrtSensor):

    def __init__(self, device, device_id: str, interface: str):
        super().__init__(device, device_id)
        self._interface_id = interface

    @property
    def unique_id(self):
        return "%s.%s.mesh_peers" % (super().unique_id, self._interface_id)

    @property
    def name(self):
        return f"{super().name} Mesh [{self._interface_id}] peers"

    @property
    def state(self):
        peers = self.data["mesh"][self._interface_id]["peers"]
        return len(list(filter(lambda x: x["active"], peers.values())))

    @property
    def icon(self):
        return 'mdi:server-network' if self.state > 0 else 'mdi:server-network-off'

    @property
    def extra_state_attributes(self):
        result = dict()
        data = self.data["mesh"][self._interface_id]
        for key, value in data.get("peers", {}).items():
            signal = value.get("signal", 0)
            result[key.upper()] = f"{signal} dBm"
        return result

    @property
    def entity_category(self):
        return EntityCategory.DIAGNOSTIC


class WirelessTotalClientsSensor(OpenWrtSensor):

    def __init__(self, device, device_id: str, sensors):
        super().__init__(device, device_id)
        self._sensors = sensors

    @property
    def unique_id(self):
        return "%s.total_clients" % (super().unique_id)

    @property
    def name(self):
        return "%s Wireless total clients" % (super().name)

    @property
    def state(self):
        total = 0
        for item in self._sensors:
            total += item.state
        return total

    @property
    def icon(self):
        return 'mdi:wifi-off' if self.state == 0 else 'mdi:wifi'


class Mwan3OnlineSensor(OpenWrtSensor):

    def __init__(self, device, device_id: str, interface: str):
        super().__init__(device, device_id)
        self._interface_id = interface
        self._attr_native_unit_of_measurement = "%"
        self._attr_icon = "mdi:router-network"
        self._attr_entity_category = EntityCategory.DIAGNOSTIC

    @property
    def available(self):
        return self._interface_id in self.data["mwan3"]

    @property
    def unique_id(self):
        return "%s.%s.mwan3_online_ratio" % (super().unique_id, self._interface_id)

    @property
    def name(self):
        return f"{super().name} Mwan3 [{self._interface_id}] online ratio"

    @property
    def native_value(self):
        data = self.data["mwan3"].get(self._interface_id, {})
        value = data.get("online_sec") / data.get("uptime_sec") * \
            100 if data.get("uptime_sec") else 100
        return round(value, 1)


class WanRxTxSensor(OpenWrtSensor):

    def __init__(self, device, device_id: str, interface: str, code: str):
        super().__init__(device, device_id)
        self._interface = interface
        self._code = code
        self._attr_entity_category = EntityCategory.DIAGNOSTIC
        self._attr_icon = "mdi:download-network" if code == "rx" else "mdi:upload-network"
        self._attr_native_unit_of_measurement = "bytes"

    @property 
    def _data(self):
        return self.data["wan"].get(self._interface) 

    @property
    def available(self):
        return self._interface in self.data["wan"] and self._data.get("up")

    @property
    def unique_id(self):
        return "%s.%s.wan_%s_bytes" % (super().unique_id, self._interface, self._code)

    @property
    def name(self):
        return f"{super().name} Wan [{self._interface}] {self._code.capitalize()} bytes"

    @property
    def native_value(self):
        return self._data.get(f"{self._code}_bytes")

    @property
    def extra_state_attributes(self):
        return dict(mac=self._data.get("macaddr"), speed=self._data.get("speed"))

    @property
    def state_class(self):
        return "total_increasing"
