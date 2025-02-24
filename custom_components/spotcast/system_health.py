"""Module providing the info to system health"""

from logging import getLogger

from homeassistant.core import HomeAssistant, callback
from homeassistant.components.system_health import (
    SystemHealthRegistration,
    async_check_can_reach_url,
)

from custom_components.spotcast import __version__, DOMAIN
from custom_components.spotcast.spotify.account import SpotifyAccount
from custom_components.spotcast.sessions import (
    PublicSession,
    PrivateSession,
)

LOGGER = getLogger(__name__)


@callback
def async_register(hass: HomeAssistant, register: SystemHealthRegistration):  # pylint: disable=W0613
    """Registers the system health callbacks."""
    register.async_register_info(system_health_info)


async def system_health_info(hass: HomeAssistant) -> dict[str]:  # pylint: disable=W0613
    """Get Health info for the info page"""

    health_info = {}

    health_info["Version"] = __version__

    for entry in hass.data[DOMAIN].values():

        account: SpotifyAccount = entry["account"]
        base_key = f"{account.id[0].upper()}{account.id[1:]}"

        health_status = account.health_status

        for key, status in health_status.items():
            if status:
                health_status[key] = "healthy"
            else:
                health_status[key] = {"type": "failed", "error": "unhealthy"}

        health_info[f"{base_key} Is Default"] = account.is_default
        health_info[f"{base_key} Public Endpoint"] = \
            async_check_can_reach_url(hass, PublicSession.API_ENDPOINT)
        health_info[f"{base_key} Public Token"] = health_status["public"]
        health_info[f"{base_key} Private Endpoint"] = \
            async_check_can_reach_url(hass, PrivateSession.API_ENDPOINT)
        health_info[f"{base_key} Private Token"] = health_status[
            "private"
        ]
        health_info[f"{base_key} Product"] = account.product

    return health_info
