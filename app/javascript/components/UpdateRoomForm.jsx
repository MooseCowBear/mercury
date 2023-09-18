import React, { useState } from "react";
import copyObjectArr from "../helpers/copy";

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
    const input = document.getElementById(`name-${room.id}`).value;
    console.log("input value", input);

    if (input.trim() === "") {
      setError("Room must have a name.");
      return;
    }

    const updateRoom = async () => {
      const url = `/api/v1/rooms/update/${room.id}`;
      const token = document.querySelector('meta[name="csrf-token"]').content;
      const fetchBody = { name };

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "X-CSRF-Token": token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(fetchBody),
        });

        if (response.status !== 200 && response.status !== 422) {
          setEditing(false);
          setError(null);
          throw new Error("A network error occured.");
        }

        const parsedResponse = await response.json();

        if (parsedResponse.hasOwnProperty("errors")) {
          setError(parsedResponse.errors.join(", "));
          return;
        } else {
          const newRooms = copyObjectArr(rooms);
          const index = rooms.findIndex(
            (elem) => elem.id === parsedResponse.id
          );
          if (index > -1) {
            newRooms[index] = parsedResponse;
            setRooms(newRooms);
          }
          setEditing(false);
          setError(null);
        }
      } catch (error) {
        console.log(error);
        setError("Request could not be completed");
      }
    };
    updateRoom();
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
