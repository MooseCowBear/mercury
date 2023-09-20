import { displayDateTime } from "../helpers/datetime";

describe("displayDateTime", () => {
  test("displays the date if not today", () => {
    expect(displayDateTime("2010-05-30T06:14:00Z")).toBe("5/30/2010");
  });

  test("displays time if today", () => {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    expect(displayDateTime(today)).toBe("12:00 am");
  });
});
