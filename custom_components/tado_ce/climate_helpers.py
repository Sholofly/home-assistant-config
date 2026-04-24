"""Tado CE climate helper functions — offset and preset mode updates."""  # accepts any HA entity type (ClimateEntity, WaterHeaterEntity, etc.)
  # accepts any HA entity with .hass and .coordinator
from __future__ import annotations

import logging
from typing import TYPE_CHECKING, Any

from homeassistant.core import CALLBACK_TYPE, Event, EventStateChangedData, callback
from homeassistant.exceptions import HomeAssistantError
from homeassistant.helpers.event import async_track_state_change_event

if TYPE_CHECKING:
    from collections.abc import Callable, Coroutine

    from homeassistant.components.climate import HVACAction, HVACMode  # type: ignore[attr-defined]
    from homeassistant.core import HomeAssistant

    from .coordinator import TadoDataUpdateCoordinator
    from .zone_config_manager import ZoneConfigManager

from .const import DOMAIN
from .optimistic_helpers import clear_optimistic_state, set_optimistic_fields

_LOGGER = logging.getLogger(__name__)


def update_offset(
    coordinator: TadoDataUpdateCoordinator,
    zone_id: str,
) -> float | None:
    """Read temperature offset from cached offsets file.

    Returns the offset value if offset_enabled is True in config and data
    is available, otherwise None.

    Replaces inline _update_offset() in heating.py.

    Args:
        coordinator: The data update coordinator (provides config_manager, data_loader)
        zone_id: Zone ID to look up offset for

    Returns:
        Offset in °C, or None if disabled/unavailable

    """
    try:
        config_manager = coordinator.config_manager
        if not config_manager or not config_manager.get_offset_enabled():
            return None

        offsets = (coordinator.data or {}).get("offsets")
        if offsets:
            return offsets.get(zone_id)  # type: ignore[no-any-return]
        return None
    except Exception:  # noqa: BLE001 — defensive helper for entity update path
        # Keep existing offset value on error — caller handles fallback
        return None


def update_preset_mode(coordinator: TadoDataUpdateCoordinator) -> str | None:
    """Read preset mode (HOME/AWAY) from home_state.json.

    Returns "home" or "away" (HA preset constants), or None if unavailable.

    Replaces inline _update_preset_mode() in heating.py.

    Args:
        coordinator: The data update coordinator (provides data_loader)

    Returns:
        PRESET_HOME or PRESET_AWAY string, or None if unavailable

    """
    from homeassistant.components.climate import PRESET_AWAY, PRESET_HOME  # type: ignore[attr-defined]

    try:
        home_state = (coordinator.data or {}).get("home_state")
        if home_state:
            presence = home_state.get("presence", "HOME")
            return PRESET_HOME if presence == "HOME" else PRESET_AWAY
    except Exception:  # noqa: BLE001 — defensive helper, property access may raise any error
        # Keep last known preset mode — caller handles fallback
        _LOGGER.debug("Failed to determine preset mode from home state")
    return None


def read_external_sensor(
    hass: HomeAssistant,
    zone_config_manager: ZoneConfigManager | None,
    zone_id: str,
    config_key: str,
) -> float | None:
    """Read a numeric value from an external HA sensor entity.

    Looks up the configured external sensor entity_id from zone config,
    then reads its state. Returns None if not configured, unavailable,
    or non-numeric.

    Args:
        hass: Home Assistant instance
        zone_config_manager: Zone config manager (may be None)
        zone_id: Zone ID to look up config for
        config_key: Config key name (e.g. "external_temp_sensor")

    Returns:
        Float value from the external sensor, or None if unavailable

    """
    if not zone_config_manager:
        return None

    config = zone_config_manager.get_zone_config(zone_id)
    entity_id = config.get(config_key, "")
    if not entity_id:
        return None

    state = hass.states.get(entity_id)
    if state is None or state.state in ("unknown", "unavailable", ""):
        return None

    try:
        return float(state.state)
    except (ValueError, TypeError):
        _LOGGER.debug("External sensor %s has non-numeric state: %s", entity_id, state.state)
        return None


async def api_call_with_rollback(
    entity: Any,
    api_coro: Coroutine,  # type: ignore[type-arg]
    *,
    hvac_mode: HVACMode,
    hvac_action: HVACAction,
    overlay_type: str | None = "MANUAL",
    target_temp: float | None = None,
    reason: str,
) -> bool:
    """Execute API call with optimistic update + rollback pattern.

    Consolidates the repeated pattern across climate_heating.py and climate_ac.py:
    1. Save old state
    2. Set optimistic state
    3. API call with timeout
    4. Success → log + trigger refresh
    5. Failure → rollback to old state

    Args:
        entity: Climate entity (heating or AC)
        api_coro: Awaitable API call (e.g., client.set_zone_overlay(...))
        hvac_mode: Target HVAC mode for optimistic update
        hvac_action: Target HVAC action for optimistic update
        overlay_type: Overlay type to set (None for AUTO/schedule mode)
        target_temp: Optional target temperature
        reason: Reason string for logging and refresh trigger

    Returns:
        True if API call succeeded, False otherwise

    """
    import asyncio

    from .helpers import async_trigger_immediate_refresh

    # Save old state for rollback
    old_mode = entity._attr_hvac_mode
    old_action = entity._attr_hvac_action
    old_overlay = entity._overlay_type

    # Optimistic update
    entity._attr_hvac_mode = hvac_mode
    entity._attr_hvac_action = hvac_action
    entity._overlay_type = overlay_type
    await set_optimistic_fields(
        entity, entity.coordinator,
        expected={"hvac_mode": hvac_mode, "hvac_action": hvac_action},
        preserved_attrs={
            "fan_mode": getattr(entity, "_attr_fan_mode", None),
            "swing_mode": getattr(entity, "_attr_swing_mode", None),
        } if hasattr(entity, "_attr_fan_mode") else None,
    )
    entity.async_write_ha_state()

    # API call with timeout
    api_success = False
    try:
        async with asyncio.timeout(10):
            api_success = await api_coro
    except TimeoutError:
        _LOGGER.warning("TIMEOUT: %s %s timed out", entity._zone_name, reason)
    except Exception as e:  # noqa: BLE001 — HA entity action pattern
        _LOGGER.warning("ERROR: %s %s failed (%s)", entity._zone_name, reason, e)

    if api_success:
        _LOGGER.info("%s: %s", entity._zone_name, reason)
        await async_trigger_immediate_refresh(entity.hass, entity.entity_id, "hvac_mode_change")
    else:
        _LOGGER.warning("ROLLBACK: %s %s failed", entity._zone_name, reason)
        entity._attr_hvac_mode = old_mode
        entity._attr_hvac_action = old_action
        entity._overlay_type = old_overlay
        clear_optimistic_state(entity)
        entity.async_write_ha_state()
        raise HomeAssistantError(
            f"{entity._zone_name}: {reason} failed",
            translation_domain=DOMAIN,
        )

    return api_success


def subscribe_external_sensors(
    entity: Any,
    zone_id: str,
    on_change: Callable[[Event[EventStateChangedData]], None],
    *,
    include_humidity: bool = True,
) -> list[CALLBACK_TYPE]:
    """Subscribe to external sensor state changes for real-time updates.

    Looks up configured external sensors from zone config, validates
    state changes are numeric, and calls on_change for valid updates.

    Args:
        entity: The HA entity (needs .hass and .coordinator attributes)
        zone_id: Zone ID to look up config for
        on_change: Callback to invoke on valid state changes
        include_humidity: If True, also subscribe to humidity sensor

    Returns:
        List of unsubscribe callbacks (caller stores and manages these)

    """
    zcm = entity.coordinator.zone_config_manager
    if not zcm:
        return []

    config = zcm.get_zone_config(zone_id)
    entity_ids: list[str] = []

    temp_sensor = config.get("external_temp_sensor", "")
    if temp_sensor:
        entity_ids.append(temp_sensor)

    if include_humidity:
        humidity_sensor = config.get("external_humidity_sensor", "")
        if humidity_sensor:
            entity_ids.append(humidity_sensor)

    if not entity_ids:
        return []

    @callback
    def _validated_change(event: Event[EventStateChangedData]) -> None:
        """Filter invalid states then delegate to caller's on_change."""
        new_state = event.data.get("new_state")
        if new_state is None or new_state.state in ("unknown", "unavailable", ""):
            return
        try:
            float(new_state.state)
        except (ValueError, TypeError):
            return
        on_change(event)

    unsub = async_track_state_change_event(entity.hass, entity_ids, _validated_change)
    return [unsub]


def unsubscribe_external_sensors(unsub_list: list[CALLBACK_TYPE]) -> None:
    """Unsubscribe from external sensor state change listeners.

    Args:
        unsub_list: List of unsubscribe callbacks to invoke and clear

    """
    for unsub in unsub_list:
        unsub()
    unsub_list.clear()
