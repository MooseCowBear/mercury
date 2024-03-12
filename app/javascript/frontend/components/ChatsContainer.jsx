import React, { useEffect, useState, useRef } from "react";
import ChatCard from "./ChatCard";
import { getResource } from "../utils/apiRequest";
import { useActionCableContext } from "../contexts/ActionCableContext";
import {
  subscribeToPrivateChatsChannel,
  unsubscribeToPrivateChatsChannel,
} from "../../channels/private_chats_channel";
import { useUserInfoContext } from "../contexts/UserInfoContext";
import {
  subscribeToPublicChatsChannel,
  unsubscribeToPublicChatsChannel,
} from "../../channels/public_chats_channel";

export default function ChatsContainer({ title, isPrivate }) {
  const { userInfo } = useUserInfoContext();
  const { cable } = useActionCableContext();
  const [chats, setChats] = useState([]);

  const chatChannelRef = useRef(null);

  useEffect(() => {
    const abortController = new AbortController();

    const url = isPrivate
      ? "/api/v1/private_chats/index"
      : "/api/v1/public_chats/index";

    getResource(url, abortController, setChats);

    return () => {
      abortController.abort();
    };
  }, []);

  const updateChats = (data, chats) => {
    const chatsCopy = [...chats];
    const index = chatsCopy.findIndex((elem) => elem.id === data.id);
    if (index > -1) {
      chatsCopy[index] = data;
    } else {
      chatsCopy.push(data);
    }
    return chatsCopy;
  };

  useEffect(() => {
    // need to subscribe to private chats channel
    if (userInfo && isPrivate) {
      subscribeToPrivateChatsChannel(
        chatChannelRef,
        cable,
        userInfo.id,
        setChats,
        updateChats
      );
    } else if (userInfo && !isPrivate) {
      // subscribe to public chats channel, currently rooms channel
      subscribeToPublicChatsChannel(
        chatChannelRef,
        cable,
        setChats,
        updateChats
      );
    }
    return () => {
      unsubscribeToPrivateChatsChannel(chatChannelRef, cable);
      unsubscribeToPublicChatsChannel(chatChannelRef, cable);
    };
  }, [userInfo]); // does this need to depend on userinfo?

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
