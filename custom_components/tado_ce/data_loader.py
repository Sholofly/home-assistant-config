"""Tado CE Data Loader — thread-safe, per-home file I/O for schedules and config.

Thread-safe, per-home file loading for all Tado CE components.
API cache files use blocking I/O via hass.async_add_executor_job().
Auxiliary files (window_detection, wc_state, bridge_health, outdoor_temp_history,
insight_history) use HA Store for debounced writes and lifecycle management.
"""

from __future__ import annotations

import logging
from pathlib import Path
from typing import TYPE_CHECKING, Any

from homeassistant.exceptions import HomeAssistantError
from homeassistant.helpers.storage import Store

from .const import DATA_DIR, OVERLAY_MODE_DEFAULT, TIMER_DURATION_DEFAULT, get_data_file
from .storage import load_json_sync, save_json_sync

if TYPE_CHECKING:
    from homeassistant.core import HomeAssistant

_LOGGER = logging.getLogger(__name__)

# Max outdoor temp readings (7 days at 30s poll interval)
MAX_OUTDOOR_TEMP_READINGS = 336

# Auxiliary file Store configuration: name -> delay_seconds
_AUXILIARY_STORES: dict[str, int] = {
    "window_detection": 10,
    "wc_state": 10,
    "bridge_health": 10,
    "outdoor_temp_history": 10,
    "insight_history": 10,
    "zone_config": 5,
    "smart_comfort_cache": 30,
    "overlay_mode": 5,
    "timer_duration": 5,
}

STORE_VERSION = 1


class DataLoader:
    """Per-entry data loader with home_id-scoped file paths.

    Each config entry (home) gets its own DataLoader instance.
    API cache files use blocking I/O via ``hass.async_add_executor_job()``.
    Auxiliary files use HA Store for debounced writes.

    Usage::

        loader = DataLoader(home_id="12345", hass=hass)
        zones = await hass.async_add_executor_job(loader.load_zones_file)
        wc = await loader.async_load_wc_state()
    """

    def __init__(self, home_id: str, hass: HomeAssistant | None = None) -> None:
        """Initialize DataLoader for a specific home.

        Args:
            home_id: Tado home ID for file path scoping.
            hass: HomeAssistant instance (required for Store-backed auxiliary files).
        """
        self._home_id = home_id
        self._hass = hass
        self._cache: dict[str, Any] = {}
        # Store instances for auxiliary files (created when hass is provided)
        self._aux_stores: dict[str, Store[dict[str, Any] | list[Any]]] = {}
        if hass:
            self._init_auxiliary_stores(hass)

    def _init_auxiliary_stores(self, hass: HomeAssistant) -> None:
        """Create Store instances for auxiliary files."""
        for name in _AUXILIARY_STORES:
            self._aux_stores[name] = Store(
                hass,
                STORE_VERSION,
                f"tado_ce/{name}_{self._home_id}",
            )

    @property
    def home_id(self) -> str:
        """Return the home_id this loader is scoped to."""
        return self._home_id

    # --- Cache API (for API response data only) ---

    def update_cache(self, base_name: str, data: dict[str, Any] | list[Any]) -> None:
        """Update in-memory cache entry after file write.

        Called by api_client after writing a JSON file to disk (write-through).

        Args:
            base_name: Base filename without extension (e.g. "zones").
            data: Parsed JSON data to cache.
        """
        self._cache[base_name] = data

    def get_cached(self, base_name: str) -> dict[str, Any] | list[Any] | None:
        """Get data from in-memory cache.

        Returns:
            Cached data, or None if not cached.
        """
        return self._cache.get(base_name)


    def load_all_to_cache(self) -> None:
        """Bulk-load all API data files into cache (blocking I/O).

        Called once during cold start via ``hass.async_add_executor_job()``.
        Reads all 11 data files in a single executor job instead of 11 separate ones.
        """
        file_names = [
            "zones",
            "config",
            "home_state",
            "ratelimit",
            "api_call_history",
            "zones_info",
            "weather",
            "mobile_devices",
            "offsets",
            "schedules",
            "ac_capabilities",
        ]
        for name in file_names:
            data = self._load_json(name)
            if data is not None:
                self._cache[name] = data

    def _get_file_path(self, base_name: str) -> Path:
        """Get file path scoped to this home_id."""
        return get_data_file(base_name, self._home_id)

    def _load_json(self, base_name: str) -> dict[str, Any] | list[Any] | None:
        """Load JSON data — cache-aside pattern.

        Returns cached data if available, otherwise reads from disk and
        populates the cache on success.

        Performs blocking file I/O on cache miss — call via
        ``hass.async_add_executor_job()`` when cache is cold.

        Args:
            base_name: Base filename without extension.

        Returns:
            Parsed JSON data, or None on error.
        """
        # Cache hit
        cached: dict[str, Any] | list[Any] | None = self._cache.get(base_name)
        if cached is not None:
            return cached

        # Cache miss — read from disk via HA native JSON helper
        try:
            file_path = self._get_file_path(base_name)
            data = load_json_sync(file_path)
            if data is None:
                _LOGGER.debug("%s.json not found", base_name)
                return None
            self._cache[base_name] = data  # Populate cache on read
            return data
        except HomeAssistantError as e:
            _LOGGER.warning("Failed to load %s.json: %s", base_name, e)
            return None

    # === API cache load methods (blocking I/O — unchanged) ===

    def load_zones_file(self) -> dict[str, Any] | None:
        """Load zones.json (zone states)."""
        return self._load_json("zones")  # type: ignore[return-value]

    def load_zones_info_file(self) -> list[Any] | None:
        """Load zones_info.json (zone metadata)."""
        return self._load_json("zones_info")  # type: ignore[return-value]


    def load_mobile_devices_file(self) -> list[Any] | None:
        """Load mobile_devices.json."""
        return self._load_json("mobile_devices")  # type: ignore[return-value]



    def load_ratelimit_file(self) -> dict[str, Any] | None:
        """Load ratelimit.json."""
        return self._load_json("ratelimit")  # type: ignore[return-value]




    def load_schedules_file(self) -> dict[str, Any] | None:
        """Load schedules.json (zone heating schedules)."""
        return self._load_json("schedules")  # type: ignore[return-value]

    # === Convenience methods ===

    def get_zone_data(self, zone_id: str) -> dict[str, Any] | None:
        """Get state data for a specific zone."""
        zones_data = self.load_zones_file()
        if zones_data:
            zone_states = zones_data.get("zoneStates") or {}
            return zone_states.get(zone_id)
        return None

    def get_zone_schedule(self, zone_id: str) -> dict[str, Any] | None:
        """Get schedule data for a specific zone."""
        schedules = self.load_schedules_file()
        if schedules:
            return schedules.get(zone_id)
        return None

    # === Overlay mode (per-home, Store-backed) ===

    async def async_load_overlay_mode(self) -> str:
        """Load overlay mode from Store.

        Returns:
            "TADO_MODE", "NEXT_TIME_BLOCK", "TIMER", or "MANUAL".
            Defaults to "TADO_MODE" if not found.
        """
        try:
            data = await self.async_load_auxiliary("overlay_mode")
            if data is None:
                return OVERLAY_MODE_DEFAULT
            if not isinstance(data, dict):
                _LOGGER.warning("Invalid overlay_mode format, defaulting to TADO_MODE")
                return OVERLAY_MODE_DEFAULT
            mode = data.get("overlay_mode", OVERLAY_MODE_DEFAULT)
            if mode not in ("TADO_MODE", "NEXT_TIME_BLOCK", "TIMER", "MANUAL"):
                _LOGGER.warning("Invalid overlay mode '%s', defaulting to TADO_MODE", mode)
                return OVERLAY_MODE_DEFAULT
            return mode  # type: ignore[no-any-return]
        except (HomeAssistantError, OSError) as e:
            _LOGGER.warning("Failed to load overlay mode: %s", e)
            return OVERLAY_MODE_DEFAULT

    def save_overlay_mode(self, mode: str) -> bool:
        """Save overlay mode via Store.

        Args:
            mode: "TADO_MODE", "NEXT_TIME_BLOCK", "TIMER", or "MANUAL"

        Returns:
            True if valid mode, False otherwise.
        """
        if mode not in ("TADO_MODE", "NEXT_TIME_BLOCK", "TIMER", "MANUAL"):
            _LOGGER.error("Invalid overlay mode: %s", mode)
            return False
        self.save_auxiliary("overlay_mode", {"overlay_mode": mode})
        _LOGGER.debug("Saved overlay mode: %s", mode)
        return True

    # === Timer duration (per-home, Store-backed) ===

    async def async_load_timer_duration(self) -> int:
        """Load timer duration from Store.

        Returns:
            Duration in minutes (default TIMER_DURATION_DEFAULT if not set or error).
        """
        try:
            data = await self.async_load_auxiliary("timer_duration")
            if data is None:
                return TIMER_DURATION_DEFAULT
            if isinstance(data, dict):
                return data.get("timer_duration", TIMER_DURATION_DEFAULT)  # type: ignore[no-any-return]
        except (HomeAssistantError, OSError) as e:
            _LOGGER.debug("Failed to load timer duration: %s", e)
        return TIMER_DURATION_DEFAULT

    def save_timer_duration(self, duration: int) -> bool:
        """Save timer duration via Store.

        Args:
            duration: Duration in minutes (15-180)

        Returns:
            True if valid duration, False otherwise.
        """
        if not isinstance(duration, int) or duration < 15 or duration > 180:  # noqa: PLR2004 — Tado API timer bounds (15-180 min)
            _LOGGER.error("Invalid timer duration: %s", duration)
            return False
        self.save_auxiliary("timer_duration", {"timer_duration": duration})
        _LOGGER.debug("Saved timer duration: %s minutes", duration)
        return True

    # === Store-backed auxiliary file migration ===

    async def _migrate_auxiliary_file(self, name: str) -> dict[str, Any] | list[Any] | None:
        """Migrate old JSON auxiliary file to Store.

        Reads the old file, saves to Store, and renames old file to .json.migrated.

        Args:
            name: Auxiliary file base name (e.g. "window_detection").

        Returns:
            Migrated data, or None if no old file found.
        """
        if not self._hass:
            return None

        store = self._aux_stores.get(name)
        if not store:
            return None

        old_path = self._old_auxiliary_path(name)
        exists = await self._hass.async_add_executor_job(old_path.exists)
        if not exists:
            return None

        old_data = await self._hass.async_add_executor_job(load_json_sync, old_path)
        if old_data is None:
            return None

        await store.async_save(old_data)

        migrated_path = old_path.with_suffix(".json.migrated")
        await self._hass.async_add_executor_job(old_path.rename, migrated_path)
        _LOGGER.info("Migrated %s → Store (old file renamed to %s)", name, migrated_path)
        return old_data

    # === Store-backed async load methods ===

    async def async_load_auxiliary(self, name: str) -> dict[str, Any] | list[Any] | None:
        """Load auxiliary file data from Store, with migration fallback.

        Args:
            name: Auxiliary file base name.

        Returns:
            Loaded data, or None if not found.
        """
        store = self._aux_stores.get(name)
        if not store:
            # Fallback to sync load if Store not available
            return self._load_json(name)

        data = await store.async_load()
        if data is not None:
            # Store has data — clean up old JSON file if it still exists
            await self._cleanup_old_json(name)
            return data

        # Try migrating from old JSON file
        return await self._migrate_auxiliary_file(name)

    async def _cleanup_old_json(self, name: str) -> None:
        """Rename old JSON file to .json.migrated if it still exists.

        Called after Store load succeeds — handles the case where save_auxiliary
        wrote to Store before the first async_load_auxiliary could migrate.
        """
        if not self._hass:
            return
        old_path = self._old_auxiliary_path(name)
        exists = await self._hass.async_add_executor_job(old_path.exists)
        if exists:
            migrated_path = old_path.with_suffix(".json.migrated")
            await self._hass.async_add_executor_job(old_path.rename, migrated_path)
            _LOGGER.info(
                "Cleaned up old %s file (renamed to %s)",
                name, migrated_path,
            )

    def _old_auxiliary_path(self, name: str) -> Path:
        """Get the old JSON file path for an auxiliary file (always includes home_id).

        Special case: overlay_mode and timer_duration were shared (no home_id suffix).
        """
        if name in ("overlay_mode", "timer_duration"):
            return DATA_DIR / f"{name}.json"
        return DATA_DIR / f"{name}_{self._home_id}.json"

    def save_auxiliary(self, name: str, data: dict[str, Any] | list[Any]) -> None:
        """Schedule debounced save for auxiliary file via Store.

        Args:
            name: Auxiliary file base name.
            data: Data to save.
        """
        store = self._aux_stores.get(name)
        if store:
            delay = _AUXILIARY_STORES.get(name, 10)
            store.async_delay_save(lambda: data, delay)
        else:
            # Fallback to sync save if Store not available
            try:
                file_path = self._get_file_path(name)
                save_json_sync(file_path, data)
            except (OSError, HomeAssistantError):
                _LOGGER.debug("Failed to save %s.json", name)

    # === Outdoor temperature history (Store-backed) ===

    async def async_load_outdoor_temp_history(self) -> list[Any]:
        """Load outdoor temperature history from Store.

        Returns:
            List of float temperature readings (most recent last), max 336 entries.
        """
        try:
            data = await self.async_load_auxiliary("outdoor_temp_history")
            if data is None:
                _LOGGER.debug("outdoor_temp_history not found - starting fresh")
                return []
            if isinstance(data, dict):
                readings = data.get("readings", [])
                readings = [float(r) for r in readings if isinstance(r, (int, float))]
                return readings[-MAX_OUTDOOR_TEMP_READINGS:]
            return []
        except (HomeAssistantError, OSError) as e:
            _LOGGER.warning("Failed to load outdoor_temp_history: %s", e)
            return []

    def save_outdoor_temp_history(self, readings: list[Any]) -> bool:
        """Save outdoor temperature history via Store.

        Args:
            readings: List of float temperature readings (most recent last).

        Returns:
            True (always succeeds — Store handles async write).
        """
        trimmed = readings[-MAX_OUTDOOR_TEMP_READINGS:]
        data = {"readings": trimmed}
        self.save_auxiliary("outdoor_temp_history", data)
        return True

    # === Weather Compensation State (Store-backed) ===

    async def async_load_wc_state(self) -> dict[str, Any] | None:
        """Load weather compensation state from Store.

        Returns:
            Parsed dict, or None if not found.
        """
        data = await self.async_load_auxiliary("wc_state")
        if data is not None and isinstance(data, dict):
            return data
        return None

    def save_wc_state(self, data: dict[str, Any]) -> bool:
        """Save weather compensation state via Store.

        Args:
            data: Serialized WeatherCompensationState dict.

        Returns:
            True (always succeeds — Store handles async write).
        """
        self.save_auxiliary("wc_state", data)
        return True

    # === Bridge Health State (Store-backed) ===

    async def async_load_bridge_health(self) -> dict[str, Any] | None:
        """Load bridge health state from Store.

        Returns:
            Parsed dict, or None if not found.
        """
        data = await self.async_load_auxiliary("bridge_health")
        if data is not None and isinstance(data, dict):
            return data
        return None

    def save_bridge_health(self, data: dict[str, Any]) -> bool:
        """Save bridge health state via Store.

        Args:
            data: Serialized BridgeHealthState dict.

        Returns:
            True (always succeeds — Store handles async write).
        """
        self.save_auxiliary("bridge_health", data)
        return True

    # === Window Detection State (Store-backed) ===

    async def async_load_window_detection(self) -> dict[str, Any] | None:
        """Load window detection state from Store.

        Returns:
            Parsed dict with per-zone detection state, or None if not found.
        """
        data = await self.async_load_auxiliary("window_detection")
        if data is not None and isinstance(data, dict):
            return data
        return None

    def save_window_detection(self, data: dict[str, Any]) -> bool:
        """Save window detection state via Store.

        Args:
            data: Dict of per-zone detection state.

        Returns:
            True (always succeeds — Store handles async write).
        """
        self.save_auxiliary("window_detection", data)
        return True

    # Note: Legacy sync load methods removed in Phase 2.
    # All auxiliary file access now goes through async_load_auxiliary / save_auxiliary.
