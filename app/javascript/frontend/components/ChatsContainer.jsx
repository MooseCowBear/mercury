import React, { useEffect, useState } from "react";
import ChatCard from "./ChatCard";
import { getResource } from "../utils/apiRequest";
//import { useActionCableContext } from "../contexts/ActionCableContext";
import { useActionCable } from "../hooks/useActionCable";

export default function ChatsContainer({ title, isPrivate }) {
  const { cable } = useActionCable();
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();

    const url = isPrivate
      ? "/api/v1/private_chats/index"
      : "/api/v1/public_chats/index";

    getResource(url, abortController, setChats);

    return () => {
      abortController.abort();
    };
  }, []);

  // which subscription depends on private or not

  return (
    <div className="py-4 min-h-0 min-w-0">
      <h3 className="px-2 text-xs uppercase text-neutral-500">{title}</h3>
      <div className="flex flex-col divide-y-[1px]">
        {chats.map((chat) => {
          return <ChatCard key={chat.id} chat={chat} />;
        })}
      </div>
    </div>
  );
}

// TODO: add cable subscription

// this is where we will want to consume the action cable broadcast for chats
// if chats is a state of this container, is that ok?

// current chat should be a context to be consumed here
// and also in the messages container...

// which channel it listens to depends on whether its private or not

// NEED TWO SUBSCRIPTIONS! one for private one for public each will handle own
