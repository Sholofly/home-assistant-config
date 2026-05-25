"""Tado CE heating cycle data models — HeatingCycle, HeatingCycleConfig."""

from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime
from typing import Any

from .helpers import parse_iso_datetime
from .models import HeatingCycleReading

__all__ = ["HeatingCycle", "HeatingCycleConfig", "HeatingCycleReading"]


@dataclass
class HeatingCycle:
    """Represents a complete heating cycle."""

    zone_id: str
    start_time: datetime  # UTC
    end_time: datetime | None  # UTC, None if active
    start_temp: float | None  # Set on first temperature update
    target_temp: float
    first_rise_time: datetime | None  # UTC, when temp first increased by threshold
    first_rise_temp: float | None
    temperature_readings: list[HeatingCycleReading]  # Limited to 100 readings max
    completed: bool
    interrupted: bool
    interrupt_reason: str | None

    def to_dict(self) -> dict[str, Any]:
        """Serialize to dictionary for JSON storage."""
        return {
            "zone_id": self.zone_id,
            "start_time": self.start_time.isoformat(),
            "end_time": self.end_time.isoformat() if self.end_time else None,
            "start_temp": self.start_temp,
            "target_temp": self.target_temp,
            "first_rise_time": self.first_rise_time.isoformat() if self.first_rise_time else None,
            "first_rise_temp": self.first_rise_temp,
            "temperature_readings": [r.to_dict() for r in self.temperature_readings],
            "completed": self.completed,
            "interrupted": self.interrupted,
            "interrupt_reason": self.interrupt_reason,
        }

    @classmethod
    def from_dict(cls, data: dict[str, Any]) -> HeatingCycle:
        """Deserialize from dictionary."""
        return cls(
            zone_id=data["zone_id"],
            start_time=parse_iso_datetime(data["start_time"]),
            end_time=parse_iso_datetime(data["end_time"]) if data["end_time"] else None,
            start_temp=data["start_temp"],
            target_temp=data["target_temp"],
            first_rise_time=parse_iso_datetime(data["first_rise_time"]) if data["first_rise_time"] else None,
            first_rise_temp=data["first_rise_temp"],
            temperature_readings=[HeatingCycleReading.from_dict(r) for r in data["temperature_readings"]],
            completed=data["completed"],
            interrupted=data["interrupted"],
            interrupt_reason=data["interrupt_reason"],
        )


@dataclass
class HeatingCycleConfig:
    """Configuration for heating cycle analysis."""

    enabled: bool = True
    rolling_window_days: int = 7
    inertia_threshold_celsius: float = 0.1
    min_cycles: int = 3

    def validate(self) -> None:
        """Validate configuration values."""
        if not 1 <= self.rolling_window_days <= 30:
            raise ValueError("rolling_window_days must be between 1 and 30")
        if not 0.05 <= self.inertia_threshold_celsius <= 0.5:
            raise ValueError("inertia_threshold_celsius must be between 0.05 and 0.5")
        if not 1 <= self.min_cycles <= 10:
            raise ValueError("min_cycles must be between 1 and 10")
