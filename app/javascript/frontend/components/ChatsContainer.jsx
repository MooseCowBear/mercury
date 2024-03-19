import React, { useState } from "react";
import ChatCard from "./ChatCard";
import Plus from "../icons/Plus";
import NewPublicChatForm from "./NewPublicChatForm";
import { useVisibilityContext } from "../contexts/VisibilityContext";

export default function ChatsContainer({ title, chats }) {
  const { peopleVisibilityHandler } = useVisibilityContext();

  const [newChatForm, setNewChatForm] = useState(false); // is the public chat form visible?

  const isPrivate = title === "private";

  const clickHandler = () => {
    if (isPrivate) {
      peopleVisibilityHandler();
    } else {
      setNewChatForm(true);
    }
  };

  return (
    <div className="py-4 min-w-0 min-h-0 grid grid-rows-[auto,_1fr]">
      <div className="px-4 mb-1 flex justify-between items-center">
        <h3 className="text-xs uppercase text-neutral-500 leading-none dark:text-neutral-300">
          {title}
        </h3>
        <button
          aria-label={
            isPrivate ? "create new private chat" : "create new public chat"
          }
          onClick={clickHandler}
          className="bg-poppy-500 p-1 rounded-full"
        >
          <Plus />
        </button>
      </div>
      <div className="flex flex-col divide-y-[1px] dark:divide-neutral-600 overflow-y-auto">
        {newChatForm && <NewPublicChatForm setNewChatForm={setNewChatForm} />}
        {chats.map((chat) => {
          return <ChatCard key={chat.id} chat={chat} />;
        })}
      </div>
    </div>
  );
}
