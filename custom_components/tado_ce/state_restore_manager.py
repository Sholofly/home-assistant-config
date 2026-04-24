"""Manage state capture and restoration for zone overlays.

Follows the existing manager pattern (SmartComfortManager, AdaptivePreheatManager):
a coordinator-owned manager class that encapsulates all state capture/restore logic.

Design doc: .kiro/specs/state-restoration-enhancement/design.md
"""

from __future__ import annotations

import asyncio
from dataclasses import dataclass
from datetime import timedelta
import logging
from pathlib import Path
from typing import TYPE_CHECKING, Any

from homeassistant.helpers.storage import Store
from homeassistant.util import dt as dt_util

from .helpers import parse_iso_datetime
from .storage import load_json_sync

if TYPE_CHECKING:
    from homeassistant.core import HomeAssistant

    from .config_manager import ConfigurationManager
    from .coordinator import TadoDataUpdateCoordinator
    from .data_loader import DataLoader

_LOGGER = logging.getLogger(__name__)

# Stale state threshold — purge captured states older than this on load
_STALE_THRESHOLD = timedelta(hours=24)

# Storage base name (for old file migration)
_STORAGE_BASE_NAME = "state_restore"

# HA Store constants
STORE_VERSION = 1
SAVE_DELAY = 5


@dataclass
class CapturedState:
    """Represent a captured zone state before an overlay operation."""

    zone_id: str
    entity_type: str  # "climate_heating", "climate_ac", "water_heater"
    temperature: float | None = None
    hvac_mode: str | None = None  # HVACMode value as string
    power: str | None = None  # "ON" / "OFF"
    overlay_type: str | None = None  # "MANUAL" / "TIMER" / "TADO_MODE" / None (schedule)
    termination: dict[str, Any] | None = None  # Full termination dict from API
    fan_mode: str | None = None  # AC only — raw API fanLevel value
    swing_mode: str | None = None  # AC only — raw API verticalSwing value
    horizontal_swing_mode: str | None = None  # AC only — raw API horizontalSwing value
    captured_at: str = ""  # ISO 8601 timestamp
    source: str = ""  # What triggered capture: "set_open_window_mode", "set_timer", etc.


def _state_to_dict(state: CapturedState) -> dict[str, Any]:
    """Serialise CapturedState to a JSON-compatible dict."""
    return {
        "zone_id": state.zone_id,
        "entity_type": state.entity_type,
        "temperature": state.temperature,
        "hvac_mode": state.hvac_mode,
        "power": state.power,
        "overlay_type": state.overlay_type,
        "termination": state.termination,
        "fan_mode": state.fan_mode,
        "swing_mode": state.swing_mode,
        "horizontal_swing_mode": state.horizontal_swing_mode,
        "captured_at": state.captured_at,
        "source": state.source,
    }


def _state_from_dict(data: dict[str, Any]) -> CapturedState:
    """Deserialise a dict into a CapturedState."""
    return CapturedState(
        zone_id=data.get("zone_id", ""),
        entity_type=data.get("entity_type", ""),
        temperature=data.get("temperature"),
        hvac_mode=data.get("hvac_mode"),
        power=data.get("power"),
        overlay_type=data.get("overlay_type"),
        termination=data.get("termination"),
        fan_mode=data.get("fan_mode"),
        swing_mode=data.get("swing_mode"),
        horizontal_swing_mode=data.get("horizontal_swing_mode"),
        captured_at=data.get("captured_at", ""),
        source=data.get("source", ""),
    )


def _make_store_key(zone_id: str, entity_type: str) -> str:
    """Build storage key from zone_id and entity_type."""
    return f"{zone_id}:{entity_type}"


class StateRestoreManager:
    """Manage state capture and restoration for zone overlays."""

    def __init__(
        self,
        hass: HomeAssistant,
        config_manager: ConfigurationManager,
        data_loader: DataLoader,
    ) -> None:
        """Initialize the StateRestoreManager."""
        self._hass = hass
        self._config_manager = config_manager
        self._data_loader = data_loader
        self._coordinator: TadoDataUpdateCoordinator | None = None
        self._captured: dict[str, CapturedState] = {}
        self._lock = asyncio.Lock()
        # Timer expiry detection: zone_id -> had_overlay in previous poll
        self._previous_overlay_states: dict[str, bool] = {}
        # HA Store for persistence
        self._store: Store[dict[str, Any]] = Store(
            hass,
            STORE_VERSION,
            f"tado_ce/state_restore_{data_loader.home_id}",
        )
        # Old file path for migration
        self._old_storage_path = Path(
            hass.config.path(
                f".storage/tado_ce/{_STORAGE_BASE_NAME}_{data_loader.home_id}.json",
            ),
        )

    def set_coordinator(self, coordinator: TadoDataUpdateCoordinator) -> None:
        """Set coordinator back-reference (resolves chicken-and-egg dependency)."""
        self._coordinator = coordinator

    # ------------------------------------------------------------------
    # Lifecycle
    # ------------------------------------------------------------------

    async def async_setup(self) -> None:
        """Load persisted state from Store and purge stale entries."""
        raw = await self._store.async_load()

        if raw is None:
            # Try migrating from old JSON file
            raw = await self._migrate_from_json()
        else:
            # Clean up old JSON file if it still exists
            await self._cleanup_old_json()

        if not raw or not isinstance(raw, dict):
            _LOGGER.debug("State Restore: No persisted state found")
            return

        now = dt_util.utcnow()
        loaded = 0
        purged = 0
        for key, entry in raw.items():
            if not isinstance(entry, dict):
                continue
            state = _state_from_dict(entry)
            # Purge entries older than 24 hours
            if state.captured_at:
                try:
                    captured_dt = parse_iso_datetime(state.captured_at)
                    if now - captured_dt > _STALE_THRESHOLD:
                        purged += 1
                        continue
                except (ValueError, TypeError):
                    pass  # Keep entries with unparseable timestamps
            self._captured[key] = state
            loaded += 1

        if loaded or purged:
            _LOGGER.info(
                "State Restore: Loaded %d captured state(s), purged %d stale",
                loaded, purged,
            )
        # Persist after purge so stale entries are removed from Store
        if purged:
            self._schedule_persist()

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

        await self._store.async_save(old_data)

        migrated_path = self._old_storage_path.with_suffix(".json.migrated")
        await self._hass.async_add_executor_job(
            self._old_storage_path.rename, migrated_path,
        )
        _LOGGER.info(
            "Migrated state restore data → Store (old file renamed to %s)",
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
                "Cleaned up old state restore file (renamed to %s)",
                migrated_path,
            )

    async def async_shutdown(self) -> None:
        """Persist state to Store on HA shutdown / config entry unload."""
        data = {key: _state_to_dict(state) for key, state in self._captured.items()}
        await self._store.async_save(data)
        _LOGGER.debug("State Restore: Shutdown — state persisted")

    # ------------------------------------------------------------------
    # Core operations
    # ------------------------------------------------------------------

    async def capture(
        self,
        zone_id: str,
        entity_type: str,
        source: str,
    ) -> bool:
        """Capture current zone state before overlay operation.

        Returns True if state was captured, False if existing capture preserved
        (overwrite rule: preserve original pre-overlay state).
        """
        key = _make_store_key(zone_id, entity_type)

        async with self._lock:
            # Overwrite rule (EC2): preserve existing capture
            if key in self._captured:
                _LOGGER.debug(
                    "State Restore: Existing capture preserved for %s (source=%s)",
                    key, self._captured[key].source,
                )
                return False

            if not self._coordinator:
                _LOGGER.warning("State Restore: No coordinator — cannot capture for %s", key)
                return False

            coord_data = self._coordinator.data or {}
            zone_states = (coord_data.get("zones") or {}).get("zoneStates") or {}
            zone_data = zone_states.get(zone_id) or zone_states.get(str(zone_id))

            if not zone_data:
                _LOGGER.debug("State Restore: No zone data for zone %s", zone_id)
                return False

            state = self._extract_state(zone_id, entity_type, zone_data, source)
            self._captured[key] = state
            self._schedule_persist()

            _LOGGER.debug(
                "State Restore: Captured %s — temp=%s, power=%s, overlay=%s, source=%s",
                key, state.temperature, state.power, state.overlay_type, source,
            )
            return True

    async def restore(
        self,
        zone_id: str,
        entity_type: str,
    ) -> CapturedState | None:
        """Consume and return captured state for restoration."""
        key = _make_store_key(zone_id, entity_type)

        async with self._lock:
            state = self._captured.pop(key, None)
            if state:
                self._schedule_persist()
                _LOGGER.debug("State Restore: Restored (consumed) %s", key)
            return state

    async def clear(self, zone_id: str, entity_type: str) -> None:
        """Explicitly clear a captured state."""
        key = _make_store_key(zone_id, entity_type)
        async with self._lock:
            if self._captured.pop(key, None):
                self._schedule_persist()
                _LOGGER.debug("State Restore: Cleared %s", key)


    async def clear_all(self) -> None:
        """Clear all captured states (e.g. on Away → Home transition)."""
        async with self._lock:
            if self._captured:
                count = len(self._captured)
                self._captured.clear()
                self._schedule_persist()
                _LOGGER.info("State Restore: Cleared all %d captured state(s)", count)

    def get_diagnostics_summary(self) -> list[dict[str, str]]:
        """Return privacy-safe summary of captured states for diagnostics."""
        return [
            {
                "zone_id": state.zone_id,
                "entity_type": state.entity_type,
                "captured_at": state.captured_at,
                "source": state.source,
            }
            for state in self._captured.values()
        ]

    # ------------------------------------------------------------------
    # Timer expiry detection (called from coordinator poll cycle)
    # ------------------------------------------------------------------

    def on_poll_update(self, coordinator_data: dict[str, Any]) -> None:
        """Detect timer expiration and fire restoration events.

        Called from coordinator._async_update_data after each poll.
        Compares overlay states between polls to detect overlay disappearance.
        """
        zone_states = (coordinator_data.get("zones") or {}).get("zoneStates") or {}

        for key, captured in list(self._captured.items()):
            zone_id = captured.zone_id
            zone_data = zone_states.get(zone_id) or zone_states.get(str(zone_id))

            has_overlay = bool(zone_data and zone_data.get("overlay"))
            had_overlay = self._previous_overlay_states.get(zone_id, False)

            # Overlay disappeared → timer expired or API-side removal
            if had_overlay and not has_overlay and key in self._captured:
                _LOGGER.info(
                    "State Restore: Overlay disappeared for zone %s — firing restoration event",
                    zone_id,
                )
                self._fire_restoration_event(captured, zone_data)
                # Schedule transition reset: clear captured state after event
                self._captured.pop(key, None)
                self._schedule_persist()

        # Update previous overlay states for next poll cycle
        for zone_id_str in zone_states:
            zd = zone_states[zone_id_str]
            self._previous_overlay_states[zone_id_str] = bool(zd and zd.get("overlay"))

    def _fire_restoration_event(
        self,
        captured: CapturedState,
        zone_data: dict[str, Any] | None,
    ) -> None:
        """Fire tado_ce_state_restoration_available event."""
        zone_name = ""
        if zone_data:
            zone_name = zone_data.get("name", "")

        self._hass.bus.async_fire(
            "tado_ce_state_restoration_available",
            {
                "zone_id": captured.zone_id,
                "zone_name": zone_name,
                "entity_type": captured.entity_type,
                "captured_temperature": captured.temperature,
                "captured_hvac_mode": captured.hvac_mode,
                "source": captured.source,
            },
        )

    # ------------------------------------------------------------------
    # State extraction from coordinator zone data
    # ------------------------------------------------------------------

    def _extract_state(
        self,
        zone_id: str,
        entity_type: str,
        zone_data: dict[str, Any],
        source: str,
    ) -> CapturedState:
        """Extract current zone state into a CapturedState."""
        setting = zone_data.get("setting") or {}
        overlay = zone_data.get("overlay")
        overlay_type = zone_data.get("overlayType")  # "MANUAL" / "TIMER" / "TADO_MODE" / None

        power = setting.get("power")
        temperature = (setting.get("temperature") or {}).get("celsius")

        # Termination info from overlay
        termination: dict[str, Any] | None = None
        if overlay and isinstance(overlay, dict):
            termination = overlay.get("termination")

        # HVAC mode (climate entities only)
        hvac_mode: str | None = None
        if entity_type in ("climate_heating", "climate_ac"):
            if entity_type == "climate_ac":
                hvac_mode = setting.get("mode")  # COOL / HEAT / DRY / FAN / AUTO
            elif power == "ON":
                # Heating: derive from power + overlay
                hvac_mode = "heat" if overlay_type == "MANUAL" else "auto"
            elif overlay_type == "MANUAL":
                hvac_mode = "off"
            else:
                hvac_mode = "auto"

        # AC-specific: fan and swing
        fan_mode: str | None = None
        swing_mode: str | None = None
        horizontal_swing_mode: str | None = None
        if entity_type == "climate_ac":
            fan_mode = setting.get("fanLevel") or setting.get("fanSpeed")
            swing_mode = setting.get("verticalSwing")
            horizontal_swing_mode = setting.get("horizontalSwing")

        return CapturedState(
            zone_id=zone_id,
            entity_type=entity_type,
            temperature=temperature,
            hvac_mode=hvac_mode,
            power=power,
            overlay_type=overlay_type,
            termination=termination,
            fan_mode=fan_mode,
            swing_mode=swing_mode,
            horizontal_swing_mode=horizontal_swing_mode,
            captured_at=dt_util.utcnow().isoformat(),
            source=source,
        )

    # ------------------------------------------------------------------
    # Persistence helpers
    # ------------------------------------------------------------------

    def _schedule_persist(self) -> None:
        """Schedule a debounced persist to Store."""
        self._store.async_delay_save(
            lambda: {key: _state_to_dict(s) for key, s in self._captured.items()},
            SAVE_DELAY,
        )
