import React, { useState } from "react";

export default MessageForm = ({
  currentRoom,
  variableSubmitHandler,
  setEditing = null,
  message = null,
}) => {
  const [body, setBody] = useState(message ? message.body : ""); //testing
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

  const cancelClickHandler = () => {
    setEditing(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    // will this work if also use for NEW MESSAGE???
    const error = variableSubmitHandler(
      currentRoom,
      body,
      setBody,
      setInputError,
      setValidationError,
      message ? message.id : null
    );

    if (!error && setEditing) {
      setEditing(false);
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className="bg-gray-50 rounded-md py-3 flex items-stretch justify-stretch w-full"
    >
      <div className="flex flex-col w-full">
        <span className="text-pink-500 text-sm">{errorMessage}</span>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 w-full">
            {!setEditing && <span>Message:</span>}
            <input
              id="body"
              type="text"
              onChange={changeHandler}
              value={body}
              className="px-3 py-1 border-2 border-gray-200 rounded-lg w-full max-h-[50px] text-sm"
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
