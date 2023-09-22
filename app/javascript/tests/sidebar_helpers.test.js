import {
  updateNotifications,
  updatePrivateChats,
  addRoom,
} from "../helpers/sidebar";

describe("updateNotifications", () => {
  it("adds a new notification", () => {
    const res = updateNotifications({ id: 2 }, [{ id: 1 }]);
    expect(res.length).toBe(2);
    expect(res[1].id).toBe(2);
  });

  it("removes an existing notification", () => {
    const res = updateNotifications({ id: 1 }, [{ id: 1 }]);
    expect(res.length).toBe(0);
  });
});

describe("updatePrivateChats", () => {
  it("adds a new chat", () => {
    const res = updatePrivateChats({ id: 2 }, [{ id: 1 }]);
    expect(res.length).toBe(2);
    expect(res[1].id).toBe(2);
  });

  it("replaces an existing chat", () => {
    const res = updatePrivateChats({ id: 1, name: "new name" }, [
      { id: 1, name: "old name" },
    ]);
    expect(res.length).toBe(1);
    expect(res[0].name).toBe("new name");
  });
});

describe("addRoom", () => {
  it("adds a new room", () => {
    const res = addRoom({ id: 2 }, [{ id: 1 }]);
    expect(res.length).toBe(2);
    expect(res[1].id).toBe(2);
  });
});
