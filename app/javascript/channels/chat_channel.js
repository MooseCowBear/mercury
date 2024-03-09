export const subscribeToChatChannel = (
  chatChannelRef,
  cable,
  currChat,
  setMessages,
  updateMessages
) => {
  chatChannelRef.current = cable.subscriptions.create(
    {
      channel: "ChatChannel",
      chat_id: currChat.id,
    },
    {
      received(data) {
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
