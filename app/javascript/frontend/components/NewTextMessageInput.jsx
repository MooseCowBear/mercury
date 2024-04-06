import React, { useState } from "react";
import SendMessageButton from "./SendMessageButton";
import { useUserInfoContext } from "../contexts/UserInfoContext";
import { postResource } from "../utils/apiRequest";
import { blocked } from "../utils/chats";

export default function NewTextMessageInput() {
  const { userInfo } = useUserInfoContext();
  const [input, setInput] = useState("");
  const [error, setError] = useState(null);

  const disable = blocked(userInfo);
  const placeholder = disable
    ? !userInfo || !userInfo.current_chat_id
      ? "Join a chat to message"
      : "Unblock to send a message"
    : "What's on your mind...";

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

    postResource("/api/v1/messages", JSON.stringify({ body, chat_id }), "POST")
      .then((data) => dataHandler(data))
      .catch((e) => console.log(e));
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
          id="new-text-message"
          aria-label="message form"
          className="border py-1 px-5 rounded-full text-sm w-full dark:bg-neutral-800/90"
          placeholder={placeholder}
          value={input}
          onChange={changeHandler}
          onKeyDown={enterKeyHandler}
          disabled={disable}
        />
      </div>
      <SendMessageButton submitHandler={submitMessage} disable={disable} />
    </>
  );
}
