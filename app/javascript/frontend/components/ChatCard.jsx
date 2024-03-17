import React from "react";
import { displayDateTime } from "../utils/datetime";
import { useUserInfoContext } from "../contexts/UserInfoContext";
import { postResource } from "../utils/apiRequest";
import { chatTitle, clearNotifications } from "../utils/chats";
import { usePrivateChatsContext } from "../contexts/PrivateChatsContext";

export default function ChatCard({ chat }) {
  const { userInfo, setUserInfo } = useUserInfoContext();
  const { privateChats, setPrivateChats } = usePrivateChatsContext();
  const currChatId = userInfo ? userInfo.current_chat_id : null;

  const isPrivate = chat.is_private;

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
      if (data.current_chat.is_private) {
        setPrivateChats(clearNotifications(data.current_chat_id, privateChats));
      }
    };
    postResource(
      `/api/v1/users/${userInfo.id}`,
      JSON.stringify({ user: { current_chat_id: chat.id } }),
      "PATCH",
      dataHandler
    );
  };

  return (
    <button
      className={`w-full grid grid-cols-[1fr,_auto] py-2 px-4 ${
        currChatId == chat.id && "bg-neutral-100"
      }`}
      onClick={clickHandler}
    >
      <div className="grid grid-col-[auto,_1fr] grid-rows-2 gap-x-2 text-nowrap justify-start">
        <div className="size-10 rounded-full row-span-2 bg-neutral-800"></div>
        <h4 className="text-sm font-medium col-start-2 text-left text-ellipsis overflow-hidden">
          {chatTitle(chat, userInfo)}
        </h4>
        <p className="text-xs text-neutral-500 col-start-2 text-left truncate overflow-hidden">
          {preview}
        </p>
      </div>

      <div className="flex flex-col gap-2 items-end justify-between">
        <p className="text-xs self-start text-nowrap">{time}</p>
        <div
          className={`flex items-center justify-center rounded-full size-6 text-white text-sm ${
            isPrivate && chat.notification_count > 0 && "bg-poppy-500"
          }`}
        >
          {chat.notification_count}
        </div>
      </div>
    </button>
  );
}
