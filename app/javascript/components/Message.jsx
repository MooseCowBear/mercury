import React, { useState } from "react";
import MessageContent from "./MessageContent";
import MessageForm from "./MessageForm";
import { editMessageSubmitHandler } from "../helpers/submitHandlers";
import { displayDateTime } from "../helpers/datetime";

export default Message = ({ user, message, currentRoom }) => {
  const [editing, setEditing] = useState(false);

  const isOwner = message.user.id == user.id;

  const editClickHandler = () => {
    setEditing(true);
  };

  const cancelClickHandler = () => {
    setEditing(false);
  }

  return (
    <>
      {!editing && (
        <div className="flex flex-col w-5/6 items-end">
          <MessageContent user={user} message={message} isOwner={isOwner} />
          {isOwner && <button onClick={editClickHandler}>edit</button>}
        </div>
      )}
      {editing && (
        <div>
          <MessageForm
            message={message}
            currentRoom={currentRoom}
            variableSubmitHandler={editMessageSubmitHandler}
            setEditing={setEditing}
          />
          <button onClick={cancelClickHandler}>cancel</button>
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
