"""Module containing sessions managers for different usecases

Classes:
    - PrivateSession
    - PublicSession
    - ConnectionSession

Functions:
    - async_get_config_entry_implementation
"""

from custom_components.spotcast.sessions.private_session import PrivateSession
from custom_components.spotcast.sessions.public_session import (
    PublicSession,
    async_get_config_entry_implementation,
)
from custom_components.spotcast.sessions.connection_session import (
    ConnectionSession,
)

from custom_components.spotcast.sessions.desktop_session import (
    DesktopSession,
)

__all__ = [
    "PublicSession",
    "DesktopSession",
    "PrivateSession",
    "ConnectionSession",
    "async_get_config_entry_implementation",
]
