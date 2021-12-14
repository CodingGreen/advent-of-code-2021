const { sum, identityFunction } = require('./utils');

function splitInput(input) {
  return input.split(',').map(Number);
}

function sort(array) {
  return [...array].sort((a, b) => a - b);
}

function median(sortedArray) {
  return sortedArray[Math.floor(sortedArray.length / 2)];
}

function difference(a, b) {
  return Math.abs(a - b);
}

function average(array) {
  return sum(array) / array.length;
}

function fuelCost(distance) {
  return (distance * (distance + 1)) / 2;
}

function calculateFuelRequirement(positionList, comparisonPosition, calculateFuelCost) {
  return sum(positionList
    .map((currentPosition) => calculateFuelCost(difference(currentPosition, comparisonPosition))));
}

function partOne(input) {
  const positionList = splitInput(input);
  const sortedPositions = sort(positionList);
  const medianPosition = median(sortedPositions);
  const fuelRequirement = calculateFuelRequirement(positionList, medianPosition, identityFunction);
  return fuelRequirement;
}

function partTwo(input) {
  const positionList = splitInput(input);
  const averagePosition = average(positionList);
  const averagePositionFloor = Math.floor(averagePosition);
  const averagePositionCeiling = Math.ceil(averagePosition);
  const averagePositionFloorFuelRequirement = calculateFuelRequirement(
    positionList, averagePositionFloor, fuelCost,
  );
  const averagePositionCeilingFuelRequirement = calculateFuelRequirement(
    positionList, averagePositionCeiling, fuelCost,
  );
  return Math.min(averagePositionFloorFuelRequirement, averagePositionCeilingFuelRequirement);
}

module.exports = { partOne, partTwo };
