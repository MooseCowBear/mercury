// helper functions for any display of private room(s)
import copyObjectArr from "./copy";

export const getInterlocutor = (room, user) => {
  // the name of the room will be: pc_username1_username2
  const [_, one, two] = room.name.split("_");
  return user.username == one ? two : one;
};

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
