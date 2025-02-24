"""Module for the DeviceManager that takes care of managing new
devices and unavailable ones

Classes:
    - DeviceManager
"""

from logging import getLogger

from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.helpers.device_registry import async_get as async_get_dr

from custom_components.spotcast.media_player import (
    SpotifyDevice,
)
from custom_components.spotcast.sessions.retry_supervisor import (
    RetrySupervisor
)
from custom_components.spotcast.spotify import SpotifyAccount


LOGGER = getLogger(__name__)


class DeviceManager:
    """Entity that manages Spotify Devices as they become available
    and drop from the device list

    Attributes:
        tracked_devices(dict[str, SpotifyDevice]): A dictionary of
            all the currently tracked devices for the account. The Key
            being the id of the device

    Constants:
        IGNORE_DEVICE_TYPES(tuple[str]): A list of device type to
            ignore when creating new media_players

    Methods:
        async_update
    """
    IGNORE_DEVICE_TYPES = (
        "CastAudio",
    )

    DELETE_ON_UNAVAILABLE = (
        "Web Player",
        "Echo Speaker",
    )

    def __init__(
        self,
        account: SpotifyAccount,
        async_add_entitites: AddEntitiesCallback,
    ):

        self.tracked_devices: dict[str, SpotifyDevice] = {}
        self.unavailable_devices: dict[str, SpotifyDevice] = {}

        self._account = account
        self.async_add_entities = async_add_entitites
        self.supervisor = RetrySupervisor()

    async def async_update(self, _=None):

        if not self.supervisor.is_ready:
            return

        try:
            current_devices = await self._account.async_devices()
            self.supervisor._is_healthy = True
            await self.async_manage_devices(current_devices)
        except self.supervisor.SUPERVISED_EXCEPTIONS as exc:
            self.supervisor._is_healthy = False
            self.supervisor.log_message(exc)

    async def async_manage_devices(self, current_devices: dict):
        current_devices = {x["id"]: x for x in current_devices}
        remove = []

        # remove no longer available devices first
        for id, device in self.tracked_devices.items():
            if id not in current_devices:
                LOGGER.info(
                    "Marking device `%s` unavailable for account `%s`",
                    device.name,
                    self._account.name
                )
                remove.append(id)
                entity = self.tracked_devices[id]
                entity.is_unavailable = True

        for id in remove:

            device = self.tracked_devices.pop(id)

            if device.device_data["type"] in self.DELETE_ON_UNAVAILABLE:
                device.async_remove(force_remove=True)
                self.remove_device(device.device_info["identifiers"])
            else:
                self.unavailable_devices[id] = device

        for id, device in current_devices.items():

            device["type"] = self.clean_device_type(device)

            if device["type"] in self.IGNORE_DEVICE_TYPES:
                LOGGER.debug(
                    "Ignoring player `%s` of type `%s`",
                    device["name"],
                    device["type"],
                )
                continue

            if (
                id not in self.tracked_devices
                and id in self.unavailable_devices
            ):
                LOGGER.info(
                    "Device `%s` has became available again for account `%s`",
                    device["name"],
                    self._account.name,
                )
                self.tracked_devices[id] = self.unavailable_devices.pop(id)
                self.tracked_devices[id].is_unavailable = False

            elif (
                id not in self.tracked_devices
                and id not in self.unavailable_devices
            ):
                LOGGER.info(
                    "Adding New Device `%s` for account `%s`",
                    device["name"],
                    self._account.name,
                )
                new_device = SpotifyDevice(self._account, device)
                self.tracked_devices[id] = new_device
                self.async_add_entities([new_device])

        playback_state = await self._account.async_playback_state()
        playing_id = None

        if "device" in playback_state:
            playing_id = playback_state["device"]["id"]

        for id, device in self.tracked_devices.items():
            LOGGER.debug("Updating device info for `%s`", device.name)
            device.device_data = current_devices[id]

            if device.id == playing_id:
                LOGGER.debug("Feeding playback state to `%s`", device.name)
                device.playback_state = playback_state
            else:
                device.playback_state = {}

    def remove_device(
            self,
            identifiers: set[tuple[str, str]]
    ):
        """Removes a device from the device registry"""

        device_registry = async_get_dr(self._account.hass)
        device_entry = device_registry.async_get_device(identifiers)

        if device_entry is None:
            raise KeyError(f"No device found for identifiers `{identifiers}`")

        device_registry.async_remove_device(device_entry.id)
        LOGGER.info("Removed Device `%s`. No Longer reported", device_entry.id)

    @staticmethod
    def clean_device_type(device: dict) -> str:
        """Returns a clean device type based on the device data from
        Spotify. Used to identify more specific device types requiring
        special handling"""

        device_type: str = device["type"]

        if device["name"].startswith("Web Player"):
            return "Web Player"

        if device["id"][-7:-1] == "_amzn_":
            return "Echo Speaker"

        # return the device type back if no special case found
        return device_type
