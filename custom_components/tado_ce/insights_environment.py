"""Environment insights — mold risk, comfort, condensation, humidity trend."""

from __future__ import annotations

from typing import Any

from .insights_models import (
    HUMIDITY_TREND_MIN_RISE,
    HUMIDITY_TREND_MIN_SAMPLES,
    MOLD_HUMIDITY_CRITICAL,
    MOLD_HUMIDITY_HIGH,
    MOLD_HUMIDITY_MEDIUM,
    MOLD_MARGIN_HIGH,
    MOLD_MARGIN_MEDIUM,
    Insight,
    InsightPriority,
)


def _mold_critical_recommendation(
    zone_name: str,
    humidity: float | None,
    current_temp: float | None,
    target_temp: float | None,
) -> str:
    """Build mold risk recommendation for Critical level."""
    transition = "Critical\u2192High"
    actions: list[str] = []
    if humidity and humidity > MOLD_HUMIDITY_CRITICAL:
        delta_h = round(humidity - 60)
        actions.append(f"reduce humidity by {delta_h}% (from {humidity:.0f}% to <60%)")
    if current_temp and target_temp and current_temp < target_temp:
        delta_t = round(target_temp - current_temp, 1)
        actions.append(f"increase heating by {delta_t}\u00b0C (to {target_temp:.0f}\u00b0C)")
    elif current_temp:
        suggested = (target_temp + 2) if target_temp else (current_temp + 2)
        if suggested <= current_temp:
            actions.append("check wall/window insulation \u2014 room warm but surfaces cold")
        else:
            delta = round(suggested - current_temp, 1)
            actions.append(f"increase heating by +{delta}\u00b0C (to {suggested:.0f}\u00b0C)")

    if actions:
        return f"{zone_name} [{transition}]: URGENT \u2014 {' and '.join(actions)}. Ventilate 10 min."
    return f"{zone_name} [{transition}]: URGENT \u2014 Ventilate 10 min and increase heating by +2\u00b0C"


def _mold_high_recommendation(
    zone_name: str,
    humidity: float | None,
    margin: float | None,
    current_temp: float | None,
    target_temp: float | None,
) -> str:
    """Build mold risk recommendation for High level."""
    transition = "High\u2192Medium"
    if humidity and humidity > MOLD_HUMIDITY_HIGH:
        delta_h = round(humidity - 55)
        return (
            f"{zone_name} [{transition}]: Humidity {humidity:.0f}% "
            f"(reduce by {delta_h}% to 55%) \u2014 dehumidifier or ventilate 15 min"
        )
    if margin is not None and margin < MOLD_MARGIN_HIGH:
        needed = round(5 - margin, 1)
        base_temp = target_temp or current_temp
        if base_temp:
            suggested = base_temp + 1.5
            if current_temp and suggested <= current_temp:
                return (
                    f"{zone_name} [{transition}]: Surface {margin:.1f}\u00b0C above dew point "
                    f"(need +{needed}\u00b0C margin) \u2014 improve insulation or ventilate 15 min"
                )
            return (
                f"{zone_name} [{transition}]: Surface {margin:.1f}\u00b0C above dew point "
                f"(need +{needed}\u00b0C margin) \u2014 increase heating by +1.5\u00b0C (to {suggested:.0f}\u00b0C)"
            )
    return f"{zone_name} [{transition}]: Ventilate 15 min or increase heating by +1.5\u00b0C"


def _mold_medium_recommendation(
    zone_name: str,
    humidity: float | None,
    margin: float | None,
) -> str:
    """Build mold risk recommendation for Medium level."""
    transition = "Medium\u2192Low"
    if humidity and humidity > MOLD_HUMIDITY_MEDIUM:
        delta_h = round(humidity - 55)
        return (
            f"{zone_name} [{transition}]: Humidity {humidity:.0f}% "
            f"(reduce by {delta_h}% to 55%) \u2014 ventilate 10 min after cooking/showering"
        )
    if margin is not None and margin < MOLD_MARGIN_MEDIUM:
        needed = round(7 - margin, 1)
        return (
            f"{zone_name} [{transition}]: Surface {margin:.1f}\u00b0C above dew point "
            f"(need +{needed}\u00b0C margin) \u2014 ensure adequate ventilation"
        )
    return f"{zone_name} [{transition}]: Moderate risk \u2014 ventilate daily 10 min"


def calculate_mold_risk_recommendation(
    risk_level: str,
    zone_name: str,
    humidity: float | None = None,
    surface_temp: float | None = None,
    dew_point: float | None = None,
    current_temp: float | None = None,
    target_temp: float | None = None,
) -> str:
    """Calculate SMART recommendation for mold risk with delta format."""
    if risk_level in ("Minimal", "Low"):
        return ""

    margin = None
    if surface_temp is not None and dew_point is not None:
        margin = surface_temp - dew_point

    if risk_level == "Critical":
        return _mold_critical_recommendation(zone_name, humidity, current_temp, target_temp)
    if risk_level == "High":
        return _mold_high_recommendation(zone_name, humidity, margin, current_temp, target_temp)
    if risk_level == "Medium":
        return _mold_medium_recommendation(zone_name, humidity, margin)
    return ""


def _comfort_cold_recommendation(
    zone_name: str,
    current_temp: float | None,
    target_temp: float | None,
    hvac_mode: str | None,
    hvac_action: str | None,
) -> str:
    """Build comfort recommendation for cold states."""
    if current_temp is not None and target_temp is not None:
        diff = round(target_temp - current_temp, 1)
        if diff > 0:
            if hvac_mode == "off":
                return f"{zone_name}: {current_temp:.1f}\u00b0C, target {target_temp:.0f}\u00b0C \u2014 turn on heating"
            if hvac_action == "heating":
                return (
                    f"{zone_name}: Heating in progress \u2014 "
                    f"{current_temp:.1f}\u00b0C, {diff:.1f}\u00b0C below target. "
                    f"Allow 15\u201330 min to reach {target_temp:.0f}\u00b0C"
                )
            if hvac_action in ("idle", "off"):
                suggested = min(target_temp + 1, 25)
                return (
                    f"{zone_name}: {current_temp:.1f}\u00b0C, "
                    f"{diff:.1f}\u00b0C below target but heating idle \u2014 "
                    f"increase setpoint to {suggested:.0f}\u00b0C"
                )
            suggested = min(target_temp + 1, 25)
            return (
                f"{zone_name}: {current_temp:.1f}\u00b0C, "
                f"{diff:.1f}\u00b0C below target \u2014 "
                f"increase setpoint to {suggested:.0f}\u00b0C if not warming up"
            )
        suggested = current_temp + 2
        return f"{zone_name}: {current_temp:.1f}\u00b0C feels cold \u2014 set heating to {suggested:.0f}\u00b0C"
    return f"{zone_name}: Room too cold \u2014 increase heating setpoint by 2\u00b0C"


def _comfort_hot_recommendation(
    zone_name: str,
    current_temp: float | None,
    target_temp: float | None,
    heat_index: float | None,
    heat_risk_level: str | None,
) -> str:
    """Build comfort recommendation for hot states."""
    hi_suffix = ""
    if heat_index is not None and heat_risk_level is not None and heat_risk_level != "None":
        hi_suffix = f" (feels like {heat_index:.1f}°C — {heat_risk_level})"

    if current_temp is not None:
        if target_temp is not None and current_temp > target_temp:
            over = round(current_temp - target_temp, 1)
            rec = (
                f"{zone_name}: {current_temp:.1f}°C, "
                f"{over:.1f}°C above target \u2014 open window or reduce heating{hi_suffix}"
            )
        else:
            suggested = max(current_temp - 2, 18)
            rec = (
                f"{zone_name}: {current_temp:.1f}°C too warm \u2014 "
                f"reduce setpoint to {suggested:.0f}°C or open window{hi_suffix}"
            )
    else:
        rec = f"{zone_name}: Room too hot \u2014 reduce heating setpoint by 2°C or open window{hi_suffix}"

    if heat_risk_level in ("Danger", "Extreme Danger"):
        rec = f"⚠️ {zone_name}: Heat risk {heat_risk_level} — {rec[len(zone_name) + 2:]}"
    return rec


def calculate_comfort_recommendation(
    comfort_state: str,
    zone_name: str,
    current_temp: float | None = None,
    target_temp: float | None = None,
    humidity: float | None = None,
    hvac_mode: str | None = None,
    hvac_action: str | None = None,
    heat_index: float | None = None,
    heat_risk_level: str | None = None,
) -> str:
    """Calculate SMART recommendation for comfort level with time frame."""
    if comfort_state == "Comfortable":
        return ""

    if comfort_state in ("Too Cold", "Cold", "Cool", "Freezing"):
        return _comfort_cold_recommendation(zone_name, current_temp, target_temp, hvac_mode, hvac_action)

    if comfort_state in ("Too Hot", "Hot", "Warm", "Sweltering"):
        return _comfort_hot_recommendation(zone_name, current_temp, target_temp, heat_index, heat_risk_level)

    if comfort_state == "Too Humid":
        if humidity is not None:
            return f"{zone_name}: Humidity {humidity:.0f}% too high \u2014 run dehumidifier or ventilate to reach 55%"
        return f"{zone_name}: High humidity \u2014 run dehumidifier or open window for 15 minutes"

    if comfort_state == "Too Dry":
        if humidity is not None:
            return f"{zone_name}: Humidity {humidity:.0f}% too low \u2014 use humidifier to reach 45%"
        return f"{zone_name}: Low humidity \u2014 use humidifier or place water bowl near radiator"

    return ""


def calculate_condensation_recommendation(
    risk_level: str,
    zone_name: str,
    margin: float | None = None,
    ac_setpoint: float | None = None,
    current_temp: float | None = None,
) -> str:
    """Calculate SMART recommendation for condensation risk (AC zones)."""
    if risk_level in ("Minimal", "Low"):
        return ""

    if risk_level == "Critical":
        if ac_setpoint is not None:
            suggested = ac_setpoint + 2
            return (
                f"{zone_name}: URGENT condensation risk \u2014 increase AC setpoint "
                f"from {ac_setpoint:.0f}°C to {suggested:.0f}°C immediately"
            )
        return f"{zone_name}: URGENT condensation risk \u2014 increase AC setpoint by 2°C and improve ventilation"

    if risk_level == "High":
        if ac_setpoint is not None and margin is not None:
            suggested = ac_setpoint + 1
            return f"{zone_name}: Only {margin:.1f}°C above dew point \u2014 increase AC setpoint to {suggested:.0f}°C"
        return f"{zone_name}: High condensation risk \u2014 increase AC setpoint by 1°C"

    if risk_level == "Medium":
        if margin is not None:
            return (
                f"{zone_name}: {margin:.1f}°C above dew point "
                f"\u2014 monitor conditions, consider raising AC setpoint"
            )
        return f"{zone_name}: Moderate condensation risk \u2014 ensure adequate ventilation"

    return ""


def calculate_heating_condensation_recommendation(
    risk_level: str,
    zone_name: str,
    margin: float | None = None,
    humidity: float | None = None,
    surface_temp: float | None = None,
    dew_point: float | None = None,
) -> str:
    """Calculate SMART recommendation for condensation risk on heating-zone window inner surfaces."""
    if risk_level in ("None", "Low"):
        return ""

    if risk_level == "Critical":
        parts = [f"{zone_name}: URGENT — condensation forming on windows"]
        if surface_temp is not None and dew_point is not None and margin is not None:
            parts.append(
                f"Surface temp {surface_temp:.1f}°C is {abs(margin):.1f}°C below dew point {dew_point:.1f}°C",
            )
        parts.append("Open window briefly, use extractor fan, wipe surfaces")
        return ". ".join(parts)

    if risk_level == "High":
        parts = [f"{zone_name}: Windows likely fogging"]
        if margin is not None and dew_point is not None:
            parts.append(
                f"Surface temp only {margin:.1f}°C above dew point {dew_point:.1f}°C",
            )
        parts.append("Ventilate or increase heating")
        return ". ".join(parts)

    if risk_level == "Medium":
        parts = [f"{zone_name}: Monitor — condensation possible"]
        if margin is not None and dew_point is not None:
            parts.append(
                f"Surface temp {margin:.1f}°C above dew point {dew_point:.1f}°C",
            )
        parts.append("Ensure adequate ventilation")
        return ". ".join(parts)

    return ""


def calculate_humidity_trend_insight(
    current_humidity: float | None = None,
    humidity_history: list[Any] | None = None,
    zone_name: str = "",
) -> Insight | None:
    """Detect rising humidity trend in a zone (current vs recent average)."""
    if current_humidity is None or not humidity_history:
        return None
    if len(humidity_history) < HUMIDITY_TREND_MIN_SAMPLES:
        return None

    avg_history = sum(humidity_history) / len(humidity_history)
    rise = current_humidity - avg_history
    if rise < HUMIDITY_TREND_MIN_RISE:
        return None

    rec = (
        f"{zone_name}: Humidity rising \u2014 currently {current_humidity:.0f}% "
        f"(+{rise:.0f}% above recent average of {avg_history:.0f}%) "
        f"\u2014 ventilate to prevent mold risk"
    )

    return Insight(
        priority=InsightPriority.MEDIUM,
        recommendation=rec,
        insight_type="humidity_trend",
        zone_name=zone_name,
    )
