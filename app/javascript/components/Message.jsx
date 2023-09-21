import React, { useState } from "react";
import MessageContent from "./MessageContent";
import MessageForm from "./MessageForm";
import { displayDateTime } from "../helpers/datetime";
import copyObjectArr from "../helpers/copy";
import { makeAPIPostRequest } from "../helpers/apiRequest";

export default Message = ({
  user,
  message,
  currentRoom,
  messages,
  setMessages,
  interlocutor,
}) => {
  const [editing, setEditing] = useState(false);

  const isOwner = message.user && message.user.id == user.id;

  const messageDisplayName = isOwner
    ? message.user.username
    : interlocutor
    ? interlocutor
    : message.user
    ? message.user.username
    : "user no longer exists";

  const editClickHandler = () => {
    setEditing(true);
  };

  const deleteClickHandler = () => {
    const url = `/api/v1/messages/destroy/${message.id}`;
    const method = "DELETE";
    const fetchBody = {};

    const setState = (parsedResponse) => {
      const newMessages = copyObjectArr(messages);
      const afterDelete = newMessages.filter(
        (elem) => elem.id !== parsedResponse.id
      );
      setMessages(afterDelete);
    };

    const errorSetter = (error) => {
      console.log(error);
    };

    makeAPIPostRequest(url, fetchBody, method, errorSetter, setState);
  };

  return (
    <>
      {!editing && (
        <div
          className={`flex flex-col w-5/6 items-end ${
            isOwner ? "" : "self-end"
          }`}
        >
          <MessageContent user={user} message={message} isOwner={isOwner} />
          {isOwner && (
            <div className="flex gap-2 items-center">
              <button onClick={editClickHandler}>edit</button>|
              <button
                className="text-coolpink-500 dark:text-melon-500"
                onClick={deleteClickHandler}
              >
                delete
              </button>
            </div>
          )}
        </div>
      )}
      {editing && (
        <div className="flex gap-2 items-center justify-center">
          <MessageForm
            message={message}
            currentRoom={currentRoom}
            setEditing={setEditing}
          />
        </div>
      )}
      <p
        className={`${
          isOwner ? "self-end" : "self-start"
        } flex items-center gap-1`}
      >
        <span>{messageDisplayName}</span>
        <span className="text-sm">{displayDateTime(message.created_at)}</span>
      </p>
    </>
  );
};
