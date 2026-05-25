"""Tado CE entry lifecycle — per-config-entry component setup + teardown.

Owns the order in which the API tracker, API client, and HomeKit
client are constructed during entry setup, and mirrors that order
on teardown. The HomeKit branch is the trickiest part: connecting
to the bridge, validating the cached zone mapping, rebuilding it
when stale, and scheduling a deferred rebuild when zones_info
isn't loaded yet.
"""

from __future__ import annotations

import logging
from typing import TYPE_CHECKING, Any

from .helpers import mask_serial_dict

if TYPE_CHECKING:
    from collections.abc import Callable

    from homeassistant.config_entries import ConfigEntry
    from homeassistant.core import HomeAssistant

    from .config_manager import ConfigurationManager
    from .coordinator import TadoDataUpdateCoordinator
    from .data_loader import DataLoader

_LOGGER = logging.getLogger(__name__)


async def async_create_entry_components(
    hass: HomeAssistant,
    entry: ConfigEntry,
    config_manager: ConfigurationManager,
    home_id: str | None,
    data_loader: DataLoader | None = None,
) -> dict[str, Any]:
    """Build the API tracker, API client, and (optionally) HomeKit client for one entry.

    Returns a dict the coordinator constructor consumes — when
    HomeKit is connected but the cached mapping is empty, a
    `_deferred_homekit_rebuild` callable is included so the
    coordinator can retry once the first poll lands.
    """
    from homeassistant.helpers.aiohttp_client import async_get_clientsession

    from .api_call_tracker import APICallTracker
    from .api_client import TadoApiClient
    from .const import DATA_DIR
    # Create per-entry API call tracker
    retention_days = config_manager.get_api_history_retention_days()
    api_tracker = APICallTracker(
        hass, DATA_DIR, retention_days=retention_days, home_id=home_id, config_manager=config_manager,
    )
    await api_tracker.async_init()
    _LOGGER.debug("Entry Lifecycle: API call tracker ready")

    session = async_get_clientsession(hass)
    api_client = TadoApiClient(
        session,
        hass,
        home_id=home_id,
        refresh_token=entry.data.get("refresh_token", ""),
        config_manager=config_manager,
        api_tracker=api_tracker,
        data_loader=data_loader,
        config_entry=entry,
    )
    _LOGGER.debug("Entry Lifecycle: API client ready")

    # Load version early to avoid race conditions in device_manager
    from .device_manager import load_version

    await hass.async_add_executor_job(load_version)

    # Create HomeKit client if enabled
    homekit_client = None
    if config_manager.get_homekit_enabled():
        from .homekit_client import HomeKitClient

        homekit_client = HomeKitClient(hass, home_id or "default")
        connected = await homekit_client.async_connect()
        if connected:
            _LOGGER.info("Entry Lifecycle: HomeKit bridge connected")
            from .homekit_mapping import (
                build_serial_mapping,
                load_device_mapping,
                save_device_mapping,
                validate_mapping,
            )

            mapping = await load_device_mapping(hass, home_id or "default")
            serial_to_zone = mapping.get("serial_to_zone", {}) if mapping else {}

            # Validate cached mapping against cloud zone IDs
            if serial_to_zone and mapping:
                # Load zones_info for validation
                if data_loader:
                    zi_for_validation = await hass.async_add_executor_job(data_loader.load_zones_info_file)
                else:
                    zi_for_validation = None
                from .const import get_climate_zone_ids

                valid_ids = get_climate_zone_ids(zi_for_validation or []) if zi_for_validation else None
                if not validate_mapping(mapping, valid_zone_ids=valid_ids):
                    _LOGGER.info(
                        "Entry Lifecycle: HomeKit cached mapping no "
                        "longer matches the cloud zone list — "
                        "rebuilding from scratch",
                    )
                    serial_to_zone = {}

            if not serial_to_zone:
                _LOGGER.info(
                    "Entry Lifecycle: HomeKit mapping empty — "
                    "rebuilding from bridge accessories + cloud zones",
                )
                accessories = await homekit_client.async_list_accessories()
                # Load zones_info from disk (coordinator not created yet)
                if data_loader:
                    zones_info = await hass.async_add_executor_job(data_loader.load_zones_info_file)
                else:
                    zones_info = []
                if accessories and zones_info:
                    mapping = build_serial_mapping(accessories, zones_info)
                    await save_device_mapping(hass, home_id or "default", mapping)
                    serial_to_zone = mapping.get("serial_to_zone", {})

            if serial_to_zone:
                homekit_client.set_zone_mapping(
                    mapping.get("serial_to_zone", {}),  # type: ignore[union-attr]
                    mapping.get("zone_to_aids", {}),  # type: ignore[union-attr]
                )
                _LOGGER.info(
                    "Entry Lifecycle: HomeKit zone mapping loaded "
                    "(%d zone(s))",
                    len(serial_to_zone),
                )
                _LOGGER.debug(
                    "Entry Lifecycle: HomeKit mapping detail — "
                    "serial_to_zone=%s, zone_to_aids=%s",
                    mask_serial_dict(mapping.get("serial_to_zone", {})),  # type: ignore[union-attr]
                    mapping.get("zone_to_aids", {}),  # type: ignore[union-attr]
                )

                from .const import get_climate_zone_ids

                if data_loader:
                    zi = await hass.async_add_executor_job(data_loader.load_zones_info_file)
                else:
                    zi = zones_info if "zones_info" in dir() else []
                all_climate_ids = get_climate_zone_ids(zi or [])
                mapped_ids = set(serial_to_zone.values())
                unmapped = all_climate_ids - mapped_ids
                if unmapped:
                    _LOGGER.info(
                        "Entry Lifecycle: HomeKit unmapped zone(s) "
                        "%s — those zones will use cloud-only state",
                        unmapped,
                    )
            else:
                _LOGGER.warning(
                    "Entry Lifecycle: HomeKit connected but no zone "
                    "mapping built yet — scheduling a deferred "
                    "rebuild after the first coordinator poll",
                )

                # Schedule one-shot retry after first coordinator refresh
                async def _deferred_homekit_rebuild(
                    coord: TadoDataUpdateCoordinator,
                    _hk_client: Any = homekit_client,
                    _hass: HomeAssistant = hass,
                    _home_id: str | None = home_id,
                ) -> None:
                    """Retry the HomeKit mapping build after the first poll lands."""
                    from .homekit_mapping import build_serial_mapping, save_device_mapping

                    zi = coord.data.get("zones_info") or []
                    if not zi:
                        _LOGGER.warning(
                            "Entry Lifecycle: HomeKit deferred "
                            "rebuild aborted — coordinator still has "
                            "no zones_info",
                        )
                        return
                    accs = await _hk_client.async_list_accessories()
                    if not accs:
                        _LOGGER.warning(
                            "Entry Lifecycle: HomeKit deferred "
                            "rebuild aborted — bridge returned no "
                            "accessories",
                        )
                        return
                    new_mapping = build_serial_mapping(accs, zi)
                    s2z = new_mapping.get("serial_to_zone", {})
                    if not s2z:
                        _LOGGER.warning(
                            "Entry Lifecycle: HomeKit deferred "
                            "rebuild produced an empty mapping — "
                            "bridge accessories did not match any "
                            "cloud zone, will retry on next poll",
                        )
                        return
                    _hk_client.set_zone_mapping(
                        new_mapping.get("serial_to_zone", {}),
                        new_mapping.get("zone_to_aids", {}),
                    )
                    await save_device_mapping(_hass, _home_id or "default", new_mapping)
                    _LOGGER.info(
                        "Entry Lifecycle: HomeKit deferred rebuild "
                        "complete — %d zone(s) mapped",
                        len(s2z),
                    )

                return {
                    "api_tracker": api_tracker,
                    "api_client": api_client,
                    "homekit_client": homekit_client,
                    "_deferred_homekit_rebuild": _deferred_homekit_rebuild,
                }
        else:
            _LOGGER.warning(
                "Entry Lifecycle: HomeKit bridge connection failed "
                "— continuing with cloud-only state (will keep "
                "retrying in the background)",
            )

    return {
        "api_tracker": api_tracker,
        "api_client": api_client,
        "homekit_client": homekit_client,
    }


async def async_cleanup_entry_components(
    hass: HomeAssistant,
    coordinator: TadoDataUpdateCoordinator | None,
) -> None:
    """Tear down per-entry timers + managers + HomeKit client in reverse setup order.

    Each manager that holds local state flushes to disk before
    cleanup so an integration reload doesn't lose
    Smart Comfort / preheat history (HA's normal final-write
    event doesn't fire on reload).
    """
    if coordinator is None:
        return

    def _attr(field: str) -> Any:
        """Get field from coordinator, or None if missing."""
        return getattr(coordinator, field, None)

    # --- Cancel per-entry timers ---

    cancel_func: Callable[[], None] | None = _attr("_freshness_cleanup_cancel")
    if cancel_func:
        cancel_func()
        _LOGGER.debug("Entry Lifecycle: cancelled freshness cleanup timer")

    cancel_func = _attr("_heating_cycle_timeout_cancel")
    if cancel_func:
        cancel_func()
        _LOGGER.debug("Entry Lifecycle: cancelled heating cycle timeout timer")

    ac = _attr("api_client")
    if ac is not None:
        ac._access_token = None
        ac._token_expiry = None
        coordinator.api_client = None  # type: ignore[assignment]
        _LOGGER.debug("Entry Lifecycle: API client torn down")

    # smart_comfort_cache and bridge_health use HA Store with
    # debounced save — that handles HA shutdown via the
    # FINAL_WRITE event but NOT integration reloads, so the
    # explicit save here is what keeps preheat history
    # surviving a reload.
    scm = _attr("smart_comfort_manager")
    if scm is not None:
        scm.save_to_file()
        coordinator.smart_comfort_manager = None
        _LOGGER.debug("Entry Lifecycle: Smart Comfort manager torn down")

    apm = _attr("adaptive_preheat_manager")
    if apm is not None:
        await apm.async_unload()
        coordinator.adaptive_preheat_manager = None
        _LOGGER.debug("Entry Lifecycle: Adaptive Preheat manager torn down")

    if _attr("data_loader") is not None:
        coordinator.data_loader = None  # type: ignore[assignment]
        _LOGGER.debug("Entry Lifecycle: DataLoader torn down")

    hkc = _attr("homekit_client")
    if hkc is not None:
        from .homekit_client import HomeKitClient

        # Unsubscribe events and stop the cache refresh loop
        # before tearing down the connection — otherwise
        # in-flight events can hit a half-disconnected client.
        provider = _attr("homekit_provider")
        if provider is not None and hasattr(provider, "unsubscribe_events"):
            provider.unsubscribe_events()

        if isinstance(hkc, HomeKitClient):
            await hkc.async_disconnect()
        coordinator.homekit_client = None
        coordinator.homekit_provider = None
        coordinator.state_reconciler = None
        _LOGGER.debug("Entry Lifecycle: HomeKit client torn down")
