"""Tado CE Insight Sensors — home and zone actionable insights."""

from __future__ import annotations

from datetime import datetime
import logging
from typing import TYPE_CHECKING, Any

from homeassistant.components.sensor import SensorEntity
from homeassistant.core import callback
from homeassistant.helpers.update_coordinator import CoordinatorEntity
from homeassistant.util import dt as dt_util

from .device_manager import get_hub_device_info, get_zone_device_info
from .entity_registry import ENTITY_REGISTRY, get_entity_category
from .format_helpers import (
    build_zone_insight_attributes as _build_zone_insight_attributes,
)
from .format_helpers import (
    format_health_score as _format_health_score,
)
from .format_helpers import (
    format_insight_type as _format_insight_type,
)
from .format_helpers import (
    format_persistent_insights_grouped as _format_persistent_insights_grouped,
)
from .format_helpers import (
    format_priority as _format_priority,
)
from .insights_models import Insight
from .insights_presenter import (
    aggregate_home_insights,
    calculate_insight_health_score,
)
from .insights_presenter import (
    build_trend_digest as _build_trend_digest,
)
from .insights_presenter import (
    correlate_insights as _correlate_insights,
)
from .insights_presenter import (
    escalate_priorities as _escalate_priorities,
)
from .sensor_insight_collector import (
    InsightContext,
    collect_single_zone_insights,
    collect_zone_insights,
    get_cross_zone_insights,
    get_hub_insights,
)

if TYPE_CHECKING:
    from .coordinator import TadoDataUpdateCoordinator

_LOGGER = logging.getLogger(__name__)

# Duration thresholds for overdue messaging
_OVERDUE_DAYS = 14  # After 2 weeks, consider the issue overdue


def _enhance_battery_duration(action: str, days: int, day_label: str) -> str:
    """Enhance battery recommendation with duration urgency."""
    if days >= _OVERDUE_DAYS:
        if "within 1-2 weeks" in action:
            return action.replace(
                "within 1-2 weeks",
                f"\u2014 {day_label} since first reported, replace now to avoid losing control",
            )
        if "TODAY" not in action:
            return f"{action} \u2014 {day_label} overdue, replace now"
    elif days >= 7:  # noqa: PLR2004
        if "within 1-2 weeks" in action:
            return action.replace("within 1-2 weeks", f"soon \u2014 reported {day_label} ago")
    else:
        return f"{action} (reported {day_label} ago)"
    return action


_DURATION_URGENT_TEMPLATES: dict[str, tuple[int, str]] = {
    "connection": (3, "offline for {day_label}, check batteries and re-pair device"),
    "condensation": (3, "{day_label} and worsening risk, act now"),
    "heating_anomaly": (3, "ongoing for {day_label}, check TRV and radiator for blockages"),
    "thermal_efficiency": (3, "ongoing for {day_label}, check TRV and radiator for blockages"),
    "mold_risk": (7, "ongoing for {day_label}, ventilate daily and check for damp sources"),
    "humidity_trend": (7, "ongoing for {day_label}, ventilate daily and check for damp sources"),
}


def _enhance_generic_duration(
    action: str, insight_type: str, days: int, day_label: str,
) -> str:
    """Enhance recommendation with duration for non-battery insight types."""
    if insight_type == "frost_risk":
        return f"{action} \u2014 risk ongoing for {day_label}, increase minimum temperature"

    template = _DURATION_URGENT_TEMPLATES.get(insight_type)
    if template:
        threshold, urgent_msg = template
        if days >= threshold:
            return f"{action} \u2014 {urgent_msg.format(day_label=day_label)}"

    # Default: simple duration suffix (comfort, connection < 3d, etc.)
    label = f"offline for {day_label}" if insight_type == "connection" else f"ongoing for {day_label}"
    return f"{action} ({label})"


def _enhance_recommendation_with_duration(
    recommendation: str,
    insight_type: str,
    days: int,
) -> str:
    """Rewrite a recommendation to reflect urgency based on persistence duration."""
    day_label = "1 day" if days == 1 else f"{days} days"

    parts = recommendation.split(": ", 1)
    zone_prefix = f"{parts[0]}: " if len(parts) > 1 else ""
    action = parts[1] if len(parts) > 1 else parts[0]

    if insight_type == "battery":
        return f"{zone_prefix}{_enhance_battery_duration(action, days, day_label)}"

    return f"{zone_prefix}{_enhance_generic_duration(action, insight_type, days, day_label)}"


class TadoHomeInsightsSensor(CoordinatorEntity["TadoDataUpdateCoordinator"], SensorEntity):
    """Represent a Tado home-level actionable insights sensor."""

    _attr_has_entity_name = True

    """Hub-level sensor aggregating actionable insights from all zones.

    Collects insights from zone sensors (mold risk, comfort,
    battery, connection, window predicted, preheat timing, schedule
    deviation, heating anomaly) and aggregates them into a single
    home-level summary with priority-based recommendations.

    Also includes cross-zone aggregation (mold risk, window predicted),
    hub-level insights (API quota planning, weather impact).

    State: Total number of active insights (integer)
    """

    def __init__(self, coordinator: TadoDataUpdateCoordinator) -> None:
        """Initialize the Home Insights Sensor."""
        super().__init__(coordinator)
        _meta = ENTITY_REGISTRY["sensor_home_insights"]
        self._attr_translation_key = _meta.translation_key
        self._attr_unique_id = f"tado_ce_{coordinator.home_id}_{_meta.unique_id_suffix}"
        self._attr_device_info = get_hub_device_info(coordinator.home_id)
        self._attr_entity_category = get_entity_category(_meta)
        self._attr_available = False
        self._attr_native_value = 0
        self._aggregated: dict[str, Any] = {}
        self._health_score: int = 100
        # Weekly digest cache — recompute only when date changes
        self._weekly_digest: str = ""
        self._weekly_digest_date: str = ""
        # Track per-zone heating anomaly start times for real duration measurement
        self._anomaly_start_times: dict[str, datetime] = {}
        # Per-zone humidity history for trend detection (in-memory only)
        self._humidity_histories: dict[str, list[Any]] = {}
        # Escalated priority map for persistent_insights rendering
        self._escalated_priority_map: dict[tuple[str, str | None], int] = {}

    @property
    def icon(self) -> str | None:
        """Dynamic icon based on top priority."""
        top = self._aggregated.get("top_priority", "none")
        if top == "critical":
            return "mdi:alert-octagon"
        if top == "high":
            return "mdi:alert-circle"
        if top == "medium":
            return "mdi:alert"
        if top == "low":
            return "mdi:information"
        return "mdi:home-analytics"

    @property
    def extra_state_attributes(self) -> dict[str, Any] | None:
        """Return extra state attributes.

        Always: summary, top_priority, insight_health_score.
        Conditional (non-empty only): actions_needed, persistent_insights,
        cross_zone_insights, weekly_digest.
        """
        raw_persistent = self.coordinator.insight_history.get_persistent_insights()
        attrs: dict[str, Any] = {
            "summary": self._aggregated.get("summary", ""),
            "top_priority": _format_priority(self._aggregated.get("top_priority", "none")),
            "insight_health_score": _format_health_score(self._health_score),
        }
        # Conditional attributes — only include when non-empty
        for key, value in [
            ("actions_needed", self._aggregated.get("actions_needed", [])),
            ("persistent_insights", _format_persistent_insights_grouped(
                raw_persistent,
                escalated_priorities=self._escalated_priority_map,
            )),
            ("cross_zone_insights", self._aggregated.get("cross_zone_insights", [])),
            ("weekly_digest", self._weekly_digest),
        ]:
            if value:
                attrs[key] = value
        return attrs

    @callback
    def _handle_coordinator_update(self) -> None:
        self.update()
        self.async_write_ha_state()

    @staticmethod
    def _enhance_persistent_insights(
        zone_insights: dict[str, list[Insight]],
        history: object,
    ) -> dict[str, list[Insight]]:
        """Append duration text for persistent insights (≥ 24h)."""
        for zone_key in zone_insights:
            for i, insight in enumerate(zone_insights[zone_key]):
                dur = history.get_duration(insight.insight_type, insight.zone_name)  # type: ignore[union-attr]
                if dur is not None and dur.total_seconds() >= 86400:  # noqa: PLR2004
                    days = int(dur.total_seconds() // 86400)  # noqa: PLR2004
                    enhanced = _enhance_recommendation_with_duration(
                        insight.recommendation, insight.insight_type, days,
                    )
                    zone_insights[zone_key][i] = Insight(
                        priority=insight.priority,
                        recommendation=enhanced,
                        insight_type=insight.insight_type,
                        zone_name=insight.zone_name,
                    )
        return zone_insights

    @callback
    def update(self) -> None:
        """Update home insights by collecting and aggregating zone data."""
        try:
            ctx = InsightContext.from_coordinator(self.coordinator)

            zone_insights = collect_zone_insights(
                self.hass, self.coordinator,
                self._anomaly_start_times, self._humidity_histories,
            )

            cross_zone = get_cross_zone_insights(self.hass, self.coordinator, zone_insights, ctx)
            hub = get_hub_insights(self.hass, self.coordinator, ctx)

            if hub:
                zone_insights["_hub"] = hub
            if cross_zone:
                zone_insights["_cross_zone"] = cross_zone

            all_insights = []
            for insights_list in zone_insights.values():
                all_insights.extend(insights_list)

            now = dt_util.utcnow()
            self.coordinator.insight_history.update(all_insights, now)

            history = self.coordinator.insight_history
            escalated = _escalate_priorities(all_insights, history, now)

            self._escalated_priority_map = {}
            for insight in escalated:
                fmt_type = _format_insight_type(insight.insight_type)
                key = (fmt_type, insight.zone_name)
                existing = self._escalated_priority_map.get(key, 0)
                self._escalated_priority_map[key] = max(existing, insight.priority.value)

            # Rebuild zone_insights with escalated insights
            idx = 0
            for zone_key in zone_insights:
                count = len(zone_insights[zone_key])
                zone_insights[zone_key] = escalated[idx : idx + count]
                idx += count

            zone_insights = self._enhance_persistent_insights(zone_insights, history)
            zone_insights = _correlate_insights(zone_insights)

            self._health_score = calculate_insight_health_score(escalated)

            today = now.strftime("%Y-%m-%d")
            if today != self._weekly_digest_date:
                self._weekly_digest = _build_trend_digest(self.coordinator.insight_history, now)
                self._weekly_digest_date = today

            self._aggregated = aggregate_home_insights(zone_insights)
            self._aggregated["cross_zone_insights"] = [
                i.recommendation for i in cross_zone if i.recommendation
            ]

            self._attr_native_value = len(self._aggregated.get("actions_needed", []))
            self._attr_available = True
        except Exception as e:  # noqa: BLE001 — HA entity update pattern
            _LOGGER.debug("Failed to update home insights: %s", e)
            self._attr_available = False


class TadoZoneInsightsSensor(CoordinatorEntity["TadoDataUpdateCoordinator"], SensorEntity):
    """Represent a Tado zone-level actionable insights sensor."""

    _attr_has_entity_name = True

    """Per-zone sensor showing actionable insights for a single zone.

    Collects insights specific to this zone (mold risk, comfort,
    battery, connection, window predicted, preheat timing, heating anomaly)
    and presents them as a zone-level summary.

    State: Number of active insights for this zone (integer)
    """

    def __init__(self, coordinator: TadoDataUpdateCoordinator, zone_id: str, zone_name: str, zone_type: str) -> None:
        """Initialize the Zone Insights Sensor."""
        super().__init__(coordinator)
        self._zone_id = zone_id
        self._zone_name = zone_name
        self._zone_type = zone_type
        _meta = ENTITY_REGISTRY["sensor_insights"]
        self._attr_translation_key = _meta.translation_key
        self._attr_unique_id = f"tado_ce_{coordinator.home_id}_{_meta.unique_id_suffix.format(zone_id=zone_id)}"
        self._attr_device_info = get_zone_device_info(zone_id, zone_name, zone_type, coordinator.home_id)
        self._attr_entity_category = get_entity_category(_meta)
        self._attr_available = False
        self._attr_native_value = 0
        self._insights: list[Any] = []
        # Use dict for anomaly tracking (consistent with Home sensor)
        self._anomaly_start_times: dict[str, datetime] = {}

    @property
    def icon(self) -> str | None:
        """Dynamic icon based on top priority."""
        if not self._insights:
            return "mdi:lightbulb-outline"
        top = max(self._insights, key=lambda i: i.priority.value)
        name = top.priority.name.lower()
        if name == "critical":
            return "mdi:alert-octagon"
        if name == "high":
            return "mdi:alert-circle"
        if name == "medium":
            return "mdi:alert"
        if name == "low":
            return "mdi:information"
        return "mdi:lightbulb-outline"

    @property
    def extra_state_attributes(self) -> dict[str, Any] | None:
        """Return extra state attributes via shared helper.

        Always: top_priority.
        Conditional (non-empty only): insight_types, recommendations.
        """
        return _build_zone_insight_attributes(self._insights, self._zone_name)

    @callback
    def _handle_coordinator_update(self) -> None:
        self.update()
        self.async_write_ha_state()

    @callback
    def update(self) -> None:
        """Collect insights for this zone using shared collector."""
        try:
            coord_data = self.coordinator.data or {}
            zones_data = coord_data.get("zones")
            if not zones_data:
                self._attr_available = False
                return

            zone_states = zones_data.get("zoneStates") or {}
            zone_data = zone_states.get(self._zone_id)
            if not zone_data:
                self._attr_available = False
                return

            zones_info = coord_data.get("zones_info")

            self._insights = collect_single_zone_insights(
                hass=self.hass,
                coordinator=self.coordinator,
                zone_id=self._zone_id,
                zone_name=self._zone_name,
                zone_data=zone_data,
                zones_info=zones_info,
                anomaly_start_times=self._anomaly_start_times,
            )

            # Apply duration enhancement using insight history
            history = self.coordinator.insight_history
            for i, insight in enumerate(self._insights):
                dur = history.get_duration(insight.insight_type, insight.zone_name)
                if dur is not None and dur.total_seconds() >= 86400:  # noqa: PLR2004 — 86400s = 1 day
                    days = int(dur.total_seconds() // 86400)  # noqa: PLR2004 — 86400s = 1 day
                    enhanced = _enhance_recommendation_with_duration(
                        insight.recommendation, insight.insight_type, days,
                    )
                    self._insights[i] = Insight(
                        priority=insight.priority,
                        recommendation=enhanced,
                        insight_type=insight.insight_type,
                        zone_name=insight.zone_name,
                    )

            self._attr_native_value = len(self._insights)
            self._attr_available = True
        except Exception as e:  # noqa: BLE001 — HA entity update pattern
            _LOGGER.debug("Failed to update zone insights for %s: %s", self._zone_name, e)
            self._attr_available = False
