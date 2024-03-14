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
