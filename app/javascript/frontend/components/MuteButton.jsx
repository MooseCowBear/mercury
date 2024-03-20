import React from "react";
import Muted from "../icons/Muted";
import Unmuted from "../icons/Unmuted";
import { usePrivateChatsContext } from "../contexts/PrivateChatsContext";
import { useUserInfoContext } from "../contexts/UserInfoContext";
import { postResource } from "../utils/apiRequest";

export default function MuteButton({ currentlyMuted }) {
  const { userInfo, setUserInfo } = useUserInfoContext();
  const { setPrivateChats } = usePrivateChatsContext();

  const clickHandler = () => {
    const dataHandler = (data) => {
      setUserInfo(data);
      setPrivateChats((chats) => {
        const chatsCopy = [...chats];
        const index = chatsCopy.findIndex(
          (elem) => elem.id === data.current_chat_id
        );
        if (index === -1) return; // shouldn't be here.
        chatsCopy[index] = data.current_chat;
        return chatsCopy;
      });
    };

    postResource(
      `/api/v1/private_chats/${userInfo.current_chat_id}/silence`,
      JSON.stringify({}),
      "POST",
      dataHandler
    );
  };

  return (
    <button
      onClick={clickHandler}
      aria-label={currentlyMuted ? "unmute" : "mute"}
    >
      {currentlyMuted ? <Muted /> : <Unmuted />}
    </button>
  );
}
