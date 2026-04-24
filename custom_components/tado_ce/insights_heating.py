"""Heating insights — anomaly, preheat, boiler flow, efficiency.

Provides insight functions for heating-related conditions.
"""

from __future__ import annotations

from .insights_models import (
    BOILER_FLOW_HIGH_DEMAND,
    BOILER_FLOW_HIGH_TEMP,
    BOILER_FLOW_LOW_DEMAND,
    BOILER_FLOW_LOW_TEMP,
    CONFIDENCE_ADEQUATE,
    CONFIDENCE_LOW,
    CONFIDENCE_MODERATE,
    HEATING_ANOMALY_MIN_MINUTES,
    HEATING_ANOMALY_POWER_THRESHOLD,
    HEATING_ANOMALY_TEMP_DELTA,
    HEATING_OFF_COLD_MIN_DEFICIT,
    HEATING_RATE_SLOW,
    PREHEAT_LONG_MINUTES,
    THERMAL_EFFICIENCY_MIN_CONFIDENCE,
    THERMAL_INERTIA_HIGH_MINUTES,
    Insight,
    InsightPriority,
)


def calculate_heating_anomaly_insight(
    heating_power_pct: float | None = None,
    temp_delta: float | None = None,
    duration_minutes: int = 0,
    zone_name: str = "",
) -> Insight | None:
    """Detect heating power anomaly.

    Triggers when heating_power >= 80% AND temp_delta < 0.5C for 60+ min,
    indicating the heating system may not be working effectively.

    Args:
        heating_power_pct: Current heating power percentage (0-100)
        temp_delta: Temperature change over the monitoring period
        duration_minutes: How long the condition has persisted
        zone_name: Name of the zone

    Returns:
        Insight with HIGH priority if anomaly detected, None otherwise
    """
    if heating_power_pct is None or temp_delta is None:
        return None
    if duration_minutes < HEATING_ANOMALY_MIN_MINUTES:
        return None
    if heating_power_pct < HEATING_ANOMALY_POWER_THRESHOLD or temp_delta >= HEATING_ANOMALY_TEMP_DELTA:
        return None

    hours = duration_minutes / 60
    rec = (
        f"{zone_name}: Heating at {heating_power_pct:.0f}% for {hours:.1f}h "
        f"but temp only changed {temp_delta:.1f}\u00b0C \u2014 "
        f"check TRV/radiator for blockage or air lock"
    )

    return Insight(
        priority=InsightPriority.HIGH,
        recommendation=rec,
        insight_type="heating_anomaly",
        zone_name=zone_name,
    )


def calculate_preheat_timing_insight(
    preheat_time_minutes: float | None = None,
    next_schedule_time: str | None = None,
    zone_name: str = "",
) -> Insight | None:
    """Calculate preheat timing insight.

    Combines Thermal Analytics preheat_time with Smart Comfort
    next_schedule_time to advise when preheating should start.

    Args:
        preheat_time_minutes: Estimated preheat time in minutes
        next_schedule_time: Next schedule change time (ISO format or HH:MM)
        zone_name: Name of the zone

    Returns:
        Insight if preheat timing is relevant, None otherwise
    """
    if preheat_time_minutes is None or next_schedule_time is None:
        return None
    if preheat_time_minutes <= 0:
        return None

    # Parse time string
    time_str = str(next_schedule_time)
    rec = (
        f"{zone_name}: Preheat takes ~{preheat_time_minutes:.0f} min. "
        f"Next schedule change at {time_str} \u2014 "
        f"start heating {preheat_time_minutes:.0f} min before."
    )

    priority = InsightPriority.LOW
    if preheat_time_minutes > PREHEAT_LONG_MINUTES:
        priority = InsightPriority.MEDIUM

    return Insight(
        priority=priority,
        recommendation=rec,
        insight_type="preheat_timing",
        zone_name=zone_name,
    )


def calculate_boiler_flow_anomaly_insight(
    flow_temp: float | None = None,
    heating_power_pct: float | None = None,
    zone_name: str = "",
) -> Insight | None:
    """Detect boiler flow temperature anomaly relative to heating demand.

    Triggers when flow temp is high but heating demand is low, or
    flow temp is low but heating demand is high.

    Args:
        flow_temp: Boiler flow temperature in \u00b0C
        heating_power_pct: Current heating power percentage (0-100)
        zone_name: Name of the zone (or empty for hub-level)

    Returns:
        Insight if flow temp anomaly detected, None otherwise
    """
    if flow_temp is None or heating_power_pct is None:
        return None

    # High flow temp but low demand
    if flow_temp > BOILER_FLOW_HIGH_TEMP and heating_power_pct < BOILER_FLOW_LOW_DEMAND:
        rec = (
            f"Boiler flow temp is {flow_temp:.0f}\u00b0C but heating demand "
            f"is only {heating_power_pct:.0f}% \u2014 flow temperature may be "
            f"set too high, consider lowering for efficiency"
        )
        return Insight(
            priority=InsightPriority.MEDIUM,
            recommendation=rec,
            insight_type="boiler_flow_anomaly",
            zone_name=zone_name or None,
        )

    # Low flow temp but high demand
    if flow_temp < BOILER_FLOW_LOW_TEMP and heating_power_pct > BOILER_FLOW_HIGH_DEMAND:
        rec = (
            f"Boiler flow temp is only {flow_temp:.0f}\u00b0C but heating "
            f"demand is {heating_power_pct:.0f}% \u2014 boiler may not be "
            f"firing correctly, check boiler status"
        )
        return Insight(
            priority=InsightPriority.HIGH,
            recommendation=rec,
            insight_type="boiler_flow_anomaly",
            zone_name=zone_name or None,
        )

    return None


def calculate_poor_thermal_efficiency_insight(
    thermal_inertia: float | None = None,
    heating_rate: float | None = None,
    confidence_score: float | None = None,
    zone_name: str = "",
) -> Insight | None:
    """Detect poor thermal efficiency from Thermal Analytics data.

    Triggers when thermal inertia is high or heating rate is very low,
    suggesting insulation or radiator issues.

    Args:
        thermal_inertia: Thermal inertia in minutes
        heating_rate: Heating rate in \u00b0C/hour
        confidence_score: Analysis confidence (0.0-1.0)
        zone_name: Name of the zone

    Returns:
        Insight if poor efficiency detected, None otherwise
    """
    if confidence_score is not None and confidence_score < THERMAL_EFFICIENCY_MIN_CONFIDENCE:
        return None
    if thermal_inertia is None and heating_rate is None:
        return None

    issues = []
    if thermal_inertia is not None and thermal_inertia > THERMAL_INERTIA_HIGH_MINUTES:
        issues.append(f"thermal inertia is {thermal_inertia:.0f} min (high)")
    if heating_rate is not None and heating_rate < HEATING_RATE_SLOW:
        issues.append(f"heating rate is {heating_rate:.2f}\u00b0C/h (slow)")

    if not issues:
        return None

    issues_str = " and ".join(issues)
    rec = f"{zone_name}: {issues_str} \u2014 check insulation, radiator sizing, or TRV operation"

    return Insight(
        priority=InsightPriority.MEDIUM,
        recommendation=rec,
        insight_type="thermal_efficiency",
        zone_name=zone_name,
    )


def calculate_heating_off_cold_room_insight(
    power_state: str | None = None,
    current_temp: float | None = None,
    target_temp: float | None = None,
    zone_name: str = "",
) -> Insight | None:
    """Detect when heating is OFF but room has dropped significantly below target.

    Args:
        power_state: Zone power state ("ON", "OFF")
        current_temp: Current room temperature
        target_temp: Last known or scheduled target temperature
        zone_name: Name of the zone

    Returns:
        Insight if room is cold with heating off, None otherwise
    """
    if power_state is None or power_state.upper() != "OFF":
        return None
    if current_temp is None or target_temp is None:
        return None

    deficit = target_temp - current_temp
    if deficit < HEATING_OFF_COLD_MIN_DEFICIT:
        return None

    rec = (
        f"{zone_name}: Heating is OFF but room is {current_temp:.1f}\u00b0C "
        f"({deficit:.1f}\u00b0C below target {target_temp:.0f}\u00b0C) "
        f"\u2014 consider turning heating back on"
    )

    return Insight(
        priority=InsightPriority.MEDIUM,
        recommendation=rec,
        insight_type="heating_off_cold",
        zone_name=zone_name,
    )


def calculate_confidence_recommendation(
    confidence_percent: float | None,
    zone_name: str,
    cycle_count: int = 0,
    completed_count: int = 0,
) -> str:
    """Calculate SMART recommendation for thermal analysis confidence.

    Args:
        confidence_percent: Confidence score as percentage (0-100)
        zone_name: Name of the zone
        cycle_count: Total heating cycles detected
        completed_count: Completed heating cycles analyzed

    Returns:
        SMART recommendation string (empty if confidence is adequate)
    """
    if confidence_percent is None:
        return ""

    if confidence_percent >= CONFIDENCE_ADEQUATE:
        return ""

    if confidence_percent < CONFIDENCE_LOW:
        needed = max(5 - completed_count, 1)
        return (
            f"{zone_name}: Low analysis confidence ({confidence_percent:.0f}%) "
            f"\u2014 need {needed} more complete heating cycles for reliable estimates"
        )

    if confidence_percent < CONFIDENCE_MODERATE:
        needed = max(3 - completed_count, 1)
        return (
            f"{zone_name}: Moderate confidence ({confidence_percent:.0f}%) "
            f"\u2014 {needed} more heating cycles will improve preheat accuracy"
        )

    # 50-70%
    return (
        f"{zone_name}: Building confidence ({confidence_percent:.0f}%) "
        f"\u2014 estimates improving with each heating cycle"
    )
