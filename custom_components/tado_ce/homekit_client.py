"""Tado CE HomeKit client — pairing, connection lifecycle, exponential-backoff reconnect.

Wraps `aiohomekit`'s Controller and IpPairing for one Tado bridge:
two-step pairing flow (used by the config flow), persistence of
the pairing credentials in HA Store, automatic reconnect with
exponential backoff plus jitter, and post-reconnect callbacks
(re-subscribe events, reset write-health circuit).
"""

from __future__ import annotations

import asyncio
import logging
import random
from typing import TYPE_CHECKING, Any, Final

from homeassistant.helpers.storage import Store
from homeassistant.util import dt as dt_util

from .helpers import mask_home_id

if TYPE_CHECKING:
    from pathlib import Path

    from homeassistant.config_entries import ConfigFlowResult
    from homeassistant.core import HomeAssistant

    from .config_flow_options import TadoCEOptionsFlow

_LOGGER = logging.getLogger(__name__)

# Reconnection backoff schedule (seconds)
_BACKOFF_SCHEDULE: Final[tuple[float, ...]] = (5.0, 10.0, 30.0, 60.0, 300.0)

# HomeKit characteristic UUIDs (short form)
CHAR_CURRENT_TEMPERATURE: Final = "11"
CHAR_CURRENT_HUMIDITY: Final = "10"
CHAR_TARGET_TEMPERATURE: Final = "35"
CHAR_CURRENT_HEATING_STATE: Final = "0F"
CHAR_TARGET_HEATING_STATE: Final = "33"
CHAR_SERIAL_NUMBER: Final = "30"
CHAR_MODEL: Final = "21"

_STORE_VERSION = 1


class HomeKitClient:
    """Per-home HomeKit connection wrapper around aiohomekit's Controller + IpPairing."""

    def __init__(
        self,
        hass: HomeAssistant,
        home_id: str,
        pairing_path: Path | None = None,
    ) -> None:
        """Initialise the client. `pairing_path` is accepted for legacy compatibility but ignored."""
        self._hass = hass
        self._home_id = home_id
        self._store: Store[dict[str, Any]] = Store(
            hass, _STORE_VERSION, f"tado_ce/homekit_pairing_{home_id}",
        )
        # Old JSON path for migration
        from .const import get_data_file

        self._old_pairing_path = get_data_file("homekit_pairing", home_id)
        self._controller: Any | None = None  # aiohomekit Controller
        self._pairing: Any | None = None  # aiohomekit IpPairing
        self._is_connected = False
        self._reconnect_task: asyncio.Task[None] | None = None
        self._closing = False

        # Zone mapping (set after pairing/connect)
        self._serial_to_zone: dict[str, str] = {}
        self._zone_to_aids: dict[str, list[int]] = {}

        # Connection stats
        self._last_connected: str | None = None
        self._last_disconnected: str | None = None
        self._reconnect_count = 0

        # Reconnect callbacks (e.g. re-subscribe events, reset circuit breaker)
        self._on_reconnect_callbacks: list[Any] = []

    @property
    def is_connected(self) -> bool:
        """Return True when the HomeKit pairing is currently connected."""
        return self._is_connected

    @property
    def pairing(self) -> Any | None:
        """Return the underlying aiohomekit pairing object (None until connected)."""
        return self._pairing

    @property
    def connection_stats(self) -> dict[str, Any]:
        """Return connection metrics for the HomeKit-status sensor."""
        return {
            "last_connected": self._last_connected,
            "last_disconnected": self._last_disconnected,
            "reconnect_count": self._reconnect_count,
        }

    def set_zone_mapping(
        self,
        serial_to_zone: dict[str, str],
        zone_to_aids: dict[str, list[int]],
    ) -> None:
        """Wire up the serial-to-zone and zone-to-aids dictionaries."""
        self._serial_to_zone = serial_to_zone
        self._zone_to_aids = zone_to_aids

    def add_reconnect_callback(self, callback: Any) -> None:
        """Register an async callback to await after each successful reconnect."""
        self._on_reconnect_callbacks.append(callback)

    @property
    def zone_aid_map(self) -> dict[str, list[int]]:
        """Return a copy of the zone-to-accessory-IDs mapping."""
        return dict(self._zone_to_aids)

    def get_aids_for_zone(self, zone_id: str) -> list[int]:
        """Return the accessory IDs mapped to one zone, or [] when none."""
        return self._zone_to_aids.get(zone_id, [])

    async def _ensure_controller(self) -> Any:
        """Lazily build the aiohomekit Controller, off the event loop where possible."""
        if self._controller is None:
            from homeassistant.components.zeroconf import async_get_async_instance

            zeroconf = await async_get_async_instance(self._hass)

            # aiohomekit's import path triggers lark grammar loading,
            # which does blocking file I/O — stay off the event loop.
            def _create_controller() -> Any:
                from aiohomekit import Controller
                return Controller

            controller_cls = await self._hass.async_add_executor_job(_create_controller)
            self._controller = controller_cls(
                async_zeroconf_instance=zeroconf,
                char_cache={},
            )
            await self._controller.async_start()
        return self._controller

    async def async_connect(self) -> bool:
        """Connect using stored pairing credentials, returning success."""
        pairing_data: dict[str, Any] | list[Any] | None = await self._store.async_load()
        if not pairing_data or not isinstance(pairing_data, dict):
            from .storage import async_migrate_json_to_store

            pairing_data = await async_migrate_json_to_store(
                self._hass, self._old_pairing_path, self._store,
                label="homekit_pairing",
            )
        if not pairing_data or not isinstance(pairing_data, dict):
            _LOGGER.debug(
                "HomeKit: no pairing credentials stored — staying "
                "disconnected, pair the bridge from Options to enable "
                "local control",
            )
            return False

        try:
            controller = await self._ensure_controller()
            alias = f"tado_ce_{self._home_id}"
            self._pairing = controller.load_pairing(alias, pairing_data)
            if self._pairing is None:
                _LOGGER.warning(
                    "HomeKit: aiohomekit returned no pairing for home %s — "
                    "stored credentials may be corrupt, re-pair to recover",
                    mask_home_id(self._home_id),
                )
                return False

            # Probe with list-accessories so a connection that can't
            # talk to the bridge fails the connect, not the first
            # data read.
            await self._pairing.list_accessories_and_characteristics()
            self._is_connected = True
            self._last_connected = dt_util.utcnow().isoformat()
            _LOGGER.info(
                "HomeKit: connected to bridge for home %s",
                mask_home_id(self._home_id),
            )
            return True
        except Exception:
            _LOGGER.warning(
                "HomeKit: could not connect to bridge for home %s — "
                "check the bridge is reachable, will keep retrying in "
                "the background",
                mask_home_id(self._home_id),
            )
            _LOGGER.debug("HomeKit: connect error details", exc_info=True)
            self._pairing = None
            self._is_connected = False
            return False

    async def async_disconnect(self) -> None:
        """Disconnect, cancel any reconnect loop, and release the pairing."""
        self._closing = True
        if self._reconnect_task and not self._reconnect_task.done():
            self._reconnect_task.cancel()
            try:
                await self._reconnect_task
            except asyncio.CancelledError:
                pass
            self._reconnect_task = None

        if self._pairing:
            try:
                await self._pairing.close()
            except Exception:
                _LOGGER.debug(
                    "HomeKit: error while closing the pairing — proceeding "
                    "with disconnect anyway",
                    exc_info=True,
                )
            self._pairing = None

        self._is_connected = False
        self._last_disconnected = dt_util.utcnow().isoformat()
        _LOGGER.debug(
            "HomeKit: disconnected from bridge for home %s",
            mask_home_id(self._home_id),
        )

    async def async_reconnect(self) -> None:
        """Schedule a background reconnect with exponential backoff (idempotent)."""
        if self._reconnect_task and not self._reconnect_task.done():
            return
        self._reconnect_task = asyncio.create_task(self._reconnect_loop())

    async def _reconnect_loop(self) -> None:
        """Reconnect indefinitely, backing off per `_BACKOFF_SCHEDULE` with jitter."""
        self._is_connected = False
        self._last_disconnected = dt_util.utcnow().isoformat()
        backoff_idx = 0

        while not self._closing:
            max_delay = _BACKOFF_SCHEDULE[min(backoff_idx, len(_BACKOFF_SCHEDULE) - 1)]
            delay = random.uniform(0, max_delay)
            _LOGGER.debug(
                "HomeKit: reconnect attempt %d in %.1fs for home %s",
                backoff_idx + 1, delay, mask_home_id(self._home_id),
            )
            await asyncio.sleep(delay)

            if self._closing:
                return

            try:
                success = await self.async_connect()
                if success:
                    self._reconnect_count += 1
                    _LOGGER.info(
                        "HomeKit: reconnected to bridge for home %s "
                        "after %d attempt(s)",
                        mask_home_id(self._home_id), backoff_idx + 1,
                    )
                    for cb in self._on_reconnect_callbacks:
                        try:
                            await cb()
                        except Exception:
                            _LOGGER.warning(
                                "HomeKit: post-reconnect setup callback "
                                "failed — local control may degrade until "
                                "the next reconnect cycle",
                            )
                            _LOGGER.debug(
                                "HomeKit: post-reconnect error details",
                                exc_info=True,
                            )
                    return
            except Exception:
                _LOGGER.debug(
                    "HomeKit: reconnect attempt %d failed for home %s",
                    backoff_idx + 1, mask_home_id(self._home_id), exc_info=True,
                )

            backoff_idx += 1

    async def async_pair(
        self,
        pin: str,
        bridge_hkid: str | None = None,
    ) -> dict[str, Any]:
        """Run the HomeKit two-step pairing flow with `pin`, returning the credentials.

        When `bridge_hkid` is None we discover the first unpaired
        Tado bridge on the network. Raises on wrong PIN, already
        paired, or network errors so the config flow can map to the
        right user-facing error.
        """
        controller = await self._ensure_controller()

        if bridge_hkid is None:
            from aiohomekit.model.status_flags import StatusFlags

            async for discovery in controller.async_discover():
                if discovery.description.status_flags & StatusFlags.UNPAIRED:
                    bridge_hkid = discovery.description.id
                    _LOGGER.info(
                        "HomeKit: found unpaired bridge %s on the network",
                        bridge_hkid,
                    )
                    break

            if bridge_hkid is None:
                msg = "No unpaired HomeKit bridge found on the network"
                raise RuntimeError(msg)

        discovery = await controller.async_find(bridge_hkid)
        alias = f"tado_ce_{self._home_id}"
        finish_pairing = await discovery.async_start_pairing(alias)
        pairing = await finish_pairing(pin)

        pairing_data = dict(pairing._pairing_data)
        await self._store.async_save(pairing_data)

        self._pairing = pairing
        self._is_connected = True
        self._last_connected = dt_util.utcnow().isoformat()
        _LOGGER.info(
            "HomeKit: pairing successful for home %s — local control enabled",
            mask_home_id(self._home_id),
        )

        return pairing_data

    async def async_unpair(self) -> None:
        """Remove the pairing from the bridge and delete the stored credentials."""
        if self._pairing:
            try:
                pairing_data = getattr(self._pairing, "pairing_data", None) or getattr(
                    self._pairing, "_pairing_data", None
                )
                pairing_id = pairing_data.get("iOSPairingId", "") if pairing_data else ""
                if pairing_id:
                    await self._pairing.remove_pairing(pairing_id)
                    _LOGGER.info(
                        "HomeKit: removed pairing from bridge (home %s)",
                        mask_home_id(self._home_id),
                    )
                elif pairing_data is None:
                    _LOGGER.warning(
                        "HomeKit: could not read pairing data while "
                        "unpairing — the bridge may keep a stale "
                        "pairing entry until you reset the bridge",
                    )
            except Exception:
                _LOGGER.warning(
                    "HomeKit: bridge refused the unpair request — local "
                    "credentials cleared, but the bridge may still list "
                    "this pairing. Reset the bridge to clear it.",
                )
                _LOGGER.debug("HomeKit: unpair error details", exc_info=True)
            finally:
                await self.async_disconnect()

        await self._store.async_remove()
        _LOGGER.info(
            "HomeKit: deleted local pairing credentials for home %s",
            mask_home_id(self._home_id),
        )

        from .homekit_mapping import remove_device_mapping

        await remove_device_mapping(self._hass, self._home_id)

    async def async_list_accessories(self) -> list[dict[str, Any]]:
        """Return every accessory the bridge advertises, or [] when unavailable."""
        if not self._pairing:
            return []
        try:
            result = await self._pairing.list_accessories_and_characteristics()
            if isinstance(result, list):
                _LOGGER.debug(
                    "HomeKit: bridge listed %d accessory(ies)", len(result),
                )
                return result
            return []
        except Exception:
            _LOGGER.debug(
                "HomeKit: could not list accessories — connection may "
                "be unhealthy, returning empty list",
                exc_info=True,
            )
            return []


# ---------------------------------------------------------------------------
# Config flow pairing steps (delegated from config_flow_options.py)
# ---------------------------------------------------------------------------


async def async_step_homekit_pairing(
    flow: TadoCEOptionsFlow,
    user_input: dict[str, Any] | None = None,
) -> ConfigFlowResult:
    """Drive the options-flow HomeKit pairing sub-step.

    First call shows the PIN form; second call runs the pairing,
    builds the serial-to-zone mapping, and persists both.
    """
    from homeassistant.helpers.selector import TextSelector, TextSelectorConfig, TextSelectorType
    import voluptuous as vol

    errors: dict[str, str] = {}

    if user_input is not None:
        pin = user_input.get("homekit_pin", "").strip()
        if pin:
            try:
                from .homekit_mapping import build_serial_mapping, save_device_mapping

                home_id = flow.config_entry.data.get("home_id") or "default"
                client = HomeKitClient(flow.hass, home_id)

                try:
                    await client.async_pair(pin)

                    accessories = await client.async_list_accessories()
                    zones_info = flow.config_entry.runtime_data.data.get("zones_info") or []
                    mapping = build_serial_mapping(accessories, zones_info)
                    await save_device_mapping(flow.hass, home_id, mapping)
                finally:
                    await client.async_disconnect()

                _LOGGER.info(
                    "HomeKit: pairing complete and mapping saved",
                )

                if flow._pending_general_options:
                    return flow.async_create_entry(title="", data=flow._pending_general_options)
                return await flow.async_step_init()

            except Exception as err:
                err_str = str(err).lower()
                if "authentication" in err_str or "pin" in err_str:
                    errors["homekit_pin"] = "homekit_wrong_pin"
                elif "already paired" in err_str or "max peers" in err_str or "unavailable" in err_str:
                    errors["homekit_pin"] = "homekit_already_paired"
                elif "not found" in err_str:
                    errors["homekit_pin"] = "homekit_network_error"
                elif "timeout" in err_str:
                    errors["homekit_pin"] = "homekit_timeout"
                else:
                    errors["homekit_pin"] = "homekit_pairing_failed"
                _LOGGER.warning("HomeKit: pairing failed — %s", err)
        else:
            # Empty PIN — cancel pairing and revert the homekit_enabled
            # flag so the options form reflects the actual state.
            if flow._pending_general_options:
                flow._pending_general_options["homekit_enabled"] = False
                return flow.async_create_entry(title="", data=flow._pending_general_options)
            return await flow.async_step_init()

    return flow.async_show_form(
        step_id="homekit_pairing",
        data_schema=vol.Schema(
            {
                vol.Required("homekit_pin"): TextSelector(
                    TextSelectorConfig(type=TextSelectorType.TEXT),
                ),
            },
        ),
        errors=errors,
    )


async def async_step_homekit_unpair(
    flow: TadoCEOptionsFlow,
    user_input: dict[str, Any] | None = None,
) -> ConfigFlowResult:
    """Drive the options-flow HomeKit unpairing sub-step.

    First call shows confirmation; second call performs the unpair
    and clears local credentials, even if the bridge can't be
    contacted (so a permanently-offline bridge doesn't trap the
    user with no recovery path).
    """
    import voluptuous as vol

    if user_input is not None:
        try:
            home_id = flow.config_entry.data.get("home_id") or "default"
            client = HomeKitClient(flow.hass, home_id)

            # Connect first so the unpair can also clear the bridge's
            # side of the pairing — best-effort, falls through on
            # failure.
            await client.async_connect()
            await client.async_unpair()

            _LOGGER.info("HomeKit: unpair successful")
        except Exception:
            _LOGGER.warning(
                "HomeKit: unpair encountered errors — local credentials "
                "have been cleared, but the bridge may still list the "
                "pairing. Reset the bridge if you want to clear it.",
            )
            _LOGGER.debug("HomeKit: unpair error details", exc_info=True)

        new_options = dict(flow.config_entry.options)
        new_options["homekit_enabled"] = False

        coordinator = flow.config_entry.runtime_data
        if coordinator and hasattr(coordinator, "_pending_cleanup"):
            coordinator._pending_cleanup.setdefault(flow.config_entry.entry_id, {})["_cleanup_homekit"] = True

        return flow.async_create_entry(title="", data=new_options)

    return flow.async_show_form(
        step_id="homekit_unpair",
        data_schema=vol.Schema({}),
    )
