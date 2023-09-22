export const subscribeToChatChannel = (
  chatChannelRef,
  actionCable,
  currentRoom,
  setMessages,
  updateMessages
) => {
  chatChannelRef.current = actionCable.subscriptions.create(
    {
      channel: "ChatChannel",
      room_id: currentRoom.id,
    },
    {
      received(data) {
        setMessages((messages) => updateMessages(data, messages));
      },
    }
  );
};

export const unsubscribeToChatChannel = (chatChannelRef, actionCable) => {
  if (chatChannelRef.current) {
    actionCable.subscriptions.remove(chatChannelRef.current);
    chatChannelRef.current = null;
  }
};
