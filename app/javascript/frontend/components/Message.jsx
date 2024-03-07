import React, { useState } from "react";
import MessageContent from "./MessageContent";
import MessageForm from "./MessageForm";
import { displayDateTime } from "../helpers/datetime";
import { makePostRequest } from "../helpers/apiRequest";
import { updateMessagesAfterDelete } from "../helpers/message";

//OLD

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
    ? ""
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

    const errorSetter = (error) => {
      console.log(error);
    };

    makePostRequest(url, fetchBody, method)
      .then((data) =>
        setMessages((messages) => updateMessagesAfterDelete(data, messages))
      )
      .catch((error) => errorSetter(error));
  };

  return (
    <>
      {!editing && (
        <div
          className={`flex flex-col w-11/12 items-end ${
            isOwner ? "" : "self-end"
          }`}
        >
          <MessageContent user={user} message={message} isOwner={isOwner} />
          {isOwner && (
            <div className="flex gap-2 items-center">
              {message.body && (
                <>
                  <button onClick={editClickHandler}>edit</button>|
                </>
              )}
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
        } flex items-center gap-1 mb-2`}
      >
        <span className="text-sm">{messageDisplayName}</span>
        <span className="text-sm">{displayDateTime(message.created_at)}</span>
      </p>
    </>
  );
};
