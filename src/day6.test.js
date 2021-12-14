const { partOne, partTwo } = require('./day6');

const testData = `3,4,3,1,2
`;

test('Part One', () => {
  expect(partOne(testData)).toBe(5934);
});

test('Part Two', () => {
  expect(partTwo(testData)).toBe();
});
