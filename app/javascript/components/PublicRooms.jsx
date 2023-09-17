import React from "react";
import Room from "./Room";
import NewRoomForm from "./NewRoomForm";

export default PublicRooms = ({
  user,
  rooms,
  setRooms,
  currentRoom,
  setCurrentRoom,
  setViewPeople,
}) => {
  return (
    <div className="px-2 md:px-5 flex flex-col gap-3">
      <NewRoomForm />
      <ul id="public_rooms" className="max-h-24 overflow-y-auto">
        {rooms.map((room) => {
          return (
            <li key={`room-${room.id}`}>
              <Room
                user={user}
                room={room}
                currentRoom={currentRoom}
                setCurrentRoom={setCurrentRoom}
                setViewPeople={setViewPeople}
                setNotifications={() => {}}
                notifications={[]}
                rooms={rooms}
                setRooms={setRooms}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
