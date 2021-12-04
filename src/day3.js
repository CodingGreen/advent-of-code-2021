const { splitInput, pipe } = require('./utils');

function convertBinaryArrayToMatrix(binaryArray) {
  return binaryArray.map((binaryNumber) => Array.from(binaryNumber));
}

function transposeMatrix(matrix) {
  return matrix[0].map((column, columnIndex) => matrix.map((row) => row[columnIndex]));
}

function countOccurrences(array) {
  return array.reduce((accumulator, element) => ({
    ...accumulator,
    [element]: accumulator[element] ? accumulator[element] + 1 : 1,
  }), {});
}

function functionalMap(mappingFunction) {
  return (array) => array.map(mappingFunction);
}

function convertBinaryArrayToDecimal(binaryArray) {
  return parseInt(binaryArray.join(''), 2);
}

function splitArray(callback) {
  return (array) => array.reduce((accumulator, currentValue) => {
    const targetIndex = callback(currentValue);
    return accumulator.map((currentList, currentIndex) => {
      if (currentIndex === targetIndex) return [...currentList, currentValue];
      return currentList;
    });
  }, [[], []]);
}

function findValue(splitSelector) {
  const findValueRecursive = (binaryMatrix, index) => {
    const splitArrays = splitArray((binaryNumber) => Number(binaryNumber[index]))(binaryMatrix);
    const selectedSplit = splitSelector(splitArrays);
    if (selectedSplit.length === 1) return selectedSplit[0];
    return findValueRecursive(selectedSplit, index + 1);
  };
  return findValueRecursive;
}

function partOne(input) {
  const binaryDigitOccurrences = pipe(
    splitInput,
    convertBinaryArrayToMatrix,
    transposeMatrix,
    functionalMap(countOccurrences),
  )(input);

  // Could refactor to make more DRY but need to account for starting accumulator differences
  const highestOccurringDigits = binaryDigitOccurrences.map((digitOccurrences) => {
    const [highestOccurringDigit] = Object
      .entries(digitOccurrences)
      .reduce((
        [currentHighestOccurringDigit, highestOccurrenceCount],
        [digit, occurrenceCount],
      ) => {
        if (occurrenceCount > highestOccurrenceCount) return [digit, occurrenceCount];
        return [currentHighestOccurringDigit, highestOccurrenceCount];
      },
      [null, 0]);

    return highestOccurringDigit;
  });

  const gammaRate = convertBinaryArrayToDecimal(highestOccurringDigits);

  const lowestOccurringDigits = binaryDigitOccurrences.map((digitOccurrences) => {
    const [lowestOccurringDigit] = Object
      .entries(digitOccurrences)
      .reduce((
        [currentLowestOccurringDigit, lowestOccurrenceCount],
        [digit, occurrenceCount],
      ) => {
        if (occurrenceCount < lowestOccurrenceCount) return [digit, occurrenceCount];
        return [currentLowestOccurringDigit, lowestOccurrenceCount];
      },
      [null, Number.MAX_VALUE]);

    return lowestOccurringDigit;
  });

  const epsilonRate = convertBinaryArrayToDecimal(lowestOccurringDigits);

  return gammaRate * epsilonRate;
}

function partTwo(input) {
  const binaryMatrix = pipe(
    splitInput,
    convertBinaryArrayToMatrix,
  )(input);

  const mostCommon = (array) => array.reduce((currentMostCommon, currentArray) => {
    if (currentArray.length >= currentMostCommon.length) return currentArray;
    return currentMostCommon;
  }, []);

  const leastCommon = (array) => array.reduce((currentLeastCommon, currentArray) => {
    if (currentArray.length < currentLeastCommon.length) return currentArray;
    return currentLeastCommon;
  }, { length: Number.MAX_VALUE });

  const oxygenGeneratorRatingBinaryArray = findValue(mostCommon)(binaryMatrix, 0);
  const co2ScrubberRatingBinaryArray = findValue(leastCommon)(binaryMatrix, 0);

  const oxygenGeneratorRating = convertBinaryArrayToDecimal(oxygenGeneratorRatingBinaryArray);
  const co2ScrubberRating = convertBinaryArrayToDecimal(co2ScrubberRatingBinaryArray);

  return oxygenGeneratorRating * co2ScrubberRating;
}

module.exports = { partOne, partTwo };
