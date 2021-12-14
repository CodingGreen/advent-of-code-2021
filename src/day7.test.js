const { partOne, partTwo } = require('./day7');

const testData = `16,1,2,0,4,2,7,1,2,14
`;

test('Part One', () => {
  expect(partOne(testData)).toBe(37);
});

test('Part Two', () => {
  expect(partTwo(testData)).toBe(168);
});
