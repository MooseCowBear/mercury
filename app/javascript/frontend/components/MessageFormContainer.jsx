import React, { useState } from "react";
import NewTextMessageInput from "./NewTextMessageInput";
import NewImageMessageInput from "./NewImageMessageInput";
import Camera from "../icons/Camera";
import Close from "../icons/Close";

export default function MessageFormContainer() {
  const [text, setText] = useState(true);

  return (
    <div className="grid grid-cols-[auto,_1fr,_auto] items-end gap-2">
      {text && (
        <button
          aria-label="add image"
          onClick={() => setText(false)}
          className="translate-y-[-1px]"
        >
          <Camera />
        </button>
      )}
      {!text && (
        <button
          onClick={() => setText(true)}
          aria-label="cancel"
          className="translate-y-[-1px]"
        >
          <Close />
        </button>
      )}
      {text && <NewTextMessageInput />}
      {!text && <NewImageMessageInput />}
    </div>
  );
}

// also, want to disable the submission UNLESS there is a current user/chat?
