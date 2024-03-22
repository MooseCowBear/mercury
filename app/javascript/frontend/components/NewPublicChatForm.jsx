import React, { useState } from "react";
import { postResource } from "../utils/apiRequest";
import { useUserInfoContext } from "../contexts/UserInfoContext";
import { useVisibilityContext } from "../contexts/VisibilityContext";
import { usePublicChatsContext } from "../contexts/PublicChatsContext";

/* when a user creates a new public chat, it won't be broadcast until a message
has been sent. but, want the creator to see the new chat (which they have been moved to).
so we get the new chat information from the backend response and update the public 
chats context */

export default function NewPublicChatForm({ setNewChatForm }) {
  const { setUserInfo } = useUserInfoContext();
  const { chatVisibilityHandler } = useVisibilityContext();
  const { setPublicChats } = usePublicChatsContext();

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
        setPublicChats((chats) => {
          const updatedChats = [data.current_chat].concat(chats);
          return updatedChats;
        });
        chatVisibilityHandler();
      }
    };

    postResource(
      "/api/v1/public_chats",
      JSON.stringify({ name: input }),
      "POST"
    )
      .then((data) => dataHandler(data))
      .catch((e) => console.log(error));
  };

  const cancelHandler = () => {
    setNewChatForm(false);
  };

  const enterKeyHandler = (e) => {
    if (e.keyCode !== 13) return;
    submitHandler();
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
        onKeyDown={enterKeyHandler}
        className="w-full border rounded-full px-3 py-1 text-sm lowercase tracking-wider dark:bg-neutral-800/90"
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
