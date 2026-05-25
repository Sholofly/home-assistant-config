"""Tado CE coordinator — adaptive polling, sub-system orchestration, entity propagation.

Wraps Home Assistant's `DataUpdateCoordinator` with the integration's
own polling logic (day / night windows, quota-aware backoff, HomeKit
skip rules) and threads cloud + bridge + HomeKit data through the
sub-systems (smart-valve controllers, offset sync, weather
compensation, state restore, insights). Each config entry gets its
own coordinator instance.
"""

from __future__ import annotations

import asyncio
import contextlib
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
    BRIDGE_POLL_INTERVAL_SECONDS,
    DEVICE_SYNC_QUEUE_MAX_DEPTH,
    DOMAIN,
    ENTITY_FRESHNESS_EXPIRY_SECONDS,
    HOMEKIT_SAVINGS_RESET_MIN_JUMP,
    HOMEKIT_SAVINGS_RESET_RATIO,
    HOMEKIT_WEATHER_SKIP_MINUTES,
    LOW_QUOTA_THRESHOLD,
    OFFSET_DRIFT_REFRESH_SECONDS,
    OUTDOOR_TEMP_HISTORY_MAX,
    OVERLAY_MODE_DEFAULT,
    TIMER_DURATION_DEFAULT,
)
from .exceptions import TadoAuthError, TadoBridgeApiError, TadoSyncError
from .helpers import mask_serial
from .insight_history import InsightHistoryTracker
from .polling import get_polling_interval, should_pause_polling
from .ratelimit import _sanitize_retry_after
from .weather_compensation import (
    WeatherCompensationState,
)
from .write_health_tracker import WriteHealthTracker
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
    from .homekit_client import HomeKitClient
    from .homekit_provider import HomeKitLocalProvider
    from .offset_sync_controller import OffsetSyncController
    from .smart_comfort import SmartComfortManager
    from .state_reconciler import StateReconciler
    from .state_restore_manager import CapturedState, StateRestoreManager
    from .valve_controller import SmartValveController
    from .zone_config_manager import ZoneConfigManager

_LOGGER = logging.getLogger(__name__)


# HA official pattern — provides type safety for entry.runtime_data
type TadoConfigEntry = ConfigEntry[TadoDataUpdateCoordinator]


class TadoDataUpdateCoordinator(DataUpdateCoordinator[dict[str, Any]]):
    """Per-config-entry coordinator with adaptive polling and sub-system orchestration."""

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
        """Initialise the coordinator with every per-entry dependency wired in."""
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
        #
        # LIFECYCLE: In-memory only — not persisted across restarts.
        # Populated progressively as entities process their first poll data.
        # Consumers MUST handle None returns from get_entity_data() during
        # the startup gap (typically 0-2 poll cycles after restart).
        #
        # Structure: {zone_id: {"condensation_risk": {...}, "window_predicted": {...}, ...}}
        self.entity_data: dict[str, dict[str, dict[str, Any]]] = {}

        # Pending cleanup flags — set by options flow, consumed by migration
        # after reload. Avoids transient hass.data[DOMAIN_*] keys.
        self._pending_cleanup: dict[str, dict[str, bool]] = {}

        # Insight history tracker (persistent insight duration tracking)
        self.insight_history = InsightHistoryTracker(hass, self.home_id)

        # Insight collector mutable state — owned by coordinator so duration
        # tracking survives individual sensor entities being disabled by the user.
        # anomaly_start_times drives "heating anomaly for N minutes"; humidity
        # histories drive humidity-trend insights.
        self._insight_anomaly_start_times: dict[str, datetime] = {}
        self._insight_humidity_histories: dict[str, list[Any]] = {}

        # Full sync tracking
        self._last_full_sync: datetime | None = None
        self._cached_ratelimit: dict[str, Any] | None = None

        # Periodic offset drift refresh tracker. The full sync's
        # _sync_offsets pass updates this stamp; the post-sync drift
        # check fires when the stamp ages past
        # OFFSET_DRIFT_REFRESH_SECONDS.
        self._last_offset_resync: datetime | None = None

        # Bridge API client (lazy-init from options when bridge credentials present)
        self.bridge_api_client: TadoBridgeApiClient | None = None

        # Bridge health tracking (init when bridge credentials present)
        self.bridge_health_tracker: BridgeHealthTracker | None = None
        self._bridge_first_fetch_logged: bool = False

        # Independent bridge poll task (bridge API doesn't count toward cloud quota)
        self._bridge_poll_task: asyncio.Task[None] | None = None
        self._cached_bridge_data: dict[str, object] | None = None

        # Platforms loaded during setup (used by unload to match exactly)
        self.loaded_platforms: frozenset[Platform] = frozenset()

        # HomeKit local control (optional — set by entry_lifecycle when homekit_enabled)
        self.homekit_client: HomeKitClient | None = None
        self.homekit_provider: HomeKitLocalProvider | None = None
        self.state_reconciler: StateReconciler | None = None

        # HomeKit polling optimization state
        self._last_cloud_zone_fetch: datetime | None = None
        self._last_weather_fetch: datetime | None = None
        self._prev_homekit_connected: bool = False
        self._homekit_reads_saved: int = 0
        self._homekit_writes_saved: int = 0
        self._prev_savings_remaining: int | None = None  # for reset detection

        # HomeKit write metrics (ephemeral — reset on quota reset and reconnect)
        self._homekit_write_attempts: int = 0
        self._homekit_write_successes: int = 0
        self._homekit_write_fallbacks: int = 0
        self._homekit_write_latency_sum: float = 0.0
        self._homekit_write_latency_count: int = 0

        # Write-side circuit breaker (initialized when HomeKit is enabled)
        self.write_health_tracker: WriteHealthTracker | None = None

        # Smart Valve Control — per-zone proportional offset controllers
        self.valve_controllers: dict[str, SmartValveController] = {}

        # Offset Sync — per-zone device offset controllers
        self.offset_sync_controllers: dict[str, OffsetSyncController] = {}

        # Per-zone transition locks serialize controller lifecycle changes
        # (see .kiro/specs/svc-lifecycle-hardening/ for the design).
        self._zone_transition_locks: dict[str, asyncio.Lock] = {}

        # Set by async_shutdown_valve_controllers to prevent queued transitions
        # from installing/activating controllers after shutdown begins.
        self._shutting_down: bool = False

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

    @property
    def homekit_write_metrics(self) -> dict[str, float]:
        """Return HomeKit write metrics for sensor exposure."""
        avg_latency = (
            self._homekit_write_latency_sum / self._homekit_write_latency_count
            if self._homekit_write_latency_count > 0
            else 0.0
        )
        return {
            "write_attempts": self._homekit_write_attempts,
            "write_successes": self._homekit_write_successes,
            "write_fallbacks": self._homekit_write_fallbacks,
            "write_avg_latency_ms": round(avg_latency, 1),
        }

    def _reset_write_metrics(self) -> None:
        """Reset HomeKit write metrics counters."""
        self._homekit_write_attempts = 0
        self._homekit_write_successes = 0
        self._homekit_write_fallbacks = 0
        self._homekit_write_latency_sum = 0.0
        self._homekit_write_latency_count = 0

    def publish_entity_data(self, zone_id: str, key: str, data: dict[str, Any]) -> None:
        """Publish computed entity data for cross-component consumption.

        Published data is in-memory only and does not persist across restarts.
        Consumers should handle None returns from get_entity_data() gracefully
        during the startup gap (before entities have processed their first poll).

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
                "Coordinator: detected Tado API quota reset at %s UTC from "
                "HA history",
                detected_reset.strftime("%H:%M"),
            )
            await async_update_ratelimit_reset_time(
                self.hass, detected_reset, self.home_id, self.data_loader,
            )

        # Read all data from in-memory cache (populated by api_client write-through)
        config_data = self.data_loader.get_cached("config")
        home_state_data = self.data_loader.get_cached("home_state")
        ratelimit_data = self.data_loader.get_cached("ratelimit")
        api_call_history_data: dict[str, Any] = dict(self.api_tracker._call_history) if self.api_tracker else {}
        zones_info_data = self.data_loader.get_cached("zones_info")
        mobile_devices_data = self.data_loader.get_cached("mobile_devices")

        # Periodic offset drift refresh — fire BEFORE snapshotting
        # `offsets` so the result dict carries the freshly re-fetched
        # values. See _maybe_resync_offsets for the gating logic.
        ratelimit_for_resync = ratelimit_data if isinstance(ratelimit_data, dict) else None
        await self._maybe_resync_offsets(zones_info_data, ratelimit_for_resync)

        offsets_data = self.data_loader.get_cached("offsets")
        schedules_data = self.data_loader.get_cached("schedules")
        ac_capabilities = self.data_loader.get_cached("ac_capabilities")

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

        # Bridge API data — seed on first poll so sensor platform has data at setup
        if self._cached_bridge_data is None:
            first_bridge = await self._async_fetch_bridge_data()
            if first_bridge is not None:
                self._cached_bridge_data = first_bridge
        bridge_data = self._cached_bridge_data
        # Start independent bridge poll if credentials present and not yet running
        self._ensure_bridge_poll_running()

        # Lazy-load persisted weather compensation state on first poll
        if not self._wc_state_loaded and self.config_manager.get_wc_enabled():
            raw = await self.data_loader.async_load_wc_state()
            if raw and isinstance(raw, dict):
                self._wc_state = WeatherCompensationState.from_dict(raw)
                _LOGGER.debug(
                    "Coordinator: restored persisted weather-compensation state",
                )
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
        }
        if bridge_data is not None:
            result["bridge"] = bridge_data
        if wc_data is not None:
            result["weather_compensation"] = wc_data

        # Compute zone insights once per poll so all sensors read from one
        # pre-built map, and advance insight history so duration tracking runs
        # regardless of whether the home insights sensor entity is enabled.
        # collect_zone_insights and its transitive callees read coordinator.data
        # at ~8 sites (plus coordinator.get_entity_data / heating_cycle_coordinator
        # not reachable via result dict), so we temporarily publish result as
        # self.data instead of plumbing a coord_data arg through every function.
        # Framework assigns self.data = result on return, so this just anticipates
        # that by a few lines; finally restores on any exception.
        previous_data = self.data
        self.data = result
        try:
            from .sensor_insight_collector import collect_zone_insights

            zone_insights = collect_zone_insights(
                self.hass, self,
                self._insight_anomaly_start_times,
                self._insight_humidity_histories,
            )
            result["zone_insights"] = zone_insights

            all_insights: list[Any] = []
            for insights_list in zone_insights.values():
                all_insights.extend(insights_list)
            self.insight_history.update(all_insights, dt_util.utcnow())
            # Persist insight runtime state (anomaly timers + humidity history)
            # so dashboard duration counters survive HA restarts.
            self._save_insight_runtime_state()
        finally:
            self.data = previous_data

        # State restore: Away → Home clears captured states, then detect timer expiration
        await self._handle_state_restore_updates(home_state_data, result)

        # Smart Valve Control: evaluate all active controllers after poll
        for controller in self.valve_controllers.values():
            try:
                await controller.async_evaluate()
            except Exception:
                _LOGGER.warning(
                    "Smart Valve: zone %s evaluation raised an exception — "
                    "controller will retry on next poll",
                    controller.zone_id, exc_info=True,
                )

        # Offset Sync: evaluate all active offset sync controllers after poll
        for controller_os in self.offset_sync_controllers.values():
            try:
                await controller_os.async_evaluate()
            except Exception:
                _LOGGER.warning(
                    "Offset Sync: zone %s evaluation raised an exception — "
                    "controller will retry on next poll",
                    controller_os.zone_id, exc_info=True,
                )

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
                _LOGGER.warning("Coordinator: %s", reason)
                self.update_interval = timedelta(minutes=15)
                # retry_after lets HA defer the next refresh precisely.
                reset_seconds = self._cached_ratelimit.get("reset_seconds")
                retry_after = _sanitize_retry_after(reset_seconds)
                _LOGGER.debug(
                    "Coordinator: rate-limited — deferring next refresh by %ds",
                    retry_after,
                )
                raise UpdateFailed(reason, retry_after=retry_after)

        # 2. Set adaptive interval for NEXT poll
        homekit_connected = (
            self.homekit_provider is not None
            and self.homekit_provider.is_connected
        )
        new_interval = get_polling_interval(
            self.config_manager, self._cached_ratelimit, homekit_connected=homekit_connected,
        )
        self.update_interval = timedelta(minutes=new_interval)

        # 2b. HomeKit connection transition logging
        if homekit_connected != self._prev_homekit_connected:
            if homekit_connected:
                _LOGGER.info(
                    "Coordinator: HomeKit connected — reducing cloud "
                    "polling frequency in favour of local reads",
                )
            else:
                _LOGGER.info(
                    "Coordinator: HomeKit disconnected — resuming full "
                    "cloud polling",
                )
            self._prev_homekit_connected = homekit_connected

        # 2c. Load polling-mode flags for this cycle
        do_full_sync = self._should_do_full_sync()

        # Check if this is a write-triggered refresh (zone data only)
        zone_only, force_zone_fetch = self.refresh_handler.consume_pending_flags()

        # 2d. Compute skip_zone_states / skip_weather based on config + HomeKit state
        cm = self.config_manager

        # If user explicitly set a custom polling interval, respect it —
        # fetch all data every cycle so humidity/heating power/weather stay
        # fresh at the user's chosen rate. Only use HomeKit skip logic when
        # polling is automatic (no custom interval).
        user_has_custom = (
            cm.get_custom_day_interval() is not None
            or cm.get_custom_night_interval() is not None
        )

        skip_zone_states = False
        if force_zone_fetch:
            skip_zone_states = False
        elif homekit_connected and self._last_cloud_zone_fetch is not None and not user_has_custom:
            cloud_sync_minutes = cm.get_homekit_cloud_sync_minutes()
            elapsed = (dt_util.utcnow() - self._last_cloud_zone_fetch).total_seconds() / 60
            skip_zone_states = elapsed < cloud_sync_minutes

        # Weather fetch frequency reduction when HomeKit connected.
        # Same principle as skip_zone_states: respect user's custom interval,
        # and when HomeKit is connected use the larger of the 30-min default
        # and the user's `homekit_cloud_sync_minutes` setting so the same
        # dial that throttles zone-state cloud sync also throttles weather.
        skip_weather = False
        if homekit_connected and self._last_weather_fetch is not None and not user_has_custom:
            weather_age = (dt_util.utcnow() - self._last_weather_fetch).total_seconds() / 60
            weather_floor = self._weather_skip_floor_minutes()
            skip_weather = weather_age < weather_floor

        try:
            await self.api_client.async_sync(
                quick=not do_full_sync,
                skip_zone_states=skip_zone_states,
                zone_only=zone_only,
                weather_enabled=cm.get_weather_enabled() and not skip_weather,
                mobile_devices_enabled=cm.get_mobile_devices_enabled(),
                mobile_devices_frequent_sync=cm.get_mobile_devices_frequent_sync(),
                offset_enabled=cm.get_offset_enabled(),
                home_state_sync_enabled=cm.get_home_state_sync_enabled(),
            )
        except TadoAuthError as e:
            from .repair_helpers import async_create_auth_issue

            async_create_auth_issue(self.hass, self.home_id)
            raise ConfigEntryAuthFailed(
                "Refresh token expired — user must re-authenticate",
            ) from e
        except TadoSyncError as e:
            # When HomeKit is connected we keep the entities live on
            # local data instead of raising UpdateFailed — the user
            # would otherwise see "Failed to update" on every entity
            # for a transient cloud blip.
            if self.homekit_provider and self.homekit_provider.is_connected:
                _LOGGER.warning(
                    "Coordinator: Tado cloud sync failed (%s) — keeping "
                    "entities live on HomeKit data, will retry on next poll",
                    e,
                )
            else:
                raise UpdateFailed(f"Tado CE sync failed: {e}") from e

        if do_full_sync:
            self._last_full_sync = dt_util.utcnow()
            # Full sync's _sync_offsets pass already pulled fresh offsets,
            # so the periodic drift refresh in _maybe_resync_offsets can
            # skip the next interval rather than double-fetching.
            if cm.get_offset_enabled():
                self._last_offset_resync = dt_util.utcnow()

        # Update cloud zone fetch timestamp when zoneStates was fetched
        # Reset HomeKit savings counters when API quota resets.
        # Detection: remaining jumps up significantly (e.g. 100 → 5000).
        # This mirrors api_client._calculate_live_ratelimit's reset detection.
        rl_data = self.data_loader.get_cached("ratelimit")
        if isinstance(rl_data, dict):
            current_remaining = rl_data.get("remaining")
            if (
                current_remaining is not None
                and self._prev_savings_remaining is not None
                and current_remaining > self._prev_savings_remaining + max(
                    HOMEKIT_SAVINGS_RESET_MIN_JUMP,
                    int(rl_data.get("limit", 5000) * HOMEKIT_SAVINGS_RESET_RATIO),
                )
            ):
                _LOGGER.info(
                    "Coordinator: Tado API quota reset detected "
                    "(remaining %s → %s) — zeroing HomeKit savings "
                    "counters (was reads=%s, writes=%s)",
                    self._prev_savings_remaining, current_remaining,
                    self._homekit_reads_saved, self._homekit_writes_saved,
                )
                self._homekit_reads_saved = 0
                self._homekit_writes_saved = 0
                self._reset_write_metrics()
                self._save_homekit_savings()
            self._prev_savings_remaining = current_remaining

        if not skip_zone_states:
            self._last_cloud_zone_fetch = dt_util.utcnow()
        else:
            self.record_homekit_read_saved()

        # Update weather fetch timestamp
        if not skip_weather and cm.get_weather_enabled() and not zone_only:
            self._last_weather_fetch = dt_util.utcnow()

        if was_failing:
            _LOGGER.info(
                "Coordinator: connection restored — first poll after "
                "previous failure succeeded",
            )

        # One-line poll summary so users grepping the debug log can
        # see at a glance what each cycle fetched / skipped.
        _LOGGER.debug(
            "Coordinator: poll cycle — zones=%s weather=%s homekit=%s "
            "interval=%dm full=%s",
            "skip" if skip_zone_states else "fetch",
            "skip" if skip_weather or zone_only else ("fetch" if cm.get_weather_enabled() else "off"),
            "yes" if homekit_connected else "no",
            new_interval,
            "yes" if do_full_sync else "no",
        )

        # 4. Post-sync processing: cache reads, bridge, WC, state restore
        zone_data = self.data_loader.get_cached("zones")
        weather_data = self.data_loader.get_cached("weather")
        return await self._async_post_sync_processing(zone_data, weather_data)

    async def _maybe_resync_offsets(
        self,
        zones_info_data: dict[str, Any] | list[Any] | None,
        ratelimit_data: dict[str, Any] | None,
    ) -> None:
        """Re-fetch device offsets from Tado when the cache may be stale.

        Tado's adaptive calibration can change a stored device offset
        without HA having written it (manual edit in the Tado app, or
        Tado's own learning loop). The Offset Sync controller's
        per-write readback gate only confirms what we wrote
        landed; later server-side drift goes unnoticed and the next
        evaluation calculates `desired = external - (inside - cached)`
        from the wrong baseline, which can drag the cache to ±10°C.

        This method runs from `_async_post_sync_processing` and gates a
        re-fetch on three conditions:

        1. Offset feature enabled.
        2. The drift-refresh floor has passed since the last full sync
           or drift refresh. When HomeKit is connected the floor is
           `max(OFFSET_DRIFT_REFRESH_SECONDS, homekit_cloud_sync_minutes)`
           so the user's HomeKit Cloud Refresh setting governs how
           often this fires — same dial as the zone-state cloud sync.
           When HomeKit is not connected the 30-minute floor applies
           on its own (the drift refresh is the only safety net for
           stale offsets without local data).
        3. API quota is not low (>= LOW_QUOTA_THRESHOLD remaining) —
           the readback gate keeps the cache safe even when this
           refresh is skipped, so it is fine to back off under quota
           pressure.

        Skipping in (3) is safe but not free — every minute the cache
        runs without resync is a minute the next Offset Sync evaluation
        could compute from a stale baseline. The trade-off favours not
        burning the user's last quota on a defence-in-depth refresh.
        """
        if not self.config_manager.get_offset_enabled():
            return

        if not zones_info_data or not isinstance(zones_info_data, list):
            return

        effective_floor = OFFSET_DRIFT_REFRESH_SECONDS
        homekit_connected = (
            self.homekit_provider is not None
            and self.homekit_provider.is_connected
        )
        if homekit_connected:
            hk_sync_seconds = self.config_manager.get_homekit_cloud_sync_minutes() * 60
            effective_floor = max(OFFSET_DRIFT_REFRESH_SECONDS, hk_sync_seconds)

        last = self._last_offset_resync
        if last is not None:
            age = (dt_util.utcnow() - last).total_seconds()
            if age < effective_floor:
                return

        if isinstance(ratelimit_data, dict):
            remaining = ratelimit_data.get("remaining")
            if isinstance(remaining, int) and remaining < LOW_QUOTA_THRESHOLD:
                _LOGGER.debug(
                    "Offset Sync: skipping drift refresh — Tado API quota "
                    "low (%s call(s) remaining)",
                    remaining,
                )
                return

        try:
            await self.api_client.async_resync_offsets(zones_info_data)
        except Exception:
            _LOGGER.debug(
                "Offset Sync: drift refresh fetch failed — readback gate "
                "still protects the cache, will retry next poll",
                exc_info=True,
            )
            return

        self._last_offset_resync = dt_util.utcnow()
        _LOGGER.debug(
            "Offset Sync: drift refresh complete — local cache reconciled "
            "with Tado",
        )

    async def _accumulate_outdoor_temp_history(
        self, weather_data: dict[str, Any] | list[Any] | None,
    ) -> None:
        """Accumulate outdoor temperature from weather data into history buffer.

        Appends new reading, trims to max size, and persists.
        History is eager-loaded during setup in _async_wire_and_start_coordinator().
        """
        if not weather_data:
            return
        outdoor_temp = (weather_data.get("outsideTemperature") or {}).get("celsius")  # type: ignore[union-attr]
        if outdoor_temp is None:
            return

        # Defensive guard — should already be loaded during setup, but
        # if a future refactor drops the eager load this branch keeps
        # outdoor temp history working.
        if not self._outdoor_temp_loaded:
            _LOGGER.warning(
                "Coordinator: outdoor temperature history not eagerly "
                "loaded during setup — loading now",
            )
            self._outdoor_temp_history = await self.data_loader.async_load_outdoor_temp_history()
            self._outdoor_temp_loaded = True

        prev_last = self._outdoor_temp_history[-1] if self._outdoor_temp_history else None

        self._outdoor_temp_history.append(outdoor_temp)
        if len(self._outdoor_temp_history) > OUTDOOR_TEMP_HISTORY_MAX:
            del self._outdoor_temp_history[: len(self._outdoor_temp_history) - OUTDOOR_TEMP_HISTORY_MAX]

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
                _LOGGER.debug(
                    "Heating Cycle: zone %s temperature update could not "
                    "be parsed — skipping this tick",
                    zone_id,
                )

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
            _LOGGER.info(
                "State Restore: home returned from Away — cleared all "
                "captured states so the Home schedule resumes cleanly",
            )

        self._sr_manager.on_poll_update(result)

    def _should_do_full_sync(self) -> bool:
        """Check if full sync needed (vs quick). Only on first poll after restart/reload."""
        return self._last_full_sync is None

    def _weather_skip_floor_minutes(self) -> int:
        """Weather refresh floor (in minutes) when HomeKit is connected.

        Returns the larger of `HOMEKIT_WEATHER_SKIP_MINUTES` (30) and the
        user's `homekit_cloud_sync_minutes` setting, so the same dial that
        throttles zone-state cloud sync also throttles weather. Schema
        clamps `homekit_cloud_sync_minutes` to [5, 120], so the result is
        always in [30, 120].
        """
        return max(
            HOMEKIT_WEATHER_SKIP_MINUTES,
            self.config_manager.get_homekit_cloud_sync_minutes(),
        )

    async def _async_fetch_bridge_data(self) -> dict[str, object] | None:
        """Fetch bridge API data with health tracking."""
        options = self.config_entry.options
        bridge_serial = options.get("bridge_serial", "")
        bridge_auth_key = options.get("bridge_auth_key", "")

        if not bridge_serial or not bridge_auth_key:
            self.bridge_api_client = None
            self.bridge_health_tracker = None
            return None

        # Lazy-init health tracker when bridge credentials present
        if self.bridge_health_tracker is None:
            from .bridge_health import BridgeHealthTracker as _BridgeHealthTracker

            raw = await self.data_loader.async_load_bridge_health()
            if raw and isinstance(raw, dict):
                self.bridge_health_tracker = _BridgeHealthTracker.from_dict(raw)
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
            _LOGGER.debug(
                "Bridge: API client initialised for serial %s…",
                mask_serial(bridge_serial),
            )

        try:
            start_time = time.monotonic()
            result = await self.bridge_api_client.async_get_wiring_state()
            elapsed_ms = (time.monotonic() - start_time) * 1000
            self.bridge_health_tracker.record_success(elapsed_ms)
            self.data_loader.save_bridge_health(self.bridge_health_tracker.to_dict())

            if not self._bridge_first_fetch_logged:
                from .bridge_discovery import flatten_response

                fields = flatten_response(result)
                _LOGGER.debug(
                    "Bridge: first fetch OK (%.0fms, %d field(s))",
                    elapsed_ms, len(fields),
                )
                self._bridge_first_fetch_logged = True

            return result
        except TadoBridgeApiError as e:
            self.bridge_health_tracker.record_failure(str(e))
            self.data_loader.save_bridge_health(self.bridge_health_tracker.to_dict())
            _LOGGER.debug(
                "Bridge: fetch failed (%s) — cloud data unaffected",
                e,
            )
            return None

    def _ensure_bridge_poll_running(self) -> None:
        """Start the independent bridge poll loop if credentials are present.

        Bridge API uses its own auth key and does NOT count toward the
        Tado cloud API quota, so it runs on a fixed interval independent
        of the main coordinator polling cycle.
        """
        if self._bridge_poll_task is not None and not self._bridge_poll_task.done():
            return  # already running
        options = self.config_entry.options
        if not options.get("bridge_serial", "") or not options.get("bridge_auth_key", ""):
            return  # no credentials
        self._bridge_poll_task = asyncio.create_task(self._async_bridge_poll_loop())

    async def _async_bridge_poll_loop(self) -> None:
        """Poll bridge API on a fixed interval, independent of coordinator cycle.

        Updates cached bridge data and notifies entity listeners so bridge
        sensors (boiler flow temperature, wiring state, etc.) stay fresh
        regardless of the cloud polling interval.
        """
        # Initial fetch immediately (don't wait for first interval)
        try:
            bridge_data = await self._async_fetch_bridge_data()
            if bridge_data is not None:
                self._cached_bridge_data = bridge_data
                self._update_bridge_in_coordinator_data()
        except asyncio.CancelledError:
            raise
        except Exception:
            _LOGGER.debug(
                "Bridge: initial fetch failed — will retry on the next "
                "bridge poll cycle",
            )

        while True:
            await asyncio.sleep(BRIDGE_POLL_INTERVAL_SECONDS)
            try:
                bridge_data = await self._async_fetch_bridge_data()
                if bridge_data is not None:
                    self._cached_bridge_data = bridge_data
                    self._update_bridge_in_coordinator_data()
            except asyncio.CancelledError:
                raise
            except Exception:
                _LOGGER.debug(
                    "Bridge: fetch failed — will retry on the next "
                    "bridge poll cycle",
                )

    def _update_bridge_in_coordinator_data(self) -> None:
        """Update bridge data in coordinator.data and notify listeners.

        Writes the cached bridge data into the coordinator's data dict
        so bridge sensors pick it up on their next _handle_coordinator_update.
        """
        if self.data is None or self._cached_bridge_data is None:
            return
        self.data["bridge"] = self._cached_bridge_data
        self.async_update_listeners()

    async def cancel_bridge_poll(self) -> None:
        """Cancel the independent bridge poll task."""
        if self._bridge_poll_task is not None:
            self._bridge_poll_task.cancel()
            with contextlib.suppress(asyncio.CancelledError):
                await self._bridge_poll_task
            self._bridge_poll_task = None

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
        """Mark `entity_id` as having a recent API call (for the freshness gate)."""
        async with self._freshness_lock:
            self.entity_freshness[entity_id] = time.monotonic()
            _LOGGER.debug("Coordinator: marked %s fresh", entity_id)

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
        """Return the next monotonic sequence number, wrapping safely at sys.maxsize."""
        self._global_sequence += 1
        if self._global_sequence >= sys.maxsize:
            _LOGGER.debug(
                "Coordinator: optimistic-update sequence reached "
                "sys.maxsize — wrapping back to 0",
            )
            self._global_sequence = 0
        return self._global_sequence

    async def _cleanup_entity_freshness(self) -> None:
        """Drop freshness entries older than the expiry window."""
        async with self._freshness_lock:
            now = time.monotonic()
            expired = [eid for eid, timestamp in self.entity_freshness.items() if now - timestamp > ENTITY_FRESHNESS_EXPIRY_SECONDS]
            for eid in expired:
                del self.entity_freshness[eid]
            if expired:
                _LOGGER.debug(
                    "Coordinator: cleaned up %d expired entity freshness "
                    "entry(ies)",
                    len(expired),
                )




    def save_wc_state_if_loaded(self) -> None:
        """Persist weather compensation state if it was loaded."""
        if self._wc_state_loaded:
            self.data_loader.save_wc_state(self._wc_state.to_dict())

    def _save_homekit_savings(self) -> None:
        """Persist HomeKit API savings counters (debounced via Store)."""
        self.data_loader.save_homekit_savings({
            "reads_saved": self._homekit_reads_saved,
            "writes_saved": self._homekit_writes_saved,
            "prev_remaining": self._prev_savings_remaining,
        })

    @property
    def homekit_reads_saved(self) -> int:
        """Return the number of HomeKit reads saved today."""
        return self._homekit_reads_saved

    @property
    def homekit_writes_saved(self) -> int:
        """Return the number of HomeKit writes saved today."""
        return self._homekit_writes_saved

    def record_homekit_read_saved(self) -> None:
        """Record one HomeKit read saving and persist."""
        self._homekit_reads_saved += 1
        self._save_homekit_savings()

    def record_homekit_write_saved(self, zone_id: str | None = None) -> None:
        """Record one HomeKit write saving, update reconciler, and persist.

        Args:
            zone_id: Zone ID for state reconciler tracking (optional).
        """
        self._homekit_writes_saved += 1
        if zone_id and self.state_reconciler:
            self.state_reconciler.record_local_write(zone_id)
        self._save_homekit_savings()

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

    async def async_peek_state(
        self, zone_id: str, entity_type: str,
    ) -> CapturedState | None:
        """Read captured state without consuming (null-safe).

        Used so the caller can attempt the cloud API write first and only
        clear the captured entry once the write succeeds.
        """
        if self._sr_manager is None:
            return None
        return await self._sr_manager.peek(zone_id, entity_type)

    async def async_clear_captured_state(
        self, zone_id: str, entity_type: str,
    ) -> None:
        """Clear a captured entry (null-safe)."""
        if self._sr_manager is None:
            return
        await self._sr_manager.clear(zone_id, entity_type)

    def get_state_restore_diagnostics(self) -> list[dict[str, str]]:
        """Return state restore diagnostics summary (null-safe)."""
        if self._sr_manager is None:
            return []
        return self._sr_manager.get_diagnostics_summary()

    # ------------------------------------------------------------------
    # Insight runtime state persistence (anomaly timers + humidity history)
    # ------------------------------------------------------------------

    def _serialize_insight_runtime_state(self) -> dict[str, Any]:
        """Build JSON-safe dict for persistence."""
        return {
            "saved_at": dt_util.utcnow().isoformat(),
            "version": 1,
            "anomaly_start_times": {
                zone_id: ts.isoformat() if ts is not None else None
                for zone_id, ts in self._insight_anomaly_start_times.items()
            },
            # Humidity samples are plain floats — JSON round-trips cleanly.
            "humidity_histories": {
                zone_id: list(samples)
                for zone_id, samples in self._insight_humidity_histories.items()
            },
        }

    def _save_insight_runtime_state(self) -> None:
        """Schedule debounced save of insight runtime dicts."""
        from .const import INSIGHT_RUNTIME_STATE_KEY

        try:
            self.data_loader.save_auxiliary(
                INSIGHT_RUNTIME_STATE_KEY,
                self._serialize_insight_runtime_state(),
            )
        except (OSError, ValueError, TypeError) as e:
            _LOGGER.warning(
                "Coordinator: could not schedule insight runtime save "
                "(%s) — anomaly timers and humidity history will be "
                "kept in memory only this cycle",
                e,
            )

    async def async_load_insight_runtime_state(self) -> None:
        """Restore insight runtime dicts from DataLoader auxiliary.

        Called during coordinator setup before the first poll. On missing
        file, corrupt data, or version mismatch, starts with empty dicts.
        """
        from .const import INSIGHT_RUNTIME_STATE_KEY
        from .helpers import parse_iso_datetime

        try:
            data = await self.data_loader.async_load_auxiliary(INSIGHT_RUNTIME_STATE_KEY)
        except (OSError, ValueError) as e:
            _LOGGER.debug(
                "Coordinator: no insight runtime state to restore (%s) — "
                "starting fresh",
                e,
            )
            return

        if not isinstance(data, dict):
            _LOGGER.debug(
                "Coordinator: insight runtime state is not a dict — "
                "starting fresh",
            )
            return

        if data.get("version") != 1:
            _LOGGER.debug(
                "Coordinator: insight runtime state version %s does not "
                "match expected 1 — starting fresh",
                data.get("version"),
            )
            return

        # Restore anomaly start times
        raw_anomalies = data.get("anomaly_start_times") or {}
        if isinstance(raw_anomalies, dict):
            for zone_id, iso_str in raw_anomalies.items():
                if not isinstance(iso_str, str):
                    continue
                try:
                    parsed = parse_iso_datetime(iso_str)
                    if parsed is not None:
                        self._insight_anomaly_start_times[str(zone_id)] = parsed
                except (ValueError, TypeError):
                    continue

        # Restore humidity histories
        raw_histories = data.get("humidity_histories") or {}
        if isinstance(raw_histories, dict):
            for zone_id, samples in raw_histories.items():
                if isinstance(samples, list):
                    # Filter to numeric samples only (defensive)
                    self._insight_humidity_histories[str(zone_id)] = [
                        float(s) for s in samples
                        if isinstance(s, (int, float))
                    ]

        _LOGGER.debug(
            "Coordinator: restored insight runtime state — %d anomaly "
            "timer(s), %d humidity history(ies)",
            len(self._insight_anomaly_start_times),
            len(self._insight_humidity_histories),
        )

    async def async_shutdown_insight_state(self) -> None:
        """Persist insight runtime state synchronously during integration unload.

        The debouncer may not fire before the Store is torn down on
        shutdown, so we use async_update_store to write directly.
        """
        from .const import INSIGHT_RUNTIME_STATE_KEY

        try:
            await self.data_loader.async_update_store(
                INSIGHT_RUNTIME_STATE_KEY,
                self._serialize_insight_runtime_state(),
            )
        except (OSError, ValueError, TypeError) as e:
            _LOGGER.warning(
                "Coordinator: could not flush insight runtime state on "
                "shutdown (%s) — anomaly timers and humidity history may "
                "be lost across this restart",
                e,
            )

    async def async_shutdown_state_restore(self) -> None:
        """Persist and shut down state restore manager (null-safe)."""
        if self._sr_manager is not None:
            await self._sr_manager.async_shutdown()

    # ------------------------------------------------------------------
    # Smart Valve Control lifecycle
    # ------------------------------------------------------------------

    async def async_init_valve_controllers(self) -> None:
        """Spin up the per-zone valve and offset-sync controllers from svc_mode."""
        from .offset_sync_controller import OffsetSyncController
        from .valve_controller import SmartValveController

        zones_info = self.data_loader.get_cached("zones_info")
        if not zones_info or not isinstance(zones_info, list):
            _LOGGER.warning(
                "Smart Valve: Tado zone data not loaded yet — controllers "
                "will be set up on the next successful poll",
            )
            return

        _LOGGER.debug(
            "Smart Valve: checking %d zone(s) for eligible controllers",
            len(zones_info),
        )
        initialized_count = 0

        for zone in zones_info:
            zone_id = str(zone.get("id", ""))
            zone_type = zone.get("type", "")

            if zone_type != "HEATING":
                continue

            config = self.zone_config_manager.get_zone_config(zone_id)
            svc_mode = config.get("svc_mode", "off")
            ext_sensor = config.get("external_temp_sensor", "")

            if svc_mode == "off":
                continue

            if not ext_sensor:
                _LOGGER.info(
                    "Smart Valve: zone %s is set to %s mode but has no "
                    "external sensor selected — pick a sensor in Zone "
                    "Configuration to enable Smart Valve Control",
                    zone_id, svc_mode,
                )
                continue

            if svc_mode == "valve_target":
                controller = SmartValveController(self.hass, self, zone_id)
                await controller.async_activate()
                self.valve_controllers[zone_id] = controller
                initialized_count += 1
                _LOGGER.debug(
                    "Smart Valve: zone %s valve_target controller activated",
                    zone_id,
                )
            elif svc_mode == "offset_sync":
                controller_os = OffsetSyncController(self.hass, self, zone_id)
                await controller_os.async_activate()
                self.offset_sync_controllers[zone_id] = controller_os
                initialized_count += 1
                _LOGGER.debug(
                    "Offset Sync: zone %s controller activated",
                    zone_id,
                )

        _LOGGER.info(
            "Smart Valve: %d controller(s) activated", initialized_count,
        )

        self.zone_config_manager.add_listener(self._on_zone_config_change)

    async def async_shutdown_valve_controllers(self) -> None:
        """Deactivate and clean up all valve and offset sync controllers.

        Sets `_shutting_down` so any queued/in-flight `_transition` tasks
        bail out before touching controller dicts — preventing zombie
        controllers that would outlive the shutdown sequence.
        """
        self._shutting_down = True

        for zone_id, controller in list(self.valve_controllers.items()):
            try:
                await controller.async_deactivate()
            except Exception:
                _LOGGER.warning(
                    "Smart Valve: error deactivating controller for zone %s",
                    zone_id, exc_info=True,
                )
        self.valve_controllers.clear()

        for zone_id, controller_os in list(self.offset_sync_controllers.items()):
            try:
                await controller_os.async_deactivate()
            except Exception:
                _LOGGER.warning(
                    "Offset Sync: error deactivating controller for zone %s",
                    zone_id, exc_info=True,
                )
        self.offset_sync_controllers.clear()

    def _on_zone_config_change(self, zone_id: str, key: str, value: Any) -> None:
        """Activate / deactivate per-zone controllers when the user changes config.

        Reacts to `svc_mode` and `external_temp_sensor` key changes.
        All dict mutation runs inside a per-zone lock via the inner
        `_transition()` task so two rapid callbacks serialise instead
        of racing on pop / install.
        """
        if key not in ("svc_mode", "external_temp_sensor"):
            return

        from .const import SVC_MODE_OFFSET_SYNC, SVC_MODE_VALVE_TARGET

        # Snapshot the user's intent synchronously so each scheduled
        # `_transition` carries the config state from its triggering
        # callback — not whatever's in config when the task eventually
        # runs (which could be a later, conflicting change).
        config = self.zone_config_manager.get_zone_config(zone_id)
        current_mode: str = (
            str(value) if key == "svc_mode" else config.get("svc_mode", "off")
        )
        ext_sensor: str = (
            str(value) if key == "external_temp_sensor" else config.get("external_temp_sensor", "")
        )

        zones_info = self.data_loader.get_cached("zones_info")
        if zones_info and isinstance(zones_info, list):
            zone_type = next(
                (z.get("type") for z in zones_info if str(z.get("id")) == zone_id),
                None,
            )
            if zone_type != "HEATING":
                _LOGGER.warning(
                    "Smart Valve: zone %s is a %s zone — Smart Valve "
                    "Control only works with heating zones (with TRVs), "
                    "skipping config change",
                    zone_id, zone_type,
                )
                return

        async def _transition() -> None:
            # Two-phase shutdown check: once before queueing for the
            # lock, once after acquiring it. A shutdown that begins
            # while this task was queued must not allow activation
            # after the shutdown sequence runs.
            if self._shutting_down:
                return
            lock = self._zone_transition_locks.setdefault(zone_id, asyncio.Lock())
            async with lock:
                if self._shutting_down:
                    return

                # Mutate the controller dicts inside the lock so a
                # second concurrent transition cannot race on
                # pop / install.
                old_valve = self.valve_controllers.pop(zone_id, None)
                old_offset = self.offset_sync_controllers.pop(zone_id, None)

                if old_valve:
                    _LOGGER.debug(
                        "Smart Valve: deactivating zone %s valve_target "
                        "controller before config change",
                        zone_id,
                    )
                    try:
                        await old_valve.async_deactivate()
                    except Exception:
                        _LOGGER.warning(
                            "Smart Valve: zone %s deactivation raised an "
                            "exception — controller may not have shut "
                            "down cleanly",
                            zone_id, exc_info=True,
                        )

                if old_offset:
                    if current_mode == SVC_MODE_VALVE_TARGET:
                        _LOGGER.warning(
                            "Smart Valve: zone %s switching from "
                            "offset_sync to valve_target — any non-zero "
                            "device offset still on the TRV may cause "
                            "double compensation. Reset the offset to 0 "
                            "via the set_temperature_offset service if "
                            "you see overshoot.",
                            zone_id,
                        )
                    _LOGGER.debug(
                        "Offset Sync: deactivating zone %s controller "
                        "before config change",
                        zone_id,
                    )
                    try:
                        await old_offset.async_deactivate()
                    except Exception:
                        _LOGGER.warning(
                            "Offset Sync: zone %s deactivation raised an "
                            "exception — controller may not have shut "
                            "down cleanly",
                            zone_id, exc_info=True,
                        )

                new_controller: Any = None
                if current_mode == SVC_MODE_VALVE_TARGET:
                    if not ext_sensor:
                        _LOGGER.info(
                            "Smart Valve: zone %s set to valve_target "
                            "mode but no external sensor — skipping "
                            "activation",
                            zone_id,
                        )
                        self._raise_sensor_missing_repair(zone_id, current_mode)
                    else:
                        from .valve_controller import SmartValveController

                        self._clear_sensor_missing_repair(zone_id)
                        new_controller = SmartValveController(self.hass, self, zone_id)
                        self.valve_controllers[zone_id] = new_controller

                elif current_mode == SVC_MODE_OFFSET_SYNC:
                    if not ext_sensor:
                        _LOGGER.info(
                            "Offset Sync: zone %s set to offset_sync mode "
                            "but no external sensor — skipping activation",
                            zone_id,
                        )
                        self._raise_sensor_missing_repair(zone_id, current_mode)
                    else:
                        from .offset_sync_controller import OffsetSyncController

                        self._clear_sensor_missing_repair(zone_id)
                        new_controller = OffsetSyncController(self.hass, self, zone_id)
                        self.offset_sync_controllers[zone_id] = new_controller

                else:
                    # svc_mode is "off" or unknown — no new controller,
                    # but clear any stale repair issue for this zone.
                    self._clear_sensor_missing_repair(zone_id)

                if new_controller:
                    await new_controller.async_activate()
                    _LOGGER.info(
                        "Smart Valve: zone %s %s controller activated",
                        zone_id, current_mode,
                    )

        self.hass.async_create_task(_transition())

    def _raise_sensor_missing_repair(self, zone_id: str, mode: str) -> None:
        """Surface an HA repair notification when the user's zone has no external sensor.

        The repair is idempotent — HA's issue registry updates an
        existing issue with the same id rather than duplicating it.
        """
        try:
            from homeassistant.helpers import issue_registry as ir

            zones_info_raw = self.data_loader.get_cached("zones_info")
            zones_info = zones_info_raw if isinstance(zones_info_raw, list) else []
            zone_name = next(
                (z.get("name", f"Zone {zone_id}") for z in zones_info
                 if str(z.get("id")) == zone_id),
                f"Zone {zone_id}",
            )

            ir.async_create_issue(
                self.hass,
                DOMAIN,
                f"svc_sensor_missing_{zone_id}",
                is_fixable=False,
                severity=ir.IssueSeverity.WARNING,
                translation_key="svc_sensor_missing",
                translation_placeholders={
                    "zone_name": zone_name,
                    "mode": mode,
                },
            )
        except Exception:
            _LOGGER.debug(
                "Coordinator: could not raise sensor-missing repair for "
                "zone %s — HA issue registry call failed",
                zone_id, exc_info=True,
            )

    def _clear_sensor_missing_repair(self, zone_id: str) -> None:
        """Drop the sensor-missing repair notification for one zone."""
        try:
            from homeassistant.helpers import issue_registry as ir

            ir.async_delete_issue(
                self.hass,
                DOMAIN,
                f"svc_sensor_missing_{zone_id}",
            )
        except Exception:
            _LOGGER.debug(
                "Coordinator: could not clear sensor-missing repair for "
                "zone %s — HA issue registry call failed",
                zone_id, exc_info=True,
            )

