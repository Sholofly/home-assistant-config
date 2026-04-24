"""Tado CE Select Platform — Presence Mode, Overlay Mode, Timer Duration."""  # HA entity pattern

from __future__ import annotations

import logging
from typing import TYPE_CHECKING, Any

from homeassistant.components.select import SelectEntity
from homeassistant.core import HomeAssistant, callback
from homeassistant.exceptions import HomeAssistantError
from homeassistant.helpers.update_coordinator import CoordinatorEntity

from .const import (
    DOMAIN,
    OVERLAY_MODE_DEFAULT,
    OVERLAY_MODE_DEFAULT_DISPLAY,
    OVERLAY_MODE_MAP,
    OVERLAY_MODE_OPTIONS,
    OVERLAY_MODE_REVERSE_MAP,
    TIMER_DURATION_DEFAULT,
    TIMER_DURATION_OPTIONS,
)
from .device_manager import get_hub_device_info
from .entity_registry import ENTITY_REGISTRY, get_entity_category
from .helpers import async_trigger_immediate_refresh
from .optimistic_helpers import (
    OptimisticUpdateResult,
    clear_optimistic_state,
    resolve_optimistic_update,
    set_optimistic_fields,
)
from .ratelimit import async_check_bootstrap_reserve_or_raise as _check_bootstrap_reserve_or_raise

if TYPE_CHECKING:
    from homeassistant.helpers.entity_platform import AddConfigEntryEntitiesCallback

    from .coordinator import TadoConfigEntry, TadoDataUpdateCoordinator

_LOGGER = logging.getLogger(__name__)

PARALLEL_UPDATES = 1


async def async_setup_entry(
    hass: HomeAssistant,
    entry: TadoConfigEntry,
    async_add_entities: AddConfigEntryEntitiesCallback,
) -> None:
    """Set up Tado CE select entities from a config entry."""
    _LOGGER.debug("Tado CE select: Setting up...")
    coordinator = entry.runtime_data
    home_id = coordinator.home_id

    entities = []

    # Add Presence Mode select (global, 1 API call per change)
    entities.append(TadoPresenceModeSelect(coordinator, home_id))

    # Add Overlay Mode select
    # 0 API calls - purely local setting
    entities.append(TadoOverlayModeSelect(coordinator, home_id))  # type: ignore[arg-type]

    # Add Timer Duration select (for Timer overlay mode)
    # 0 API calls - purely local setting
    entities.append(TadoTimerDurationSelect(coordinator, home_id))  # type: ignore[arg-type]

    if entities:
        async_add_entities(entities, True)
        _LOGGER.info("Tado CE select entities loaded: %s", len(entities))



class TadoPresenceModeSelect(CoordinatorEntity["TadoDataUpdateCoordinator"], SelectEntity):
    """TadoPresenceModeSelect."""

    _attr_has_entity_name = True

    """Tado CE Presence Mode Select Entity.

    Allows control of presence mode: auto (geofencing), home, away.

    3-layer defense for optimistic state management:
    - Layer 1: _optimistic_set_at freshness tracking
    - Layer 2: Sequence numbers via get_next_sequence()
    - Layer 3: Expected state confirmation

    Uses 1 API call per change.
    """

    _attr_options: list[str] = ["auto", "home", "away"]
    _attr_translation_key = "presence_mode"

    def __init__(self, coordinator: TadoDataUpdateCoordinator, home_id: str) -> None:
        """Initialize."""
        super().__init__(coordinator)
        _meta = ENTITY_REGISTRY["select_presence_mode"]
        self._entry_id = coordinator.config_entry.entry_id
        self._attr_unique_id = f"tado_ce_{home_id}_{_meta.unique_id_suffix}"
        if _meta.translation_key is not None:
            self._attr_translation_key = _meta.translation_key
        self._attr_current_option = "auto"
        self._attr_available = True
        self._attr_device_info = get_hub_device_info(home_id)

        # State tracking
        self._presence = "HOME"
        self._presence_locked = False

        # 3-layer defense (parity with climate/water_heater)
        self._optimistic_set_at: float | None = None
        self._optimistic_sequence: int | None = None
        self._expected_mode: str | None = None

    @property
    def icon(self) -> str | None:
        """Return icon based on current mode."""
        if self._attr_current_option == "auto":
            return "mdi:home-account"
        if self._attr_current_option == "home":
            return "mdi:home"
        # Away
        return "mdi:home-export-outline"

    @property
    def extra_state_attributes(self) -> dict[str, Any] | None:
        """Return extra state attributes."""
        return {
            "presence": self._presence,
            "presence_locked": self._presence_locked,
            "automatic_geofencing": not self._presence_locked,
            "api_calls_per_change": 1,
        }

    @callback
    def _handle_coordinator_update(self) -> None:
        """Handle coordinator data update.

        CoordinatorEntity calls this automatically.
        """
        self.update()
        self.async_write_ha_state()

    @callback
    def update(self) -> None:
        """Update state from home_state.json.

        Uses shared resolve_optimistic_update() for 3-layer defense.
        """
        try:
            coord_data = self.coordinator.data or {}
            home_state = coord_data.get("home_state")
            if not home_state:
                return

            api_presence = home_state.get("presence", "HOME")
            api_locked = home_state.get("presenceLocked", False)

            # Determine what mode API is showing
            if not api_locked:
                api_mode = "auto"
            elif api_presence == "HOME":
                api_mode = "home"
            else:
                api_mode = "away"

            # Resolve optimistic state using shared helper
            result = resolve_optimistic_update(
                self,
                api_values={"mode": api_mode},
                entry_id=self._entry_id,
            )

            if result == OptimisticUpdateResult.PRESERVE_OPTIMISTIC:
                _LOGGER.debug(
                    "Presence Mode: Preserving optimistic state (expected=%s, api=%s)",
                    self._expected_mode,
                    api_mode,
                )
                return

            # Update from API
            self._presence = api_presence
            self._presence_locked = api_locked
            self._attr_current_option = api_mode

        except (AttributeError, TypeError, KeyError) as e:
            _LOGGER.warning("Failed to update presence mode: %s", e)
            # Keep last known state

    async def async_select_option(self, option: str) -> None:
        """Select presence mode with 3-layer defense.

        Bootstrap Reserve check
        Full 3-layer optimistic update
        """
        await _check_bootstrap_reserve_or_raise(self.hass, "Presence Mode", coordinator=self.coordinator)

        old_mode = self._attr_current_option
        old_presence = self._presence
        old_locked = self._presence_locked

        # Optimistic update BEFORE API call
        self._attr_current_option = option

        # Update internal state optimistically
        if option == "auto":
            self._presence_locked = False
        else:
            self._presence_locked = True
            self._presence = option.upper()

        # Set optimistic fields using shared helper
        await set_optimistic_fields(
            self, self.coordinator,
            expected={"mode": option},
        )

        self.async_write_ha_state()

        # API call - normalize to lowercase for API
        option_lower = option.lower()
        client = self.coordinator.api_client
        if option_lower == "auto":
            success = await client.delete_presence_lock()
        else:
            success = await client.set_presence_lock(option.upper())

        if success:
            _LOGGER.info("Set presence mode to %s", option)
            await async_trigger_immediate_refresh(
                self.hass, self.entity_id, f"presence_mode_{option}", include_home_state=True,
            )
        else:
            # Rollback on failure
            _LOGGER.warning("ROLLBACK: Presence mode %s failed", option)
            self._attr_current_option = old_mode
            self._presence = old_presence
            self._presence_locked = old_locked
            clear_optimistic_state(self)
            self.async_write_ha_state()
            raise HomeAssistantError(
                f"Set presence mode to {option} failed",
                translation_domain=DOMAIN,
            )


class TadoOverlayModeSelect(CoordinatorEntity["TadoDataUpdateCoordinator"], SelectEntity):
    """TadoOverlayModeSelect."""

    _attr_has_entity_name = True

    """Tado CE Overlay Mode Select Entity.

    Allows control of overlay termination type for manual temperature changes.
    Configurable overlay mode.

    Options:
    - Tado Mode: Follows per-device "Manual Control" settings in Tado app
    - Next Time Block: Override lasts until next scheduled change
    - Timer: Override lasts for specified duration (see Timer Duration)
    - Manual: Infinite override until user manually changes

    Uses 0 API calls - purely local setting stored in .storage/tado_ce/.

    Uses hass.data cache to avoid blocking I/O in update(),
    and async_add_executor_job for file saves.
    """

    _attr_options = OVERLAY_MODE_OPTIONS
    _attr_translation_key = "overlay_mode"

    def __init__(self, coordinator: TadoDataUpdateCoordinator, home_id: str) -> None:
        """Initialize."""
        super().__init__(coordinator)
        _meta = ENTITY_REGISTRY["select_overlay_mode"]
        self._entry_id = coordinator.config_entry.entry_id
        self._attr_unique_id = f"tado_ce_{home_id}_{_meta.unique_id_suffix}"
        if _meta.translation_key is not None:
            self._attr_translation_key = _meta.translation_key
        self._attr_entity_category = get_entity_category(_meta)
        self._attr_current_option = OVERLAY_MODE_DEFAULT_DISPLAY
        self._attr_available = True
        self._attr_device_info = get_hub_device_info(home_id)
        self._attr_icon = _meta.icon

    @property
    def extra_state_attributes(self) -> dict[str, Any] | None:
        """Return extra state attributes."""
        return {
            "description": "Controls how long manual temperature changes last",
            "tado_mode_info": "Follows per-device settings in Tado app",
            "next_time_block_info": "Until next scheduled change",
            "timer_info": "For specified duration (see Timer Duration)",
            "manual_info": "Until you manually change back",
            "api_calls_per_change": 0,
        }

    @callback
    def _handle_coordinator_update(self) -> None:
        """Handle coordinator data update.

        CoordinatorEntity calls this automatically.
        """
        self.update()
        self.async_write_ha_state()

    @callback
    def update(self) -> None:
        """Load overlay mode from coordinator cache.

        Reads from coordinator cache instead of hass.data.
        """
        try:
            overlay_mode = self.coordinator.overlay_mode or OVERLAY_MODE_DEFAULT
            self._attr_current_option = OVERLAY_MODE_REVERSE_MAP.get(overlay_mode, OVERLAY_MODE_DEFAULT_DISPLAY)
        except (AttributeError, TypeError) as e:
            _LOGGER.warning("Failed to get overlay mode from cache: %s", e)
            # Keep current option

    async def async_select_option(self, option: str) -> None:
        """Select overlay mode (local only, no API call)."""
        # Update state immediately
        self._attr_current_option = option
        self.async_write_ha_state()

        # Save to storage (non-blocking)
        api_mode = OVERLAY_MODE_MAP.get(option, OVERLAY_MODE_DEFAULT)
        success = self.coordinator.data_loader.save_overlay_mode(api_mode)

        if success:
            # Update coordinator cache
            self.coordinator.overlay_mode = api_mode
            _LOGGER.info("Overlay mode set to %s (%s)", option, api_mode)
        else:
            _LOGGER.error("Failed to save overlay mode: %s", option)


class TadoTimerDurationSelect(CoordinatorEntity["TadoDataUpdateCoordinator"], SelectEntity):
    """TadoTimerDurationSelect."""

    _attr_has_entity_name = True

    """Tado CE Timer Duration Select Entity.

    Controls how long Timer overlay mode lasts.
    Only relevant when Overlay Mode = Timer.

    Added for consistency with per-zone config.
    """

    _attr_options = TIMER_DURATION_OPTIONS
    _attr_translation_key = "timer_duration"

    def __init__(self, coordinator: TadoDataUpdateCoordinator, home_id: str) -> None:
        """Initialize."""
        super().__init__(coordinator)
        _meta = ENTITY_REGISTRY["select_timer_duration"]
        self._entry_id = coordinator.config_entry.entry_id
        self._attr_unique_id = f"tado_ce_{home_id}_{_meta.unique_id_suffix}"
        if _meta.translation_key is not None:
            self._attr_translation_key = _meta.translation_key
        self._attr_entity_category = get_entity_category(_meta)
        self._attr_current_option = str(TIMER_DURATION_DEFAULT)
        self._attr_available = True
        self._attr_device_info = get_hub_device_info(home_id)
        self._attr_icon = _meta.icon
        self._attr_unit_of_measurement = "min"

    @property
    def extra_state_attributes(self) -> dict[str, Any] | None:
        """Return extra state attributes."""
        return {
            "description": "Duration for Timer overlay mode",
            "unit": "minutes",
            "api_calls_per_change": 0,
        }

    @callback
    def _handle_coordinator_update(self) -> None:
        """Handle coordinator data update.

        CoordinatorEntity calls this automatically.
        """
        self.update()
        self.async_write_ha_state()

    @callback
    def update(self) -> None:
        """Load timer duration from coordinator cache."""
        try:
            duration = self.coordinator.timer_duration or TIMER_DURATION_DEFAULT
            self._attr_current_option = str(duration)
        except (AttributeError, TypeError) as e:
            _LOGGER.warning("Failed to get timer duration from cache: %s", e)

    async def async_select_option(self, option: str) -> None:
        """Select timer duration (local only, no API call)."""
        # Update state immediately
        self._attr_current_option = option
        self.async_write_ha_state()

        # Save to storage (non-blocking)
        duration = int(option)
        success = self.coordinator.data_loader.save_timer_duration(duration)

        if success:
            # Update coordinator cache
            self.coordinator.timer_duration = duration
            _LOGGER.info("Timer duration set to %s minutes", duration)
        else:
            _LOGGER.error("Failed to save timer duration: %s", option)
