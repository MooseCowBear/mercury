import React from "react";
import { useUserInfoContext } from "../contexts/UserInfoContext";

export default MessageContent = ({ message }) => {
  const { userInfo } = useUserInfoContext();
  const edited = message.created_at !== message.updated_at;
  const isOwner = message.user.id === userInfo.id;

  // TODO: update STYLING

  return (
    <p
      className={`flex flex-col px-5 py-2 border-2 w-full rounded-tr-xl rounded-tl-xl ${
        isOwner ? "self-start rounded-bl-xl" : "self-end rounded-br-xl "
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
      {edited && <span className="text-xs text-gray-400 self-end">edited</span>}
    </p>
  );
};
