import React, { useState } from "react";
import NewTextMessageInput from "./NewTextMessageInput";
import NewImageMessageInput from "./NewImageMessageInput";
import Camera from "../icons/Camera";

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
          <svg
            className="size-6 fill-poppy-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              fill=""
              d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
            />
          </svg>
        </button>
      )}
      {text && <NewTextMessageInput />}
      {!text && <NewImageMessageInput />}
    </div>
  );
}

// also, want to disable the submission UNLESS there is a current user/chat?

// CLOSE ICON should take class names as a param
