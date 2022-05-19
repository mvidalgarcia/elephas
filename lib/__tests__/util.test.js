import { pick } from "../util";

describe("Util functions", () => {
  it("picks given keys from an object", () => {
    const myObj = { a: 1, b: 2, c: 3 };
    const keep = ["a", "c"];

    expect(pick(myObj, keep)).not.toEqual(myObj);
    expect(pick(myObj, keep)).toEqual({ a: 1, c: 3 });
  });
});
