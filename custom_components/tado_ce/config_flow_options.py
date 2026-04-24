"""Tado CE options flow — menu-based configuration UI."""

from __future__ import annotations

import logging
from typing import TYPE_CHECKING, Any

from homeassistant import config_entries, data_entry_flow
from homeassistant.helpers.aiohttp_client import async_get_clientsession
from homeassistant.helpers.selector import (
    BooleanSelector,
    EntitySelector,
    EntitySelectorConfig,
    NumberSelector,
    NumberSelectorConfig,
    NumberSelectorMode,
    SelectSelector,
    SelectSelectorConfig,
    SelectSelectorMode,
    TextSelector,
    TextSelectorConfig,
    TextSelectorType,
)
import voluptuous as vol

from .const import (
    HEATING_TYPE_OPTIONS,
    HEATING_TYPE_RADIATOR,
    MAX_CUSTOM_INTERVAL,
    OVERLAY_MODE_DEFAULT,
    OVERLAY_MODE_MAP,
    OVERLAY_MODE_OPTIONS,
    OVERLAY_MODE_REVERSE_MAP,
    SMART_COMFORT_MODE_OPTIONS,
    SURFACE_TEMP_OFFSET_MAX,
    SURFACE_TEMP_OFFSET_MIN,
    SURFACE_TEMP_OFFSET_STEP,
    TIMER_DURATION_DEFAULT,
    TIMER_DURATION_OPTIONS,
    WINDOW_DETECTION_MODE_DEFAULT,
    WINDOW_DETECTION_MODE_MAP,
    WINDOW_DETECTION_MODE_OPTIONS,
    WINDOW_DETECTION_MODE_REVERSE_MAP,
    WINDOW_SENSITIVITY_DEFAULT,
    WINDOW_SENSITIVITY_MAP,
    WINDOW_SENSITIVITY_OPTIONS,
    WINDOW_SENSITIVITY_REVERSE_MAP,
)

if TYPE_CHECKING:
    from homeassistant.config_entries import ConfigEntry, ConfigFlowResult

_LOGGER = logging.getLogger(__name__)

# All feature toggle keys (used by reset "everything")
_ALL_TOGGLE_KEYS = (
    "smart_comfort_enabled",
    "thermal_analytics_enabled",
    "adaptive_preheat_enabled",
    "schedule_calendar_enabled",
    "wc_enabled",
    "homekit_enabled",
    "weather_enabled",
    "home_state_sync_enabled",
    "mobile_devices_enabled",
    "offset_enabled",
    "zone_configuration_enabled",
)

# Per-scope default values for Reset to Defaults
RESET_DEFAULTS: dict[str, dict[str, Any]] = {
    "smart_comfort": {
        "smart_comfort_mode": "none",
        "use_feels_like": False,
        "mold_risk_window_type": "double_pane",
        "smart_comfort_history_days": 7,
        "outdoor_temp_entity": "",
        "hot_water_timer_duration": 60,
    },
    "thermal_analytics": {
        "thermal_analytics_zones": [],
        "heating_cycle_history_days": 7,
        "heating_cycle_min_cycles": 3,
        "heating_cycle_inertia_threshold": 0.1,
    },
    "weather_compensation": {
        "wc_heating_system_preset": "radiators_standard",
        "wc_slope": 1.5,
        "wc_design_outdoor_temp": -5.0,
        "wc_max_flow_temp": 65.0,
        "wc_min_flow_temp": 25.0,
        "wc_shutoff_temp": 18.0,
        "wc_smoothing_method": "ema",
        "wc_smoothing_window": 60,
        "wc_room_compensation_enabled": False,
        "wc_room_compensation_factor": 3.0,
        "wc_step_size": 1.0,
        "wc_hysteresis": 1.0,
    },
    "bridge": {
        "bridge_serial": "",
        "bridge_auth_key": "",
    },
    "mobile_tracking": {
        "mobile_devices_frequent_sync": False,
    },
    "polling_api": {
        "day_start_hour": 7,
        "night_start_hour": 23,
        "custom_day_interval": None,
        "custom_night_interval": None,
        "refresh_debounce_seconds": 15,
        "api_history_retention_days": 14,
        "smart_actions_debounce_seconds": 3,
        "device_sync_delay_seconds": 1.0,
    },
}

# Reset scope options (features with tuning parameters)
_RESET_SCOPE_OPTIONS = [
    "everything",
    "smart_comfort",
    "thermal_analytics",
    "weather_compensation",
    "bridge",
    "mobile_tracking",
    "polling_api",
]


class TadoCEOptionsFlow(config_entries.OptionsFlow):
    """Handle options flow for Tado CE with menu-based navigation.

    Menu options:
    - Global Settings: 4 collapsed sections (CE Exclusive, Tado Data, Settings, Polling & API)
    - Zone Sensor Config: Per-zone external sensor picker with EntitySelector

    CORE features (always ON, not in UI):
    - Zone Diagnostics, Device Controls, Boost Buttons, Environment Sensors

    Removed (Per-Zone handles these):
    - ufh_buffer_minutes, ufh_zones, adaptive_preheat_zones
    """

    def __init__(self, config_entry: ConfigEntry) -> None:
        """Initialize options flow."""
        super().__init__()
        self._selected_zone_id: str | None = None
        self._pending_general_options: dict[str, Any] = {}
        self._reset_scope: str = "everything"

    async def async_step_init(
        self, user_input: dict[str, Any] | None = None,
    ) -> ConfigFlowResult:
        """Show navigation menu for options."""
        menu_options = ["general_settings", "advanced_settings"]
        if self.config_entry.options.get("zone_configuration_enabled", False):
            menu_options.append("zone_config")
        menu_options.append("reset_to_defaults")
        return self.async_show_menu(
            step_id="init",
            menu_options=menu_options,
        )

    def _build_general_schema(self) -> vol.Schema:
        """Build the General Settings form schema — toggles only.

        12 BooleanSelector fields grouped in 4 sections:
        Smart Features, Connections, Data Sources, Per-Zone.
        """
        opt = self.config_entry.options.get
        return vol.Schema(
            {
                # === Smart Features ===
                vol.Required("smart_features"): data_entry_flow.section(
                    vol.Schema(
                        {
                            vol.Optional(
                                "smart_comfort_enabled",
                                default=opt("smart_comfort_enabled", False),
                            ): BooleanSelector(),
                            vol.Optional(
                                "thermal_analytics_enabled",
                                default=opt("thermal_analytics_enabled", False),
                            ): BooleanSelector(),
                            vol.Optional(
                                "adaptive_preheat_enabled",
                                default=opt("adaptive_preheat_enabled", False),
                            ): BooleanSelector(),
                            vol.Optional(
                                "schedule_calendar_enabled",
                                default=opt("schedule_calendar_enabled", False),
                            ): BooleanSelector(),
                        },
                    ),
                    {"collapsed": False},
                ),
                # === Connections ===
                vol.Required("connections"): data_entry_flow.section(
                    vol.Schema(
                        {
                            vol.Optional(
                                "bridge_enabled",
                                default=bool(opt("bridge_serial", ""))
                                and bool(opt("bridge_auth_key", "")),
                            ): BooleanSelector(),
                            vol.Optional(
                                "wc_enabled",
                                default=opt("wc_enabled", False),
                            ): BooleanSelector(),
                            vol.Optional(
                                "homekit_enabled",
                                default=opt("homekit_enabled", False),
                            ): BooleanSelector(),
                        },
                    ),
                    {"collapsed": False},
                ),
                # === Data Sources ===
                vol.Required("data_sources"): data_entry_flow.section(
                    vol.Schema(
                        {
                            vol.Optional(
                                "weather_enabled",
                                default=opt("weather_enabled", False),
                            ): BooleanSelector(),
                            vol.Optional(
                                "home_state_sync_enabled",
                                default=opt("home_state_sync_enabled", False),
                            ): BooleanSelector(),
                            vol.Optional(
                                "mobile_devices_enabled",
                                default=opt("mobile_devices_enabled", False),
                            ): BooleanSelector(),
                            vol.Optional(
                                "offset_enabled",
                                default=opt("offset_enabled", False),
                            ): BooleanSelector(),
                        },
                    ),
                    {"collapsed": False},
                ),
                # === Per-Zone ===
                vol.Required("per_zone"): data_entry_flow.section(
                    vol.Schema(
                        {
                            vol.Optional(
                                "zone_configuration_enabled",
                                default=opt("zone_configuration_enabled", False),
                            ): BooleanSelector(),
                        },
                    ),
                    {"collapsed": False},
                ),
            },
        )

    def _build_advanced_schema(
        self,
        zones_with_heating_power: list[dict[str, str]],
    ) -> vol.Schema:
        """Build the Advanced Settings form schema — conditional tuning only.

        Only includes sections for features currently enabled in General Settings.
        Polling & API section is always visible.
        """
        options = self.config_entry.options
        opt = options.get
        sections: dict[vol.Required, Any] = {}

        # --- Smart Comfort (if enabled) ---
        if opt("smart_comfort_enabled", False):
            smart_comfort_default = opt("smart_comfort_mode", opt("weather_compensation", "none"))
            sections[vol.Required("smart_comfort")] = data_entry_flow.section(
                vol.Schema(
                    {
                        vol.Optional(
                            "use_outdoor_temp_entity",
                            default=bool(opt("outdoor_temp_entity", "")),
                        ): BooleanSelector(),
                        vol.Optional(
                            "outdoor_temp_entity",
                            description={"suggested_value": opt("outdoor_temp_entity", "")}
                            if opt("outdoor_temp_entity", "") else None,
                        ): EntitySelector(EntitySelectorConfig(domain=["sensor", "weather"])),
                        vol.Optional(
                            "hot_water_timer_duration",
                            default=opt("hot_water_timer_duration", 60),
                        ): NumberSelector(NumberSelectorConfig(min=1, max=1440, step=1, mode=NumberSelectorMode.BOX, unit_of_measurement="min")),
                        vol.Optional(
                            "smart_comfort_mode",
                            default=smart_comfort_default,
                        ): SelectSelector(SelectSelectorConfig(options=["none", "light", "moderate", "aggressive"], translation_key="smart_comfort_mode", mode=SelectSelectorMode.DROPDOWN)),
                        vol.Optional("use_feels_like", default=opt("use_feels_like", False)): BooleanSelector(),
                        vol.Optional(
                            "mold_risk_window_type",
                            default=opt("mold_risk_window_type", "double_pane"),
                        ): SelectSelector(SelectSelectorConfig(options=["single_pane", "double_pane", "triple_pane", "passive_house"], translation_key="mold_risk_window_type", mode=SelectSelectorMode.DROPDOWN)),
                        vol.Optional("smart_comfort_history_days", default=opt("smart_comfort_history_days", 7)): NumberSelector(NumberSelectorConfig(min=1, max=30, step=1, mode=NumberSelectorMode.BOX, unit_of_measurement="d")),
                    },
                ),
                {"collapsed": True},
            )

        # --- Thermal Analytics (if enabled) ---
        if opt("thermal_analytics_enabled", False):
            current_thermal_zones = options.get("thermal_analytics_zones", [])
            if not current_thermal_zones and zones_with_heating_power:
                current_thermal_zones = [z["value"] for z in zones_with_heating_power]
            sections[vol.Required("thermal_analytics")] = data_entry_flow.section(
                vol.Schema(
                    {
                        vol.Optional("thermal_analytics_zones", default=current_thermal_zones): SelectSelector(
                            SelectSelectorConfig(options=zones_with_heating_power or [], multiple=True, mode=SelectSelectorMode.DROPDOWN),  # type: ignore[typeddict-item]
                        ),
                        vol.Optional("heating_cycle_history_days", default=opt("heating_cycle_history_days", 7)): NumberSelector(NumberSelectorConfig(min=1, max=30, step=1, mode=NumberSelectorMode.BOX, unit_of_measurement="d")),
                        vol.Optional("heating_cycle_min_cycles", default=opt("heating_cycle_min_cycles", 3)): NumberSelector(NumberSelectorConfig(min=1, max=10, step=1, mode=NumberSelectorMode.BOX)),
                        vol.Optional("heating_cycle_inertia_threshold", default=opt("heating_cycle_inertia_threshold", 0.1)): NumberSelector(NumberSelectorConfig(min=0.05, max=0.5, step=0.05, mode=NumberSelectorMode.BOX, unit_of_measurement="°C")),
                    },
                ),
                {"collapsed": True},
            )

        # --- Weather Compensation (if enabled) ---
        if opt("wc_enabled", False):
            sections[vol.Required("flow_temperature_control")] = data_entry_flow.section(
                vol.Schema(
                    {
                        vol.Optional("bridge_serial", description={"suggested_value": opt("bridge_serial", "")}): TextSelector(TextSelectorConfig(type=TextSelectorType.TEXT)),
                        vol.Optional("bridge_auth_key", description={"suggested_value": opt("bridge_auth_key", "")}): TextSelector(TextSelectorConfig(type=TextSelectorType.PASSWORD)),
                        vol.Optional("wc_heating_system_preset", default=opt("wc_heating_system_preset", "radiators_standard")): SelectSelector(SelectSelectorConfig(options=["radiators_standard", "radiators_low_temp", "underfloor", "custom"], translation_key="wc_heating_system_preset", mode=SelectSelectorMode.DROPDOWN)),
                        vol.Optional("wc_slope", default=opt("wc_slope", 1.5)): NumberSelector(NumberSelectorConfig(min=0.3, max=3.0, step=0.1, mode=NumberSelectorMode.BOX)),
                        vol.Optional("wc_design_outdoor_temp", default=opt("wc_design_outdoor_temp", -5.0)): NumberSelector(NumberSelectorConfig(min=-30, max=10, step=1, mode=NumberSelectorMode.BOX, unit_of_measurement="°C")),
                        vol.Optional("wc_max_flow_temp", default=opt("wc_max_flow_temp", 65.0)): NumberSelector(NumberSelectorConfig(min=25, max=80, step=0.5, mode=NumberSelectorMode.BOX, unit_of_measurement="°C")),
                        vol.Optional("wc_min_flow_temp", default=opt("wc_min_flow_temp", 25.0)): NumberSelector(NumberSelectorConfig(min=25, max=60, step=0.5, mode=NumberSelectorMode.BOX, unit_of_measurement="°C")),
                        vol.Optional("wc_shutoff_temp", default=opt("wc_shutoff_temp", 18.0)): NumberSelector(NumberSelectorConfig(min=5, max=30, step=1, mode=NumberSelectorMode.BOX, unit_of_measurement="°C")),
                        vol.Optional("wc_smoothing_method", default=opt("wc_smoothing_method", "ema")): SelectSelector(SelectSelectorConfig(options=["none", "ema", "rolling_average"], translation_key="wc_smoothing_method", mode=SelectSelectorMode.DROPDOWN)),
                        vol.Optional("wc_smoothing_window", default=opt("wc_smoothing_window", 60)): NumberSelector(NumberSelectorConfig(min=15, max=1440, step=15, mode=NumberSelectorMode.BOX, unit_of_measurement="min")),
                        vol.Optional("wc_room_compensation_enabled", default=opt("wc_room_compensation_enabled", False)): BooleanSelector(),
                        vol.Optional("wc_room_compensation_factor", default=opt("wc_room_compensation_factor", 3.0)): NumberSelector(NumberSelectorConfig(min=1.0, max=5.0, step=0.5, mode=NumberSelectorMode.BOX, unit_of_measurement="°C/°C")),
                        vol.Optional("wc_step_size", default=opt("wc_step_size", 1.0)): NumberSelector(NumberSelectorConfig(min=0.5, max=2.0, step=0.5, mode=NumberSelectorMode.BOX, unit_of_measurement="°C")),
                        vol.Optional("wc_hysteresis", default=opt("wc_hysteresis", 1.0)): NumberSelector(NumberSelectorConfig(min=0.5, max=3.0, step=0.5, mode=NumberSelectorMode.BOX, unit_of_measurement="°C")),
                    },
                ),
                {"collapsed": True},
            )

        # --- Internet Bridge (if credentials exist) ---
        elif bool(opt("bridge_serial", "")) and bool(opt("bridge_auth_key", "")):
            sections[vol.Required("flow_temperature_control")] = data_entry_flow.section(
                vol.Schema(
                    {
                        vol.Optional("bridge_serial", description={"suggested_value": opt("bridge_serial", "")}): TextSelector(TextSelectorConfig(type=TextSelectorType.TEXT)),
                        vol.Optional("bridge_auth_key", description={"suggested_value": opt("bridge_auth_key", "")}): TextSelector(TextSelectorConfig(type=TextSelectorType.PASSWORD)),
                    },
                ),
                {"collapsed": True},
            )

        # --- Mobile Device Tracking (if enabled) ---
        if opt("mobile_devices_enabled", False):
            sections[vol.Required("mobile_tracking")] = data_entry_flow.section(
                vol.Schema(
                    {
                        vol.Optional("mobile_devices_frequent_sync", default=opt("mobile_devices_frequent_sync", False)): BooleanSelector(),
                    },
                ),
                {"collapsed": True},
            )

        # --- Polling & API (always visible) ---
        custom_day_interval = options.get("custom_day_interval")
        custom_night_interval = options.get("custom_night_interval")
        custom_day_schema = vol.Optional("custom_day_interval", description={"suggested_value": custom_day_interval}) if custom_day_interval is not None else vol.Optional("custom_day_interval")
        custom_night_schema = vol.Optional("custom_night_interval", description={"suggested_value": custom_night_interval}) if custom_night_interval is not None else vol.Optional("custom_night_interval")

        sections[vol.Required("polling_api")] = data_entry_flow.section(
            vol.Schema(
                {
                    vol.Required("day_start_hour", default=opt("day_start_hour", 7)): NumberSelector(NumberSelectorConfig(min=0, max=23, step=1, mode=NumberSelectorMode.BOX)),
                    vol.Required("night_start_hour", default=opt("night_start_hour", 23)): NumberSelector(NumberSelectorConfig(min=0, max=23, step=1, mode=NumberSelectorMode.BOX)),
                    custom_day_schema: NumberSelector(NumberSelectorConfig(min=1, max=1440, step=1, mode=NumberSelectorMode.BOX, unit_of_measurement="min")),
                    custom_night_schema: NumberSelector(NumberSelectorConfig(min=1, max=1440, step=1, mode=NumberSelectorMode.BOX, unit_of_measurement="min")),
                    vol.Optional("refresh_debounce_seconds", default=opt("refresh_debounce_seconds", 15)): NumberSelector(NumberSelectorConfig(min=1, max=60, step=1, mode=NumberSelectorMode.BOX, unit_of_measurement="s")),
                    vol.Optional("api_history_retention_days", default=opt("api_history_retention_days", 14)): NumberSelector(NumberSelectorConfig(min=0, max=365, step=1, mode=NumberSelectorMode.BOX, unit_of_measurement="d")),
                    vol.Optional("smart_actions_debounce_seconds", default=opt("smart_actions_debounce_seconds", 3)): NumberSelector(NumberSelectorConfig(min=0, max=10, step=1, mode=NumberSelectorMode.BOX, unit_of_measurement="s")),
                    vol.Optional("device_sync_delay_seconds", default=opt("device_sync_delay_seconds", 1.0)): NumberSelector(NumberSelectorConfig(min=0.5, max=5.0, step=0.5, mode=NumberSelectorMode.BOX, unit_of_measurement="s")),
                },
            ),
            {"collapsed": True},
        )

        return vol.Schema(sections)

    def _process_general_settings(
        self,
        user_input: dict[str, Any],
        processed: dict[str, Any],
    ) -> None:
        """Flatten General Settings section dicts to top-level toggle keys."""
        for section_key in ("smart_features", "connections", "data_sources", "per_zone"):
            section = user_input.get(section_key, {})
            for key, value in section.items():
                processed[key] = value
        # Preserve all existing tuning values from current options
        for key, value in self.config_entry.options.items():
            if key not in processed:
                processed[key] = value

    def _detect_first_enable(self, new_options: dict[str, Any]) -> str | None:
        """Detect if a feature was just enabled for the first time.

        Returns the step_id to redirect to, or None if no sub-flow needed.
        """
        prev = self.config_entry.options

        # Bridge: first enable AND no credentials stored
        if new_options.get("bridge_enabled") and not prev.get("bridge_serial"):
            return "bridge_setup"

        # HomeKit: first enable AND no pairing stored
        if new_options.get("homekit_enabled") and not prev.get("homekit_enabled"):
            from .const import get_data_file

            pairing_path = get_data_file(
                "homekit_pairing",
                self.config_entry.data.get("home_id"),
            )
            try:
                if not pairing_path.exists():
                    return "homekit_pairing"
            except OSError:
                return "homekit_pairing"

        # WC: first enable AND bridge not enabled
        if (
            new_options.get("wc_enabled")
            and not prev.get("wc_enabled")
            and not new_options.get("bridge_enabled")
            and not prev.get("bridge_serial")
        ):
            return "wc_bridge_prompt"

        return None

    async def async_step_general_settings(
        self, user_input: dict[str, Any] | None = None,
    ) -> ConfigFlowResult:
        """Handle General Settings — feature toggles only."""
        errors: dict[str, str] = {}

        if user_input is not None:
            processed_input: dict[str, Any] = {}
            self._process_general_settings(user_input, processed_input)

            if not errors:
                # Check for first-enable sub-flows
                redirect = self._detect_first_enable(processed_input)
                if redirect:
                    self._pending_general_options = processed_input
                    return await getattr(self, f"async_step_{redirect}")()

                prev_options = self.config_entry.options

                from .entity_cleanup import detect_cleanup_flags

                cleanup_flags = detect_cleanup_flags(dict(prev_options), processed_input)

                if cleanup_flags:
                    coordinator = self.config_entry.runtime_data
                    coordinator._pending_cleanup[self.config_entry.entry_id] = cleanup_flags

                return self.async_create_entry(title="", data=processed_input)

        schema = self._build_general_schema()
        return self.async_show_form(
            step_id="general_settings",
            data_schema=schema,
            errors=errors,
        )

    def _process_advanced_settings_input(
        self, user_input: dict[str, Any], errors: dict[str, str],
    ) -> dict[str, Any]:
        """Process advanced settings form input into flat key-value pairs."""
        processed_input: dict[str, Any] = {}

        self._process_smart_comfort(user_input, processed_input)
        self._process_polling_api(user_input, processed_input, errors)

        # Flatten thermal_analytics section
        if "thermal_analytics" in user_input:
            section = user_input["thermal_analytics"]
            for key in (
                "thermal_analytics_zones",
                "heating_cycle_history_days",
                "heating_cycle_min_cycles",
                "heating_cycle_inertia_threshold",
            ):
                if key in section:
                    processed_input[key] = section[key]

        # Flatten mobile_tracking section
        if "mobile_tracking" in user_input:
            section = user_input["mobile_tracking"]
            if "mobile_devices_frequent_sync" in section:
                processed_input["mobile_devices_frequent_sync"] = section["mobile_devices_frequent_sync"]

        return processed_input

    async def async_step_advanced_settings(
        self, user_input: dict[str, Any] | None = None,
    ) -> ConfigFlowResult:
        """Handle Advanced Settings — tuning parameters for enabled features."""
        errors: dict[str, str] = {}
        opt = self.config_entry.options.get

        # Check if any feature with tuning params is enabled
        has_tunable = any([
            opt("smart_comfort_enabled", False),
            opt("thermal_analytics_enabled", False),
            opt("wc_enabled", False),
            bool(opt("bridge_serial", "")) and bool(opt("bridge_auth_key", "")),
            opt("mobile_devices_enabled", False),
        ])

        if user_input is not None:
            processed_input = self._process_advanced_settings_input(user_input, errors)
            await self._process_flow_temperature_control(user_input, processed_input, errors)

            if not errors:
                # Preserve toggle states from current options
                for key, value in self.config_entry.options.items():
                    if key not in processed_input:
                        processed_input[key] = value

                return self.async_create_entry(title="", data=processed_input)

        if not has_tunable:
            return self.async_show_form(
                step_id="advanced_settings",
                data_schema=vol.Schema({}),
            )

        zones_with_heating_power = await self._load_zones_with_heating_power()
        schema = self._build_advanced_schema(zones_with_heating_power)
        return self.async_show_form(
            step_id="advanced_settings",
            data_schema=schema,
            errors=errors,
        )

    async def async_step_bridge_setup(
        self, user_input: dict[str, Any] | None = None,
    ) -> ConfigFlowResult:
        """Handle one-time bridge credential input on first enable."""
        errors: dict[str, str] = {}

        if user_input is not None:
            bridge_serial = (user_input.get("bridge_serial") or "").strip()
            bridge_auth_key = (user_input.get("bridge_auth_key") or "").strip()

            if not bridge_serial or not bridge_auth_key:
                errors["base"] = "bridge_credentials_required"
            elif not bridge_serial.upper().startswith("IB"):
                errors["base"] = "bridge_serial_invalid"
            else:
                from .bridge_api import TadoBridgeApiClient

                session = async_get_clientsession(self.hass)
                bridge_client = TadoBridgeApiClient(session, bridge_serial, bridge_auth_key)
                if not await bridge_client.async_validate_credentials():
                    errors["base"] = "bridge_auth_failed"

            if not errors:
                self._pending_general_options["bridge_serial"] = bridge_serial
                self._pending_general_options["bridge_auth_key"] = bridge_auth_key
                return self.async_create_entry(title="", data=self._pending_general_options)

        return self.async_show_form(
            step_id="bridge_setup",
            data_schema=vol.Schema(
                {
                    vol.Required("bridge_serial"): TextSelector(
                        TextSelectorConfig(type=TextSelectorType.TEXT),
                    ),
                    vol.Required("bridge_auth_key"): TextSelector(
                        TextSelectorConfig(type=TextSelectorType.PASSWORD),
                    ),
                },
            ),
            errors=errors,
        )

    async def async_step_homekit_pairing(
        self, user_input: dict[str, Any] | None = None,
    ) -> ConfigFlowResult:
        """Handle HomeKit PIN input — placeholder for HomeKit spec.

        Will be implemented by the HomeKit Local Control spec.
        For now, saves pending options without pairing.
        """
        if self._pending_general_options:
            return self.async_create_entry(title="", data=self._pending_general_options)
        return await self.async_step_init()

    async def async_step_wc_bridge_prompt(
        self, user_input: dict[str, Any] | None = None,
    ) -> ConfigFlowResult:
        """Prompt to also enable bridge when WC enabled without bridge."""
        if user_input is not None:
            if user_input.get("also_enable_bridge", False):
                self._pending_general_options["bridge_enabled"] = True
                return await self.async_step_bridge_setup()
            # Continue without bridge
            return self.async_create_entry(title="", data=self._pending_general_options)

        return self.async_show_form(
            step_id="wc_bridge_prompt",
            data_schema=vol.Schema(
                {
                    vol.Optional("also_enable_bridge", default=False): BooleanSelector(),
                },
            ),
        )

    def _apply_reset(self, scope: str) -> dict[str, Any]:
        """Apply reset defaults for the given scope.

        Returns new options dict with defaults applied.
        """
        current = dict(self.config_entry.options)
        if scope == "everything":
            for toggle in _ALL_TOGGLE_KEYS:
                current[toggle] = False
            for defaults in RESET_DEFAULTS.values():
                current.update(defaults)
            # Preserve bridge credentials (AC-4.4)
            prev_serial = self.config_entry.options.get("bridge_serial", "")
            prev_auth = self.config_entry.options.get("bridge_auth_key", "")
            if prev_serial:
                current["bridge_serial"] = prev_serial
            if prev_auth:
                current["bridge_auth_key"] = prev_auth
        elif scope in RESET_DEFAULTS:
            current.update(RESET_DEFAULTS[scope])
        return current

    async def async_step_reset_to_defaults(
        self, user_input: dict[str, Any] | None = None,
    ) -> ConfigFlowResult:
        """Handle Reset to Defaults — scope selection."""
        if user_input is not None:
            self._reset_scope = user_input.get("reset_scope", "everything")
            return await self.async_step_reset_confirm()

        return self.async_show_form(
            step_id="reset_to_defaults",
            data_schema=vol.Schema(
                {
                    vol.Required("reset_scope", default="everything"): SelectSelector(
                        SelectSelectorConfig(
                            options=_RESET_SCOPE_OPTIONS,
                            translation_key="reset_scope",
                            mode=SelectSelectorMode.LIST,
                        ),
                    ),
                },
            ),
        )

    async def async_step_reset_confirm(
        self, user_input: dict[str, Any] | None = None,
    ) -> ConfigFlowResult:
        """Handle Reset confirmation step."""
        if user_input is not None:
            reset_options = self._apply_reset(self._reset_scope)

            from .entity_cleanup import detect_cleanup_flags

            prev_options = self.config_entry.options
            cleanup_flags = detect_cleanup_flags(dict(prev_options), reset_options)
            if cleanup_flags:
                coordinator = self.config_entry.runtime_data
                coordinator._pending_cleanup[self.config_entry.entry_id] = cleanup_flags

            return self.async_create_entry(title="", data=reset_options)

        return self.async_show_form(
            step_id="reset_confirm",
            data_schema=vol.Schema({}),
        )

    def _process_smart_comfort(
        self,
        user_input: dict[str, Any],
        processed: dict[str, Any],
    ) -> None:
        """Flatten smart_comfort section inputs."""
        if "smart_comfort" not in user_input:
            return
        section = user_input["smart_comfort"]
        for key in [
            "hot_water_timer_duration",
            "smart_comfort_mode",
            "use_feels_like",
            "mold_risk_window_type",
            "smart_comfort_history_days",
            "heating_cycle_history_days",
            "heating_cycle_min_cycles",
            "heating_cycle_inertia_threshold",
        ]:
            if key in section:
                processed[key] = section[key]

        # Boolean toggle controls whether EntitySelector value is used
        if section.get("use_outdoor_temp_entity", False):
            processed["outdoor_temp_entity"] = section.get("outdoor_temp_entity", "")
        else:
            processed["outdoor_temp_entity"] = ""

    def _process_polling_api(
        self,
        user_input: dict[str, Any],
        processed: dict[str, Any],
        errors: dict[str, str],
    ) -> None:
        """Flatten polling_api section inputs and validate intervals."""
        if "polling_api" in user_input:
            section = user_input["polling_api"]
            for key in [
                "day_start_hour",
                "night_start_hour",
                "refresh_debounce_seconds",
                "api_history_retention_days",
                "smart_actions_debounce_seconds",
                "device_sync_delay_seconds",
            ]:
                if key in section:
                    processed[key] = section[key]

            # Fix persistence bug — explicitly handle custom intervals
            processed["custom_day_interval"] = section.get("custom_day_interval")
            processed["custom_night_interval"] = section.get("custom_night_interval")

        # Validate custom day interval
        day_interval = processed.get("custom_day_interval")
        if day_interval is not None and (day_interval < 1 or day_interval > MAX_CUSTOM_INTERVAL):
            errors["custom_day_interval"] = "interval_out_of_range"
            processed["custom_day_interval"] = None

        # Validate custom night interval
        night_interval = processed.get("custom_night_interval")
        if night_interval is not None and (night_interval < 1 or night_interval > MAX_CUSTOM_INTERVAL):
            errors["custom_night_interval"] = "interval_out_of_range"
            processed["custom_night_interval"] = None

    async def _process_flow_temperature_control(
        self,
        user_input: dict[str, Any],
        processed: dict[str, Any],
        errors: dict[str, str],
    ) -> None:
        """Flatten flow_temperature_control section (bridge + weather compensation)."""
        if "flow_temperature_control" not in user_input:
            return
        section = user_input["flow_temperature_control"]

        # Bridge toggle controls whether credentials are kept
        if section.get("bridge_enabled", False):
            bridge_serial = (section.get("bridge_serial") or "").strip()
            bridge_auth_key = (section.get("bridge_auth_key") or "").strip()
            processed["bridge_serial"] = bridge_serial
            processed["bridge_auth_key"] = bridge_auth_key

            # Validate credentials if both fields provided
            if bridge_serial and bridge_auth_key:
                if not bridge_serial.upper().startswith("IB"):
                    errors["flow_temperature_control"] = "bridge_serial_invalid"
                else:
                    from .bridge_api import TadoBridgeApiClient

                    session = async_get_clientsession(self.hass)
                    bridge_client = TadoBridgeApiClient(session, bridge_serial, bridge_auth_key)
                    if not await bridge_client.async_validate_credentials():
                        errors["flow_temperature_control"] = "bridge_auth_failed"
        else:
            # Toggle off — clear credentials (triggers bridge entity cleanup)
            processed["bridge_serial"] = ""
            processed["bridge_auth_key"] = ""

        # Weather compensation settings
        for key in [
            "wc_enabled",
            "wc_heating_system_preset",
            "wc_slope",
            "wc_design_outdoor_temp",
            "wc_max_flow_temp",
            "wc_min_flow_temp",
            "wc_shutoff_temp",
            "wc_smoothing_method",
            "wc_smoothing_window",
            "wc_room_compensation_enabled",
            "wc_room_compensation_factor",
            "wc_step_size",
            "wc_hysteresis",
        ]:
            if key in section:
                processed[key] = section[key]

        # Validate min_flow <= max_flow
        wc_min = processed.get("wc_min_flow_temp", 25.0)
        wc_max = processed.get("wc_max_flow_temp", 65.0)
        if wc_min > wc_max:
            errors["flow_temperature_control"] = "wc_min_exceeds_max"

    async def _load_zones_with_heating_power(self) -> list[dict[str, str]]:
        """Load zones that have heatingPower for thermal analytics multi-select."""
        coordinator = self.config_entry.runtime_data
        data_loader = coordinator.data_loader
        zones_info = await self.hass.async_add_executor_job(data_loader.load_zones_info_file)
        zones_data = await self.hass.async_add_executor_job(data_loader.load_zones_file)

        result: list[dict[str, str]] = []
        if zones_data and zones_info:
            zone_states = zones_data.get("zoneStates") or {}
            zone_names_map = {
                str(z.get("id")): z.get("name", f"Zone {z.get('id')}")
                for z in zones_info
            }
            for zone_id, zone_data in zone_states.items():
                activity_data = zone_data.get("activityDataPoints") or {}
                if activity_data.get("heatingPower") is not None:
                    zone_name = zone_names_map.get(zone_id, f"Zone {zone_id}")
                    result.append({"value": zone_id, "label": zone_name})
        return result

    async def async_step_zone_config(
        self, user_input: dict[str, Any] | None = None,
    ) -> ConfigFlowResult:
        """Show zone picker for per-zone configuration."""
        coordinator = self.config_entry.runtime_data
        data_loader = coordinator.data_loader
        zones_info = await self.hass.async_add_executor_job(data_loader.load_zones_info_file)

        if not zones_info:
            return self.async_abort(reason="no_zones")

        # Build zone options (exclude HOT_WATER — external sensors are heating/AC only)
        zone_options = [
            {"value": str(z.get("id")), "label": z.get("name", f"Zone {z.get('id')}")}
            for z in zones_info
            if z.get("type") != "HOT_WATER"
        ]

        if not zone_options:
            return self.async_abort(reason="no_zones")

        if user_input is not None:
            self._selected_zone_id = user_input["zone_id"]
            return await self.async_step_zone_sensor_config()

        return self.async_show_form(
            step_id="zone_config",
            data_schema=vol.Schema(
                {
                    vol.Required("zone_id"): SelectSelector(
                        SelectSelectorConfig(
                            options=zone_options,  # type: ignore[typeddict-item]
                            mode=SelectSelectorMode.DROPDOWN,
                        ),
                    ),
                },
            ),
        )

    def _process_zone_sensor_input(self, user_input: dict[str, Any]) -> dict[str, Any]:
        """Flatten and process zone sensor config form sections into key-value pairs."""
        all_values: dict[str, Any] = {}

        if "heating_section" in user_input:
            s = user_input["heating_section"]
            all_values["heating_type"] = s.get(
                "heating_type", HEATING_TYPE_RADIATOR,
            ).lower()
            all_values["ufh_buffer_minutes"] = int(s.get("ufh_buffer_minutes", 30))
            all_values["adaptive_preheat"] = s.get("adaptive_preheat", "off")

        if "comfort_section" in user_input:
            s = user_input["comfort_section"]
            raw_mode = s.get("smart_comfort_mode", "None")
            all_values["smart_comfort_mode"] = raw_mode.lower() if raw_mode != "None" else "none"
            all_values["window_type"] = s.get("window_type", "double_pane")
            all_values["window_predicted_mode"] = WINDOW_DETECTION_MODE_MAP.get(
                s.get("window_predicted_mode", "auto"), WINDOW_DETECTION_MODE_DEFAULT,
            )
            all_values["window_predicted_sensitivity"] = WINDOW_SENSITIVITY_MAP.get(
                s.get("window_predicted_sensitivity", "Medium"), "medium",
            )

        if "sensor_section" in user_input:
            s = user_input["sensor_section"]
            all_values["external_temp_sensor"] = (
                s.get("external_temp_sensor", "") if s.get("use_external_temp", False) else ""
            )
            all_values["external_humidity_sensor"] = (
                s.get("external_humidity_sensor", "") if s.get("use_external_humidity", False) else ""
            )

        if "overlay_section" in user_input:
            s = user_input["overlay_section"]
            all_values["overlay_mode"] = OVERLAY_MODE_MAP.get(
                s.get("overlay_mode", "Tado Default"), OVERLAY_MODE_DEFAULT,
            )
            all_values["timer_duration"] = int(s.get("timer_duration", str(TIMER_DURATION_DEFAULT)))

        if "temperature_section" in user_input:
            s = user_input["temperature_section"]
            all_values["min_temp"] = float(s.get("min_temp", 5.0))
            all_values["max_temp"] = float(s.get("max_temp", 25.0))
            all_values["temp_offset"] = float(s.get("temp_offset", 0.0))
            all_values["surface_temp_offset"] = float(s.get("surface_temp_offset", 0.0))

        return all_values

    async def async_step_zone_sensor_config(
        self, user_input: dict[str, Any] | None = None,
    ) -> ConfigFlowResult:
        """Configure all per-zone settings for a specific zone."""
        zone_id = self._selected_zone_id
        if not zone_id:
            return self.async_abort(reason="no_zones")

        coordinator = self.config_entry.runtime_data
        zone_config_manager = coordinator.zone_config_manager

        if user_input is not None:
            all_values = self._process_zone_sensor_input(user_input)

            for key, value in all_values.items():
                await zone_config_manager.async_set_zone_value(zone_id, key, value)

            # Return to menu (no config entry change — zone_config.json is separate)
            return self.async_create_entry(title="", data=self.config_entry.options)

        # Load current values
        config = zone_config_manager.get_zone_config(zone_id)

        # Get zone name for description placeholder
        data_loader = coordinator.data_loader
        zones_info = await self.hass.async_add_executor_job(data_loader.load_zones_info_file)
        zone_name = zone_id
        if zones_info:
            zone_name = next(
                (z.get("name", zone_id) for z in zones_info if str(z.get("id")) == zone_id),
                zone_id,
            )

        # Current values with display-friendly transforms
        cur_heating = config.get("heating_type", HEATING_TYPE_RADIATOR).capitalize()
        if cur_heating == "Ufh":
            cur_heating = "UFH"
        cur_ufh_buffer = config.get("ufh_buffer_minutes", 30)
        cur_adaptive = config.get("adaptive_preheat", "off")
        # Handle legacy bool values from pre-migration configs
        if isinstance(cur_adaptive, bool):
            cur_adaptive = "active" if cur_adaptive else "off"
        cur_comfort = config.get("smart_comfort_mode", "none").capitalize()
        if cur_comfort == "None":
            cur_comfort = "None"
        cur_window_type = config.get("window_type", "double_pane")
        cur_sensitivity = WINDOW_SENSITIVITY_REVERSE_MAP.get(
            config.get("window_predicted_sensitivity", WINDOW_SENSITIVITY_DEFAULT), "Medium",
        )
        cur_detection_mode = WINDOW_DETECTION_MODE_REVERSE_MAP.get(
            config.get("window_predicted_mode", WINDOW_DETECTION_MODE_DEFAULT), "auto",
        )
        cur_temp_sensor = config.get("external_temp_sensor", "")
        cur_humidity_sensor = config.get("external_humidity_sensor", "")
        cur_use_ext_temp = bool(cur_temp_sensor)
        cur_use_ext_humidity = bool(cur_humidity_sensor)
        cur_overlay = OVERLAY_MODE_REVERSE_MAP.get(
            config.get("overlay_mode", OVERLAY_MODE_DEFAULT), "Tado Default",
        )
        cur_timer = str(config.get("timer_duration", TIMER_DURATION_DEFAULT))
        cur_min_temp = config.get("min_temp", 5.0)
        cur_max_temp = config.get("max_temp", 25.0)
        cur_temp_offset = config.get("temp_offset", 0.0)
        cur_surface_offset = config.get("surface_temp_offset", 0.0)

        return self.async_show_form(
            step_id="zone_sensor_config",
            data_schema=vol.Schema(
                {
                    # === Heating ===
                    vol.Required("heating_section"): data_entry_flow.section(
                        vol.Schema(
                            {
                                vol.Optional(
                                    "heating_type", default=cur_heating,
                                ): SelectSelector(
                                    SelectSelectorConfig(
                                        options=HEATING_TYPE_OPTIONS,
                                        mode=SelectSelectorMode.DROPDOWN,
                                    ),
                                ),
                                vol.Optional(
                                    "ufh_buffer_minutes", default=cur_ufh_buffer,
                                ): NumberSelector(
                                    NumberSelectorConfig(
                                        min=0, max=60, step=5,
                                        mode=NumberSelectorMode.BOX,
                                        unit_of_measurement="min",
                                    ),
                                ),
                                vol.Optional(
                                    "adaptive_preheat", default=cur_adaptive,
                                ): SelectSelector(
                                    SelectSelectorConfig(
                                        options=["off", "active", "passive"],
                                        mode=SelectSelectorMode.DROPDOWN,
                                        translation_key="adaptive_preheat_mode",
                                    ),
                                ),
                            },
                        ),
                        {"collapsed": False},
                    ),
                    # === Comfort ===
                    vol.Required("comfort_section"): data_entry_flow.section(
                        vol.Schema(
                            {
                                vol.Optional(
                                    "smart_comfort_mode", default=cur_comfort,
                                ): SelectSelector(
                                    SelectSelectorConfig(
                                        options=SMART_COMFORT_MODE_OPTIONS,
                                        mode=SelectSelectorMode.DROPDOWN,
                                    ),
                                ),
                                vol.Optional(
                                    "window_type", default=cur_window_type,
                                ): SelectSelector(
                                    SelectSelectorConfig(
                                        options=["single_pane", "double_pane", "triple_pane", "passive_house"],
                                        translation_key="mold_risk_window_type",
                                        mode=SelectSelectorMode.DROPDOWN,
                                    ),
                                ),
                                vol.Optional(
                                    "window_predicted_mode", default=cur_detection_mode,
                                ): SelectSelector(
                                    SelectSelectorConfig(
                                        options=WINDOW_DETECTION_MODE_OPTIONS,
                                        translation_key="window_predicted_mode",
                                        mode=SelectSelectorMode.DROPDOWN,
                                    ),
                                ),
                                vol.Optional(
                                    "window_predicted_sensitivity", default=cur_sensitivity,
                                ): SelectSelector(
                                    SelectSelectorConfig(
                                        options=WINDOW_SENSITIVITY_OPTIONS,
                                        mode=SelectSelectorMode.DROPDOWN,
                                    ),
                                ),
                            },
                        ),
                        {"collapsed": True},
                    ),
                    # === External Sensors ===
                    vol.Required("sensor_section"): data_entry_flow.section(
                        vol.Schema(
                            {
                                vol.Optional(
                                    "use_external_temp", default=cur_use_ext_temp,
                                ): BooleanSelector(),
                                vol.Optional(
                                    "external_temp_sensor",
                                    description={"suggested_value": cur_temp_sensor}
                                    if cur_temp_sensor else None,
                                ): EntitySelector(
                                    EntitySelectorConfig(
                                        domain="sensor", device_class="temperature",
                                    ),
                                ),
                                vol.Optional(
                                    "use_external_humidity", default=cur_use_ext_humidity,
                                ): BooleanSelector(),
                                vol.Optional(
                                    "external_humidity_sensor",
                                    description={"suggested_value": cur_humidity_sensor}
                                    if cur_humidity_sensor else None,
                                ): EntitySelector(
                                    EntitySelectorConfig(
                                        domain="sensor", device_class="humidity",
                                    ),
                                ),
                            },
                        ),
                        {"collapsed": True},
                    ),
                    # === Overlay ===
                    vol.Required("overlay_section"): data_entry_flow.section(
                        vol.Schema(
                            {
                                vol.Optional(
                                    "overlay_mode", default=cur_overlay,
                                ): SelectSelector(
                                    SelectSelectorConfig(
                                        options=OVERLAY_MODE_OPTIONS,
                                        mode=SelectSelectorMode.DROPDOWN,
                                    ),
                                ),
                                vol.Optional(
                                    "timer_duration", default=cur_timer,
                                ): SelectSelector(
                                    SelectSelectorConfig(
                                        options=TIMER_DURATION_OPTIONS,
                                        mode=SelectSelectorMode.DROPDOWN,
                                    ),
                                ),
                            },
                        ),
                        {"collapsed": True},
                    ),
                    # === Temperature ===
                    vol.Required("temperature_section"): data_entry_flow.section(
                        vol.Schema(
                            {
                                vol.Optional(
                                    "min_temp", default=cur_min_temp,
                                ): NumberSelector(
                                    NumberSelectorConfig(
                                        min=5.0, max=25.0, step=0.5,
                                        mode=NumberSelectorMode.BOX,
                                        unit_of_measurement="°C",
                                    ),
                                ),
                                vol.Optional(
                                    "max_temp", default=cur_max_temp,
                                ): NumberSelector(
                                    NumberSelectorConfig(
                                        min=15.0, max=30.0, step=0.5,
                                        mode=NumberSelectorMode.BOX,
                                        unit_of_measurement="°C",
                                    ),
                                ),
                                vol.Optional(
                                    "temp_offset", default=cur_temp_offset,
                                ): NumberSelector(
                                    NumberSelectorConfig(
                                        min=-3.0, max=3.0, step=0.1,
                                        mode=NumberSelectorMode.BOX,
                                        unit_of_measurement="°C",
                                    ),
                                ),
                                vol.Optional(
                                    "surface_temp_offset", default=cur_surface_offset,
                                ): NumberSelector(
                                    NumberSelectorConfig(
                                        min=SURFACE_TEMP_OFFSET_MIN,
                                        max=SURFACE_TEMP_OFFSET_MAX,
                                        step=SURFACE_TEMP_OFFSET_STEP,
                                        mode=NumberSelectorMode.BOX,
                                        unit_of_measurement="°C",
                                    ),
                                ),
                            },
                        ),
                        {"collapsed": True},
                    ),
                },
            ),
            description_placeholders={"zone_name": zone_name},
        )
