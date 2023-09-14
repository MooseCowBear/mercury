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

  const resetScroll = () => {
    if (messagesContainer) {
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

        setMessagesAndScroll(data);
        setError(null);
      } catch (error) {
        console.log(error);
        setError(error);
      }
    };

    if (currentRoom) {
      console.log("fetching messages...");
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
              console.log("recieved editted message");
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
        console.log("removing the old room subscription...");
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
      <ul id="messages-container" className="px-5 flex flex-col">
        {messages.map((message) => {
          return (
            <li key={`message_${message.id}`} className="flex flex-col w-full">
              <Message
                user={user}
                message={message}
                currentRoom={currentRoom}
              />
            </li>
          );
        })}
      </ul>
      <NewMessageForm currentRoom={currentRoom} />
    </div>
  );
};
