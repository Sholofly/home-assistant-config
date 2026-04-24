"""Tado CE repairs — HA repair issue creation and dismissal."""

from __future__ import annotations

import logging
from typing import TYPE_CHECKING

from homeassistant.helpers import issue_registry as ir

from .const import DOMAIN

if TYPE_CHECKING:
    from homeassistant.core import HomeAssistant

_LOGGER = logging.getLogger(__name__)

# Issue IDs (stable identifiers for each repair type)
ISSUE_AUTH_EXPIRED = "auth_token_expired"
ISSUE_DEPRECATED_YAML = "deprecated_yaml_config"


def async_create_auth_issue(hass: HomeAssistant, home_id: str | None = None) -> None:
    """Create a repair issue for expired authentication token.

    Surfaces a persistent notification in HA UI prompting the user
    to re-authenticate via the config flow.
    """
    issue_id = f"{ISSUE_AUTH_EXPIRED}_{home_id}" if home_id else ISSUE_AUTH_EXPIRED
    ir.async_create_issue(
        hass,
        DOMAIN,
        issue_id,
        is_fixable=False,
        is_persistent=True,
        severity=ir.IssueSeverity.ERROR,
        translation_key="auth_token_expired",
        translation_placeholders={"home_id": home_id or "default"},
    )
    _LOGGER.debug("Created repair issue: %s", issue_id)


def async_dismiss_auth_issue(hass: HomeAssistant, home_id: str | None = None) -> None:
    """Dismiss the auth expired repair issue after successful re-auth."""
    issue_id = f"{ISSUE_AUTH_EXPIRED}_{home_id}" if home_id else ISSUE_AUTH_EXPIRED
    ir.async_delete_issue(hass, DOMAIN, issue_id)
    _LOGGER.debug("Dismissed repair issue: %s", issue_id)


def async_create_deprecated_config_issue(
    hass: HomeAssistant,
    deprecated_key: str,
) -> None:
    """Create a repair issue for deprecated configuration keys."""
    issue_id = f"{ISSUE_DEPRECATED_YAML}_{deprecated_key}"
    ir.async_create_issue(
        hass,
        DOMAIN,
        issue_id,
        is_fixable=False,
        is_persistent=False,
        severity=ir.IssueSeverity.WARNING,
        translation_key="deprecated_yaml_config",
        translation_placeholders={"key": deprecated_key},
    )
    _LOGGER.debug("Created repair issue for deprecated config: %s", deprecated_key)
