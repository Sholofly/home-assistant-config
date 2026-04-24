"""Tado CE API Auth Mixin — token management and config I/O.

Provides OAuth token refresh, config file loading/saving, and token
caching logic. Designed as a mixin class for TadoApiClient.
"""

from __future__ import annotations

import asyncio
from datetime import UTC, datetime, timedelta
from http import HTTPStatus
import logging
from typing import TYPE_CHECKING, Any, Protocol

import aiohttp
from homeassistant.exceptions import HomeAssistantError

from .const import CLIENT_ID, CONFIG_FILE, MAX_RETRY_ATTEMPTS, TADO_AUTH_URL
from .exceptions import TadoAuthError
from .helpers import retry_delay
from .storage import async_load_json, async_save_json

if TYPE_CHECKING:
    from pathlib import Path

    from homeassistant.config_entries import ConfigEntry
    from homeassistant.core import HomeAssistant

    from .data_loader import DataLoader

_LOGGER = logging.getLogger(__name__)

# HTTP timeout for OAuth token refresh (15s — auth endpoint should be fast)
_TOKEN_REFRESH_TIMEOUT = aiohttp.ClientTimeout(total=15)


class _AuthHost(Protocol):
    """Protocol describing attributes the auth mixin expects on its host class.

    Includes both host-provided attributes (from TadoApiClient.__init__)
    and mixin-provided members so ``self: _AuthHost`` resolves everywhere.
    """

    # --- Host-provided attributes ---
    _session: aiohttp.ClientSession
    _hass: HomeAssistant | None
    _access_token: str | None
    _token_expiry: datetime | None
    _refresh_lock: asyncio.Lock
    _home_id: str | None
    _injected_refresh_token: str | None
    _data_loader: DataLoader | None
    _config_entry: ConfigEntry | None

    def _get_data_file(self, base_name: str) -> Path: ...

    # --- Mixin-provided members (for cross-method calls) ---
    TOKEN_CACHE_DURATION: int

    async def _load_config(self) -> dict[str, Any]: ...
    async def _save_config(self, config: dict[str, Any]) -> None: ...
    async def _refresh_token(self) -> str | None: ...


class TadoAuthMixin:
    """Mixin providing OAuth token management and config file I/O.

    The host class must satisfy the ``_AuthHost`` protocol — i.e. provide
    ``_session``, ``_hass``, ``_home_id``, ``_get_data_file()``, etc.
    See ``_AuthHost`` for the full contract.
    """

    # Explicit type so mypy doesn't narrow from the datetime assignment in _refresh_token.
    _token_expiry: datetime | None

    # Token cache duration (5 minutes to be safe, Tado tokens valid for ~10 minutes)
    TOKEN_CACHE_DURATION = 300

    # --- Config I/O ---

    async def _load_config(self: _AuthHost) -> dict[str, Any]:
        """Load config from file using native async I/O.

        Uses per-home config file (config_{home_id}.json) when home_id is set.
        Falls back to DATA_DIR/config.json when no home_id (bootstrap only).
        If refresh_token was injected via constructor, it takes precedence.
        """
        try:
            # Use per-home config file when home_id is available
            if self._home_id:
                config_path = self._get_data_file("config")
            else:
                config_path = CONFIG_FILE

            loaded = await async_load_json(self._hass, config_path)  # type: ignore[arg-type]

            if loaded is None:
                result: dict[str, Any] = {"home_id": self._home_id, "refresh_token": None}
                # Use injected refresh_token if available
                if self._injected_refresh_token:
                    result["refresh_token"] = self._injected_refresh_token
                return result

            config: dict[str, Any] = loaded  # type: ignore[assignment]
            # Cache home_id when loading config
            if config.get("home_id"):
                self._home_id = config["home_id"]
            # Injected refresh_token takes precedence
            if self._injected_refresh_token:
                config["refresh_token"] = self._injected_refresh_token
            return config
        except (OSError, HomeAssistantError, KeyError):
            _LOGGER.exception("Failed to load config")
            result = {"home_id": self._home_id, "refresh_token": None}
            if self._injected_refresh_token:
                result["refresh_token"] = self._injected_refresh_token
            return result

    async def _save_config(self: _AuthHost, config: dict[str, Any]) -> None:
        """Save config to file atomically using native async I/O.

        Writes to per-home config file (config_{home_id}.json) when home_id
        is set. Falls back to DATA_DIR/config.json when no home_id.
        Per-home isolation prevents token rotation for one home from
        corrupting another home's config.
        """
        try:
            # Use per-home config file when home_id is available
            if self._home_id:
                config_path = self._get_data_file("config")
            else:
                config_path = CONFIG_FILE

            await async_save_json(self._hass, config_path, config)  # type: ignore[arg-type]

            # Write-through: update DataLoader cache
            if self._data_loader is not None:
                self._data_loader.update_cache("config", config)
        except (OSError, HomeAssistantError):
            _LOGGER.exception("Failed to save config")

    # --- Token Management ---

    async def get_access_token(self: _AuthHost) -> str | None:
        """Get valid access token with automatic refresh.

        Uses lock to prevent concurrent token refreshes which would
        waste API calls and potentially cause race conditions.

        Returns:
            Valid access token, or None if refresh failed.
        """
        # All token checks must be inside lock to prevent race condition
        async with self._refresh_lock:
            # Check if cached token still valid (with 10s buffer for clock skew)
            if self._access_token and self._token_expiry:
                if datetime.now(UTC) < (self._token_expiry - timedelta(seconds=10)):
                    return self._access_token

            # Token expired or missing, refresh it
            return await self._refresh_token()

    async def _handle_successful_token_response(
        self: _AuthHost, data: dict[str, Any], config: dict[str, Any], refresh_token: str,
    ) -> str | None:
        """Handle a successful token refresh response."""
        self._access_token = data.get("access_token")
        new_refresh_token = data.get("refresh_token")

        if not self._access_token:
            _LOGGER.error("No access token in response")
            return None

        # Save new refresh token if rotated
        if new_refresh_token and new_refresh_token != refresh_token:
            config["refresh_token"] = new_refresh_token
            await self._save_config(config)
            self._injected_refresh_token = new_refresh_token
            if self._hass and self._config_entry:
                new_data = {**self._config_entry.data, "refresh_token": new_refresh_token}
                self._hass.config_entries.async_update_entry(self._config_entry, data=new_data)
            _LOGGER.debug("Refresh token rotated and saved")

        self._token_expiry = datetime.now(UTC) + timedelta(seconds=self.TOKEN_CACHE_DURATION)
        _LOGGER.debug("Access token refreshed successfully")
        return self._access_token

    async def _attempt_token_refresh(
        self: _AuthHost,
        config: dict[str, Any],
        refresh_token: str,
        attempt: int,
    ) -> str | None:
        """Execute a single token refresh HTTP request.

        Returns:
            Access token on success, None on non-retryable HTTP error.

        Raises:
            TadoAuthError: On auth failure (401/invalid_grant) or exhausted 403 retries.
        """
        async with self._session.post(
            f"{TADO_AUTH_URL}/token",
            data={
                "client_id": CLIENT_ID,
                "grant_type": "refresh_token",
                "refresh_token": refresh_token,
            },
            timeout=_TOKEN_REFRESH_TIMEOUT,
        ) as resp:
            if resp.status == HTTPStatus.OK:
                data = await resp.json()
                return await self._handle_successful_token_response(data, config, refresh_token)

            error_text = await resp.text()

            # 401 / invalid_grant = real auth failure — no retry
            if resp.status == HTTPStatus.UNAUTHORIZED or "invalid_grant" in error_text:
                _LOGGER.error("Token refresh auth failure: %s - %s", resp.status, error_text)
                config["refresh_token"] = None
                await self._save_config(config)
                raise TadoAuthError("Refresh token invalid (auth failure)")

            # 403 = likely transient CDN/WAF block — retry via loop
            if resp.status == HTTPStatus.FORBIDDEN:
                if attempt < MAX_RETRY_ATTEMPTS:
                    _LOGGER.debug("Token refresh got 403, retry %s/%s", attempt, MAX_RETRY_ATTEMPTS)
                    return None  # signal caller to retry
                _LOGGER.error("Token refresh 403 after %s attempts: %s", MAX_RETRY_ATTEMPTS, error_text[:200])
                raise TadoAuthError(f"Token refresh failed after {MAX_RETRY_ATTEMPTS} attempts (403)")

            # Other HTTP errors — no retry
            _LOGGER.error("Token refresh failed: %s - %s", resp.status, error_text)
            return None

    async def _refresh_token(self: _AuthHost) -> str | None:
        """Refresh access token with retry for transient 403 and network errors.

        OAuth2 refresh token requests are idempotent — safe to retry with
        the same refresh_token. Transient errors (403 CDN/WAF block, DNS
        failures, connection timeouts) are retried; 401 / invalid_grant
        are real auth failures and never retried.
        """
        config = await self._load_config()
        refresh_token = config.get("refresh_token")

        if not refresh_token:
            _LOGGER.error("No refresh token available")
            return None

        _LOGGER.debug("Refreshing access token...")

        for attempt in range(1, MAX_RETRY_ATTEMPTS + 1):
            try:
                result = await self._attempt_token_refresh(config, refresh_token, attempt)
                if result is not None:
                    return result
                # None = transient (403), retry after backoff
            except TadoAuthError:
                raise
            except aiohttp.ClientError:
                if attempt >= MAX_RETRY_ATTEMPTS:
                    _LOGGER.exception("Network error during token refresh (exhausted %s retries)", MAX_RETRY_ATTEMPTS)
                    return None
            except Exception:
                _LOGGER.exception("Unexpected error during token refresh")
                return None

            # Backoff before next attempt (403 or network error)
            delay = retry_delay(attempt)
            _LOGGER.warning("Token refresh failed (attempt %s/%s), retrying in %.1fs", attempt, MAX_RETRY_ATTEMPTS, delay)
            await asyncio.sleep(delay)

        return None  # unreachable but satisfies type checker
