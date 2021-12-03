function splitInput(input) {
  return input
    .split('\n')
    .filter((entry) => entry);
}

function parseInstructions(rawInstructions) {
  return rawInstructions.map((rawInstruction) => {
    const [command, distance] = rawInstruction.split(' ');
    return { command, distance: Number(distance) };
  });
}

function pipe(...functions) {
  return (startingValue) => functions.reduce(
    (previousResult, nextFunction) => nextFunction(previousResult),
    startingValue,
  );
}

function calculatePosition(instructions, commands) {
  return instructions.reduce(
    (currentPosition, { command, distance }) => commands[command](currentPosition, distance),
    { horizontal: 0, depth: 0, aim: 0 },
  );
}

function partOne(input) {
  const instructions = pipe(
    splitInput,
    parseInstructions,
  )(input);

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

  const position = calculatePosition(instructions, commands);

  return position.depth * position.horizontal;
}

function partTwo(input) {
  const instructions = pipe(
    splitInput,
    parseInstructions,
  )(input);

  const commands = {
    forward: (currentPosition, distance) => ({
      ...currentPosition,
      horizontal: currentPosition.horizontal + distance,
      depth: currentPosition.depth + (currentPosition.aim * distance),
    }),
    down: (currentPosition, distance) => ({
      ...currentPosition,
      aim: currentPosition.aim + distance,
    }),

    up: (currentPosition, distance) => ({
      ...currentPosition,
      aim: currentPosition.aim - distance,
    }),
  };

  const position = calculatePosition(instructions, commands);

  return position.depth * position.horizontal;
}

module.exports = { partOne, partTwo };
