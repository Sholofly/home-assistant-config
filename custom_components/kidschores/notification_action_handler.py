# File: notification_action_handler.py
"""Handle notification actions from HA companion notifications."""

from homeassistant.core import HomeAssistant, Event
from homeassistant.exceptions import HomeAssistantError

from .const import (
    NOTIFICATION_EVENT,
    ACTION_APPROVE_CHORE,
    ACTION_APPROVE_REWARD,
    ACTION_DISAPPROVE_CHORE,
    ACTION_DISAPPROVE_REWARD,
    ACTION_REMIND_30,
    DEFAULT_REMINDER_DELAY,
    LOGGER,
)
from .coordinator import KidsChoresDataCoordinator


async def async_handle_notification_action(hass: HomeAssistant, event: Event) -> None:
    """Handle notification actions from HA companion notifications."""

    action_field = event.data.get("action")
    if not action_field:
        LOGGER.error("No action found in event data: %s", event.data)
        return

    parts = action_field.split("|")
    base_action = parts[0]
    kid_id = None
    chore_id = None
    reward_id = None

    # Decide what to expect based on the base action.
    if base_action in (ACTION_APPROVE_REWARD, ACTION_DISAPPROVE_REWARD):
        if len(parts) < 3:
            LOGGER.error("Not enough context in reward action field: %s", action_field)
            return
        kid_id = parts[1]
        reward_id = parts[2]
    elif base_action in (
        ACTION_APPROVE_CHORE,
        ACTION_DISAPPROVE_CHORE,
        ACTION_REMIND_30,
    ):
        if len(parts) < 3:
            LOGGER.error("Not enough context in chore action field: %s", action_field)
            return
        kid_id = parts[1]
        chore_id = parts[2]
    else:
        LOGGER.error("Unknown base action: %s", base_action)
        return

    # Parent name may be provided in the event data or use a default.
    parent_name = event.data.get("parent_name", "ParentOrAdmin")

    if not kid_id or not base_action:
        LOGGER.error("Notification action event missing required data: %s", event.data)
        return

    # Retrieve the coordinator.
    domain_data = hass.data.get("kidschores", {})
    if not domain_data:
        LOGGER.error("No KidsChores data found in hass.data")
        return
    entry_id = next(iter(domain_data))
    coordinator: KidsChoresDataCoordinator = domain_data[entry_id].get("coordinator")
    if not coordinator:
        LOGGER.error("No coordinator found in KidsChores data")
        return

    try:
        if base_action == ACTION_APPROVE_CHORE:
            await coordinator.approve_chore(
                parent_name=parent_name,
                kid_id=kid_id,
                chore_id=chore_id,
            )
        elif base_action == ACTION_DISAPPROVE_CHORE:
            await coordinator.disapprove_chore(
                parent_name=parent_name,
                kid_id=kid_id,
                chore_id=chore_id,
            )
        elif base_action == ACTION_APPROVE_REWARD:
            await coordinator.approve_reward(
                parent_name=parent_name,
                kid_id=kid_id,
                reward_id=reward_id,
            )
        elif base_action == ACTION_DISAPPROVE_REWARD:
            await coordinator.disapprove_reward(
                parent_name=parent_name,
                kid_id=kid_id,
                reward_id=reward_id,
            )
        elif base_action == ACTION_REMIND_30:
            await coordinator.remind_in_minutes(
                kid_id=kid_id,
                chore_id=chore_id,
                reward_id=reward_id,
                minutes=DEFAULT_REMINDER_DELAY,
            )
        else:
            LOGGER.error("Received unknown notification action: %s", base_action)
    except HomeAssistantError as err:
        LOGGER.error("Error processing notification action %s: %s", base_action, err)
