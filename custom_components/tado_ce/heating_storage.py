"""Tado CE heating cycle storage — per-home persistence via HA Store."""

from __future__ import annotations

from datetime import timedelta
import logging
from pathlib import Path
from typing import TYPE_CHECKING, Any

from homeassistant.exceptions import HomeAssistantError
from homeassistant.helpers.storage import Store
from homeassistant.util import dt as dt_util

from .heating_models import HeatingCycle
from .helpers import parse_iso_datetime
from .storage import load_json_sync

if TYPE_CHECKING:
    from homeassistant.core import HomeAssistant

_LOGGER = logging.getLogger(__name__)

STORE_VERSION = 1
SAVE_DELAY = 15


class HeatingCycleStorage:
    """Persist heating cycles to HA Store with debounced writes and migration."""

    def __init__(self, hass: HomeAssistant, home_id: str) -> None:
        """Initialize storage with home ID."""
        self._hass = hass
        self._home_id = home_id
        self._store: Store[dict[str, Any]] = Store(
            hass,
            STORE_VERSION,
            f"tado_ce/heating_cycles_{home_id}",
        )
        # Old file path for migration
        self._old_storage_path = Path(
            hass.config.path(
                f".storage/tado_ce/heating_cycle_history_{home_id}.json",
            ),
        )
        self._data: dict[str, Any] = {"zones": {}}

    async def async_load(self) -> None:
        """Load cycle data from Store with migration from old JSON file."""
        try:
            stored = await self._store.async_load()
            if stored is not None:
                self._data = self._migrate_data_format(stored)
                _LOGGER.debug(
                    "Loaded heating cycle history for home %s: %d zones",
                    self._home_id,
                    len(self._data.get("zones", {})),
                )
                # Clean up old JSON file if it still exists
                await self._cleanup_old_json()
                return

            # No Store data — try migrating from old JSON file
            migrated = await self._migrate_from_json()
            if migrated is not None:
                self._data = self._migrate_data_format(migrated)
                return

            _LOGGER.debug("No existing heating cycle history found")

        except HomeAssistantError:
            _LOGGER.exception("Corrupted heating cycle storage")
            self._data = {"zones": {}}
        except OSError:
            _LOGGER.exception("Failed to load heating cycle storage")
            self._data = {"zones": {}}

    async def _migrate_from_json(self) -> dict[str, Any] | None:
        """Migrate old JSON file to Store.

        Reads the old file, saves to Store, and renames old file to .json.migrated.
        """
        exists = await self._hass.async_add_executor_job(
            self._old_storage_path.exists,
        )
        if not exists:
            return None

        old_data = await self._hass.async_add_executor_job(
            load_json_sync, self._old_storage_path,
        )
        if old_data is None:
            return None

        # Remove "version" key — Store manages version externally
        if isinstance(old_data, dict):
            old_data.pop("version", None)

        await self._store.async_save(old_data)

        migrated_path = self._old_storage_path.with_suffix(".json.migrated")
        await self._hass.async_add_executor_job(
            self._old_storage_path.rename, migrated_path,
        )
        _LOGGER.info(
            "Migrated heating cycle history → Store (old file renamed to %s)",
            migrated_path,
        )
        return old_data  # type: ignore[return-value]

    async def _cleanup_old_json(self) -> None:
        """Rename old JSON file to .json.migrated if it still exists."""
        exists = await self._hass.async_add_executor_job(
            self._old_storage_path.exists,
        )
        if exists:
            migrated_path = self._old_storage_path.with_suffix(".json.migrated")
            await self._hass.async_add_executor_job(
                self._old_storage_path.rename, migrated_path,
            )
            _LOGGER.info(
                "Cleaned up old heating cycle file (renamed to %s)",
                migrated_path,
            )

    def _migrate_data_format(self, loaded_data: dict[str, Any]) -> dict[str, Any]:
        """Migrate old data format to new format.

        Old format: {"zone_id": [cycles], ...}
        New format: {"zones": {"zone_id": {"cycles": [...]}, ...}}
        """
        # Check if already new format
        if "zones" in loaded_data:
            # Strip "version" if present (legacy Store data)
            loaded_data.pop("version", None)
            return loaded_data

        # Migrate old format
        _LOGGER.info("Migrating heating cycle data from old format")
        new_data: dict[str, Any] = {"zones": {}}

        for zone_id, cycles in loaded_data.items():
            if zone_id == "version":
                continue
            if isinstance(cycles, list):
                new_data["zones"][zone_id] = {"cycles": cycles}
                _LOGGER.debug(
                    "Migrated zone %s with %d cycles",
                    zone_id,
                    len(cycles),
                )

        return new_data

    def _schedule_save(self) -> None:
        """Schedule a debounced save to Store."""
        self._store.async_delay_save(lambda: self._data, SAVE_DELAY)

    async def save_cycle(self, zone_id: str, cycle: HeatingCycle) -> None:
        """Save completed cycle for a zone."""
        if zone_id not in self._data["zones"]:
            self._data["zones"][zone_id] = {"cycles": []}

        self._data["zones"][zone_id]["cycles"].append(cycle.to_dict())

        _LOGGER.debug(
            "Saved cycle for zone %s: %s -> %s (completed=%s, interrupted=%s)",
            zone_id,
            cycle.start_time.isoformat(),
            cycle.end_time.isoformat() if cycle.end_time else "active",
            cycle.completed,
            cycle.interrupted,
        )

        # Cleanup old cycles (keep 2x rolling window)
        await self._cleanup_old_cycles(zone_id)

        # Schedule debounced save
        self._schedule_save()

    async def get_cycles(
        self,
        zone_id: str,
        window_days: int = 7,
    ) -> list[HeatingCycle]:
        """Get cycles for a zone within rolling window."""
        if zone_id not in self._data["zones"]:
            return []

        cutoff = dt_util.utcnow() - timedelta(days=window_days)
        cycles = []

        for cycle_dict in self._data["zones"][zone_id]["cycles"]:
            cycle = HeatingCycle.from_dict(cycle_dict)
            # Only include completed, non-interrupted cycles within window
            if cycle.start_time >= cutoff and cycle.completed and not cycle.interrupted:
                cycles.append(cycle)

        return cycles

    async def get_active_cycles(self) -> dict[str, HeatingCycle]:
        """Get all active cycles (for resume after restart)."""
        active = {}
        for zone_id, zone_data in self._data["zones"].items():
            for cycle_dict in zone_data["cycles"]:
                cycle = HeatingCycle.from_dict(cycle_dict)
                if not cycle.completed and not cycle.interrupted:
                    active[zone_id] = cycle
                    break  # Only one active cycle per zone

        if active:
            _LOGGER.info("Found %d active cycles to resume", len(active))

        return active

    async def get_all_zone_ids(self) -> list[str]:
        """Get all zone IDs with stored cycle data."""
        return list(self._data["zones"].keys())

    async def _cleanup_old_cycles(self, zone_id: str) -> None:
        """Remove cycles older than 2x rolling window."""
        cutoff = dt_util.utcnow() - timedelta(days=14)  # 2x default window

        cycles = self._data["zones"][zone_id]["cycles"]
        original_count = len(cycles)

        self._data["zones"][zone_id]["cycles"] = [
            c for c in cycles if parse_iso_datetime(c["start_time"]) >= cutoff
        ]

        removed_count = original_count - len(self._data["zones"][zone_id]["cycles"])
        if removed_count > 0:
            _LOGGER.debug(
                "Cleaned up %d old cycles for zone %s",
                removed_count,
                zone_id,
            )
