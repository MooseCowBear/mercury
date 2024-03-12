import React from "react";
import MessageContainer from "../components/MessageContainer";
import MessageFormContainer from "../components/MessageFormContainer";
import { useUserInfoContext } from "../contexts/UserInfoContext";
import { useVisibilityContext } from "../contexts/VisibilityContext";

export default function ChatMain() {
  const { userInfo } = useUserInfoContext();
  const { visibility } = useVisibilityContext();
  const visible = visibility.messages;

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
