import React from "react";

export default MessageContent = ({ message, isOwner }) => {
  const edited = message.created_at !== message.updated_at;

  return (
    <p
      className={`flex flex-col px-5 py-2 border-2 w-full rounded-md ${
        isOwner
          ? "bg-teal-400/10 self-start border-teal-200/60 "
          : "bg-gray-100 self-end dark:bg-gray-500/50 border-gray-500"
      }`}
    >
      <span className="self-start">{message.body}</span>
      {edited && <span className="text-xs text-gray-400 self-end">edited</span>}
    </p>
  );
};
