//import consumer from "./consumer"

// consumer.subscriptions.create("ChatChannel", {
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
