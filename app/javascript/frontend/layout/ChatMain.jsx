import React from "react";
import MessageContainer from "../components/MessageContainer";
import MessageFormContainer from "../components/MessageFormContainer";

export default function ChatMain({ visible }) {
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
