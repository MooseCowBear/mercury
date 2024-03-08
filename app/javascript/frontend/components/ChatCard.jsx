import React from "react";
import { displayDateTime } from "../utils/datetime";
import { useCurrentChatContext } from "../contexts/CurrentChatContext";

export default function ChatCard({ chat }) {
  const { currChat, setCurrChat } = useCurrentChatContext();

  const isPrivate = chat.is_private;

  const privateTitle = (chat) => {
    return chat.users.map((u) => u.username).join(", ");
  };

  const title = isPrivate ? privateTitle(chat) : chat.name;

  const time = chat.last_message
    ? displayDateTime(chat.last_message.created_at)
    : "";

  const preview = chat.last_message
    ? chat.last_message.body
      ? chat.last_message.body
      : ""
    : "";

  const clickHandler = () => {
    setCurrChat(chat.id);
    // TODO: needs to send a fetch to back end to update
  };

  return (
    <button
      className={`w-full flex justify-between items-center p-2 ${
        currChat == chat.id && "bg-neutral-100"
      }`}
      onClick={clickHandler}
    >
      <div className="grid grid-col-[auto,_1fr] grid-rows-2 gap-x-2 items-center">
        <div className="size-10 rounded-full row-span-2 bg-neutral-800"></div>
        <h4 className="text-sm font-medium col-start-2 text-left text-ellipsis overflow-hidden">
          {title}
        </h4>
        <p className="text-xs text-neutral-500 col-start-2 text-left text-ellipsis overflow-hidden">
          {preview}
        </p>
      </div>

      <div className="flex flex-col gap-2 items-end justify-between">
        <p className="text-xs self-start">{time}</p>
        <div
          className={`flex items-center justify-center rounded-full size-6 text-white text-sm ${
            isPrivate && "bg-poppy-500"
          }`}
        >
          3
        </div>
      </div>
    </button>
  );
}
