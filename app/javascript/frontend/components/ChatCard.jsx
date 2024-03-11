import React from "react";
import { displayDateTime } from "../utils/datetime";
import { useUserInfoContext } from "../contexts/UserInfoContext";
import { postResource } from "../utils/apiRequest";

export default function ChatCard({ chat }) {
  const { userInfo, setUserInfo } = useUserInfoContext();
  const currChatId = userInfo ? userInfo.current_chat_id : null;

  const isPrivate = chat.is_private;

  const privateTitle = (chat) => {
    /* takes chat's name, which is a string of usernames sorted alphabetically
    andn joined with commas, and replaced curr user's name with 'me', 
    re-sorts and re-joins */
    if (!userInfo) return;
    return chat.name
      .split(", ")
      .map((elem) => {
        if (elem === userInfo.username) {
          return "me";
        } else {
          return elem;
        }
      })
      .sort()
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
    const dataHandler = (data) => {
      setUserInfo(data);
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
        currChatId == chat.id && "bg-neutral-100"
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
            (isPrivate && chat.notification_count > 0) && "bg-poppy-500"
          }`}
        >
          {chat.notification_count}
        </div>
      </div>
    </button>
  );
}

// add max width to the card
