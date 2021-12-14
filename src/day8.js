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

function partTwo(input) {

}

module.exports = { partOne, partTwo };
