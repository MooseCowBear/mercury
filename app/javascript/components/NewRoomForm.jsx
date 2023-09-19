import React, { useState } from "react";
import { makeAPIrequest } from "../helpers/apiRequest";

export default NewRoomForm = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(null);

  const changeHandler = (e) => {
    const input = e.target.value;
    setName(input);
  };

  const resetForm = () => {
    setName("");
    setError(null);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const input = document.getElementById("name").value.trim();
    if (input === "" || input.length > 45) {
      setError("Room must have a name under 45 characters.");
      return;
    }

    const url = "/api/v1/rooms/create";
    const fetchBody = { name };
    const method = "POST";

    const errorSetter = (value) => {
      console.log(error);
      setError(value);
    };

    makeAPIrequest(url, fetchBody, method, errorSetter, null, resetForm);
  };

  return (
    <form
      onSubmit={submitHandler}
      className="bg-gray-50 rounded-md px-3 py-2 max-w-[250px] dark:bg-gray-700"
    >
      <h2 className="font-semibold uppercase tracking-wider leading-tight">
        New room
      </h2>
      <div className="flex items-center gap-1">
        <label className="flex flex-col lowercase">
          <span className="text-coolpink-500 overflow-x-auto dark:text-melon-500">
            {error}
          </span>
          <input
            id="name"
            type="text"
            value={name}
            onChange={changeHandler}
            className="px-3 py-1 border-2 border-gray-200 rounded-lg max-w-[200px] max-h-[50px] text-sm dark:bg-gray-800 dark:border-gray-500"
          />
        </label>
        <button type="submit" aria-label="create room">
          <svg
            className="h-9"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              fill="#14b8a6"
              d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"
            />
          </svg>
        </button>
      </div>
    </form>
  );
};
