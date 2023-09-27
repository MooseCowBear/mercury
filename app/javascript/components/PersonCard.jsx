import React from "react";
import { isUserActive } from "../helpers/users";
import { makePostRequest } from "../helpers/apiRequest";

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

    const setState = (data) => {
      setCurrentRoom(data);
      setError(null);
      setViewPeople(false);
    };

    const errorSetter = (value) => {
      console.log(error);
      setError(value);
    };

    makePostRequest(url, fetchBody, method)
      .then((data) => setState(data))
      .catch((error) => errorSetter(error));
  };

  // TODO: when we have profiles this will be updated.

  return (
    <div className="flex items-center gap-2">
      <div
        className={`flex items-center justify-center p-4 rounded-full h-9 w-9 border-2 border-cyan-800 dark:bg-gray-800 dark:border-teal-600 ${
          active
            ? "bg-teal-800 text-gray-50 dark:bg-teal-600"
            : "text-teal-800 dark:text-teal-600"
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
          className="lowercase hover:text-teal-500 focus:text-teal-500 dark:hover:text-teal-300 dark:focus:text-teal-300"
          onClick={clickHandler}
        >
          Send a message
        </button>
      </div>
    </div>
  );
};
