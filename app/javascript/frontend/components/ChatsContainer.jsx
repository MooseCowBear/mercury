import React, { useEffect, useState } from "react";
import ChatCard from "./ChatCard";

export default function ChatsContainer({ title, isPrivate }) {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();

    const getPrivateChats = async () => {
      try {
        const response = await fetch("/api/v1/private_chats/index", {
          mode: "cors",
          signal: abortController.signal,
        });

        if (response.status >= 400) {
          console.log(response.status);
          throw new Error("server error");
        }
        const data = await response.json();
        setChats(data);
      } catch (e) {
        console.log(e);
      }
    };

    const getPublicChats = async () => {
      try {
        const response = await fetch("/api/v1/public_chats/index", {
          mode: "cors",
          signal: abortController.signal,
        });

        if (response.status >= 400) {
          console.log(response.status);
          throw new Error("server error");
        }
        const data = await response.json();
        setChats(data);
      } catch (e) {
        console.log(e);
      }
    };
    if (isPrivate) {
      getPrivateChats();
    } else {
      getPublicChats();
    }

    return () => {
      abortController.abort(); // cancel request if unmount
    };
  }, []);

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

// this is where we will want to consume the action cable broadcast for chats
// if chats is a state of this container, is that ok?

// current chat should be a context to be consumed here
// and also in the messages container...

// which channel it listens to depends on whether its private or not
