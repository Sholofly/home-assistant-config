"""Tado CE heating cycle coordinator — cross-zone analysis."""

from __future__ import annotations

import asyncio
from datetime import datetime
import logging
from typing import TYPE_CHECKING, Any

from homeassistant.helpers.update_coordinator import DataUpdateCoordinator
from homeassistant.util import dt as dt_util

from .heating_analyzer import HeatingCycleAnalyzer
from .heating_detector import HeatingCycleDetector
from .heating_storage import HeatingCycleStorage
from .thermal_analyzer import ThermalAnalyzer

if TYPE_CHECKING:
    from homeassistant.core import HomeAssistant

    from .heating_models import HeatingCycle, HeatingCycleConfig

_LOGGER = logging.getLogger(__name__)



class HeatingCycleCoordinator(DataUpdateCoordinator):
    """Coordinate heating cycle detection and analysis for all zones."""

    def __init__(
        self,
        hass: HomeAssistant,
        home_id: str,
        config: HeatingCycleConfig,
    ) -> None:
        """Initialize coordinator."""
        super().__init__(
            hass,
            _LOGGER,
            name=f"heating_cycle_{home_id}",
            update_interval=None,  # Manual updates only
        )
        self._home_id = home_id
        self._config = config
        self._storage = HeatingCycleStorage(hass, home_id)
        self._analyzer = HeatingCycleAnalyzer(config.min_cycles)
        self._second_order = ThermalAnalyzer(config.min_cycles)
        self._detectors: dict[str, HeatingCycleDetector] = {}
        self._zone_data: dict[str, dict[str, Any]] = {}  # Analysis data (heating rate, cycles, etc.)
        self._zone_states: dict[str, dict[str, Any]] = {}  # Cached zone states (current_temp, target_temp)
        self._lock = asyncio.Lock()

    async def _async_update_data(self) -> dict[str, Any]:
        """Update data - required by DataUpdateCoordinator.

        This coordinator uses manual updates only, so this method
        just returns the current zone data.
        """
        return self._zone_data

    async def async_setup(self) -> None:
        """Set up coordinator - load storage and resume active cycles."""
        _LOGGER.debug("HeatingCycleCoordinator: Starting async_setup for home %s", self._home_id)

        await self._storage.async_load()
        _LOGGER.debug("HeatingCycleCoordinator: Storage loaded")

        # Resume active cycles
        active_cycles = await self._storage.get_active_cycles()
        _LOGGER.debug("HeatingCycleCoordinator: Found %d active cycles to resume", len(active_cycles))

        for zone_id, cycle in active_cycles.items():
            detector = self._get_or_create_detector(zone_id)
            detector.resume_cycle(cycle)
            _LOGGER.debug(
                "Resumed active cycle for zone %s from %s",
                zone_id,
                cycle.start_time.isoformat(),
            )

        # Load historical data for all zones with completed cycles
        all_zone_ids = await self._storage.get_all_zone_ids()
        _LOGGER.debug("HeatingCycleCoordinator: Loading historical data for %d zones", len(all_zone_ids))

        for zone_id in all_zone_ids:
            await self._async_update_zone_data(zone_id)

        _LOGGER.debug("HeatingCycleCoordinator: async_setup complete")

    def _get_or_create_detector(self, zone_id: str) -> HeatingCycleDetector:
        """Get or create detector for zone."""
        if zone_id not in self._detectors:
            self._detectors[zone_id] = HeatingCycleDetector(zone_id, self._config)
        return self._detectors[zone_id]

    async def on_zone_update(
        self,
        zone_id: str,
        target_temp: float,
        current_temp: float,
        timestamp: datetime | None = None,
    ) -> None:
        """Handle zone update event - ATOMIC operation for setpoint and temperature.

        This method replaces separate on_setpoint_change and on_temperature_update
        calls to eliminate race conditions. Both operations are handled atomically
        within a single lock acquisition, ensuring correct order:
        1. First check/start cycle based on setpoint
        2. Then record temperature reading

        Args:
            zone_id: Zone ID
            target_temp: Target temperature (setpoint)
            current_temp: Current room temperature
            timestamp: Time of the update
        """
        if timestamp is None:
            timestamp = dt_util.utcnow()

        _LOGGER.debug(
            "Zone %s: Zone update received - target=%.1f°C, current=%.1f°C",
            zone_id,
            target_temp,
            current_temp,
        )

        # Cache zone states for sensors (avoids blocking I/O in native_value)
        self._zone_states[zone_id] = {
            "current_temp": current_temp,
            "target_temp": target_temp,
            "timestamp": timestamp,
        }

        # Notify sensors of state change (so they can update native_value)
        self.async_set_updated_data(self._zone_data)

        async with self._lock:
            detector = self._get_or_create_detector(zone_id)

            # Step 1: Check setpoint change (may start new cycle)
            cycle_started = detector.check_setpoint_change(target_temp, timestamp, current_temp)

            if cycle_started:
                _LOGGER.debug(
                    "Zone %s: New cycle started, target=%.1f°C, current=%.1f°C",
                    zone_id,
                    target_temp,
                    current_temp,
                )

            # Step 2: Record temperature reading (only if cycle is active)
            detector.on_temperature_update(current_temp, timestamp)

            # Step 3: Check if cycle completed
            completed_cycle = detector.check_cycle_complete()
            if completed_cycle:
                await self._storage.save_cycle(zone_id, completed_cycle)
                _LOGGER.info(
                    "Zone %s: Cycle completed and saved",
                    zone_id,
                )
                await self._async_update_zone_data(zone_id)

    async def on_setpoint_change(
        self,
        zone_id: str,
        new_target: float,
        current_temp: float | None = None,
        timestamp: datetime | None = None,
    ) -> None:
        """Handle setpoint change event (legacy method, prefer on_zone_update).

        Args:
            zone_id: Zone ID
            new_target: New target temperature
            current_temp: Current room temperature (optional, for restart detection)
            timestamp: Time of the change
        """
        if timestamp is None:
            timestamp = dt_util.utcnow()

        _LOGGER.debug(
            "Zone %s: Setpoint change received: %.1f°C (current=%.1f°C)",
            zone_id,
            new_target,
            current_temp or 0,
        )

        async with self._lock:
            detector = self._get_or_create_detector(zone_id)
            cycle_started = detector.check_setpoint_change(new_target, timestamp, current_temp)

            if cycle_started:
                _LOGGER.debug(
                    "Zone %s: New cycle started, target=%.1f°C",
                    zone_id,
                    new_target,
                )

    async def on_temperature_update(
        self,
        zone_id: str,
        temp: float,
        timestamp: datetime | None = None,
    ) -> None:
        """Handle temperature update event (legacy method, prefer on_zone_update)."""
        if timestamp is None:
            timestamp = dt_util.utcnow()

        _LOGGER.debug(
            "Zone %s: Temperature update received: %.2f°C",
            zone_id,
            temp,
        )

        async with self._lock:
            detector = self._get_or_create_detector(zone_id)
            detector.on_temperature_update(temp, timestamp)

            # Check if cycle completed
            completed_cycle = detector.check_cycle_complete()
            if completed_cycle:
                await self._storage.save_cycle(zone_id, completed_cycle)
                _LOGGER.info(
                    "Zone %s: Cycle completed and saved",
                    zone_id,
                )
                await self._async_update_zone_data(zone_id)

    async def check_timeouts(self) -> None:
        """Check all active cycles for timeout."""
        async with self._lock:
            for zone_id, detector in self._detectors.items():
                if detector.check_cycle_timeout():
                    _LOGGER.warning("Zone %s: Cycle timed out", zone_id)
                    await self._async_update_zone_data(zone_id)

    async def _async_update_zone_data(self, zone_id: str) -> None:
        """Update zone data for sensors (called after cycle completion)."""
        # Get completed cycles within rolling window
        cycles = await self._storage.get_cycles(zone_id, self._config.rolling_window_days)

        # Analyze cycles (first-order)
        metrics = self._analyzer.analyze_cycles(cycles)

        # Second-order analysis
        acceleration = self._second_order.calculate_acceleration(cycles)
        approach_factor = self._second_order.calculate_approach_factor(cycles)

        if metrics:
            self._zone_data[zone_id] = {
                **metrics,
                "acceleration": acceleration,
                "approach_factor": approach_factor,
            }
            _LOGGER.debug(
                "Zone %s: Updated metrics - inertia=%.1f min, rate=%.2f °C/h, "
                "accel=%s °C/h², approach=%s%%, confidence=%.2f",
                zone_id,
                metrics["inertia_time"],
                metrics["heating_rate"],
                acceleration,
                approach_factor,
                metrics["confidence_score"],
            )
        else:
            # Insufficient data
            self._zone_data[zone_id] = {
                "inertia_time": None,
                "heating_rate": None,
                "confidence_score": 0.0,
                "cycle_count": len(cycles),
                "completed_count": len(cycles),
                "acceleration": None,
                "approach_factor": None,
            }
            _LOGGER.debug(
                "Zone %s: Insufficient data for analysis (%d cycles)",
                zone_id,
                len(cycles),
            )

        # Notify listeners (sensors)
        self.async_set_updated_data(self._zone_data)

    def get_zone_data(self, zone_id: str) -> dict[str, Any] | None:
        """Get analysis data for a zone."""
        return self._zone_data.get(zone_id)

    def get_zone_state(self, zone_id: str) -> dict[str, Any] | None:
        """Get cached zone state (current_temp, target_temp).

        Returns cached state from last on_zone_update call.
        Used by sensors to avoid blocking I/O in native_value property.

        Returns:
            Dict with current_temp, target_temp, timestamp, or None if not cached.
        """
        return self._zone_states.get(zone_id)

    async def get_cycles(self, zone_id: str) -> list[HeatingCycle]:
        """Get completed cycles for a zone within rolling window."""
        return await self._storage.get_cycles(zone_id, self._config.rolling_window_days)

    def get_active_cycle(self, zone_id: str) -> HeatingCycle | None:
        """Get active cycle for a zone."""
        detector = self._detectors.get(zone_id)
        if detector:
            return detector.get_active_cycle()
        return None

    def estimate_preheat_time(
        self,
        zone_id: str,
        current_temp: float,
        target_temp: float,
    ) -> float | None:
        """Estimate preheat time for a zone.

        Args:
            zone_id: Zone ID
            current_temp: Current temperature
            target_temp: Target temperature

        Returns:
            Estimated preheat time in minutes, or None if insufficient data
        """
        metrics = self._zone_data.get(zone_id)
        if not metrics:
            return None

        return self._analyzer.estimate_preheat_time(current_temp, target_temp, metrics)
