import React from "react";

export default MessageContent = ({ message, isOwner }) => {
  return (
    <p
      className={`px-5 py-2 border-2 w-full rounded-md ${
        isOwner ? "bg-cyan-50 self-start" : "bg-gray-100 self-end"
      }`}
    >
      {message.body}
    </p>
  );
};
