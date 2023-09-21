import React from "react";
import { isUserActive } from "../helpers/users";
import { makeAPIPostRequest } from "../helpers/apiRequest";

export default PersonCard = ({
  person,
  setCurrentRoom,
  setError,
  setViewPeople,
}) => {
  const active = isUserActive(person.last_active);

  const clickHandler = () => {
    const url = "/api/v1/private_rooms/create";
    const fetchBody = { user_id: person.id };
    const method = "POST";

    const setState = (parsedResponse) => {
      setCurrentRoom(parsedResponse);
      setError(null);
      setViewPeople(false);
    };

    const errorSetter = (value) => {
      console.log(error);
      setError(value);
    };

    makeAPIPostRequest(url, fetchBody, method, errorSetter, setState);
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
