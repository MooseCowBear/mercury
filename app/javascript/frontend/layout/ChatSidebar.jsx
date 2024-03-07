import React from "react";
import Searchbar from "../components/SearchBar";

export default function ChatSidebar() {
  return (
    <div className="grid grid-rows-[auto,_1fr] gap-2">
      <Searchbar title="Chat" />
      <div className="bg-white p-5 rounded-xl shadow"></div>
    </div>
  );
}
