"""Tado CE Binary Sensors — window open detection, preheat now, connectivity."""

from __future__ import annotations

from collections import deque
from datetime import date, datetime, timedelta
import logging
from typing import TYPE_CHECKING, Any

from homeassistant.components.binary_sensor import (
    BinarySensorDeviceClass,
    BinarySensorEntity,
)
from homeassistant.core import CALLBACK_TYPE, Event, EventStateChangedData, HomeAssistant, callback
from homeassistant.helpers.update_coordinator import CoordinatorEntity
from homeassistant.util import dt as dt_util

from .climate_helpers import (
    read_external_sensor,
    subscribe_external_sensors,
    unsubscribe_external_sensors,
)
from .device_manager import get_hub_device_info, get_zone_device_info
from .entity_registry import ENTITY_REGISTRY, get_entity_category
from .format_helpers import (
    format_confidence as _format_confidence,
)
from .format_helpers import (
    format_data_source as _format_data_source,
)
from .format_helpers import (
    format_tado_mode as _format_tado_mode,
)
from .format_helpers import (
    format_zone_type as _format_zone_type,
)
from .format_helpers import (
    strip_zone_prefix as _strip_zone_prefix,
)
from .helpers import parse_iso_datetime
from .insights_models import (
    COOLDOWN_READINGS,
    SEASONAL_BASELINE_MIN_SAMPLES,
    InsightTemperatureReading,
    WindowPredictedResult,
)
from .insights_window import (
    detect_window_passive,
    detect_window_predicted,
)

if TYPE_CHECKING:
    from homeassistant.helpers.entity_platform import AddConfigEntryEntitiesCallback

    from .coordinator import TadoConfigEntry, TadoDataUpdateCoordinator

_LOGGER = logging.getLogger(__name__)

PARALLEL_UPDATES = 0


async def async_setup_entry(
    hass: HomeAssistant,
    entry: TadoConfigEntry,
    async_add_entities: AddConfigEntryEntitiesCallback,
) -> None:
    """Set up Tado CE binary sensors from a config entry."""
    _LOGGER.debug("Tado CE binary_sensor: Setting up...")
    coordinator = entry.runtime_data
    data_loader = coordinator.data_loader
    home_id = coordinator.home_id
    config_manager = coordinator.config_manager
    zones_info = await hass.async_add_executor_job(data_loader.load_zones_info_file)

    # Check if Smart Comfort is enabled (required for Preheat Now sensor)
    smart_comfort_enabled = config_manager.get_smart_comfort_enabled()

    sensors: list[BinarySensorEntity] = []

    # Home/Away sensor (global)
    sensors.append(TadoHomeSensor(coordinator))

    # Open Window sensors (per zone that supports it)
    if zones_info:
        for zone in zones_info:
            zone_id = str(zone.get("id"))
            zone_name = zone.get("name", f"Zone {zone_id}")
            zone_type = zone.get("type")

            # Only add open window for heating zones that support it
            if zone_type == "HEATING":
                owd = zone.get("openWindowDetection") or {}
                if owd.get("supported", False):
                    sensors.append(TadoOpenWindowSensor(coordinator, zone_id, zone_name, zone_type, home_id))

                # Add Preheat Now sensor if Smart Comfort is enabled
                if smart_comfort_enabled:
                    sensors.append(TadoPreheatNowSensor(coordinator, zone_id, zone_name, zone_type, home_id))

            # Window Predicted sensor for all climate zones (HEATING and AIR_CONDITIONING)
            if zone_type in ("HEATING", "AIR_CONDITIONING"):
                sensors.append(TadoWindowPredictedSensor(coordinator, zone_id, zone_name, zone_type, home_id))

    # Bridge connected sensor (only when bridge credentials configured)
    bridge_serial = entry.options.get("bridge_serial")
    bridge_auth_key = entry.options.get("bridge_auth_key")
    if bridge_serial and bridge_auth_key:
        from .binary_sensor_bridge import TadoBridgeConnectedSensor

        sensors.append(TadoBridgeConnectedSensor(coordinator))
        _LOGGER.debug("Bridge connected binary sensor created")

    async_add_entities(sensors, False)  # Don't update before add - self.hass not set yet
    _LOGGER.debug("Tado CE binary sensors loaded: %s", len(sensors))


class TadoHomeSensor(CoordinatorEntity["TadoDataUpdateCoordinator"], BinarySensorEntity):
    """Represent a Tado home-level binary sensor."""

    _attr_has_entity_name = True

    """Binary sensor for Tado Home/Away status.

    Reads from home_state.json (source of truth for presence) instead of
    zones.json tadoMode. Falls back to zones.json if home_state is not
    available (e.g., home_state_sync_enabled=false).
    """

    def __init__(self, coordinator: TadoDataUpdateCoordinator) -> None:
        """Initialize the Home Sensor."""
        super().__init__(coordinator)
        _meta = ENTITY_REGISTRY["binary_sensor_home"]
        self._attr_translation_key = _meta.translation_key
        self._attr_unique_id = f"tado_ce_{coordinator.home_id}_{_meta.unique_id_suffix}"
        self._attr_device_class = BinarySensorDeviceClass.PRESENCE
        self._attr_entity_category = get_entity_category(_meta)
        self._attr_available = False
        self._attr_is_on = None
        # Use hub device info for global entities
        self._attr_device_info = get_hub_device_info(coordinator.home_id)
        self._tado_mode = None
        self._presence_locked = None  # Track if presence is locked (manual override)
        self._data_source = None  # Track which data source is being used

    @callback
    def _handle_coordinator_update(self) -> None:
        """Handle updated data from the coordinator."""
        self.update()
        self.async_write_ha_state()

    @property
    def extra_state_attributes(self) -> dict[str, Any] | None:
        """Return extra state attributes."""
        return {
            "tado_mode": _format_tado_mode(self._tado_mode),  # type: ignore[arg-type]
            "presence_locked": self._presence_locked,
            "data_source": _format_data_source(self._data_source),  # type: ignore[arg-type]
        }

    @callback
    def update(self) -> None:
        """Update from home_state.json (primary) or zones.json (fallback).

        Changed to read from home_state.json as source of truth.
        Falls back to zones.json tadoMode if home_state is not available.
        """
        try:
            coord_data = self.coordinator.data or {}

            # Primary: Read from home_state (source of truth for presence)
            home_state = coord_data.get("home_state")
            if home_state:
                presence = home_state.get("presence", "HOME")
                self._presence_locked = home_state.get("presenceLocked", False)
                self._attr_is_on = presence == "HOME"
                self._tado_mode = presence  # Keep tado_mode attribute for compatibility
                self._data_source = "home_state"  # type: ignore[assignment]
                self._attr_available = True
                return

            # Fallback: Read from zones tadoMode
            # This is used when home_state_sync_enabled=false
            data = coord_data.get("zones")
            if data:
                zone_states = data.get("zoneStates") or {}
                for zone_data in zone_states.values():
                    self._tado_mode = zone_data.get("tadoMode")
                    if self._tado_mode:
                        self._attr_is_on = self._tado_mode == "HOME"
                        self._presence_locked = zone_data.get("geolocationOverride", False)
                        self._data_source = "zones"
                        self._attr_available = True
                        return

            self._attr_available = False
        except Exception as e:  # noqa: BLE001 — HA entity update pattern
            _LOGGER.warning("TadoHomeSensor update failed: %s", e)
            self._attr_available = False




class TadoOpenWindowSensor(CoordinatorEntity["TadoDataUpdateCoordinator"], BinarySensorEntity):
    """Represent a Tado open window detection binary sensor."""

    _attr_has_entity_name = True

    """Binary sensor for Tado Open Window detection."""

    def __init__(
        self,
        coordinator: TadoDataUpdateCoordinator,
        zone_id: str,
        zone_name: str,
        zone_type: str = "HEATING",
        home_id: str = "",
    ) -> None:
        """Initialize the Open Window Sensor."""
        super().__init__(coordinator)
        _meta = ENTITY_REGISTRY["binary_sensor_window"]
        self._zone_id = zone_id
        self._zone_name = zone_name
        self._zone_type = zone_type
        self._attr_translation_key = _meta.translation_key
        self._attr_unique_id = f"tado_ce_{home_id}_{_meta.unique_id_suffix.format(zone_id=zone_id)}"
        self._attr_device_class = BinarySensorDeviceClass.WINDOW
        self._attr_available = False
        self._attr_is_on = None
        self._attr_device_info = get_zone_device_info(zone_id, zone_name, zone_type, home_id)
        self._detected_time = None
        self._expiry_time = None

    @callback
    def _handle_coordinator_update(self) -> None:
        """Handle updated data from the coordinator."""
        self.update()
        self.async_write_ha_state()

    @property
    def extra_state_attributes(self) -> dict[str, Any] | None:
        """Return extra state attributes."""
        return {
            "detected_time": self._detected_time,
            "expiry_time": self._expiry_time,
        }

    @callback
    def update(self) -> None:
        """Update entity state from coordinator data."""
        try:
            coord_data = self.coordinator.data or {}
            data = coord_data.get("zones")
            if data:
                # Use 'or {}' pattern for null safety
                zone_states = data.get("zoneStates") or {}
                zone_data = zone_states.get(self._zone_id)

                if not zone_data:
                    self._attr_available = False
                    return

                open_window = zone_data.get("openWindow")
                open_window_detected = zone_data.get("openWindowDetected", False)

                if open_window:
                    self._attr_is_on = True
                    self._detected_time = open_window.get("detectedTime")
                    self._expiry_time = open_window.get("expiryTime")
                elif open_window_detected:
                    self._attr_is_on = True
                    self._detected_time = None
                    self._expiry_time = None
                else:
                    self._attr_is_on = False
                    self._detected_time = None
                    self._expiry_time = None

                self._attr_available = True
            else:
                self._attr_available = False
        except Exception:  # noqa: BLE001 — HA entity update pattern
            _LOGGER.debug("Failed to update open window sensor for zone %s", self._zone_id)
            self._attr_available = False


class TadoPreheatNowSensor(CoordinatorEntity["TadoDataUpdateCoordinator"], BinarySensorEntity):
    """Represent a Tado preheat-active binary sensor."""

    _attr_has_entity_name = True

    """Binary sensor indicating when to start preheating.

    Turns ON when current time >= recommended preheat start time.
    Uses data from TadoPreheatAdvisorSensor to determine timing.

    UFH buffer is already applied in TadoPreheatAdvisorSensor,
    so this sensor just reads the adjusted time directly.
    """

    def __init__(
        self,
        coordinator: TadoDataUpdateCoordinator,
        zone_id: str,
        zone_name: str,
        zone_type: str = "HEATING",
        home_id: str = "",
    ) -> None:
        """Initialize the Preheat Now Sensor."""
        super().__init__(coordinator)
        _meta = ENTITY_REGISTRY["binary_sensor_preheat_now"]
        self._zone_id = zone_id
        self._zone_name = zone_name
        self._zone_type = zone_type
        self._attr_translation_key = _meta.translation_key
        self._attr_unique_id = f"tado_ce_{home_id}_{_meta.unique_id_suffix.format(zone_id=zone_id)}"
        self._attr_device_class = BinarySensorDeviceClass.HEAT
        self._attr_entity_category = get_entity_category(_meta)
        self._attr_available = False
        self._attr_is_on = None
        self._attr_device_info = get_zone_device_info(zone_id, zone_name, zone_type, home_id)

        # Attributes for debugging/display
        self._recommended_start = None
        self._target_time = None
        self._target_temp = None
        self._current_temp = None
        self._duration_minutes = None
        self._confidence = "unknown"
        self._is_tomorrow: bool = False

    @callback
    def _handle_coordinator_update(self) -> None:
        """Handle updated data from the coordinator."""
        self.update()
        self.async_write_ha_state()

    @property
    def extra_state_attributes(self) -> dict[str, Any] | None:
        """Return extra state attributes."""
        return {
            "recommended_start": self._recommended_start,
            "target_time": self._target_time,
            "target_temperature": self._target_temp,
            "current_temperature": self._current_temp,
            "duration_minutes": self._duration_minutes,
            "confidence": _format_confidence(self._confidence),
            "is_tomorrow": self._is_tomorrow,
            "zone_type": _format_zone_type(self._zone_type),
        }

    @property
    def icon(self) -> str | None:
        """Dynamic icon based on state."""
        if self._attr_is_on:
            return "mdi:radiator"
        return "mdi:radiator-off"

    @callback
    def update(self) -> None:
        """Update preheat now status.

        Logic:
        1. Get preheat advisor data from coordinator.entity_data (no hass.states.get)
        2. If recommended start time exists and is valid
        3. Turn ON if current time >= recommended start time
        """
        try:
            from datetime import datetime

            if not self.hass:
                self._attr_available = False
                return

            # Read preheat advisor data from coordinator (published by TadoPreheatAdvisorSensor)
            preheat_data = self.coordinator.get_entity_data(self._zone_id, "preheat_advisor")

            # Copy attributes from preheat advisor data
            if preheat_data:
                self._target_time = preheat_data.get("target_time")
                self._target_temp = preheat_data.get("target_temperature")
                self._current_temp = preheat_data.get("current_temperature")
                self._duration_minutes = preheat_data.get("duration_minutes")
                self._confidence = preheat_data.get("confidence", "unknown")
                self._is_tomorrow = preheat_data.get("is_tomorrow", False)

            # Check for non-actionable states
            non_actionable_states = (
                "unavailable",
                "unknown",
                "No schedule",
                "Heating OFF",
                "Ready",
                "Insufficient data",
                "Away",
                None,
            )
            preheat_state_val = preheat_data.get("state") if preheat_data else None
            if not preheat_data or preheat_state_val in non_actionable_states:
                self._attr_is_on = False
                self._attr_available = True
                self._recommended_start = None
                return

            # If preheat is for a future day, never trigger
            if self._is_tomorrow:
                self._attr_is_on = False
                self._attr_available = True
                self._recommended_start = preheat_state_val
                return

            # Parse recommended start time (format: "HH:MM")
            # Note: UFH buffer is already applied in TadoPreheatAdvisorSensor
            try:
                recommended_str = preheat_state_val
                now = dt_util.now()
                recommended_time = datetime.strptime(recommended_str, "%H:%M").replace(  # type: ignore[arg-type]
                    year=now.year,
                    month=now.month,
                    day=now.day,
                    tzinfo=now.tzinfo,
                )

                self._recommended_start = recommended_str

                # Check if it's time to preheat
                self._attr_is_on = now >= recommended_time
                self._attr_available = True

            except ValueError:
                # Invalid time format
                self._attr_is_on = False
                self._attr_available = True
                self._recommended_start = None

        except Exception as e:  # noqa: BLE001 — HA entity update pattern
            _LOGGER.debug("Failed to update preheat now for zone %s: %s", self._zone_id, e)
            self._attr_available = False
        finally:
            # Publish computed state to coordinator for cross-component access
            # (used by AdaptivePreheatManager initial state check)
            self.coordinator.publish_entity_data(
                self._zone_id,
                "preheat_now",
                {
                    "state": "on" if self._attr_is_on else "off",
                    "recommended_start": self._recommended_start,
                },
            )


def _serialize_window_detection_state(
    sensor: TadoWindowPredictedSensor,
) -> dict[str, Any]:
    """Serialize window detection state for persistence."""
    return {
        "detection_count_today": sensor._detection_count_today,
        "last_count_reset_date": (
            sensor._last_count_reset_date.isoformat()
            if sensor._last_count_reset_date
            else None
        ),
        "last_detected_at": (
            sensor._last_detected_at.isoformat()
            if sensor._last_detected_at
            else None
        ),
        "anomaly_readings": sensor._anomaly_readings,
        "temp_history": [
            {
                "temperature": r.temperature,
                "humidity": r.humidity,
                "timestamp": r.timestamp.isoformat(),
            }
            for r in sensor._temp_history
        ],
    }


def _restore_temp_history(
    raw_history: list[Any],
    cutoff: datetime,
) -> list[InsightTemperatureReading]:
    """Restore temperature history entries, pruning stale ones (>1 hour)."""
    result: list[InsightTemperatureReading] = []
    for entry in raw_history:
        if not isinstance(entry, dict):
            continue
        try:
            ts = parse_iso_datetime(entry["timestamp"])
            if ts < cutoff:
                continue  # Prune stale
            reading = InsightTemperatureReading(
                temperature=float(entry["temperature"]),
                humidity=(
                    float(entry["humidity"])
                    if entry.get("humidity") is not None
                    else None
                ),
                timestamp=ts,
            )
            result.append(reading)
        except (KeyError, ValueError, TypeError):
            continue  # Skip corrupt entries
    return result


def _restore_window_detection_state(
    sensor: TadoWindowPredictedSensor,
    data: dict[str, Any],
) -> None:
    """Restore window detection state from persisted data, pruning stale entries."""
    if isinstance(data.get("detection_count_today"), int):
        sensor._detection_count_today = data["detection_count_today"]
    date_str = data.get("last_count_reset_date")
    if isinstance(date_str, str):
        try:
            sensor._last_count_reset_date = date.fromisoformat(date_str)
        except ValueError:
            pass  # Corrupt date — keep default
    detected_str = data.get("last_detected_at")
    if isinstance(detected_str, str):
        try:
            sensor._last_detected_at = parse_iso_datetime(detected_str)
        except (ValueError, TypeError):
            pass  # Corrupt timestamp — keep default
    if isinstance(data.get("anomaly_readings"), int):
        sensor._anomaly_readings = data["anomaly_readings"]
    # Restore temp_history with staleness pruning (>1 hour = stale)
    raw_history = data.get("temp_history")
    if isinstance(raw_history, list):
        cutoff = dt_util.utcnow() - timedelta(hours=1)
        sensor._temp_history.extend(_restore_temp_history(raw_history, cutoff))


class TadoWindowPredictedSensor(CoordinatorEntity["TadoDataUpdateCoordinator"], BinarySensorEntity):
    """Represent a Tado predicted window-open binary sensor."""

    _attr_has_entity_name = True

    """Binary sensor for early open window detection.

    Detects possible open windows using local temperature analysis,
    providing early warning before Tado's cloud detection triggers.

    This is a PREDICTIVE sensor - it does NOT replace Tado's confirmed
    Window binary sensor (binary_sensor.{zone}_window).
    """

    _attr_device_class = BinarySensorDeviceClass.WINDOW

    def __init__(
        self,
        coordinator: TadoDataUpdateCoordinator,
        zone_id: str,
        zone_name: str,
        zone_type: str = "HEATING",
        home_id: str = "",
    ) -> None:
        """Initialize the Window Predicted Sensor."""
        super().__init__(coordinator)
        _meta = ENTITY_REGISTRY["binary_sensor_window_predicted"]
        self._zone_id = zone_id
        self._zone_name = zone_name
        self._zone_type = zone_type
        self._attr_translation_key = _meta.translation_key
        self._attr_unique_id = f"tado_ce_{home_id}_{_meta.unique_id_suffix.format(zone_id=zone_id)}"
        self._attr_entity_category = get_entity_category(_meta)
        self._attr_available = False
        self._attr_is_on = None
        self._attr_device_info = get_zone_device_info(zone_id, zone_name, zone_type, home_id)

        # Detection state
        self._confidence: str = "none"
        self._temp_drop: float = 0.0
        self._time_window: int = 5
        self._recommendation: str = ""
        self._anomaly_readings: int = 0

        # Sensitivity level for window predicted detection
        self._sensitivity: str = "medium"

        # Rolling temperature history for consecutive-reading comparison
        self._temp_history: deque = deque(maxlen=10)  # type: ignore[type-arg]
        self._last_reading_time: datetime = None  # type: ignore[assignment]

        # Unsubscribe callbacks for external sensor state change listeners
        self._unsub_external_sensors: list[CALLBACK_TYPE] = []

        # Detection mode (active/passive/auto)
        self._detection_mode: str = "auto"

        # Cooldown state
        self._cooldown_counter: int = 0

        # Detection history
        self._last_detected_at: datetime | None = None
        self._detection_count_today: int = 0
        self._last_count_reset_date: date | None = None
        self._detection_mode_used: str = "none"

        # Previous detection state for event firing
        self._prev_detected: bool = False

    async def async_added_to_hass(self) -> None:
        """Register listeners when entity is added to hass."""
        await super().async_added_to_hass()
        # Restore persisted window detection state
        raw = await self.coordinator.data_loader.async_load_window_detection()
        if raw and isinstance(raw, dict):
            zone_data = raw.get(self._zone_id)
            if zone_data and isinstance(zone_data, dict):
                _restore_window_detection_state(self, zone_data)
                _LOGGER.debug(
                    "Window detection zone %s: restored persisted state "
                    "(count=%d, history=%d readings)",
                    self._zone_id,
                    self._detection_count_today,
                    len(self._temp_history),
                )
        self._subscribe_external_sensors()

    async def async_will_remove_from_hass(self) -> None:
        """Unregister listeners when entity is removed."""
        self._unsubscribe_external_sensors()
        await self._async_save_detection_state()
        await super().async_will_remove_from_hass()

    async def _async_save_detection_state(self) -> None:
        """Persist window detection state via Store."""
        try:
            raw = await self.coordinator.data_loader.async_load_window_detection()
            all_zones: dict[str, Any] = raw if raw and isinstance(raw, dict) else {}
            all_zones[self._zone_id] = _serialize_window_detection_state(self)
            self.coordinator.data_loader.save_window_detection(all_zones)
        except (OSError, AttributeError):
            _LOGGER.debug("Failed to save window detection state for zone %s", self._zone_id)

    @callback
    def _subscribe_external_sensors(self) -> None:
        """Subscribe to external temp sensor state changes for real-time window detection."""
        unsubscribe_external_sensors(self._unsub_external_sensors)

        @callback
        def _on_external_sensor_change(event: Event[EventStateChangedData]) -> None:
            """Handle external temp sensor state change — re-run window detection."""
            self.update()
            self.async_write_ha_state()

        self._unsub_external_sensors = subscribe_external_sensors(
            self, self._zone_id, _on_external_sensor_change,
            include_humidity=False,
        )

    @callback
    def _unsubscribe_external_sensors(self) -> None:
        """Unsubscribe from external sensor state change listeners."""
        unsubscribe_external_sensors(self._unsub_external_sensors)

    @callback
    def _handle_coordinator_update(self) -> None:
        """Handle updated data from the coordinator."""
        self.update()
        self.async_write_ha_state()

    @property
    def extra_state_attributes(self) -> dict[str, Any] | None:
        """Return extra state attributes."""
        return {
            "confidence": _format_confidence(self._confidence),
            "temp_drop": self._temp_drop,
            "time_window_minutes": self._time_window,
            "recommendation": _strip_zone_prefix(self._recommendation, self._zone_name),
            "zone_type": _format_zone_type(self._zone_type),
            "readings_count": len(self._temp_history),
            "anomaly_readings": self._anomaly_readings,
            "sensitivity": self._sensitivity,
            "detection_mode": self._detection_mode,
            "detection_mode_used": self._detection_mode_used,
            "cooldown_active": self._cooldown_counter > 0,
            "last_detected_at": self._last_detected_at.isoformat() if self._last_detected_at else None,
            "detection_count_today": self._detection_count_today,
        }

    @property
    def icon(self) -> str | None:
        """Dynamic icon based on state."""
        if self._attr_is_on:
            return "mdi:window-open-variant"
        return "mdi:window-closed-variant"

    def _get_outdoor_temp(self) -> float | None:
        """Get outdoor temperature from global config entity."""
        outdoor_entity = self.coordinator.config_manager.get_outdoor_temp_entity()
        if outdoor_entity and self.hass:
            state = self.hass.states.get(outdoor_entity)
            if state and state.state not in ("unknown", "unavailable", ""):
                try:
                    return float(state.state)
                except (ValueError, TypeError):
                    pass
        return None

    def _get_seasonal_baseline(self) -> float | None:
        """Get seasonal baseline from outdoor temp history."""
        history = self.coordinator.outdoor_temp_history
        if len(history) < SEASONAL_BASELINE_MIN_SAMPLES:
            return None
        recent = history[-168:]
        return sum(recent) / len(recent)

    def _apply_cooldown(self, result: WindowPredictedResult) -> WindowPredictedResult:
        """Apply cooldown/hysteresis to prevent flickering.

        After detection clears, require N consecutive non-anomaly readings
        before actually clearing. N depends on sensitivity preset.
        """
        if result.detected:
            self._cooldown_counter = 0
            return result

        if self._attr_is_on and not result.detected:
            self._cooldown_counter += 1
            cooldown_needed = COOLDOWN_READINGS.get(self._sensitivity, 2)

            if self._cooldown_counter < cooldown_needed:
                return WindowPredictedResult(
                    detected=True,
                    confidence=self._confidence,
                    temp_drop=result.temp_drop,
                    time_window_minutes=result.time_window_minutes,
                    recommendation=self._recommendation,
                    anomaly_readings=result.anomaly_readings,
                    cooldown_active=True,
                    detection_mode=result.detection_mode,
                )
            self._cooldown_counter = 0

        return result

    def _fire_detection_events(self, result: WindowPredictedResult) -> None:
        """Fire HA events on detection state transitions."""
        if not self.hass:
            return

        is_transition = (
            (result.detected and not self._prev_detected)
            or (not result.detected and self._prev_detected and not result.cooldown_active)
        )

        if result.detected and not self._prev_detected:
            self.hass.bus.async_fire("tado_ce_window_predicted", {
                "zone_id": self._zone_id,
                "zone_name": self._zone_name,
                "confidence": result.confidence,
                "temp_drop": result.temp_drop,
                "anomaly_readings": result.anomaly_readings,
                "detection_mode": result.detection_mode,
                "recommendation": result.recommendation,
            })
        elif not result.detected and self._prev_detected and not result.cooldown_active:
            self.hass.bus.async_fire("tado_ce_window_predicted_cleared", {
                "zone_id": self._zone_id,
                "zone_name": self._zone_name,
            })

        self._prev_detected = result.detected

        # Persist state on transitions to avoid losing detection history on crash
        if is_transition:
            self.hass.async_create_task(self._async_save_detection_state())

    def _update_detection_history(self, result: WindowPredictedResult) -> None:
        """Update detection history attributes."""
        today = dt_util.utcnow().date()
        if self._last_count_reset_date != today:
            self._detection_count_today = 0
            self._last_count_reset_date = today

        if result.detected and not self._prev_detected:
            self._last_detected_at = dt_util.utcnow()
            self._detection_count_today += 1
            self._detection_mode_used = result.detection_mode

    @callback
    def update(self) -> None:
        """Update window predicted detection via heating anomaly algorithm.

        Logic:
        1. Get current temperature and humidity from zone data
        2. Add to rolling history
        3. Determine HVAC state and mode (heating vs cooling)
        4. Dispatch to active or passive detection based on mode config
        5. Apply cooldown, fire events, update history
        """
        try:
            coord_data = self.coordinator.data or {}
            data = coord_data.get("zones")
            if not data:
                self._attr_available = False
                return

            zone_states = data.get("zoneStates") or {}
            zone_data = zone_states.get(self._zone_id)

            if not zone_data:
                self._attr_available = False
                return

            sensor_data = zone_data.get("sensorDataPoints") or {}
            temp_data = sensor_data.get("insideTemperature") or {}
            humidity_data = sensor_data.get("humidity") or {}

            current_temp = temp_data.get("celsius")
            current_humidity = humidity_data.get("percentage")

            # External temp sensor override (fallback to Tado API value above)
            zcm = self.coordinator.zone_config_manager
            ext_temp = read_external_sensor(self.hass, zcm, self._zone_id, "external_temp_sensor")
            if ext_temp is not None:
                current_temp = ext_temp

            if current_temp is None:
                self._attr_available = False
                return

            # Add reading to history (throttle to avoid duplicates)
            now = dt_util.utcnow()
            if self._last_reading_time is None or (now - self._last_reading_time).total_seconds() >= 25:  # noqa: PLR2004 — throttle interval seconds
                reading = InsightTemperatureReading(
                    temperature=current_temp,
                    humidity=current_humidity,
                    timestamp=now,
                )
                self._temp_history.append(reading)
                self._last_reading_time = now

            # Determine HVAC state and mode
            activity_data = zone_data.get("activityDataPoints") or {}
            heating_power = activity_data.get("heatingPower") or {}
            ac_power = activity_data.get("acPower")

            heating_percentage = heating_power.get("percentage", 0)
            ac_on = ac_power is not None and ac_power.get("value") == "ON"
            hvac_active = heating_percentage > 0 or ac_on

            # Determine hvac_mode for anomaly direction
            hvac_mode = "cooling" if ac_on else "heating"

            # Read sensitivity and detection mode from zone config manager
            if zcm:
                self._sensitivity = zcm.get_zone_value(
                    self._zone_id, "window_predicted_sensitivity", "medium",
                )
                self._detection_mode = zcm.get_zone_value(
                    self._zone_id, "window_predicted_mode", "auto",
                )

            # Determine which detection path to use
            use_passive = (
                self._detection_mode == "passive"
                or (self._detection_mode == "auto" and not hvac_active)
            )

            if use_passive:
                outdoor_temp = self._get_outdoor_temp()
                window_u_value = zcm.get_window_u_value(self._zone_id) if zcm else 2.7
                seasonal_baseline = self._get_seasonal_baseline()

                result = detect_window_passive(
                    readings=list(self._temp_history),
                    zone_name=self._zone_name,
                    sensitivity=self._sensitivity,
                    hvac_mode=hvac_mode,
                    outdoor_temp=outdoor_temp,
                    window_u_value=window_u_value,
                    seasonal_baseline=seasonal_baseline,
                )
            else:
                # Active path — unchanged
                result = detect_window_predicted(
                    readings=list(self._temp_history),
                    hvac_active=hvac_active,
                    zone_name=self._zone_name,
                    time_window_minutes=self._time_window,
                    hvac_mode=hvac_mode,
                    sensitivity=self._sensitivity,
                )

            # Apply cooldown/hysteresis
            result = self._apply_cooldown(result)

            # Fire events on state transitions
            self._fire_detection_events(result)

            # Update history attributes
            self._update_detection_history(result)

            self._attr_is_on = result.detected
            self._confidence = result.confidence
            self._temp_drop = result.temp_drop
            self._recommendation = result.recommendation
            self._anomaly_readings = result.anomaly_readings
            self._attr_available = True

            # Publish computed data to coordinator for cross-component access
            self.coordinator.publish_entity_data(
                self._zone_id,
                "window_predicted",
                {
                    "state": "on" if result.detected else "off",
                    "recommendation": result.recommendation,
                },
            )

        except Exception as e:  # noqa: BLE001 — HA entity update pattern
            _LOGGER.debug("Failed to update window predicted for zone %s: %s", self._zone_id, e)
            self._attr_available = False
