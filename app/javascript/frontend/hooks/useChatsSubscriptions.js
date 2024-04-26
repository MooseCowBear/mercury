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
      console.log("subscribing to chat channels"); //TEMP
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
      console.log("unsubscribing from chat channels"); //TEMP
      unsubscribeToChannel(privateChatChannelRef, cable);
      unsubscribeToChannel(publicChatChannelRef, cable);
    };
  }, [userID]);
}
