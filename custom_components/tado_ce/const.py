"""Tado CE constants — domain, defaults, window U-values, overlay modes."""

from __future__ import annotations

import os
from pathlib import Path
from typing import Final

DOMAIN = "tado_ce"
MANUFACTURER = "Joe Yiu (@hiall-fyi)"

# Tado bridge device models (Internet Bridge hardware)
# Used for pre-registering bridge devices in the device registry before platform setup
TADO_BRIDGE_MODELS = ["IB01", "IB02"]

# Data directory (persistent storage)
# Stored in .storage/tado_ce/ to prevent HACS upgrades from overwriting data files
# Use environment variable if set (for testing), otherwise use standard HA path
_BASE_CONFIG_DIR = os.environ.get("TADO_CE_CONFIG_DIR", "/config")
DATA_DIR = Path(_BASE_CONFIG_DIR) / ".storage" / "tado_ce"

# Multi-home support - per-home data files
# Files that are per-home (need home_id suffix)
PER_HOME_FILES = [
    "config",
    "zones",
    "zones_info",
    "ratelimit",
    "weather",
    "mobile_devices",
    "home_state",
    "api_call_history",
    "offsets",
    "ac_capabilities",
    "schedules",
    "home_details",
]


def get_data_file(base_name: str, home_id: str | None = None) -> Path:
    """Get data file path, with optional home_id suffix for multi-home support.

    Args:
        base_name: Base filename without extension (e.g., "zones", "config")
        home_id: Optional home ID for per-home files

    Returns:
        Path to the data file

    Examples:
        get_data_file("zones") -> /config/.storage/tado_ce/zones.json
        get_data_file("zones", "12345") -> /config/.storage/tado_ce/zones_12345.json

    """
    if home_id and base_name in PER_HOME_FILES:
        return DATA_DIR / f"{base_name}_{home_id}.json"
    return DATA_DIR / f"{base_name}.json"


# Global file paths (non-home-scoped, used for bootstrap and debugging)
# Per-home files should use get_data_file() with home_id
CONFIG_FILE = DATA_DIR / "config.json"
ZONES_FILE = DATA_DIR / "zones.json"
ZONES_INFO_FILE = DATA_DIR / "zones_info.json"

# Service names
SERVICE_SET_CLIMATE_TIMER = "set_climate_timer"
SERVICE_SET_WATER_HEATER_TIMER = "set_water_heater_timer"
SERVICE_RESUME_SCHEDULE = "resume_schedule"
SERVICE_SET_TEMP_OFFSET = "set_climate_temperature_offset"  # Match official Tado integration
SERVICE_GET_TEMP_OFFSET = "get_temperature_offset"  # On-demand offset fetch
SERVICE_ADD_METER_READING = "add_meter_reading"
SERVICE_IDENTIFY_DEVICE = "identify_device"
SERVICE_SET_AWAY_CONFIG = "set_away_configuration"
SERVICE_ACTIVATE_OPEN_WINDOW = "activate_open_window"
SERVICE_DEACTIVATE_OPEN_WINDOW = "deactivate_open_window"
SERVICE_SET_OPEN_WINDOW_MODE = "set_open_window_mode"
SERVICE_RESTORE_PREVIOUS_STATE = "restore_previous_state"

# API Base URLs
TADO_API_BASE = "https://my.tado.com/api/v2"
TADO_AUTH_URL = "https://login.tado.com/oauth2"
CLIENT_ID = "1bb50063-6b0c-4d11-bd99-387f4a91cc46"

# API Endpoints (relative to TADO_API_BASE)
API_ENDPOINT_ME = f"{TADO_API_BASE}/me"
API_ENDPOINT_DEVICES = f"{TADO_API_BASE}/devices"  # + /{serial}

# Auth Endpoints
AUTH_ENDPOINT_DEVICE = f"{TADO_AUTH_URL}/device_authorize"
AUTH_ENDPOINT_TOKEN = f"{TADO_AUTH_URL}/token"

# =============================================================================
# Unit Conversion Constants
# =============================================================================

# Weather compensation presets: (cold_threshold, cold_factor, warm_threshold, warm_factor)
# - cold_threshold: Apply cold factor when outdoor temp is below this (°C)
# - cold_factor: Multiplier for heating rate in cold weather (>1 = slower heating)
# - warm_threshold: Apply warm factor when outdoor temp is above this (°C)
# - warm_factor: Multiplier for heating rate in warm weather (<1 = faster heating)
WEATHER_COMPENSATION_PRESETS = {
    "none": (None, 1.0, None, 1.0),
    "light": (5, 1.1, 15, 0.95),
    "moderate": (5, 1.2, 10, 0.9),
    "aggressive": (0, 1.4, 10, 0.8),
}

# Smart Comfort Presets - comprehensive comfort optimization
# Combines outdoor temp compensation, humidity adjustment, and preheat factors
SMART_COMFORT_PRESETS = {
    "none": {
        # Outdoor temperature compensation
        "outdoor_cold_threshold": None,  # °C - apply cold offset below this
        "outdoor_cold_offset": 0.0,  # °C - add to target when cold
        "outdoor_warm_threshold": None,  # °C - apply warm offset above this
        "outdoor_warm_offset": 0.0,  # °C - subtract from target when warm
        "outdoor_shutoff_threshold": None,  # °C - turn off heating above this
        # Humidity compensation
        "humidity_high_threshold": 70,  # % - apply high humidity offset above this
        "humidity_high_offset": 0.0,  # °C - subtract when humid
        "humidity_low_threshold": 35,  # % - apply low humidity offset below this
        "humidity_low_offset": 0.0,  # °C - add when dry
        # Preheat duration factors
        "preheat_cold_factor": 1.0,  # Multiply preheat time when cold
        "preheat_warm_factor": 1.0,  # Multiply preheat time when warm
    },
    "light": {
        "outdoor_cold_threshold": 5,
        "outdoor_cold_offset": 0.5,
        "outdoor_warm_threshold": 15,
        "outdoor_warm_offset": 0.5,
        "outdoor_shutoff_threshold": None,
        "humidity_high_threshold": 70,
        "humidity_high_offset": 0.3,
        "humidity_low_threshold": 35,
        "humidity_low_offset": 0.3,
        "preheat_cold_factor": 1.1,
        "preheat_warm_factor": 0.95,
    },
    "moderate": {
        "outdoor_cold_threshold": 5,
        "outdoor_cold_offset": 1.0,
        "outdoor_warm_threshold": 15,
        "outdoor_warm_offset": 1.0,
        "outdoor_shutoff_threshold": None,
        "humidity_high_threshold": 70,
        "humidity_high_offset": 0.5,
        "humidity_low_threshold": 35,
        "humidity_low_offset": 0.5,
        "preheat_cold_factor": 1.2,
        "preheat_warm_factor": 0.9,
    },
    "aggressive": {
        "outdoor_cold_threshold": 5,
        "outdoor_cold_offset": 1.5,
        "outdoor_warm_threshold": 15,
        "outdoor_warm_offset": 1.5,
        "outdoor_shutoff_threshold": 18,  # Turn off heating when outdoor > 18°C
        "humidity_high_threshold": 70,
        "humidity_high_offset": 0.5,
        "humidity_low_threshold": 35,
        "humidity_low_offset": 0.5,
        "preheat_cold_factor": 1.4,
        "preheat_warm_factor": 0.8,
    },
}

# Adaptive Smart Polling Constants
# MIN_POLLING_INTERVAL is for adaptive calculation floor (sensible default)
# Custom intervals can go as low as 1 minute when user explicitly sets them
MIN_POLLING_INTERVAL = 5  # minutes (adaptive floor - prevents excessive polling by default)
DEFAULT_DAY_INTERVAL = 30  # minutes (default day polling interval)
DEFAULT_NIGHT_INTERVAL = 120  # minutes (default night polling interval)
MIN_CUSTOM_INTERVAL = 1  # minutes (custom interval floor - allows 1-min for high-quota users)
MAX_POLLING_INTERVAL = 120  # minutes (ensure reasonable updates even with low quota)
MAX_CUSTOM_INTERVAL = 1440  # minutes (24 hours — maximum custom polling interval)
POLLING_SAFETY_BUFFER = 0.90  # Reserve 10% quota for manual calls and unexpected usage

# Quota Reserve Protection Constants
# When remaining quota falls below threshold, pause polling to reserve for manual operations
QUOTA_RESERVE_CALLS = 5  # Minimum reserved calls (absolute floor) - pause polling
QUOTA_RESERVE_PERCENT = 0.05  # Reserve 5% of daily limit (whichever is larger)

# Bootstrap Reserve - absolute minimum calls that are NEVER used
# These are reserved for auto-recovery after API reset (detecting reset, initial sync)
# Even manual actions are blocked when remaining <= QUOTA_BOOTSTRAP_CALLS
QUOTA_BOOTSTRAP_CALLS = 3  # Hard limit - never use these calls

# Low Quota Threshold for Smart Day/Night
# Users with remaining <= this threshold get special handling to ensure 24h coverage
# Smart Day/Night: Night uses MAX_POLLING_INTERVAL, Day uses remaining quota
LOW_QUOTA_THRESHOLD = 100  # Trigger Smart Day/Night for low-quota users

# Canonical window type to U-value mapping (W/m²K). Single source of truth for all
# mold risk calculations. Previously duplicated as WINDOW_TYPE_U_VALUES (now removed).
WINDOW_U_VALUES = {
    "single_pane": 5.0,  # Single glazing (old buildings)
    "double_pane": 2.7,  # Double glazing (most common, default)
    "triple_pane": 1.0,  # Triple glazing (modern buildings)
    "passive_house": 0.8,  # Passive house standard (high performance)
}
DEFAULT_WINDOW_TYPE = "double_pane"
INTERIOR_SURFACE_HEAT_TRANSFER_COEFFICIENT = 8.0  # W/m²K (standard value for indoor surfaces)


# =============================================================================
# Per-Zone Configuration Constants
# =============================================================================

# Overlay mode values (UPPERCASE - matches Tado API)
OVERLAY_MODE_TADO_MODE = "TADO_MODE"
OVERLAY_MODE_NEXT_TIME_BLOCK = "NEXT_TIME_BLOCK"
OVERLAY_MODE_TIMER = "TIMER"
OVERLAY_MODE_MANUAL = "MANUAL"

# Overlay mode default
OVERLAY_MODE_DEFAULT = OVERLAY_MODE_TADO_MODE
OVERLAY_MODE_DEFAULT_DISPLAY = "Tado Default"

# Overlay mode display names
OVERLAY_MODE_OPTIONS = ["Tado Default", "Next Time Block", "Timer", "Manual"]
OVERLAY_MODE_MAP = {
    "Tado Default": OVERLAY_MODE_TADO_MODE,
    "Next Time Block": OVERLAY_MODE_NEXT_TIME_BLOCK,
    "Timer": OVERLAY_MODE_TIMER,
    "Manual": OVERLAY_MODE_MANUAL,
}
OVERLAY_MODE_REVERSE_MAP = {v: k for k, v in OVERLAY_MODE_MAP.items()}

# Timer duration default
TIMER_DURATION_DEFAULT = 60

# Default per-zone configuration values
DEFAULT_ZONE_CONFIG = {
    "heating_type": "radiator",  # radiator or ufh (Heating only)
    "ufh_buffer_minutes": 30,  # 0-60 minutes (Heating only, when UFH)
    "adaptive_preheat": "off",  # off / active / passive (Heating + AC)
    "smart_comfort_mode": "none",  # none/light/moderate/aggressive (Heating + AC)
    "window_type": "double_pane",  # single_pane/double_pane/triple_pane/passive_house (Heating + AC)
    "window_predicted_mode": "auto",  # active/passive/auto (Heating + AC)
    "window_predicted_sensitivity": "medium",  # low/medium/high (Heating + AC)
    "external_temp_sensor": "",  # HA entity_id for external temperature sensor (Heating + AC)
    "external_humidity_sensor": "",  # HA entity_id for external humidity sensor (Heating + AC)
    "overlay_mode": OVERLAY_MODE_DEFAULT,
    "timer_duration": TIMER_DURATION_DEFAULT,  # 15-180 minutes (Heating + AC, when Timer)
    "min_temp": 5.0,  # 5-25°C (Heating + AC)
    "max_temp": 25.0,  # 15-30°C (Heating + AC)
    "temp_offset": 0.0,  # -3.0 to +3.0°C (Heating + AC)
    "surface_temp_offset": 0.0,  # -5.0 to +5.0°C offset for mold risk calculation
}

# Surface temperature offset limits (for mold risk calibration)
SURFACE_TEMP_OFFSET_MIN = -5.0
SURFACE_TEMP_OFFSET_MAX = 5.0
SURFACE_TEMP_OFFSET_STEP = 0.1

# Heating type values
HEATING_TYPE_RADIATOR = "radiator"
HEATING_TYPE_OPTIONS = ["Radiator", "UFH"]

# Smart comfort mode options (for per-zone select)
SMART_COMFORT_MODE_OPTIONS = ["None", "Light", "Moderate", "Aggressive"]

# Condensation risk thresholds (dew point in °C)
CONDENSATION_RISK_NONE_THRESHOLD = 13.0  # Below this = None
CONDENSATION_RISK_LOW_THRESHOLD = 15.5  # Below this = Low
CONDENSATION_RISK_MODERATE_THRESHOLD = 18.0  # Below this = Moderate, above = High

# Open window mode defaults
OPEN_WINDOW_DEFAULT_TEMP = 5.0  # Frost protection temperature (°C)
OPEN_WINDOW_DEFAULT_TIMEOUT = 900  # 15 minutes in seconds (Tado default)

# Timer duration limits
TIMER_DURATION_MIN = 15

# Timer duration options (for per-zone select)
TIMER_DURATION_OPTIONS = ["15", "30", "45", "60", "90", "120", "180"]

# Window type options (for per-zone select)
WINDOW_TYPE_MAP = {
    "Single Pane": "single_pane",
    "Double Pane": "double_pane",
    "Triple Pane": "triple_pane",
    "Passive House": "passive_house",
}
WINDOW_TYPE_REVERSE_MAP = {v: k for k, v in WINDOW_TYPE_MAP.items()}

# Window predicted sensitivity options (for per-zone select)
WINDOW_SENSITIVITY_OPTIONS = ["Low", "Medium", "High"]
WINDOW_SENSITIVITY_MAP = {"Low": "low", "Medium": "medium", "High": "high"}
WINDOW_SENSITIVITY_REVERSE_MAP = {v: k for k, v in WINDOW_SENSITIVITY_MAP.items()}
WINDOW_SENSITIVITY_DEFAULT = "medium"

# Window detection mode options (for per-zone select)
WINDOW_DETECTION_MODE_OPTIONS = ["active", "passive", "auto"]
WINDOW_DETECTION_MODE_MAP = {
    "active": "active",
    "passive": "passive",
    "auto": "auto",
}
WINDOW_DETECTION_MODE_REVERSE_MAP = {v: k for k, v in WINDOW_DETECTION_MODE_MAP.items()}
WINDOW_DETECTION_MODE_DEFAULT = "auto"

# Temperature offset limits (per-zone)
TEMP_OFFSET_MIN = -3.0
TEMP_OFFSET_MAX = 3.0
TEMP_OFFSET_STEP = 0.5

# =============================================================================
# API Write Optimization Constants
# =============================================================================

# Smart Actions — zone-level debounce
SMART_ACTIONS_DEBOUNCE_DEFAULT = 3  # seconds
SMART_ACTIONS_DEBOUNCE_MIN = 0  # 0 = disabled
SMART_ACTIONS_DEBOUNCE_MAX = 10  # seconds

# Device Sync — sequential device operations
DEVICE_SYNC_DELAY_DEFAULT = 1.0  # seconds
DEVICE_SYNC_DELAY_MIN = 0.5  # seconds
DEVICE_SYNC_DELAY_MAX = 5.0  # seconds
DEVICE_SYNC_QUEUE_MAX_DEPTH = 20

# =============================================================================
# Retry / Transient Error Constants
# =============================================================================

MAX_RETRY_ATTEMPTS: Final = 3
RETRY_BASE_DELAY: Final = 2  # seconds — exponential: 2s, 4s, 8s
MAX_RETRY_DELAY: Final = 30  # seconds — cap to prevent runaway delays

# =============================================================================
# Rate Limit Retry-After Constants (UpdateFailed(retry_after=N))
# =============================================================================

_RATE_LIMIT_MIN_S: Final = 10      # minimum wait (seconds)
_RATE_LIMIT_MAX_S: Final = 300     # maximum wait (5 minutes)
_RATE_LIMIT_DEFAULT_S: Final = 60  # default when no signal available

