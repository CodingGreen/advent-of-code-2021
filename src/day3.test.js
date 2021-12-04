const { partOne, partTwo } = require('./day3');

const testData = `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`;

test('Part One', () => {
  expect(partOne(testData)).toBe(198);
});

test('Part Two', () => {
  expect(partTwo(testData)).toBe();
});
