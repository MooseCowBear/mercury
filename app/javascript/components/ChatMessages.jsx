import React, { useEffect, useState, useRef } from "react";
import consumer from "../channels/consumer";
import copyObjectArr from "../helpers/copy";
import Message from "./Message";
import { createMessageSubmitHandler } from "../helpers/submitHandlers";
import MessageForm from "./MessageForm";

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
  };

  // can move this function helper
  const getInterlocutor = (room) => {
    return room.interlocutor_one.id == user.id
      ? room.interlocutor_two.username
      : room.interlocutor_one.username;
  };

  const displayTitle = currentRoom.is_private
    ? getInterlocutor(currentRoom)
    : currentRoom.name;

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await fetch(`/api/v1/rooms/show/${currentRoom.id}`);

        if (!response.ok) {
          throw new Error("Server error");
        }
        const data = await response.json();

        setMessagesAndScroll(data);
        setError(null);
      } catch (error) {
        console.log(error);
        setError(error);
      }
    };

    if (currentRoom) {
      getMessages();
    }
  }, [currentRoom]);

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
              setMessages(newMessages); // don't scroll away from an edited messags
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
      <h1 className="font-semibold text-2xl capitalize">{displayTitle}</h1>
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
                />
              </li>
            );
          })}
        </ul>
      </div>
      <MessageForm
        currentRoom={currentRoom}
        variableSubmitHandler={createMessageSubmitHandler}
      />
    </div>
  );
};
