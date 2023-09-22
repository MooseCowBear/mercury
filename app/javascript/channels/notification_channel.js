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
