import React, { useState, useEffect, useRef } from "react";
import { useActionCableContext } from "../contexts/ActionCableContext";
import { useUserInfoContext } from "../contexts/UserInfoContext";
import {
  subscribeToChatChannel,
  unsubscribeToChatChannel,
} from "../../channels/chat_channel";
import { getResource } from "../utils/apiRequest";
import Message from "./Message";

/* when user enters a chat, need to get the messages for that chat from the backend. 
want the most recent message to be visible, so scroll to the bottom of the chat's 
container on initial fetch and whenever a new message is added to the chat via broadcast.
Using a boolean that is toggled whenever a scroll needs to happen to trigger the 
scroll action. 
Want to subscribe to get new messages only when 1. there is user information, 2. 
the user has a current chat, and 3. the current chat has not be blocked. 
*/

export default function MessageContainer() {
  const { userInfo } = useUserInfoContext();
  const { cable } = useActionCableContext();

  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [scroll, setScroll] = useState(true);

  const chatChannelRef = useRef(null); // so can remove the subscription

  const scrollMessages = () => {
    const container = document.getElementById("messages-container");
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  };

  const setMessagesAndScroll = (data) => {
    setMessages(data);
    setError(null);
    setScroll((scroll) => !scroll);
  };

  /* two ways to update messages, either by adding a new one or by updating the body of an existing message */
  const updateMessages = (data, messages) => {
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

  /* scroll happens after a re-render */
  useEffect(() => {
    scrollMessages();
  }, [scroll]);

  useEffect(() => {
    if (userInfo && userInfo.current_chat_id) {
      if (!userInfo.current_chat_silenced) {
        subscribeToChatChannel(
          chatChannelRef,
          cable,
          userInfo.current_chat_id,
          setMessages,
          updateMessages
        );
      }

      const abortController = new AbortController();

      getResource("/api/v1/messages", abortController)
        .then((data) => setMessagesAndScroll(data))
        .catch((e) => setError(e));

      return () => {
        abortController.abort();
        unsubscribeToChatChannel(chatChannelRef, cable);
      };
    }
  }, [userInfo]);

  if (error) return <p>Something went wrong.</p>;
  if (!userInfo) return <p>Loading...</p>;

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
