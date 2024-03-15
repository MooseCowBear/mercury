import { isUserActive } from "../../frontend/utils/users";

describe("isUserActive", () => {
  it("it returns true when user's last active datetime is is less than 10 minutes ago", () => {
    expect(isUserActive(new Date())).toBeTruthy();
  });

  it("it returns false when user's last active datetime is greater than 10 minutes ago", () => {
    const now = new Date();
    const testTime = new Date(now.getTime() - (10 * 60000 + 1));
    expect(isUserActive(testTime)).toBeFalsy();
  });
});
