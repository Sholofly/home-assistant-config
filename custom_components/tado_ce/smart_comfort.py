"""Tado CE Smart Comfort Manager — heating analytics, rate calculation, weather compensation."""

from __future__ import annotations

from dataclasses import dataclass
from datetime import UTC, datetime, timedelta
import logging
from typing import TYPE_CHECKING, Any

from homeassistant.util import dt as dt_util

from .const import (
    WEATHER_COMPENSATION_PRESETS,
)
from .models import SmartComfortReading

try:
    from .sensor_helpers import get_outdoor_temperature as _get_outdoor_temp
except (ImportError, ModuleNotFoundError):
    # Fallback for isolated test loading via _load_module() with synthetic package
    # names (e.g. "_test_sc_.smart_comfort").  sensor_helpers has no relative
    # imports so it can be loaded standalone.
    import importlib.util as _ilu
    from pathlib import Path as _Path

    _sh_path = str(_Path(__file__).resolve().parent / "sensor_helpers.py")
    _sh_spec = _ilu.spec_from_file_location("_isolated_sensor_helpers", _sh_path)
    _sh_mod = _ilu.module_from_spec(_sh_spec)  # type: ignore[arg-type]
    _sh_spec.loader.exec_module(_sh_mod)  # type: ignore[union-attr]
    _get_outdoor_temp = _sh_mod.get_outdoor_temperature

if TYPE_CHECKING:
    from pathlib import Path

    from homeassistant.core import HomeAssistant

    from .data_loader import DataLoader

_LOGGER = logging.getLogger(__name__)

# Configuration
DEFAULT_HISTORY_DAYS = 7  # Default: keep 7 days of history
RECORDER_HISTORY_HOURS = 24  # Load 24 hours from recorder on startup
MIN_DATA_POINTS = 3  # Minimum points needed for rate calculation
MIN_TIME_SPAN_MINUTES = 15  # Minimum time span for meaningful rate
CACHE_SAVE_INTERVAL_MINUTES = 15  # Save cache every 15 minutes

# Smart Comfort thresholds
TEMP_EPSILON = 0.05  # °C — minimum temperature difference to consider meaningful
TEMP_NEAR_TARGET = 0.1  # °C — close enough to target temperature
DEVIATION_NORMAL_THRESHOLD = 0.3  # °C — deviation below this is "Normal"
MIN_RATE_THRESHOLD = 0.01  # °C/h — minimum meaningful heating/cooling rate
DEDUP_TIME_WINDOW = 300  # seconds (5 min) — skip duplicate readings within this window
SEGMENT_MAX_GAP_HOURS = 2  # hours — max gap between readings for continuous segment
SEGMENT_MIN_TEMP_RISE = 0.05  # °C — minimum rise to count as heating
SEGMENT_MIN_TIME_HOURS = 0.01  # hours — minimum time for rate calculation
RATE_MIN_VALID = 0.1  # °C/h — minimum valid heating rate
RATE_MAX_VALID = 10.0  # °C/h — maximum valid heating rate (TRV can be 5-8°C/h)
REGRESSION_DENOMINATOR_EPSILON = 0.0001  # minimum denominator for linear regression
MIDNIGHT_WRAPAROUND_MINUTES = 720  # 12 hours — threshold for midnight wraparound
CONFIDENCE_HIGH_READINGS = 10  # readings needed for high confidence
CONFIDENCE_MEDIUM_READINGS = 5  # readings needed for medium confidence
BASELINE_CHANGE_THRESHOLD = 0.05  # °C/h — minimum change for baseline calculation

# WEATHER_COMPENSATION_PRESETS imported from const.py

from .schedule_helpers import _get_day_blocks


@dataclass
class NextScheduleBlock:
    """Next scheduled temperature change."""

    start_time: datetime  # When this block starts
    target_temp: float | None  # Target temperature (None if OFF)
    is_heating_on: bool  # Whether heating will be ON
    block_end_time: datetime  # When this block ends

    def to_dict(self) -> dict[str, Any]:
        """Serialize to dictionary."""
        return {
            "start_time": self.start_time.isoformat(),
            "target_temp": self.target_temp,
            "is_heating_on": self.is_heating_on,
            "block_end_time": self.block_end_time.isoformat(),
        }


def _find_next_block_in_day(
    day_blocks: list[dict[str, Any]],
    current_time_str: str,
    check_date: datetime,
) -> NextScheduleBlock | None:
    """Find the next schedule block in a given day's blocks."""
    for block in day_blocks:
        block_start = block.get("start", "00:00")
        if block_start <= current_time_str:
            continue

        setting = block.get("setting") or {}
        power = setting.get("power", "OFF")
        temp_data = setting.get("temperature")
        block_end = block.get("end", "00:00")

        # Parse start time into datetime
        start_hour, start_min = map(int, block_start.split(":"))
        start_datetime = check_date.replace(hour=start_hour, minute=start_min, second=0, microsecond=0)

        # Parse end time
        end_hour, end_min = map(int, block_end.split(":"))
        if block_end == "00:00":
            end_datetime = (check_date + timedelta(days=1)).replace(hour=0, minute=0, second=0, microsecond=0)
        else:
            end_datetime = check_date.replace(hour=end_hour, minute=end_min, second=0, microsecond=0)

        target_temp = None
        if power == "ON" and temp_data:
            target_temp = temp_data.get("celsius")

        return NextScheduleBlock(
            start_time=start_datetime,
            target_temp=target_temp,
            is_heating_on=(power == "ON"),
            block_end_time=end_datetime,
        )
    return None


def get_next_schedule_change(
    zone_id: str,
    current_time: datetime | None = None,
    look_ahead_days: int = 2,
    data_loader: DataLoader | None = None,
) -> NextScheduleBlock | None:
    """Find the next schedule block that requires temperature change.

    Parses the zone's schedule and finds the next block where:
    1. Heating turns ON with a target temperature, OR
    2. Target temperature increases (needs preheat)

    Now supports looking ahead to tomorrow if no blocks remain today.

    Args:
        zone_id: Zone ID to look up schedule for
        current_time: Current time (defaults to now)
        look_ahead_days: How many days to look ahead (default 2 = today + tomorrow)
        data_loader: DataLoader instance for per-entry schedule access

    Returns:
        NextScheduleBlock with next change info, or None if no schedule/no upcoming change
    """
    schedule = data_loader.get_zone_schedule(zone_id) if data_loader is not None else None

    if current_time is None:
        try:
            current_time = dt_util.now()
        except ImportError:
            current_time = datetime.now(UTC)

    if not schedule:
        _LOGGER.debug("No schedule found for zone %s", zone_id)
        return None

    blocks = schedule.get("blocks") or {}
    schedule_type = schedule.get("type", "ONE_DAY")

    for day_offset in range(look_ahead_days):
        check_date = current_time + timedelta(days=day_offset)
        day_blocks = _get_day_blocks(blocks, schedule_type, check_date.weekday())
        if not day_blocks:
            continue

        time_str = current_time.strftime("%H:%M") if day_offset == 0 else "00:00"
        result = _find_next_block_in_day(day_blocks, time_str, check_date)
        if result:
            return result

    _LOGGER.debug("No schedule blocks found for zone %s in next %s days", zone_id, look_ahead_days)
    return None




@dataclass
class HistoricalComparison:
    """Result of historical temperature comparison."""

    current_temp: float
    historical_avg: float
    difference: float  # current - historical (positive = warmer than usual)
    sample_count: int  # Number of historical data points used
    comparison_window_minutes: int  # Time window used for comparison (e.g., 30 min)

    def to_summary(self) -> str:
        """Generate human-readable summary."""
        if abs(self.difference) < DEVIATION_NORMAL_THRESHOLD:
            return f"Normal (avg {self.historical_avg:.1f}°C)"
        if self.difference > 0:
            return f"{self.difference:+.1f}°C warmer than usual"
        return f"{self.difference:.1f}°C cooler than usual"


@dataclass
class PreheatAdvice:
    """Preheat timing recommendation."""

    recommended_start_time: datetime  # When to start heating
    target_time: datetime  # When target should be reached
    target_temp: float
    current_temp: float
    estimated_duration_minutes: int  # How long heating will take
    heating_rate: float  # °C/hour used for calculation
    confidence: str  # "high", "medium", "low" based on data quality

    def to_summary(self) -> str:
        """Generate human-readable summary."""
        if self.estimated_duration_minutes == 0:
            return f"Already at {self.target_temp:.1f}°C (no preheat needed)"
        start_str = self.recommended_start_time.strftime("%H:%M")
        return f"Start at {start_str} ({self.estimated_duration_minutes} min to reach {self.target_temp:.1f}°C)"


class ZoneHistory:
    """Temperature history for a single zone."""

    def __init__(self, zone_id: str, zone_name: str, history_days: int = DEFAULT_HISTORY_DAYS) -> None:
        """Initialize the Zone History."""
        self.zone_id = zone_id
        self.zone_name = zone_name
        self.readings: list[SmartComfortReading] = []
        self._history_days = history_days
        self._last_heating_rate: float | None = None
        self._last_cooling_rate: float | None = None
        self._rate_updated_at: datetime | None = None
        # Baseline rates from long-term statistics (Tier 3)
        self._baseline_heating_rate: float | None = None
        self._baseline_cooling_rate: float | None = None

    def to_dict(self) -> dict[str, Any]:
        """Convert to dictionary for JSON serialization."""
        return {
            "zone_id": self.zone_id,
            "zone_name": self.zone_name,
            "readings": [r.to_dict() for r in self.readings],
            "history_days": self._history_days,
        }

    @classmethod
    def from_dict(cls, data: dict[str, Any]) -> ZoneHistory:
        """Create from dictionary.

        Deduplicates readings on load to clean up cache files
        that may have duplicate entries.
        """
        history_days = data.get("history_days", DEFAULT_HISTORY_DAYS)
        zone = cls(data["zone_id"], data["zone_name"], history_days)

        # Load and deduplicate readings
        raw_readings = [SmartComfortReading.from_dict(r) for r in data.get("readings", [])]

        raw_readings.sort(key=lambda r: r.timestamp)

        # Deduplicate: skip if same temp/heating and < 5 min apart
        deduplicated: list[Any] = []
        for reading in raw_readings:
            if deduplicated:
                last = deduplicated[-1]
                time_diff = (reading.timestamp - last.timestamp).total_seconds()
                # Skip duplicate: same temp, same heating state, < 5 min
                if (
                    abs(reading.temperature - last.temperature) < TEMP_EPSILON
                    and reading.is_heating == last.is_heating
                    and time_diff < DEDUP_TIME_WINDOW
                ):
                    continue
            deduplicated.append(reading)

        zone.readings = deduplicated
        return zone

    def set_history_days(self, days: int) -> None:
        """Update history retention period and prune old readings."""
        self._history_days = days
        self._prune_old_readings()

    def add_reading(self, reading: SmartComfortReading) -> None:
        """Add a temperature reading and prune old data.

        Deduplication: Only adds if temperature or is_heating changed,
        or if more than 5 minutes have passed since last reading.
        This prevents cache bloat from frequent polling.
        """
        # Deduplication check
        if self.readings:
            last = self.readings[-1]
            time_diff = (reading.timestamp - last.timestamp).total_seconds()

            # Skip if same temp and heating state, and less than 5 minutes
            if (
                abs(reading.temperature - last.temperature) < TEMP_EPSILON
                and reading.is_heating == last.is_heating
                and time_diff < DEDUP_TIME_WINDOW
            ):  # 5 minutes
                return

        self.readings.append(reading)
        self._prune_old_readings()

    def _prune_old_readings(self) -> None:
        """Remove readings older than configured history_days."""
        cutoff = dt_util.utcnow() - timedelta(days=self._history_days)
        self.readings = [r for r in self.readings if r.timestamp > cutoff]

    def get_heating_rate(self) -> float | None:
        """Calculate heating rate (°C/hour) from actual temperature rise.

        Uses segment-based analysis to find periods of actual temperature rise.
        This works regardless of is_heating flag - we look at actual temp changes.

        Strategy:
        1. First try readings where is_heating=True (traditional HVAC control)
        2. If no heating readings, use ALL readings to find rising segments
           (supports Automation-controlled setups where is_heating may be False)
        3. Falls back to baseline rate from long-term statistics if not enough data

        Returns:
            Positive value for heating rate, or None if insufficient data.
        """
        # Strategy 1: Try readings where is_heating=True first
        heating_readings = [r for r in self.readings if r.is_heating]
        rate = self._calculate_heating_rate_segments(heating_readings)

        if rate is not None and rate > MIN_RATE_THRESHOLD:
            self._last_heating_rate = rate
            self._rate_updated_at = dt_util.utcnow()
            return rate

        # Strategy 2: No heating readings - use ALL readings to find rising segments
        # This supports setups where heating is controlled by HA Automation
        # and is_heating flag may always be False
        if len(heating_readings) == 0 and len(self.readings) >= MIN_DATA_POINTS:
            rate = self._calculate_heating_rate_segments(self.readings)
            if rate is not None and rate > MIN_RATE_THRESHOLD:
                self._last_heating_rate = rate
                self._rate_updated_at = dt_util.utcnow()
                return rate

        # Strategy 3: Fallback to baseline if no valid rate from segments
        if self._baseline_heating_rate is not None:
            return self._baseline_heating_rate

        # No data available - return None (don't use magic numbers)
        return None

    def get_cooling_rate(self) -> float | None:
        """Calculate cooling rate (°C/hour) when HVAC is off (heat loss).

        Uses linear regression on temperature readings where is_heating=False.
        Falls back to baseline rate from long-term statistics if not enough data.

        Returns:
            Negative value for cooling/heat loss rate, 0 if no change detected.
            Positive rates are clamped to 0 (sensor lag or external heat source).
        """
        cooling_readings = [r for r in self.readings if not r.is_heating]
        rate = self._calculate_rate(cooling_readings)

        # Clamp positive rates to 0 - cooling/heat loss cannot cause temperature rise
        # Positive values indicate sensor lag or external heat source (sun, etc.)
        if rate is not None and rate > 0:
            rate = 0.0

        # Fallback to baseline if no real-time rate available
        if rate is None and self._baseline_cooling_rate is not None:
            return self._baseline_cooling_rate

        return rate

    def _calculate_heating_rate_segments(self, readings: list[SmartComfortReading]) -> float | None:
        """Calculate heating rate by finding segments of temperature rise.

        Instead of using all readings, this method:
        1. Finds consecutive readings where temperature is rising
        2. Calculates rate for each rising segment
        3. Returns the average of valid segments

        This is more accurate than linear regression over all heating readings,
        because it ignores periods where temperature is stable or falling
        (which happens when target is reached).

        Args:
            readings: List of heating readings (is_heating=True)

        Returns:
            Average heating rate in °C/hour, or None if insufficient data
        """
        if len(readings) < MIN_DATA_POINTS:
            return None

        sorted_readings = sorted(readings, key=lambda r: r.timestamp)

        # Deduplicate readings with same timestamp
        deduped = []
        last_ts = None
        for r in sorted_readings:
            if last_ts is None or r.timestamp != last_ts:
                deduped.append(r)
                last_ts = r.timestamp

        if len(deduped) < MIN_DATA_POINTS:
            return None

        # Find rising segments
        segment_rates = []

        for i in range(1, len(deduped)):
            prev = deduped[i - 1]
            curr = deduped[i]

            time_diff_hours = (curr.timestamp - prev.timestamp).total_seconds() / 3600
            temp_diff = curr.temperature - prev.temperature

            # Skip if time gap is too large (> 2 hours) - not continuous
            if time_diff_hours > SEGMENT_MAX_GAP_HOURS:
                continue

            # Check if temperature is rising
            if temp_diff > SEGMENT_MIN_TEMP_RISE and time_diff_hours > SEGMENT_MIN_TIME_HOURS:  # At least 0.05°C rise
                rate = temp_diff / time_diff_hours
                # Sanity check: rate should be between 0.1 and 10.0 °C/hour
                # TRV heating can be quite fast (5-8°C/h) when starting from cold
                if RATE_MIN_VALID <= rate <= RATE_MAX_VALID:
                    segment_rates.append(rate)

        if not segment_rates:
            return None

        # Return average of segment rates
        avg_rate = sum(segment_rates) / len(segment_rates)
        return round(avg_rate, 2)

    def _calculate_rate(self, readings: list[SmartComfortReading]) -> float | None:
        """Calculate temperature rate using linear regression.

        Args:
            readings: List of temperature readings to analyze

        Returns:
            Rate in °C/hour, or None if insufficient data
        """
        if len(readings) < MIN_DATA_POINTS:
            return None

        # Check time span
        time_span = (readings[-1].timestamp - readings[0].timestamp).total_seconds()
        if time_span < MIN_TIME_SPAN_MINUTES * 60:
            return None

        # Simple linear regression: y = mx + b
        # x = time in hours from first reading
        # y = temperature
        n = len(readings)
        base_time = readings[0].timestamp

        sum_x = 0.0
        sum_y = 0.0
        sum_xy = 0.0
        sum_x2 = 0.0

        for r in readings:
            x = (r.timestamp - base_time).total_seconds() / 3600  # Hours
            y = r.temperature
            sum_x += x
            sum_y += y
            sum_xy += x * y
            sum_x2 += x * x

        # Calculate slope (rate)
        denominator = n * sum_x2 - sum_x * sum_x
        if abs(denominator) < REGRESSION_DENOMINATOR_EPSILON:
            return None

        slope = (n * sum_xy - sum_x * sum_y) / denominator

        # Round to 2 decimal places
        return round(slope, 2)

    def get_time_to_target(self, current_temp: float, target_temp: float, zone_type: str = "HEATING") -> int | None:
        """Estimate time to reach target temperature in minutes.

        Args:
            current_temp: Current temperature
            target_temp: Target temperature
            zone_type: "HEATING" or "AIR_CONDITIONING"

        Returns:
            Estimated minutes to reach target, or None if cannot estimate
        """
        diff = target_temp - current_temp

        if abs(diff) < TEMP_NEAR_TARGET:
            return 0  # Already at target

        # For HEATING zones: only calculate if we need to heat up (current < target)
        # For AC zones: only calculate if we need to cool down (current > target)
        if zone_type == "HEATING":
            if diff <= 0:
                # Current >= target, no heating needed
                return 0
            rate = self.get_heating_rate()
        else:  # AIR_CONDITIONING
            if diff >= 0:
                # Current <= target, no cooling needed
                return 0
            rate = self.get_cooling_rate()

        if rate is None or abs(rate) < MIN_RATE_THRESHOLD:
            return None

        # Time = distance / speed
        hours = abs(diff) / abs(rate)
        minutes = int(hours * 60)

        # Cap at reasonable maximum (8 hours)
        return min(minutes, 480)


    def get_historical_comparison(
        self,
        current_temp: float,
        comparison_window_minutes: int = 30,
    ) -> HistoricalComparison | None:
        """Compare current temperature to historical average at same time of day.

        Looks at readings from the past 7 days at the same time (±window) and
        calculates the average temperature for comparison.

        Args:
            current_temp: Current temperature to compare
            comparison_window_minutes: Time window in minutes (default ±30 min)

        Returns:
            HistoricalComparison with analysis, or None if insufficient data
        """
        if len(self.readings) < MIN_DATA_POINTS:
            return None

        try:
            now = dt_util.now()
        except (ValueError, TypeError):
            now = datetime.now(UTC)
        current_time_minutes = now.hour * 60 + now.minute

        # Collect readings from past days at similar time
        historical_temps = []
        cutoff = now - timedelta(days=self._history_days)

        for reading in self.readings:
            # Skip today's readings
            if reading.timestamp.date() == now.date():
                continue

            # Skip readings older than history window
            if reading.timestamp < cutoff:
                continue

            # Check if reading is within time window
            reading_time_minutes = reading.timestamp.hour * 60 + reading.timestamp.minute
            time_diff = abs(reading_time_minutes - current_time_minutes)

            # Handle midnight wraparound
            if time_diff > MIDNIGHT_WRAPAROUND_MINUTES:  # More than 12 hours
                time_diff = 1440 - time_diff

            if time_diff <= comparison_window_minutes:
                historical_temps.append(reading.temperature)

        if len(historical_temps) < 2:  # noqa: PLR2004 — need at least 2 points for comparison
            return None

        historical_avg = sum(historical_temps) / len(historical_temps)
        difference = current_temp - historical_avg

        return HistoricalComparison(
            current_temp=round(current_temp, 1),
            historical_avg=round(historical_avg, 1),
            difference=round(difference, 1),
            sample_count=len(historical_temps),
            comparison_window_minutes=comparison_window_minutes,
        )

    def get_preheat_advice(
        self,
        target_temp: float,
        target_time: datetime,
        current_temp: float | None = None,
    ) -> PreheatAdvice | None:
        """Calculate recommended preheat start time.

        Based on historical heating rate, calculates when heating should start
        to reach target temperature by the specified time.

        Args:
            target_temp: Desired temperature
            target_time: When target should be reached
            current_temp: Current temperature (uses latest reading if not provided)

        Returns:
            PreheatAdvice with recommendation, or None if cannot calculate
        """
        if current_temp is None:
            if not self.readings:
                return None
            current_temp = self.readings[-1].temperature

        # No preheating needed if already at or above target
        if current_temp >= target_temp:
            return PreheatAdvice(
                recommended_start_time=dt_util.utcnow(),
                target_time=target_time,
                target_temp=target_temp,
                current_temp=current_temp,
                estimated_duration_minutes=0,
                heating_rate=0,
                confidence="high",
            )

        # Get heating rate
        heating_rate = self.get_heating_rate()

        # Determine confidence based on data quality
        heating_readings = [r for r in self.readings if r.is_heating]
        if heating_rate is None:
            # Try baseline rate
            if self._baseline_heating_rate is not None:
                heating_rate = self._baseline_heating_rate
                confidence = "low"
            else:
                return None
        elif len(heating_readings) >= CONFIDENCE_HIGH_READINGS:
            confidence = "high"
        elif len(heating_readings) >= CONFIDENCE_MEDIUM_READINGS:
            confidence = "medium"
        else:
            confidence = "low"

        # Avoid division by zero
        if heating_rate <= MIN_RATE_THRESHOLD:
            return None

        # Calculate duration needed
        temp_diff = target_temp - current_temp
        hours_needed = temp_diff / heating_rate
        minutes_needed = int(hours_needed * 60)

        # Cap at reasonable maximum (4 hours)
        minutes_needed = min(minutes_needed, 240)

        # Calculate start time
        recommended_start = target_time - timedelta(minutes=minutes_needed)

        return PreheatAdvice(
            recommended_start_time=recommended_start,
            target_time=target_time,
            target_temp=target_temp,
            current_temp=current_temp,
            estimated_duration_minutes=minutes_needed,
            heating_rate=heating_rate,
            confidence=confidence,
        )


class SmartComfortManager:
    """Manages smart comfort analytics for all zones."""

    def __init__(
        self, hass: HomeAssistant | None = None, home_id: str = "", history_days: int = DEFAULT_HISTORY_DAYS,
        data_loader: DataLoader | None = None,
    ) -> None:
        """Initialize the Smart Comfort Manager."""
        self._zones: dict[str, ZoneHistory] = {}
        self._enabled = False
        self._hass = hass
        self._home_id = home_id
        self._history_days = history_days
        self._data_loader = data_loader
        self._last_save_time: datetime | None = None
        # Weather compensation settings
        self._outdoor_temp_entity: str = ""
        self._weather_compensation: str = "none"
        self._use_feels_like: bool = False

    def set_history_days(self, days: int) -> None:
        """Update history retention period for all zones."""
        self._history_days = days
        for zone in self._zones.values():
            zone.set_history_days(days)
        _LOGGER.info("Smart Comfort: History retention set to %s days", days)

    def _get_cache_file(self) -> Path:
        """Get the cache file path."""
        from .const import DATA_DIR

        if self._home_id:
            return DATA_DIR / f"smart_comfort_cache_{self._home_id}.json"
        return DATA_DIR / "smart_comfort_cache.json"

    def save_to_file(self) -> bool:
        """Save zone data via DataLoader Store (debounced).

        Returns:
            True if save was scheduled successfully.
        """
        if not self._zones:
            return True

        try:
            data = {
                "saved_at": dt_util.utcnow().isoformat(),
                "history_days": self._history_days,
                "zones": {zone_id: zone.to_dict() for zone_id, zone in self._zones.items()},
            }

            if self._data_loader:
                self._data_loader.save_auxiliary("smart_comfort_cache", data)
            else:
                from .storage import save_json_sync

                cache_file = self._get_cache_file()
                save_json_sync(cache_file, data)

            self._last_save_time = dt_util.utcnow()

            total_readings = sum(len(z.readings) for z in self._zones.values())
            _LOGGER.debug(
                "Smart Comfort: Saved %s zones, %s readings",
                len(self._zones),
                total_readings,
            )
            return True

        except (OSError, ValueError) as e:
            _LOGGER.warning("Smart Comfort: Failed to save cache: %s", e)
            return False

    async def async_load(self) -> int:
        """Load zone data from DataLoader Store.

        Returns:
            Number of readings loaded.
        """
        if not self._data_loader:
            return 0

        try:
            data = await self._data_loader.async_load_auxiliary("smart_comfort_cache")
            if data is None:
                _LOGGER.debug("Smart Comfort: No cache found")
                return 0

            if not isinstance(data, dict):
                _LOGGER.warning("Smart Comfort: Invalid cache format")
                return 0

            zones_data = data.get("zones") or {}
            total_readings = 0

            for zone_id, zone_data in zones_data.items():
                zone = ZoneHistory.from_dict(zone_data)
                # Update history_days from current config
                zone.set_history_days(self._history_days)

                if zone.readings:
                    self._zones[zone_id] = zone
                    total_readings += len(zone.readings)

            saved_at = data.get("saved_at", "unknown")
            _LOGGER.info(
                "Smart Comfort: Loaded %s zones, %s readings from cache (saved at %s)",
                len(self._zones),
                total_readings,
                saved_at,
            )
            return total_readings

        except (OSError, ValueError) as e:
            _LOGGER.warning("Smart Comfort: Failed to load cache: %s", e)
            return 0


    def maybe_save(self) -> None:
        """Save to file if enough time has passed since last save."""
        if self._last_save_time is None:
            self.save_to_file()
            return

        elapsed = dt_util.utcnow() - self._last_save_time
        if elapsed.total_seconds() >= CACHE_SAVE_INTERVAL_MINUTES * 60:
            self.save_to_file()

    def configure_weather(
        self,
        outdoor_temp_entity: str = "",
        weather_compensation: str = "none",
        use_feels_like: bool = False,
    ) -> None:
        """Configure weather compensation settings.

        Args:
            outdoor_temp_entity: Entity ID for outdoor temperature
            weather_compensation: Preset name (none/light/moderate/aggressive)
            use_feels_like: Whether to use feels-like temperature
        """
        self._outdoor_temp_entity = outdoor_temp_entity
        self._weather_compensation = weather_compensation
        self._use_feels_like = use_feels_like
        _LOGGER.info(
            "Smart Comfort: Weather compensation configured - entity=%s, preset=%s, feels_like=%s",
            outdoor_temp_entity,
            weather_compensation,
            use_feels_like,
        )

    def enable(self) -> None:
        """Enable smart comfort tracking."""
        self._enabled = True
        _LOGGER.info("Smart Comfort Manager enabled")

    def disable(self) -> None:
        """Disable smart comfort tracking."""
        self._enabled = False
        _LOGGER.info("Smart Comfort Manager disabled")

    @property
    def is_enabled(self) -> bool:
        """Return whether the feature is enabled."""
        return self._enabled

    def get_zone(self, zone_id: str, zone_name: str = "") -> ZoneHistory:
        """Get or create zone history tracker."""
        if zone_id not in self._zones:
            self._zones[zone_id] = ZoneHistory(zone_id, zone_name or f"Zone {zone_id}", self._history_days)
        return self._zones[zone_id]

    def record_temperature(
        self,
        zone_id: str,
        zone_name: str,
        temperature: float,
        is_heating: bool,
        target_temperature: float | None = None,
    ) -> None:
        """Record a temperature reading for a zone.

        This should be called on each zone state update.

        Args:
            zone_id: Zone identifier
            zone_name: Human-readable zone name
            temperature: Current temperature
            is_heating: Whether HVAC is actively heating/cooling
            target_temperature: Current target temperature (optional)
        """
        if not self._enabled:
            return

        zone = self.get_zone(zone_id, zone_name)
        reading = SmartComfortReading(
            timestamp=dt_util.utcnow(),
            temperature=temperature,
            is_heating=is_heating,
            target_temperature=target_temperature,
        )
        zone.add_reading(reading)

        # Periodically save to file
        self.maybe_save()

        _LOGGER.debug(
            "Smart Comfort: Recorded %s temp=%s°C heating=%s target=%s",
            zone_name,
            temperature,
            is_heating,
            target_temperature,
        )

    def get_heating_rate(self, zone_id: str) -> float | None:
        """Get heating rate for a zone in °C/hour."""
        if zone_id not in self._zones:
            return None
        return self._zones[zone_id].get_heating_rate()

    def get_cooling_rate(self, zone_id: str) -> float | None:
        """Get cooling rate for a zone in °C/hour."""
        if zone_id not in self._zones:
            return None
        return self._zones[zone_id].get_cooling_rate()



    def get_time_to_target(
        self,
        zone_id: str,
        current_temp: float,
        target_temp: float,
        zone_type: str = "HEATING",
    ) -> int | None:
        """Get estimated time to reach target in minutes."""
        if zone_id not in self._zones:
            return None
        return self._zones[zone_id].get_time_to_target(current_temp, target_temp, zone_type)

    def get_historical_comparison(
        self,
        zone_id: str,
        current_temp: float,
        comparison_window_minutes: int = 30,
    ) -> HistoricalComparison | None:
        """Get historical temperature comparison for a zone.

        Args:
            zone_id: Zone identifier
            current_temp: Current temperature to compare
            comparison_window_minutes: Time window in minutes (default ±30 min)

        Returns:
            HistoricalComparison with analysis, or None if insufficient data
        """
        if zone_id not in self._zones:
            return None
        return self._zones[zone_id].get_historical_comparison(
            current_temp,
            comparison_window_minutes,
        )

    def get_preheat_advice(
        self,
        zone_id: str,
        target_temp: float,
        target_time: datetime,
        current_temp: float | None = None,
    ) -> PreheatAdvice | None:
        """Get preheat timing recommendation for a zone.

        Args:
            zone_id: Zone identifier
            target_temp: Desired temperature
            target_time: When target should be reached
            current_temp: Current temperature (uses latest reading if not provided)

        Returns:
            PreheatAdvice with recommendation, or None if cannot calculate
        """
        if zone_id not in self._zones:
            return None
        return self._zones[zone_id].get_preheat_advice(
            target_temp,
            target_time,
            current_temp,
        )


    def get_compensated_rate(self, base_rate: float, for_heating: bool = True) -> float:
        """Apply weather compensation to a heating/cooling rate.

        Args:
            base_rate: Base rate in °C/hour
            for_heating: True for heating rate, False for cooling rate

        Returns:
            Compensated rate in °C/hour
        """
        if self._weather_compensation == "none":
            return base_rate

        outdoor_temp = _get_outdoor_temp(
            self._hass,  # type: ignore[arg-type]
            self._outdoor_temp_entity,
            self._use_feels_like,
        )
        if outdoor_temp is None:
            return base_rate

        preset = WEATHER_COMPENSATION_PRESETS.get(
            self._weather_compensation,
            WEATHER_COMPENSATION_PRESETS["none"],
        )
        cold_thresh, cold_factor, warm_thresh, warm_factor = preset

        # For heating: cold weather = slower heating (more heat loss)
        # For cooling: cold weather = faster cooling (more heat loss)
        factor = 1.0

        if cold_thresh is not None and outdoor_temp < cold_thresh:
            if for_heating:
                # Cold weather: heating takes longer (divide by factor)
                factor = 1.0 / cold_factor
            else:
                # Cold weather: cooling is faster (multiply by factor)
                factor = cold_factor
        elif warm_thresh is not None and outdoor_temp > warm_thresh:
            if for_heating:
                # Warm weather: heating is faster (multiply by factor)
                factor = 1.0 / warm_factor
            else:
                # Warm weather: cooling is slower (divide by factor)
                factor = warm_factor

        compensated = base_rate * factor

        _LOGGER.debug(
            "Weather compensation: outdoor=%s°C, preset=%s, factor=%.2f, base_rate=%.2f, compensated=%.2f",
            outdoor_temp,
            self._weather_compensation,
            factor,
            base_rate,
            compensated,
        )

        return round(compensated, 2)


def _process_entity_history(
    history: list[Any],
    zone: ZoneHistory,
) -> int:
    """Process history states for a single entity and add readings to zone.

    Returns:
        Number of data points added.
    """
    points_added = 0
    for state in history:
        try:
            if state.state in ("unavailable", "unknown"):
                continue

            attrs = state.attributes
            current_temp = attrs.get("current_temperature")
            if current_temp is None:
                continue

            hvac_action = attrs.get("hvac_action", "idle")
            is_heating = hvac_action in ("heating", "cooling")
            target_temp = attrs.get("temperature")

            timestamp = state.last_changed
            if timestamp.tzinfo is None:
                timestamp = timestamp.replace(tzinfo=dt_util.UTC)

            reading = SmartComfortReading(
                timestamp=timestamp,
                temperature=float(current_temp),
                is_heating=is_heating,
                target_temperature=float(target_temp) if target_temp else None,
            )
            zone.readings.append(reading)
            points_added += 1

        except (ValueError, TypeError, AttributeError) as e:
            _LOGGER.debug("Smart Comfort: Skipping invalid history state: %s", e)
            continue
    return points_added


async def async_load_history_from_recorder(
    hass: HomeAssistant,
    manager: SmartComfortManager,
    climate_entity_ids: list[str],
    entity_to_zone_id: dict[str, str] | None = None,
) -> int:
    """Load historical temperature data from HA recorder on startup.

    This allows immediate rate calculations without waiting for data collection.
    Queries the last RECORDER_HISTORY_HOURS of climate entity history.

    Args:
        hass: Home Assistant instance
        manager: SmartComfortManager to populate
        climate_entity_ids: List of climate entity IDs to load history for
        entity_to_zone_id: Mapping from entity name to numeric zone_id
            e.g., {"master": "1", "dining": "2"}. Required for correct zone matching.

    Returns:
        Number of data points loaded
    """
    if not climate_entity_ids or not entity_to_zone_id:
        return 0

    try:
        from homeassistant.components.recorder import get_instance  # type: ignore[attr-defined]
        from homeassistant.components.recorder.history import get_significant_states

        end_time = dt_util.utcnow()
        start_time = end_time - timedelta(hours=RECORDER_HISTORY_HOURS)

        _LOGGER.info(
            "Smart Comfort: Loading %sh history for %s climate entities",
            RECORDER_HISTORY_HOURS,
            len(climate_entity_ids),
        )

        def _get_history() -> list[dict[str, Any]]:
            return get_significant_states(  # type: ignore[return-value]
                hass, start_time, end_time, climate_entity_ids,
                significant_changes_only=False,
            )

        states = await get_instance(hass).async_add_executor_job(_get_history)

        if not states:
            _LOGGER.debug("Smart Comfort: No history found in recorder")
            return 0

        total_points = 0

        for entity_id, history in states.items():  # type: ignore[attr-defined]
            if not history:
                continue

            entity_name = entity_id.replace("climate.", "")
            zone_id = entity_to_zone_id.get(entity_name)
            if not zone_id:
                _LOGGER.debug("Smart Comfort: No zone_id mapping for %s", entity_name)
                continue

            zone_name = entity_name.replace("_", " ").title()
            zone = manager.get_zone(zone_id, zone_name)
            points_added = _process_entity_history(history, zone)

            zone.readings.sort(key=lambda r: r.timestamp)
            zone._prune_old_readings()

            if points_added > 0:
                _LOGGER.info(
                    "Smart Comfort: Loaded %s history points for %s, %s after pruning",
                    points_added, zone_name, len(zone.readings),
                )
                total_points += len(zone.readings)

        _LOGGER.info("Smart Comfort: Total %s data points loaded from recorder", total_points)
        return total_points

    except ImportError:
        _LOGGER.debug("Smart Comfort: Recorder component not available")
        return 0
    except Exception as e:  # noqa: BLE001 — HA entity update pattern
        _LOGGER.warning("Smart Comfort: Failed to load history from recorder: %s", e)
        return 0


def _calculate_zone_baseline(
    sensor_stats: list[dict[str, Any]],
) -> dict[str, Any] | None:
    """Calculate baseline heating/cooling rates from hourly statistics for one zone.

    Returns:
        Dict with baseline rates and metadata, or None if insufficient data.
    """
    if len(sensor_stats) < 24:  # noqa: PLR2004 — minimum 24 hours of data
        return None

    temp_changes = []
    for i in range(1, len(sensor_stats)):
        prev_mean = sensor_stats[i - 1].get("mean")
        curr_mean = sensor_stats[i].get("mean")
        if prev_mean is not None and curr_mean is not None:
            temp_changes.append(curr_mean - prev_mean)

    if not temp_changes:
        return None

    heating_changes = sorted(c for c in temp_changes if c > BASELINE_CHANGE_THRESHOLD)
    cooling_changes = sorted(c for c in temp_changes if c < -BASELINE_CHANGE_THRESHOLD)

    baseline_heating = round(heating_changes[len(heating_changes) // 2], 2) if heating_changes else None
    baseline_cooling = round(cooling_changes[len(cooling_changes) // 2], 2) if cooling_changes else None

    return {
        "baseline_heating_rate": baseline_heating,
        "baseline_cooling_rate": baseline_cooling,
        "data_points": len(sensor_stats),
        "heating_samples": len(heating_changes),
        "cooling_samples": len(cooling_changes),
    }


async def async_load_baseline_from_statistics(
    hass: HomeAssistant,
    manager: SmartComfortManager,
    zone_sensor_mapping: dict[str, str],
) -> dict[str, dict[str, Any]]:
    """Load baseline heating/cooling rates from long-term statistics.

    Long-term statistics provide hourly averages over weeks/months, which can
    be used to calculate more accurate baseline rates for each zone.

    This is Tier 3 of the 3-tier loading strategy:
    - Tier 1: Cache file (2h detailed data)
    - Tier 2: Recorder history (24h detailed states)
    - Tier 3: Long-term statistics (weeks of hourly averages)

    Args:
        hass: Home Assistant instance
        manager: SmartComfortManager to update with baseline rates
        zone_sensor_mapping: Dict mapping zone_id to temperature sensor entity_id
            e.g., {"master": "sensor.master_temperature"}

    Returns:
        Dict of zone_id -> {"baseline_heating_rate": float, "baseline_cooling_rate": float}
    """
    if not zone_sensor_mapping:
        return {}

    try:
        from homeassistant.components.recorder import get_instance  # type: ignore[attr-defined]
        from homeassistant.components.recorder.statistics import statistics_during_period

        end_time = dt_util.utcnow()
        start_time = end_time - timedelta(days=7)
        statistic_ids = list(zone_sensor_mapping.values())

        _LOGGER.info("Smart Comfort: Loading 7-day statistics for %s sensors", len(statistic_ids))

        def _get_statistics() -> dict[str, Any]:
            return statistics_during_period(
                hass, start_time, end_time,
                statistic_ids=statistic_ids,  # type: ignore[arg-type]
                period="hour",
                units={"temperature": "°C"},
                types={"mean", "min", "max"},
            )

        stats = await get_instance(hass).async_add_executor_job(_get_statistics)

        if not stats:
            _LOGGER.debug("Smart Comfort: No long-term statistics found")
            return {}

        results = {}

        for zone_id, sensor_id in zone_sensor_mapping.items():
            if sensor_id not in stats:
                continue

            sensor_stats = stats[sensor_id]
            baseline = _calculate_zone_baseline(sensor_stats)
            if baseline is None:
                _LOGGER.debug(
                    "Smart Comfort: Not enough statistics for %s (%s points)",
                    zone_id, len(sensor_stats),
                )
                continue

            results[zone_id] = baseline

            zone = manager.get_zone(zone_id)
            zone._baseline_heating_rate = baseline["baseline_heating_rate"]
            zone._baseline_cooling_rate = baseline["baseline_cooling_rate"]

            _LOGGER.info(
                "Smart Comfort: %s baseline rates from %s hours: heating=%s°C/h, cooling=%s°C/h",
                zone_id, baseline["data_points"],
                baseline["baseline_heating_rate"], baseline["baseline_cooling_rate"],
            )

        return results

    except ImportError as e:
        _LOGGER.debug("Smart Comfort: Statistics API not available: %s", e)
        return {}
    except Exception as e:  # noqa: BLE001 — HA entity update pattern
        _LOGGER.warning("Smart Comfort: Failed to load statistics: %s", e)
        return {}
