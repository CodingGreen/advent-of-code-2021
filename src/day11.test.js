const { partOne, partTwo } = require('./day11');

const testData = `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526
`;

test('Part One', () => {
  expect(partOne(testData)).toBe(1656);
});

test('Part Two', () => {
  expect(partTwo(testData)).toBe(195);
});
