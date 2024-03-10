import React, { useState } from "react";
import EditMessageForm from "./EditMessageForm";
import MessageContent from "./MessageContent";

export default function Message({ message }) {
  const [editing, setEditing] = useState(false);

  const toggleEditing = () => {
    setEditing((val) => !val);
  };

  return (
    <div>
      {editing ? (
        <EditMessageForm message={message} />
      ) : (
        <MessageContent message={message} />
      )}
      <button onClick={toggleEditing}>{editing ? "cancel" : "edit"}</button>
    </div>
  );
}
