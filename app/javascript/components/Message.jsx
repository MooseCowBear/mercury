import React, { useState } from "react";
import MessageContent from "./MessageContent";
import MessageForm from "./MessageForm";
import { editMessageSubmitHandler } from "../helpers/messageSubmitHandlers";
import { displayDateTime } from "../helpers/datetime";
import copyObjectArr from "../helpers/copy";

export default Message = ({
  user,
  message,
  currentRoom,
  messages,
  setMessages,
}) => {
  const [editing, setEditing] = useState(false);

  const isOwner = message.user.id == user.id;

  const editClickHandler = () => {
    setEditing(true);
  };

  const deleteClickHandler = () => {
    const deleteMessage = async () => {
      const url = `/api/v1/messages/destroy/${message.id}`;
      const token = document.querySelector('meta[name="csrf-token"]').content;

      try {
        const response = await fetch(url, {
          method: "DELETE",
          headers: {
            "X-CSRF-Token": token,
            "Content-Type": "application/json",
          },
        });

        if (response.status !== 200 && response.status !== 422) {
          throw new Error("A network error occured.");
        }

        const parsedResponse = await response.json();

        const newMessages = copyObjectArr(messages);
        const afterDelete = newMessages.filter(
          (elem) => elem.id !== parsedResponse.id
        );
        setMessages(afterDelete);
      } catch (error) {
        console.log(error);
        // how to handle an error for this one?
      }
    };
    deleteMessage();
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
                className="text-coolpink-500"
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
            variableSubmitHandler={editMessageSubmitHandler}
            setEditing={setEditing}
          />
        </div>
      )}
      <p
        className={`${
          isOwner ? "self-end" : "self-start"
        } flex items-center gap-1`}
      >
        <span>{message.user.username}</span>
        <span className="text-sm">{displayDateTime(message.created_at)}</span>
      </p>
    </>
  );
};
