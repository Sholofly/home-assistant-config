"""Tado CE state reconciler — merges local HomeKit reads with cloud API data."""

from __future__ import annotations

from datetime import timedelta
import logging
from typing import TYPE_CHECKING, Any, Final

from homeassistant.util import dt as dt_util

from .const import HOMEKIT_STALENESS_THRESHOLD

if TYPE_CHECKING:
    from .homekit_provider import HomeKitLocalProvider

_LOGGER = logging.getLogger(__name__)

# Re-exported for tests that imported it before the rename.
LOCAL_STALENESS_THRESHOLD = HOMEKIT_STALENESS_THRESHOLD

# After a local write, ignore cloud values that conflict for this long
# so the bridge's stale post-write read can't overwrite the user's
# fresh setpoint.
WRITE_PROTECTION_WINDOW: Final[timedelta] = timedelta(minutes=3)


class StateReconciler:
    """Decide whether each merged characteristic comes from HomeKit, cloud, or external."""

    def __init__(self) -> None:
        """Initialise the reconciler with no local provider attached."""
        self._local_provider: HomeKitLocalProvider | None = None
        self._write_timestamps: dict[str, Any] = {}
        # Tracks the previous merge source per (zone, characteristic)
        # so we can log only on cloud→homekit / homekit→cloud
        # transitions instead of every poll.
        self._prev_sources: dict[str, str] = {}

    @property
    def local_provider(self) -> HomeKitLocalProvider | None:
        """Return the attached local provider, or None when offline."""
        return self._local_provider

    @local_provider.setter
    def local_provider(self, provider: HomeKitLocalProvider | None) -> None:
        """Attach (or detach) the local HomeKit provider."""
        self._local_provider = provider

    def record_local_write(self, zone_id: str) -> None:
        """Stamp `zone_id` so cloud values are ignored until the window expires."""
        self._write_timestamps[zone_id] = dt_util.utcnow()

    def _get_fresh_local_value(
        self,
        zone_id: str,
        getter: str,
        freshness_mode: str = "observed",
    ) -> tuple[float | int | None, bool]:
        """Read a value from the local provider and decide whether it is fresh.

        `freshness_mode="observed"` keeps stable readings valid even
        when the value hasn't changed (useful for room temperature).
        `freshness_mode="changed"` rejects cache entries that haven't
        seen a real value change within the threshold — needed for
        event-driven signals like target temperature and mode where
        a stale "no change" cache would mask a fresh user-set value.
        """
        if not self._local_provider or not self._local_provider.is_connected:
            return None, False
        method = getattr(self._local_provider, getter)
        result = method(zone_id)
        if not isinstance(result, tuple) or len(result) != 3:
            return None, False
        value, changed_at, observed_at = result
        if value is None:
            return None, False
        reference = changed_at if freshness_mode == "changed" else observed_at
        if reference is None:
            return None, False
        age = dt_util.utcnow() - reference
        if age >= HOMEKIT_STALENESS_THRESHOLD:
            return None, False
        return value, True

    def _log_source_transition(
        self,
        zone_id: str,
        characteristic: str,
        new_source: str,
        value: float | int | None,
    ) -> None:
        """Log only when the merge source for a zone characteristic changes.

        Logging every poll would drown the debug log; only the
        cloud→homekit / homekit→cloud transitions are interesting.
        """
        key = f"{zone_id}_{characteristic}"
        prev_source = self._prev_sources.get(key)
        if prev_source != new_source:
            _LOGGER.debug(
                "State Reconciler: zone %s %s source %s → %s (value=%s)",
                zone_id, characteristic,
                prev_source or "none", new_source, value,
            )
            self._prev_sources[key] = new_source

    def merge_zone_temperature(
        self,
        zone_id: str,
        cloud_value: float | None,
        external_value: float | None = None,
    ) -> tuple[float | None, str]:
        """Return the merged room temperature and its source name.

        Priority: external sensor > HomeKit (when fresh) > cloud.
        """
        if external_value is not None:
            self._log_source_transition(zone_id, "temp", "external", external_value)
            return external_value, "external"

        local_val, is_fresh = self._get_fresh_local_value(zone_id, "get_temperature")
        if is_fresh and local_val is not None:
            self._log_source_transition(zone_id, "temp", "homekit", local_val)
            return local_val, "homekit"

        self._log_source_transition(zone_id, "temp", "cloud", cloud_value)
        return cloud_value, "cloud"

    def merge_zone_humidity(
        self,
        zone_id: str,
        cloud_value: float | None,
        external_value: float | None = None,
    ) -> tuple[float | None, str]:
        """Return the merged humidity reading and its source name.

        Priority: external sensor > cloud > HomeKit. Cloud beats
        HomeKit for humidity because the bridge caches humidity and
        returns stale readings that can drift 1-4% from the TRV's
        sensor; cloud delivers 0.1% precision with real-time updates.
        HomeKit stays as a fallback when cloud data is unavailable
        (sync failed). Temperature merges HomeKit-first because the
        push is real-time and accurate.
        """
        if external_value is not None:
            self._log_source_transition(zone_id, "humidity", "external", external_value)
            return external_value, "external"

        if cloud_value is not None:
            self._log_source_transition(zone_id, "humidity", "cloud", cloud_value)
            return cloud_value, "cloud"

        local_val, is_fresh = self._get_fresh_local_value(zone_id, "get_humidity")
        if is_fresh and local_val is not None:
            self._log_source_transition(zone_id, "humidity", "homekit", local_val)
            return local_val, "homekit"

        self._log_source_transition(zone_id, "humidity", "cloud", None)
        return None, "cloud"

    def merge_zone_target_temperature(
        self,
        zone_id: str,
        cloud_value: float | None,
    ) -> tuple[float | None, str]:
        """Return the merged target temperature and its source name.

        Priority: HomeKit (when fresh and outside the write-protection
        window) > cloud. During write protection the cloud / optimistic
        value is authoritative because the HomeKit bridge can still
        report a pre-write target value.
        """
        if not self.should_accept_cloud_value(zone_id):
            self._log_source_transition(zone_id, "target_temp", "cloud", cloud_value)
            return cloud_value, "cloud"

        local_val, is_fresh = self._get_fresh_local_value(
            zone_id, "get_target_temperature", freshness_mode="changed",
        )
        if is_fresh and local_val is not None:
            self._log_source_transition(zone_id, "target_temp", "homekit", local_val)
            return local_val, "homekit"

        self._log_source_transition(zone_id, "target_temp", "cloud", cloud_value)
        return cloud_value, "cloud"

    def merge_zone_hvac_state(
        self,
        zone_id: str,
        cloud_value: int | None,
    ) -> tuple[int | None, str]:
        """Return the merged HVAC state (0=Off, 1=Heat, 2=Cool) and its source.

        Priority: HomeKit (when fresh) > cloud.
        """
        local_val, is_fresh = self._get_fresh_local_value(zone_id, "get_hvac_state")
        if is_fresh and local_val is not None:
            self._log_source_transition(zone_id, "hvac_state", "homekit", int(local_val))
            return int(local_val), "homekit"

        self._log_source_transition(zone_id, "hvac_state", "cloud", cloud_value)
        return cloud_value, "cloud"

    def merge_zone_target_heating_state(
        self,
        zone_id: str,
        cloud_value: int | None,
    ) -> tuple[int | None, str]:
        """Return the merged target HVAC mode and its source name.

        Priority: HomeKit (when fresh and outside write protection) >
        cloud. During write protection the cloud / optimistic value is
        authoritative — see merge_zone_target_temperature for the
        same reason.
        """
        if not self.should_accept_cloud_value(zone_id):
            self._log_source_transition(zone_id, "target_hvac", "cloud", cloud_value)
            return cloud_value, "cloud"

        local_val, is_fresh = self._get_fresh_local_value(
            zone_id, "get_target_heating_state", freshness_mode="changed",
        )
        if is_fresh and local_val is not None:
            self._log_source_transition(zone_id, "target_hvac", "homekit", int(local_val))
            return int(local_val), "homekit"

        self._log_source_transition(zone_id, "target_hvac", "cloud", cloud_value)
        return cloud_value, "cloud"

    def should_accept_cloud_value(self, zone_id: str) -> bool:
        """Return True when no recent local write blocks cloud values for this zone."""
        last_write = self._write_timestamps.get(zone_id)
        if last_write is None:
            return True
        age = dt_util.utcnow() - last_write
        if age >= WRITE_PROTECTION_WINDOW:
            del self._write_timestamps[zone_id]
            return True
        _LOGGER.debug(
            "State Reconciler: zone %s write protection active "
            "(%.0fs remaining)",
            zone_id,
            (WRITE_PROTECTION_WINDOW - age).total_seconds(),
        )
        return False
