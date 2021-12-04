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

  const gammaRate = parseInt(highestOccurringDigits.join(''), 2);

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

  const epsilonRate = parseInt(lowestOccurringDigits.join(''), 2);

  return gammaRate * epsilonRate;
}

function partTwo(input) {

}

module.exports = { partOne, partTwo };
