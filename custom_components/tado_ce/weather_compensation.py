"""Weather compensation (heating curve) engine for Tado CE.

Pure calculation module with no Home Assistant dependencies.
Automatically adjusts boiler max output (flow) temperature based on
outdoor temperature using a linear heating curve, with optional
EMA / rolling-average smoothing and indoor temperature feedback.
"""

from __future__ import annotations

from dataclasses import dataclass, field

# ---------------------------------------------------------------------------
# Heating system presets
# ---------------------------------------------------------------------------

HEATING_PRESETS: dict[str, tuple[float, float, float]] = {
    "radiators_standard": (1.5, 65.0, 25.0),
    "radiators_low_temp": (1.2, 55.0, 25.0),
    "underfloor": (0.8, 45.0, 25.0),
    "custom": (1.5, 65.0, 25.0),
}

# Bridge API hard limits
_API_MIN_FLOW: float = 25.0
_API_MAX_FLOW: float = 80.0

# Minimum seconds between Bridge API adjustments (10 min)
_MIN_HOLD_SECONDS: float = 600.0

# Stale reading threshold in seconds (60 min)
_STALE_READING_SECONDS: float = 3600.0


# ---------------------------------------------------------------------------
# Data classes
# ---------------------------------------------------------------------------


@dataclass
class WeatherCompensationConfig:
    """Configuration parameters for weather compensation."""

    enabled: bool = False
    heating_system_preset: str = "radiators_standard"
    slope: float = 1.5
    design_outdoor_temp: float = -5.0
    max_flow_temp: float = 65.0
    min_flow_temp: float = 25.0
    shutoff_temp: float = 18.0
    smoothing_method: str = "ema"
    smoothing_window_minutes: int = 60
    room_compensation_enabled: bool = False
    room_compensation_factor: float = 3.0
    step_size: float = 1.0
    hysteresis: float = 1.0


@dataclass
class WeatherCompensationState:
    """Mutable runtime state for weather compensation engine."""

    ema_outdoor_temp: float | None = None
    last_raw_outdoor_temp: float | None = None
    last_adjustment_time: float = 0.0
    last_sent_flow_temp: float | None = None
    last_outdoor_reading_time: float = 0.0
    status: str = "disabled"
    rolling_buffer: list[float] = field(default_factory=list)
    rolling_buffer_max_size: int = 0

    def to_dict(self) -> dict[str, object]:
        """Serialize persistable fields to a JSON-compatible dict."""
        return {
            "ema_outdoor_temp": self.ema_outdoor_temp,
            "last_raw_outdoor_temp": self.last_raw_outdoor_temp,
            "last_sent_flow_temp": self.last_sent_flow_temp,
            "rolling_buffer": list(self.rolling_buffer),
            "rolling_buffer_max_size": self.rolling_buffer_max_size,
        }

    @classmethod
    def from_dict(cls, data: dict[str, object]) -> WeatherCompensationState:
        """Restore state from a persisted dict.

        Fields that depend on ``time.monotonic()`` (adjustment time,
        reading time) are intentionally NOT restored because monotonic
        timestamps are meaningless across restarts.
        """
        state = cls()
        if isinstance(data.get("ema_outdoor_temp"), (int, float)):
            state.ema_outdoor_temp = float(data["ema_outdoor_temp"])  # type: ignore[arg-type]
        if isinstance(data.get("last_raw_outdoor_temp"), (int, float)):
            state.last_raw_outdoor_temp = float(data["last_raw_outdoor_temp"])  # type: ignore[arg-type]
        if isinstance(data.get("last_sent_flow_temp"), (int, float)):
            state.last_sent_flow_temp = float(data["last_sent_flow_temp"])  # type: ignore[arg-type]
        buf = data.get("rolling_buffer")
        if isinstance(buf, list):
            state.rolling_buffer = [float(v) for v in buf if isinstance(v, (int, float))]
        raw_buf_size = data.get("rolling_buffer_max_size")
        if isinstance(raw_buf_size, int):
            state.rolling_buffer_max_size = raw_buf_size
        return state


@dataclass
class WeatherCompensationResult:
    """Result of a single weather compensation evaluation cycle."""

    target_flow_temp: float | None
    should_send: bool
    status: str
    smoothed_outdoor_temp: float | None
    raw_outdoor_temp: float | None
    smoothing_method: str
    smoothing_window: int
    room_compensation_offset: float
    heating_system_preset: str


# ---------------------------------------------------------------------------
# Pure calculation functions
# ---------------------------------------------------------------------------


def calculate_auto_slope(
    max_flow_temp: float,
    min_flow_temp: float,
    shutoff_temp: float,
    design_outdoor_temp: float,
) -> float:
    """Calculate slope so the curve spans exactly min→max over the outdoor range.

    Formula: (max_flow - min_flow) / (shutoff_temp - design_outdoor_temp)

    This ensures flow temperature reaches *min_flow_temp* precisely at
    *shutoff_temp* without premature clamping.

    Returns the preset's default slope (1.5) as a safe fallback when the
    outdoor range is zero or negative (misconfiguration guard).
    """
    outdoor_range = shutoff_temp - design_outdoor_temp
    if outdoor_range <= 0:
        return 1.5
    return (max_flow_temp - min_flow_temp) / outdoor_range


def calculate_base_flow_temp(
    outdoor_temp: float,
    config: WeatherCompensationConfig,
) -> float:
    """Calculate base flow temperature from the linear heating curve.

    Formula: max_flow - slope * (outdoor_temp - design_outdoor_temp)

    Satisfies CP-1 (monotonicity) and CP-5 (design point).
    """
    return config.max_flow_temp - config.slope * (
        outdoor_temp - config.design_outdoor_temp
    )


def calculate_room_offset(
    indoor_temp: float,
    target_temp: float,
    compensation_factor: float,
) -> float:
    """Calculate room compensation offset.

    Positive when rooms are cold (boost), negative when warm (reduce).
    Satisfies CP-10 (symmetry): factor * (target - indoor).
    """
    return compensation_factor * (target_temp - indoor_temp)


def snap_to_step(value: float, step: float = 0.5) -> float:
    """Snap a value to the nearest step increment.

    Satisfies CP-3 (step precision): result is always a multiple of *step*.
    """
    return round(value / step) * step


def clamp_flow_temp(
    value: float,
    min_flow: float,
    max_flow: float,
) -> float:
    """Clamp flow temperature to user range AND Bridge API hard limits.

    Satisfies CP-2 (bounds): result always in
    [max(min_flow, 25.0), min(max_flow, 80.0)].
    """
    effective_min = max(min_flow, _API_MIN_FLOW)
    effective_max = min(max_flow, _API_MAX_FLOW)
    return max(effective_min, min(value, effective_max))


def update_ema(
    current: float | None,
    new_value: float,
    window_minutes: int,
    poll_interval_minutes: float,
) -> float:
    """Update exponential moving average.

    Alpha = 2 / (N + 1) where N = window_minutes / poll_interval_minutes.
    First call (current is None) seeds with *new_value*.
    Satisfies CP-9 (stability): converges to constant input.
    """
    if current is None:
        return new_value
    n = max(window_minutes / poll_interval_minutes, 1.0)
    alpha = 2.0 / (n + 1.0)
    return alpha * new_value + (1.0 - alpha) * current


def update_rolling_avg(
    buffer: list[float],
    new_value: float,
    max_size: int,
) -> float:
    """Update rolling (simple moving) average.

    Appends *new_value*, trims oldest when buffer exceeds *max_size*.
    Returns the mean of the buffer.
    Satisfies CP-9 (stability): full buffer of identical values → exact match.
    """
    buffer.append(new_value)
    if max_size > 0 and len(buffer) > max_size:
        del buffer[: len(buffer) - max_size]
    return sum(buffer) / len(buffer)


def smooth_outdoor_temp(
    config: WeatherCompensationConfig,
    state: WeatherCompensationState,
    raw_temp: float,
    poll_interval_minutes: float,
) -> float:
    """Dispatch to the configured smoothing method.

    Updates *state* in-place and returns the smoothed temperature.
    """
    method = config.smoothing_method

    if method == "ema":
        smoothed = update_ema(
            state.ema_outdoor_temp,
            raw_temp,
            config.smoothing_window_minutes,
            poll_interval_minutes,
        )
        state.ema_outdoor_temp = smoothed
        return smoothed

    if method == "rolling_average":
        if state.rolling_buffer_max_size == 0 and poll_interval_minutes > 0:
            state.rolling_buffer_max_size = max(
                int(config.smoothing_window_minutes / poll_interval_minutes), 1,
            )
        return update_rolling_avg(
            state.rolling_buffer,
            raw_temp,
            state.rolling_buffer_max_size,
        )

    # "none" — passthrough
    return raw_temp


def evaluate(
    config: WeatherCompensationConfig,
    state: WeatherCompensationState,
    outdoor_temp_raw: float | None,
    indoor_temp: float | None,
    target_temp: float | None,
    _current_flow_temp: float | None,
    now_mono: float,
    poll_interval_minutes: float,
) -> WeatherCompensationResult:
    """Run one weather compensation evaluation cycle.

    Mutates *state* in-place. Returns a result indicating the target
    flow temperature and whether the Bridge API should be called.

    Satisfies CP-4 (shutoff), CP-6 (idempotency), CP-7 (independence
    is enforced by the caller wrapping this in try/except).
    """
    base = WeatherCompensationResult(
        target_flow_temp=None,
        should_send=False,
        status="disabled",
        smoothed_outdoor_temp=None,
        raw_outdoor_temp=outdoor_temp_raw,
        smoothing_method=config.smoothing_method,
        smoothing_window=config.smoothing_window_minutes,
        room_compensation_offset=0.0,
        heating_system_preset=config.heating_system_preset,
    )

    if not config.enabled:
        state.status = "disabled"
        return base

    # --- Step 1: outdoor temp availability ---
    if outdoor_temp_raw is None:
        state.status = "paused"
        base.status = "paused"
        return base

    # --- Step 2: stale reading check ---
    if (
        state.last_outdoor_reading_time > 0
        and (now_mono - state.last_outdoor_reading_time) > _STALE_READING_SECONDS
    ):
        state.status = "paused"
        base.status = "paused"
        base.raw_outdoor_temp = outdoor_temp_raw
        return base

    state.last_raw_outdoor_temp = outdoor_temp_raw
    state.last_outdoor_reading_time = now_mono

    # --- Step 3: smooth outdoor temp ---
    smoothed = smooth_outdoor_temp(config, state, outdoor_temp_raw, poll_interval_minutes)
    base.smoothed_outdoor_temp = smoothed

    # --- Step 4: shutoff check (CP-4) ---
    step = config.step_size
    if smoothed >= config.shutoff_temp:
        target = clamp_flow_temp(
            snap_to_step(config.min_flow_temp, step),
            config.min_flow_temp,
            config.max_flow_temp,
        )
    else:
        # --- Step 5: heating curve + room compensation ---
        flow = calculate_base_flow_temp(smoothed, config)

        room_offset = 0.0
        if (
            config.room_compensation_enabled
            and indoor_temp is not None
            and target_temp is not None
        ):
            room_offset = calculate_room_offset(
                indoor_temp, target_temp, config.room_compensation_factor,
            )
        base.room_compensation_offset = room_offset

        target = clamp_flow_temp(
            snap_to_step(flow + room_offset, step),
            config.min_flow_temp,
            config.max_flow_temp,
        )

    base.target_flow_temp = target
    base.status = "active"
    state.status = "active"

    # --- Step 6: hold time check ---
    if (
        state.last_adjustment_time > 0
        and (now_mono - state.last_adjustment_time) < _MIN_HOLD_SECONDS
    ):
        return base

    # --- Step 7: idempotency check with hysteresis (CP-6) ---
    # Use <= so that a difference exactly equal to hysteresis does NOT
    # trigger a send.  This prevents boundary oscillation when step_size
    # equals hysteresis (both default to 1.0 °C).
    if (
        state.last_sent_flow_temp is not None
        and abs(target - state.last_sent_flow_temp) <= config.hysteresis
    ):
        return base

    # --- Should send ---
    base.should_send = True
    state.last_sent_flow_temp = target
    state.last_adjustment_time = now_mono
    return base


# ---------------------------------------------------------------------------
# Coordinator-level orchestration (extracted from coordinator.py)
# ---------------------------------------------------------------------------


def _build_wc_config(cm: object) -> WeatherCompensationConfig:
    """Build WeatherCompensationConfig from config manager options."""
    preset = cm.get_wc_heating_system_preset()  # type: ignore[union-attr]
    max_flow = cm.get_wc_max_flow_temp()  # type: ignore[union-attr]
    min_flow = cm.get_wc_min_flow_temp()  # type: ignore[union-attr]
    shutoff = cm.get_wc_shutoff_temp()  # type: ignore[union-attr]
    design = cm.get_wc_design_outdoor_temp()  # type: ignore[union-attr]

    if preset == "custom":
        slope = cm.get_wc_slope()  # type: ignore[union-attr]
    else:
        slope = calculate_auto_slope(max_flow, min_flow, shutoff, design)

    return WeatherCompensationConfig(
        enabled=True,
        heating_system_preset=preset,
        slope=slope,
        design_outdoor_temp=design,
        max_flow_temp=max_flow,
        min_flow_temp=min_flow,
        shutoff_temp=shutoff,
        smoothing_method=cm.get_wc_smoothing_method(),  # type: ignore[union-attr]
        smoothing_window_minutes=cm.get_wc_smoothing_window(),  # type: ignore[union-attr]
        room_compensation_enabled=cm.get_wc_room_compensation_enabled(),  # type: ignore[union-attr]
        room_compensation_factor=cm.get_wc_room_compensation_factor(),  # type: ignore[union-attr]
        step_size=cm.get_wc_step_size(),  # type: ignore[union-attr]
        hysteresis=cm.get_wc_hysteresis(),  # type: ignore[union-attr]
    )


def _resolve_outdoor_temp(
    hass: object,
    cm: object,
    weather_data: dict | None,
) -> float | None:
    """Resolve outdoor temperature from external sensor or weather data."""
    from .sensor_helpers import get_outdoor_temperature

    outdoor_entity = cm.get_outdoor_temp_entity()  # type: ignore[union-attr]
    outdoor_temp: float | None = None
    if outdoor_entity:
        outdoor_temp = get_outdoor_temperature(
            hass, outdoor_entity, cm.get_use_feels_like(),  # type: ignore[arg-type, union-attr]
        )
    if outdoor_temp is None and weather_data:
        outside = weather_data.get("outsideTemperature")
        if isinstance(outside, dict):
            raw = outside.get("celsius")
            if raw is not None:
                outdoor_temp = float(raw)
    return outdoor_temp


def _resolve_indoor_temps(
    zone_data: dict | None,
) -> tuple[float | None, float | None]:
    """Resolve average indoor temp and target temp from actively heating zones."""
    if not zone_data:
        return None, None
    zone_states = zone_data.get("zoneStates") or {}
    temps: list[float] = []
    targets: list[float] = []
    for zdata in zone_states.values():
        activity = zdata.get("activityDataPoints") or {}
        hp = activity.get("heatingPower")
        if hp is None:
            continue
        hp_val = hp.get("percentage") if isinstance(hp, dict) else hp
        if hp_val is None:
            continue
        try:
            if float(hp_val) <= 0:
                continue
        except (TypeError, ValueError):
            continue
        sensor_pts = zdata.get("sensorDataPoints") or {}
        inside = (sensor_pts.get("insideTemperature") or {}).get("celsius")
        setting = (zdata.get("setting") or {}).get("temperature") or {}
        tgt = setting.get("celsius")
        if inside is not None:
            temps.append(float(inside))
        if tgt is not None:
            targets.append(float(tgt))
    indoor_temp = sum(temps) / len(temps) if temps else None
    target_temp = sum(targets) / len(targets) if targets else None
    return indoor_temp, target_temp


async def async_run_wc_cycle(
    *,
    config_manager: object,
    bridge_api_client: object,
    wc_state: WeatherCompensationState,
    hass: object,
    weather_data: dict | None,
    zone_data: dict | None,
    update_interval: object | None,
    bridge_data: dict | None = None,
) -> dict | None:
    """Run one weather compensation evaluation cycle.

    Resolve outdoor/indoor temps, call the pure engine, and send the
    target flow temperature to the Bridge API when needed.

    Returns a dict suitable for ``coordinator.data["weather_compensation"]``
    or *None* when the feature is disabled / unavailable.

    This function was extracted from ``coordinator.py`` to keep the
    coordinator thin and the WC domain logic co-located.
    """
    import logging
    import time

    _LOGGER = logging.getLogger(__name__)

    try:
        config = _build_wc_config(config_manager)
        outdoor_temp = _resolve_outdoor_temp(hass, config_manager, weather_data)

        # --- Resolve indoor temp + target (room compensation) ---
        indoor_temp: float | None = None
        target_temp: float | None = None
        if config.room_compensation_enabled:
            indoor_temp, target_temp = _resolve_indoor_temps(zone_data)

        # --- Current flow temp from bridge ---
        current_flow: float | None = None
        if bridge_data:
            raw_flow = bridge_data.get("boilerMaxOutputTemperatureInCelsius")
            if raw_flow is not None:
                current_flow = float(raw_flow)  # type: ignore[arg-type]

        # --- Poll interval (minutes) ---
        poll_min = 5.0
        if update_interval is not None:
            poll_min = update_interval.total_seconds() / 60.0  # type: ignore[union-attr]

        # --- Evaluate ---
        result = evaluate(
            config,
            wc_state,
            outdoor_temp,
            indoor_temp,
            target_temp,
            current_flow,
            time.monotonic(),
            poll_min,
        )

        # --- Send to Bridge API if needed ---
        if result.should_send and result.target_flow_temp is not None:
            try:
                await bridge_api_client.async_set_max_output_temperature(  # type: ignore[union-attr]
                    result.target_flow_temp,
                )
                _LOGGER.info(
                    "Weather compensation: set flow temp to %.1f°C "
                    "(outdoor=%.1f°C, preset=%s)",
                    result.target_flow_temp,
                    result.smoothed_outdoor_temp or 0.0,
                    result.heating_system_preset,
                )
            except Exception:  # noqa: BLE001 — HA entity update pattern
                _LOGGER.warning(
                    "Weather compensation: Bridge API call failed — will retry next cycle",
                )
                wc_state.last_sent_flow_temp = None
                wc_state.last_adjustment_time = 0.0

        return {
            "target_flow_temp": result.target_flow_temp,
            "status": result.status,
            "smoothed_outdoor_temp": result.smoothed_outdoor_temp,
            "raw_outdoor_temp": result.raw_outdoor_temp,
            "smoothing_method": result.smoothing_method,
            "smoothing_window": result.smoothing_window,
            "room_compensation_offset": result.room_compensation_offset,
            "heating_system_preset": result.heating_system_preset,
            "should_send": result.should_send,
        }
    except Exception:  # noqa: BLE001 — HA entity update pattern
        _LOGGER.debug(
            "Weather compensation evaluation failed — main update unaffected",
            exc_info=True,
        )
        return None
