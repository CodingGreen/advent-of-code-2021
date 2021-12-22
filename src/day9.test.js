const { partOne, partTwo } = require('./day9');

const testData = `2199943210
3987894921
9856789892
8767896789
9899965678
`;

test('Part One', () => {
  expect(partOne(testData)).toBe(15);
});

test('Part Two', () => {
  expect(partTwo(testData)).toBe(1134);
});
