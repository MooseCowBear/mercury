import React, { useState } from "react";
import Searchbar from "../components/SearchBar";
import ChatsContainer from "../components/ChatsContainer";
import { useVisibilityContext } from "../contexts/VisibilityContext";
import { usePrivateChatsContext } from "../contexts/PrivateChatsContext";
import { usePublicChatsContext } from "../contexts/PublicChatsContext";
import { useUserInfoContext } from "../contexts/UserInfoContext";
import { filterChats } from "../utils/chats";

export default function ChatSidebar() {
  const { userInfo } = useUserInfoContext();
  const { visibility } = useVisibilityContext();
  const { privateChats } = usePrivateChatsContext();
  const { publicChats } = usePublicChatsContext();

  const [filterChatsBy, setFilterChatsBy] = useState("");

  const visible = visibility.chats;

  if (!userInfo) return <p>loading...</p>;

  return (
    <div
      className={`${
        visible ? "grid grid-rows-[auto,_1fr] gap-2 min-w-fit" : "hidden"
      }`}
    >
      <Searchbar title="Chat" onChangeHandler={setFilterChatsBy} />
      <div className="min-h-0 bg-white rounded-xl shadow divide-y-[1px] dark:divide-neutral-500 grid grid-rows-2 dark:bg-neutral-800/90">
        <ChatsContainer
          title="public"
          chats={filterChats(publicChats, filterChatsBy, userInfo)}
        />
        <ChatsContainer
          title="private"
          chats={filterChats(privateChats, filterChatsBy, userInfo)}
        />
      </div>
    </div>
  );
}
