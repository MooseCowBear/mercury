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
