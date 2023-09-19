import React from "react";
import { isUserActive } from "../helpers/users";

export default PersonCard = ({
  person,
  setCurrentRoom,
  setError,
  setViewPeople,
}) => {
  const active = isUserActive(person.last_active);

  const clickHandler = () => {
    const getPrivateRoom = async () => {
      const url = "/api/v1/private_rooms/create";
      const token = document.querySelector('meta[name="csrf-token"]').content;

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "X-CSRF-Token": token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: person.id }),
        });

        if (response.status !== 200) {
          throw new Error("An error occured.");
        }

        const parsedResponse = await response.json();

        setCurrentRoom(parsedResponse);
        setError(null);
        setViewPeople(false);
      } catch (error) {
        console.log(error);
        setError(error);
      }
    };
    getPrivateRoom();
  };

  // TODO: when we have profiles this will be updated.

  return (
    <div className="flex items-center gap-2">
      <div
        className={`flex items-center justify-center p-4 rounded-full h-9 w-9 border-2 border-cyan-800 dark:bg-gray-800 dark:border-teal-600 ${
          active
            ? "bg-cyan-800 text-gray-50 dark:bg-teal-600"
            : "text-cyan-800 dark:text-teal-600"
        }`}
      >
        {person.username[0]}
      </div>
      <div>
        <div className="flex items-center gap-1">
          <h3 className="uppercase tracking-wider">{person.username}</h3>
          {active && <span className="text-xs text-gray-500">active</span>}
        </div>
        <button
          className="lowercase hover:text-cyan-800 focus:text-cyan-800"
          onClick={clickHandler}
        >
          Send a message
        </button>
      </div>
    </div>
  );
};
