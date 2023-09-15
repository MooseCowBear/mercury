import React, { useEffect, useState, useRef } from "react";
import consumer from "../channels/consumer";
import NewMessageForm from "./NewMessageForm";
import copyObjectArr from "../helpers/copy";
import Message from "./Message";

// message takes: user, message, currentRoom
export default ChatMessages = ({ user, currentRoom }) => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  const chatChannel = useRef(null);

  const messagesContainer = document.getElementById("messages-container");

  /// TESTING -- this works but i don't want it to be every time.
  //// so will want another state.. that only gets updated when the scroll should happen

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  ////

  const resetScroll = () => {
    console.log("should be scrolling..."); //PROBLEM ELEM DOES NOT EXIST!!!
    if (messagesContainer) {
      console.log(messagesContainer);
      console.log(messagesContainer.offsetHeight);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  };

  const setMessagesAndScroll = (data) => {
    setMessages(data);
    resetScroll();
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

        setMessagesAndScroll(data); //UPDATE THIS
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
            // check is data's id already in the existing messages, if so replace else add
            const index = newMessages.findIndex((elem) => elem.id === data.id);
            if (index > -1) {
              newMessages[index] = data;
              setMessages(newMessages); // don't scroll away from an edited messags
            } else {
              newMessages.push(data);
              setMessagesAndScroll(newMessages); //UPDATE THIS
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

  // need to update recieved because will get edited messages too...

  if (error) return <p>Something went wrong.</p>;

  // TODO: allow for deleting messages that belong to curr user.

  return (
    <div className="w-full h-full grid grid-cols-1 grid-rows-[auto_1fr_auto] text-center">
      <h1 className="font-semibold text-2xl capitalize">{displayTitle}</h1>
      <div id="messages-container" className="overflow-auto max-h-[420px]">
        <ul className="flex flex-col">
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
        <div ref={messagesEndRef} />
      </div>
      <NewMessageForm currentRoom={currentRoom} />
    </div>
  );
};
