"""Pattern B service-call dispatch — used by service-call wrappers."""

from __future__ import annotations

import logging
from typing import TYPE_CHECKING, Any, NoReturn

from homeassistant.exceptions import HomeAssistantError

from .const import DOMAIN
from .exceptions import TadoAuthError, TadoRateLimitError
from .helpers import retry_after_to_minutes

if TYPE_CHECKING:
    from homeassistant.config_entries import ConfigEntry
    from homeassistant.core import HomeAssistant

_LOGGER = logging.getLogger(__name__)


def handle_background_write_error(
    exc: TadoAuthError | TadoRateLimitError,
    config_entry: ConfigEntry,
    coordinator: Any,
    hass: HomeAssistant,
    log_message: str,
) -> None:
    """Non-raising dispatch for background-controller cloud-write errors.

    The non-raising sibling of `dispatch_to_service_call`. Both the Smart
    Valve and Offset Sync controllers run fire-and-forget off the
    coordinator's post-sync loop, so they cannot raise a HomeAssistantError
    to a caller. Auth errors start reauth; rate-limit errors record the
    backoff window + repair issue (so the write path gets the same recovery
    the read path does). `log_message` is the caller's already-formatted
    warning. Both reauth and repair-issue creation are idempotent.

    `coordinator` is typed `Any` to avoid a circular import — annotating it
    as TadoDataUpdateCoordinator would import coordinator.py, which imports
    this module.
    """
    _LOGGER.warning("%s", log_message)
    if isinstance(exc, TadoAuthError):
        config_entry.async_start_reauth(hass)
    elif isinstance(exc, TadoRateLimitError):
        coordinator.record_cloud_backoff(exc.retry_after)


def dispatch_to_service_call(
    exc: TadoAuthError | TadoRateLimitError,
    config_entry: ConfigEntry,
    hass: HomeAssistant,
) -> NoReturn:
    """Pattern B canonical dispatch — always raises HomeAssistantError.

    Auth path also calls config_entry.async_start_reauth(hass) before raising;
    the call is idempotent (HA dedups active reauth flows internally).
    """
    if isinstance(exc, TadoAuthError):
        # WHY: per HA docs, ConfigEntryAuthFailed raised from service-call paths
        # does NOT trigger reauth. Must call async_start_reauth explicitly.
        config_entry.async_start_reauth(hass)
        raise HomeAssistantError(
            translation_domain=DOMAIN,
            translation_key="auth_required",
        ) from exc

    if isinstance(exc, TadoRateLimitError):
        raise HomeAssistantError(
            translation_domain=DOMAIN,
            translation_key="rate_limited",
            translation_placeholders={
                "retry_after_minutes": retry_after_to_minutes(exc.retry_after),
            },
        ) from exc

    # Unreachable per type signature, but keep a safe fallback
    raise HomeAssistantError(
        translation_domain=DOMAIN,
        translation_key="cloud_write_failed",
    ) from exc
