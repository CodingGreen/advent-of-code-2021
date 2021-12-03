const { partOne, partTwo } = require('./day2');

const testData = `forward 5
down 5
forward 8
up 3
down 8
forward 2`;

test('Part One', () => {
  expect(partOne(testData)).toBe(150);
});

test('Part Two', () => {
  expect(partTwo(testData)).toBe();
});
