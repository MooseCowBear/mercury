import React from "react";
import Searchbar from "../components/SearchBar";
import ChatsContainer from "../components/ChatsContainer";

export default function ChatSidebar() {
  return (
    <div className="grid grid-rows-[auto,_1fr] gap-2">
      <Searchbar title="Chat" />
      <div className="bg-white rounded-xl shadow divide-y-[1px]">
        <ChatsContainer title="public" isPrivate={false} />
        <ChatsContainer title="private" isPrivate={true} />
      </div>
    </div>
  );
}
