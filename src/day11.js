const { identityFunction } = require('./utils');
const { runSimulation } = require('./helpers');

function parseInput(input) {
  return input.split('\n').filter(identityFunction).map((row) => row.split('').map(Number));
}

function flashOctopus(octopusGrid, x, y) {
  const lowerX = x - 1;
  const upperX = x + 1;
  const lowerY = y - 1;
  const upperY = y + 1;
  return octopusGrid.map((row, rowIndex) => {
    if (rowIndex >= lowerY && rowIndex <= upperY) {
      return row.map((cell, columnIndex) => {
        if (rowIndex === y && columnIndex === x) {
          return 0;
        }

        if (columnIndex >= lowerX && columnIndex <= upperX && cell !== 0) {
          return cell + 1;
        }

        return cell;
      });
    }

    return row;
  });
}

function findOctopus(octopusGrid) {
  function findOctopusRecursive(rowIndex) {
    if (rowIndex === octopusGrid.length) return null;
    const row = octopusGrid[rowIndex];
    const columnIndex = row.findIndex((cell) => cell > 9);
    if (columnIndex >= 0) return [columnIndex, rowIndex];
    return findOctopusRecursive(rowIndex + 1);
  }

  return findOctopusRecursive(0);
}

function increaseEnergy(octopusGrid) {
  return octopusGrid.map((row) => row.map((cell) => cell + 1));
}

function printOctopusGrid(octopusGrid) {
  console.log(octopusGrid.map((row) => row.join('')).join('\n'));
}

function simulateStep({ octopusGrid, flashCount }) {
  const simulateStepRecursive = (currentOctopusGrid, currentFlashCount) => {
    const octopusLocation = findOctopus(currentOctopusGrid);
    if (octopusLocation) {
      const [x, y] = octopusLocation;
      const newOctopusGrid = flashOctopus(currentOctopusGrid, x, y);
      return simulateStepRecursive(newOctopusGrid, currentFlashCount + 1);
    }
    return { octopusGrid: currentOctopusGrid, flashCount: currentFlashCount };
  };

  const energizedOctopusGrid = increaseEnergy(octopusGrid);

  return simulateStepRecursive(energizedOctopusGrid, flashCount);
}

function countOctopus(octopusGrid) {
  return octopusGrid.length * octopusGrid[0].length;
}

function runConditionalSimulation(simulationFunction, endCondition, startingState) {
  const runRecursive = (state, step) => {
    const newState = simulationFunction(state);
    if (endCondition(state, newState)) return { endState: newState, step };
    return runRecursive(newState, step + 1);
  };

  return runRecursive(startingState, 1);
}

function partOne(input) {
  const octopusGrid = parseInput(input);

  const simulationResult = runSimulation(simulateStep, 100, { octopusGrid, flashCount: 0 });
  return simulationResult.flashCount;
}

function partTwo(input) {
  const octopusGrid = parseInput(input);

  const numberOfOctopus = countOctopus(octopusGrid);

  const endCondition = (oldState, newState) => newState.flashCount
  >= oldState.flashCount + numberOfOctopus;

  const simulationResult = runConditionalSimulation(
    simulateStep,
    endCondition,
    { octopusGrid, flashCount: 0 },
  );

  return simulationResult.step;
}

module.exports = { partOne, partTwo };
