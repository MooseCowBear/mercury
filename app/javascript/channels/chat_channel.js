export const subscribeToChatChannel = (
  chatChannelRef,
  cable,
  currChatId,
  setMessages,
  updateMessages
) => {
  chatChannelRef.current = cable.subscriptions.create(
    {
      channel: "ChatChannel",
      chat_id: currChatId,
    },
    {
      received(data) {
        console.log("data", data);
        setMessages((messages) => updateMessages(data, messages));
      },
    }
  );
};

export const unsubscribeToChatChannel = (chatChannelRef, cable) => {
  if (chatChannelRef.current) {
    cable.subscriptions.remove(chatChannelRef.current);
    chatChannelRef.current = null;
  }
};
