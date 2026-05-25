"""Tado CE config-entry version migration + duplicate cleanup + entity-platform moves.

v4.0.0's minimum supported upgrade path is config-entry
version 11 (i.e. v3.0.0 onwards) — older entries fail
migration and tell the user to step through v3.x first.
"""

from __future__ import annotations

import logging
from typing import TYPE_CHECKING, Any

from .const import DOMAIN

if TYPE_CHECKING:
    from homeassistant.config_entries import ConfigEntry
    from homeassistant.core import HomeAssistant

_LOGGER = logging.getLogger(__name__)

# Migration version constants
_MIN_SUPPORTED_VERSION = 11  # versions below this are too old to migrate
_V11_VERSION = 11  # config entry version that needs v11→v12 migration

# Module-level set to track duplicate cleanup operations (prevents re-running)
_duplicate_cleanup_done: set[str] = set()


async def async_migrate_config_json(
    hass: HomeAssistant,
    config_entry: ConfigEntry,
) -> None:
    """One-time move of `config_{home_id}.json` settings into `config_entry.options`.

    Existing options on the entry win on conflict so the user
    can't lose hand-edited settings to the file's stale values.
    """
    from .const import get_data_file
    from .storage import async_load_json

    home_id = config_entry.data.get("home_id")
    config_path = get_data_file("config", home_id)
    _LOGGER.debug(
        "Migration: checking for legacy config JSON at %s",
        config_path,
    )

    path_exists = await hass.async_add_executor_job(config_path.exists)
    if not path_exists:
        _LOGGER.debug(
            "Migration: legacy config JSON not present — nothing to "
            "migrate",
        )
        return

    json_data = await async_load_json(hass, config_path)
    if json_data is None or not isinstance(json_data, dict):
        _LOGGER.warning(
            "Migration: legacy config JSON %s could not be parsed — "
            "skipping migration, options left untouched",
            config_path,
        )
        return

    # Strip secrets / identifiers — those live in entry.data,
    # not entry.options.
    json_data.pop("refresh_token", None)
    json_data.pop("home_id", None)

    # Existing options win over file values: a hand-edited
    # entry option takes precedence over a stale JSON value.
    merged: dict[str, Any] = {**json_data, **dict(config_entry.options)}

    hass.config_entries.async_update_entry(config_entry, options=merged)
    _LOGGER.info(
        "Migration: merged %d key(s) from legacy config JSON into "
        "config entry options",
        len(json_data),
    )

    await hass.async_add_executor_job(config_path.unlink, True)
    _LOGGER.info(
        "Migration: removed legacy config JSON file at %s",
        config_path,
    )


async def async_migrate_entry(hass: HomeAssistant, config_entry: ConfigEntry) -> bool:
    """Step a config entry forward to the current schema version.

    v11 → v12 is the only live step (older paths require an
    intermediate v3.x install). A `None` version is treated as
    a recovery from a previously-aborted migration — we snap
    forward and let the entry resume.
    """
    target_version = 12
    initial_version = config_entry.version

    if initial_version is None:
        _LOGGER.warning(
            "Migration: config entry version was None (likely from "
            "a previously aborted migration) — snapping forward to "
            "version %s so the entry can resume",
            target_version,
        )
        hass.config_entries.async_update_entry(config_entry, version=target_version)
        return True

    if initial_version < _MIN_SUPPORTED_VERSION:
        _LOGGER.error(
            "Migration: config entry version %s is below the v4.0.0 "
            "minimum (11) — please install v3.x first, run it once, "
            "then upgrade to v4.0.0",
            initial_version,
        )
        return False

    if initial_version == _V11_VERSION:
        _LOGGER.info("Migration: starting v11 → v12 upgrade")
        await async_migrate_config_json(hass, config_entry)
        hass.config_entries.async_update_entry(config_entry, version=12)
        _LOGGER.info("Migration: v11 → v12 complete")

    _LOGGER.debug(
        "Migration: config entry already at version %s — no further "
        "migration needed",
        config_entry.version,
    )
    return True


async def async_deduplicate_entries(
    hass: HomeAssistant,
    entry: ConfigEntry,
) -> bool:
    """Drop duplicate entries that share a unique_id, keeping the highest version.

    Returns True when the *current* entry is the keeper (or is
    the only entry for its unique_id) so setup can continue;
    False when this entry is the duplicate and should abort.
    Multi-home users with different unique_ids per home keep
    all their entries.
    """
    from collections import defaultdict

    all_entries = hass.config_entries.async_entries(DOMAIN)

    # Group entries by unique_id
    entries_by_uid: dict[str | None, list[Any]] = defaultdict(list)
    for e in all_entries:
        entries_by_uid[e.unique_id].append(e)

    # Find the group that THIS entry belongs to
    my_group = entries_by_uid.get(entry.unique_id, [entry])

    if len(my_group) > 1:
        _LOGGER.warning(
            "Migration: %d config entries share unique_id %r — "
            "running duplicate cleanup",
            len(my_group),
            entry.unique_id,
        )
        _LOGGER.debug(
            "Migration: entries in duplicate group — %s",
            [(e.entry_id, e.version) for e in my_group],
        )

        # Highest version wins; ties resolved by entry_id for
        # deterministic behaviour across HA restarts.
        entries_by_version = sorted(
            my_group,
            key=lambda e: (getattr(e, "version", 0), e.entry_id),
            reverse=True,
        )

        keeper_entry_id = entries_by_version[0].entry_id
        _LOGGER.info(
            "Migration: keeping config entry %s as the canonical "
            "entry for unique_id %r",
            keeper_entry_id, entry.unique_id,
        )

        if entry.entry_id != keeper_entry_id:
            _LOGGER.warning(
                "Migration: aborting setup of entry %s (version %s) "
                "— it is a duplicate of unique_id %r and will be "
                "removed by the keeper entry",
                entry.entry_id,
                entry.version,
                entry.unique_id,
            )
            return False

        cleanup_key = f"duplicate_cleanup_{keeper_entry_id}"
        if cleanup_key not in _duplicate_cleanup_done:
            _duplicate_cleanup_done.add(cleanup_key)

            _LOGGER.info(
                "Migration: keeper entry %s removing %d duplicate "
                "entries for unique_id %r",
                keeper_entry_id,
                len(entries_by_version) - 1,
                entry.unique_id,
            )

            for old_entry in entries_by_version[1:]:
                _LOGGER.warning(
                    "Migration: removing duplicate entry %s "
                    "(version %s, unique_id %r)",
                    old_entry.entry_id,
                    getattr(old_entry, "version", "unknown"),
                    old_entry.unique_id,
                )
                try:
                    await hass.config_entries.async_remove(old_entry.entry_id)
                    _LOGGER.info(
                        "Migration: removed duplicate entry %s",
                        old_entry.entry_id,
                    )
                except Exception:
                    _LOGGER.warning(
                        "Migration: could not remove duplicate "
                        "entry %s — leaving it in place, will retry "
                        "on the next reload",
                        old_entry.entry_id,
                        exc_info=True,
                    )

            _LOGGER.info(
                "Migration: duplicate cleanup complete for "
                "unique_id %r — keeper is %s",
                entry.unique_id,
                keeper_entry_id,
            )
    elif len(all_entries) > 1:
        _LOGGER.debug(
            "Migration: %d Tado CE entries with %d distinct "
            "unique_ids — multi-home setup, no duplicates",
            len(all_entries),
            len(entries_by_uid),
        )

    return True


async def async_migrate_entity_platforms(
    hass: HomeAssistant,
    entry: ConfigEntry,
) -> None:
    """Drop legacy `sensor.*` connection / hot-water power entities so the binary platform recreates them.

    HA can't change an entity's platform in place; removing the
    old `sensor.*` registry entries lets the binary_sensor
    platform create them fresh with the right device class
    (CONNECTIVITY / POWER).
    """
    from homeassistant.helpers import entity_registry as er

    registry = er.async_get(hass)
    removed = 0

    for entity_entry in list(registry.entities.values()):
        if entity_entry.config_entry_id != entry.entry_id:
            continue
        if entity_entry.platform != DOMAIN:
            continue
        if entity_entry.domain != "sensor":
            continue

        uid = entity_entry.unique_id
        old_eid = entity_entry.entity_id

        # Connection sensor → binary_sensor
        # unique_id pattern: tado_ce_{home_id}_device_{serial}_connection
        should_remove = False
        if "_connection" in uid and "device_" in uid:
            should_remove = True

        # Hot water power sensor → binary_sensor
        # unique_id pattern: tado_ce_{home_id}_zone_{zone_id}_power
        elif (
            "_power" in uid
            and "zone_" in uid
            and "heating" not in uid
            and "ac" not in uid
        ):
            should_remove = True

        if should_remove:
            _LOGGER.debug(
                "Migration: removing legacy sensor %s — binary_sensor "
                "platform will recreate it",
                old_eid,
            )
            registry.async_remove(old_eid)
            removed += 1

    if removed:
        _LOGGER.info(
            "Migration: removed %d legacy sensor entit(ies) so they "
            "can be recreated as binary_sensors",
            removed,
        )
