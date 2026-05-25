"""Tado CE storage primitives — atomic JSON I/O and JSON → HA Store migration helper.

Sync / async wrappers around HA's `save_json` / `load_json` so
the rest of the codebase doesn't repeat the executor plumbing,
plus `async_migrate_json_to_store` for the v3.5.3 → v4.x file
→ Store migration shared by DataLoader, HeatingCycleStorage,
InsightHistoryTracker, and StateRestoreManager.
"""

from __future__ import annotations

import logging
from pathlib import Path
from typing import TYPE_CHECKING, Any

from homeassistant.helpers.json import save_json as ha_save_json
from homeassistant.helpers.storage import Store
from homeassistant.util.json import load_json as ha_load_json

if TYPE_CHECKING:
    from homeassistant.core import HomeAssistant

_LOGGER = logging.getLogger(__name__)

_MISSING = object()
"""Sentinel for distinguishing 'file not found' from 'file returned None'."""


def save_json_sync(file_path: Path, data: dict[str, Any] | list[Any]) -> None:
    """Atomically write JSON to disk — call from executor or sync context only."""
    file_path.parent.mkdir(parents=True, exist_ok=True)
    ha_save_json(str(file_path), data)


def load_json_sync(file_path: Path) -> dict[str, Any] | list[Any] | None:
    """Read JSON from disk — `None` when the file is missing."""
    result = ha_load_json(str(file_path), default=_MISSING)  # type: ignore[arg-type]
    if result is _MISSING:
        return None
    return result  # type: ignore[return-value]


async def async_save_json(
    hass: HomeAssistant,
    file_path: Path,
    data: dict[str, Any] | list[Any],
) -> None:
    """Async wrapper around `save_json_sync` (runs in executor)."""
    await hass.async_add_executor_job(save_json_sync, file_path, data)


async def async_load_json(
    hass: HomeAssistant,
    file_path: Path,
) -> dict[str, Any] | list[Any] | None:
    """Async wrapper around `load_json_sync` (runs in executor)."""
    return await hass.async_add_executor_job(load_json_sync, file_path)


async def async_migrate_json_to_store(
    hass: HomeAssistant,
    old_path: Path,
    store: Store[Any],
    *,
    label: str = "",
) -> dict[str, Any] | list[Any] | None:
    """Move legacy JSON-on-disk into an HA Store; rename the old file to `.json.migrated`.

    Returns the migrated data on success; `None` when there's
    no legacy file to migrate. The rename keeps the old file
    around as evidence in case a debug session needs to compare.
    """
    exists = await hass.async_add_executor_job(old_path.exists)
    if not exists:
        _LOGGER.debug(
            "Storage: JSON → Store migration skipped — %s not "
            "present on disk",
            label or old_path.stem,
        )
        return None

    old_data = await hass.async_add_executor_job(load_json_sync, old_path)
    if old_data is None:
        _LOGGER.debug(
            "Storage: JSON → Store migration skipped — %s loaded "
            "as None (empty / unreadable)",
            label or old_path.stem,
        )
        return None

    await store.async_save(old_data)

    migrated_path = old_path.with_suffix(".json.migrated")
    await hass.async_add_executor_job(old_path.rename, migrated_path)
    _LOGGER.info(
        "Storage: migrated %s → Store, legacy file renamed to %s",
        label or old_path.stem,
        migrated_path,
    )
    return old_data
