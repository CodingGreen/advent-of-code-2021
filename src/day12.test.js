const { partOne, partTwo } = require('./day12');

const exampleOneTestData = `start-A
start-b
A-c
A-b
b-d
A-end
b-end
`;

const exampleTwoTestData = `dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc
`;

const exampleThreeTestData = `fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW
`;

describe('Part One', () => {
  test('Example 1', () => {
    expect(partOne(exampleOneTestData)).toBe(10);
  });

  test('Example 2', () => {
    expect(partOne(exampleTwoTestData)).toBe(19);
  });

  test('Example 3', () => {
    expect(partOne(exampleThreeTestData)).toBe(226);
  });
});

describe('Part Two', () => {
  test('Example 1', () => {
    expect(partTwo(exampleOneTestData)).toBe(36);
  });

  test('Example 2', () => {
    expect(partTwo(exampleTwoTestData)).toBe(103);
  });

  test('Example 3', () => {
    expect(partTwo(exampleThreeTestData)).toBe(3509);
  });
});
