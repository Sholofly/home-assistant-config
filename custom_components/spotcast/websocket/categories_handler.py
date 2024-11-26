"""Websocket Endpoint for getting categories"""

import voluptuous as vol
from homeassistant.helpers import config_validation as cv
from homeassistant.core import HomeAssistant
from homeassistant.components.websocket_api import ActiveConnection

from custom_components.spotcast.utils import get_account_entry, search_account
from custom_components.spotcast.spotify.account import SpotifyAccount
from custom_components.spotcast.websocket.utils import websocket_wrapper
from custom_components.spotcast.spotify.utils import select_image_url

ENDPOINT = "spotcast/categories"
SCHEMA = vol.Schema({
    vol.Required("id"): cv.positive_int,
    vol.Required("type"): ENDPOINT,
    vol.Optional("account"): cv.string,
    vol.Optional("limit"): cv.positive_int,
})


@websocket_wrapper
async def async_get_categories(
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
    limit = msg.get("limit")
    account: SpotifyAccount

    if account_id is None:
        entry = get_account_entry(hass)
        account_id = entry.entry_id
        account = await SpotifyAccount.async_from_config_entry(hass, entry)
    else:
        account = search_account(hass, account_id)

    raw_categories = await account.async_categories(limit=limit)

    categories = []

    for data in raw_categories:

        categories.append({
            "id": data["id"],
            "icon": select_image_url(data["icons"]),
            "name": data["name"],
        })

    connection.send_result(
        msg["id"],
        {
            "total": len(categories),
            "account": account_id,
            "categories": categories
        },
    )
