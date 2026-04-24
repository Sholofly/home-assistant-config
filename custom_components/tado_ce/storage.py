"""Tado CE storage — atomic JSON persistence primitives.

Thin wrappers around Home Assistant's native JSON helpers
(``homeassistant.helpers.json.save_json`` / ``homeassistant.util.json.load_json``)
that accept :class:`~pathlib.Path` objects, auto-create parent directories,
and normalise file-not-found to ``None``.
"""

from __future__ import annotations

import logging
from pathlib import Path
from typing import TYPE_CHECKING, Any

from homeassistant.helpers.json import save_json as ha_save_json
from homeassistant.util.json import load_json as ha_load_json

if TYPE_CHECKING:
    from homeassistant.core import HomeAssistant

_LOGGER = logging.getLogger(__name__)

_MISSING = object()
"""Sentinel for distinguishing 'file not found' from 'file returned None'."""


def save_json_sync(file_path: Path, data: dict[str, Any] | list[Any]) -> None:
    """Save data to JSON file atomically (sync — call from executor or sync context).

    Delegates to :func:`homeassistant.helpers.json.save_json` which uses
    ``write_utf8_file`` (tempfile + ``os.replace``).

    Args:
        file_path: Target file path.
        data: JSON-serializable dict or list.

    Raises:
        HomeAssistantError: If serialisation or file I/O fails.

    """
    file_path.parent.mkdir(parents=True, exist_ok=True)
    ha_save_json(str(file_path), data)


def load_json_sync(file_path: Path) -> dict[str, Any] | list[Any] | None:
    """Load and deserialise a JSON file (sync — call from executor or sync context).

    Delegates to :func:`homeassistant.util.json.load_json`.

    Args:
        file_path: Path to JSON file.

    Returns:
        Parsed data, or ``None`` if file does not exist.

    Raises:
        HomeAssistantError: If file contains invalid JSON or I/O fails.

    """
    result = ha_load_json(str(file_path), default=_MISSING)  # type: ignore[arg-type]
    if result is _MISSING:
        return None
    return result  # type: ignore[return-value]


async def async_save_json(
    hass: HomeAssistant,
    file_path: Path,
    data: dict[str, Any] | list[Any],
) -> None:
    """Save data to JSON file atomically via executor.

    Args:
        hass: Home Assistant instance.
        file_path: Target file path.
        data: JSON-serializable dict or list.

    Raises:
        HomeAssistantError: If serialisation or file I/O fails.

    """
    await hass.async_add_executor_job(save_json_sync, file_path, data)


async def async_load_json(
    hass: HomeAssistant,
    file_path: Path,
) -> dict[str, Any] | list[Any] | None:
    """Load and deserialise a JSON file via executor.

    Args:
        hass: Home Assistant instance.
        file_path: Path to JSON file.

    Returns:
        Parsed data, or ``None`` if file does not exist.

    Raises:
        HomeAssistantError: If file contains invalid JSON or I/O fails.

    """
    return await hass.async_add_executor_job(load_json_sync, file_path)
