import React, { useState } from "react";
import SendMessageButton from "./SendMessageButton";
import { postResource } from "../utils/apiRequest";
import { useUserInfoContext } from "../contexts/UserInfoContext";

// IF not current room, then disable ?

export default function NewTextMessageInput() {
  const { userInfo } = useUserInfoContext();
  const [input, setInput] = useState("");
  const [error, setError] = useState(null);

  const changeHandler = (e) => {
    setInput(e.target.value);
  };

  const submitMessage = () => {
    if (input.trim() === "") {
      setError("Message must have content.");
      return;
    }
    const chat_id = userInfo.current_chat_id;
    const body = input;
    const dataHandler = (data) => {
      if (data.hasOwnProperty("errors")) {
        setError(data.errors.join(", "));
      } else {
        setInput("");
        setError(null);
      }
    };
    postResource(
      "/api/v1/messages",
      JSON.stringify({ body, chat_id }),
      "POST",
      dataHandler
    );
  };

  const enterKeyHandler = (e) => {
    if (e.keyCode !== 13) return;
    submitMessage();
  };

  // change to form + submit button
  return (
    <>
      <div className="flex flex-col items-center">
        {error && <span className="text-xs">{error}</span>}
        <input
          id="input"
          className="border py-1 px-5 rounded-full text-sm w-full dark:bg-neutral-700/90"
          placeholder="what's on your mind..."
          value={input}
          onChange={changeHandler}
          onKeyDown={enterKeyHandler}
        />
      </div>
      <SendMessageButton submitHandler={submitMessage} />
    </>
  );
}
