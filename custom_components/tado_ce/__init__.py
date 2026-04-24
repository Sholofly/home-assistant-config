"""Tado CE Integration — platform setup, entry lifecycle, multi-home support."""

from __future__ import annotations

import logging
from typing import TYPE_CHECKING, Any

from homeassistant.const import Platform
from homeassistant.exceptions import ConfigEntryNotReady
import homeassistant.helpers.config_validation as cv

from .config_manager import ConfigurationManager
from .const import (
    DATA_DIR,
    DOMAIN,
    SERVICE_ACTIVATE_OPEN_WINDOW,
    SERVICE_ADD_METER_READING,
    SERVICE_DEACTIVATE_OPEN_WINDOW,
    SERVICE_GET_TEMP_OFFSET,
    SERVICE_IDENTIFY_DEVICE,
    SERVICE_RESTORE_PREVIOUS_STATE,
    SERVICE_RESUME_SCHEDULE,
    SERVICE_SET_AWAY_CONFIG,
    SERVICE_SET_CLIMATE_TIMER,
    SERVICE_SET_OPEN_WINDOW_MODE,
    SERVICE_SET_TEMP_OFFSET,
    SERVICE_SET_WATER_HEATER_TIMER,
)
from .coordinator import TadoDataUpdateCoordinator
from .data_loader import DataLoader
from .exceptions import TadoAuthError
from .migration import (
    async_migrate_entry as async_migrate_entry,
)
from .services import _async_register_services
from .zone_config_manager import ZoneConfigManager

if TYPE_CHECKING:
    from homeassistant.config_entries import ConfigEntry
    from homeassistant.core import HomeAssistant
    from homeassistant.helpers import device_registry as dr

_LOGGER = logging.getLogger(__name__)

CONFIG_SCHEMA = cv.config_entry_only_config_schema(DOMAIN)

BASE_PLATFORMS = [
    Platform.SENSOR,
    Platform.CLIMATE,
    Platform.BINARY_SENSOR,
    Platform.WATER_HEATER,
    Platform.DEVICE_TRACKER,
    Platform.SWITCH,
    Platform.BUTTON,
    Platform.SELECT,
    Platform.NUMBER,
]
CALENDAR_PLATFORM = Platform.CALENDAR


async def async_setup(hass: HomeAssistant, config: dict[str, Any]) -> bool:
    """Set up the Tado CE component."""
    await _async_register_services(hass)
    return True


async def _async_init_data_layer(
    hass: HomeAssistant,
    entry: ConfigEntry,
    config_manager: ConfigurationManager,
    home_id: str | None,
) -> tuple[DataLoader, ZoneConfigManager, str, int, dict[str, Any]]:
    """Initialize data layer: loader, zone config, overlay/timer, and entry components.

    Returns (data_loader, zone_config_manager, overlay_mode, timer_duration, components).
    """
    data_loader = DataLoader(home_id or "default", hass=hass)
    await hass.async_add_executor_job(data_loader.load_all_to_cache)

    zone_config_manager = ZoneConfigManager(hass, home_id or "default", data_loader)
    await zone_config_manager.async_load()
    _LOGGER.info("Zone config manager initialized with %d zones", len(zone_config_manager.zones))

    overlay_mode = await data_loader.async_load_overlay_mode()
    _LOGGER.debug("Tado CE: Overlay mode loaded: %s", overlay_mode)

    timer_duration = await data_loader.async_load_timer_duration()
    _LOGGER.debug("Tado CE: Timer duration loaded: %d minutes", timer_duration)

    from .entry_lifecycle import async_create_entry_components

    try:
        components = await async_create_entry_components(
            hass, entry, config_manager, home_id, data_loader=data_loader,
        )
    except TadoAuthError as err:
        raise ConfigEntryNotReady(
            "Authentication failed during setup — check credentials",
        ) from err
    except (OSError, TimeoutError) as err:
        raise ConfigEntryNotReady(
            "Failed to create entry components — will retry",
        ) from err

    return data_loader, zone_config_manager, overlay_mode, timer_duration, components


async def _async_init_optional_components(
    hass: HomeAssistant,
    config_manager: ConfigurationManager,
    data_loader: DataLoader,
    zone_config_manager: ZoneConfigManager,
    components: dict[str, Any],
    home_id: str | None,
) -> dict[str, Any]:
    """Initialize optional per-entry components.

    Returns dict with smart_comfort_manager, heating_cycle_coordinator,
    adaptive_preheat_manager, state_restore_manager.
    """
    from .setup_entry_helpers import (
        async_init_adaptive_preheat,
        async_init_heating_cycle,
        async_init_smart_comfort,
        async_init_state_restore,
    )

    return {
        "smart_comfort_manager": await async_init_smart_comfort(
            hass, data_loader, config_manager, home_id,
        ),
        "heating_cycle_coordinator": await async_init_heating_cycle(
            hass, config_manager, home_id,
        ),
        "adaptive_preheat_manager": await async_init_adaptive_preheat(
            hass, config_manager,
            api_client=components["api_client"],
            data_loader=data_loader,
            zone_config_manager=zone_config_manager,
        ),
        "state_restore_manager": await async_init_state_restore(
            hass, config_manager, data_loader,
        ),
    }


async def _async_wire_and_start_coordinator(
    hass: HomeAssistant,
    entry: ConfigEntry,
    coordinator: TadoDataUpdateCoordinator,
    optional: dict[str, Any],
    overlay_mode: str,
    timer_duration: int,
    home_id: str | None,
) -> None:
    """Wire back-references, load caches, and perform first refresh."""
    if optional["adaptive_preheat_manager"] is not None:
        optional["adaptive_preheat_manager"].set_coordinator(coordinator)
    if optional["state_restore_manager"] is not None:
        optional["state_restore_manager"].set_coordinator(coordinator)

    if optional["heating_cycle_coordinator"]:
        from .setup_entry_helpers import schedule_heating_cycle_timeouts

        schedule_heating_cycle_timeouts(hass, coordinator, optional["heating_cycle_coordinator"])

    coordinator.overlay_mode = overlay_mode
    coordinator.timer_duration = timer_duration

    from .setup_entry_helpers import async_load_insight_history

    await async_load_insight_history(coordinator)
    await coordinator.async_config_entry_first_refresh()

    zones_info = coordinator.data.get("zones_info") or []
    if zones_info:
        from .setup_entry_helpers import register_bridge_devices

        register_bridge_devices(hass, entry.entry_id, zones_info)

    entry.runtime_data = coordinator
    _LOGGER.info("Coordinator stored for entry %s (home_id=%s)", entry.entry_id, home_id)


async def _async_finalize_entry(
    hass: HomeAssistant,
    entry: ConfigEntry,
    coordinator: TadoDataUpdateCoordinator,
    config_manager: ConfigurationManager,
) -> None:
    """Load platforms, register services, and set up update listener."""
    platforms_to_load = list(BASE_PLATFORMS)
    if CALENDAR_PLATFORM and config_manager.get_schedule_calendar_enabled():
        platforms_to_load.append(CALENDAR_PLATFORM)
        _LOGGER.info("Tado CE: Schedule Calendar enabled")

    await hass.config_entries.async_forward_entry_setups(entry, platforms_to_load)
    coordinator.loaded_platforms = frozenset(platforms_to_load)

    if not hass.services.has_service(DOMAIN, SERVICE_SET_CLIMATE_TIMER):
        await _async_register_services(hass)

    _last_options_snapshot[entry.entry_id] = dict(entry.options)
    entry.async_on_unload(entry.add_update_listener(async_reload_entry))


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up Tado CE from a config entry."""
    _LOGGER.info(
        "=== Tado CE Setup Start ===\n  Entry ID: %s\n  Entry version: %s\n  Entry data: %s",
        entry.entry_id,
        entry.version,
        entry.data,
    )

    from .setup_entry_helpers import async_log_file_system_state

    await async_log_file_system_state(hass)

    # Check for duplicate entries and remove old ones
    from .migration import async_deduplicate_entries

    should_continue = await async_deduplicate_entries(hass, entry)
    if not should_continue:
        return False

    # Ensure data directory exists
    def _ensure_data_dir() -> None:
        try:
            DATA_DIR.mkdir(parents=True, exist_ok=True)
        except Exception:
            _LOGGER.exception("Failed to create DATA_DIR")

    await hass.async_add_executor_job(_ensure_data_dir)

    config_manager = ConfigurationManager(entry, hass)
    _LOGGER.info("Configuration loaded: %s", config_manager.get_all_config())

    home_id = entry.data.get("home_id")

    # Cancel old coordinator's polling on reload
    old_coordinator = getattr(entry, "runtime_data", None)
    if isinstance(old_coordinator, TadoDataUpdateCoordinator):
        _LOGGER.warning("Tado CE: Entry %s already setup, cancelling old coordinator", entry.entry_id)

    # Initialize data layer and entry components
    data_loader, zone_config_manager, overlay_mode, timer_duration, components = (
        await _async_init_data_layer(hass, entry, config_manager, home_id)
    )

    # Check if per-home config file exists
    from .const import get_data_file

    _config_path = get_data_file("config", home_id) if home_id else (DATA_DIR / "config.json")
    config_exists = await hass.async_add_executor_job(_config_path.exists)
    if not config_exists:
        _LOGGER.warning(
            "Tado CE config file not found for home %s. "
            "Use Settings > Devices & Services > Add Integration > Tado CE to authenticate.",
            home_id or "default",
        )

    # Initialize optional per-entry components
    optional = await _async_init_optional_components(
        hass, config_manager, data_loader, zone_config_manager, components, home_id,
    )

    coordinator = TadoDataUpdateCoordinator(
        hass,
        entry,
        config_manager=config_manager,
        zone_config_manager=zone_config_manager,
        data_loader=data_loader,
        api_client=components["api_client"],
        api_tracker=components["api_tracker"],
        smart_comfort_manager=optional["smart_comfort_manager"],
        heating_cycle_coordinator=optional["heating_cycle_coordinator"],
        adaptive_preheat_manager=optional["adaptive_preheat_manager"],
        state_restore_manager=optional["state_restore_manager"],
    )

    await _async_wire_and_start_coordinator(
        hass, entry, coordinator, optional, overlay_mode, timer_duration, home_id,
    )

    await _async_finalize_entry(hass, entry, coordinator, config_manager)

    _LOGGER.info("Tado CE: Integration loaded successfully")
    return True


# Tracks options per entry to distinguish real options changes from data-only mutations
_last_options_snapshot: dict[str, dict[str, Any]] = {}


# Keys that take effect at runtime via config_manager real-time reads.
# Changes to ONLY these keys skip the full integration reload.
_RUNTIME_ONLY_KEYS: frozenset[str] = frozenset({"test_mode_enabled", "quota_reserve_enabled"})


async def async_reload_entry(hass: HomeAssistant, entry: ConfigEntry) -> None:
    """Reload config entry when options actually change.

    HA's add_update_listener fires for ANY ConfigEntry mutation — including
    data-only changes like refresh token rotation. We compare the current
    options against the snapshot taken at setup to skip unnecessary reloads.

    Runtime-only keys (test_mode_enabled, quota_reserve_enabled) are read
    in real-time by config_manager, so changes to ONLY those keys skip
    the expensive full reload.
    """
    prev_options = _last_options_snapshot.get(entry.entry_id)
    current_options = dict(entry.options)

    if prev_options is not None and prev_options == current_options:
        _LOGGER.debug("Tado CE: Entry data updated (e.g. token rotation) — skipping reload")
        return

    _last_options_snapshot[entry.entry_id] = current_options

    # Determine which keys actually changed
    changed_keys: set[str] = set()
    if prev_options is not None:
        all_keys = set(prev_options) | set(current_options)
        for key in all_keys:
            if prev_options.get(key) != current_options.get(key):
                changed_keys.add(key)

    # If ONLY runtime-only keys changed, skip full reload
    if changed_keys and changed_keys <= _RUNTIME_ONLY_KEYS:
        _LOGGER.info(
            "Tado CE: Runtime-only options changed (%s) — skipping reload",
            ", ".join(sorted(changed_keys)),
        )
        return

    _LOGGER.info("Tado CE: Options changed, reloading integration...")

    from .entity_cleanup import cleanup_disabled_feature_entities
    from .migration import async_handle_test_mode_transition

    try:
        cleanup_disabled_feature_entities(hass, entry)
    except (KeyError, TypeError, ValueError) as e:
        _LOGGER.warning("Tado CE: Could not cleanup entities: %s", e)

    try:
        await async_handle_test_mode_transition(hass, entry)
    except (KeyError, TypeError, ValueError) as e:
        _LOGGER.debug("Tado CE: Could not check Test Mode transition: %s", e)

    await hass.config_entries.async_reload(entry.entry_id)


async def _async_shutdown_coordinator(coordinator: TadoDataUpdateCoordinator) -> None:
    """Shut down coordinator: cancel tasks, persist state, save history."""
    if hasattr(coordinator, "refresh_handler") and coordinator.refresh_handler:
        coordinator.refresh_handler.cancel()
        coordinator.refresh_handler = None  # type: ignore[assignment]
        _LOGGER.debug("Cleaned up coordinator RefreshHandler")

    coordinator.action_debouncer.cancel_all()
    coordinator.refresh_coalescer.cancel()
    await coordinator.device_sync_queue.shutdown()
    _LOGGER.debug("Cleaned up write optimization components")

    if hasattr(coordinator, "insight_history"):
        await coordinator.insight_history.async_save()

    await coordinator.async_shutdown_state_restore()
    coordinator.save_wc_state_if_loaded()

    if coordinator.api_tracker:
        await coordinator.api_tracker.async_save_if_dirty()


def _unregister_all_services(hass: HomeAssistant) -> None:
    """Unregister all Tado CE services (called when last entry unloads)."""
    for service_name in (
        SERVICE_SET_CLIMATE_TIMER,
        SERVICE_SET_WATER_HEATER_TIMER,
        SERVICE_RESUME_SCHEDULE,
        SERVICE_SET_TEMP_OFFSET,
        SERVICE_GET_TEMP_OFFSET,
        SERVICE_ADD_METER_READING,
        SERVICE_IDENTIFY_DEVICE,
        SERVICE_SET_AWAY_CONFIG,
        SERVICE_ACTIVATE_OPEN_WINDOW,
        SERVICE_DEACTIVATE_OPEN_WINDOW,
        SERVICE_SET_OPEN_WINDOW_MODE,
        SERVICE_RESTORE_PREVIOUS_STATE,
    ):
        if hass.services.has_service(DOMAIN, service_name):
            hass.services.async_remove(DOMAIN, service_name)
    _LOGGER.debug("Unregistered all services (last entry unloaded)")


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Unload a config entry."""
    _LOGGER.info("Tado CE: Unloading entry %s...", entry.entry_id)

    coordinator: TadoDataUpdateCoordinator | None = getattr(entry, "runtime_data", None)

    if coordinator:
        await _async_shutdown_coordinator(coordinator)

    from .entry_lifecycle import async_cleanup_entry_components

    await async_cleanup_entry_components(hass, coordinator)

    # Determine platforms to unload
    config_manager = getattr(coordinator, "config_manager", None) if coordinator else None
    platforms_to_unload = list(BASE_PLATFORMS)
    if coordinator and hasattr(coordinator, "loaded_platforms"):
        platforms_to_unload = list(coordinator.loaded_platforms)
    elif CALENDAR_PLATFORM and config_manager and config_manager.get_schedule_calendar_enabled():
        platforms_to_unload.append(CALENDAR_PLATFORM)

    unload_ok = await hass.config_entries.async_unload_platforms(entry, platforms_to_unload)

    # Unregister services if this is the last entry
    other_entries = [e for e in hass.config_entries.async_entries(DOMAIN) if e.entry_id != entry.entry_id]
    if len(other_entries) == 0:
        _unregister_all_services(hass)

    _last_options_snapshot.pop(entry.entry_id, None)

    _LOGGER.info("Tado CE: Entry %s unloaded successfully", entry.entry_id)
    return unload_ok


async def async_remove_config_entry_device(
    hass: HomeAssistant,
    config_entry: ConfigEntry,
    device_entry: dr.DeviceEntry,
) -> bool:
    """Allow removal of stale devices from the device registry.

    Returns True if the device can be safely removed (i.e., it no longer
    corresponds to an active zone, bridge, or schedule in the Tado system).
    The Hub device is never removable while the config entry exists.
    """
    coordinator: TadoDataUpdateCoordinator | None = getattr(config_entry, "runtime_data", None)
    if coordinator is None:
        return False

    home_id = str(coordinator.home_id)

    # Hub device — never removable while entry exists
    hub_identifier = f"tado_ce_hub_{home_id}" if home_id != "unknown" else "tado_ce_hub"
    if (DOMAIN, hub_identifier) in device_entry.identifiers:
        return False

    # Zone devices — removable if zone no longer exists
    zones_info = coordinator.data.get("zones_info") or []
    active_zone_ids = {str(z.get("id")) for z in zones_info}

    for identifier in device_entry.identifiers:
        if identifier[0] != DOMAIN:
            continue
        value = identifier[1]

        # Zone device: tado_ce_{home_id}_zone_{zone_id}
        prefix = f"tado_ce_{home_id}_zone_"
        if value.startswith(prefix):
            zone_id = value[len(prefix) :]
            return zone_id not in active_zone_ids  # True = stale zone, safe to remove

    # Schedule device, bridge devices, or any other — allow removal
    return True
