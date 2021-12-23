const { pipe, identityFunction, sum } = require('./utils');

const openToClosePairMap = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>',
};

const illegalCharacterMap = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
};

const openingCharacters = Object.keys(openToClosePairMap);

function parseInput(input) {
  return input.split('\n').filter(identityFunction).map((row) => row.split(''));
}

function findCorruptedCharacter(navigationLine) {
  const findCorruptedCharacterRecursive = (currentLine, openedChunks) => {
    if (currentLine.length === 0) return null;

    const [character, ...remainingLine] = currentLine;

    if (openingCharacters.includes(character)) {
      return findCorruptedCharacterRecursive(remainingLine, [character, ...openedChunks]);
    }

    const [lastOpenedChunk, ...remainingOpenedChunks] = openedChunks;
    if (openToClosePairMap[lastOpenedChunk] === character) {
      return findCorruptedCharacterRecursive(remainingLine, remainingOpenedChunks);
    }

    return character;
  };

  return findCorruptedCharacterRecursive(navigationLine, []);
}

function findCorruptedLines(navigationSubsystem) {
  return navigationSubsystem.reduce((accumulator, navigationLine) => {
    const corruptedCharacter = findCorruptedCharacter(navigationLine);
    if (corruptedCharacter) return [...accumulator, corruptedCharacter];
    return accumulator;
  }, []);
}

function convertIllegalCharactersToPoints(illegalCharacters) {
  return illegalCharacters.map((illegalCharacter) => illegalCharacterMap[illegalCharacter]);
}

function partOne(input) {
  return pipe(
    parseInput,
    findCorruptedLines,
    convertIllegalCharactersToPoints,
    sum,
  )(input);
}

function partTwo(input) {

}

module.exports = { partOne, partTwo };
