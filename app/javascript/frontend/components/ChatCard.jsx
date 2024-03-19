import React from "react";
import { displayDateTime } from "../utils/datetime";
import { useUserInfoContext } from "../contexts/UserInfoContext";
import { postResource } from "../utils/apiRequest";
import {
  chatInitial,
  chatMembers,
  chatTitle,
  clearNotifications,
} from "../utils/chats";
import { usePrivateChatsContext } from "../contexts/PrivateChatsContext";
import Group from "../icons/Group";

export default function ChatCard({ chat }) {
  const { userInfo, setUserInfo } = useUserInfoContext();
  const { privateChats, setPrivateChats } = usePrivateChatsContext();
  const currChatId = userInfo ? userInfo.current_chat_id : null;

  const isPrivate = chat.is_private;

  const time = chat.last_message
    ? displayDateTime(chat.last_message.created_at)
    : "";

  const preview =
    chat.last_message && chat.last_message.body ? chat.last_message.body : "";

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
      className={`w-full grid grid-cols-[1fr,_auto] py-2 px-4 items-center ${
        currChatId == chat.id && "bg-neutral-100 dark:bg-neutral-700/90"
      }`}
      onClick={clickHandler}
    >
      <div className="grid grid-col-[auto,_1fr] grid-rows-2 gap-x-2 text-nowrap justify-start">
        {!isPrivate && (
          <div className="size-10 rounded-full row-span-2 flex items-center justify-center bg-neutral-800 text-white uppercase dark:bg-neutral-100 dark:text-neutral-800">
            {chatInitial(chat, userInfo)}
          </div>
        )}
        {isPrivate && <Group members={chatMembers(chat)} />}
        <h4 className="text-sm font-medium col-start-2 text-left text-ellipsis overflow-hidden">
          {chatTitle(chat, userInfo)}
        </h4>
        <p className="text-xs text-neutral-500 col-start-2 text-left truncate overflow-hidden dark:text-neutral-300">
          {preview}
        </p>
      </div>
      <div className="flex flex-col gap-2 items-end justify-between">
        <p className="text-xs self-start text-nowrap">{time}</p>
        <div
          className={`flex items-center justify-center rounded-full size-6 text-transparent text-sm ${
            isPrivate &&
            chat.notification_count > 0 &&
            "bg-poppy-500 text-white"
          }`}
        >
          {chat.notification_count}
        </div>
      </div>
    </button>
  );
}
