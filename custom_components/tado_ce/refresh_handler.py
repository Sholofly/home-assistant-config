"""Tado CE Immediate Refresh Handler — per-entity rate limiting and debounce.

Per-entity rate limiting and debounce for user-initiated state changes.
"""

from __future__ import annotations

import asyncio
from datetime import datetime
import logging
from typing import TYPE_CHECKING, Any

from homeassistant.util import dt as dt_util

if TYPE_CHECKING:
    from .coordinator import TadoDataUpdateCoordinator

_LOGGER = logging.getLogger(__name__)

# Entity types that should trigger immediate refresh
REFRESH_ENTITY_TYPES = {
    "climate",  # Temperature and HVAC mode changes
    "switch",  # Switch toggles
    "water_heater",  # Hot water state changes
    "select",  # Presence mode changes
}

# Rate limiting thresholds
QUOTA_WARNING_THRESHOLD = 0.8  # 80% quota used
QUOTA_CRITICAL_THRESHOLD = 0.9  # 90% quota used
MIN_QUOTA_PERCENTAGE_FOR_REFRESH = 0.10  # Minimum 10% remaining to allow refresh


class RefreshHandler:
    """Handle immediate data refresh after user actions.

    Accepts coordinator instead of hass/entry_id.
    Uses coordinator.async_request_refresh() for data refresh — CoordinatorEntity
    handles entity update propagation automatically.
    """

    def __init__(self, coordinator: TadoDataUpdateCoordinator) -> None:
        """Initialize immediate refresh handler.

        Args:
            coordinator: TadoDataUpdateCoordinator instance for this config entry.
                         Provides hass, api_client, data_loader, config_manager access.
        """
        self._coordinator = coordinator
        self.hass = coordinator.hass
        # Per-entity rate limiting
        self._last_refresh_per_entity: dict[str, datetime] = {}
        self._global_last_refresh: datetime | None = None
        self._min_global_interval = 2
        self._min_per_entity_interval = 2  # Per-entity minimum (seconds)
        self._consecutive_failures = 0
        self._max_backoff_interval = 300  # Max 5 minutes backoff

        # Debounce mechanism for batch updates
        self._pending_refresh: bool = False
        self._pending_home_state_refresh: bool = False  # Track if home state refresh needed
        self._debounce_task: object | None = None
        self._debounce_delay = 15.0  # Configurable via options

    def _get_debounce_delay(self) -> float:
        """Get debounce delay from config or use default.

        Configurable via Options > Refresh Debounce Delay
        Direct coordinator.config_manager access.
        """
        try:
            return float(self._coordinator.config_manager.get_refresh_debounce_seconds())
        except Exception as e:  # noqa: BLE001 — defensive config access, must not crash refresh
            _LOGGER.debug("Could not get debounce config, using default: %s", e)
        return self._debounce_delay

    def cancel(self) -> None:
        """Cancel pending debounce task and clean up."""
        if self._debounce_task is not None:
            self._debounce_task.cancel()  # type: ignore[union-attr]
            self._debounce_task = None

    async def _get_rate_limit_info(self) -> dict[str, Any]:
        """Get current rate limit information.

        Direct coordinator.data_loader access.

        Returns:
            Dictionary with rate limit info, or empty dict if unavailable
        """
        try:
            return (
                await self.hass.async_add_executor_job(
                    self._coordinator.data_loader.load_ratelimit_file,
                )
                or {}
            )
        except Exception as e:  # noqa: BLE001 — defensive I/O, must not crash refresh handler
            _LOGGER.debug("Failed to read rate limit file: %s", e)
        return {}

    async def _check_quota_available(self) -> tuple[bool, str]:
        """Check if sufficient API quota is available.

        Returns:
            Tuple of (can_refresh, reason)
        """
        rl_info = await self._get_rate_limit_info()

        # If no rate limit info, allow refresh (fail open)
        if not rl_info:
            return True, "no_rate_limit_data"

        remaining = rl_info.get("remaining")
        limit = rl_info.get("limit")
        status = rl_info.get("status")

        # Check if rate limited
        if status == "rate_limited" or remaining == 0:
            return False, "rate_limited"

        # Check percentage thresholds (dynamic based on actual limit)
        if limit and remaining is not None:
            percentage_remaining = remaining / limit
            percentage_used = 1 - percentage_remaining

            # Skip refresh if less than 10% quota remaining
            if percentage_remaining < MIN_QUOTA_PERCENTAGE_FOR_REFRESH:
                return False, f"quota_too_low ({int(percentage_remaining * 100)}% remaining)"

            if percentage_used >= QUOTA_CRITICAL_THRESHOLD:
                return False, f"quota_critical ({int(percentage_used * 100)}% used)"

            if percentage_used >= QUOTA_WARNING_THRESHOLD:
                _LOGGER.warning(
                    "API quota warning: %s%% used (%s/%s remaining)",
                    int(percentage_used * 100),
                    remaining,
                    limit,
                )

        return True, "ok"

    def _get_backoff_interval(self) -> int:
        """Calculate backoff interval based on consecutive failures.

        Returns:
            Backoff interval in seconds
        """
        if self._consecutive_failures == 0:
            return self._min_global_interval

        # Exponential backoff: 10s, 20s, 40s, 80s, 160s, 300s (max)
        backoff = self._min_global_interval * (2**self._consecutive_failures)
        return min(backoff, self._max_backoff_interval)  # type: ignore[no-any-return]

    def should_refresh(self, entity_id: str) -> bool:
        """Check if entity type should trigger immediate refresh.

        Args:
            entity_id: Entity ID (e.g., "climate.living_room")

        Returns:
            True if entity type should trigger refresh
        """
        domain = entity_id.split(".", maxsplit=1)[0]
        return domain in REFRESH_ENTITY_TYPES


    async def _execute_debounced_refresh(self, reason: str, skip_debounce: bool) -> None:
        """Execute the actual debounced refresh after delay."""
        try:
            if not skip_debounce:
                delay = self._get_debounce_delay()
                await asyncio.sleep(delay)

            if not self._pending_refresh:
                return

            self._pending_refresh = False

            now = dt_util.utcnow()
            if self._global_last_refresh:
                global_elapsed = (now - self._global_last_refresh).total_seconds()
                required_global = self._get_backoff_interval()
                if global_elapsed < required_global:
                    _LOGGER.debug("Global backoff active: %ss remaining", int(required_global - global_elapsed))
                    return

            _LOGGER.info("Executing debounced refresh (triggered by: %s)", reason)

            try:
                await self._coordinator.async_request_refresh()
                self._global_last_refresh = dt_util.utcnow()

                if self._consecutive_failures > 0:
                    _LOGGER.info("Immediate refresh recovered after %s failures", self._consecutive_failures)
                    self._consecutive_failures = 0

                _LOGGER.debug("Immediate refresh completed via coordinator")

            except Exception:
                self._consecutive_failures += 1
                _LOGGER.exception(
                    "Immediate refresh failed (attempt %s). Next backoff: %ss",
                    self._consecutive_failures, self._get_backoff_interval(),
                )
        finally:
            self._debounce_task = None

    async def trigger_refresh(
        self,
        entity_id: str,
        reason: str = "state_change",
        force: bool = False,
        skip_debounce: bool = False,
        include_home_state: bool = False,
    ) -> None:
        """Trigger immediate refresh for an entity.

        Uses debouncing to batch multiple rapid changes into a single refresh.

        Args:
            entity_id: Entity ID that triggered the refresh
            reason: Reason for refresh (for logging)
            force: If True, skip entity type check (for buttons like Resume All Schedules)
            skip_debounce: If True, execute refresh immediately without debounce delay
            include_home_state: If True, also fetch home state (for presence mode changes)
        """
        if not force and not self.should_refresh(entity_id):
            _LOGGER.debug("Entity %s does not trigger immediate refresh", entity_id)
            return

        can_refresh, quota_reason = await self._check_quota_available()
        if not can_refresh:
            _LOGGER.debug(
                "Skipping immediate refresh for %s: %s. Will rely on normal polling.",
                entity_id, quota_reason,
            )
            return

        _LOGGER.debug("Scheduling debounced refresh for %s (reason: %s)", entity_id, reason)

        if self._debounce_task is not None:
            self._debounce_task.cancel()  # type: ignore[attr-defined]
            self._debounce_task = None

        self._pending_refresh = True
        self._last_refresh_per_entity[entity_id] = dt_util.utcnow()
        self._pending_home_state_refresh = include_home_state

        self._debounce_task = asyncio.create_task(
            self._execute_debounced_refresh(reason, skip_debounce),
        )
