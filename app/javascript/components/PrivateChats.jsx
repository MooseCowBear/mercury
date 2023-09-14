import React from "react";
import Room from "./Room";

export default PrivateChats = ({
  user,
  privateChats,
  currentRoom,
  setCurrentRoom,
  setViewPeople,
  notifications
}) => {
  return (
    <ul id="private_chats" className="px-5">
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
            />
          </li>
        );
      })}
    </ul>
  );
};
