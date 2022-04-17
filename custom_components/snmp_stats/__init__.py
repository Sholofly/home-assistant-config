"""The snmp_stats integration."""
from .const import *
import json
import voluptuous as vol
from homeassistant.helpers import config_validation as cv
from homeassistant.helpers.entity import Entity
from homeassistant.const import (
    CONF_PASSWORD,
    CONF_USERNAME,
    CONF_IP_ADDRESS,
    CONF_SCAN_INTERVAL
)



async def async_setup(hass, config):
    hass.data.setdefault(DOMAIN, {})
    """Set up a skeleton component."""
    return True

async def async_setup_entry(hass, config_entry):

    LOGGER.info("setup_entry: "+json.dumps(dict(config_entry.data)))
    
    hass.async_add_job(hass.config_entries.async_forward_entry_setup(config_entry, "sensor"))
    config_entry.add_update_listener(update_listener)

    return True

async def update_listener(hass, entry):
    LOGGER.info("Update listener"+json.dumps(dict(entry.options)))
    hass.data[DOMAIN][entry.entry_id]["monitor"].updateIntervalSeconds=entry.options.get(CONF_SCAN_INTERVAL)

