"""Tado CE optimistic state management helpers — 3-layer stale data defense.

Single source of truth for optimistic state across ALL entity types
(climate, water_heater, select, switch).

3-layer defense strategy:
  Layer 1: Time-window freshness (_optimistic_set_at)
  Layer 2: Sequence numbers (_optimistic_sequence)
  Layer 3: Expected-state confirmation (_expected_* fields)
"""

from __future__ import annotations

from enum import Enum
import logging
import time
from typing import TYPE_CHECKING, Any

if TYPE_CHECKING:
    from homeassistant.core import HomeAssistant

    from .coordinator import TadoDataUpdateCoordinator

_LOGGER = logging.getLogger(__name__)

# All optimistic tracking fields across entity types.
# clear_optimistic_state() resets every field present on the entity to None.
_OPTIMISTIC_FIELDS = (
    # Universal fields (all entity types)
    "_optimistic_set_at",
    "_optimistic_sequence",
    "_optimistic_preserved",
    # Climate entities (heating.py, ac.py)
    "_expected_hvac_mode",
    "_expected_hvac_action",
    # Water heater entities
    "_expected_operation",
    "_expected_temperature",
    # Select entities
    "_expected_mode",
)


class OptimisticUpdateResult(Enum):
    """Result of optimistic update resolution."""

    ACCEPT_API = "accept_api"
    PRESERVE_OPTIMISTIC = "preserve"


def clear_optimistic_state(entity: object) -> None:
    """Clear all optimistic state tracking fields on an entity.

    Works for any entity type — only clears fields that exist on the entity.
    """
    for field in _OPTIMISTIC_FIELDS:
        if hasattr(entity, field):
            setattr(entity, field, None)


async def set_optimistic_fields(
    entity: object,
    coordinator: TadoDataUpdateCoordinator,
    *,
    expected: dict[str, Any] | None = None,
    preserved_attrs: dict[str, Any] | None = None,
) -> None:
    """Set optimistic tracking fields and mark entity as fresh.

    Universal helper for ALL entity types. Sets:
    1. _optimistic_set_at = current monotonic time
    2. _optimistic_sequence = next sequence from coordinator
    3. _expected_{key} = value for each key in ``expected``
    4. _optimistic_preserved = preserved_attrs (if provided)
    5. Marks entity as fresh in coordinator

    Args:
        entity: Any entity with optimistic tracking fields and an entity_id.
        coordinator: Data update coordinator for sequence numbers and freshness.
        expected: Mapping of field suffix → expected value.
            E.g. ``{"hvac_mode": HVACMode.HEAT}`` sets ``entity._expected_hvac_mode``.
        preserved_attrs: Optional extra attributes to preserve during the
            optimistic window (e.g. AC fan_mode/swing_mode).

    """
    entity._optimistic_set_at = time.monotonic()  # type: ignore[attr-defined]
    entity._optimistic_sequence = coordinator.get_next_sequence()  # type: ignore[attr-defined]

    if expected:
        for key, value in expected.items():
            setattr(entity, f"_expected_{key}", value)

    if preserved_attrs is not None:
        entity._optimistic_preserved = preserved_attrs  # type: ignore[attr-defined]

    # Layer 1: Mark entity as fresh — MUST await before async_write_ha_state()
    await coordinator.mark_entity_fresh(entity.entity_id)  # type: ignore[attr-defined]

    _LOGGER.debug(
        "%s: Set optimistic fields: expected=%s, seq=%s",
        getattr(entity, "_zone_name", entity.entity_id),  # type: ignore[attr-defined]
        expected,
        entity._optimistic_sequence,  # type: ignore[attr-defined]
    )


def is_within_optimistic_window(
    hass: HomeAssistant,
    optimistic_set_at: float | None,
    entry_id: str | None = None,
) -> bool:
    """Check if we're within the optimistic update window.

    Prevents stale API data from overwriting optimistic state.

    Args:
        hass: Home Assistant instance
        optimistic_set_at: Timestamp when optimistic state was set, or None
        entry_id: Optional config entry ID for per-entry lookup

    Returns:
        True if optimistic_set_at is set and elapsed time < optimistic window.
    """
    if optimistic_set_at is None:
        return False
    from .helpers import get_optimistic_window

    elapsed = time.monotonic() - optimistic_set_at
    return elapsed < get_optimistic_window(hass, entry_id=entry_id) if hass else elapsed < 17.0  # noqa: PLR2004 — fallback optimistic window seconds


def resolve_optimistic_update(
    entity: object,
    *,
    api_values: dict[str, Any],
    entry_id: str | None = None,
) -> OptimisticUpdateResult:
    """Resolve whether to preserve optimistic state or accept API values.

    Universal 3-layer resolution for ALL entity types.

    Layer 3 (sequence + expected state): If ``_optimistic_sequence`` is set,
    compare each ``api_values`` key against ``_expected_{key}`` on the entity.
    All must match for API confirmation.

    Layer 1 fallback (time window): If no sequence but ``_optimistic_set_at``
    is set, check the time-based optimistic window.

    A ``_expected_*`` field that is None means "don't check this field"
    (always considered matched).

    Args:
        entity: Any entity with optimistic tracking fields.
        api_values: Mapping of field suffix → API-reported value.
            E.g. ``{"hvac_mode": HVACMode.AUTO, "hvac_action": HVACAction.IDLE}``
            compares against ``entity._expected_hvac_mode`` and
            ``entity._expected_hvac_action``.
        entry_id: Optional config entry ID for time-window lookup.

    Returns:
        ``ACCEPT_API`` if no optimistic state or API confirmed expected values.
        ``PRESERVE_OPTIMISTIC`` if API hasn't confirmed yet.

    """
    seq = getattr(entity, "_optimistic_sequence", None)
    set_at = getattr(entity, "_optimistic_set_at", None)

    # No optimistic state active
    if seq is None and set_at is None:
        return OptimisticUpdateResult.ACCEPT_API

    # Layer 3: Sequence-based expected-state confirmation
    if seq is not None:
        all_confirmed = True
        for key, api_val in api_values.items():
            expected_val = getattr(entity, f"_expected_{key}", None)
            if expected_val is not None and expected_val != api_val:
                all_confirmed = False
                break

        if all_confirmed:
            _LOGGER.debug(
                "%s: API confirmed optimistic state, clearing",
                getattr(entity, "_zone_name", getattr(entity, "entity_id", "?")),
            )
            clear_optimistic_state(entity)
            return OptimisticUpdateResult.ACCEPT_API

        _LOGGER.debug(
            "%s: Preserving optimistic state (API not confirmed)",
            getattr(entity, "_zone_name", getattr(entity, "entity_id", "?")),
        )
        return OptimisticUpdateResult.PRESERVE_OPTIMISTIC

    # Layer 1 fallback: Time-window only (e.g. switch entities)
    hass = getattr(entity, "hass", None)
    if hass and is_within_optimistic_window(hass, set_at, entry_id=entry_id):
        _LOGGER.debug(
            "%s: Preserving optimistic state (within time window)",
            getattr(entity, "_zone_name", getattr(entity, "entity_id", "?")),
        )
        return OptimisticUpdateResult.PRESERVE_OPTIMISTIC

    # Window expired — clear stale tracking
    clear_optimistic_state(entity)
    return OptimisticUpdateResult.ACCEPT_API
