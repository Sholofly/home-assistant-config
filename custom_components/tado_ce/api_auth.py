"""Tado CE API auth mixin — OAuth refresh-token flow with idempotent retry."""

from __future__ import annotations

import asyncio
from datetime import UTC, datetime, timedelta
from http import HTTPStatus
import logging
from typing import TYPE_CHECKING, Any, Protocol

import aiohttp

from .const import CLIENT_ID, MAX_RETRY_ATTEMPTS, TADO_AUTH_URL
from .exceptions import TadoAuthError
from .helpers import retry_delay

if TYPE_CHECKING:
    from homeassistant.config_entries import ConfigEntry
    from homeassistant.core import HomeAssistant

    from .data_loader import DataLoader

_LOGGER = logging.getLogger(__name__)

# HTTP timeout for OAuth token refresh (15s — auth endpoint should be fast)
_TOKEN_REFRESH_TIMEOUT = aiohttp.ClientTimeout(total=15)


class _AuthHost(Protocol):
    """Attribute contract the host class must satisfy for the auth mixin.

    Mixes host-provided attributes (`_session`, `_access_token`,
    `_config_entry` etc. set in `TadoApiClient.__init__`) with
    mixin-provided members (`TOKEN_CACHE_DURATION`,
    `_refresh_token`) so `self: _AuthHost` resolves on every method.
    """

    _session: aiohttp.ClientSession
    _hass: HomeAssistant | None
    _access_token: str | None
    _token_expiry: datetime | None
    _refresh_lock: asyncio.Lock
    _home_id: str | None
    _injected_refresh_token: str | None
    _data_loader: DataLoader | None
    _config_entry: ConfigEntry | None

    TOKEN_CACHE_DURATION: int

    async def _load_config(self) -> dict[str, Any]: ...
    async def _save_config(self, config: dict[str, Any]) -> None: ...
    async def _refresh_token(self) -> str | None: ...


class TadoAuthMixin:
    """OAuth refresh-token plumbing for `TadoApiClient`.

    The host class must satisfy `_AuthHost`. ConfigEntry is the
    source of truth for the refresh token; rotated tokens are
    persisted back through `async_update_entry`.
    """

    # Explicit annotation so mypy doesn't narrow from the datetime
    # assignment inside _refresh_token.
    _token_expiry: datetime | None

    # Tado access tokens are valid for ~10 minutes; we refresh at 5
    # to leave headroom for clock skew and one retry.
    TOKEN_CACHE_DURATION = 300

    @property
    def has_valid_credentials(self: _AuthHost) -> bool:
        """Return True when either a refresh token or a cached access token is on hand."""
        return bool(self._injected_refresh_token or self._access_token)

    # --- Config I/O ---

    async def _load_config(self: _AuthHost) -> dict[str, Any]:
        """Build a config dict from injected values (no file I/O — ConfigEntry is canonical)."""
        return {
            "home_id": self._home_id,
            "refresh_token": self._injected_refresh_token,
        }

    async def _save_config(self: _AuthHost, config: dict[str, Any]) -> None:
        """Persist a rotated refresh token to ConfigEntry and refresh the runtime cache.

        ConfigEntry is the sole source of truth for auth credentials.
        The DataLoader "config" cache is updated in-memory for runtime
        consumers but its Store entry is not touched — the Store only
        exists for v3.5.3 → v4.x migration bootstrap.
        """
        if self._hass and self._config_entry:
            new_data = {**self._config_entry.data, **config}
            self._hass.config_entries.async_update_entry(
                self._config_entry, data=new_data,
            )

        if self._data_loader is not None:
            self._data_loader.update_cache("config", config)

    # --- Token Management ---

    async def get_access_token(self: _AuthHost) -> str | None:
        """Return a valid access token, refreshing under lock when expired."""
        async with self._refresh_lock:
            if self._access_token and self._token_expiry:
                if datetime.now(UTC) < (self._token_expiry - timedelta(seconds=10)):
                    return self._access_token

            return await self._refresh_token()

    async def _handle_successful_token_response(
        self: _AuthHost, data: dict[str, Any], config: dict[str, Any], refresh_token: str,
    ) -> str | None:
        """Persist a rotated refresh token and cache the new access token + expiry."""
        self._access_token = data.get("access_token")
        new_refresh_token = data.get("refresh_token")

        if not self._access_token:
            _LOGGER.warning(
                "Auth: token refresh response had no access_token field — "
                "next API call will trigger another refresh attempt",
            )
            return None

        if new_refresh_token and new_refresh_token != refresh_token:
            config["refresh_token"] = new_refresh_token
            self._injected_refresh_token = new_refresh_token
            await self._save_config(config)
            _LOGGER.debug(
                "Auth: refresh token rotated by Tado — new token saved "
                "to ConfigEntry",
            )

        # RFC 6749 §5.1 — honour `expires_in` when present. Fall back
        # to TOKEN_CACHE_DURATION when missing, malformed, or
        # implausibly short (would force per-call refreshes).
        expires_in_raw = data.get("expires_in")
        try:
            expires_in = int(expires_in_raw) if expires_in_raw is not None else self.TOKEN_CACHE_DURATION
        except (ValueError, TypeError):
            expires_in = self.TOKEN_CACHE_DURATION
        if expires_in < 60:
            expires_in = self.TOKEN_CACHE_DURATION

        self._token_expiry = datetime.now(UTC) + timedelta(seconds=expires_in)
        _LOGGER.debug(
            "Auth: access token refreshed — valid for %ds",
            expires_in,
        )
        return self._access_token

    async def _attempt_token_refresh(
        self: _AuthHost,
        config: dict[str, Any],
        refresh_token: str,
        attempt: int,
    ) -> str | None:
        """Run one HTTP refresh attempt; return token on success or None on retryable 403."""
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
                return await self._handle_successful_token_response(data, config, refresh_token)  # type: ignore[attr-defined, no-any-return]

            error_text = await resp.text()

            if resp.status == HTTPStatus.UNAUTHORIZED or "invalid_grant" in error_text:
                _LOGGER.warning(
                    "Auth: refresh token rejected by Tado (HTTP %s) — "
                    "HA will request re-authentication",
                    resp.status,
                )
                # Don't null the refresh_token here — a transient 401
                # (server glitch) would otherwise permanently
                # invalidate a working token. Let HA's reauth flow
                # decide whether the user needs to re-log-in.
                raise TadoAuthError("Refresh token invalid (auth failure)")

            if resp.status == HTTPStatus.FORBIDDEN:
                if attempt < MAX_RETRY_ATTEMPTS:
                    _LOGGER.debug(
                        "Auth: refresh got HTTP 403 (likely CDN/WAF) — "
                        "retry %s/%s",
                        attempt, MAX_RETRY_ATTEMPTS,
                    )
                    return None
                _LOGGER.warning(
                    "Auth: refresh kept returning HTTP 403 after %s "
                    "attempts — Tado's CDN may be blocking us, will "
                    "retry on next poll",
                    MAX_RETRY_ATTEMPTS,
                )
                raise TadoAuthError(f"Token refresh failed after {MAX_RETRY_ATTEMPTS} attempts (403)")

            if 400 <= resp.status < 500:
                _LOGGER.warning(
                    "Auth: refresh request rejected (HTTP %s) — %s",
                    resp.status, error_text[:200],
                )
                # WHY: 4xx-non-401-non-403 means the refresh shape is wrong, not a
                # transient CDN block. Retrying won't help. Raise so coordinator
                # triggers reauth.
                raise TadoAuthError(
                    f"Token refresh rejected (HTTP {resp.status}): {error_text[:80]}",
                )
            _LOGGER.warning(
                "Auth: refresh failed with HTTP %s — %s",
                resp.status, error_text[:200],
            )
            return None

    async def _refresh_token(self: _AuthHost) -> str | None:
        """Refresh the access token, retrying transient 403 / network errors with backoff."""
        config = await self._load_config()
        refresh_token = config.get("refresh_token")

        if not refresh_token:
            _LOGGER.warning(
                "Auth: no refresh token available — re-authenticate the "
                "Tado integration in Settings → Devices & Services",
            )
            return None

        _LOGGER.debug("Auth: refreshing access token")

        for attempt in range(1, MAX_RETRY_ATTEMPTS + 1):
            try:
                result = await self._attempt_token_refresh(config, refresh_token, attempt)  # type: ignore[attr-defined]
                if result is not None:
                    return result  # type: ignore[no-any-return]
                # `None` here means a retryable 403 — fall through to
                # the backoff and try again.
            except TadoAuthError:
                raise
            except aiohttp.ClientError:
                if attempt >= MAX_RETRY_ATTEMPTS:
                    _LOGGER.warning(
                        "Auth: network error during token refresh — "
                        "exhausted %s retries, will retry on next poll",
                        MAX_RETRY_ATTEMPTS,
                        exc_info=True,
                    )
                    return None
            except Exception:
                _LOGGER.warning(
                    "Auth: unexpected error during token refresh — "
                    "will retry on next poll",
                    exc_info=True,
                )
                return None

            delay = retry_delay(attempt)
            _LOGGER.debug(
                "Auth: refresh attempt %s/%s failed — retrying in %.1fs",
                attempt, MAX_RETRY_ATTEMPTS, delay,
            )
            await asyncio.sleep(delay)

        return None
