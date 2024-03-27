import React, { useState } from "react";
import Search from "../icons/Search";

export default function Searchbar({ title, onChangeHandler }) {
  const [input, setInput] = useState("");

  const changeHandler = (e) => {
    setInput(e.target.value);
    onChangeHandler(e.target.value);
  };

  return (
    <div className="flex flex-wrap gap-2 items-center justify-between bg-white p-5 rounded-xl shadow dark:bg-neutral-800/90">
      <h2 className="uppercase text-sm tracking-wider">{title}</h2>
      <div className="grow flex flex-nowrap gap-2">
        <input
          id={`${title}-search`}
          aria-label="search"
          type="text"
          value={input}
          onChange={changeHandler}
          placeholder="Search"
          className="grow min-w-none border rounded-full px-3 py-1 text-sm lowercase tracking-wider dark:bg-neutral-800/90"
        />
        <div className="bg-raspberry-500 dark:bg-raspberry-500/90 rounded-full p-2 flex items-center justify-center">
          <Search />
        </div>
      </div>
    </div>
  );
}
