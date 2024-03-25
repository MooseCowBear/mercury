import React, { useState } from "react";
import { postResource } from "../utils/apiRequest";
import { useUserInfoContext } from "../contexts/UserInfoContext";

export default function EditMessageForm({ message, setEditing }) {
  const { userInfo } = useUserInfoContext();
  const [body, setBody] = useState(message.body);
  const [error, setError] = useState(null);

  const changeHandler = (e) => {
    setBody(e.target.value);
  };

  const dataHandler = (data) => {
    if (data.hasOwnProperty("errors")) {
      setError(data.errors.join(", "));
    } else {
      setEditing(false);
    }
  };

  const updateHandler = () => {
    if (body === "") {
      setError("Message must have content.");
      return;
    } else if (body === message.body) {
      setEditing(false);
      return;
    }

    const chat_id = userInfo.current_chat_id;

    postResource(
      `/api/v1/messages/${message.id}`,
      JSON.stringify({ body, chat_id }),
      "PATCH"
    )
      .then((data) => dataHandler(data))
      .catch((e) => setError(e));
  };

  return (
    <div className="flex flex-col items-center gap-1 justify-between self-end">
      {error && <span className="justify-self-center text-xs">{error}</span>}
      <input
        autoFocus
        id="edit-message"
        aria-label="edit message"
        type="text"
        value={body}
        onChange={changeHandler}
        onBlur={updateHandler}
        className="focus:outline-none w-full px-5 py-2 rounded-tr-xl rounded-tl-xl self-start rounded-bl-xl border border-poppy-500 dark:bg-neutral-800/90"
      />
    </div>
  );
}
