export const subscribeToPublicChatsChannel = (
  chatsChannelRef,
  cable,
  setChats,
  updateChats
) => {
  chatsChannelRef.current = cable.subscriptions.create(
    { channel: "PublicChatsChannel" },
    {
      received(data) {
        setChats((chats) => updateChats(data, chats));
      },
    }
  );
};

export const unsubscribeToPublicChatsChannel = (chatsChannelRef, cable) => {
  if (chatsChannelRef.current) {
    cable.subscriptions.remove(chatsChannelRef.current);
    chatsChannelRef.current = null;
  }
};
