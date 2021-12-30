const { partOne, partTwo } = require('./day12');

test('Part One - Example 1', () => {
  const testData = `start-A
start-b
A-c
A-b
b-d
A-end
b-end
`;

  expect(partOne(testData)).toBe(10);
});

test('Part One - Example 2', () => {
  const testData = `dc-end
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

  expect(partOne(testData)).toBe(19);
});

test('Part One - Example 3', () => {
  const testData = `fs-end
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

  expect(partOne(testData)).toBe(226);
});

test('Part Two', () => {
  expect(partTwo()).toBe();
});
