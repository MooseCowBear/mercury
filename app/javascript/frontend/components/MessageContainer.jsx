import React, { useState, useEffect } from "react";
import Message from "./Message";
import { useActionCableContext } from "../contexts/ActionCableContext";
import { useUserInfoContext } from "../contexts/UserInfoContext";
import { useMessages } from "../hooks/useMessages";

export default function MessageContainer() {
  const { userInfo } = useUserInfoContext();
  const { cable } = useActionCableContext();

  const [scroll, setScroll] = useState(true);

  const { error, messages, setMessages } = useMessages(userInfo, setScroll, cable);

  const scrollMessages = () => {
    const container = document.getElementById("messages-container");
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  };

  useEffect(() => {
    scrollMessages();
  }, [scroll]);

  if (error) return <p>Something went wrong.</p>;
  if (!userInfo) return <p>Loading...</p>;

  return (
    <div
      id="messages-container"
      className="overflow-y-auto flex flex-col gap-3 mb-2 xs:px-2 mx-4 py-3"
    >
      {messages.map((message) => {
        return (
          <Message
            key={message.id}
            message={message}
            setMessages={setMessages}
          />
        );
      })}
    </div>
  );
}
