import React, { useState } from "react";
import EditMessageForm from "./EditMessageForm";
import MessageContent from "./MessageContent";
import { useUserInfoContext } from "../contexts/UserInfoContext";

export default function Message({ message }) {
  const { userInfo } = useUserInfoContext();
  const [editing, setEditing] = useState(false);

  const isOwner = message.user.id === userInfo.id;

  const toggleEditing = () => {
    if (isOwner) {
      setEditing((val) => !val);
    }
  };

  return (
    <button onClick={toggleEditing} className="w-full flex flex-col gap-1">
      {editing ? (
        <EditMessageForm message={message} setEditing={setEditing} />
      ) : (
        <MessageContent message={message} />
      )}

    </button>
  );
}

// do i want to have an edit button? maybe just click the message to edit (if own message)...
// add info about who sent the message, message.user.username

// do we want a tool tip or something to indicate can be edited?