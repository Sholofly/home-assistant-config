"""Tado CE setup entry helpers — optional per-entry component initialization."""

from __future__ import annotations

import logging
from typing import TYPE_CHECKING, Any

if TYPE_CHECKING:
    from homeassistant.core import HomeAssistant

    from .adaptive_preheat import AdaptivePreheatManager
    from .api_client import TadoApiClient
    from .config_manager import ConfigurationManager
    from .coordinator import TadoDataUpdateCoordinator
    from .data_loader import DataLoader
    from .heating_coordinator import HeatingCycleCoordinator
    from .smart_comfort import SmartComfortManager
    from .state_restore_manager import StateRestoreManager
    from .zone_config_manager import ZoneConfigManager

_LOGGER = logging.getLogger(__name__)


async def async_log_file_system_state(hass: HomeAssistant) -> None:
    """Log file system state for debugging (run in executor to avoid blocking I/O)."""
    from .const import CONFIG_FILE, DATA_DIR, ZONES_FILE, ZONES_INFO_FILE

    def _check() -> dict[str, Any]:
        """Check file system state."""
        return {
            "data_dir_exists": DATA_DIR.exists(),
            "config_file_exists": CONFIG_FILE.exists(),
            "zones_file_exists": ZONES_FILE.exists(),
            "zones_info_file_exists": ZONES_INFO_FILE.exists(),
        }

    fs_state = await hass.async_add_executor_job(_check)
    _LOGGER.info(
        "=== Setup File System State ===\n"
        "  DATA_DIR: %s (exists: %s)\n  CONFIG_FILE: %s (exists: %s)\n"
        "  ZONES_FILE: %s (exists: %s)\n  ZONES_INFO_FILE: %s (exists: %s)",
        DATA_DIR,
        fs_state["data_dir_exists"],
        CONFIG_FILE,
        fs_state["config_file_exists"],
        ZONES_FILE,
        fs_state["zones_file_exists"],
        ZONES_INFO_FILE,
        fs_state["zones_info_file_exists"],
    )


async def async_init_smart_comfort(
    hass: HomeAssistant,
    data_loader: DataLoader,
    config_manager: ConfigurationManager,
    home_id: str | None,
) -> SmartComfortManager | None:
    """Initialize Smart Comfort Manager if enabled.

    Returns the manager instance, or None if disabled.
    """
    if not config_manager.get_smart_comfort_enabled():
        return None

    from .smart_comfort import (
        SmartComfortManager,
        async_load_baseline_from_statistics,
        async_load_history_from_recorder,
    )

    history_days = config_manager.get_smart_comfort_history_days()
    smart_comfort_manager = SmartComfortManager(
        hass=hass,
        home_id=home_id or "",
        history_days=history_days,
        data_loader=data_loader,
    )
    smart_comfort_manager.enable()

    # Configure weather compensation
    outdoor_temp_entity = config_manager.get_outdoor_temp_entity()
    weather_compensation = config_manager.get_smart_comfort_mode()
    use_feels_like = config_manager.get_use_feels_like()

    if outdoor_temp_entity:
        smart_comfort_manager.configure_weather(
            outdoor_temp_entity=outdoor_temp_entity,
            weather_compensation=weather_compensation,
            use_feels_like=use_feels_like,
        )

    # 3-Tier Loading Strategy
    # Tier 1: Load from cache file (fastest, 2h detailed data)
    cache_readings = await smart_comfort_manager.async_load()

    # Get zones_info for entity ID mapping
    zones_info = await hass.async_add_executor_job(data_loader.load_zones_info_file)

    if zones_info:
        entity_to_zone_id = {
            zone.get("name", "").lower().replace(" ", "_"): str(zone.get("id"))
            for zone in zones_info
            if zone.get("name") and zone.get("id")
        }

        climate_entity_ids = [f"climate.{entity_name}" for entity_name in entity_to_zone_id]

        # Tier 2: Load from recorder history (24h detailed states)
        recorder_readings = 0
        if climate_entity_ids:
            recorder_readings = await async_load_history_from_recorder(
                hass,
                smart_comfort_manager,
                climate_entity_ids,
                entity_to_zone_id,
            )

        # Tier 3: Load baseline rates from long-term statistics (7 days hourly)
        zone_sensor_mapping = {
            str(zone.get("id")): f"sensor.{zone.get('name', '').lower().replace(' ', '_')}_temperature"
            for zone in zones_info
            if zone.get("name") and zone.get("id")
        }
        baseline_stats = await async_load_baseline_from_statistics(
            hass,
            smart_comfort_manager,
            zone_sensor_mapping,
        )

        _LOGGER.info(
            "Tado CE: Smart Comfort 3-tier loading complete - cache=%s, recorder=%s, baseline_zones=%s",
            cache_readings,
            recorder_readings,
            len(baseline_stats),
        )

    _LOGGER.info("Tado CE: Smart Comfort Analytics enabled")
    return smart_comfort_manager


async def async_init_heating_cycle(
    hass: HomeAssistant,
    config_manager: ConfigurationManager,
    home_id: str | None,
) -> HeatingCycleCoordinator | None:
    """Initialize Heating Cycle Coordinator.

    Always enabled for HEATING zones.
    Returns the coordinator instance, or None if no home_id.
    """
    if not home_id:
        return None

    try:
        from .heating_coordinator import HeatingCycleCoordinator
        from .heating_models import HeatingCycleConfig

        heating_cycle_config = HeatingCycleConfig(
            enabled=True,
            rolling_window_days=config_manager.get_heating_cycle_history_days(),
            inertia_threshold_celsius=config_manager.get_heating_cycle_inertia_threshold(),
            min_cycles=config_manager.get_heating_cycle_min_cycles(),
        )

        _LOGGER.info(
            "Tado CE: Heating Cycle Config - min_cycles=%d, history_days=%d, inertia_threshold=%.2f",
            heating_cycle_config.min_cycles,
            heating_cycle_config.rolling_window_days,
            heating_cycle_config.inertia_threshold_celsius,
        )

        heating_cycle_coordinator = HeatingCycleCoordinator(
            hass,
            home_id,
            heating_cycle_config,
        )
        await heating_cycle_coordinator.async_setup()

        _LOGGER.info("Tado CE: Heating Cycle Analysis initialized")
        return heating_cycle_coordinator
    except Exception:
        _LOGGER.exception("Tado CE: Failed to initialize Heating Cycle Analysis")
        return None


async def async_init_adaptive_preheat(
    hass: HomeAssistant,
    config_manager: ConfigurationManager,
    *,
    api_client: TadoApiClient | None,
    data_loader: DataLoader | None,
    zone_config_manager: ZoneConfigManager | None = None,
) -> AdaptivePreheatManager | None:
    """Initialize Adaptive Preheat Manager if enabled.

    Returns the manager instance, or None if disabled.
    """
    if not config_manager.get_adaptive_preheat_enabled():
        return None

    try:
        from .adaptive_preheat import AdaptivePreheatManager

        apm = AdaptivePreheatManager(
            hass,
            config_manager,
            api_client=api_client,
            data_loader=data_loader,
            zone_config_manager=zone_config_manager,
        )
        await apm.async_setup()
        _LOGGER.info("Tado CE: Adaptive Preheat enabled")
        return apm
    except Exception:
        _LOGGER.exception("Tado CE: Failed to initialize Adaptive Preheat")
        return None

async def async_init_state_restore(
    hass: HomeAssistant,
    config_manager: ConfigurationManager,
    data_loader: DataLoader,
) -> StateRestoreManager | None:
    """Initialize State Restore Manager.

    Returns the manager instance, or None on failure.
    """
    try:
        from .state_restore_manager import StateRestoreManager

        srm = StateRestoreManager(
            hass,
            config_manager,
            data_loader,
        )
        await srm.async_setup()
        _LOGGER.info("Tado CE: State Restore Manager enabled")
        return srm
    except Exception:
        _LOGGER.exception("Tado CE: Failed to initialize State Restore Manager")
        return None



def schedule_heating_cycle_timeouts(
    hass: HomeAssistant,
    coordinator: TadoDataUpdateCoordinator,
    heating_cycle_coordinator: HeatingCycleCoordinator,
) -> None:
    """Schedule periodic heating cycle timeout checks.

    Registers a 60-second interval timer that checks for timed-out
    heating cycles and closes them. The cancel handle is stored on
    the coordinator for cleanup during unload.

    Args:
        hass: Home Assistant instance.
        coordinator: The data update coordinator.
        heating_cycle_coordinator: The heating cycle coordinator to check.
    """
    from datetime import datetime as _dt
    from datetime import timedelta as _td

    from homeassistant.helpers.event import async_track_time_interval as _track

    async def _check_cycle_timeouts(_now: _dt) -> None:
        """Check for timed-out heating cycles and close them."""
        await heating_cycle_coordinator.check_timeouts()

    coordinator._heating_cycle_timeout_cancel = _track(
        hass,
        _check_cycle_timeouts,
        _td(seconds=60),
    )


async def async_load_insight_history(coordinator: TadoDataUpdateCoordinator) -> None:
    """Load insight history from disk and prune stale entries.

    Args:
        coordinator: The data update coordinator with insight_history tracker.
    """
    loaded_count = await coordinator.insight_history.async_load()
    pruned_count = coordinator.insight_history.prune_old_entries()
    if loaded_count or pruned_count:
        _LOGGER.debug(
            "Tado CE: Insight history loaded %d entries, pruned %d stale",
            loaded_count,
            pruned_count,
        )


def register_bridge_devices(
    hass: HomeAssistant,
    entry_id: str,
    zones_info: list[dict[str, Any]],
) -> None:
    """Pre-register Tado bridge devices in the device registry.

    Ensures bridge devices (IB01/IB02) exist before zone devices reference
    them via via_device. This follows the HA official pattern.

    Args:
        hass: Home Assistant instance.
        entry_id: The config entry ID.
        zones_info: List of zone info dicts from coordinator data.
    """
    from homeassistant.helpers import device_registry as dr

    from .const import DOMAIN, TADO_BRIDGE_MODELS

    device_registry = dr.async_get(hass)
    seen_serials: set[str] = set()
    for zone in zones_info:
        for device in zone.get("devices") or []:
            device_type = device.get("deviceType", "")
            serial = device.get("shortSerialNo", "")
            if device_type in TADO_BRIDGE_MODELS and serial and serial not in seen_serials:
                seen_serials.add(serial)
                device_registry.async_get_or_create(
                    config_entry_id=entry_id,
                    identifiers={(DOMAIN, serial)},
                    manufacturer="Tado",
                    model=device_type,
                    name=device.get("serialNo", serial),
                    sw_version=device.get("currentFwVersion"),
                )
                _LOGGER.debug("Pre-registered Tado bridge: %s (%s)", serial, device_type)
