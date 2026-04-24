"""Tado CE second-order thermal dynamics analyzer — heating acceleration and approach behavior.

Heating acceleration and approach behavior analysis for improved preheat estimation.
"""

from __future__ import annotations

import logging
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from .heating_models import HeatingCycle, HeatingCycleReading

_LOGGER = logging.getLogger(__name__)

# Thermal analysis thresholds
_MIN_READINGS_PER_HALF = 3
_MIN_RATE_THRESHOLD = 0.001
_MIN_READINGS_FOR_ANALYSIS = 6  # minimum readings for rate/approach analysis
_MIN_READINGS_FOR_REGRESSION = 2  # minimum readings for linear regression
_MIN_READINGS_FOR_EXPONENTIAL = 20  # minimum readings for exponential curve fitting
_MIN_DURATION_HOURS = 0.1  # minimum cycle duration (6 minutes)
_MIN_TEMP_DELTA = 0.5  # °C — minimum temperature change for approach factor
_REGRESSION_EPSILON = 0.001  # minimum denominator for regression
_SLOPE_EPSILON = -0.001  # slope must be more negative than this for heating
_LOG_DIFF_EPSILON = 0.05  # minimum diff for log calculation
_APPROACH_VALIDATION_DIFF = 0.3  # significant difference between methods
_MIN_READINGS_FOR_POINT_BASED = 2  # minimum readings at each temperature point


class ThermalAnalyzer:
    """Analyze second-order thermal dynamics from heating cycles.

    Second-order analysis provides:
    - Heating acceleration: How quickly the heating rate increases after heating starts
    - Approach factor: How much the heating rate decreases near the setpoint

    These metrics improve preheat estimation by accounting for:
    - System response time (acceleration)
    - Overshoot prediction (approach factor)
    """

    def __init__(self, min_cycles: int = 3) -> None:
        """Initialize analyzer.

        Args:
            min_cycles: Minimum completed cycles required for analysis
        """
        self._min_cycles = min_cycles

    def calculate_acceleration(
        self,
        cycles: list[HeatingCycle],
    ) -> float | None:
        """Calculate average heating acceleration.

        Acceleration = d(rate)/dt = (rate_end - rate_start) / duration

        Measures how quickly the heating rate increases after heating starts.
        Higher acceleration = faster response system.

        Args:
            cycles: List of completed heating cycles

        Returns:
            Average acceleration in °C/h², or None if insufficient data
        """
        # Filter to only valid heating cycles
        valid_cycles = [
            c
            for c in cycles
            if c.completed
            and c.start_temp is not None
            and c.start_temp < c.target_temp - 0.1  # At least 0.1°C heating needed
        ]

        if len(valid_cycles) < self._min_cycles:
            return None

        accelerations = []

        for cycle in valid_cycles:
            accel = self._calculate_cycle_acceleration(cycle)
            if accel is not None:
                accelerations.append(accel)

        if not accelerations:
            return None

        avg_acceleration = sum(accelerations) / len(accelerations)

        _LOGGER.debug(
            "Calculated acceleration from %d cycles: %.2f °C/h²",
            len(accelerations),
            avg_acceleration,
        )

        return round(avg_acceleration, 2)

    def _calculate_cycle_acceleration(
        self,
        cycle: HeatingCycle,
    ) -> float | None:
        """Calculate acceleration for a single cycle.

        We measure acceleration by comparing:
        - Initial heating rate (first 1/3 of cycle)
        - Final heating rate (last 1/3 of cycle, before reaching setpoint)

        Returns:
            Acceleration in °C/h², or None if cannot calculate
        """
        readings = cycle.temperature_readings

        if len(readings) < _MIN_READINGS_FOR_ANALYSIS:
            return None

        # Split readings into thirds
        third = len(readings) // 3

        # Calculate initial rate (first third)
        initial_readings = readings[:third]
        initial_rate = self._calculate_rate_from_readings(initial_readings)

        # Calculate final rate (last third, but before setpoint)
        # Filter out readings that are at or above target
        final_readings = [r for r in readings[2 * third :] if r.temp < cycle.target_temp - 0.1]

        if len(final_readings) < _MIN_READINGS_FOR_REGRESSION:
            # Use all readings from last third if filtering removed too many
            final_readings = readings[2 * third :]

        final_rate = self._calculate_rate_from_readings(final_readings)

        if initial_rate is None or final_rate is None:
            return None

        # Calculate time span
        if not readings:
            return None

        duration_hours = (readings[-1].time - readings[0].time).total_seconds() / 3600

        if duration_hours < _MIN_DURATION_HOURS:  # Less than 6 minutes
            return None

        # Acceleration = (final_rate - initial_rate) / duration
        # Convert rates from °C/min to °C/h for consistency
        initial_rate_h = initial_rate * 60
        final_rate_h = final_rate * 60

        acceleration = (final_rate_h - initial_rate_h) / duration_hours

        return acceleration

    def _calculate_rate_from_readings(
        self,
        readings: list[HeatingCycleReading],
    ) -> float | None:
        """Calculate heating rate from a list of readings.

        Returns:
            Rate in °C/min, or None if cannot calculate
        """
        if len(readings) < _MIN_READINGS_FOR_REGRESSION:
            return None

        # Use linear regression for more stable rate calculation
        times = [(r.time - readings[0].time).total_seconds() / 60 for r in readings]
        temps = [r.temp for r in readings]

        n = len(readings)
        sum_t = sum(times)
        sum_temp = sum(temps)
        sum_t_temp = sum(t * temp for t, temp in zip(times, temps, strict=True))
        sum_t2 = sum(t * t for t in times)

        denominator = n * sum_t2 - sum_t * sum_t

        if abs(denominator) < _REGRESSION_EPSILON:
            return None

        # Slope = rate in °C/min
        rate = (n * sum_t_temp - sum_t * sum_temp) / denominator

        return rate

    def calculate_approach_factor(
        self,
        cycles: list[HeatingCycle],
    ) -> float | None:
        """Calculate approach deceleration factor.

        Measures how much the heating rate decreases as temperature
        approaches the setpoint. Used to predict overshoot.

        Factor interpretation:
        - 1.0 (100%): No deceleration, will likely overshoot
        - 0.5 (50%): 50% deceleration, controlled approach
        - 0.0 (0%): Complete stop before setpoint (rare)

        Args:
            cycles: List of completed heating cycles

        Returns:
            Approach factor as percentage (0-100), or None if insufficient data
        """
        # Filter to only valid heating cycles
        valid_cycles = [
            c
            for c in cycles
            if c.completed
            and c.start_temp is not None
            and c.start_temp < c.target_temp - 0.1  # At least 0.1°C heating needed
        ]

        if len(valid_cycles) < self._min_cycles:
            return None

        factors = []

        for cycle in valid_cycles:
            factor = self._calculate_cycle_approach_factor(cycle)
            if factor is not None:
                factors.append(factor)

        if not factors:
            return None

        avg_factor = sum(factors) / len(factors)

        _LOGGER.debug(
            "Calculated approach factor from %d cycles: %.1f%%",
            len(factors),
            avg_factor * 100,
        )

        return round(avg_factor * 100, 1)

    def _calculate_cycle_approach_factor(
        self,
        cycle: HeatingCycle,
    ) -> float | None:
        """Calculate approach factor using hybrid industrial standard method.

        Primary method: Normalized Rate Ratio (first-half vs second-half average rate)
        - Robust to sensor noise and quantization effects
        - Uses temperature-based splitting, not time-based

        Validation: Exponential curve fitting (when data quality is high)
        - Validates primary result against thermal physics model

        Fallback: Point-based sampling (legacy method)
        - Used when primary method fails

        Returns:
            Factor between 0.0 and 2.0, or None if cannot calculate
            - < 1.0: Deceleration (normal, controlled approach)
            - = 1.0: Constant rate (no deceleration)
            - > 1.0: Acceleration (unusual, may overshoot)
        """
        readings = cycle.temperature_readings

        if len(readings) < _MIN_READINGS_FOR_ANALYSIS or cycle.start_temp is None:
            _LOGGER.debug(
                "Approach factor skip: insufficient readings (%d) or no start_temp",
                len(readings),
            )
            return None

        temp_delta = cycle.target_temp - cycle.start_temp

        if temp_delta < _MIN_TEMP_DELTA:  # Less than 0.5°C change
            _LOGGER.debug(
                "Approach factor skip: temp_delta %.2f°C < 0.5°C threshold",
                temp_delta,
            )
            return None

        # Primary method: Normalized Rate Ratio
        factor = self._calculate_approach_factor_rate_ratio(cycle, readings, temp_delta)

        if factor is not None:
            # Validation: If we have high quality data, validate with exponential fit
            if len(readings) >= _MIN_READINGS_FOR_EXPONENTIAL:
                exp_factor = self._calculate_approach_factor_exponential(
                    cycle,
                    readings,
                    temp_delta,
                )
                if exp_factor is not None:
                    # If exponential validation differs significantly, log warning
                    diff = abs(factor - exp_factor)
                    if diff > _APPROACH_VALIDATION_DIFF:
                        _LOGGER.debug(
                            "Approach factor validation: rate_ratio=%.2f, exponential=%.2f, diff=%.2f",
                            factor,
                            exp_factor,
                            diff,
                        )
                        # Use weighted average when both methods work but differ
                        # Weight primary method more (70/30)
                        factor = factor * 0.7 + exp_factor * 0.3

            return factor

        # Fallback: Point-based sampling (legacy method)
        return self._calculate_approach_factor_point_based(cycle, readings, temp_delta)

    def _calculate_approach_factor_rate_ratio(
        self,
        cycle: HeatingCycle,
        readings: list[HeatingCycleReading],
        temp_delta: float,
    ) -> float | None:
        """Calculate approach factor using first-half vs second-half rate ratio.

        Industrial standard method: Compare average heating rate in first half
        of temperature rise vs second half. This is robust to sensor noise
        and quantization effects.

        Args:
            cycle: The heating cycle
            readings: Temperature readings
            temp_delta: Temperature difference (target - start)

        Returns:
            Factor between 0.0 and 2.0, or None if cannot calculate
        """
        # Find midpoint by temperature, not time
        mid_temp = cycle.start_temp + temp_delta * 0.5  # type: ignore[operator]

        # Split readings into first half and second half by temperature
        first_half = [r for r in readings if r.temp < mid_temp]
        second_half = [r for r in readings if r.temp >= mid_temp]

        if len(first_half) < _MIN_READINGS_PER_HALF or len(second_half) < _MIN_READINGS_PER_HALF:
            _LOGGER.debug(
                "Rate ratio skip: insufficient readings in halves (first=%d, second=%d)",
                len(first_half),
                len(second_half),
            )
            return None

        # Sort by time for rate calculation
        first_half = sorted(first_half, key=lambda r: r.time)
        second_half = sorted(second_half, key=lambda r: r.time)

        # Calculate average rate for each half
        rate_first = self._calculate_average_rate(first_half)
        rate_second = self._calculate_average_rate(second_half)

        if rate_first is None:
            _LOGGER.debug("Rate ratio skip: could not calculate first half rate")
            return None

        if rate_first <= _MIN_RATE_THRESHOLD:
            _LOGGER.debug(
                "Rate ratio skip: first half rate (%.6f) below threshold",
                rate_first,
            )
            return None

        if rate_second is None:
            rate_second = 0.0

        # Factor = rate_second / rate_first
        factor = rate_second / rate_first

        # Clamp to reasonable range
        factor = max(0.0, min(2.0, factor))

        _LOGGER.debug(
            "Rate ratio method: first_rate=%.4f, second_rate=%.4f, factor=%.2f",
            rate_first,
            rate_second,
            factor,
        )

        return factor

    def _calculate_average_rate(
        self,
        readings: list[HeatingCycleReading],
    ) -> float | None:
        """Calculate average heating rate over a set of readings.

        Uses total temperature change / total time for robustness.

        Args:
            readings: List of temperature readings (must be sorted by time)

        Returns:
            Rate in °C/min, or None if cannot calculate
        """
        if len(readings) < _MIN_READINGS_FOR_REGRESSION:
            return None

        # Total temperature change / total time
        temp_change = readings[-1].temp - readings[0].temp
        time_change = (readings[-1].time - readings[0].time).total_seconds() / 60

        if time_change <= 0:
            return None

        return temp_change / time_change

    def _linearize_approach_data(
        self,
        valid_data: list[tuple[float, float]],
        target: float,
    ) -> float | None:
        """Linearize temperature approach data using Newton's Law of Cooling.

        For T(t) = T_target - A * exp(-t/τ), linearize as:
        ln(T_target - T) = ln(A) - t/τ, where slope = -1/τ.

        Returns:
            Time constant τ in minutes, or None if cannot calculate.
        """
        import math

        log_diffs = []
        log_times = []
        for t, temp in valid_data:
            diff = target - temp
            if diff > _LOG_DIFF_EPSILON:  # Avoid log of very small numbers
                log_diffs.append(math.log(diff))
                log_times.append(t)

        if len(log_diffs) < 10:  # noqa: PLR2004 — minimum data points for regression
            return None

        # Linear regression on log data
        n = len(log_diffs)
        sum_t = sum(log_times)
        sum_log = sum(log_diffs)
        sum_t_log = sum(t * log for t, log in zip(log_times, log_diffs, strict=True))
        sum_t2 = sum(t * t for t in log_times)

        denominator = n * sum_t2 - sum_t * sum_t
        if abs(denominator) < _REGRESSION_EPSILON:
            return None

        slope = (n * sum_t_log - sum_t * sum_log) / denominator

        if slope >= _SLOPE_EPSILON:  # slope should be negative for heating
            return None

        return -1.0 / slope  # time constant in minutes

    def _calculate_approach_factor_exponential(
        self,
        cycle: HeatingCycle,
        readings: list[HeatingCycleReading],
        temp_delta: float,
    ) -> float | None:
        """Calculate approach factor using exponential curve fitting.

        Fits data to Newton's Law of Cooling: T(t) = T_target - (T_target - T_start) * exp(-t/τ)

        The approach factor is derived from the time constant τ:
        - Smaller τ = faster approach = higher factor
        - Larger τ = slower approach = lower factor

        Args:
            cycle: The heating cycle
            readings: Temperature readings (should have >= 20 readings)
            temp_delta: Temperature difference (target - start)

        Returns:
            Factor between 0.0 and 2.0, or None if cannot calculate
        """
        if len(readings) < _MIN_READINGS_FOR_EXPONENTIAL:
            return None

        sorted_readings = sorted(readings, key=lambda r: r.time)

        base_time = sorted_readings[0].time
        times = [(r.time - base_time).total_seconds() / 60 for r in sorted_readings]
        temps = [r.temp for r in sorted_readings]

        temp_range = max(temps) - min(temps)
        if temp_range < _MIN_TEMP_DELTA:
            return None

        target = cycle.target_temp

        valid_data = [
            (t, temp)
            for t, temp in zip(times, temps, strict=True)
            if temp < target - 0.1
        ]

        if len(valid_data) < 10:  # noqa: PLR2004 — minimum data points
            return None

        try:
            tau = self._linearize_approach_data(valid_data, target)
            if tau is None or tau <= 0:
                return None

            cycle_duration = times[-1] - times[0]
            if cycle_duration <= 0:
                return None

            expected_tau = cycle_duration / 3
            factor = max(0.0, min(2.0, expected_tau / tau))

            _LOGGER.debug(
                "Exponential method: tau=%.1f min, expected_tau=%.1f min, factor=%.2f",
                tau, expected_tau, factor,
            )

            return factor

        except (ValueError, ZeroDivisionError) as e:
            _LOGGER.debug("Exponential method failed: %s", e)
            return None

    def _calculate_approach_factor_point_based(
        self,
        cycle: HeatingCycle,
        readings: list[HeatingCycleReading],
        temp_delta: float,
    ) -> float | None:
        """Calculate approach factor using point-based sampling (legacy fallback).

        Compare heating rate at 50% of temperature delta vs 90% of delta.

        Args:
            cycle: The heating cycle
            readings: Temperature readings
            temp_delta: Temperature difference (target - start)

        Returns:
            Factor between 0.0 and 2.0, or None if cannot calculate
        """
        # Find readings at ~50% and ~90% of temperature delta
        temp_50 = cycle.start_temp + temp_delta * 0.5  # type: ignore[operator]
        temp_90 = cycle.start_temp + temp_delta * 0.9  # type: ignore[operator]

        # Get readings around these temperatures
        readings_50 = self._get_readings_near_temp(readings, temp_50, tolerance=0.3)
        readings_90 = self._get_readings_near_temp(readings, temp_90, tolerance=0.3)

        if len(readings_50) < _MIN_READINGS_FOR_POINT_BASED or len(readings_90) < _MIN_READINGS_FOR_POINT_BASED:
            _LOGGER.debug(
                "Point-based skip: insufficient readings at 50%% (%d) or 90%% (%d)",
                len(readings_50),
                len(readings_90),
            )
            return None

        rate_50 = self._calculate_rate_from_readings(readings_50)
        rate_90 = self._calculate_rate_from_readings(readings_90)

        if rate_50 is None or rate_90 is None:
            _LOGGER.debug(
                "Point-based skip: could not calculate rates (rate_50=%s, rate_90=%s)",
                rate_50,
                rate_90,
            )
            return None

        if abs(rate_50) < _MIN_RATE_THRESHOLD:
            _LOGGER.debug(
                "Point-based skip: rate_50 (%.6f) below threshold",
                rate_50,
            )
            return None

        if rate_50 <= 0:
            _LOGGER.debug(
                "Point-based skip: rate_50 (%.4f) is not positive",
                rate_50,
            )
            return None

        # Factor = rate_90 / rate_50
        factor = rate_90 / rate_50

        # Clamp to reasonable range
        factor = max(0.0, min(2.0, factor))

        _LOGGER.debug(
            "Point-based method: rate_50=%.4f, rate_90=%.4f, factor=%.2f",
            rate_50,
            rate_90,
            factor,
        )

        return factor

    def _get_readings_near_temp(
        self,
        readings: list[HeatingCycleReading],
        target_temp: float,
        tolerance: float = 0.3,
    ) -> list[HeatingCycleReading]:
        """Get readings near a target temperature."""
        return [r for r in readings if abs(r.temp - target_temp) <= tolerance]
