import React, { useState } from "react";
import UpdateRoomForm from "./UpdateRoomForm";

//OLD

export default PublicRoom = ({
  user,
  room,
  currentRoom,
  setCurrentRoom,
  setViewPeople,
  rooms,
  setRooms,
}) => {
  const [editing, setEditing] = useState(false);
  const editableByUser = room.creator_id == user.id;

  const selectRoomClickHandler = () => {
    setCurrentRoom(room);
    setViewPeople(false);
  };

  const thisIsCurrentRoom = currentRoom?.id === room.id;

  return (
    <div className="flex items-center gap-2">
      {!editing && (
        <>
          <button
            className={`flex gap-2 items-center capitalize ${
              thisIsCurrentRoom ? "font-bold" : ""
            }`}
            onClick={selectRoomClickHandler}
          >
            <svg
              className="h-3 w-3 fill-teal-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                fill="#"
                d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"
              />
            </svg>
            <span className="truncate max-w-[200px]">{room.name}</span>
          </button>
          {editableByUser && (
            <button
              aria-label="edit"
              onClick={() => {
                setEditing(true);
              }}
            >
              <svg
                className="h-4 w-4 fill-[#1f2937] dark:fill-gray-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  fill=""
                  d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"
                />
              </svg>
            </button>
          )}
        </>
      )}
      {editing && (
        <UpdateRoomForm
          room={room}
          rooms={rooms}
          setRooms={setRooms}
          setEditing={setEditing}
        />
      )}
    </div>
  );
};
