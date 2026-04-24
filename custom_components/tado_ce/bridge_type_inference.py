"""Bridge API field type inference engine — pure functions, zero HA dependency.

Infers HA metadata (device_class, state_class, unit, icon) from field path
and value type when a field has no enrichment registry entry.
"""

from __future__ import annotations

from dataclasses import dataclass
import re
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from .bridge_discovery import DiscoveredField

# ---------------------------------------------------------------------------
# Dataclass
# ---------------------------------------------------------------------------


@dataclass(frozen=True, slots=True)
class InferredMetadata:
    """Represent inferred HA metadata for an unknown field."""

    device_class: str | None = None
    state_class: str | None = None
    unit_of_measurement: str | None = None
    icon: str | None = None


# ---------------------------------------------------------------------------
# Internal helpers
# ---------------------------------------------------------------------------

_SCREAMING_RE = re.compile(r"^[A-Z][A-Z0-9_]+$")

_TEMP_KEYWORDS = frozenset({"temperature", "celsius"})


def _path_contains_temp_keyword(path: str) -> bool:
    """Check if any segment of the dot-path contains temperature keywords."""
    lower = path.lower()
    return any(kw in lower for kw in _TEMP_KEYWORDS)


def _path_contains_timestamp(path: str) -> bool:
    """Check if any segment of the dot-path contains 'timestamp'."""
    return "timestamp" in path.lower()


def _screaming_to_title(value: str) -> str:
    """Convert SCREAMING_SNAKE_CASE to Title Case.

    e.g. "INSTALLATION_COMPLETED" -> "Installation Completed"
    """
    return value.replace("_", " ").title()


# ---------------------------------------------------------------------------
# Public functions
# ---------------------------------------------------------------------------


def infer_metadata(field: DiscoveredField) -> InferredMetadata:
    """Infer HA metadata from field path and value type.

    Priority rules:
    1. Path contains "temperature" or "celsius" + numeric -> TEMPERATURE + °C
    2. Path contains "timestamp" -> TIMESTAMP device_class
    3. Boolean value -> diagnostic icon
    4. Numeric value -> MEASUREMENT state_class
    5. Everything else -> generic diagnostic
    """
    # Rule 1: temperature/celsius + numeric
    if field.value_type == "number" and _path_contains_temp_keyword(field.path):
        return InferredMetadata(
            device_class="temperature",
            state_class="measurement",
            unit_of_measurement="°C",
            icon="mdi:thermometer",
        )

    # Rule 2: timestamp path
    if _path_contains_timestamp(field.path):
        return InferredMetadata(
            device_class="timestamp",
            icon="mdi:clock-outline",
        )

    # Rule 3: boolean
    if field.value_type == "boolean":
        return InferredMetadata(icon="mdi:toggle-switch-outline")

    # Rule 4: numeric -> measurement
    if field.value_type == "number":
        return InferredMetadata(
            state_class="measurement",
            icon="mdi:numeric",
        )

    # Rule 5: generic string
    return InferredMetadata(icon="mdi:text-short")


def format_display_value(value: object, value_type: str, path: str) -> str:
    """Format raw value for HA state display based on inferred type.

    Boolean -> "Yes"/"No", SCREAMING_SNAKE_CASE -> Title Case,
    numbers -> string representation, everything else -> str().
    """
    if value_type == "boolean":
        return "Yes" if value else "No"

    if value_type == "number":
        return str(value)

    # String values
    str_val = str(value)
    if _SCREAMING_RE.match(str_val):
        return _screaming_to_title(str_val)

    return str_val
