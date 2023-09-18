import React from "react";
import { removeRoomNotifications } from "../helpers/notifications";

export default Room = ({
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
  const getPrivateRoomName = (room) => {
    if (room.is_private) {
      return room.interlocutor_one.id == user.id
        ? room.interlocutor_two.username
        : room.interlocutor_one.username;
    }
  };

  const displayTitle = room.is_private ? getPrivateRoomName(room) : room.name;
  const thisIsCurrentRoom = currentRoom?.id === room.id;
  const deletableByUser =
    room.interlocutor_one_id == user.id || room.interlocutor_two_id == user.id;

  const notificationCount = (room) => {
    if (room.is_private) {
      const notificationsForRoom = notifications.filter(
        (e) => e.room_id == room.id
      );
      return notificationsForRoom.length;
    }
    return null;
  };

  const count = notificationCount(room);

  const selectRoomClickHandler = () => {
    setCurrentRoom(room);
    setViewPeople(false);
    const newNotifications = removeRoomNotifications(room, notifications);
    setNotifications(newNotifications);
  };

  const deleteRoomClickHandler = () => {
    const deleteRoom = async () => {
      const url = `/api/v1/private_rooms/destroy/${room.id}`;
      const token = document.querySelector('meta[name="csrf-token"]').content;

      try {
        const response = await fetch(url, {
          method: "DELETE",
          headers: {
            "X-CSRF-Token": token,
            "Content-Type": "application/json",
          },
        });

        if (response.status !== 200 && response.status !== 422) {
          throw new Error("A network error occured.");
        }

        const parsedResponse = await response.json();

        const newRooms = copyObjectArr(rooms);
        const afterDelete = newRooms.filter(
          (elem) => elem.id !== parsedResponse.id
        );
        setRooms(afterDelete);

        if (currentRoom.id == parsedResponse.id) {
          setCurrentRoom(null);
        }
      } catch (error) {
        console.log(error);
      }
    };
    deleteRoom();
  };

  //TODO: to allow creators of public rooms to update room names...
  //need to add an EDITING state!
  //need to replace DISPLAY NAME, or possible the whole row with a FORM

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
        <div className="flex items-center justify-center rounded-lg h-6 px-3 bg-coolpink-500/80 text-gray-50 font-medium">
          {count}
        </div>
      )}
      {deletableByUser && (
        <button onClick={deleteRoomClickHandler}>
          <svg
            className="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path
              fill="#1f2937"
              d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
            />
          </svg>
        </button>
      )}
    </div>
  );
};
