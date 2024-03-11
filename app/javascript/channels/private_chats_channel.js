export const subscribeToPrivateChatsChannel = (
  privateChatsChannelRef,
  cable,
  user,
  setChats,
  updateChats
) => {
  privateChatsChannelRef.current = cable.subscriptions.create(
    { channel: "PrivateChatsChannel", user_id: user.id },

    {
      received(data) {
        setChats((chats) => updateChats(data, chats));
      },
    }
  );
};

export const unsubscribeToRoomsChannel = (privateChatsChannelRef, cable) => {
  if (privateChatsChannelRef.current) {
    cable.subscriptions.remove(privateChatsChannelRef.current);
    privateChatsChannelRef.current = null;
  }
};
