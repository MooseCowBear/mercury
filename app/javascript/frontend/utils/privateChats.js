// helper functions for any display of private chats(s)
import copyObjectArr from "./copy";

export const notificationCount = (room, notifications) => {
  if (room.is_private) {
    const notificationsForRoom = notifications.filter(
      (elem) => elem.room_id == room.id
    );
    return notificationsForRoom.length;
  }
  return null;
};

export const removeRoom = (rooms, parsedResponse) => {
  const newRooms = copyObjectArr(rooms);
  return newRooms.filter((elem) => elem.id !== parsedResponse.id);
};

// want:

/* backend wants ids of chat participants, including the user who initiated the chat */
export const selectedPeopleIds = (selectedPeople, userInfo) => {
  const selectedPeopleIdArr = selectedPeople.map((person) => {
    return { user_id: person.id };
  });
  selectedPeopleIdArr.push({ user_id: userInfo.id });
  return selectedPeopleIdArr;
};
