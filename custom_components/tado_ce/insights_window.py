"""Window detection insights — active and passive open-window detection."""

from __future__ import annotations

from .insights_models import (
    OUTDOOR_DIFF_HIGH,
    OUTDOOR_DIFF_LOW,
    PASSIVE_WEIGHT_HUMIDITY,
    PASSIVE_WEIGHT_OUTDOOR,
    PASSIVE_WEIGHT_TEMP,
    SEASONAL_COLD_THRESHOLD,
    WINDOW_MIN_READINGS,
    WINDOW_PASSIVE_SENSITIVITY_PRESETS,
    WINDOW_SENSITIVITY_PRESETS,
    InsightTemperatureReading,
    WindowPredictedResult,
)


def _classify_confidence(
    anomaly_count: int,
    total_change: float,
    high_confidence_count: int,
    high_confidence_change: float,
    medium_change_threshold: float,
) -> str:
    """Classify window detection confidence level."""
    if anomaly_count >= high_confidence_count and total_change >= high_confidence_change:
        return "high"
    if anomaly_count >= high_confidence_count or total_change >= medium_change_threshold:
        return "medium"
    return "low"


def _build_recommendation(
    zone_name: str,
    confidence: str,
    hvac_mode: str,
    total_change: float,
    anomaly_count: int,
) -> str:
    """Build a human-readable recommendation string."""
    action = "heating active but temperature dropping" if hvac_mode == "heating" else "cooling active but temperature rising"

    if confidence == "high":
        return (
            f"{zone_name}: Close window now — {action}, {total_change:.1f}°C "
            f"change over {anomaly_count} readings"
        )
    if confidence == "medium":
        return (
            f"{zone_name}: Check windows — {action}, "
            f"{total_change:.1f}°C change detected"
        )
    return f"{zone_name}: Verify windows are closed — {action}"


def detect_window_predicted(
    readings: list[InsightTemperatureReading],
    hvac_active: bool,
    zone_name: str = "Room",
    temp_threshold: float = 1.5,
    time_window_minutes: int = 5,
    humidity_check: bool = True,
    hvac_mode: str = "heating",
    consecutive_drops: int = 2,
    sensitivity: str = "medium",
) -> WindowPredictedResult:
    """Detect possible open window via heating/cooling anomaly detection.

    When HVAC is active but temperature moves in the wrong direction across
    consecutive polling readings, an open window is the most likely cause.
    """
    _not_detected = WindowPredictedResult(
        detected=False, confidence="none", temp_drop=0.0,
        time_window_minutes=time_window_minutes, recommendation="", anomaly_readings=0,
    )

    if not hvac_active or len(readings) < WINDOW_MIN_READINGS:
        return _not_detected

    preset = WINDOW_SENSITIVITY_PRESETS.get(sensitivity, WINDOW_SENSITIVITY_PRESETS["medium"])
    consecutive_drops = int(preset["consecutive_drops"])
    high_confidence_count = int(preset["high_confidence_count"])
    high_confidence_change = float(preset["high_confidence_change"])
    medium_change_threshold = float(preset["medium_change_threshold"])

    anomaly_count = 0
    for i in range(len(readings) - 1, 0, -1):
        is_anomaly = (
            readings[i].temperature < readings[i - 1].temperature
            if hvac_mode == "heating"
            else readings[i].temperature > readings[i - 1].temperature
        )
        if is_anomaly:
            anomaly_count += 1
        else:
            break

    if anomaly_count < consecutive_drops:
        return _not_detected

    start_idx = len(readings) - 1 - anomaly_count
    total_change = abs(readings[start_idx].temperature - readings[-1].temperature)

    confidence = _classify_confidence(
        anomaly_count, total_change, high_confidence_count,
        high_confidence_change, medium_change_threshold,
    )
    recommendation = _build_recommendation(zone_name, confidence, hvac_mode, total_change, anomaly_count)

    return WindowPredictedResult(
        detected=True, confidence=confidence, temp_drop=round(total_change, 2),
        time_window_minutes=time_window_minutes, recommendation=recommendation,
        anomaly_readings=anomaly_count,
    )


def _redistribute_weights(
    has_humidity: bool,
    has_outdoor: bool,
) -> tuple[float, float, float]:
    """Redistribute signal weights when signals are unavailable.

    Returns (temp_weight, humidity_weight, outdoor_weight) summing to 1.0.
    Missing signal weight is distributed proportionally to remaining signals.
    """
    if has_humidity and has_outdoor:
        return PASSIVE_WEIGHT_TEMP, PASSIVE_WEIGHT_HUMIDITY, PASSIVE_WEIGHT_OUTDOOR

    available_weight = PASSIVE_WEIGHT_TEMP
    if has_humidity:
        available_weight += PASSIVE_WEIGHT_HUMIDITY
    if has_outdoor:
        available_weight += PASSIVE_WEIGHT_OUTDOOR

    if available_weight == 0.0:
        return 1.0, 0.0, 0.0

    temp_w = PASSIVE_WEIGHT_TEMP / available_weight
    hum_w = PASSIVE_WEIGHT_HUMIDITY / available_weight if has_humidity else 0.0
    out_w = PASSIVE_WEIGHT_OUTDOOR / available_weight if has_outdoor else 0.0
    return temp_w, hum_w, out_w


def _apply_window_type_scaling(
    threshold: float,
    u_value: float,
) -> float:
    """Scale threshold based on window U-value.

    Higher U-value (single_pane=5.0) produces a looser threshold.
    Lower U-value (passive_house=0.8) produces a tighter threshold.
    Baseline: double_pane (U=2.7) gives scale factor 1.0.
    """
    baseline = 2.7
    if u_value <= 0.0:
        return threshold
    scale_factor = u_value / baseline
    return threshold / scale_factor


def _calc_temp_rate_score(
    readings: list[InsightTemperatureReading],
    threshold: float,
    hvac_mode: str,
    flat_tolerant: bool = True,
) -> tuple[float, int]:
    """Calculate temperature drop rate score (0.0-1.0) and anomaly count.

    flat_tolerant=True: flat readings do not break streak (passive mode).
    flat_tolerant=False: flat readings break streak (active mode compat).
    """
    if len(readings) < 2:
        return 0.0, 0

    anomaly_count = 0
    for i in range(len(readings) - 1, 0, -1):
        newer = readings[i].temperature
        older = readings[i - 1].temperature

        if hvac_mode == "heating":
            is_anomaly = newer < older
            is_flat = newer == older
            streak_broken = newer > older
        else:
            is_anomaly = newer > older
            is_flat = newer == older
            streak_broken = newer < older

        if is_anomaly or (is_flat and flat_tolerant):
            anomaly_count += 1
        elif streak_broken or (is_flat and not flat_tolerant):
            break

    if anomaly_count == 0:
        return 0.0, 0

    start_idx = len(readings) - 1 - anomaly_count
    total_change = abs(readings[start_idx].temperature - readings[-1].temperature)

    time_span = (
        readings[-1].timestamp - readings[start_idx].timestamp
    ).total_seconds() / 60.0
    if time_span <= 0.5:  # Less than 30 seconds — too short for reliable rate
        return 0.0, anomaly_count

    temp_rate = total_change / time_span
    score = min(temp_rate / threshold, 1.0)
    return score, anomaly_count


def _calc_humidity_rate_score(
    readings: list[InsightTemperatureReading],
    boost_threshold: float,
) -> float:
    """Calculate humidity drop rate score (0.0-1.0).

    Directional analysis:
    - Rapid drop (>=threshold %/reading) gives high score (0.5-1.0).
    - Slow decline gives low score (0.0-0.5).
    - Rise or stable returns 0.0 (not open-window pattern).
    """
    changes: list[float] = []
    for i in range(1, len(readings)):
        h_new = readings[i].humidity
        h_old = readings[i - 1].humidity
        if h_new is not None and h_old is not None:
            changes.append(h_new - h_old)

    if not changes:
        return 0.0

    avg_change = sum(changes) / len(changes)

    if avg_change >= 0:
        return 0.0

    abs_change = abs(avg_change)
    if abs_change >= boost_threshold:
        return min(abs_change / (boost_threshold * 2) + 0.5, 1.0)
    return abs_change / boost_threshold * 0.5


def _calc_outdoor_diff_score(
    indoor_temp: float,
    outdoor_temp: float | None,
) -> float:
    """Calculate outdoor differential score (0.0-1.0).

    >=10C diff gives 1.0, <5C diff gives 0.0, linear interpolation between.
    None outdoor_temp returns 0.0 (no penalty via weight redistribution).
    """
    if outdoor_temp is None:
        return 0.0

    diff = indoor_temp - outdoor_temp
    if diff >= OUTDOOR_DIFF_HIGH:
        return 1.0
    if diff <= OUTDOOR_DIFF_LOW:
        return 0.0
    return (diff - OUTDOOR_DIFF_LOW) / (OUTDOOR_DIFF_HIGH - OUTDOOR_DIFF_LOW)


def detect_window_passive(
    readings: list[InsightTemperatureReading],
    zone_name: str = "Room",
    sensitivity: str = "medium",
    hvac_mode: str = "heating",
    outdoor_temp: float | None = None,
    window_u_value: float = 2.7,
    seasonal_baseline: float | None = None,
) -> WindowPredictedResult:
    """Detect open window using rate-based multi-signal scoring.

    Unlike detect_window_predicted() (active mode), this function
    does NOT require hvac_active. It analyzes temperature drop RATE
    and humidity changes to distinguish open-window cooling from
    natural cooling.

    Flat readings (temp unchanged) do NOT break the anomaly streak.
    Only temperature rises break the streak (for heating mode).
    """
    preset = WINDOW_PASSIVE_SENSITIVITY_PRESETS.get(
        sensitivity, WINDOW_PASSIVE_SENSITIVITY_PRESETS["medium"],
    )
    min_readings = int(preset["min_readings"])
    temp_rate_threshold = float(preset["temp_rate_threshold"])
    humidity_boost_threshold = float(preset["humidity_boost_threshold"])

    _not_detected = WindowPredictedResult(
        detected=False,
        confidence="none",
        temp_drop=0.0,
        time_window_minutes=0,
        recommendation="",
        anomaly_readings=0,
        detection_mode="passive",
    )

    if len(readings) < WINDOW_MIN_READINGS:
        return _not_detected

    adjusted_threshold = _apply_window_type_scaling(
        temp_rate_threshold, window_u_value,
    )

    if seasonal_baseline is not None and seasonal_baseline < SEASONAL_COLD_THRESHOLD:
        adjusted_threshold *= 1.15

    temp_score, anomaly_count = _calc_temp_rate_score(
        readings, adjusted_threshold, hvac_mode, flat_tolerant=True,
    )

    if anomaly_count < min_readings:
        return _not_detected

    has_humidity = any(r.humidity is not None for r in readings)
    humidity_score = (
        _calc_humidity_rate_score(readings, humidity_boost_threshold)
        if has_humidity
        else 0.0
    )

    has_outdoor = outdoor_temp is not None
    indoor_temp = readings[-1].temperature
    outdoor_score = _calc_outdoor_diff_score(indoor_temp, outdoor_temp)

    temp_w, hum_w, out_w = _redistribute_weights(has_humidity, has_outdoor)

    final_score = temp_score * temp_w + humidity_score * hum_w + outdoor_score * out_w

    high_threshold = float(preset["high_confidence_score"])
    medium_threshold = float(preset["medium_confidence_score"])

    if final_score >= high_threshold:
        confidence = "high"
    elif final_score >= medium_threshold:
        confidence = "medium"
    else:
        confidence = "low"

    start_idx = len(readings) - 1 - anomaly_count
    total_change = abs(readings[start_idx].temperature - readings[-1].temperature)

    detected = confidence != "low"

    if not detected:
        return _not_detected

    if confidence == "high":
        recommendation = (
            f"{zone_name}: Close window now — temperature dropping "
            f"{total_change:.1f}°C"
            f" over {anomaly_count} readings (passive detection)"
        )
    else:
        recommendation = (
            f"{zone_name}: Check windows — {total_change:.1f}°C "
            f"drop detected (passive detection)"
        )

    return WindowPredictedResult(
        detected=True,
        confidence=confidence,
        temp_drop=round(total_change, 2),
        time_window_minutes=0,
        recommendation=recommendation,
        anomaly_readings=anomaly_count,
        detection_mode="passive",
    )
