import React, { useState } from "react";
import Search from "../icons/Search";

export default function Searchbar({ title, onChangeHandler = null }) {
  const [input, setInput] = useState("");

  const changeHandler = (e) => {
    setInput(e.target.value);
    if (onChangeHandler) {
      onChangeHandler(e.target.value);
    }
  };

  return (
    <div className="flex flex-wrap gap-2 items-center justify-between bg-white p-5 rounded-xl shadow dark:bg-neutral-700/90">
      <h2 className="uppercase text-sm tracking-wider">{title}</h2>
      <div className="grow flex flex-nowrap gap-2">
        <input
          aria-label="search"
          type="text"
          value={input}
          onChange={changeHandler}
          placeholder="Search"
          className="grow min-w-none border rounded-full px-3 py-1 text-sm lowercase tracking-wider dark:bg-neutral-700/90"
        />
        <div className="bg-poppy-500 rounded-full p-2 flex items-center justify-center">
          <Search />
        </div>
      </div>
    </div>
  );
}
