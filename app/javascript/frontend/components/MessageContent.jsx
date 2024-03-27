import React from "react";
import { useUserInfoContext } from "../contexts/UserInfoContext";
import { editedMessage, ownedByUser } from "../utils/messages";

export default function MessageContent({ message }) {
  const { userInfo } = useUserInfoContext();
  const edited = editedMessage(message);
  const isOwner = ownedByUser(message, userInfo);
  const username = message.user ? message.user.username : ""; // in case message sender deleted account

  return (
    <div
      className={`relative flex items-end gap-2 ${
        isOwner ? "self-end" : "self-start"
      }`}
    >
      {!isOwner && <span className="grow-0">{username}</span>}
      <div
        className={`flex flex-col grow ${isOwner ? "self-start" : "self-end"}`}
      >
        {message.body && (
          <span
            className={`text-left px-5 py-2 rounded-tr-xl rounded-tl-xl ${
              isOwner
                ? "bg-raspberry-500 dark:bg-raspberry-500/90 text-white rounded-bl-xl"
                : "bg-neutral-100 dark:bg-neutral-100/80 dark:text-neutral-800 rounded-br-xl"
            }`}
          >
            {message.body}
          </span>
        )}
        {message.image && (
          <img
            src={message.image}
            alt="image message"
            className="self-center max-w-[150px] max-h-[150px] rounded-md"
          />
        )}
        {edited && (
          <span className={`text-xs self-end text-neutral-400`}>edited</span>
        )}
      </div>
    </div>
  );
}
