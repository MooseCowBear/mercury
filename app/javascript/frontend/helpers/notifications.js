import copyObjectArr from "./copy";

export const removeRoomNotifications = (room, notifications) => {
  const data = copyObjectArr(notifications);
  return data.filter(elem => elem.room_id !== room.id);
}