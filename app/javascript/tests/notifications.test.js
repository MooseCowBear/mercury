import { removeRoomNotifications } from "../helpers/notifications";

describe("removeRoomNotifications", () => {
  it("removes notifications with room_id property of room", () => {
    const testNotifications = [{ room_id: 1 }, { room_id: 2 }];
    const testRoom = { id: 1 };
    const res = removeRoomNotifications(testRoom, testNotifications);
    expect(res.length).toBe(1);
    expect(res[0].room_id).toBe(2);
  });
});
