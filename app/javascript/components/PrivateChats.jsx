import React from "react";
import Room from "./Room";

export default PrivateChats = ({
  user,
  privateChats,
  setPrivateChats,
  currentRoom,
  setCurrentRoom,
  setViewPeople,
  notifications,
  setNotifications,
}) => {
  return (
    <ul id="private_chats" className="px-2 md:px-5 max-h-24 overflow-auto">
      {privateChats.map((room) => {
        return (
          <li key={`room-${room.id}`}>
            <Room
              user={user}
              room={room}
              currentRoom={currentRoom}
              setCurrentRoom={setCurrentRoom}
              setViewPeople={setViewPeople}
              notifications={notifications}
              setNotifications={setNotifications}
              rooms={privateChats}
              setRooms={setPrivateChats}
            />
          </li>
        );
      })}
    </ul>
  );
};
