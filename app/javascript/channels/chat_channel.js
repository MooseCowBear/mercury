export const subscribeToChatChannel = (
  chatChannelRef,
  cable,
  currChatId,
  setMessages,
  updateMessages
) => {
  console.log("adding subscription");
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
    console.log("removing subscription");
    cable.subscriptions.remove(chatChannelRef.current);
    chatChannelRef.current = null;
  }
};
