import {
  getInterlocutor,
  notificationCount,
  removeRoom,
} from "../helpers/privateChats";

describe("getInterlocutor", () => {
  it("returns the name of other user in private chat", () => {
    const testRoom = { name: "pc_ernest_hemingway" };
    const testUser = { username: "ernest" };
    expect(getInterlocutor(testRoom, testUser)).toBe("hemingway");
  });
});

describe("notificationCount", () => {
  it("returns null if room is not private", () => {
    const res = notificationCount({ id: 3, is_private: false }, [
      { room_id: 1 },
      { room_id: 2 },
    ]);
    expect(res).toBeNull();
  });

  it("returns correct count of notifications for room", () => {
    const res = notificationCount({ id: 1, is_private: true }, [
      { room_id: 1 },
      { room_id: 2 },
    ]);
    expect(res).toBe(1);
  });
});

describe("removeRoom", () => {
  it("removes correct room from rooms array", () => {
    const res = removeRoom([{id: 1, id: 2}], {id: 1});
    expect(res.length).toBe(1);
    expect(res[0].id).toBe(2);
  });
});
