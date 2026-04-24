"""Device insights — battery, connection, device limitation, geofencing.

Provides recommendation functions for device-related conditions.
"""

from __future__ import annotations

from typing import Any

from .insights_models import (
    OFFLINE_DAY_MINUTES,
    OFFLINE_RECENT_MINUTES,
    OFFLINE_SHORT_MINUTES,
    Insight,
    InsightPriority,
)


def calculate_battery_recommendation(
    battery_state: str,
    zone_name: str,
    device_type: str | None = None,
) -> str:
    """Calculate SMART recommendation for battery status.

    Args:
        battery_state: Current battery state (Normal, Low, Critical)
        zone_name: Name of the zone
        device_type: Type of device (TRV, Thermostat, etc.)

    Returns:
        SMART recommendation string (empty if battery is normal)
    """
    if battery_state.upper() == "NORMAL":
        return ""

    # Determine battery type based on device
    battery_type = "AA batteries"
    if device_type:
        device_lower = device_type.lower()
        if "trv" in device_lower or "va0" in device_lower or "ru0" in device_lower:
            battery_type = "2x AA batteries"
        elif "thermostat" in device_lower or "su0" in device_lower:
            battery_type = "3x AAA batteries"

    if battery_state.upper() == "CRITICAL":
        return f"{zone_name}: Replace {battery_type} TODAY \u2014 device may stop working"

    if battery_state.upper() == "LOW":
        return f"{zone_name}: Replace {battery_type} within 1-2 weeks"

    return ""


def calculate_connection_recommendation(
    connection_state: str,
    zone_name: str,
    last_seen: str | None = None,
    offline_minutes: int | None = None,
) -> str:
    """Calculate SMART recommendation for device connection status.

    Args:
        connection_state: Current connection state (Online, Offline)
        zone_name: Name of the zone
        last_seen: Last seen timestamp string
        offline_minutes: Minutes since device was last seen

    Returns:
        SMART recommendation string (empty if connected)
    """
    if connection_state.upper() == "ONLINE":
        return ""

    if connection_state.upper() == "OFFLINE":
        # Provide time-specific recommendations
        if offline_minutes is not None:
            if offline_minutes < OFFLINE_RECENT_MINUTES:
                return f"{zone_name}: Device offline {offline_minutes} min \u2014 may be temporary, wait 30 minutes"
            if offline_minutes < OFFLINE_SHORT_MINUTES:
                return (
                    f"{zone_name}: Device offline {offline_minutes} min "
                    f"\u2014 check if device is within 10m of bridge"
                )
            if offline_minutes < OFFLINE_DAY_MINUTES:  # 24 hours
                hours = offline_minutes // 60
                return f"{zone_name}: Device offline {hours}h \u2014 check batteries and bridge connection"
            days = offline_minutes // 1440
            return f"{zone_name}: Device offline {days} days \u2014 replace batteries and re-pair if needed"

        if last_seen:
            return f"{zone_name}: Device offline since {last_seen} \u2014 check batteries and bridge connection"

        return (
            f"{zone_name}: Device offline \u2014 1) Check batteries "
            "2) Verify bridge is online 3) Move device closer to bridge"
        )

    return ""


def calculate_geofencing_device_offline_insight(
    devices: list[Any] | None = None,
) -> Insight | None:
    """Detect when a geofencing mobile device has location tracking disabled.

    Args:
        devices: List of dicts with keys: name, location_enabled (bool)

    Returns:
        Insight if any geofencing device is offline, None otherwise
    """
    if not devices:
        return None

    offline_devices = [d.get("name", "Unknown") for d in devices if not d.get("location_enabled", True)]

    if not offline_devices:
        return None

    devices_str = ", ".join(offline_devices[:3])
    rec = f"Geofencing device(s) with location disabled: {devices_str} \u2014 home/away detection may be inaccurate"

    return Insight(
        priority=InsightPriority.MEDIUM,
        recommendation=rec,
        insight_type="geofencing_offline",
        zone_name=None,
    )
