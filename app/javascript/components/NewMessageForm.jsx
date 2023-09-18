import React, { useState } from "react";

export default NewMessageForm = ({ currentRoom }) => {
  const [body, setBody] = useState("");
  const [inputError, setInputError] = useState(null);
  const [validationError, setValidationError] = useState(null);

  const errorMessage = inputError
    ? "Message must have content."
    : validationError
    ? `${validationError.join(", ")}`
    : "";

  const resetForm = () => {
    setBody("");
    setInputError(null);
    setValidationError(null);
  };

  const changeHandler = (e) => {
    const input = e.target.value;
    setBody(input);
  };

  const submitHandler = (e) => {
    console.log("new message form submitted");
    e.preventDefault();

    const input = document.getElementById("body").value;
    if (input.trim() === "") {
      setInputError(true);
      return;
    }

    const createMessage = async () => {
      const url = "/api/v1/messages/create";
      const token = document.querySelector('meta[name="csrf-token"]').content;
      const room_id = currentRoom.id;
      const fetchBody = { body, room_id };

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "X-CSRF-Token": token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(fetchBody),
        });

        // is this what we want?
        if (response.status !== 200 && response.status !== 422) {
          resetForm();
          throw new Error("A network error occured.");
        }

        const parsedResponse = await response.json();
        console.log(parsedResponse);

        if (parsedResponse.hasOwnProperty("errors")) {
          setValidationError(parsedResponse.errors);
        } else {
          resetForm();
        }
      } catch (error) {
        console.log(error);
        setValidationError(["Request could not be completed"]);
      }
    };
    createMessage();
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
          className="px-3 py-1 border-2 border-gray-200 rounded-lg max-w-[250px] max-h-[50px] text-sm dark:bg-gray-800 dark:border-gray-500"
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
