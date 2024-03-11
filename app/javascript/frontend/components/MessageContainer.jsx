import React, { useState, useEffect, useRef } from "react";
import { useActionCableContext } from "../contexts/ActionCableContext";
import { useUserInfoContext } from "../contexts/UserInfoContext";
import {
  subscribeToChatChannel,
  unsubscribeToChatChannel,
} from "../../channels/chat_channel";
import { getResource } from "../utils/apiRequest";
import Message from "./Message";

export default function MessageContainer() {
  const { userInfo } = useUserInfoContext();
  const { cable } = useActionCableContext();

  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [scroll, setScroll] = useState(true);

  console.log("messages", messages);

  const chatChannelRef = useRef(null); // so can remove the subscription

  const scrollMessages = () => {
    const container = document.getElementById("messages-container");
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  };

  const setMessagesAndScroll = (data) => {
    setMessages(data);
    setScroll((scroll) => !scroll);
    setError(null);
  };

  /* two ways to update messages, either by adding a new one or by updating the body of an existing message */
  const updateMessages = (data, messages) => {
    console.log("messages", messages);
    const messagesCopy = [...messages];
    const index = messagesCopy.findIndex((elem) => elem.id === data.id);
    if (index > -1) {
      messagesCopy[index] = data;
    } else {
      messagesCopy.push(data);
      setScroll((scroll) => !scroll);
    }
    return messagesCopy;
  };

  useEffect(() => {
    scrollMessages();
  }, [scroll]);

  useEffect(() => {
    if (userInfo && userInfo.current_chat_id) {
      console.log("curr chat", userInfo.current_chat);
      subscribeToChatChannel(
        chatChannelRef,
        cable,
        userInfo.current_chat_id,
        setMessages,
        updateMessages
      );

      const abortController = new AbortController();

      getResource(
        "/api/v1/messages",
        abortController,
        setMessagesAndScroll,
        setError
      );

      return () => {
        abortController.abort();
        unsubscribeToChatChannel(chatChannelRef, cable);
      };
    }
  }, [userInfo]);

  if (error || messages === null) return <p>Something went wrong.</p>;

  return (
    <div
      id="messages-container"
      className="overflow-y-auto flex flex-col gap-3 mb-2 px-2"
    >
      {messages.map((message) => {
        return <Message key={message.id} message={message} />;
      })}
    </div>
  );
}
