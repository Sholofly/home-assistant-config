"""Support for WiFi switches using Compal modem."""
import logging
import threading

import sys

from homeassistant.helpers.entity import ToggleEntity

from compal_wifi_switch import Switch, Band, Commands

from homeassistant.const import CONF_HOST, CONF_PASSWORD

_LOGGER = logging.getLogger(__name__)

DOMAIN = "compal_wifi"

CONF_PAUSE = "pause"
DEFAULT_PAUSE = 60

CONF_GUEST = "guest"
DEFAULT_GUEST = False

ATTR_RADIO = "radio"
DEFAULT_RADIO = "all"


def extract_states(status):
    states = {}
    for wifi_band in status["wifi"]:
        states[wifi_band["radio"]] = wifi_band["enabled"]
    return states


def setup_platform(hass, config, add_entities, discovery_info=None):
    """Set up the Compal WiFi devices."""

    compal_config = CompalConfig(
        config[CONF_HOST],
        config[CONF_PASSWORD],
        config.get(CONF_PAUSE, DEFAULT_PAUSE),
        config.get(CONF_GUEST, DEFAULT_GUEST),
    )

    states = extract_states(Commands.status(config[CONF_HOST], config[CONF_PASSWORD]))

    switches = [
        CompalWifiSwitch(compal_config, Band.BAND_2G, states[Band.BAND_2G.value]),
        CompalWifiSwitch(compal_config, Band.BAND_5G, states[Band.BAND_5G.value]),
    ]
    all_switches = [CompalCompositWifiSwitch(compal_config, switches)]
    all_switches.extend(switches)
    add_entities(all_switches, True)

    return True


class CompalConfig:
    def __init__(self, host, password, pause, guest):
        self.host = host
        self.password = password
        self.pause = pause
        self.guest = guest
        self.semaphore = threading.Semaphore()


class WifiSwitch:
    def set_processing_state(self, state: str):
        pass

    def config(self) -> CompalConfig:
        pass

    def internal_state(self) -> bool:
        pass


def switch_wifi(wifi_switch: WifiSwitch, state, band):
    wifi_switch.set_processing_state("on")

    def switch_wifi_blocking(
        semaphore, _host, _password, _state, _band, _guest, _pause
    ):
        semaphore.acquire()
        enable_guest = False
        if _state == Switch.ON:
            enable_guest = _guest
        try:
            Commands.switch(_host, _password, _state, _band, enable_guest, _pause)
            wifi_switch.set_processing_state("off")
        except:
            _LOGGER.error("Unexpected error:", sys.exc_info()[0])
            wifi_switch.set_processing_state("error")
        finally:
            semaphore.release()

    config = wifi_switch.config()
    threading.Thread(
        target=switch_wifi_blocking,
        args=(
            config.semaphore,
            config.host,
            config.password,
            state,
            band,
            config.guest,
            config.pause,
        ),
    ).start()


class CompalWifiSwitch(ToggleEntity, WifiSwitch):
    """Represent a Compal WiFi."""

    def __init__(self, config, radio, initial_state):
        self._config = config
        self._radio = radio
        self._name = f"wifi.{radio}"
        self._state = initial_state
        self._switch_progress = "off"

    def set_processing_state(self, state):
        self._switch_progress = state

    def config(self) -> CompalConfig:
        return self._config

    def internal_state(self) -> bool:
        return self._state

    @property
    def name(self):
        """Return the name of the switch."""
        return self._name

    @property
    def is_on(self):
        """Return the state of the entity."""
        return self._state

    def turn_on(self, **kwargs):
        """Turn the device on."""
        switch_wifi(self, Switch.ON, self._radio)
        self._state = True

    def turn_off(self, **kwargs):
        """Turn the device off."""
        switch_wifi(self, Switch.OFF, self._radio)
        self._state = False

    @property
    def device_state_attributes(self):
        """Return device specific state attributes."""
        return {"switch_progress": self._switch_progress}

    @property
    def icon(self):
        """Return the icon to use for the valve."""
        if self.is_on:
            return "mdi:wifi"
        return "mdi:wifi-off"


class CompalCompositWifiSwitch(ToggleEntity, WifiSwitch):
    """Represent a Compal WiFi."""

    def __init__(self, config, switches):
        self._config = config
        self._switches = switches
        self._name = f"wifi.{Band.ALL}"
        self._switch_progress = "off"

    def set_processing_state(self, state):
        self._switch_progress = state
        for switch in self._switches:
            switch.set_processing_state(state)

    def config(self) -> CompalConfig:
        return self._config

    def internal_state(self) -> bool:
        for switch in self._switches:
            if not switch.internal_state():
                return False
        return True

    @property
    def name(self):
        """Return the name of the switch."""
        return self._name

    @property
    def is_on(self):
        """Return the state of the entity."""
        return self.internal_state()

    def turn_on(self, **kwargs):
        """Turn the device on."""
        for switch in self._switches:
            switch._state = True
        switch_wifi(self, Switch.ON, Band.ALL)

    def turn_off(self, **kwargs):
        """Turn the device off."""
        for switch in self._switches:
            switch._state = False
        switch_wifi(self, Switch.OFF, Band.ALL)

    @property
    def device_state_attributes(self):
        """Return device specific state attributes."""
        return {"switch_progress": self._switch_progress}

    @property
    def icon(self):
        """Return the icon to use for the valve."""
        if self.internal_state():
            return "mdi:wifi"
        return "mdi:wifi-off"
