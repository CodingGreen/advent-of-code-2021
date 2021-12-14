const { sum } = require('./utils');

function splitInput(input) {
  return input.split(',').map(Number);
}

function sort(array) {
  return [...array].sort((a, b) => a - b);
}

function findMedian(sortedArray) {
  return sortedArray[Math.floor(sortedArray.length / 2)];
}

function difference(a, b) {
  return Math.abs(a - b);
}

function partOne(input) {
  const positionList = splitInput(input);
  const sortedPositions = sort(positionList);
  const medianPosition = findMedian(sortedPositions);
  const fuelRequirements = positionList
    .map((currentPosition) => difference(currentPosition, medianPosition));
  return sum(fuelRequirements);
}

function partTwo(input) {

}

module.exports = { partOne, partTwo };
