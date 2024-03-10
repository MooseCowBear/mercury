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

  const updateHandler = (e) => {
    // if they clicked cancel button do nothing
    if (e.target.dataset.action === "cancel") {
      return;
    }
    const input = document.getElementById("body").value.trim();
    if (input === "") {
      setError("Message must have content.");
    } else if (input === message.body) {
      setEditing(false);
      return;
    }

    const chat_id = userInfo.current_chat_id;
    postResource(
      `/api/v1/messages/${message.id}`,
      JSON.stringify({ body, chat_id }),
      "PATCH",
      dataHandler,
      setError
    ); // DO I WANT TO SET ERROR HERE? -- check this
  };

  return (
    <div className="flex flex-col items-center gap-1 justify-between self-end">
      {error && <span className="justify-self-center text-xs">{error}</span>}
      <input
        autoFocus
        id="body"
        type="text"
        value={body}
        onChange={changeHandler}
        onBlur={updateHandler}
        className="w-full px-5 py-2 rounded-tr-xl rounded-tl-xl self-start rounded-bl-xl border border-poppy-500"
      />
    </div>
  );
}
