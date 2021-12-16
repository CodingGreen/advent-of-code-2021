const { identityFunction, sum } = require('./utils');

function parseInput(input) {
  return input.split('\n').filter(identityFunction).map((line) => {
    const [signalPatterns, outputDigits] = line
      .split('|')
      .map(((stringData) => stringData
        .split(' ')
        .filter(identityFunction)));

    return {
      signalPatterns,
      outputDigits,
    };
  });
}

function countValues(callback) {
  return (array) => array.reduce((total, currentValue) => {
    if (callback(currentValue)) return total + 1;
    return total;
  }, 0);
}

const validDigitSignalLengths = [2, 3, 4, 7];

const countDigits = countValues(
  (digitSignal) => validDigitSignalLengths.includes(digitSignal.length),
);

function partOne(input) {
  const signalData = parseInput(input);
  const digitCounts = signalData.map(({ outputDigits }) => countDigits(outputDigits));
  return sum(digitCounts);
}

function createFindSignalFromLength(signalPatterns) {
  return (length) => signalPatterns.find((signal) => signal.length === length);
}

function createFilterSignalsByLength(signalPatterns) {
  return (length) => signalPatterns.filter((signal) => signal.length === length);
}

function separateElement(callback) {
  return (array) => {
    const elementIndex = array.findIndex(callback);
    const newArray = [...array.slice(0, elementIndex), ...array.slice(elementIndex + 1)];
    return [array[elementIndex], newArray];
  };
}

function findInTurn(callbacks) {
  return (array) => {
    const findInTurnRecursive = (arrayToSearch, callbacksToUse) => {
      if (callbacksToUse.length === 0) return arrayToSearch;
      const [callback, ...remainingCallbacks] = callbacksToUse;
      const [foundElement, remainingArray] = separateElement(callback)(arrayToSearch);
      return [foundElement, ...findInTurnRecursive(remainingArray, remainingCallbacks)];
    };

    return findInTurnRecursive(array, callbacks);
  };
}

function matchDigit(digit) {
  return (signal) => Array
    .from(digit)
    .every((signalSegment) => signal.includes(signalSegment));
}

function partialMatchDigit(digit, degreeOfMatch) {
  return (signal) => Array
    .from(digit)
    .filter((signalSegment) => signal.includes(signalSegment)).length === degreeOfMatch;
}

function partTwo(input) {
  const signalData = parseInput(input);
  return sum(signalData.map(({
    signalPatterns,
    outputDigits,
  }) => {
    const findSignalFromLength = createFindSignalFromLength(signalPatterns);
    const digitOne = findSignalFromLength(2);
    const digitFour = findSignalFromLength(4);
    const digitSeven = findSignalFromLength(3);
    const digitEight = findSignalFromLength(7);

    const filterSignalsByLength = createFilterSignalsByLength(signalPatterns);
    const sixSegmentSignals = filterSignalsByLength(6);

    const [digitNine, digitZero, digitSix] = findInTurn([
      matchDigit(digitFour),
      matchDigit(digitOne),
    ])(sixSegmentSignals);

    const fiveSegmentSignals = filterSignalsByLength(5);

    const [digitThree, digitFive, digitTwo] = findInTurn([
      matchDigit(digitOne),
      partialMatchDigit(digitFour, 3),
    ])(fiveSegmentSignals);

    const decodedDigits = [
      digitZero,
      digitOne,
      digitTwo,
      digitThree,
      digitFour,
      digitFive,
      digitSix,
      digitSeven,
      digitEight,
      digitNine,
    ];

    const digitValues = outputDigits
      .map((outputDigit) => decodedDigits
        .findIndex((decodedDigit) => outputDigit.length === decodedDigit.length && Array
          .from(outputDigit)
          .every((outputDigitSegment) => decodedDigit.includes(outputDigitSegment))));

    return Number(digitValues.join(''));
  }));
}

module.exports = { partOne, partTwo };
