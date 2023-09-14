import React, { useState } from "react";

export default MessageForm = ({
  message,
  currentRoom,
  variableSubmitHandler,
  setEditing = null
}) => {
  const [body, setBody] = useState(message.body);
  const [inputError, setInputError] = useState(null);
  const [validationError, setValidationError] = useState(null);

  const errorMessage = inputError
    ? "Message must have content."
    : validationError
    ? `${validationError.join(", ")}`
    : "";

  const changeHandler = (e) => {
    const input = e.target.value;
    setBody(input);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    variableSubmitHandler(
      currentRoom,
      body,
      setBody,
      setInputError,
      setValidationError,
      message.id
    );

    if (setEditing) {
      setEditing(false);
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className="bg-gray-50 rounded-md p-3 w-full flex items-center justify-center gap-2"
    >
      <label className="flex items-center gap-1">
        Message: <span>{errorMessage}</span>
        <input
          id="body"
          type="text"
          onChange={changeHandler}
          value={body}
          className="px-3 py-1 border-2 border-gray-200 rounded-lg max-w-[250px] max-h-[50px] text-sm"
        />
      </label>
      <input type="hidden" id="room_id" value={currentRoom.id} />
      <button type="submit" aria-label="Send">
        <svg
          className="h-[30px] w-[30px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path fill="#e879f9" d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
        </svg>
      </button>
    </form>
  );
};
