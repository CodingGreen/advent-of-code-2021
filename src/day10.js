const {
  pipe, identityFunction, sum, functionalMap, sort, median,
} = require('./utils');

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

const missingCharacterPointsMap = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4,
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

function not(callback) {
  return (...args) => !callback(...args);
}

function filterOutCorruptedLines(navigationSubsystem) {
  return navigationSubsystem.filter(not(findCorruptedCharacter));
}

function findRemainingOpenChunks(navigationLine) {
  const findRemainingOpenChunksRecursive = (currentLine, openedChunks) => {
    if (currentLine.length === 0) return openedChunks;

    const [character, ...remainingLine] = currentLine;

    const [lastOpenedChunk, ...remainingOpenedChunks] = openedChunks;

    if (openToClosePairMap[lastOpenedChunk] === character) {
      return findRemainingOpenChunksRecursive(remainingLine, remainingOpenedChunks);
    }

    return findRemainingOpenChunksRecursive(remainingLine, [character, ...openedChunks]);
  };

  return findRemainingOpenChunksRecursive(navigationLine, []);
}

function findMissingCharacters(navigationLine) {
  const remainingOpenedChunks = findRemainingOpenChunks(navigationLine);
  return remainingOpenedChunks.map(((openCharacter) => openToClosePairMap[openCharacter]));
}

function calculateScore(missingCharacters) {
  return missingCharacters.reduce(
    (total, character) => (total * 5) + missingCharacterPointsMap[character],
    0,
  );
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
  return pipe(
    parseInput,
    filterOutCorruptedLines,
    functionalMap(findMissingCharacters),
    functionalMap(calculateScore),
    sort,
    median,
  )(input);
}

module.exports = { partOne, partTwo };
