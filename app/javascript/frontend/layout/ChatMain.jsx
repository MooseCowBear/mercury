import React from "react";
import MessageContainer from "../components/MessageContainer";
import MessageFormContainer from "../components/MessageFormContainer";
import { useCurrentChatContext } from "../contexts/CurrentChatContext";

export default function ChatMain({ visible }) {
  const { currUser, currChat } = useCurrentChatContext();

  return (
    <div
      className={`${
        visible
          ? "bg-white p-5 rounded-xl shadow grid grid-cols-1 grid-rows-[1fr,_auto]"
          : "hidden"
      }`}
    >
      <MessageContainer />
      <MessageFormContainer />
    </div>
  );
}
