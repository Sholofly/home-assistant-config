"""API insights: status, quota planning, usage spike, call rate."""

from __future__ import annotations

from typing import Any

from .helpers import parse_iso_datetime as _parse_iso_dt
from .insights_models import (
    API_QUOTA_BUFFER_HOURS,
    API_QUOTA_HIGH_BUFFER_HOURS,
    API_USAGE_CRITICAL,
    API_USAGE_HIGH,
    API_USAGE_NOTICE,
    API_USAGE_SPIKE_RATIO,
    API_USAGE_WARNING,
    CALLS_PER_HOUR_MIN_SAMPLES,
    Insight,
    InsightPriority,
)


def _suggest_polling_interval(
    current_interval_minutes: int | None, usage_percent: float,
) -> int | None:
    """Calculate suggested polling interval based on API usage."""
    if not current_interval_minutes:
        return None
    if usage_percent >= API_USAGE_HIGH:
        return max(current_interval_minutes * 2, 60)
    if usage_percent >= API_USAGE_WARNING:
        return max(current_interval_minutes + 15, 30)
    return None


def _api_status_message(
    usage_percent: float,
    remaining_calls: int,
    reset_info: str,
    suggested_interval: int | None,
) -> str:
    """Build API status recommendation message for a given usage level."""
    if usage_percent >= API_USAGE_CRITICAL:
        return f"API CRITICAL: Only {remaining_calls} calls remaining{reset_info} \u2014 pause automations until reset"

    if usage_percent >= API_USAGE_HIGH:
        if suggested_interval:
            return (
                f"API WARNING: {remaining_calls} calls remaining{reset_info}"
                f" \u2014 increase polling to {suggested_interval} min"
                " in Settings \u2192 Tado CE \u2192 Configure"
            )
        return f"API WARNING: {remaining_calls} calls remaining{reset_info} \u2014 reduce polling frequency"

    if usage_percent >= API_USAGE_WARNING:
        if suggested_interval:
            return (
                f"API usage at {usage_percent:.0f}%{reset_info}"
                f" \u2014 consider increasing polling to {suggested_interval} min"
            )
        return f"API usage at {usage_percent:.0f}%{reset_info} \u2014 monitor usage"

    return f"API usage at {usage_percent:.0f}%{reset_info}"


def calculate_api_status_recommendation(
    remaining_calls: int | None,
    total_calls: int | None,
    reset_time_human: str | None = None,
    current_interval_minutes: int | None = None,
) -> str:
    """Calculate SMART recommendation for API status."""
    if remaining_calls is None or total_calls is None:
        return ""

    usage_percent = ((total_calls - remaining_calls) / total_calls) * 100

    if usage_percent < API_USAGE_NOTICE:
        return ""

    suggested_interval = _suggest_polling_interval(current_interval_minutes, usage_percent)
    reset_info = f" (resets in {reset_time_human})" if reset_time_human else ""

    return _api_status_message(usage_percent, remaining_calls, reset_info, suggested_interval)


def calculate_api_quota_planning_insight(
    remaining_calls: int | None = None,
    total_calls: int | None = None,
    calls_per_hour: float | None = None,
    hours_until_reset: float | None = None,
    current_interval_minutes: float | None = None,
) -> Insight | None:
    """Calculate API quota planning insight (exhaustion projected before reset)."""
    if remaining_calls is None or calls_per_hour is None or hours_until_reset is None:
        return None
    if calls_per_hour <= 0:
        return None

    hours_remaining = remaining_calls / calls_per_hour
    buffer_hours = hours_until_reset - hours_remaining

    # Only trigger if projected to run out > 6 hours before reset
    if buffer_hours < API_QUOTA_BUFFER_HOURS:
        return None

    if hours_until_reset > 0 and remaining_calls > 0:
        safe_calls_per_hour = remaining_calls / hours_until_reset * 0.8  # 20% safety margin
        suggested_interval = max(60 / safe_calls_per_hour, 5) if safe_calls_per_hour > 0 else 30
    else:
        suggested_interval = 30

    rec = (
        f"API quota: {remaining_calls} calls left, "
        f"projected to run out {buffer_hours:.0f}h before reset. "
        f"Consider increasing polling interval to {suggested_interval:.0f} min"
    )

    priority = InsightPriority.HIGH if buffer_hours > API_QUOTA_HIGH_BUFFER_HOURS else InsightPriority.MEDIUM

    return Insight(
        priority=priority,
        recommendation=rec,
        insight_type="api_quota_planning",
        zone_name=None,
    )


def calculate_api_usage_spike_insight(
    current_hour_calls: int | None = None,
    avg_calls_per_hour: float | None = None,
) -> Insight | None:
    """Detect abnormal API usage spikes."""
    if current_hour_calls is None or avg_calls_per_hour is None:
        return None
    if avg_calls_per_hour <= 0:
        return None

    ratio = current_hour_calls / avg_calls_per_hour
    if ratio < API_USAGE_SPIKE_RATIO:
        return None

    rec = (
        f"API usage spike: {current_hour_calls} calls this hour "
        f"({ratio:.1f}x the average of {avg_calls_per_hour:.0f}/h) "
        f"\u2014 check for automation loops or integration conflicts"
    )

    return Insight(
        priority=InsightPriority.MEDIUM,
        recommendation=rec,
        insight_type="api_usage_spike",
        zone_name=None,
    )


def calculate_calls_per_hour(history: list[Any]) -> float | None:
    """Calculate average API calls per hour from call history."""
    if not history or len(history) < CALLS_PER_HOUR_MIN_SAMPLES:
        return None
    try:
        first_ts = history[0].get("timestamp", "")
        last_ts = history[-1].get("timestamp", "")
        first_dt = _parse_iso_dt(first_ts)
        last_dt = _parse_iso_dt(last_ts)
        hours_span = (last_dt - first_dt).total_seconds() / 3600
        if hours_span <= 0:
            return None
        return len(history) / hours_span
    except (ValueError, TypeError, AttributeError):
        return None
