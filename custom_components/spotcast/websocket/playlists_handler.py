"""Websocket Endpoint for getting playlists"""

import voluptuous as vol
from homeassistant.helpers import config_validation as cv
from homeassistant.core import HomeAssistant
from homeassistant.components.websocket_api import ActiveConnection

from custom_components.spotcast.utils import fuzzy_match
from custom_components.spotcast.websocket.utils import (
    websocket_wrapper,
    async_get_account,
)

ENDPOINT = "spotcast/playlists"
SCHEMA = vol.Schema({
    vol.Required("id"): cv.positive_int,
    vol.Required("type"): ENDPOINT,
    vol.Required("category"): cv.string,
    vol.Optional("account"): cv.string,
    vol.Optional("limit"): cv.positive_int,
})


@websocket_wrapper
async def async_get_playlists(
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
    category = msg.get("category")
    limit = msg.get("limit")

    account = await async_get_account(hass, account_id)

    if category == "user":
        playlists = await account.async_playlists(max_items=limit, force=True)
        category = {"id": "user"}

    else:
        categories = await account.async_categories()
        category = fuzzy_match(categories, category, "name")

        playlists = await account.async_category_playlists(
            category["id"],
            limit
        )

    connection.send_result(
        msg["id"],
        {
            "total": len(playlists),
            "account": account.id,
            "category": category["id"],
            "playlists": playlists
        },
    )
