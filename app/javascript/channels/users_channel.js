// import consumer from "./consumer"

// consumer.subscriptions.create("UsersChannel", {
//   connected() {
//     // Called when the subscription is ready for use on the server
//   },

//   disconnected() {
//     // Called when the subscription has been terminated by the server
//   },

//   received(data) {
//     // Called when there's incoming data on the websocket for this channel
//   }
// });

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
