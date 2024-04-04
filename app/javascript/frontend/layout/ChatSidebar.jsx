import React, { useState } from "react";
import Searchbar from "../components/SearchBar";
import ChatsContainer from "../components/ChatsContainer";
import { usePrivateChatsContext } from "../contexts/PrivateChatsContext";
import { usePublicChatsContext } from "../contexts/PublicChatsContext";
import { useUserInfoContext } from "../contexts/UserInfoContext";
import { filterChats } from "../utils/chats";

export default function ChatSidebar() {
  const { userInfo } = useUserInfoContext();
  const { privateChats } = usePrivateChatsContext();
  const { publicChats } = usePublicChatsContext();

  const [filterChatsBy, setFilterChatsBy] = useState("");

  if (!userInfo) return <p>Loading...</p>;

  return (
    <div
      className="grid grid-rows-[auto,_1fr] gap-2"
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
