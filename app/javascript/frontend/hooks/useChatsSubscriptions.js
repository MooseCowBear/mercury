import { useEffect, useRef } from "react";
import { updateChats } from "../utils/chats.js";
import {
  subscribeToChannel,
  unsubscribeToChannel,
} from "../../channels/chat_channel.js";

export function useChatSubscriptions(
  cable,
  userID,
  setPrivateChats,
  setPublicChats
) {
  const privateChatChannelRef = useRef(null);
  const publicChatChannelRef = useRef(null);

  useEffect(() => {
    if (userID) {
      subscribeToChannel(
        privateChatChannelRef,
        cable,
        setPrivateChats,
        updateChats,
        "PrivateChatsChannel",
        userID
      );
      subscribeToChannel(
        publicChatChannelRef,
        cable,
        setPublicChats,
        updateChats,
        "PublicChatsChannel"
      );
    }
    return () => {
      unsubscribeToChannel(privateChatChannelRef, cable);
      unsubscribeToChannel(publicChatChannelRef, cable);
    };
  }, [userID]);
}
