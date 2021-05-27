"""The ziggo_mediabox_next component."""
import logging
from .const import (
    ZIGGO_API,
    CONF_COUNTRY_CODE,
    CONF_OMIT_CHANNEL_QUALITY
)
from homeassistant.const import (
    CONF_USERNAME,
    CONF_PASSWORD
)
import homeassistant.helpers.config_validation as cv
import voluptuous as vol

from ziggonext import ZiggoNext

DOMAIN = 'ziggonext'
_LOGGER = logging.getLogger(__name__)
CONFIG_SCHEMA = vol.Schema({
    DOMAIN: vol.Schema({
        vol.Required(CONF_USERNAME): cv.string,
        vol.Required(CONF_PASSWORD): cv.string,
        vol.Optional(CONF_COUNTRY_CODE, default="nl"): cv.string,
        vol.Optional(CONF_OMIT_CHANNEL_QUALITY, default=False): cv.boolean
    })
}, extra=vol.ALLOW_EXTRA,)

def setup(hass, config):
    """Your controller/hub specific code."""
    # Data that you want to share with your platforms
    api = ZiggoNext(config[DOMAIN][CONF_USERNAME], config[DOMAIN][CONF_PASSWORD],config[DOMAIN][CONF_COUNTRY_CODE])
    api.connect()
    hass.data[DOMAIN] = {}
    hass.data[DOMAIN][ZIGGO_API] = api
    hass.data[DOMAIN][CONF_OMIT_CHANNEL_QUALITY] = config[DOMAIN][CONF_OMIT_CHANNEL_QUALITY]
    hass.helpers.discovery.load_platform('media_player', DOMAIN, {}, config)
    return True