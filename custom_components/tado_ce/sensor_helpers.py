"""Tado CE sensor helper functions — outdoor temperature, effective temperature, surface RH."""

from __future__ import annotations

import logging
from typing import TYPE_CHECKING, Any

from .calculations import calculate_surface_temperature

if TYPE_CHECKING:
    from homeassistant.core import HomeAssistant

    from .config_manager import ConfigurationManager
    from .zone_config_manager import ZoneConfigManager

_LOGGER = logging.getLogger(__name__)


def get_outdoor_temperature(hass: HomeAssistant, entity_id: str, use_feels_like: bool = False) -> float | None:
    """Get outdoor temperature from a configured entity.

    Supports both weather entities (reads 'temperature' attribute) and
    regular sensor entities (reads state value).

    When *use_feels_like* is True and the source is a weather entity,
    tries 'apparent_temperature' then 'feels_like' before falling back
    to 'temperature'.

    Args:
        hass: Home Assistant instance
        entity_id: Entity ID of outdoor temperature sensor or weather entity
        use_feels_like: Whether to prefer feels-like temperature

    Returns:
        Outdoor temperature in °C, or None if not available
    """
    if not hass or not entity_id:
        return None

    try:
        state = hass.states.get(entity_id)
        if state is None or state.state in ("unknown", "unavailable"):
            return None

        if entity_id.startswith("weather."):
            if use_feels_like:
                temp = state.attributes.get("apparent_temperature")
                if temp is None:
                    temp = state.attributes.get("feels_like")
                if temp is None:
                    temp = state.attributes.get("temperature")
            else:
                temp = state.attributes.get("temperature")

            if temp is not None:
                return float(temp)
        else:
            return float(state.state)
    except (ValueError, TypeError):
        pass
    except Exception as e:  # noqa: BLE001 — defensive helper, external state access may raise any error
        _LOGGER.debug("Error getting outdoor temperature from %s: %s", entity_id, e)

    return None


def get_effective_temperature(
    hass: HomeAssistant,
    zone_id: str,
    room_temp: float,
    config_manager: ConfigurationManager = None,  # type: ignore[assignment]
    zone_config_manager: ZoneConfigManager = None,  # type: ignore[assignment]
) -> tuple[Any, ...]:
    """Get effective temperature for mold risk calculation.

    2-tier strategy:
    - Tier 1: Surface temperature estimation (if outdoor temp + window type available)
    - Tier 2: Room average temperature (fallback)

    Accepts config_manager/zone_config_manager directly
    instead of entry_id (CoordinatorEntity migration).
    """
    from .const import DEFAULT_WINDOW_TYPE, WINDOW_U_VALUES

    fallback = (room_temp, None, None, "Room Average", 0.0)

    try:
        if not config_manager:
            return fallback

        outdoor_entity = config_manager.get_outdoor_temp_entity()
        if not outdoor_entity:
            return fallback

        outdoor_temp = get_outdoor_temperature(
            hass,
            outdoor_entity,
            config_manager.get_use_feels_like(),
        )
        if outdoor_temp is None:
            return fallback

        # Get U-value and surface offset (per-zone or global)
        if zone_config_manager:
            u_value = zone_config_manager.get_window_u_value(zone_id)
            surface_offset = zone_config_manager.get_surface_temp_offset(zone_id)
        else:
            window_type = config_manager.get_mold_risk_window_type()
            u_value = WINDOW_U_VALUES.get(window_type, WINDOW_U_VALUES[DEFAULT_WINDOW_TYPE])
            surface_offset = 0.0

        # Calculate surface temperature using heat transfer physics
        surface_temp = calculate_surface_temperature(room_temp, outdoor_temp, u_value)

        # Apply calibration offset
        if surface_offset != 0.0:
            surface_temp = surface_temp + surface_offset
            source = "Calibrated"
        else:
            source = "Estimated"

        return (surface_temp, outdoor_temp, surface_temp, source, surface_offset)

    except Exception as e:  # noqa: BLE001 — defensive helper for entity update path
        _LOGGER.debug("Error determining temperature source for zone %s: %s", zone_id, e)
        return fallback


__all__ = ["get_outdoor_temperature"]
