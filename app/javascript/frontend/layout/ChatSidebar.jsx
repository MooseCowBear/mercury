import React from "react";
import Searchbar from "../components/SearchBar";
import ChatsContainer from "../components/ChatsContainer";
import { useActionCableContext } from "../contexts/ActionCableContext";

export default function ChatSidebar({ visible }) {
  const { cable } = useActionCableContext();
  // needs to subscribe to chat channel

  return (
    <div
      className={`${
        visible
          ? "grid grid-rows-[auto,_1fr] gap-2 overflow-y-auto min-w-fit"
          : "hidden"
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

// action cable here or in children?