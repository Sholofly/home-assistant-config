"""Tado CE config flow — device authorization."""

from __future__ import annotations

import asyncio
from http import HTTPStatus
import logging
from typing import TYPE_CHECKING, Any

from homeassistant import config_entries
from homeassistant.core import callback
from homeassistant.helpers.aiohttp_client import async_get_clientsession
import voluptuous as vol

from .config_flow_options import TadoCEOptionsFlow
from .const import (
    API_ENDPOINT_ME,
    AUTH_ENDPOINT_DEVICE,
    AUTH_ENDPOINT_TOKEN,
    CLIENT_ID,
    DATA_DIR,
    DOMAIN,
)

if TYPE_CHECKING:
    from homeassistant.config_entries import ConfigEntry, ConfigFlowResult

_LOGGER = logging.getLogger(__name__)


class TadoCEConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    """Handle a config flow for Tado CE."""

    VERSION = 12

    def __init__(self) -> None:
        """Initialize the config flow."""
        self._device_code: str | None = None
        self._user_code: str | None = None
        self._verify_url: str | None = None
        self._interval: int = 5
        self._expires_in: int = 300
        self._access_token: str | None = None
        self._refresh_token: str | None = None
        self._homes: list[dict[str, Any]] = []
        self._check_count: int = 0

    @staticmethod
    @callback
    def async_get_options_flow(config_entry: ConfigEntry) -> TadoCEOptionsFlow:
        """Get the options flow for this handler."""
        return TadoCEOptionsFlow(config_entry)

    async def async_step_user(self, user_input: dict[str, Any] | None = None) -> ConfigFlowResult:
        """Handle the initial step - show auth method menu.

        Note: unique_id is set later in _create_entry() after we know the home_id.
        This allows for multi-home support in future versions.
        """
        # Don't set unique_id here - we don't know home_id yet
        # unique_id will be set in _create_entry() as tado_ce_{home_id}
        return self.async_show_menu(
            step_id="user",
            menu_options=["device_auth", "manual_token"],
        )

    async def async_step_device_auth(self, user_input: dict[str, Any] | None = None) -> ConfigFlowResult:
        """Handle device authorization flow (standard method)."""
        errors = {}

        if user_input is not None:
            try:
                await self._request_device_code()
                # Show URL for user to click
                return await self.async_step_authorize()
            except Exception:
                _LOGGER.exception("Failed to start authorization")
                errors["base"] = "cannot_connect"

        return self.async_show_form(
            step_id="device_auth",
            data_schema=vol.Schema({}),
            errors=errors,
        )

    async def async_step_manual_token(self, user_input: dict[str, Any] | None = None) -> ConfigFlowResult:
        """Handle manual token input (fallback when device auth is broken)."""
        errors = {}

        if user_input is not None:
            refresh_token = user_input.get("refresh_token", "").strip()
            if not refresh_token:
                errors["base"] = "invalid_token"
            else:
                # Try to use the refresh token to get an access token
                session = async_get_clientsession(self.hass)
                try:
                    async with session.post(
                        AUTH_ENDPOINT_TOKEN,
                        data={
                            "client_id": CLIENT_ID,
                            "grant_type": "refresh_token",
                            "refresh_token": refresh_token,
                        },
                    ) as resp:
                        if resp.status == HTTPStatus.OK:
                            data = await resp.json()
                            self._access_token = data.get("access_token")
                            self._refresh_token = data.get("refresh_token", refresh_token)

                            if self._access_token:
                                await self._fetch_homes()
                                return await self.async_step_select_home()
                            errors["base"] = "invalid_token"
                        else:
                            _LOGGER.error("Manual token refresh failed: %s", resp.status)
                            errors["base"] = "invalid_token"
                except Exception:
                    _LOGGER.exception("Manual token validation error")
                    errors["base"] = "cannot_connect"

        return self.async_show_form(
            step_id="manual_token",
            data_schema=vol.Schema(
                {
                    vol.Required("refresh_token"): str,
                },
            ),
            errors=errors,
            description_placeholders={
                "tado_web_app": "app.tado.com",
                "tado_web_app_url": "https://app.tado.com",
            },
        )

    async def _request_device_code(self) -> None:
        """Request device code from Tado."""
        session = async_get_clientsession(self.hass)

        async with session.post(
            AUTH_ENDPOINT_DEVICE,
            data={
                "client_id": CLIENT_ID,
                "scope": "home.user offline_access",
            },
        ) as resp:
            if resp.status != HTTPStatus.OK:
                raise Exception(f"Failed to get device code: {resp.status}")

            data = await resp.json()
            self._device_code = data.get("device_code")
            self._user_code = data.get("user_code")
            self._verify_url = data.get("verification_uri_complete")
            # Workaround: Tado sometimes returns URL without /authorize path
            # See: https://github.com/hiall-fyi/tado_ce/issues/104
            if self._verify_url and "/device?" in self._verify_url and "/oauth2/" not in self._verify_url:
                self._verify_url = self._verify_url.replace(
                    "/device?",
                    "/device/authorize?",
                )
            self._interval = data.get("interval", 5)
            self._expires_in = data.get("expires_in", 300)

            if not self._device_code:
                raise Exception("No device code in response")

    async def async_step_authorize(self, user_input: dict[str, Any] | None = None) -> ConfigFlowResult:
        """Show authorization URL and wait for user to authorize."""
        errors = {}

        if user_input is not None:
            # User clicked Submit - check if they've authorized
            self._check_count += 1
            _LOGGER.debug("Checking authorization status (attempt %s)", self._check_count)

            result = await self._check_authorization()

            if result == "success":
                _LOGGER.info("Authorization successful!")
                return await self.async_step_select_home()
            if result == "pending":
                # Still waiting - show form again with hint
                errors["base"] = "auth_pending"
            elif result == "expired":
                return self.async_abort(reason="timeout")
            else:
                errors["base"] = "authorization_failed"

        return self.async_show_form(
            step_id="authorize",
            data_schema=vol.Schema({}),
            description_placeholders={
                "url": self._verify_url,  # type: ignore[dict-item]
            },
            errors=errors,
        )

    async def _check_authorization(self) -> str:
        """Check if user has completed authorization."""
        session = async_get_clientsession(self.hass)

        try:
            async with session.post(
                AUTH_ENDPOINT_TOKEN,
                data={
                    "client_id": CLIENT_ID,
                    "grant_type": "urn:ietf:params:oauth:grant-type:device_code",
                    "device_code": self._device_code,
                },
            ) as resp:
                _LOGGER.debug("Authorization check response status: %s", resp.status)

                if resp.status == HTTPStatus.OK:
                    data = await resp.json()
                    self._access_token = data.get("access_token")
                    self._refresh_token = data.get("refresh_token")

                    if self._access_token and self._refresh_token:
                        await self._fetch_homes()
                        return "success"
                    return "error"

                if resp.status == HTTPStatus.BAD_REQUEST:
                    data = await resp.json()
                    error = data.get("error", "")
                    _LOGGER.debug("Authorization check error: %s", error)

                    if error == "authorization_pending":
                        return "pending"
                    if error == "slow_down":
                        # Wait before allowing next check (RFC 8628 §3.5)
                        await asyncio.sleep(5)
                        return "pending"
                    if error == "expired_token":
                        return "expired"
                    _LOGGER.error("Authorization error: %s", error)
                    return "error"
                return "error"

        except Exception:
            _LOGGER.exception("Authorization check error")
            return "error"

    async def _fetch_homes(self) -> None:
        """Fetch available homes from Tado API."""
        session = async_get_clientsession(self.hass)

        async with session.get(
            API_ENDPOINT_ME,
            headers={"Authorization": f"Bearer {self._access_token}"},
        ) as resp:
            if resp.status != HTTPStatus.OK:
                raise Exception(f"Failed to fetch homes: {resp.status}")

            data = await resp.json()
            self._homes = data.get("homes", [])

    async def async_step_select_home(self, user_input: dict[str, Any] | None = None) -> ConfigFlowResult:
        """Handle home selection (if multiple homes)."""
        if not self._homes:
            return self.async_abort(reason="no_homes")

        if len(self._homes) == 1:
            home = self._homes[0]
            return await self._create_entry(home["id"], home.get("name", "Tado Home"))

        if user_input is not None:
            home_id = user_input["home"]
            home_name = next(
                (h.get("name", "Tado Home") for h in self._homes if str(h["id"]) == home_id),
                "Tado Home",
            )
            return await self._create_entry(home_id, home_name)

        home_options = {str(home["id"]): home.get("name", f"Home {home['id']}") for home in self._homes}

        return self.async_show_form(
            step_id="select_home",
            data_schema=vol.Schema(
                {
                    vol.Required("home"): vol.In(home_options),
                },
            ),
        )

    async def _create_entry(self, home_id: str, home_name: str) -> ConfigFlowResult:
        """Create the config entry and save credentials."""
        # Set unique_id based on home_id for multi-home support
        await self.async_set_unique_id(f"tado_ce_{home_id}")
        self._abort_if_unique_id_configured()

        config = {
            "home_id": str(home_id),
            "refresh_token": self._refresh_token,
        }

        # Use executor to avoid blocking I/O in event loop
        await self.hass.async_add_executor_job(
            self._save_config_sync,
            config,
        )

        _LOGGER.info("Saved credentials for home: %s (ID: %s)", home_name, home_id)

        return self.async_create_entry(
            title=f"Tado CE ({home_name})",
            data={
                "home_id": str(home_id),
                "refresh_token": self._refresh_token,
            },
        )

    def _save_config_sync(self, config: dict[str, Any]) -> None:
        """Save config synchronously using atomic write.

        Performs blocking file I/O — call via ``hass.async_add_executor_job()``.

        Writes to per-home config file (config_{home_id}.json) only.
        """
        from .const import get_data_file
        from .storage import save_json_sync

        home_id = config.get("home_id")

        if home_id:
            config_path = get_data_file("config", str(home_id))
        else:
            # No home_id — write to DATA_DIR/config.json as last resort
            config_path = DATA_DIR / "config.json"

        save_json_sync(config_path, config)

    # ========== Reauth Flow (HA-triggered when ConfigEntryAuthFailed) ==========

    async def async_step_reauth(self, entry_data: dict[str, Any]) -> ConfigFlowResult:
        """Handle HA-triggered reauthentication (ConfigEntryAuthFailed)."""
        return await self.async_step_reauth_confirm()

    async def async_step_reauth_confirm(self, user_input: dict[str, Any] | None = None) -> ConfigFlowResult:
        """Show reauth confirmation and start device authorization."""
        errors = {}

        if user_input is not None:
            try:
                await self._request_device_code()
                return await self.async_step_reauth_authorize()
            except Exception:
                _LOGGER.exception("Failed to start re-authorization")
                errors["base"] = "cannot_connect"

        return self.async_show_form(
            step_id="reauth_confirm",
            data_schema=vol.Schema({}),
            errors=errors,
        )

    async def async_step_reauth_authorize(self, user_input: dict[str, Any] | None = None) -> ConfigFlowResult:
        """Show authorization URL for reauth flow."""
        errors = {}

        if user_input is not None:
            self._check_count += 1
            _LOGGER.debug("Checking reauth authorization status (attempt %s)", self._check_count)

            result = await self._check_authorization()

            if result == "success":
                _LOGGER.info("Reauth authorization successful!")
                return await self._async_finish_reauth()
            if result == "pending":
                errors["base"] = "auth_pending"
            elif result == "expired":
                return self.async_abort(reason="timeout")
            else:
                errors["base"] = "authorization_failed"

        return self.async_show_form(
            step_id="reauth_authorize",
            data_schema=vol.Schema({}),
            description_placeholders={
                "url": self._verify_url,  # type: ignore[dict-item]
            },
            errors=errors,
        )

    async def _async_finish_reauth(self) -> ConfigFlowResult:
        """Save new credentials and finish reauth flow."""
        reauth_entry = self._get_reauth_entry()
        home_id = reauth_entry.data.get("home_id")

        # Save new credentials
        config = {
            "home_id": str(home_id),
            "refresh_token": self._refresh_token,
        }
        await self.hass.async_add_executor_job(self._save_config_sync, config)

        _LOGGER.info("Reauth successful, saved new credentials for home ID: %s", home_id)

        # Dismiss auth repair issue
        from .repairs import async_dismiss_auth_issue

        async_dismiss_auth_issue(self.hass, home_id)

        # Update entry data with new refresh token
        new_data = {**reauth_entry.data, "refresh_token": self._refresh_token}
        self.hass.config_entries.async_update_entry(reauth_entry, data=new_data)

        await self.hass.config_entries.async_reload(reauth_entry.entry_id)
        return self.async_abort(reason="reauth_successful")

    # ========== Reconfigure Flow (User-initiated re-authenticate) ==========

    async def async_step_reconfigure(self, user_input: dict[str, Any] | None = None) -> ConfigFlowResult:
        """Handle reconfiguration - allows re-authentication."""
        errors = {}

        if user_input is not None:
            try:
                await self._request_device_code()
                return await self.async_step_reconfigure_authorize()
            except Exception:
                _LOGGER.exception("Failed to start re-authorization")
                errors["base"] = "cannot_connect"

        return self.async_show_form(
            step_id="reconfigure",
            data_schema=vol.Schema({}),
            errors=errors,
        )

    async def async_step_reconfigure_authorize(self, user_input: dict[str, Any] | None = None) -> ConfigFlowResult:
        """Show authorization URL for reconfigure flow."""
        errors = {}

        if user_input is not None:
            self._check_count += 1
            _LOGGER.debug("Checking re-authorization status (attempt %s)", self._check_count)

            result = await self._check_authorization()

            if result == "success":
                _LOGGER.info("Re-authorization successful!")
                return await self.async_step_reconfigure_confirm()
            if result == "pending":
                errors["base"] = "auth_pending"
            elif result == "expired":
                return self.async_abort(reason="timeout")
            else:
                errors["base"] = "authorization_failed"

        return self.async_show_form(
            step_id="reconfigure_authorize",
            data_schema=vol.Schema({}),
            description_placeholders={
                "url": self._verify_url,  # type: ignore[dict-item]
            },
            errors=errors,
        )

    async def async_step_reconfigure_confirm(self, user_input: dict[str, Any] | None = None) -> ConfigFlowResult:
        """Save new credentials and finish reconfigure."""
        # Get the existing config entry
        reconfigure_entry = self._get_reconfigure_entry()
        home_id = reconfigure_entry.data.get("home_id")

        # If we have homes from the new auth, verify the home still exists
        if self._homes:
            home_exists = any(str(h["id"]) == str(home_id) for h in self._homes)
            if not home_exists:
                # Home no longer exists, let user select a new one
                return await self.async_step_reconfigure_select_home()

        # Save new credentials (mkdir handled inside _save_config_sync)
        config = {
            "home_id": str(home_id),
            "refresh_token": self._refresh_token,
        }

        # Use executor to avoid blocking I/O in event loop
        await self.hass.async_add_executor_job(
            self._save_config_sync,
            config,
        )

        _LOGGER.info("Re-authentication successful, saved new credentials for home ID: %s", home_id)

        # Dismiss auth repair issue on successful re-auth
        from .repairs import async_dismiss_auth_issue

        async_dismiss_auth_issue(self.hass, home_id)

        # Store refresh_token in entry.data for HA-standard recovery
        new_data = {**reconfigure_entry.data, "refresh_token": self._refresh_token}
        self.hass.config_entries.async_update_entry(reconfigure_entry, data=new_data)

        # Finish reconfigure - this updates the existing entry
        return self.async_abort(reason="reconfigure_successful")

    async def async_step_reconfigure_select_home(self, user_input: dict[str, Any] | None = None) -> ConfigFlowResult:
        """Handle home selection during reconfigure (if original home no longer exists)."""
        if not self._homes:
            return self.async_abort(reason="no_homes")

        if user_input is not None:
            home_id = user_input["home"]

            # Save new credentials with new home (mkdir handled inside _save_config_sync)
            config = {
                "home_id": str(home_id),
                "refresh_token": self._refresh_token,
            }

            # Use executor to avoid blocking I/O in event loop
            await self.hass.async_add_executor_job(
                self._save_config_sync,
                config,
            )

            _LOGGER.info("Re-authentication successful with new home ID: %s", home_id)

            # Store refresh_token in entry.data for HA-standard recovery
            reconfigure_entry = self._get_reconfigure_entry()
            new_data = {**reconfigure_entry.data, "home_id": str(home_id), "refresh_token": self._refresh_token}
            self.hass.config_entries.async_update_entry(reconfigure_entry, data=new_data)

            return self.async_abort(reason="reconfigure_successful")

        home_options = {str(home["id"]): home.get("name", f"Home {home['id']}") for home in self._homes}

        return self.async_show_form(
            step_id="reconfigure_select_home",
            data_schema=vol.Schema(
                {
                    vol.Required("home"): vol.In(home_options),
                },
            ),
        )

