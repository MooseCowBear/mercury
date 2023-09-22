// import consumer from "./consumer"

// consumer.subscriptions.create("RoomsChannel", {
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

export const subscribeToRoomsChannel = (
  roomsChannelRef,
  actionCable,
  setRooms,
  addRoom
) => {
  roomsChannelRef.current = actionCable.subscriptions.create(
    { channel: "RoomsChannel" },
    {
      received(data) {
        setRooms((rooms) => addRoom(data, rooms));
      },
    }
  );
};

export const unsubscribeToRoomsChannel = (roomsChannelRef, actionCable) => {
  if (roomsChannelRef.current) {
    actionCable.subscriptions.remove(roomsChannelRef.current);
    roomsChannelRef.current = null;
  }
};
