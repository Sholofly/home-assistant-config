"""Tado CE entry lifecycle — per-config-entry component setup + teardown."""

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
    """Build API tracker + client + optional HomeKit client; returns dict for the coordinator constructor."""
    from homeassistant.helpers.aiohttp_client import async_get_clientsession

    from .api_call_tracker import APICallTracker
    from .api_client import TadoApiClient
    from .const import DATA_DIR
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

    homekit_client = None
    homekit_controller = None
    if config_manager.get_homekit_enabled():
        from .homekit_client import HomeKitClient, async_create_controller

        # Build ONE long-lived controller for the entry and start it now,
        # so its _hap browser is warming the discovery cache from setup —
        # the runtime client and the later pair/unpair flows all share it.
        homekit_controller = await async_create_controller(hass)

        homekit_client = HomeKitClient(
            hass, home_id or "default", controller=homekit_controller,
        )
        connected = await homekit_client.async_connect()
        if connected:
            _LOGGER.info("Entry Lifecycle: HomeKit bridge connected")
            from .homekit_mapping import (
                async_rebuild_and_save_mapping,
                load_device_mapping,
                validate_mapping,
            )

            mapping = await load_device_mapping(hass, home_id or "default")
            serial_to_zone = mapping.get("serial_to_zone", {}) if mapping else {}

            # Validate cached mapping against cloud zone IDs
            if serial_to_zone and mapping:
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
                # zones_info: load from disk — coordinator not created yet
                if data_loader:
                    zones_info = await hass.async_add_executor_job(data_loader.load_zones_info_file)
                else:
                    zones_info = []
                mapping = await async_rebuild_and_save_mapping(
                    hass, homekit_client, home_id or "default", zones_info or [],
                )
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

                async def _deferred_homekit_rebuild(
                    coord: TadoDataUpdateCoordinator,
                    _hk_client: Any = homekit_client,
                    _hass: HomeAssistant = hass,
                    _home_id: str | None = home_id,
                ) -> None:
                    """Retry the HomeKit mapping build after the first poll lands."""
                    from .homekit_mapping import async_rebuild_and_save_mapping

                    zi = coord.data.get("zones_info") or []
                    if not zi:
                        _LOGGER.warning(
                            "Entry Lifecycle: HomeKit deferred "
                            "rebuild aborted — coordinator still has "
                            "no zones_info",
                        )
                        return
                    new_mapping = await async_rebuild_and_save_mapping(
                        _hass, _hk_client, _home_id or "default", zi,
                    )
                    s2z = new_mapping.get("serial_to_zone", {})
                    if s2z:
                        _LOGGER.info(
                            "Entry Lifecycle: HomeKit deferred rebuild "
                            "complete — %d zone(s) mapped",
                            len(s2z),
                        )
                    else:
                        _LOGGER.debug(
                            "Entry Lifecycle: HomeKit deferred rebuild "
                            "still empty — coordinator will retry each poll",
                        )

                return {
                    "api_tracker": api_tracker,
                    "api_client": api_client,
                    "homekit_client": homekit_client,
                    "homekit_controller": homekit_controller,
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
        "homekit_controller": homekit_controller,
    }


async def async_cleanup_entry_components(
    hass: HomeAssistant,
    coordinator: TadoDataUpdateCoordinator | None,
) -> None:
    """Tear down per-entry timers + managers + HomeKit client in reverse setup order; flushes state to survive reloads."""
    if coordinator is None:
        return

    def _attr(field: str) -> Any:
        return getattr(coordinator, field, None)

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

        # Stop the entry's shared controller (and its _hap browser) — the
        # client's async_disconnect leaves it alone because the entry owns it.
        ctrl = _attr("homekit_controller")
        if ctrl is not None:
            try:
                await ctrl.async_stop()
            except Exception:
                _LOGGER.debug(
                    "Entry Lifecycle: error stopping HomeKit controller — proceeding",
                    exc_info=True,
                )
            coordinator.homekit_controller = None

        coordinator.homekit_client = None
        coordinator.homekit_provider = None
        coordinator.state_reconciler = None
        _LOGGER.debug("Entry Lifecycle: HomeKit client torn down")
