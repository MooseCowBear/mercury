import { updateMessagesAfterDelete } from "../helpers/message";

describe("updateMessagesAfterDelete", () => {
  it("removes the returned message", () => {
    const res = updateMessagesAfterDelete({ id: 1 }, [{ id: 1 }]);
    expect(res.length).toBe(0);
  });
});
