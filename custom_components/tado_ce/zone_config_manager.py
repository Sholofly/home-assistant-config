"""Tado CE zone configuration manager — per-zone overrides + listener fan-out."""

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
    """Per-zone settings store + listener fan-out, backed by DataLoader's auxiliary store."""

    def __init__(self, hass: HomeAssistant, home_id: str, data_loader: DataLoader) -> None:
        """Initialise the manager (does not load — call `async_load` after construction)."""
        self._hass = hass
        self._home_id = home_id
        self._data_loader = data_loader
        self._config: dict[str, dict[str, Any]] = {}
        self._listeners: list[Callable[[str, str, Any], None]] = []

    async def async_load(self) -> None:
        """Load and migrate the zone config dict from Store."""
        raw = await self._data_loader.async_load_auxiliary("zone_config")
        if raw and isinstance(raw, dict):
            zones = raw.get("zones", {})
            self._config = zones if isinstance(zones, dict) else {}
        else:
            self._config = {}

        # Cumulative migrations applied on every load — cheap, and
        # ensures users on older schemas get cleaned up the next
        # time they open Options.
        migrated = False
        for zone_cfg in self._config.values():
            ap = zone_cfg.get("adaptive_preheat")
            if isinstance(ap, bool):
                zone_cfg["adaptive_preheat"] = "active" if ap else "off"
                migrated = True
            # `temp_offset` was a v2.x key that never reached the
            # cloud — strip on sight.
            if "temp_offset" in zone_cfg:
                del zone_cfg["temp_offset"]
                migrated = True
            # `smart_valve_control` (bool) → `svc_mode` (str) —
            # the new shape supports `valve_target` / `cycle` /
            # `off`, the old bool only covered on/off.
            svc_bool = zone_cfg.pop("smart_valve_control", None)
            if svc_bool is not None:
                migrated = True
                if "svc_mode" not in zone_cfg:
                    zone_cfg["svc_mode"] = "valve_target" if svc_bool else "off"
        if migrated:
            await self.async_save()
            _LOGGER.info(
                "Zone Config: applied cumulative migrations to "
                "stored zone config",
            )
        _LOGGER.debug(
            "Zone Config: loaded overrides for %d zone(s)",
            len(self._config),
        )

    async def async_save(self) -> None:
        """Schedule a debounced write of the current zone config to Store."""
        self._data_loader.save_auxiliary("zone_config", {"version": 1, "zones": self._config})
        _LOGGER.debug(
            "Zone Config: queued save — %d zone(s)",
            len(self._config),
        )

    def get_zone_config(self, zone_id: str) -> dict[str, Any]:
        """Return the merged config for a zone — defaults + user overrides."""
        zone_config = self._config.get(str(zone_id), {})
        merged = {**DEFAULT_ZONE_CONFIG, **zone_config}
        # In-memory `adaptive_preheat` migration covers stale
        # caches that were loaded before `async_load` ran.
        ap = merged.get("adaptive_preheat")
        if isinstance(ap, bool):
            merged["adaptive_preheat"] = "active" if ap else "off"
        return merged

    def has_zone_override(self, zone_id: str, key: str) -> bool:
        """True when the user has explicitly set this key (not merely inherited the default)."""
        zone_config = self._config.get(str(zone_id), {})
        return key in zone_config

    def get_zone_value(self, zone_id: str, key: str, default: Any = None) -> Any:
        """Read one config key for a zone; falls back to `DEFAULT_ZONE_CONFIG[key]`."""
        config = self.get_zone_config(str(zone_id))
        if default is None:
            return config.get(key, DEFAULT_ZONE_CONFIG.get(key))
        return config.get(key, default)

    async def async_set_zone_value(self, zone_id: str, key: str, value: Any) -> None:
        """Set one config key for a zone, persist, and notify listeners on change."""
        zone_id = str(zone_id)
        if zone_id not in self._config:
            self._config[zone_id] = {}

        old_value = self._config[zone_id].get(key)
        self._config[zone_id][key] = value

        await self.async_save()

        if old_value != value:
            for listener in self._listeners:
                try:
                    listener(zone_id, key, value)
                except Exception:
                    _LOGGER.warning(
                        "Zone Config: listener raised while handling "
                        "zone %s key %s — continuing with the next "
                        "listener so other consumers still get the "
                        "update",
                        zone_id, key,
                        exc_info=True,
                    )

    def add_listener(self, callback: Callable[[str, str, Any], None]) -> Callable[[], None]:
        """Subscribe `callback(zone_id, key, value)` to config changes — returns an unsubscribe."""
        self._listeners.append(callback)

        def _remove_listener() -> None:
            """Idempotent unsubscribe — `suppress(ValueError)` covers double-removal races."""
            with suppress(ValueError):
                self._listeners.remove(callback)

        return _remove_listener

    def get_window_u_value(self, zone_id: str) -> float:
        """Resolve the U-value (W/m²K) for the zone's configured window type."""
        window_type = self.get_zone_value(zone_id, "window_type", "double_pane")
        return WINDOW_U_VALUES.get(window_type, 2.7)

    def get_surface_temp_offset(self, zone_id: str) -> float:
        """Return the user-set surface offset (°C) for mold-risk calibration."""
        return self.get_zone_value(zone_id, "surface_temp_offset", 0.0)  # type: ignore[no-any-return]


    @property
    def zones(self) -> dict[str, dict[str, Any]]:
        """Return a defensive copy of the per-zone config dict."""
        return self._config.copy()
