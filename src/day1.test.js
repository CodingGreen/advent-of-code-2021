const { partOne, partTwo } = require("./day1");

const testData = `199
200
208
210
200
207
240
269
260
263`;

test("Part One", () => {
  expect(partOne(testData)).toBe(7);
});

test("Part Two", () => {
  expect(partTwo(testData)).toBe();
});
