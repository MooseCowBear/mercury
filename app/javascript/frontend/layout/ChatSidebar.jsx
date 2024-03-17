import React, { useState } from "react";
import Searchbar from "../components/SearchBar";
import ChatsContainer from "../components/ChatsContainer";
import { useVisibilityContext } from "../contexts/VisibilityContext";
import { usePrivateChatsContext } from "../contexts/PrivateChatsContext";
import { usePublicChatsContext } from "../contexts/PublicChatsContext";
import { useUserInfoContext } from "../contexts/UserInfoContext";
import { chatTitle } from "../utils/chats";

export default function ChatSidebar() {
  const { userInfo } = useUserInfoContext();
  //console.log("user info in sidebat", userInfo);
  const { visibility } = useVisibilityContext();
  const { privateChats } = usePrivateChatsContext();
  const { publicChats } = usePublicChatsContext();

  const [filterChatsBy, setFilterChatsBy] = useState("");

  const visible = visibility.chats;

  const filteredChats = (chats) => {
    return chats.filter((elem) =>
      chatTitle(elem, userInfo).includes(filterChatsBy)
    );
  };

  if (!userInfo) return <p>loading...</p>;

  return (
    <div
      className={`${
        visible ? "grid grid-rows-[auto,_1fr] gap-2 min-w-fit" : "hidden"
      }`}
    >
      <Searchbar title="Chat" onChangeHandler={setFilterChatsBy} />
      <div className="min-h-0 bg-white rounded-xl shadow divide-y-[1px] grid grid-rows-2">
        <ChatsContainer title="public" chats={filteredChats(publicChats)} />
        <ChatsContainer title="private" chats={filteredChats(privateChats)} />
      </div>
    </div>
  );
}
