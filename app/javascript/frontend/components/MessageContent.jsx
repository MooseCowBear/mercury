import React from "react";
import { useUserInfoContext } from "../contexts/UserInfoContext";
import { editedMessage, ownedByUser } from "../utils/messages";

export default function MessageContent({ message }) {
  const { userInfo } = useUserInfoContext();
  const edited = editedMessage(message);
  const isOwner = ownedByUser(message, userInfo);

  return (
    <div
      className={`flex items-end gap-2 ${isOwner ? "self-end" : "self-start"}`}
    >
      {!isOwner && <span className="grow-0">{message.user.username}</span>}
      <p
        className={`flex flex-col grow rounded-tr-xl rounded-tl-xl overflow-hidden ${
          isOwner ? "self-start rounded-bl-xl" : "self-end rounded-br-xl"
        }`}
      >
        {message.body && (
          <span
            className={`text-left px-5 py-2 ${
              isOwner
                ? "bg-poppy-500 text-white dark:text-neutral-800"
                : "bg-neutral-100"
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
          <span
            className={`text-xs self-end ${
              isOwner ? "text-white" : "text-gray-400"
            }`}
          >
            edited
          </span>
        )}
      </p>
    </div>
  );
}
