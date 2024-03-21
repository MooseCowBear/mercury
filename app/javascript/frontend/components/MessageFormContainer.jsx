import React, { useState } from "react";
import NewTextMessageInput from "./NewTextMessageInput";
import NewImageMessageInput from "./NewImageMessageInput";
import Camera from "../icons/Camera";
import Close from "../icons/Close";
import { useUserInfoContext } from "../contexts/UserInfoContext";
import { disabled } from "../utils/chats";

export default function MessageFormContainer() {
  const { userInfo } = useUserInfoContext();
  const [text, setText] = useState(true);

  const disable = disabled(userInfo);

  return (
    <div
      className={`grid grid-cols-[auto,_1fr,_auto] items-end gap-2 ${
        disable && "opacity-75"
      }`}
    >
      {text && (
        <button
          aria-label="add image"
          disabled={disable}
          onClick={() => setText(false)}
          className="translate-y-[-1px]"
        >
          <Camera />
        </button>
      )}
      {!text && (
        <button
          aria-label="cancel"
          onClick={() => setText(true)}
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
