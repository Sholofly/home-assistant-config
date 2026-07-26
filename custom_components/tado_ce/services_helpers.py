"""Services-layer wrapper for cloud writes that operate on a discovered entity."""

from __future__ import annotations

import asyncio
import logging
from typing import TYPE_CHECKING

import aiohttp

from .helpers import async_trigger_immediate_refresh

if TYPE_CHECKING:
    from collections.abc import Coroutine

    from homeassistant.core import HomeAssistant

    from .coordinator import TadoDataUpdateCoordinator

_LOGGER = logging.getLogger(__name__)


async def run_service_call(
    *,
    hass: HomeAssistant,
    coordinator: TadoDataUpdateCoordinator,
    zone_id: str,
    entity_type: str,
    api_coro: Coroutine,  # type: ignore[type-arg]
    capture_source: str | None,
    refresh_entity_id: str | None,
    reason: str,
) -> bool:
    """Cloud write with timeout + capture-on-success + immediate refresh; bool return signals user-visible success."""
    from .error_dispatch import dispatch_to_service_call
    from .exceptions import TadoAuthError, TadoRateLimitError

    api_success = False
    try:
        async with asyncio.timeout(10):
            api_success = bool(await api_coro)
    except TimeoutError:
        _LOGGER.warning(
            "Services: %s for zone %s timed out after 10s",
            reason, zone_id,
        )
        return False
    except (TadoAuthError, TadoRateLimitError) as e:
        dispatch_to_service_call(e, coordinator.config_entry, hass, coordinator)
    except aiohttp.ClientError as e:
        _LOGGER.warning(
            "Services: %s for zone %s network error (%s)",
            reason, zone_id, e,
        )
        return False

    if not api_success:
        return False

    if capture_source is not None:
        try:
            await coordinator.async_capture_state(zone_id, entity_type, capture_source)
        except (KeyError, AttributeError, OSError) as e:
            _LOGGER.warning(
                "Services: capture-on-success for zone %s failed (%s); "
                "user write succeeded, restoration may be unavailable",
                zone_id, e,
            )

    if coordinator.state_reconciler is not None:
        coordinator.state_reconciler.record_local_write(zone_id)

    if refresh_entity_id is not None:
        await async_trigger_immediate_refresh(hass, refresh_entity_id, reason)

    return True
