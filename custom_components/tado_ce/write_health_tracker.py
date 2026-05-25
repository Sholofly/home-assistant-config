"""Tado CE write-health tracker — circuit breaker for HomeKit write attempts.

Standard three-state circuit-breaker pattern. CLOSED lets writes
through, OPEN skips them after `WRITE_FAILURE_THRESHOLD` consecutive
failures, HALF_OPEN lets one probe through after the cooldown to
test recovery before fully closing.
"""

from __future__ import annotations

import enum
import logging
import time

from .const import WRITE_CIRCUIT_OPEN_SECONDS, WRITE_FAILURE_THRESHOLD

_LOGGER = logging.getLogger(__name__)


class CircuitState(enum.Enum):
    """Three states a write-health circuit can be in."""

    CLOSED = "closed"
    OPEN = "open"
    HALF_OPEN = "half_open"


class WriteHealthTracker:
    """Track consecutive HomeKit write failures and gate further attempts."""

    def __init__(self) -> None:
        """Start with a closed circuit and zero recorded failures."""
        self._consecutive_failures: int = 0
        self._circuit_opened_at: float | None = None
        self._state: CircuitState = CircuitState.CLOSED

    @property
    def state(self) -> CircuitState:
        """Return current state, transitioning OPEN → HALF_OPEN once cooldown elapsed."""
        if self._state == CircuitState.OPEN and self._circuit_opened_at is not None:
            elapsed = time.monotonic() - self._circuit_opened_at
            if elapsed >= WRITE_CIRCUIT_OPEN_SECONDS:
                self._state = CircuitState.HALF_OPEN
        return self._state

    @property
    def consecutive_failures(self) -> int:
        """Return the current consecutive failure count."""
        return self._consecutive_failures

    def should_try_homekit(self) -> bool:
        """Return True when the circuit allows another HomeKit write attempt."""
        return self.state in (CircuitState.CLOSED, CircuitState.HALF_OPEN)

    def record_success(self) -> None:
        """Record a successful write — closes the circuit and clears the failure count."""
        self._consecutive_failures = 0
        self._circuit_opened_at = None
        self._state = CircuitState.CLOSED

    def record_failure(self) -> None:
        """Record a failed write — opens the circuit at the threshold."""
        self._consecutive_failures += 1
        if self._state == CircuitState.HALF_OPEN:
            self._circuit_opened_at = time.monotonic()
            self._state = CircuitState.OPEN
            _LOGGER.debug(
                "Write Health: probe write failed — re-opening circuit "
                "(consecutive failures=%d)",
                self._consecutive_failures,
            )
        elif self._consecutive_failures >= WRITE_FAILURE_THRESHOLD:
            self._circuit_opened_at = time.monotonic()
            self._state = CircuitState.OPEN
            _LOGGER.warning(
                "Write Health: HomeKit writes paused after %d consecutive "
                "failures — falling back to cloud writes until the bridge "
                "recovers",
                self._consecutive_failures,
            )

    def reset(self) -> None:
        """Reset to a clean closed state (e.g. on bridge reconnect)."""
        self._consecutive_failures = 0
        self._circuit_opened_at = None
        self._state = CircuitState.CLOSED
