"""Tado CE unified data models — shared dataclasses for temperature readings.

Three dataclasses live here, each serving a distinct subsystem:

- ``HeatingCycleReading``  — heating cycle tracker (time + temp only).
- ``InsightTemperatureReading`` — insights engine (temp + humidity + timestamp).
- ``SmartComfortReading``  — smart comfort analyser (temp + heating context).

``HeatingCycleReading`` and ``InsightTemperatureReading`` look similar but carry
different fields because their consumers need different data: the heating cycle
tracker never uses humidity, while the insights engine requires it for mold /
condensation calculations.

Backward-compatible aliases are maintained in ``heating_models.py`` and
``insights_models.py`` so existing imports continue to work.
"""

from __future__ import annotations

from dataclasses import dataclass, fields
from datetime import datetime
from typing import Any, Self, get_type_hints

from .helpers import parse_iso_datetime


class _SerializableMixin:
    """Mixin for dataclasses with datetime fields — provides to_dict/from_dict."""

    def to_dict(self) -> dict[str, Any]:
        """Serialize to dictionary for JSON storage."""
        d = {}
        for f in fields(self):  # type: ignore[arg-type]
            v = getattr(self, f.name)
            d[f.name] = v.isoformat() if isinstance(v, datetime) else v
        return d

    @classmethod
    def from_dict(cls, data: dict[str, Any]) -> Self:
        """Deserialize from dictionary."""
        hints = get_type_hints(cls)
        kwargs = {}
        for f in fields(cls):  # type: ignore[arg-type]
            v = data.get(f.name)
            if v is not None and hints.get(f.name) is datetime:
                v = parse_iso_datetime(v)
            if v is not None:
                kwargs[f.name] = v
        return cls(**kwargs)


@dataclass
class HeatingCycleReading(_SerializableMixin):
    """Single temperature measurement during a heating cycle.

    Attributes:
    ----------
    time:
        UTC timestamp of the measurement.
    temp:
        Measured temperature in °C.

    Migrated from ``heating_models.py`` ``TemperatureReading``.
    """

    time: datetime  # UTC
    temp: float


@dataclass
class InsightTemperatureReading:
    """A temperature reading with timestamp for the insights engine.

    Includes humidity because mold-risk, condensation, and window-detection
    calculations all depend on it.

    Attributes:
    ----------
    temperature:
        Measured temperature in °C.
    humidity:
        Relative humidity in %, or ``None`` when the zone has no humidity sensor.
    timestamp:
        UTC timestamp of the measurement.

    Migrated from ``insights.py`` ``TemperatureReading``.
    """

    temperature: float
    humidity: float | None
    timestamp: datetime


@dataclass
class SmartComfortReading(_SerializableMixin):
    """A single temperature reading with heating context for comfort analysis.

    Attributes:
    ----------
    timestamp:
        UTC timestamp of the measurement.
    temperature:
        Measured temperature in °C.
    is_heating:
        ``True`` when the HVAC is actively heating or cooling.
    target_temperature:
        Current setpoint in °C, or ``None`` if unavailable.

    Migrated from ``smart_comfort.py`` ``TemperatureReading``.
    """

    timestamp: datetime
    temperature: float
    is_heating: bool  # True if HVAC is actively heating/cooling
    target_temperature: float | None = None
