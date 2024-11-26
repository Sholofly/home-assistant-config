"""Module with the option flow handler for spotcast

Classes:
    - SpotcastOptionsFlowHandler
"""

from logging import getLogger
from types import MappingProxyType

import voluptuous as vol
from homeassistant.helpers import config_validation as cv
from homeassistant.config_entries import (
    OptionsFlowWithConfigEntry,
    FlowResult,
)

from custom_components.spotcast import DOMAIN
from custom_components.spotcast.utils import copy_to_dict

LOGGER = getLogger(__name__)

DEFAULT_OPTIONS = {
    "is_default": False,
    "base_refresh_rate": 30,
}


class SpotcastOptionsFlowHandler(OptionsFlowWithConfigEntry):
    """Handles option configuration via the Integration page"""

    SCHEMAS = {
        "init": vol.Schema(
            {
                vol.Required("set_default"): bool,
                vol.Required("base_refresh_rate"): cv.positive_int,
            }
        )
    }

    OPTIONS_DEFAULT = MappingProxyType({
        "is_default": False,
        "base_refresh_rate": 30,
    })

    async def async_step_init(
        self,
        user_input: dict[str] | None = None
    ) -> FlowResult:
        """Initial Step for the Option Configuration Flow"""

        options = copy_to_dict(self.config_entry.options)

        LOGGER.debug("Opening Config menu for `%s`", self.config_entry.title)

        self._options = self.OPTIONS_DEFAULT
        self._options = self.OPTIONS_DEFAULT | options

        LOGGER.debug("Options set to `%s`", self._options)

        return self.async_show_form(
            step_id="apply_options",
            data_schema=self.add_suggested_values_to_schema(
                self.SCHEMAS["init"],
                self._options,
            ),
            errors={},
        )

    def set_default_user(self) -> dict:
        """Set the current user as default for spotcast"""

        entries = self.hass.config_entries.async_entries(DOMAIN)
        old_default = None

        for entry in entries:

            is_default = entry.options["is_default"]
            options = copy_to_dict(entry.options)
            options["is_default"] = False

            if is_default:
                old_default = entry.title
                self.hass.data[DOMAIN][entry.entry_id]["account"]\
                    .is_default = False

            self.hass.config_entries.async_update_entry(
                entry,
                options=options,
            )

        LOGGER.info(
            "Switching Default Spotcast account from `%s` to `%s`",
            old_default,
            self.config_entry.title,
        )

        self._options["is_default"] = True
        self.hass.data[DOMAIN][self.config_entry.entry_id]["account"]\
            .is_default = True

    def set_base_refresh_rate(self, new_refresh_rate: int):
        """Sets the base refresh rate for the account

        Args:
            - new_refresh_rate(int): the new refresh rate to set for
                the account
        """

        if new_refresh_rate == self._options["base_refresh_rate"]:
            LOGGER.debug("Same refresh rate. Skipping")
            return

        LOGGER.info(
            "Setting spotcast entry `%s` to a base refresh rate of %d",
            self.config_entry.title,
            new_refresh_rate,
        )
        entry_id = self.config_entry.entry_id
        self.hass.data[DOMAIN][entry_id]["account"]\
            .base_refresh_rate = new_refresh_rate

        self._options["base_refresh_rate"] = new_refresh_rate

    async def async_step_apply_options(
        self,
        user_input: dict[str]
    ) -> FlowResult:
        """Step to apply the options configured"""

        if user_input["set_default"]:
            self.set_default_user()

        self.set_base_refresh_rate(user_input["base_refresh_rate"])

        self.hass.config_entries.async_update_entry(
            self.config_entry,
            options=self._options,
        )

        return self.async_abort(reason="Successfull")
