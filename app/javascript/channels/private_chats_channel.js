export const subscribeToPrivateChatsChannel = (
  privateChatsChannelRef,
  cable,
  userId,
  setChats,
  updateChats
) => {
  privateChatsChannelRef.current = cable.subscriptions.create(
    { channel: "PrivateChatsChannel", user_id: userId },
    {
      received(data) {
        setChats((chats) => updateChats(JSON.parse(data), chats));
      },
    }
  );
};

export const unsubscribeToPrivateChatsChannel = (privateChatsChannelRef, cable) => {
  if (privateChatsChannelRef.current) {
    cable.subscriptions.remove(privateChatsChannelRef.current);
    privateChatsChannelRef.current = null;
  }
};
