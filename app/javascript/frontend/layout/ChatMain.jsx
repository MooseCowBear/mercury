import React from "react";
import MessageContainer from "../components/MessageContainer";
import MessageFormContainer from "../components/MessageFormContainer";
import { useUserInfoContext } from "../contexts/UserInfoContext";

export default function ChatMain({ visible }) {
  const { userInfo } = useUserInfoContext();

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
