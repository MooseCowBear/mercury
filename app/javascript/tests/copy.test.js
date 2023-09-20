import copyObjectArr from "../helpers/copy"

describe("copyObjectArr", () => {
  it("makes a deep copy of an array of objects", () => {
    const arr = [{1: "one"}];
    const res = copyObjectArr(arr);
    expect(res).toEqual(arr);
    expect(res).not.toBe(arr);
  })
})