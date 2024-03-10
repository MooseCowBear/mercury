import React from "react";
import { useUserInfoContext } from "../contexts/UserInfoContext";

export default MessageContent = ({ message }) => {
  const { userInfo } = useUserInfoContext();
  const edited = message.created_at !== message.updated_at;
  const isOwner = message.user.id === userInfo.id;

  return (
    <p
      className={`flex flex-col px-5 py-2 w-full rounded-tr-xl rounded-tl-xl ${
        isOwner
          ? "self-start rounded-bl-xl bg-poppy-500 text-white"
          : "self-end rounded-br-xl bg-neutral-100"
      }`}
    >
      {message.body && <span className="self-start">{message.body}</span>}
      {message.image && (
        <img
          src={message.image}
          alt=""
          className="self-center max-w-[150px] max-h-[150px] rounded-md"
        />
      )}
      {edited && (
        <span
          className={`text-xs self-end ${
            isOwner ? "text-white" : "text-gray-400"
          }`}
        >
          edited
        </span>
      )}
    </p>
  );
};
