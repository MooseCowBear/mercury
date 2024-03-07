import React from "react";

export default function Searchbar({ title }) {
  return (
    <div className="flex gap-2 items-center justify-between bg-white p-5 rounded-xl shadow">
      <h2>{title}</h2>
      <input
        type="text"
        placeholder="Search"
        className="border bg-neutral-50 rounded-full px-3 py-1"
      />
      <button className="bg-poppy-500 rounded-full size-8"></button>
    </div>
  );
}
