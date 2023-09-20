import { getInterlocutor } from "../helpers/privateChats";

describe("getInterlocutor", () => {
  it("returns the name of other user in private chat", () => {
    const testRoom = { name: "pc_ernest_hemingway" };
    const testUser = { username: "ernest" };
    expect(getInterlocutor(testRoom, testUser)).toBe("hemingway");
  });
});
