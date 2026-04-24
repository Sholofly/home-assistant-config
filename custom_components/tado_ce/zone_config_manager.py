"""Tado CE zone configuration manager — per-zone settings storage and listener pattern."""  # generic config store, values are heterogeneous
  # generic config store, values are heterogeneous
from __future__ import annotations

from contextlib import suppress
import logging
from typing import TYPE_CHECKING, Any

from .const import DEFAULT_ZONE_CONFIG, WINDOW_U_VALUES

if TYPE_CHECKING:
    from collections.abc import Callable

    from homeassistant.core import HomeAssistant

    from .data_loader import DataLoader

_LOGGER = logging.getLogger(__name__)


class ZoneConfigManager:
    """Manage per-zone configuration.

    Stores zone-specific settings via DataLoader Store infrastructure
    and provides listener pattern for config changes.
    """

    def __init__(self, hass: HomeAssistant, home_id: str, data_loader: DataLoader) -> None:
        """Initialize zone config manager.

        Args:
            hass: Home Assistant instance
            home_id: Tado home ID for multi-home support
            data_loader: DataLoader instance for Store-backed persistence
        """
        self._hass = hass
        self._home_id = home_id
        self._data_loader = data_loader
        self._config: dict[str, dict[str, Any]] = {}
        self._listeners: list[Callable[[str, str, Any], None]] = []

    async def async_load(self) -> None:
        """Load zone configuration from Store."""
        raw = await self._data_loader.async_load_auxiliary("zone_config")
        if raw and isinstance(raw, dict):
            zones = raw.get("zones", {})
            self._config = zones if isinstance(zones, dict) else {}
        else:
            self._config = {}

        # Cumulative migration: adaptive_preheat bool → str (persisted)
        migrated = False
        for zone_cfg in self._config.values():
            ap = zone_cfg.get("adaptive_preheat")
            if isinstance(ap, bool):
                zone_cfg["adaptive_preheat"] = "active" if ap else "off"
                migrated = True
        if migrated:
            await self.async_save()
            _LOGGER.info("Migrated adaptive_preheat bool → str in zone config")
        _LOGGER.debug("Loaded zone config for %s zones", len(self._config))

    async def async_save(self) -> None:
        """Save zone configuration via Store (debounced)."""
        self._data_loader.save_auxiliary("zone_config", {"version": 1, "zones": self._config})
        _LOGGER.debug("Saved zone config for %s zones", len(self._config))

    def get_zone_config(self, zone_id: str) -> dict[str, Any]:
        """Get configuration for a zone, with defaults.

        Args:
            zone_id: Zone ID as string

        Returns:
            Zone config dict merged with defaults
        """
        zone_config = self._config.get(str(zone_id), {})
        # Merge with defaults (zone config overrides defaults)
        merged = {**DEFAULT_ZONE_CONFIG, **zone_config}
        # Cumulative migration: adaptive_preheat bool → str
        ap = merged.get("adaptive_preheat")
        if isinstance(ap, bool):
            merged["adaptive_preheat"] = "active" if ap else "off"
        return merged

    def has_zone_override(self, zone_id: str, key: str) -> bool:
        """Check if a zone has an explicit user-set override for a key.

        Returns True only if the user has explicitly saved a value
        for this key in zone config (not just the default).
        """
        zone_config = self._config.get(str(zone_id), {})
        return key in zone_config

    def get_zone_value(self, zone_id: str, key: str, default: Any = None) -> Any:
        """Get a specific configuration value for a zone.

        Args:
            zone_id: Zone ID as string
            key: Configuration key
            default: Default value if not set (uses DEFAULT_ZONE_CONFIG if None)

        Returns:
            Configuration value
        """
        config = self.get_zone_config(str(zone_id))
        if default is None:
            return config.get(key, DEFAULT_ZONE_CONFIG.get(key))
        return config.get(key, default)

    async def async_set_zone_value(self, zone_id: str, key: str, value: Any) -> None:
        """Set a configuration value for a zone.

        Args:
            zone_id: Zone ID as string
            key: Configuration key
            value: Value to set
        """
        zone_id = str(zone_id)
        if zone_id not in self._config:
            self._config[zone_id] = {}

        old_value = self._config[zone_id].get(key)
        self._config[zone_id][key] = value

        await self.async_save()

        # Notify listeners if value changed
        if old_value != value:
            for listener in self._listeners:
                try:
                    listener(zone_id, key, value)
                except Exception:
                    _LOGGER.exception("Error in zone config listener")

    def add_listener(self, callback: Callable[[str, str, Any], None]) -> Callable[[], None]:
        """Add a listener for config changes.

        Args:
            callback: Function(zone_id, key, value) called on changes

        Returns:
            Function to remove the listener
        """
        self._listeners.append(callback)

        def _remove_listener() -> None:
            """Remove listener with race condition protection."""
            with suppress(ValueError):
                self._listeners.remove(callback)

        return _remove_listener

    def get_window_u_value(self, zone_id: str) -> float:
        """Get window U-value for a zone based on window type.

        Args:
            zone_id: Zone ID as string

        Returns:
            U-value in W/m²K
        """
        window_type = self.get_zone_value(zone_id, "window_type", "double_pane")
        return WINDOW_U_VALUES.get(window_type, 2.7)

    def get_surface_temp_offset(self, zone_id: str) -> float:
        """Get surface temperature offset for mold risk calibration.

        Args:
            zone_id: Zone ID as string

        Returns:
            Offset in °C (negative = colder surface, positive = warmer)
        """
        return self.get_zone_value(zone_id, "surface_temp_offset", 0.0)  # type: ignore[no-any-return]


    @property
    def zones(self) -> dict[str, dict[str, Any]]:
        """Get all zone configurations."""
        return self._config.copy()
