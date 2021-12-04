function splitInput(input) {
  return input
    .split('\n')
    .filter((entry) => entry);
}

function pipe(...functions) {
  return (startingValue) => functions.reduce(
    (previousResult, nextFunction) => nextFunction(previousResult),
    startingValue,
  );
}

module.exports = {
  splitInput,
  pipe,
};
