import React, { useState } from "react";
import copyObjectArr from "../helpers/copy";
import { makeAPIrequest } from "../helpers/apiRequest";

export default UpdateRoomForm = ({ room, rooms, setRooms, setEditing }) => {
  const [name, setName] = useState(room.name);
  const [error, setError] = useState(null);

  const changeHandler = (e) => {
    const input = e.target.value;
    setName(input);
  };

  const cancelClickHandler = () => {
    setEditing(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const input = document.getElementById(`name-${room.id}`).value.trim();
    if (input === "" || input.length > 45) {
      setError("Room must have a name less than 45 characters.");
      return;
    }

    const url = `/api/v1/rooms/update/${room.id}`;
    const fetchBody = { name };
    const method = "POST";

    const setState = (parsedResponse) => {
      const newRooms = copyObjectArr(rooms);
      const index = rooms.findIndex((elem) => elem.id === parsedResponse.id);
      if (index > -1) {
        newRooms[index] = parsedResponse;
        setRooms(newRooms);
      }
      setEditing(false);
      setError(null);
    };

    const errorSetter = (value) => {
      console.log(error);
      setError(value);
    };

    makeAPIrequest(url, fetchBody, method, errorSetter, setState);
  };
  return (
    <div className="flex flex-col items-center">
      {error && <p className="text-coolpink-500 lowercase text-sm">{error}</p>}
      <form onSubmit={submitHandler} className="flex items-center gap-1">
        <input
          type="text"
          id={`name-${room.id}`}
          value={name}
          onChange={changeHandler}
          className="px-3 py-1 border-2 border-gray-200 rounded-lg max-w-[150px] max-h-[50px] text-sm"
        />
        <div className="flex gap-1 items-center">
          <input
            type="submit"
            value="Update"
            className="lowercase text-sm cursor-pointer"
          />
          |
          <button onClick={cancelClickHandler} className="text-sm">
            cancel
          </button>
        </div>
      </form>
    </div>
  );
};
