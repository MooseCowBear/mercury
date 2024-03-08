import React from "react";
import Searchbar from "../components/SearchBar";
import ChatsContainer from "../components/ChatsContainer";

// need to figure out how to position this... should it just replace the messages part?

export default function ChatSidebar({ expanded }) {
  return (
    <div
      className={`grid-rows-[auto,_1fr] gap-2 ${
        expanded ? "grid" : "hidden md:grid"
      }`}
    >
      <Searchbar title="Chat" />
      <div className="bg-white rounded-xl shadow divide-y-[1px]">
        <ChatsContainer title="public" isPrivate={false} />
        <ChatsContainer title="private" isPrivate={true} />
      </div>
    </div>
  );
}
