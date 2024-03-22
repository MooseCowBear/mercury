import { editedMessage, ownedByUser } from "../../frontend/utils/messages";

describe("editedMessage", () => {
  it("returns true if created and updated dates do not match", () => {
    const testCreated = Date.parse("01 Jan 2024 00:00:00 GMT");
    const testUpdated = Date.parse("02 Jan 2024 00:00:00 GMT");
    const testMessage = { created_at: testCreated, updated_at: testUpdated };
    expect(editedMessage(testMessage)).toBeTruthy();
  });

  it("returns false if created and updated dates match", () => {
    const testCreated = Date.parse("01 Jan 2024 00:00:00 GMT");
    const testMessage = { created_at: testCreated, updated_at: testCreated };
    expect(editedMessage(testMessage)).toBeFalsy();
  });
});

describe("ownedByUser", () => {
  it("returns true if message user id matches user id", () => {
    const testMessage = { user: { id: 1 } };
    const testUser = { id: 1 };
    expect(ownedByUser(testMessage, testUser)).toBeTruthy();
  });

  it("returns false if message user if does not match user id", () => {
    const testMessage = { user: { id: 1 } };
    const testUser = { id: 2 };
    expect(ownedByUser(testMessage, testUser)).toBeFalsy();
  });
});
