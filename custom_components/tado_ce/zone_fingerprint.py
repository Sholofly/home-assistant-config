"""Detect Tado-side zone-id changes between coordinator polls."""

from __future__ import annotations

from dataclasses import dataclass
from typing import Any


@dataclass(frozen=True, slots=True)
class ZoneFingerprintDelta:
    """Per-poll diff of the zone-id set."""

    added: frozenset[str]
    removed: frozenset[str]
    is_first_poll: bool
    is_empty_response: bool


class ZoneFingerprintTracker:
    """Diff `zoneStates.keys()` against the previous snapshot."""

    def __init__(self) -> None:
        """Initialise with no baseline."""
        self._previous: frozenset[str] | None = None

    def update(self, zone_states: dict[str, Any] | None) -> ZoneFingerprintDelta:
        """Record the current zone-id set and return the delta versus the previous one."""
        is_first = self._previous is None

        if not zone_states:
            return ZoneFingerprintDelta(
                added=frozenset(),
                removed=frozenset(),
                is_first_poll=is_first,
                is_empty_response=True,
            )

        current = frozenset(zone_states.keys())
        previous = self._previous if self._previous is not None else current
        delta = ZoneFingerprintDelta(
            added=current - previous,
            removed=previous - current,
            is_first_poll=is_first,
            is_empty_response=False,
        )
        self._previous = current
        return delta
