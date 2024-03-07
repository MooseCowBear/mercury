import React, { useState } from "react";
import { makePostRequest } from "../helpers/apiRequest";

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

    const setState = (data) => {
      if (data.hasOwnProperty("errors")) {
        errorSetter(data.errors.join(", "));
      } else {
        resetForm();
        if (setEditing) {
          setEditing(false);
        }
      }
    };

    makePostRequest(url, fetchBody, method)
      .then((data) => setState(data))
      .catch((error) => errorSetter(error));
  };

  return (
    <form
      onSubmit={submitHandler}
      className="bg-gray-50 rounded-md md:pt-3 md:pb-5 flex items-stretch justify-stretch w-full dark:bg-[#212C31]"
    >
      <div className="flex flex-col w-full">
        <span className="text-coolpink-500 text-sm dark:text-melon-500">
          {error}
        </span>
        <div className={`flex items-center gap-3 ${setEditing ? "" : ""}`}>
          <input
            id="body"
            type="text"
            aria-label="message input"
            onChange={changeHandler}
            value={body}
            className="px-3 py-2 border-2 border-gray-200 rounded-xl w-full max-h-[50px] text-sm dark:bg-[#212C31] dark:border-gray-500"
          />
          <button type="submit" aria-label="Send">
            {!setEditing && (
              <svg
                className="h-9 w-9 fill-teal-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path fill="" d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
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
