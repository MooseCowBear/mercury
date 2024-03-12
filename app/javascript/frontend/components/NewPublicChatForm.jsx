import React, { useState } from "react";

export default function NewPublicChatForm({ setNewChatForm }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState(null);

  const changeHandler = (e) => {
    setInput(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (input.trim() === "") {
      setError("Chat must have a name.");
      return;
    }

    // create new public chat AND update curr user's room to it
  };
  const cancelHandler = () => {
    setNewChatForm(false);
  };
  return (
    <form className="w-full flex flex-col gap-1 justify-between items-center py-2 px-3">
      <input
        type="text"
        onChange={changeHandler}
        className="w-full border rounded-full px-3 py-1 text-sm lowercase tracking-wider"
      />
      <div className="w-full flex justify-between">
        <button
          type="button"
          onClick={cancelHandler}
          className="text-xs uppercase"
        >
          cancel
        </button>
        <button onClick={submitHandler} className="text-xs uppercase">
          create
        </button>
      </div>
    </form>
  );
}
