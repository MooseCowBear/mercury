import React from "react";
import ChatCard from "./ChatCard";

export default function ChatsContainer({ title, chats, isPrivate }) {
  return (
    <div className="py-4 px-2">
      <h3 className="text-xs uppercase text-neutral-500">{title}</h3>
      <div className="flex flex-col divide-y-[1px]">
        <ChatCard isPrivate={isPrivate} />
        <ChatCard isPrivate={isPrivate} />
      </div>
    </div>
  );
}
