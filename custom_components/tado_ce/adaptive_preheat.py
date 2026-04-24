"""Tado CE Adaptive Preheat Manager — local Early Start replacement.

Automatically triggers heating when preheat_now binary sensor turns ON.
Replaces Tado's cloud-based Early Start with local, user-controlled automation.
"""

from __future__ import annotations

import logging
from typing import TYPE_CHECKING, Any

from homeassistant.core import Event, HomeAssistant, callback
from homeassistant.helpers.event import async_track_state_change_event
from homeassistant.util import dt as dt_util

if TYPE_CHECKING:
    from .api_client import TadoApiClient
    from .config_manager import ConfigurationManager
    from .coordinator import TadoDataUpdateCoordinator
    from .data_loader import DataLoader
    from .zone_config_manager import ZoneConfigManager

_LOGGER = logging.getLogger(__name__)


class AdaptivePreheatManager:
    """Manages adaptive preheat automation for heating zones."""

    def __init__(
        self,
        hass: HomeAssistant,
        config_manager: ConfigurationManager,
        api_client: TadoApiClient | None = None,
        data_loader: DataLoader | None = None,
        zone_config_manager: ZoneConfigManager | None = None,
    ) -> None:
        """Initialize the Adaptive Preheat Manager.

        Args:
            hass: Home Assistant instance
            config_manager: Configuration manager with settings
            api_client: Per-entry API client (multi-home)
            data_loader: DataLoader instance for per-entry file access
            zone_config_manager: Per-zone configuration manager
        """
        self._hass = hass
        self._config_manager = config_manager
        self._api_client = api_client
        self._data_loader = data_loader
        self._zone_config_manager = zone_config_manager
        self._coordinator: TadoDataUpdateCoordinator | None = None
        self._enabled = False
        self._enabled_zones: list[str] = []  # Zone IDs enabled for adaptive preheat
        self._active_overlays: dict[str, dict[str, Any]] = {}  # zone_id -> overlay info
        self._state_listeners: list[Any] = []  # Track state change listeners
        self._zone_info: dict[str, dict[str, Any]] = {}  # zone_id -> {name, entity_id}

    def set_coordinator(self, coordinator: TadoDataUpdateCoordinator) -> None:
        """Set the coordinator back-reference.

        Called after coordinator creation to resolve the chicken-and-egg
        dependency (manager is created before coordinator).
        """
        self._coordinator = coordinator

    async def async_setup(self) -> None:
        """Set up the Adaptive Preheat Manager.

        Called during integration setup. Loads zone info and starts monitoring
        if adaptive preheat is enabled.
        """
        # Check if adaptive preheat is enabled
        self._enabled = self._config_manager.get_adaptive_preheat_enabled()
        if not self._enabled:
            _LOGGER.debug("Adaptive Preheat: Disabled in config")
            return

        # Check if Smart Comfort is enabled (required for preheat_now sensors)
        if not self._config_manager.get_smart_comfort_enabled():
            _LOGGER.warning(
                "Adaptive Preheat: Requires Smart Comfort to be enabled. "
                "Please enable Smart Comfort in integration options.",
            )
            self._enabled = False
            return

        # Load zone info (use per-entry data_loader)
        if self._data_loader is not None:
            zones_info = await self._hass.async_add_executor_job(self._data_loader.load_zones_info_file)
        else:
            _LOGGER.warning("Adaptive Preheat: No data_loader available")
            return

        if not zones_info:
            _LOGGER.warning("Adaptive Preheat: No zones found")
            return

        # Build zone info mapping
        for zone in zones_info:
            if zone.get("type") != "HEATING":
                continue

            zone_id = str(zone.get("id"))
            zone_name = zone.get("name", f"Zone {zone_id}")

            # Check per-zone adaptive_preheat mode (off/active/passive)
            if self._zone_config_manager:
                zone_cfg = self._zone_config_manager.get_zone_config(zone_id)
                preheat_mode = zone_cfg.get("adaptive_preheat", "off")
                if preheat_mode not in ("active", "passive"):
                    continue
            else:
                continue

            # Build entity IDs
            zone_slug = zone_name.lower().replace(" ", "_")
            self._zone_info[zone_id] = {
                "name": zone_name,
                "slug": zone_slug,
                "preheat_now_entity": f"binary_sensor.{zone_slug}_preheat_now",
                "preheat_advisor_entity": f"sensor.{zone_slug}_preheat_advisor",
                "climate_entity": f"climate.{zone_slug}",
            }
            self._enabled_zones.append(zone_id)

        if not self._enabled_zones:
            _LOGGER.info("Adaptive Preheat: No zones configured")
            return

        _LOGGER.info(
            "Adaptive Preheat: Enabled for %s zones: %s",
            len(self._enabled_zones),
            [self._zone_info[z]["name"] for z in self._enabled_zones],
        )

        # Start monitoring preheat_now sensors
        await self._start_monitoring()

    async def _start_monitoring(self) -> None:
        """Start monitoring preheat_now binary sensors."""
        # Build list of entities to monitor
        entities_to_monitor = [self._zone_info[zone_id]["preheat_now_entity"] for zone_id in self._enabled_zones]

        # Register state change listener
        @callback
        def _state_change_handler(event: Event) -> None:
            """Handle state changes for preheat_now sensors."""
            entity_id = event.data.get("entity_id")
            new_state = event.data.get("new_state")
            old_state = event.data.get("old_state")

            if not new_state:
                return

            # Find zone_id for this entity
            zone_id = None
            for zid, info in self._zone_info.items():
                if info["preheat_now_entity"] == entity_id:
                    zone_id = zid
                    break

            if not zone_id:
                return

            # Check state transition
            old_is_on = old_state and old_state.state == "on"
            new_is_on = new_state.state == "on"

            if new_is_on and not old_is_on:
                # Preheat time reached - trigger heating
                self._hass.async_create_task(
                    self._trigger_preheat(zone_id),
                )
            elif not new_is_on and old_is_on:
                # Preheat ended - check if we should clear overlay
                self._hass.async_create_task(
                    self._check_clear_overlay(zone_id),
                )

        # Register listener
        cancel = async_track_state_change_event(
            self._hass,
            entities_to_monitor,
            _state_change_handler,  # type: ignore[arg-type]
        )
        self._state_listeners.append(cancel)

        _LOGGER.debug("Adaptive Preheat: Monitoring %s sensors", len(entities_to_monitor))

        # Check current state of all sensors (in case they're already ON)
        await self._check_initial_preheat_states()

    async def _check_initial_preheat_states(self) -> None:
        """Check current state of all sensors in case they're already ON.

        Uses coordinator entity_data if available; falls back gracefully
        since state listeners will catch future transitions anyway.
        """
        if not self._coordinator:
            return

        if self._is_home_away():
            _LOGGER.debug("Adaptive Preheat: Skipping initial check — home is in away mode")
            return

        for zone_id in self._enabled_zones:
            preheat_data = self._coordinator.get_entity_data(zone_id, "preheat_now")
            if preheat_data and preheat_data.get("state") == "on":
                _LOGGER.info(
                    "Adaptive Preheat: %s preheat_now already ON, triggering preheat",
                    self._zone_info[zone_id]["name"],
                )
                await self._trigger_preheat(zone_id)

    def _is_home_away(self) -> bool:
        """Check if home is in AWAY mode."""
        if not self._coordinator:
            return False
        home_state = (self._coordinator.data or {}).get("home_state")
        return bool(home_state and home_state.get("presence") != "HOME")

    def _get_zone_state(self, zone_id: str) -> dict[str, Any] | None:
        """Get zone state data from coordinator."""
        coord_data = self._coordinator.data or {}  # type: ignore[union-attr]
        zone_states = (coord_data.get("zones") or {}).get("zoneStates") or {}
        return zone_states.get(zone_id) or zone_states.get(str(zone_id))

    def _should_suppress_passive(self, zone_id: str, zone_name: str) -> bool:
        """Check if passive mode should suppress preheat due to existing overlay."""
        zd = self._get_zone_state(zone_id)
        if zd and zd.get("overlay") is not None:
            _LOGGER.info(
                "Adaptive Preheat: %s suppressed (passive mode) — zone has active overlay (%s)",
                zone_name,
                zd["overlay"].get("type", "unknown"),
            )
            return True
        return False

    def _get_target_temp(self, zone_id: str, zone_name: str) -> float | None:
        """Get and validate target temperature from preheat advisor data."""
        preheat_data = self._coordinator.get_entity_data(zone_id, "preheat_advisor")  # type: ignore[union-attr]
        if not preheat_data:
            _LOGGER.warning("Adaptive Preheat: %s preheat advisor data not available", zone_name)
            return None

        raw = preheat_data.get("target_temperature")
        if not raw:
            _LOGGER.warning("Adaptive Preheat: %s no target temperature", zone_name)
            return None

        try:
            return float(raw)
        except (ValueError, TypeError):
            _LOGGER.warning("Adaptive Preheat: %s invalid target temp: %s", zone_name, raw)
            return None

    def _is_already_at_target(self, zone_id: str, zone_name: str, target_temp: float) -> bool:
        """Check if zone is already at or near target temperature."""
        zone_data = self._get_zone_state(zone_id)
        if not zone_data:
            return False
        sensor_data = zone_data.get("sensorDataPoints") or {}
        current_temp = (sensor_data.get("insideTemperature") or {}).get("celsius")
        if current_temp is not None and current_temp >= target_temp - 0.5:
            _LOGGER.info(
                "Adaptive Preheat: %s already at target (%s°C >= %s°C), skipping",
                zone_name, current_temp, target_temp,
            )
            return True
        return False

    async def _trigger_preheat(self, zone_id: str) -> None:
        """Trigger heating for a zone.

        Sets a heating overlay with the target temperature from the next schedule.
        Uses TADO_MODE termination which follows device settings (typically "until next schedule block").

        Args:
            zone_id: Zone ID to trigger heating for
        """
        zone_info = self._zone_info.get(zone_id)
        if not zone_info:
            return

        zone_name = zone_info["name"]

        # Defense-in-depth: suppress preheat when home is in AWAY mode (#171)
        if self._is_home_away():
            _LOGGER.info("Adaptive Preheat: %s suppressed — home is in away mode", zone_name)
            return

        if zone_id in self._active_overlays:
            _LOGGER.debug("Adaptive Preheat: %s already has active overlay", zone_name)
            return

        # Per-zone preheat mode check (passive suppresses when zone has existing overlay)
        preheat_mode = "active"  # default
        if self._zone_config_manager:
            zone_cfg = self._zone_config_manager.get_zone_config(zone_id)
            preheat_mode = zone_cfg.get("adaptive_preheat", "off")

        if preheat_mode == "passive" and self._should_suppress_passive(zone_id, zone_name):
            return

        target_temp = self._get_target_temp(zone_id, zone_name)
        if target_temp is None:
            return

        if self._is_already_at_target(zone_id, zone_name, target_temp):
            return

        _LOGGER.info("Adaptive Preheat: Triggering %s to %s°C (until next schedule block)", zone_name, target_temp)

        # Active mode: capture state before setting overlay (state restoration)
        if preheat_mode == "active" and self._coordinator:
            await self._coordinator.async_capture_state(
                zone_id, "climate_heating", "preheat",
            )

        await self._set_preheat_overlay(zone_id, zone_name, target_temp)

    async def _set_preheat_overlay(self, zone_id: str, zone_name: str, target_temp: float) -> None:
        """Set the heating overlay via API."""
        try:
            client = self._api_client
            if client is None:
                _LOGGER.warning("Adaptive Preheat: No API client available for zone %s", zone_name)
                return

            setting = {
                "type": "HEATING",
                "power": "ON",
                "temperature": {"celsius": target_temp},
            }
            termination = {"type": "TADO_MODE"}

            success = await client.set_zone_overlay(zone_id, setting, termination)

            if success:
                self._active_overlays[zone_id] = {
                    "target_temp": target_temp,
                    "triggered_at": dt_util.utcnow(),
                    "termination": "TADO_MODE",
                }
                _LOGGER.info("Adaptive Preheat: %s overlay set successfully", zone_name)
            else:
                _LOGGER.warning("Adaptive Preheat: %s failed to set overlay", zone_name)

        except Exception:
            _LOGGER.exception("Adaptive Preheat: %s error setting overlay", zone_name)

    async def _check_clear_overlay(self, zone_id: str) -> None:
        """Check if we should clear the overlay for a zone.

        Only clears overlays that were set by this manager.
        Called when preheat_now turns OFF.

        Args:
            zone_id: Zone ID to check
        """
        zone_info = self._zone_info.get(zone_id)
        if not zone_info:
            return

        zone_name = zone_info["name"]

        # Check if we have an active overlay for this zone
        if zone_id not in self._active_overlays:
            _LOGGER.debug("Adaptive Preheat: %s no active overlay to clear", zone_name)
            return

        # The overlay should auto-clear with TADO_MODE termination (follows device settings)
        # Just remove from our tracking
        del self._active_overlays[zone_id]
        _LOGGER.info("Adaptive Preheat: %s preheat ended, overlay will auto-clear at schedule start", zone_name)

    async def async_unload(self) -> None:
        """Unload the Adaptive Preheat Manager.

        Called during integration unload. Cancels all listeners.
        """
        for cancel in self._state_listeners:
            cancel()
        self._state_listeners.clear()

        _LOGGER.debug("Adaptive Preheat: Unloaded")
