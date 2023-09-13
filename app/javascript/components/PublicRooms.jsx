import React from "react";
import Room from "./Room";
import NewRoomForm from "./NewRoomForm";

export default PublicRooms = ({
  user,
  rooms,
  currentRoom,
  setCurrentRoom,
  setViewPeople,
}) => {
  return (
    <div className="px-5 flex flex-col gap-3">
      <NewRoomForm />
      <ul id="public_rooms">
        {rooms.map((room) => {
          return (
            <li key={`room-${room.id}`}>
              <Room
                user={user}
                room={room}
                currentRoom={currentRoom}
                setCurrentRoom={setCurrentRoom}
                setViewPeople={setViewPeople}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
