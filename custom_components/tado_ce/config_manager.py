"""Tado CE Configuration Manager — config entry settings access and persistence.

Manages user configuration settings stored in Home Assistant config entry.
"""

from __future__ import annotations

import logging
from typing import TYPE_CHECKING, Any

if TYPE_CHECKING:
    from collections.abc import Mapping

    from homeassistant.config_entries import ConfigEntry
    from homeassistant.core import HomeAssistant

_LOGGER = logging.getLogger(__name__)

# Default configuration values
DEFAULT_WEATHER_ENABLED = False
DEFAULT_MOBILE_DEVICES_ENABLED = False
DEFAULT_MOBILE_DEVICES_FREQUENT_SYNC = False
DEFAULT_OFFSET_ENABLED = False
DEFAULT_TEST_MODE_ENABLED = False
DEFAULT_QUOTA_RESERVE_ENABLED = True  # Quota Reserve Protection default ON
DEFAULT_DAY_START_HOUR = 7
DEFAULT_NIGHT_START_HOUR = 23
DEFAULT_API_HISTORY_RETENTION_DAYS = 14  # 0 = keep forever
DEFAULT_HOT_WATER_TIMER_DURATION = 60  # minutes
DEFAULT_REFRESH_DEBOUNCE_SECONDS = 15  # Debounce delay for immediate refresh
DEFAULT_SCHEDULE_CALENDAR_ENABLED = False  # Schedule Calendar (opt-in)
DEFAULT_SMART_COMFORT_ENABLED = False  # Smart Comfort analytics (opt-in)
DEFAULT_OUTDOOR_TEMP_ENTITY = ""  # Outdoor temperature entity for weather compensation
DEFAULT_WEATHER_COMPENSATION = "none"  # Weather compensation preset
DEFAULT_USE_FEELS_LIKE = False  # Use feels-like temperature instead of actual
DEFAULT_SMART_COMFORT_HISTORY_DAYS = 7  # Days of temperature history to keep for rate calculation
DEFAULT_MOLD_RISK_WINDOW_TYPE = "double_pane"  # Window type for mold risk surface temperature calculation

# WEATHER_COMPENSATION_PRESETS moved to const.py

# Validation constants
MIN_HOUR = 0
MAX_HOUR = 23
MIN_INTERVAL_MINUTES = 1
MAX_INTERVAL_MINUTES = 1440  # 24 hours
MIN_RETENTION_DAYS = 0  # 0 = forever
MAX_RETENTION_DAYS = 365
MIN_TIMER_DURATION = 1  # minutes
MAX_TIMER_DURATION = 1440  # 24 hours
MIN_SMART_COMFORT_HISTORY_DAYS = 1
MAX_SMART_COMFORT_HISTORY_DAYS = 30


class ConfigurationManager:
    """Manages configuration settings for Tado CE integration."""

    def __init__(self, config_entry: ConfigEntry, hass: HomeAssistant = None) -> None:  # type: ignore[assignment]
        """Initialize configuration manager with config entry.

        Args:
            config_entry: Home Assistant config entry containing user settings
            hass: Home Assistant instance (optional, for async file operations)
        """
        self._config_entry = config_entry
        self._options: Mapping[str, Any] = config_entry.options or {}
        self._hass = hass
        # Don't sync on init to avoid blocking - will be synced when needed

    def _get_option(self, key: str, default: Any) -> Any:
        """Get option value with real-time update support.

        Reads directly from config_entry.options to get real-time value
        after user changes options (not cached self._options).

        Args:
            key: Option key to retrieve
            default: Default value if key not found

        Returns:
            Option value or default
        """
        if self._config_entry and self._config_entry.options:
            return self._config_entry.options.get(key, default)
        return self._options.get(key, default)

    def _get_int_option(self, key: str, default: int, min_val: int, max_val: int) -> int:
        """Get integer option with float→int conversion and range validation.

        Handles HA NumberSelector (returns float), legacy TextSelector (returns str),
        and out-of-range values (returns default with warning).
        """
        value = self._get_option(key, default)
        if isinstance(value, float):
            value = int(value)
        elif isinstance(value, str):
            if not value.strip():
                return default
            try:
                value = int(float(value))
            except (ValueError, TypeError, OverflowError):
                _LOGGER.warning("Invalid %s: %s, using default %s", key, value, default)
                return default
        if not isinstance(value, int) or value < min_val or value > max_val:
            _LOGGER.warning("Invalid %s: %s, using default %s", key, value, default)
            return default
        return value

    def _get_float_option(self, key: str, default: float, min_val: float, max_val: float) -> float:
        """Get float option with range validation.

        Accepts int or float input. Out-of-range values return default with warning.
        """
        value = self._get_option(key, default)
        if isinstance(value, (int, float)) and min_val <= value <= max_val:
            return float(value)
        _LOGGER.warning("Invalid %s: %s, using default %s", key, value, default)
        return default

    @staticmethod
    def validate_hour(hour: int, field_name: str) -> tuple[bool, str | None]:
        """Validate hour value (0-23).

        Args:
            hour: Hour value to validate
            field_name: Name of the field for error messages

        Returns:
            Tuple of (is_valid, error_message)
        """
        if not isinstance(hour, int):
            return False, f"{field_name} must be an integer"

        if hour < MIN_HOUR or hour > MAX_HOUR:
            return False, f"{field_name} must be between {MIN_HOUR} and {MAX_HOUR}"

        return True, None

    @staticmethod
    def validate_interval(interval: int | None, field_name: str) -> tuple[bool, str | None]:
        """Validate polling interval (1-1440 minutes or None).

        Args:
            interval: Interval value to validate
            field_name: Name of the field for error messages

        Returns:
            Tuple of (is_valid, error_message)
        """
        if interval is None:
            return True, None

        if not isinstance(interval, int):
            return False, f"{field_name} must be an integer or null"

        if interval < MIN_INTERVAL_MINUTES or interval > MAX_INTERVAL_MINUTES:
            return False, f"{field_name} must be between {MIN_INTERVAL_MINUTES} and {MAX_INTERVAL_MINUTES} minutes"

        return True, None

    @staticmethod
    def validate_retention_days(days: int) -> tuple[bool, str | None]:
        """Validate retention days (0-365).

        Args:
            days: Retention days to validate

        Returns:
            Tuple of (is_valid, error_message)
        """
        if not isinstance(days, int):
            return False, "api_history_retention_days must be an integer"

        if days < MIN_RETENTION_DAYS or days > MAX_RETENTION_DAYS:
            return False, f"api_history_retention_days must be between {MIN_RETENTION_DAYS} and {MAX_RETENTION_DAYS}"

        return True, None

    @staticmethod
    def validate_day_night_hours(day_start: int, night_start: int) -> tuple[bool, str | None]:
        """Validate day/night hour combination.

        Args:
            day_start: Day start hour
            night_start: Night start hour

        Returns:
            Tuple of (is_valid, error_message)

        Note:
            day_start == night_start is valid (uniform polling mode)
        """
        # Validate individual hours first
        valid, error = ConfigurationManager.validate_hour(day_start, "day_start_hour")
        if not valid:
            return False, error

        valid, error = ConfigurationManager.validate_hour(night_start, "night_start_hour")
        if not valid:
            return False, error

        # Both hours are valid (same value = uniform mode, which is allowed)
        return True, None


    def get_weather_enabled(self) -> bool:
        """Check if weather sensors are enabled.

        Returns:
            True if weather sensors should be created, False otherwise
        """
        return self._get_option("weather_enabled", DEFAULT_WEATHER_ENABLED)  # type: ignore[no-any-return]

    def get_mobile_devices_enabled(self) -> bool:
        """Check if mobile device tracking is enabled.

        Returns:
            True if mobile device tracking should be active, False otherwise
        """
        return self._get_option("mobile_devices_enabled", DEFAULT_MOBILE_DEVICES_ENABLED)  # type: ignore[no-any-return]

    def get_mobile_devices_frequent_sync(self) -> bool:
        """Check if mobile devices should be synced every quick sync.

        Returns:
            True if mobile devices should sync frequently, False for full sync only
        """
        return self._get_option("mobile_devices_frequent_sync", DEFAULT_MOBILE_DEVICES_FREQUENT_SYNC)  # type: ignore[no-any-return]

    def get_offset_enabled(self) -> bool:
        """Check if temperature offset attribute is enabled on climate entities.

        Returns:
            True if offset_celsius attribute should be added to climate entities
        """
        return self._get_option("offset_enabled", DEFAULT_OFFSET_ENABLED)  # type: ignore[no-any-return]

    def get_home_state_sync_enabled(self) -> bool:
        """Check if home state sync is enabled (for away mode switch and climate presets).

        Returns:
            True if home state should be synced, False to save API calls
        """
        return self._get_option("home_state_sync_enabled", False)  # type: ignore[no-any-return]

    def get_test_mode_enabled(self) -> bool:
        """Check if Test Mode is enabled (enforce 100 API limit).

        Note: Uses _get_option() for real-time value after user toggles.

        Returns:
            True if Test Mode is active, False otherwise
        """
        return self._get_option("test_mode_enabled", DEFAULT_TEST_MODE_ENABLED)  # type: ignore[no-any-return]

    def get_quota_reserve_enabled(self) -> bool:
        """Check if Quota Reserve Protection is enabled.

        User-configurable toggle for quota reserve protection.
        When enabled, pauses polling when quota is low and blocks manual
        actions when quota is critically low (bootstrap reserve).

        Returns:
            True if Quota Reserve Protection is active (default), False otherwise
        """
        return self._get_option("quota_reserve_enabled", DEFAULT_QUOTA_RESERVE_ENABLED)  # type: ignore[no-any-return]

    def get_day_start_hour(self) -> int:
        """Get configured day start hour (default 7am).

        Returns:
            Hour (0-23) when day period starts
        """
        return self._get_int_option("day_start_hour", DEFAULT_DAY_START_HOUR, 0, 23)

    def get_night_start_hour(self) -> int:
        """Get configured night start hour (default 11pm).

        Returns:
            Hour (0-23) when night period starts
        """
        return self._get_int_option("night_start_hour", DEFAULT_NIGHT_START_HOUR, 0, 23)

    def _get_optional_interval(self, key: str) -> int | None:
        """Get optional polling interval with float→int conversion and range validation.

        Handles HA NumberSelector (float), legacy TextSelector (str),
        None (not configured), and out-of-range values.

        Returns:
            Interval in minutes (1-1440), or None if not configured/invalid.
        """
        interval = self._get_option(key, None)
        if interval is None:
            return None

        if isinstance(interval, float):
            interval = int(interval)
        elif isinstance(interval, str):
            if not interval.strip():
                return None
            try:
                interval = int(float(interval))
            except (ValueError, TypeError, OverflowError):
                _LOGGER.warning("Invalid %s: %s, ignoring", key, interval)
                return None

        if not isinstance(interval, int) or interval < 1 or interval > 1440:  # noqa: PLR2004 — 1440 min = 24h max interval
            _LOGGER.warning("Invalid %s: %s, ignoring", key, interval)
            return None
        return interval

    def get_custom_day_interval(self) -> int | None:
        """Get custom day polling interval in minutes.

        Returns:
            Polling interval in minutes (1-1440), or None if not configured
        """
        return self._get_optional_interval("custom_day_interval")

    def get_custom_night_interval(self) -> int | None:
        """Get custom night polling interval in minutes.

        Returns:
            Polling interval in minutes (1-1440), or None if not configured
        """
        return self._get_optional_interval("custom_night_interval")

    def get_api_history_retention_days(self) -> int:
        """Get API call history retention period in days.

        Returns:
            Number of days to retain history (0 = keep forever, default 14)
        """
        return self._get_int_option("api_history_retention_days", DEFAULT_API_HISTORY_RETENTION_DAYS, 0, 365)

    def get_hot_water_timer_duration(self) -> int:
        """Get hot water timer duration in minutes.

        Returns:
            Timer duration in minutes (1-1440, default 60)
        """
        return self._get_int_option("hot_water_timer_duration", DEFAULT_HOT_WATER_TIMER_DURATION, MIN_TIMER_DURATION, MAX_TIMER_DURATION)

    def get_refresh_debounce_seconds(self) -> int:
        """Get refresh debounce delay in seconds.

        Configurable debounce delay for immediate refresh after state changes.
        Higher values = fewer API calls but slower UI updates.

        Returns:
            Debounce delay in seconds (1-60, default 15)
        """
        return self._get_int_option("refresh_debounce_seconds", DEFAULT_REFRESH_DEBOUNCE_SECONDS, 1, 60)

    def get_schedule_calendar_enabled(self) -> bool:
        """Check if Schedule Calendar is enabled.

        Opt-in feature to display heating schedules as calendar entities.

        Returns:
            True if Schedule Calendar should be created, False otherwise
        """
        return self._get_option("schedule_calendar_enabled", DEFAULT_SCHEDULE_CALENDAR_ENABLED)  # type: ignore[no-any-return]

    def get_smart_comfort_enabled(self) -> bool:
        """Check if Smart Comfort analytics is enabled.

        Opt-in feature providing heating/cooling rate sensors
        and time-to-target estimation.

        Returns:
            True if Smart Comfort sensors should be created, False otherwise
        """
        return self._get_option("smart_comfort_enabled", DEFAULT_SMART_COMFORT_ENABLED)  # type: ignore[no-any-return]

    def get_outdoor_temp_entity(self) -> str:
        """Get the outdoor temperature entity for weather compensation.

        User-configured entity for outdoor temperature.
        Can be Tado weather, WeatherUnderground, AccuWeather, Tomorrow.io, etc.

        Returns:
            Entity ID string, or empty string if not configured
        """
        return self._get_option("outdoor_temp_entity", DEFAULT_OUTDOOR_TEMP_ENTITY)  # type: ignore[no-any-return]

    def get_smart_comfort_mode(self) -> str:
        """Get the Smart Comfort mode preset.

        Comprehensive comfort optimization including:
        - Outdoor temperature compensation
        - Humidity adjustment
        - Preheat duration factors

        Returns:
            Preset name: 'none', 'light', 'moderate', or 'aggressive'
        """
        # Check new key first, fallback to legacy weather_compensation for backward compatibility
        return self._get_option(  # type: ignore[no-any-return]
            "smart_comfort_mode",
            self._get_option("weather_compensation", DEFAULT_WEATHER_COMPENSATION),
        )

    def get_use_feels_like(self) -> bool:
        """Check if feels-like temperature should be used.

        Uses feels-like (apparent) temperature instead of actual
        for weather compensation calculations.

        Returns:
            True to use feels-like temperature, False for actual temperature
        """
        return self._get_option("use_feels_like", DEFAULT_USE_FEELS_LIKE)  # type: ignore[no-any-return]

    def get_smart_comfort_history_days(self) -> int:
        """Get Smart Comfort temperature history retention in days.

        Returns:
            Number of days (1-30, default 7)
        """
        return self._get_int_option("smart_comfort_history_days", DEFAULT_SMART_COMFORT_HISTORY_DAYS, MIN_SMART_COMFORT_HISTORY_DAYS, MAX_SMART_COMFORT_HISTORY_DAYS)

    def get_mold_risk_window_type(self) -> str:
        """Get the window type for mold risk surface temperature calculation.

        Window U-value affects surface temperature calculation.
        Used with outdoor temperature to estimate cold spot temperature.

        Returns:
            Window type: 'single_pane', 'double_pane', 'triple_pane', or 'passive_house'
        """
        window_type = self._get_option("mold_risk_window_type", DEFAULT_MOLD_RISK_WINDOW_TYPE)

        # Validate against known window types
        from .const import WINDOW_U_VALUES

        if window_type not in WINDOW_U_VALUES:
            _LOGGER.warning(
                "Invalid mold_risk_window_type: %s, using default %s",
                window_type,
                DEFAULT_MOLD_RISK_WINDOW_TYPE,
            )
            return DEFAULT_MOLD_RISK_WINDOW_TYPE

        return window_type  # type: ignore[no-any-return]

    def get_adaptive_preheat_enabled(self) -> bool:
        """Check if Adaptive Preheat is enabled.

        Automatically triggers heating when preheat_now sensor turns ON.
        Replaces Tado's cloud-based Early Start with local automation.

        Returns:
            True if Adaptive Preheat is enabled, False otherwise
        """
        return self._get_option("adaptive_preheat_enabled", False)  # type: ignore[no-any-return]

    def get_heating_cycle_min_cycles(self) -> int:
        """Get minimum cycles required for thermal analytics.

        Returns:
            Minimum cycles (1-10, default 3)
        """
        return self._get_int_option("heating_cycle_min_cycles", 3, 1, 10)

    def get_heating_cycle_history_days(self) -> int:
        """Get heating cycle history retention in days.

        Returns:
            Number of days (7-90, default 30)
        """
        return self._get_int_option("heating_cycle_history_days", 30, 7, 90)

    def get_heating_cycle_inertia_threshold(self) -> float:
        """Get thermal inertia detection threshold.

        Returns:
            Threshold in °C (0.05-0.5, default 0.1)
        """
        return self._get_float_option("heating_cycle_inertia_threshold", 0.1, 0.05, 0.5)

    def get_zone_diagnostics_enabled(self) -> bool:
        """Check if Zone Diagnostics entities are enabled.

        Controls visibility of battery, connection, heating power sensors.
        New installs: OFF (minimal entities)
        Upgrades: ON (preserve existing entities)

        Returns:
            True if Zone Diagnostics entities should be created
        """
        return self._get_option("zone_diagnostics_enabled", True)  # type: ignore[no-any-return]

    def get_device_controls_enabled(self) -> bool:
        """Check if Device Controls entities are enabled.

        Controls visibility of child lock, early start switches.
        New installs: OFF (minimal entities)
        Upgrades: ON (preserve existing entities)

        Returns:
            True if Device Controls entities should be created
        """
        return self._get_option("device_controls_enabled", True)  # type: ignore[no-any-return]

    def get_boost_buttons_enabled(self) -> bool:
        """Check if Boost Buttons are enabled.

        Controls visibility of boost buttons.
        New installs: OFF (minimal entities)
        Upgrades: ON (preserve existing entities)

        Returns:
            True if Boost Buttons should be created
        """
        return self._get_option("boost_buttons_enabled", True)  # type: ignore[no-any-return]

    def get_environment_sensors_enabled(self) -> bool:
        """Check if Environment Sensors are enabled.

        Controls visibility of mold risk, comfort level, condensation risk.
        New installs: OFF (minimal entities)
        Upgrades: ON (preserve existing entities)

        Returns:
            True if Environment Sensors should be created
        """
        return self._get_option("environment_sensors_enabled", True)  # type: ignore[no-any-return]

    def get_thermal_analytics_enabled(self) -> bool:
        """Check if Thermal Analytics sensors are enabled.

        Controls visibility of thermal analytics sensors.
        New installs: OFF (minimal entities)
        Upgrades: ON (preserve existing entities)

        Returns:
            True if Thermal Analytics sensors should be created
        """
        return self._get_option("thermal_analytics_enabled", True)  # type: ignore[no-any-return]

    def get_thermal_analytics_zones(self) -> list[str]:
        """Get list of zone IDs enabled for Thermal Analytics.

        Per-zone control for Thermal Analytics sensors.
        Zones that never call for heat (passive heating) will always show
        'unavailable' - users can disable these to keep UI clean.

        Returns:
            List of zone ID strings. Empty list = all zones with heatingPower.
        """
        zones = self._get_option("thermal_analytics_zones", [])
        if isinstance(zones, list):
            return [str(z) for z in zones]
        return []


    def get_wc_enabled(self) -> bool:
        """Check if weather compensation is enabled.

        Returns:
            True if weather compensation should run
        """
        return self._get_option("wc_enabled", False)  # type: ignore[no-any-return]

    def get_wc_heating_system_preset(self) -> str:
        """Get the heating system preset name.

        Returns:
            Preset: 'radiators_standard', 'radiators_low_temp', 'underfloor', or 'custom'
        """
        preset = self._get_option("wc_heating_system_preset", "radiators_standard")
        if preset in ("radiators_standard", "radiators_low_temp", "underfloor", "custom"):
            return preset  # type: ignore[no-any-return]
        return "radiators_standard"

    def get_wc_slope(self) -> float:
        """Get the heating curve slope.

        Returns:
            Slope value (0.3-3.0, default 1.5)
        """
        return self._get_float_option("wc_slope", 1.5, 0.3, 3.0)

    def get_wc_design_outdoor_temp(self) -> float:
        """Get the design outdoor temperature.

        Returns:
            Temperature in °C (-30 to 10, default -5)
        """
        return self._get_float_option("wc_design_outdoor_temp", -5.0, -30.0, 10.0)

    def get_wc_max_flow_temp(self) -> float:
        """Get the maximum flow temperature.

        Returns:
            Temperature in °C (25-80, default 65)
        """
        return self._get_float_option("wc_max_flow_temp", 65.0, 25.0, 80.0)

    def get_wc_min_flow_temp(self) -> float:
        """Get the minimum flow temperature.

        Returns:
            Temperature in °C (25-60, default 25)
        """
        return self._get_float_option("wc_min_flow_temp", 25.0, 25.0, 60.0)

    def get_wc_shutoff_temp(self) -> float:
        """Get the heating shutoff outdoor temperature.

        Returns:
            Temperature in °C (5-30, default 18)
        """
        return self._get_float_option("wc_shutoff_temp", 18.0, 5.0, 30.0)

    def get_wc_smoothing_method(self) -> str:
        """Get the outdoor temperature smoothing method.

        Returns:
            Method: 'none', 'ema', or 'rolling_average' (default 'ema')
        """
        method = self._get_option("wc_smoothing_method", "ema")
        if method in ("none", "ema", "rolling_average"):
            return method  # type: ignore[no-any-return]
        return "ema"

    def get_wc_smoothing_window(self) -> int:
        """Get the smoothing window duration in minutes.

        Returns:
            Window in minutes (15-1440, default 60)
        """
        return self._get_int_option("wc_smoothing_window", 60, 15, 1440)

    def get_wc_room_compensation_enabled(self) -> bool:
        """Check if indoor temperature feedback (room compensation) is enabled.

        Returns:
            True if room compensation should adjust flow temperature
        """
        return self._get_option("wc_room_compensation_enabled", False)  # type: ignore[no-any-return]

    def get_wc_room_compensation_factor(self) -> float:
        """Get the room compensation factor.

        Returns:
            Factor in °C flow per °C indoor deviation (1.0-5.0, default 3.0)
        """
        return self._get_float_option("wc_room_compensation_factor", 3.0, 1.0, 5.0)

    def get_wc_step_size(self) -> float:
        """Get the flow temperature step size.

        Returns:
            Step size in °C (0.5-2.0, default 1.0)
        """
        return self._get_float_option("wc_step_size", 1.0, 0.5, 2.0)

    def get_wc_hysteresis(self) -> float:
        """Get the hysteresis dead band for flow temperature changes.

        Returns:
            Hysteresis in °C (0.5-3.0, default 1.0)
        """
        return self._get_float_option("wc_hysteresis", 1.0, 0.5, 3.0)

    # ------------------------------------------------------------------
    # API Write Optimization
    # ------------------------------------------------------------------

    def get_smart_actions_debounce_seconds(self) -> int:
        """Get Smart Actions debounce window in seconds.

        Returns:
            Debounce window (0-10, default 3). 0 = disabled.
        """
        from .const import (
            SMART_ACTIONS_DEBOUNCE_DEFAULT,
            SMART_ACTIONS_DEBOUNCE_MAX,
            SMART_ACTIONS_DEBOUNCE_MIN,
        )

        return self._get_int_option(
            "smart_actions_debounce_seconds",
            SMART_ACTIONS_DEBOUNCE_DEFAULT,
            SMART_ACTIONS_DEBOUNCE_MIN,
            SMART_ACTIONS_DEBOUNCE_MAX,
        )


    def get_device_sync_delay_seconds(self) -> float:
        """Get Device Sync delay between sequential device operations.

        Returns:
            Delay in seconds (0.5-5.0, default 1.0).
        """
        from .const import (
            DEVICE_SYNC_DELAY_DEFAULT,
            DEVICE_SYNC_DELAY_MAX,
            DEVICE_SYNC_DELAY_MIN,
        )

        return self._get_float_option(
            "device_sync_delay_seconds",
            DEVICE_SYNC_DELAY_DEFAULT,
            DEVICE_SYNC_DELAY_MIN,
            DEVICE_SYNC_DELAY_MAX,
        )

    def get_all_config(self) -> dict[str, Any]:
        """Get all configuration values.

        Returns:
            Dictionary containing all configuration settings
        """
        return {
            "weather_enabled": self.get_weather_enabled(),
            "mobile_devices_enabled": self.get_mobile_devices_enabled(),
            "mobile_devices_frequent_sync": self.get_mobile_devices_frequent_sync(),
            "offset_enabled": self.get_offset_enabled(),
            "test_mode_enabled": self.get_test_mode_enabled(),
            "day_start_hour": self.get_day_start_hour(),
            "night_start_hour": self.get_night_start_hour(),
            "custom_day_interval": self.get_custom_day_interval(),
            "custom_night_interval": self.get_custom_night_interval(),
            "api_history_retention_days": self.get_api_history_retention_days(),
            "hot_water_timer_duration": self.get_hot_water_timer_duration(),
        }
