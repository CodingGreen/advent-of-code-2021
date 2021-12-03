const { splitInput } = require('./utils');

function compareReduce(numberToCompare) {
  const indexLimit = numberToCompare - 1;

  return (array, callback, initialValue) => array
    .reduce((accumulator, currentValue, currentIndex) => {
      if (currentIndex < indexLimit) return accumulator;
      return callback(
        accumulator,
        array.slice(currentIndex - indexLimit, currentIndex + 1),
        currentIndex,
        array,
      );
    }, initialValue);
}

function splitNumericalInput(input) {
  return splitInput(input).map(Number);
}

function sum(array) {
  return array.reduce((total, value) => total + value, 0);
}

function countIncreases(numericalArray) {
  return compareReduce(2)(
    numericalArray,
    (total, [previousReading, currentReading]) => {
      if (currentReading > previousReading) return total + 1;
      return total;
    },
    0,
  );
}

function partOne(input) {
  const sonarReadings = splitNumericalInput(input);
  return countIncreases(sonarReadings);
}

function partTwo(input) {
  const sonarReadings = splitNumericalInput(input);
  const slidingWindowResults = compareReduce(3)(
    sonarReadings,
    (accumulator, tripleValues) => [...accumulator, sum(tripleValues)],
    [],
  );
  return countIncreases(slidingWindowResults);
}

module.exports = { partOne, partTwo };
