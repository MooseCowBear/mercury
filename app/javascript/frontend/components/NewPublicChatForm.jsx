import React, { useState } from "react";
import { postResource } from "../utils/apiRequest";
import { useUserInfoContext } from "../contexts/UserInfoContext";
import { useVisibilityContext } from "../contexts/VisibilityContext";

export default function NewPublicChatForm({
  setNewChatForm,
  setChats
}) {
  const { setUserInfo } = useUserInfoContext();
  const { chatVisibilityHandler } = useVisibilityContext();
  const [input, setInput] = useState("");
  const [error, setError] = useState(null);

  const changeHandler = (e) => {
    setInput(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (input.trim() === "" || input.trim().length > 45) {
      setError("Chat must have a name under 45 characters.");
      return;
    }

    const dataHandler = (data) => {
      if (data.hasOwnProperty("errors")) {
        console.log(data);
        setError(data.errors.join(", "));
      } else {
        setNewChatForm(false);
        setUserInfo(data);
        setChats((chats) => {
          const copy = [...chats];
          copy.push(data.current_chat);
          return copy;
        })
        // on desktop, won't do anything. on mobile will swap the chats for messages
        // bc if you created a room, then you probably will want to send a message to it
        chatVisibilityHandler();
      }
    };

    postResource(
      "/api/v1/public_chats/create",
      JSON.stringify({ name: input }),
      "POST",
      dataHandler
    );
  };

  const cancelHandler = () => {
    setNewChatForm(false);
  };

  return (
    <form
      onSubmit={submitHandler}
      className="w-full flex flex-col gap-1 justify-between items-center py-2 px-3"
    >
      {error && <span className="justify-self-center text-xs">{error}</span>}
      <input
        aria-label="new chat name"
        type="text"
        onChange={changeHandler}
        className="w-full border rounded-full px-3 py-1 text-sm lowercase tracking-wider"
      />
      <div className="w-full flex justify-between">
        <button
          type="button"
          onClick={cancelHandler}
          className="text-xs uppercase"
        >
          cancel
        </button>
        <button type="submit" className="text-xs uppercase">
          create
        </button>
      </div>
    </form>
  );
}
