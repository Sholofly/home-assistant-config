"""Tado CE DataUpdateCoordinator — adaptive polling and entity update propagation.

Adaptive polling and entity update propagation via HA's DataUpdateCoordinator.
"""

from __future__ import annotations

import asyncio
from datetime import datetime, timedelta
import logging
import sys
import time
from typing import TYPE_CHECKING, Any

from homeassistant.config_entries import ConfigEntry
from homeassistant.exceptions import ConfigEntryAuthFailed
from homeassistant.helpers.update_coordinator import (
    DataUpdateCoordinator,
    UpdateFailed,
)
from homeassistant.util import dt as dt_util

from .const import (
    DEVICE_SYNC_QUEUE_MAX_DEPTH,
    DOMAIN,
    OVERLAY_MODE_DEFAULT,
    TIMER_DURATION_DEFAULT,
)
from .exceptions import TadoAuthError, TadoBridgeApiError, TadoSyncError
from .insight_history import InsightHistoryTracker
from .polling import get_polling_interval, should_pause_polling
from .ratelimit import _sanitize_retry_after
from .weather_compensation import (
    WeatherCompensationState,
)
from .write_optimizer import ActionDebouncer, DeviceSyncQueue, RefreshCoalescer

if TYPE_CHECKING:
    from collections.abc import Callable

    from homeassistant.const import Platform
    from homeassistant.core import HomeAssistant

    from .adaptive_preheat import AdaptivePreheatManager
    from .api_call_tracker import APICallTracker
    from .api_client import TadoApiClient
    from .bridge_api import TadoBridgeApiClient
    from .bridge_health import BridgeHealthTracker
    from .config_manager import ConfigurationManager
    from .data_loader import DataLoader
    from .heating_coordinator import HeatingCycleCoordinator
    from .smart_comfort import SmartComfortManager
    from .state_restore_manager import CapturedState, StateRestoreManager
    from .zone_config_manager import ZoneConfigManager

_LOGGER = logging.getLogger(__name__)

# Outdoor temperature history — 14 days x 24 hourly readings
_OUTDOOR_TEMP_HISTORY_MAX = 336


# HA official pattern — provides type safety for entry.runtime_data
type TadoConfigEntry = ConfigEntry[TadoDataUpdateCoordinator]


class TadoDataUpdateCoordinator(DataUpdateCoordinator[dict[str, Any]]):
    """Tado CE data update coordinator with adaptive polling.

    Entities access per-entry state via self.coordinator attributes.
    """

    config_entry: TadoConfigEntry

    def __init__(
        self,
        hass: HomeAssistant,
        entry: ConfigEntry,
        *,
        config_manager: ConfigurationManager,
        zone_config_manager: ZoneConfigManager,
        data_loader: DataLoader,
        api_client: TadoApiClient,
        api_tracker: APICallTracker,
        smart_comfort_manager: SmartComfortManager | None = None,
        heating_cycle_coordinator: HeatingCycleCoordinator | None = None,
        adaptive_preheat_manager: AdaptivePreheatManager | None = None,
        state_restore_manager: StateRestoreManager | None = None,
    ) -> None:
        """Initialize the coordinator with all per-entry dependencies."""
        initial_interval = get_polling_interval(config_manager)
        super().__init__(
            hass,
            _LOGGER,
            config_entry=entry,
            name=f"{DOMAIN} ({config_manager.get_all_config().get('home_id', 'default')})",
            update_interval=timedelta(minutes=initial_interval),
        )

        # Per-entry dependencies (accessible by entities via self.coordinator)
        self.config_manager = config_manager
        self.zone_config_manager = zone_config_manager
        self.data_loader = data_loader
        self.api_client = api_client
        self.api_tracker = api_tracker
        self.smart_comfort_manager = smart_comfort_manager
        self.heating_cycle_coordinator = heating_cycle_coordinator
        self.adaptive_preheat_manager = adaptive_preheat_manager
        self._sr_manager = state_restore_manager

        # RefreshHandler (self-reference resolves chicken-and-egg dependency)
        from .refresh_handler import RefreshHandler

        self.refresh_handler = RefreshHandler(self)

        self.home_id: str = entry.data.get("home_id") or "default"

        # Freshness tracking
        self.entity_freshness: dict[str, float] = {}
        self._freshness_lock = asyncio.Lock()
        self._freshness_cleanup_cancel: Callable[[], None] | None = None
        self._global_sequence: int = 0

        # Heating cycle timeout cancel handle
        self._heating_cycle_timeout_cancel: Callable[[], None] | None = None

        # Overlay/timer cache
        self.overlay_mode: str = OVERLAY_MODE_DEFAULT
        self.timer_duration: int = TIMER_DURATION_DEFAULT

        # Outdoor temp history (owned by coordinator, async I/O only)
        self._outdoor_temp_history: list[float] = []
        self._outdoor_temp_loaded: bool = False

        # Shared entity data store — entities publish computed values here
        # so other components (insight collector, adaptive preheat) can read
        # without cross-entity hass.states.get() coupling.
        # Structure: {zone_id: {"condensation_risk": {...}, "window_predicted": {...}, ...}}
        self.entity_data: dict[str, dict[str, dict[str, Any]]] = {}

        # Pending cleanup flags — set by options flow, consumed by migration
        # after reload. Avoids transient hass.data[DOMAIN_*] keys.
        self._pending_cleanup: dict[str, dict[str, bool]] = {}

        # Insight history tracker (persistent insight duration tracking)
        self.insight_history = InsightHistoryTracker(hass, self.home_id)

        # Full sync tracking
        self._last_full_sync: datetime | None = None
        self._cached_ratelimit: dict[str, Any] | None = None

        # Bridge API client (lazy-init from options when bridge credentials present)
        self.bridge_api_client: TadoBridgeApiClient | None = None

        # Bridge health tracking (init when bridge credentials present)
        self.bridge_health_tracker: BridgeHealthTracker | None = None
        self._bridge_first_fetch_logged: bool = False

        # Platforms loaded during setup (used by unload to match exactly)
        self.loaded_platforms: frozenset[Platform] = frozenset()

        # Weather compensation mutable runtime state (persists across polls)
        self._wc_state = WeatherCompensationState()
        self._wc_state_loaded: bool = False

        # Write optimization components
        self._action_debouncer = ActionDebouncer(
            default_window=float(config_manager.get_smart_actions_debounce_seconds()),
        )
        self._device_sync_queue = DeviceSyncQueue(
            delay=config_manager.get_device_sync_delay_seconds(),
            max_depth=DEVICE_SYNC_QUEUE_MAX_DEPTH,
        )
        debounce_window = config_manager.get_smart_actions_debounce_seconds()
        self._refresh_coalescer = RefreshCoalescer(
            coordinator=self,
            window=2.0,
            skip_when_fresh=(debounce_window > 0),
        )

    @property
    def outdoor_temp_history(self) -> list[float]:
        """Return outdoor temp history (read-only access for sensors)."""
        return self._outdoor_temp_history

    @property
    def action_debouncer(self) -> ActionDebouncer:
        """Return the action debouncer instance."""
        return self._action_debouncer

    @property
    def device_sync_queue(self) -> DeviceSyncQueue:
        """Return the device sync queue instance."""
        return self._device_sync_queue

    @property
    def refresh_coalescer(self) -> RefreshCoalescer:
        """Return the refresh coalescer instance."""
        return self._refresh_coalescer

    def publish_entity_data(self, zone_id: str, key: str, data: dict[str, Any]) -> None:
        """Publish computed entity data for cross-component access.

        Entities call this to share their computed values (e.g. condensation
        risk, window predicted state) so insight collectors and other
        components can read without hass.states.get() coupling.

        Args:
            zone_id: Zone ID string.
            key: Data key (e.g. "condensation_risk", "window_predicted").
            data: Dict of computed values (e.g. {"state": "High", "recommendation": "..."}).
        """
        if zone_id not in self.entity_data:
            self.entity_data[zone_id] = {}
        self.entity_data[zone_id][key] = data

    def get_entity_data(self, zone_id: str, key: str) -> dict[str, Any] | None:
        """Read published entity data for a zone.

        Args:
            zone_id: Zone ID string.
            key: Data key (e.g. "condensation_risk", "window_predicted").

        Returns:
            Dict of computed values, or None if not published yet.
        """
        return self.entity_data.get(zone_id, {}).get(key)

    async def _async_post_sync_processing(
        self, zone_data: dict[str, Any] | list[Any] | None, weather_data: dict[str, Any] | list[Any] | None,
    ) -> dict[str, Any]:
        """Run post-sync processing: history detection, cache reads, bridge, WC.

        Returns the assembled result dict.
        """
        # Detect API reset time from history
        from .ratelimit import (
            async_detect_reset_from_history,
            async_update_ratelimit_reset_time,
        )

        detected_reset = await async_detect_reset_from_history(self.hass, self.home_id)
        if detected_reset:
            _LOGGER.debug(
                "Tado CE: HA history detected reset at %s UTC",
                detected_reset.strftime("%H:%M"),
            )
            await async_update_ratelimit_reset_time(
                self.hass, detected_reset, self.home_id, self.data_loader,
            )

        # Read all data from in-memory cache (populated by api_client write-through)
        config_data = self.data_loader.get_cached("config")
        home_state_data = self.data_loader.get_cached("home_state")
        ratelimit_data = self.data_loader.get_cached("ratelimit")
        api_call_history_data = self.data_loader.get_cached("api_call_history")
        zones_info_data = self.data_loader.get_cached("zones_info")
        mobile_devices_data = self.data_loader.get_cached("mobile_devices")
        offsets_data = self.data_loader.get_cached("offsets")
        schedules_data = self.data_loader.get_cached("schedules")
        ac_capabilities = self.data_loader.get_cached("ac_capabilities")
        home_details_data = self.data_loader.get_cached("home_details")

        # Accumulate outdoor temp history
        await self._accumulate_outdoor_temp_history(weather_data)

        # Notify HeatingCycleCoordinator of zone updates
        await self._notify_heating_cycle_updates(zone_data)

        # Cleanup expired entity freshness entries
        await self._cleanup_entity_freshness()

        # Save dirty data (piggyback on poll cycle)
        if self.insight_history.needs_save:
            await self.insight_history.async_save()
        if self.api_tracker.needs_save:
            await self.api_tracker.async_save_if_dirty()

        # Bridge API data (optional)
        bridge_data = await self._async_fetch_bridge_data()

        # Lazy-load persisted weather compensation state on first poll
        if not self._wc_state_loaded and self.config_manager.get_wc_enabled():
            raw = await self.data_loader.async_load_wc_state()
            if raw and isinstance(raw, dict):
                self._wc_state = WeatherCompensationState.from_dict(raw)
                _LOGGER.debug("Weather compensation: restored persisted state")
            self._wc_state_loaded = True

        # Weather compensation (after bridge data — needs bridge client)
        _zone_dict = zone_data if isinstance(zone_data, dict) else None
        _weather_dict = weather_data if isinstance(weather_data, dict) else None
        wc_data = await self._async_run_weather_compensation(
            bridge_data, _zone_dict, _weather_dict,
        )
        if wc_data is not None:
            self.data_loader.save_wc_state(self._wc_state.to_dict())

        result: dict[str, Any] = {
            "zones": zone_data or {},
            "config": config_data or {},
            "home_state": home_state_data or {},
            "ac_capabilities": ac_capabilities or {},
            "ratelimit": ratelimit_data or {},
            "api_call_history": api_call_history_data or {},
            "zones_info": zones_info_data or [],
            "weather": weather_data or {},
            "mobile_devices": mobile_devices_data or [],
            "offsets": offsets_data or {},
            "schedules": schedules_data or {},
            "home_details": home_details_data or {},
        }
        if bridge_data is not None:
            result["bridge"] = bridge_data
        if wc_data is not None:
            result["weather_compensation"] = wc_data

        # State restore: Away → Home clears captured states, then detect timer expiration
        await self._handle_state_restore_updates(home_state_data, result)

        return result

    async def _async_update_data(self) -> dict[str, Any]:
        """Fetch data from Tado API. Dynamically adjusts update_interval."""
        was_failing = self.last_update_success is False

        # 1. Load ratelimit and check quota
        self._load_ratelimit_from_cache()
        if self._cached_ratelimit:
            should_pause, reason = should_pause_polling(
                self._cached_ratelimit,
                self.config_manager,
            )
            if should_pause:
                _LOGGER.warning("Tado CE: %s", reason)
                self.update_interval = timedelta(minutes=15)
                # Use retry_after to let HA defer next refresh precisely
                reset_seconds = self._cached_ratelimit.get("reset_seconds")
                retry_after = _sanitize_retry_after(reset_seconds)
                _LOGGER.info("Tado CE: Rate limited, deferring refresh %ds", retry_after)
                raise UpdateFailed(reason, retry_after=retry_after)

        # 2. Set adaptive interval for NEXT poll
        new_interval = get_polling_interval(self.config_manager, self._cached_ratelimit)
        self.update_interval = timedelta(minutes=new_interval)

        # 3. Execute API sync
        do_full_sync = self._should_do_full_sync()
        cm = self.config_manager

        try:
            await self.api_client.async_sync(
                quick=not do_full_sync,
                weather_enabled=cm.get_weather_enabled(),
                mobile_devices_enabled=cm.get_mobile_devices_enabled(),
                mobile_devices_frequent_sync=cm.get_mobile_devices_frequent_sync(),
                offset_enabled=cm.get_offset_enabled(),
                home_state_sync_enabled=cm.get_home_state_sync_enabled(),
            )
        except TadoAuthError as e:
            from .repairs import async_create_auth_issue

            async_create_auth_issue(self.hass, self.home_id)
            raise ConfigEntryAuthFailed(
                "Refresh token expired — user must re-authenticate",
            ) from e
        except TadoSyncError as e:
            raise UpdateFailed(f"Tado CE sync failed: {e}") from e

        if do_full_sync:
            self._last_full_sync = dt_util.utcnow()

        if was_failing:
            _LOGGER.info("Tado CE: Connection restored — sync successful after previous failure")

        # 4. Post-sync processing: cache reads, bridge, WC, state restore
        zone_data = self.data_loader.get_cached("zones")
        weather_data = self.data_loader.get_cached("weather")
        return await self._async_post_sync_processing(zone_data, weather_data)

    async def _accumulate_outdoor_temp_history(
        self, weather_data: dict[str, Any] | list[Any] | None,
    ) -> None:
        """Accumulate outdoor temperature from weather data into history buffer.

        Lazy-loads persisted history on first call, appends new reading,
        trims to max size, and persists.
        """
        if not weather_data:
            return
        outdoor_temp = (weather_data.get("outsideTemperature") or {}).get("celsius")  # type: ignore[union-attr]
        if outdoor_temp is None:
            return

        if not self._outdoor_temp_loaded:
            loaded = await self.data_loader.async_load_outdoor_temp_history()
            self._outdoor_temp_history = loaded
            self._outdoor_temp_loaded = True

        prev_last = self._outdoor_temp_history[-1] if self._outdoor_temp_history else None

        self._outdoor_temp_history.append(outdoor_temp)
        if len(self._outdoor_temp_history) > _OUTDOOR_TEMP_HISTORY_MAX:
            del self._outdoor_temp_history[: len(self._outdoor_temp_history) - _OUTDOOR_TEMP_HISTORY_MAX]

        # Only schedule Store write when the new reading differs from the previous
        if outdoor_temp != prev_last:
            self.data_loader.save_outdoor_temp_history(self._outdoor_temp_history)

    async def _notify_heating_cycle_updates(
        self, zone_data: dict[str, Any] | list[Any] | None,
    ) -> None:
        """Notify HeatingCycleCoordinator of zone temperature updates.

        Iterates zone states and forwards target/current temperature pairs
        so the heating cycle coordinator can track heating cycles.
        """
        if not self.heating_cycle_coordinator or not zone_data:
            return
        # Tado API may return null for 'zoneStates'; 'or {}' handles None correctly
        zone_states = zone_data.get("zoneStates") or {}  # type: ignore[union-attr]
        for zone_id, data in zone_states.items():
            try:
                setting = data.get("setting") or {}
                target_temp = (setting.get("temperature") or {}).get("celsius")
                sensor_data = data.get("sensorDataPoints") or {}
                current_temp = (sensor_data.get("insideTemperature") or {}).get("celsius")
                if target_temp is not None and current_temp is not None:
                    await self.heating_cycle_coordinator.on_zone_update(
                        zone_id,
                        target_temp,
                        current_temp,
                    )
            except (KeyError, TypeError, ValueError):
                _LOGGER.debug("HeatingCycleCoordinator update failed for zone %s", zone_id)

    async def _handle_state_restore_updates(
        self,
        home_state_data: dict[str, Any] | list[Any] | None,
        result: dict[str, Any],
    ) -> None:
        """Handle state restore housekeeping after poll.

        Clears all captured states on Away → Home transition, then
        forwards the poll result for timer expiry detection.
        """
        if not self._sr_manager:
            return
        old_home_state = self.data.get("home_state", {}) if self.data else {}
        old_presence = old_home_state.get("presence")
        _hsd = home_state_data if isinstance(home_state_data, dict) else {}
        new_presence = _hsd.get("presence")
        if old_presence == "AWAY" and new_presence == "HOME":
            await self._sr_manager.clear_all()
            _LOGGER.info("State Restore: Cleared all captured states (home returned from Away)")

        self._sr_manager.on_poll_update(result)

    def _should_do_full_sync(self) -> bool:
        """Check if full sync needed (vs quick). Only on first poll after restart/reload."""
        return self._last_full_sync is None

    async def _async_fetch_bridge_data(self) -> dict[str, object] | None:
        """Fetch bridge API data with health tracking."""
        options = self.config_entry.options
        bridge_serial = options.get("bridge_serial", "")
        bridge_auth_key = options.get("bridge_auth_key", "")

        _LOGGER.debug(
            "Bridge credentials check - serial: %s, auth_key: %s",
            bridge_serial[:8] + "..." if bridge_serial else "EMPTY",
            "SET" if bridge_auth_key else "EMPTY",
        )

        if not bridge_serial or not bridge_auth_key:
            _LOGGER.debug("Bridge API skipped — no credentials configured")
            self.bridge_api_client = None
            self.bridge_health_tracker = None
            return None

        # Lazy-init health tracker when bridge credentials present
        if self.bridge_health_tracker is None:
            from .bridge_health import BridgeHealthTracker as _BridgeHealthTracker

            raw = await self.data_loader.async_load_bridge_health()
            if raw and isinstance(raw, dict):
                self.bridge_health_tracker = _BridgeHealthTracker.from_dict(raw)
                _LOGGER.debug(
                    "Bridge health: restored persisted state (connected=%s)",
                    self.bridge_health_tracker.state.is_connected,
                )
            else:
                self.bridge_health_tracker = _BridgeHealthTracker()

        # Lazy-init (or re-init if credentials changed)
        if self.bridge_api_client is None:
            from homeassistant.helpers.aiohttp_client import (
                async_get_clientsession,
            )

            from .bridge_api import TadoBridgeApiClient

            session = async_get_clientsession(self.hass)
            self.bridge_api_client = TadoBridgeApiClient(session, bridge_serial, bridge_auth_key)
            _LOGGER.debug("Bridge API client initialized for serial %s", bridge_serial[:8] + "...")

        try:
            _LOGGER.debug("Fetching bridge API wiring state...")
            start_time = time.monotonic()
            result = await self.bridge_api_client.async_get_wiring_state()
            elapsed_ms = (time.monotonic() - start_time) * 1000
            self.bridge_health_tracker.record_success(elapsed_ms)
            self.data_loader.save_bridge_health(self.bridge_health_tracker.to_dict())
            _LOGGER.debug("Bridge API fetch successful (%.0f ms): %s", elapsed_ms, result)

            # First-time field inventory logging
            if not self._bridge_first_fetch_logged:
                from .bridge_discovery import flatten_response

                fields = flatten_response(result)
                _LOGGER.info(
                    "Bridge API field inventory (%d fields): %s",
                    len(fields),
                    ", ".join(f.path for f in fields),
                )
                self._bridge_first_fetch_logged = True

            return result
        except TadoBridgeApiError as e:
            self.bridge_health_tracker.record_failure(str(e))
            self.data_loader.save_bridge_health(self.bridge_health_tracker.to_dict())
            _LOGGER.debug("Bridge API fetch failed — %s — cloud data unaffected", e)
            return None

    async def _async_run_weather_compensation(
        self,
        bridge_data: dict[str, object] | None,
        zone_data: dict[str, Any] | None,
        weather_data: dict[str, Any] | None,
    ) -> dict[str, Any] | None:
        """Run one weather compensation evaluation cycle.

        Delegates to ``weather_compensation.async_run_wc_cycle`` which
        contains the full orchestration logic.  The coordinator only
        gates on enabled + bridge client availability.
        """
        cm = self.config_manager
        if not cm.get_wc_enabled() or self.bridge_api_client is None:
            self._wc_state.status = "disabled"
            return None

        from .weather_compensation import async_run_wc_cycle

        return await async_run_wc_cycle(
            config_manager=cm,
            bridge_api_client=self.bridge_api_client,
            wc_state=self._wc_state,
            hass=self.hass,
            weather_data=weather_data,
            zone_data=zone_data,
            update_interval=self.update_interval,
            bridge_data=bridge_data,
        )

    def _load_ratelimit_from_cache(self) -> None:
        """Load ratelimit data from DataLoader in-memory cache."""
        data = self.data_loader.get_cached("ratelimit")
        if data is not None and isinstance(data, dict):
            self._cached_ratelimit = data
        else:
            self._cached_ratelimit = None

    async def mark_entity_fresh(self, entity_id: str) -> None:
        """Mark entity as having a recent API call."""
        async with self._freshness_lock:
            self.entity_freshness[entity_id] = time.monotonic()
            _LOGGER.debug("Marked entity fresh: %s", entity_id)

    def is_entity_fresh(self, entity_id: str, debounce_seconds: int | None = None) -> bool:
        """Check if entity has a recent API call (within debounce window)."""
        if entity_id not in self.entity_freshness:
            return False
        if debounce_seconds is None:
            debounce_seconds = self.config_manager.get_refresh_debounce_seconds() + 2
        elapsed = time.monotonic() - self.entity_freshness[entity_id]
        if elapsed > debounce_seconds:
            del self.entity_freshness[entity_id]
            return False
        return True

    def get_next_sequence(self) -> int:
        """Get next monotonically increasing sequence number (overflow-safe)."""
        self._global_sequence += 1
        if self._global_sequence >= sys.maxsize:
            _LOGGER.info("Sequence number reached max, resetting to 0")
            self._global_sequence = 0
        return self._global_sequence

    async def _cleanup_entity_freshness(self) -> None:
        """Remove expired freshness entries."""
        async with self._freshness_lock:
            now = time.monotonic()
            expired = [eid for eid, timestamp in self.entity_freshness.items() if now - timestamp > 60]  # noqa: PLR2004 — 60s freshness TTL
            for eid in expired:
                del self.entity_freshness[eid]
            if expired:
                _LOGGER.debug("Cleaned up %d expired entity freshness entries", len(expired))




    def save_wc_state_if_loaded(self) -> None:
        """Persist weather compensation state if it was loaded."""
        if self._wc_state_loaded:
            self.data_loader.save_wc_state(self._wc_state.to_dict())

    async def async_capture_state(
        self, zone_id: str, entity_type: str, source: str,
    ) -> None:
        """Capture zone state before overlay change (null-safe).

        No-op when state restore is disabled (_sr_manager is None).
        """
        if self._sr_manager is not None:
            await self._sr_manager.capture(zone_id, entity_type, source=source)

    async def async_restore_state(
        self, zone_id: str, entity_type: str,
    ) -> CapturedState | None:
        """Restore captured state for a zone (null-safe).

        Returns captured state, or None when unavailable.
        """
        if self._sr_manager is None:
            return None
        return await self._sr_manager.restore(zone_id, entity_type)

    def get_state_restore_diagnostics(self) -> list[dict[str, str]]:
        """Return state restore diagnostics summary (null-safe)."""
        if self._sr_manager is None:
            return []
        return self._sr_manager.get_diagnostics_summary()

    async def async_shutdown_state_restore(self) -> None:
        """Persist and shut down state restore manager (null-safe)."""
        if self._sr_manager is not None:
            await self._sr_manager.async_shutdown()

