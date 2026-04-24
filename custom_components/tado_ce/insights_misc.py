"""Miscellaneous insights — presence, schedule, weather.

Merged from insights_presence.py, insights_schedule.py, insights_weather.py.
"""

from __future__ import annotations

from typing import Any

from .insights_models import (
    FROST_RISK_TEMP,
    HOME_COLD_MIN_DEFICIT,
    SCHEDULE_GAP_MIN_DEFICIT,
    SCHEDULE_GAP_MIN_OFF_HOURS,
    WEATHER_COLD_SNAP_DELTA,
    WEATHER_SEVERE_COLD_SNAP_DELTA,
    Insight,
    InsightPriority,
)

# ── Presence insights ────────────────────────────────────────────────


def calculate_away_heating_active_insight(
    presence: str | None = None,
    active_zones: list[Any] | None = None,
) -> Insight | None:
    """Detect energy waste: home is AWAY but zones still heating/cooling.

    Args:
        presence: Home presence state ("HOME", "AWAY", etc.)
        active_zones: List of dicts with keys: zone_name, power_pct, zone_type
            Only zones with power > 0 should be included.

    Returns:
        Insight if AWAY with active heating/cooling, None otherwise
    """
    if presence is None or presence.upper() != "AWAY":
        return None
    if not active_zones:
        return None

    zone_descs = []
    for z in active_zones[:5]:
        name = z.get("zone_name", "Unknown")
        pct = z.get("power_pct", 0)
        zone_descs.append(f"{name} ({pct:.0f}%)")

    zones_str = ", ".join(zone_descs)
    rec = f"Home is AWAY but {len(active_zones)} zone(s) still active: {zones_str} \u2014 check if this is intentional"

    return Insight(
        priority=InsightPriority.HIGH,
        recommendation=rec,
        insight_type="away_heating",
        zone_name=None,
    )


def calculate_home_all_off_insight(
    presence: str | None = None,
    all_zones_off: bool = True,
    coldest_zone_name: str | None = None,
    coldest_zone_temp: float | None = None,
    coldest_zone_target: float | None = None,
) -> Insight | None:
    """Detect when someone is home but all heating is off and rooms are cold.

    Args:
        presence: Home presence state
        all_zones_off: Whether all zones have power=OFF
        coldest_zone_name: Name of the coldest zone
        coldest_zone_temp: Temperature of the coldest zone
        coldest_zone_target: Scheduled target of the coldest zone

    Returns:
        Insight if HOME with all zones off and cold, None otherwise
    """
    if presence is None or presence.upper() != "HOME":
        return None
    if not all_zones_off:
        return None
    if coldest_zone_temp is None or coldest_zone_target is None:
        return None

    deficit = coldest_zone_target - coldest_zone_temp
    if deficit < HOME_COLD_MIN_DEFICIT:
        return None

    rec = (
        f"Someone is home but all heating is off. "
        f"{coldest_zone_name}: {coldest_zone_temp:.1f}\u00b0C "
        f"({deficit:.1f}\u00b0C below target {coldest_zone_target:.0f}\u00b0C)"
    )

    return Insight(
        priority=InsightPriority.MEDIUM,
        recommendation=rec,
        insight_type="home_all_off",
        zone_name=None,
    )


# ── Schedule insights ────────────────────────────────────────────────


def calculate_schedule_gap_insight(
    schedule_blocks: list[Any] | None = None,
    current_temp: float | None = None,
    next_target_temp: float | None = None,
    longest_off_hours: float | None = None,
    zone_name: str = "",
) -> Insight | None:
    """Detect long OFF gaps in schedule while room is cold.

    Triggers when the schedule has a long continuous OFF period and the
    current room temperature is below the next scheduled target.

    Args:
        schedule_blocks: List of schedule block dicts (not used directly,
                but indicates schedule exists)
        current_temp: Current room temperature
        next_target_temp: Next scheduled target temperature
        longest_off_hours: Duration of longest OFF period in hours
        zone_name: Name of the zone

    Returns:
        Insight if significant gap found, None otherwise
    """
    if schedule_blocks is None or current_temp is None:
        return None
    if next_target_temp is None or longest_off_hours is None:
        return None
    if longest_off_hours < SCHEDULE_GAP_MIN_OFF_HOURS:
        return None

    temp_deficit = next_target_temp - current_temp
    if temp_deficit < SCHEDULE_GAP_MIN_DEFICIT:
        return None

    rec = (
        f"{zone_name}: Schedule has a {longest_off_hours:.0f}h OFF gap and "
        f"room is {current_temp:.1f}\u00b0C ({temp_deficit:.1f}\u00b0C below "
        f"next target {next_target_temp:.0f}\u00b0C) \u2014 consider adding a "
        f"setback temperature to prevent deep cooling"
    )

    return Insight(
        priority=InsightPriority.MEDIUM,
        recommendation=rec,
        insight_type="schedule_gap",
        zone_name=zone_name,
    )


# ── Weather insights ─────────────────────────────────────────────────


def calculate_weather_impact_insight(
    current_outdoor_temp: float | None = None,
    avg_outdoor_temp_7d: float | None = None,
    zone_name: str = "",
) -> Insight | None:
    """Calculate weather impact insight.

    Triggers when current outdoor temp is > 5C colder than 7-day average,
    estimating increased heating demand.

    Args:
        current_outdoor_temp: Current outdoor temperature
        avg_outdoor_temp_7d: 7-day average outdoor temperature
        zone_name: Name of the zone (or empty for home-level)

    Returns:
        Insight if significant weather impact, None otherwise
    """
    if current_outdoor_temp is None or avg_outdoor_temp_7d is None:
        return None

    diff = round(avg_outdoor_temp_7d - current_outdoor_temp, 1)
    if diff <= WEATHER_COLD_SNAP_DELTA:
        return None

    # Rough estimate: each 1C drop increases heating by ~3-5%
    impact_pct = round(diff * 4)  # ~4% per degree

    rec = (
        f"Cold snap: {current_outdoor_temp:.0f}\u00b0C outdoor, "
        f"{diff:.0f}\u00b0C below 7-day average. "
        f"Estimated {impact_pct}% increase in heating demand"
    )

    priority = InsightPriority.LOW
    if diff > WEATHER_SEVERE_COLD_SNAP_DELTA:
        priority = InsightPriority.MEDIUM

    return Insight(
        priority=priority,
        recommendation=rec,
        insight_type="weather_impact",
        zone_name=zone_name or None,
    )


def calculate_frost_risk_insight(
    outdoor_temp: float | None = None,
) -> Insight | None:
    """Warn about frost/pipe freezing risk when outdoor temp near freezing.

    Args:
        outdoor_temp: Current outdoor temperature in °C

    Returns:
        Insight if frost risk detected, None otherwise
    """
    if outdoor_temp is None:
        return None
    if outdoor_temp > FROST_RISK_TEMP:
        return None

    if outdoor_temp <= 0:
        rec = (
            f"Outdoor temperature is {outdoor_temp:.1f}\u00b0C (below freezing) "
            f"\u2014 ensure heating is not fully off to prevent pipe freezing"
        )
        priority = InsightPriority.HIGH
    else:
        rec = (
            f"Outdoor temperature is {outdoor_temp:.1f}\u00b0C (approaching "
            f"freezing) \u2014 monitor heating to prevent pipe freezing risk"
        )
        priority = InsightPriority.MEDIUM

    return Insight(
        priority=priority,
        recommendation=rec,
        insight_type="frost_risk",
        zone_name=None,
    )
