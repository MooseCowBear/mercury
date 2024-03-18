import React, { useState } from "react";
import NewTextMessageInput from "./NewTextMessageInput";
import NewImageMessageInput from "./NewImageMessageInput";
import Camera from "../icons/Camera";
import Close from "../icons/Close";

export default function MessageFormContainer() {
  const [text, setText] = useState(true);

  return (
    <div className="grid grid-cols-[auto,_1fr,_auto] gap-2 items-center">
      {text && (
        <button aria-label="add image" onClick={() => setText(false)}>
          <Camera />
        </button>
      )}
      {!text && (
        <button onClick={() => setText(true)} aria-label="cancel">
          <Close />
        </button>
      )}
      {text && <NewTextMessageInput />}
      {!text && <NewImageMessageInput />}
    </div>
  );
}

// also, want to disable the submission UNLESS there is a current user/chat?

