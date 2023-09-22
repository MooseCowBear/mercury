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
