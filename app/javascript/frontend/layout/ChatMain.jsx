import React from "react";
import MessageContainer from "../components/MessageContainer";
import MessageFormContainer from "../components/MessageFormContainer";

export default function ChatMain() {
  return (
    <div className="bg-white p-5 rounded-xl shadow grid grid-cols-1 grid-rows-[1fr,_auto]">
      <MessageContainer />
      <MessageFormContainer />
    </div>
  );
}
