// import consumer from "./consumer"

// consumer.subscriptions.create("NotificationChannel", {
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

export const subscribeToNotificationsChannel = (
  notificationsChannelRef,
  actionCable,
  user,
  setNotifications,
  updateNotification
) => {
  notificationsChannelRef.current = actionCable.subscriptions.create(
    {
      channel: "NotificationChannel",
      user_id: user.id,
    },
    {
      received(data) {
        setNotifications((notifications) =>
          updateNotification(data, notifications)
        );
      },
    }
  );
};

export const unsubscribeToNotificationsChannel = (
  notificationsChannelRef,
  actionCable
) => {
  if (notificationsChannelRef.current) {
    actionCable.subscriptions.remove(notificationsChannelRef.current);
    notificationsChannelRef.current = null;
  }
};
