import React, { useState } from "react";
import NewTextMessageInput from "./NewTextMessageInput";
import NewImageMessageInput from "./NewImageMessageInput";

export default function MessageFormContainer() {
  const [text, setText] = useState(true);

  return (
    <div className="grid grid-cols-[auto,_1fr,_auto] gap-2 items-center">
      {text && (
        <button aria-label="add image" onClick={() => setText(false)}>
          <svg
            className="size-6 fill-poppy-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              fill=""
              d="M4,4H7L9,2H15L17,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9Z"
            />
          </svg>
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

