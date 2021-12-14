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

function range(rangeSize) {
  return [...Array(rangeSize).keys()];
}

function sum(array) {
  return array.reduce((total, value) => total + value, 0);
}

function identityFunction(input) {
  return input;
}

module.exports = {
  splitInput,
  pipe,
  range,
  sum,
  identityFunction,
};
