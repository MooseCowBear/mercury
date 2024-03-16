import React, { useState } from "react";

export default function Searchbar({ title, onChangeHandler = null }) {
  const [input, setInput] = useState("");

  // right now: only people passing onChangeHander
  const changeHandler = (e) => {
    setInput(e.target.value);
    if (onChangeHandler) {
      onChangeHandler(e.target.value);
    }
  };

  return (
    <div className="flex flex-wrap gap-2 items-center justify-between bg-white p-5 rounded-xl shadow">
      <h2 className="uppercase text-sm tracking-wider">{title}</h2>
      <div className="grow flex flex-nowrap gap-2">
        <input
          type="text"
          value={input}
          onChange={changeHandler}
          placeholder="Search"
          className="grow min-w-none border rounded-full px-3 py-1 text-sm lowercase tracking-wider"
        />
        <button
          aria-label="search chats"
          className="bg-poppy-500 rounded-full p-2 flex items-center justify-center"
        >
          <svg
            className="size-3 fill-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              fill=""
              d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
