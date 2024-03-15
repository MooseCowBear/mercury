import React from "react";
import MessageContainer from "../components/MessageContainer";
import MessageFormContainer from "../components/MessageFormContainer";
import { useUserInfoContext } from "../contexts/UserInfoContext";
import { useVisibilityContext } from "../contexts/VisibilityContext";
import { chatTitle } from "../utils/chats";

export default function ChatMain() {
  const { userInfo } = useUserInfoContext();
  const { visibility } = useVisibilityContext();
  const visible = visibility.messages;

  return (
    <div
      className={`${
        visible
          ? "bg-white p-5 rounded-xl shadow grid grid-cols-1 grid-rows-[auto,_1fr,_auto]"
          : "hidden"
      }`}
    >
      {userInfo && userInfo.current_chat && (
        <h1 className="justify-self-center uppercase text-xs truncate border-b-[2px]">
          {chatTitle(userInfo.current_chat, userInfo)}
        </h1>
      )}
      <MessageContainer />
      <MessageFormContainer />
    </div>
  );
}

// style
