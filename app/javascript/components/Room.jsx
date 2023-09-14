import React from "react";

// could probably use for both public and private if pass a prop to indicate
export default Room = ({
  user,
  room,
  currentRoom,
  setCurrentRoom,
  setViewPeople,
  notifications = [],
}) => {
  const getPrivateRoomName = (room) => {
    console.log("room is:", room);
    if (room.is_private) {
      return room.interlocutor_one.id == user.id
        ? room.interlocutor_two.username
        : room.interlocutor_one.username;
    }
  };

  const displayTitle = room.is_private ? getPrivateRoomName(room) : room.name;

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

  const clickHandler = () => {
    setCurrentRoom(room);
    setViewPeople(false);
  };

  //TODO: add class to style current room differently.
  return (
    <div className="flex items-center gap-2">
      <button
        className={`flex gap-2 items-center capitalize ${
          currentRoom ? "current" : ""
        }`}
        onClick={clickHandler}
      >
        <svg
          className="h-3 w-3"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            fill="#e879f9"
            d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"
          />
        </svg>
        {displayTitle}
      </button>
      {count &&  <div className="">{count}</div>}
    </div>
  );
};
