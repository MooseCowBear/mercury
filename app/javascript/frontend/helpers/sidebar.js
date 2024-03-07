import copyObjectArr from "./copy"

export const updateNotifications = (data, notifications) => {
  let newNotifications = copyObjectArr(notifications);
  const index = newNotifications.findIndex((elem) => elem.id === data.id);
  if (index > -1) {
    // if it exists, then the broadcast was after a destroy
    newNotifications = newNotifications.filter((elem) => elem.id !== data.id);
  } else {
    newNotifications.push(data);
  }
  return newNotifications;
};

export const updatePrivateChats = (data, privateChats) => {
  const newChats = copyObjectArr(privateChats);
  const index = newChats.findIndex((elem) => elem.id === data.id);
  if (index > -1) {
    newChats[index] = data;
  } else {
    newChats.push(data);
  }
  return newChats;
};

export const addRoom = (data, rooms) => {
  const newRooms = copyObjectArr(rooms);
  newRooms.push(data);
  return newRooms;
};