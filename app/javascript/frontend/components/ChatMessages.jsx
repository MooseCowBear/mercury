import React, { useEffect, useState, useRef } from "react";
import copyObjectArr from "../helpers/copy";
import Message from "./Message";
import MessageForm from "./MessageForm";
import { getInterlocutor } from "../helpers/privateChats";
import { makeGetRequest } from "../helpers/apiRequest";
import {
  subscribeToChatChannel,
  unsubscribeToChatChannel,
} from "../channels/chat_channel";
import NewMessageForm from "./NewMessageForm";
import ImageForm from "./ImageForm";

//OLD -- where the scroll happens

export default ChatMessages = ({ user, currentRoom, actionCable }) => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [scroll, setScroll] = useState(true);

  // MARK: for image uploads
  const [uploadImage, setUploadImage] = useState(false);

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

  const updateMessages = (data, messages) => {
    const newMessages = copyObjectArr(messages);
    const index = newMessages.findIndex((elem) => elem.id === data.id);
    if (index > -1) {
      newMessages[index] = data;
    } else {
      newMessages.push(data);
      setScroll((scroll) => !scroll);
    }
    return newMessages;
  };

  useEffect(() => {
    if (currentRoom) {
      subscribeToChatChannel(
        chatChannel,
        actionCable,
        currentRoom,
        setMessages,
        updateMessages
      );
    }
    return () => {
      unsubscribeToChatChannel(chatChannel, actionCable);
    };
  }, [currentRoom]);

  if (error) return <p>Something went wrong.</p>;

  return (
    <div className="w-full grid grid-cols-1 grid-rows-[auto_1fr_auto] text-center p-1 min-h-[400px] md:h-full">
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
      {/* this has been changed from <MessageForm currentRoom={currentRoom} /> */}
      {!uploadImage && (
        <NewMessageForm
          currentRoom={currentRoom}
          setImageUpload={setUploadImage}
        />
      )}
      {uploadImage && (
        <ImageForm currentRoom={currentRoom} setUploadImage={setUploadImage} />
      )}
    </div>
  );
};
