import React, { useState } from "react";
import EditMessageForm from "./EditMessageForm";
import MessageContent from "./MessageContent";
import { useUserInfoContext } from "../contexts/UserInfoContext";
import Delete from "../icons/Delete";
import { blocked } from "../utils/chats";

export default function Message({ message, setMessages }) {
  const { userInfo } = useUserInfoContext();
  const [editing, setEditing] = useState(false);

  const isOwner = message.user.id === userInfo.id;
  const isBlocked = blocked(userInfo);
  const isPrivate = message.is_private;

  console.log("MESSAGE", message);

  const deleteButtonHandler = () => {
    console.log("clicked!");
    confirm("Are you sure? Deleted messages are not recoverable.");

    const dataHandler = (data) => {
      setMessages((messages) => {
        return messages.filter((elem) => elem.id !== data.id);
      });
    };

    // TODO: add request -- then need to set messages by removing the deleted message

    // get the deleted message back and remove it from messages

    // PROBLEM: right now only can do "deleting" private messages
  };

  return (
    <div className={`relative group ${isOwner ? "self-end" : "self-start"}`}>
      <button
        onClick={() => setEditing(true)}
        disabled={isBlocked || editing || !message.body}
        className="w-full flex flex-col gap-1"
      >
        {editing ? (
          <EditMessageForm message={message} setEditing={setEditing} />
        ) : (
          <MessageContent message={message} />
        )}
      </button>
      {isPrivate && (
        <button
          className={`opacity-0 group-hover:opacity-100 focus:opacity-100 absolute flex items-center justify-center p-2 bg-neutral-800 dark:bg-neutral-700/90 rounded-full top-0 translate-y-[-10px] ${
            isOwner
              ? "left-0 translate-x-[-12px]"
              : "right-0 translate-x-[12px]"
          }`}
          onClick={deleteButtonHandler}
          tabIndex={0}
          aria-label="delete message"
        >
          <Delete />
        </button>
      )}
    </div>
  );
}
