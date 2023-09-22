export const subscribeToUsersChannel = (
  userChannelRef,
  actionCable,
  user,
  setPrivateChats,
  updatePrivateChats
) => {
  userChannelRef.current = actionCable.subscriptions.create(
    {
      channel: "UsersChannel",
      user_id: user.id,
    },
    {
      received(data) {
        setPrivateChats((privateChats) =>
          updatePrivateChats(data, privateChats)
        );
      },
    }
  );
};

export const unsubscribeToUsersChannel = (userChannelRef, actionCable) => {
  if (userChannelRef.current) {
    actionCable.subscriptions.remove(userChannelRef.current);
    userChannelRef.current = null;
  }
};
