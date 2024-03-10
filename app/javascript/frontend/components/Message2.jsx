import React, { useState } from "react";
import EditMessageForm from "./EditMessageForm";
import MessageContent from "./MessageContent";

export default function Message({ message }) {
  const [editing, setEditing] = useState(false);

  const toggleEditing = () => {
    setEditing((val) => !val);
  };

  return (
    <div className="flex flex-col gap-1">
      {editing ? (
        <EditMessageForm message={message} setEditing={setEditing} />
      ) : (
        <MessageContent message={message} />
      )}

      <button
        data-action="cancel"
        className={`uppercase text-xs self-end`}
        onClick={toggleEditing}
      >
        {editing ? "cancel" : "edit"}
      </button>
    </div>
  );
}

// do i want to have an edit button? maybe just click the message to edit (if own message)...
// add info about who sent the message, message.user.username
