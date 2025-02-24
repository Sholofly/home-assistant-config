"""Websocket Endpoint for getting devices"""

import voluptuous as vol
from homeassistant.helpers import config_validation as cv
from homeassistant.core import HomeAssistant
from homeassistant.components.websocket_api import ActiveConnection

from custom_components.spotcast.websocket.utils import (
    websocket_wrapper,
    async_get_account,
)

ENDPOINT = "spotcast/devices"
SCHEMA = vol.Schema({
    vol.Required("id"): cv.positive_int,
    vol.Required("type"): ENDPOINT,
    vol.Optional("account"): cv.string,
})


@websocket_wrapper
async def async_get_devices(
    hass: HomeAssistant,
    connection: ActiveConnection,
    msg: dict
):
    """Gets a list playlists from an account

    Args:
        - hass(HomeAssistant): the Home Assistant Instance
        - connection(ActiveConnection): the Active Websocket connection
            object
        - msg(dict): the message received through the websocket API
    """

    account_id = msg.get("account")

    account = await async_get_account(hass, account_id)

    devices = await account.async_devices(force=True)

    connection.send_result(
        msg["id"],
        {
            "total": len(devices),
            "account": account.id,
            "devices": devices
        },
    )
