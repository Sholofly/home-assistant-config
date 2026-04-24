"""Tado CE custom exceptions — auth errors, sync errors, API failures.

- TadoAuthError → ConfigEntryAuthFailed (triggers HA reauth flow)
- TadoSyncError → UpdateFailed (coordinator retries on next poll)

Both inherit from HomeAssistantError so they support HA's translation
framework if ever surfaced directly to users.
"""

from __future__ import annotations

from homeassistant.exceptions import HomeAssistantError


class TadoAuthError(HomeAssistantError):
    """Raised when authentication fails (e.g., invalid_grant, expired refresh token).

    The coordinator catches this and raises ConfigEntryAuthFailed,
    which triggers HA's reauth flow prompting the user to re-authenticate.
    """


class TadoSyncError(HomeAssistantError):
    """Raised when sync fails due to network/server errors (not auth-related).

    The coordinator catches this and raises UpdateFailed,
    which marks the coordinator as failed and retries on next poll.
    """


class TadoBridgeApiError(HomeAssistantError):
    """Raised when a Bridge API call fails (network, HTTP, or parse error).

    Bridge API errors are isolated from the main cloud API — they never
    trigger OAuth reauth or affect coordinator cloud data.
    """
