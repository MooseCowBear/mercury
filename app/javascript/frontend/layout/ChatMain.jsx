import React from "react";
import MessageContainer from "../components/MessageContainer";
import MessageFormContainer from "../components/MessageFormContainer";
import { useUserInfoContext } from "../contexts/UserInfoContext";
import { useVisibilityContext } from "../contexts/VisibilityContext";
import { chatTitle } from "../utils/chats";
import MuteButton from "../components/MuteButton";

export default function ChatMain() {
  const { userInfo } = useUserInfoContext();
  const { visibility } = useVisibilityContext();

  const visible = visibility.messages;

  return (
    <div
      className={`${
        visible
          ? "bg-white xs:p-5 rounded-xl shadow grid grid-cols-1 grid-rows-[auto,_1fr,_auto] dark:bg-neutral-800/90"
          : "hidden"
      }`}
    >
      {userInfo && userInfo.current_chat && (
        <div className="flex gap-2 items-center justify-center">
          <h1 className="justify-self-center uppercase text-xs truncate border-b-[2px]">
            {chatTitle(userInfo.current_chat, userInfo)}
          </h1>
          {userInfo.current_chat.is_private && (
            <MuteButton currentlyMuted={userInfo.current_chat_silenced} />
          )}
        </div>
      )}
      <MessageContainer />
      <MessageFormContainer />
    </div>
  );
}

