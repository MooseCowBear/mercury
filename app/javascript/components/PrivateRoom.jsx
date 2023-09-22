import React from "react";
import { removeRoomNotifications } from "../helpers/notifications";
import {
  getInterlocutor,
  notificationCount,
  removeRoom,
} from "../helpers/privateChats";
import { makePostRequest } from "../helpers/apiRequest";

export default PrivateRoom = ({
  user,
  room,
  currentRoom,
  setCurrentRoom,
  setViewPeople,
  notifications,
  setNotifications,
  rooms,
  setRooms,
}) => {
  const displayTitle = getInterlocutor(room, user);

  const thisIsCurrentRoom = currentRoom?.id === room.id;

  const count = notificationCount(room, notifications);

  const selectRoomClickHandler = () => {
    setCurrentRoom(room);
    setViewPeople(false);
    const newNotifications = removeRoomNotifications(room, notifications);
    setNotifications(newNotifications);
  };

  const deleteRoomClickHandler = () => {
    const url = `/api/v1/private_rooms/destroy/${room.id}`;
    const method = "DELETE";
    const fetchBody = {};

    const updatePrivateChatsAfterDelete = (
      parsedResponse,
      rooms,
      currentRoom
    ) => {
      const afterDelete = removeRoom(rooms, parsedResponse);

      if (currentRoom && currentRoom.id == parsedResponse.id) {
        setCurrentRoom(null);
      }

      return afterDelete;
    };

    const errorSetter = (value) => {
      console.log(value);
    };

    makePostRequest(url, fetchBody, method)
      .then((data) =>
        setRooms((rooms) =>
          updatePrivateChatsAfterDelete(data, rooms, currentRoom)
        )
      )
      .catch((error) => errorSetter(error));
  };

  return (
    <div className="flex items-center gap-2">
      <button
        className={`flex gap-2 items-center capitalize ${
          thisIsCurrentRoom ? "font-bold" : ""
        }`}
        onClick={selectRoomClickHandler}
      >
        <svg
          className="h-3 w-3"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            fill="#14b8a6"
            d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"
          />
        </svg>
        <span className="truncate max-w-[200px]">{displayTitle}</span>
      </button>
      {!!count && (
        <div className="flex items-center justify-center rounded-lg h-5 px-3 bg-coolpink-500/80 text-gray-50 font-medium">
          {count}
        </div>
      )}
      <button onClick={deleteRoomClickHandler} aria-label="delete">
        <svg
          className="h-4 w-4 fill-[#1f2937] dark:fill-gray-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path
            fill=""
            d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
          />
        </svg>
      </button>
    </div>
  );
};
