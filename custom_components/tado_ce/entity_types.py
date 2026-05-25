"""Public contract Protocols for Tado CE entity access.

Used by services.py to resolve zone_id / zone_type / entity_type from
entities without reaching into private attributes. Every climate /
water heater entity class exposes these as @property wrapping the
internal _zone_id / _entity_type / etc fields.

Rule for contributors: when writing new cross-module code that needs
zone_id from an entity, use `ent.zone_id` — never `ent._zone_id` or
`getattr(ent, "_zone_id", None)`.
"""

from __future__ import annotations

from typing import Protocol, runtime_checkable


@runtime_checkable
class TadoZoneEntity(Protocol):
    """Protocol for Tado entities scoped to a specific zone.

    Implemented by climate / water_heater entity classes. The services
    layer relies on these public properties instead of reading private
    attributes — protects services.py from entity-class refactors.

    Marked ``runtime_checkable`` so callers can use ``isinstance`` guards
    at service entry points if desired.
    """

    @property
    def zone_id(self) -> str:
        """Return the Tado zone ID as a string."""
        ...

    @property
    def zone_type(self) -> str:
        """Return the zone type: HEATING / AIR_CONDITIONING / HOT_WATER."""
        ...

    @property
    def entity_type(self) -> str:
        """Return the entity type tag for state-capture routing.

        One of: climate_heating / climate_ac / water_heater.
        """
        ...
