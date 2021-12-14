const { range, sum } = require('./utils');

const daysToSimulate = 80;
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

function runSimulation(simulationFunction, steps, startingState) {
  const runRecursive = (state, step) => {
    if (step >= steps) return state;
    return runRecursive(simulationFunction(state), step + 1);
  };

  return runRecursive(startingState, 0);
}

function partOne(input) {
  const startingState = countLanternFish(input);
  const finalState = runSimulation(simulateDay, daysToSimulate, startingState);
  return sum(finalState);
}

function partTwo(input) {

}

module.exports = { partOne, partTwo };
