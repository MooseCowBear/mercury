import { useEffect, useState, useRef } from "react";
import { getResource } from "../utils/apiRequest";
import {
  subscribeToChannel,
  unsubscribeToChannel,
} from "../../channels/channel";

export const useMessages = (userInfo, setScroll, cable) => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  const chatChannelRef = useRef(null);

  const setMessagesAndScroll = (data) => {
    setMessages(data);
    setError(null);
    setScroll((scroll) => !scroll);
  };

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

  useEffect(() => {
    if (userInfo?.current_chat_id) {
      const abortController = new AbortController();

      getResource("/api/v1/messages", abortController)
        .then((data) => setMessagesAndScroll(data))
        .catch((e) => setError(e));

      if (!userInfo.current_chat_silenced) {
        subscribeToChannel(
          chatChannelRef,
          cable,
          setMessages,
          updateMessages,
          "ChatChannel",
          userInfo.current_chat_id
        );
      }
      return () => {
        abortController.abort();
        unsubscribeToChannel(chatChannelRef, cable);
      };
    }
  }, [userInfo]);
  return { error, messages, setMessages };
};
