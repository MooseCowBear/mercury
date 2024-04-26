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
      id: currChatId,
    },
    {
      received(data) {
        setMessages((messages) => updateMessages(JSON.parse(data), messages));
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

// TODO: replace all subscribe/unsubscribe with general function
// backend needs to change params to :id
// update index.js after renaming the file
export const subscribeToChannel = (
  channelRef,
  cable,
  setData,
  newDataHandler,
  channelName,
  id = null
) => {
  channelRef.current = cable.subscriptions.create(
    {
      channel: channelName,
      id: id,
    },
    {
      received(data) {
        setData((prev) => newDataHandler(JSON.parse(data), prev));
      },
    }
  );
};

export const unsubscribeToChannel = (channelRef, cable) => {
  if (channelRef.current) {
    cable.subscriptions.remove(channelRef.current);
    channelRef.currrent = null;
  }
};
