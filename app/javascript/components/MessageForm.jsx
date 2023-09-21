import React, { useState } from "react";
import { makeAPIPostRequest } from "../helpers/apiRequest";

export default MessageForm = ({
  currentRoom,
  setEditing = null,
  message = null,
}) => {
  const [body, setBody] = useState(message ? message.body : "");
  const [error, setError] = useState(null);

  const changeHandler = (e) => {
    const input = e.target.value;
    setBody(input);
  };

  const cancelClickHandler = () => {
    setEditing(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const input = document.getElementById("body").value.trim();
    if (input === "") {
      setError("Message must have content.");
    }

    const url = setEditing
      ? `/api/v1/messages/update/${message.id}`
      : "/api/v1/messages/create";

    const method = "POST";
    const room_id = currentRoom.id;
    const fetchBody = { body, room_id };

    const resetForm = () => {
      setBody("");
      setError(null);
    };

    const errorSetter = (value) => {
      console.log(value);
      setError(error);
    };

    const setState = () => {
      if (setEditing) {
        setEditing(false);
      }
    };

    makeAPIPostRequest(
      url,
      fetchBody,
      method,
      errorSetter,
      setState,
      resetForm
    );
  };

  return (
    <form
      onSubmit={submitHandler}
      className="bg-gray-50 rounded-md py-3 flex items-stretch justify-stretch w-full dark:bg-gray-700"
    >
      <div className="flex flex-col w-full">
        <span className="text-coolpink-500 text-sm dark:text-melon-500">
          {error}
        </span>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 w-full" aria-label="message input">
            {!setEditing && <span>Message:</span>}
            <input
              id="body"
              type="text"
              onChange={changeHandler}
              value={body}
              className="px-3 py-1 border-2 border-gray-200 rounded-lg w-full max-h-[50px] text-sm dark:bg-gray-800 dark:border-gray-500"
            />
          </label>
          <input type="hidden" id="room_id" value={currentRoom.id} />
          <button type="submit" aria-label="Send">
            {!setEditing && (
              <svg
                className="h-9 w-9"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path fill="#14b8a6" d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
              </svg>
            )}
            {setEditing && <span>update</span>}
          </button>{" "}
          {setEditing && (
            <>
              <span>|</span>
              <button onClick={cancelClickHandler}>cancel</button>
            </>
          )}
        </div>
      </div>
    </form>
  );
};
