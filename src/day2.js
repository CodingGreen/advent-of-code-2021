function splitInput(input) {
  return input
    .split('\n')
    .filter((entry) => entry);
}

function partOne(input) {
  const rawInstructions = splitInput(input);
  const instructions = rawInstructions.map((rawInstruction) => {
    const [command, distance] = rawInstruction.split(' ');
    return { command, distance: Number(distance) };
  });

  const commands = {
    forward: (currentPosition, distance) => ({
      ...currentPosition,
      horizontal: currentPosition.horizontal + distance,
    }),
    down: (currentPosition, distance) => ({
      ...currentPosition,
      depth: currentPosition.depth + distance,
    }),

    up: (currentPosition, distance) => ({
      ...currentPosition,
      depth: currentPosition.depth - distance,
    }),
  };

  const position = instructions.reduce(
    (currentPosition, { command, distance }) => commands[command](currentPosition, distance),
    { horizontal: 0, depth: 0 },
  );

  return position.depth * position.horizontal;
}

function partTwo(input) {

}

module.exports = { partOne, partTwo };
