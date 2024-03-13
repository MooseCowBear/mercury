import React, { useEffect, useState, useRef } from "react";
import ChatCard from "./ChatCard";
import Plus from "../icons/Plus";
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
import NewPublicChatForm from "./NewPublicChatForm";
import { useVisibilityContext } from "../contexts/VisibilityContext";

export default function ChatsContainer({ title, isPrivate }) {
  const { userInfo } = useUserInfoContext();
  const { cable } = useActionCableContext();
  const { peopleVisibilityHandler } = useVisibilityContext();

  const [chats, setChats] = useState([]);
  const [newChatForm, setNewChatForm] = useState(false);

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

  const clickHandler = () => {
    if (isPrivate) {
      peopleVisibilityHandler();
    } else {
      setNewChatForm(true);
    }
  };

  return (
    <div className="py-4 min-h-0 min-w-0">
      <div className="px-2 mb-1 flex justify-between items-center">
        <h3 className="text-xs uppercase text-neutral-500 leading-none">
          {title}
        </h3>
        <button
          aria-label={
            isPrivate ? "create new private chat" : "create new public chat"
          }
          onClick={clickHandler}
          className="bg-poppy-500 p-1 rounded-full"
        >
          <Plus />
        </button>
      </div>
      <div className="flex flex-col divide-y-[1px]">
        {newChatForm && <NewPublicChatForm setNewChatForm={setNewChatForm} />}
        {chats.map((chat) => {
          return <ChatCard key={chat.id} chat={chat} />;
        })}
      </div>
    </div>
  );
}
