import React from "react";

//OLD

export default MessageContent = ({ message, isOwner }) => {
  const edited = message.created_at !== message.updated_at;

  return (
    <p
      className={`flex flex-col px-5 py-2 border-2 w-full rounded-tr-xl rounded-tl-xl ${
        isOwner
          ? "bg-teal-500/10 self-start border-teal-200/60 dark:border-teal-500/60 rounded-bl-xl"
          : "bg-gray-100 self-end dark:bg-gray-500/50 rounded-br-xl dark:border-gray-500"
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
