import React, { useEffect, useState, useRef } from "react";
import consumer from "../channels/consumer";
import copyObjectArr from "../helpers/copy";
import Message from "./Message";
import MessageForm from "./MessageForm";
import { getInterlocutor } from "../helpers/privateChats";
import { makeGetRequest } from "../helpers/apiRequest";

export default ChatMessages = ({ user, currentRoom }) => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [scroll, setScroll] = useState(true);

  const chatChannel = useRef(null);

  const scrollMessages = () => {
    const container = document.getElementById("messages-container");
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  };

  useEffect(() => {
    scrollMessages();
  }, [scroll]);

  const setMessagesAndScroll = (data) => {
    setMessages(data);
    setScroll((scroll) => !scroll);
    setError(null);
  };

  useEffect(() => {
    if (currentRoom) {
      makeGetRequest(`/api/v1/rooms/show/${currentRoom.id}`)
        .then((data) => setMessagesAndScroll(data))
        .catch((error) => setError(error));
    }
  }, [currentRoom]);

  const displayTitle = currentRoom.is_private
    ? getInterlocutor(currentRoom, user)
    : currentRoom.name;

  useEffect(() => {
    if (currentRoom) {
      chatChannel.current = consumer.subscriptions.create(
        {
          channel: "ChatChannel",
          room_id: currentRoom.id,
        },
        {
          received(data) {
            const newMessages = copyObjectArr(messages);
            const index = newMessages.findIndex((elem) => elem.id === data.id);
            if (index > -1) {
              newMessages[index] = data;
              setMessages(newMessages); // don't scroll away from an edited message
            } else {
              newMessages.push(data);
              setMessagesAndScroll(newMessages);
            }
          },
        }
      );
    }
    return () => {
      if (chatChannel.current) {
        consumer.subscriptions.remove(chatChannel.current);
        chatChannel.current = null;
      }
    };
  }, [currentRoom, messages]);

  if (error) return <p>Something went wrong.</p>;

  return (
    <div className="w-full h-full grid grid-cols-1 grid-rows-[auto_1fr_auto] text-center p-1 min-h-[300px] max-h-[400px] md:max-h-none">
      <h1 className="font-semibold text-2xl capitalize truncate">
        {displayTitle}
      </h1>
      <div className="overflow-auto" id="messages-container">
        <ul className="flex flex-col mx-4">
          {messages.map((message) => {
            return (
              <li
                key={`message_${message.id}`}
                className="flex flex-col w-full"
              >
                <Message
                  user={user}
                  message={message}
                  currentRoom={currentRoom}
                  messages={messages}
                  setMessages={setMessages}
                  interlocutor={currentRoom.is_private ? displayTitle : null}
                />
              </li>
            );
          })}
        </ul>
      </div>
      <MessageForm currentRoom={currentRoom} />
    </div>
  );
};
