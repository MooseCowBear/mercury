import React from "react";
import Searchbar from "../components/SearchBar";
import ChatsContainer from "../components/ChatsContainer";
import { useVisibilityContext } from "../contexts/VisibilityContext";
import { usePrivateChatsContext } from "../contexts/PrivateChatsContext";
import { usePublicChatsContext } from "../contexts/PublicChatsContext";

export default function ChatSidebar() {
  const { visibility } = useVisibilityContext();
  const { privateChats } = usePrivateChatsContext();
  const { publicChats } = usePublicChatsContext();

  const visible = visibility.chats;

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
        <ChatsContainer title="public" chats={publicChats} />
        <ChatsContainer title="private" chats={privateChats} />
      </div>
    </div>
  );
}
