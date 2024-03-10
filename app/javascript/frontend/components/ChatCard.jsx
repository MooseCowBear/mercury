import React from "react";
import { displayDateTime } from "../utils/datetime";
import { useUserInfoContext } from "../contexts/UserInfoContext";
import { postResource } from "../utils/apiRequest";

export default function ChatCard({ chat }) {
  const { userInfo } = useUserInfoContext();

  const isPrivate = chat.is_private;

  const privateTitle = (chat) => {
    return chat.users
      .filter((u) => u.username !== userInfo.username)
      .map((u) => u.username)
      .join(", ");
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
    const dataHandler = () => {
      setCurrChat(chat.id);
    };
    postResource(
      "/api/v1/users/update",
      JSON.stringify({ user: { current_chat_id: chat.id } }),
      "post",
      dataHandler
    );
  };

  return (
    <button
      className={`w-full flex justify-between items-center py-2 px-3 ${
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

// TODO: needs notifications!

// add max width to the card
