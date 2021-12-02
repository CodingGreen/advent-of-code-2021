function compareReduce(array, callback, initialValue) {
  return array.reduce((accumulator, currentValue, currentIndex) => {
    if (currentIndex === 0) return accumulator;
    return callback(accumulator, array[currentIndex - 1], currentValue, currentIndex, array);
  }, initialValue);
}

function splitNumericalInput(input) {
  return input
    .split('\n')
    .filter((entry) => entry)
    .map(Number);
}

function partOne(input) {
  const sonarReadings = splitNumericalInput(input);
  return compareReduce(
    sonarReadings,
    (total, previousReading, currentReading) => {
      if (currentReading > previousReading) return total + 1;
      return total;
    },
    0,
  );
}

function partTwo(input) {}

module.exports = { partOne, partTwo };
