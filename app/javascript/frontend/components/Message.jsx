import React, { useState } from "react";
import EditMessageForm from "./EditMessageForm";
import MessageContent from "./MessageContent";
import { useUserInfoContext } from "../contexts/UserInfoContext";

export default function Message({ message }) {
  const { userInfo } = useUserInfoContext();
  const [editing, setEditing] = useState(false);

  const isOwner = message.user.id === userInfo.id;

  return (
    <button
      onClick={() => setEditing(true)}
      disabled={!isOwner || editing || !message.body}
      className="w-full flex flex-col gap-1"
    >
      {editing ? (
        <EditMessageForm message={message} setEditing={setEditing} />
      ) : (
        <MessageContent message={message} />
      )}
    </button>
  );
}

// do we want a tool tip or something to indicate can be edited?
