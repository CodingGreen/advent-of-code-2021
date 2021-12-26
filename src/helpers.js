function runSimulation(simulationFunction, steps, startingState) {
  const runRecursive = (state, step) => {
    if (step >= steps) return state;
    return runRecursive(simulationFunction(state), step + 1);
  };

  return runRecursive(startingState, 0);
}

module.exports = { runSimulation };
