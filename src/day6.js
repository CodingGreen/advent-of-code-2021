const { range, sum } = require('./utils');
const { runSimulation } = require('./helpers');

const lanternFishStartingReproductionRate = 9;
const lanternFishStandardReproductionRate = 7;

function updateIndex(array, index, value) {
  return [...array.slice(0, index), value, ...array.slice(index + 1)];
}

function incrementIndex(array, index) {
  return updateIndex(array, index, array[index] + 1);
}

function countLanternFish(input) {
  const startingAccumulator = range(lanternFishStartingReproductionRate).fill(0);

  return input.split(',').map(Number).reduce(
    (accumulator, lanternFishTimer) => incrementIndex(accumulator, lanternFishTimer),
    startingAccumulator,
  );
}

function simulateDay(state) {
  return [
    ...state.slice(1, lanternFishStandardReproductionRate),
    state[0] + state[lanternFishStandardReproductionRate],
    ...state.slice(lanternFishStandardReproductionRate + 1, lanternFishStartingReproductionRate),
    state[0],
  ];
}

function simulateLanternFish(input, daysToSimulate) {
  const startingState = countLanternFish(input);
  const finalState = runSimulation(simulateDay, daysToSimulate, startingState);
  return sum(finalState);
}

function partOne(input) {
  return simulateLanternFish(input, 80);
}

function partTwo(input) {
  return simulateLanternFish(input, 256);
}

module.exports = { partOne, partTwo };
