"""Tado CE Insight History Tracker — persistence for insight duration and trending."""

from __future__ import annotations

from datetime import datetime, timedelta
import logging
from pathlib import Path
from typing import TYPE_CHECKING, Any

from homeassistant.exceptions import HomeAssistantError
from homeassistant.helpers.storage import Store
from homeassistant.util import dt as dt_util

from .format_helpers import format_insight_type as _fmt_insight_type
from .format_helpers import format_priority as _fmt_priority
from .helpers import parse_iso_datetime
from .storage import load_json_sync

if TYPE_CHECKING:
    from homeassistant.core import HomeAssistant

    from .insights_models import Insight

_LOGGER = logging.getLogger(__name__)

STORAGE_VERSION = "1.0"
# Grace period: if an insight disappears for less than this, treat as same occurrence
REAPPEARANCE_GRACE_HOURS = 1


class InsightHistoryTracker:
    """Track insight appearance/disappearance for duration-aware messages and escalation.

    Storage: .storage/tado_ce/insight_history_{home_id}.json

    Each entry is keyed by "{insight_type}:{zone_name}" (or "{insight_type}:_hub"
    for hub-level insights) and tracks first_seen, last_seen, base_priority,
    and occurrence_count.

    Follows the same storage pattern as ThermalStorage — sync file I/O
    via hass.async_add_executor_job, atomic writes via temp file + rename.
    """

    def __init__(self, hass: HomeAssistant, home_id: str) -> None:
        """Initialize tracker."""
        self._hass = hass
        self._home_id = home_id
        self._store: Store[dict[str, Any]] = Store(
            hass,
            1,
            f"tado_ce/insight_history_{home_id}",
        )
        # Old file path for migration
        self._old_storage_path = Path(
            hass.config.path(
                f".storage/tado_ce/insight_history_{home_id}.json",
            ),
        )
        self._entries: dict[str, dict[str, Any]] = {}
        self._active_keys: set[str] = set()
        self._dirty = False

    @property
    def needs_save(self) -> bool:
        """Return True if there are unsaved changes."""
        return self._dirty

    @property
    def entries(self) -> dict[str, dict[str, Any]]:
        """Return current entries (read-only access for testing)."""
        return self._entries

    async def async_load(self) -> int:
        """Load history from Store with migration from old JSON file.

        Returns:
            Number of entries loaded.
        """
        try:
            data = await self._store.async_load()

            # Try migrating from old JSON file if Store is empty
            if data is None:
                data = await self._migrate_from_json()
            else:
                # Clean up old JSON file if it still exists
                await self._cleanup_old_json()

            if data is None:
                _LOGGER.debug("No insight history file found, starting fresh")
                return 0
            self._entries = data.get("entries", {})  # type: ignore[union-attr]
            _LOGGER.debug(
                "Loaded insight history: %d entries",
                len(self._entries),
            )
            return len(self._entries)
        except (OSError, HomeAssistantError) as exc:
            _LOGGER.warning(
                "Failed to load insight history, starting fresh: %s",
                exc,
            )
            self._entries = {}
            return 0

    async def _migrate_from_json(self) -> dict[str, Any] | None:
        """Migrate old JSON file to Store."""
        exists = await self._hass.async_add_executor_job(
            self._old_storage_path.exists,
        )
        if not exists:
            return None

        old_data = await self._hass.async_add_executor_job(
            load_json_sync, self._old_storage_path,
        )
        if old_data is None or not isinstance(old_data, dict):
            return None

        await self._store.async_save(old_data)

        migrated_path = self._old_storage_path.with_suffix(".json.migrated")
        await self._hass.async_add_executor_job(
            self._old_storage_path.rename, migrated_path,
        )
        _LOGGER.info(
            "Migrated insight history → Store (old file renamed to %s)",
            migrated_path,
        )
        return old_data

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
                "Cleaned up old insight history file (renamed to %s)",
                migrated_path,
            )

    async def async_save(self) -> bool:
        """Save history to Store. Only writes if dirty.

        Returns:
            True if saved successfully (or not dirty), False on error.
        """
        if not self._dirty:
            return True

        try:
            data = {
                "version": STORAGE_VERSION,
                "saved_at": dt_util.utcnow().isoformat(),
                "entries": self._entries,
            }
            await self._store.async_save(data)

            self._dirty = False
            _LOGGER.debug(
                "Saved insight history: %d entries",
                len(self._entries),
            )
            return True
        except (OSError, HomeAssistantError):
            _LOGGER.exception("Failed to save insight history")
            return False

    def update(self, current_insights: list[Insight], now: datetime) -> None:
        """Update history with current poll cycle's insights.

        For each current insight:
        - If key exists: update last_seen (same occurrence continues)
        - If key is new: set first_seen = last_seen = now

        For entries NOT in current insights:
        - If last_seen was > REAPPEARANCE_GRACE_HOURS ago: remove (resolved)
        - Otherwise: keep (transient fluctuation grace period)

        Args:
            current_insights: List of Insight objects from current poll cycle.
            now: Current UTC datetime.
        """
        now_iso = now.isoformat()
        current_keys: set[str] = set()

        for insight in current_insights:
            key = self._make_key(insight.insight_type, insight.zone_name)
            current_keys.add(key)

            if key in self._entries:
                # Existing entry — update last_seen
                self._entries[key]["last_seen"] = now_iso
                self._dirty = True
            else:
                # New entry
                self._entries[key] = {
                    "first_seen": now_iso,
                    "last_seen": now_iso,
                    "base_priority": insight.priority.value
                    if hasattr(insight.priority, "value")
                    else int(insight.priority),
                    "occurrence_count": 1,
                }
                self._dirty = True

        # Check for resolved insights (absent from current cycle)
        grace_cutoff = now - timedelta(hours=REAPPEARANCE_GRACE_HOURS)
        keys_to_remove = []
        for key in self._entries:
            if key not in current_keys:
                last_seen_str = self._entries[key].get("last_seen", "")
                try:
                    last_seen = parse_iso_datetime(last_seen_str)
                    if last_seen <= grace_cutoff:
                        keys_to_remove.append(key)
                except (ValueError, TypeError):
                    keys_to_remove.append(key)

        for key in keys_to_remove:
            del self._entries[key]
            self._dirty = True

        self._active_keys = current_keys

    def get_duration(
        self,
        insight_type: str,
        zone_name: str | None = None,
    ) -> timedelta | None:
        """Get how long an insight has been active.

        Args:
            insight_type: The insight type string.
            zone_name: Zone name, or None for hub-level.

        Returns:
            timedelta from first_seen to last_seen, or None if not tracked.
        """
        key = self._make_key(insight_type, zone_name)
        entry = self._entries.get(key)
        if not entry:
            return None

        try:
            first = parse_iso_datetime(entry["first_seen"])
            last = parse_iso_datetime(entry["last_seen"])
            return last - first
        except (ValueError, KeyError, TypeError):
            return None

    def get_persistent_insights(self, threshold_hours: int = 24) -> list[dict[str, Any]]:
        """Return insights that are currently active AND have been active for >= threshold_hours.

        Only returns entries present in the current poll cycle. Entries kept
        solely by the reappearance grace period (resolved but not yet pruned)
        are excluded — they are no longer active issues.

        Returns:
            List of dicts with insight_type, zone_name, duration_hours, base_priority.
        """
        result = []
        threshold = timedelta(hours=threshold_hours)

        for key, entry in self._entries.items():
            # Skip entries not in current poll cycle (grace-period only)
            if key not in self._active_keys:
                continue
            try:
                first = parse_iso_datetime(entry["first_seen"])
                last = parse_iso_datetime(entry["last_seen"])
                duration = last - first
                if duration >= threshold:
                    parts = key.split(":", 1)
                    insight_type = parts[0]
                    zone_name = parts[1] if len(parts) > 1 else None
                    if zone_name == "_hub":
                        zone_name = None
                    priority_num = entry.get("base_priority", 0)
                    priority_names = {0: "none", 1: "low", 2: "medium", 3: "high", 4: "critical"}
                    result.append(
                        {
                            "insight_type": _fmt_insight_type(insight_type),
                            "zone_name": zone_name,
                            "duration_hours": round(duration.total_seconds() / 3600, 1),
                            "base_priority": _fmt_priority(
                                priority_names.get(priority_num, str(priority_num)),
                            ),
                        },
                    )
            except (ValueError, KeyError, TypeError):
                continue

        # Sort by duration descending — duration_hours is always float from round() above
        def _sort_key(item: dict[str, Any]) -> float:
            val = item.get("duration_hours", 0.0)
            return float(val) if isinstance(val, (int, float)) else 0.0

        result.sort(key=_sort_key, reverse=True)
        return result

    def prune_old_entries(self, max_age_days: int = 30) -> int:
        """Remove entries with last_seen older than max_age_days.

        Args:
            max_age_days: Maximum age in days before pruning.

        Returns:
            Number of entries removed.
        """
        cutoff = dt_util.utcnow() - timedelta(days=max_age_days)
        keys_to_remove = []

        for key, entry in self._entries.items():
            try:
                last_seen = parse_iso_datetime(entry["last_seen"])
                if last_seen < cutoff:
                    keys_to_remove.append(key)
            except (ValueError, KeyError, TypeError):
                # Invalid entry — prune it
                keys_to_remove.append(key)

        for key in keys_to_remove:
            del self._entries[key]

        if keys_to_remove:
            self._dirty = True
            _LOGGER.debug("Pruned %d old insight history entries", len(keys_to_remove))

        return len(keys_to_remove)

    @staticmethod
    def _make_key(insight_type: str, zone_name: str | None) -> str:
        """Create storage key from insight_type and zone_name."""
        return f"{insight_type}:{zone_name or '_hub'}"
