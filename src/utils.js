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

function functionalMap(mappingFunction) {
  return (array) => array.map(mappingFunction);
}

function pick(propertyName) {
  return (object) => object[propertyName];
}

function sort(array) {
  return [...array].sort((a, b) => b - a);
}

function multiply(array) {
  return array.reduce((total, value) => total * value, 1);
}

function functionalSlice(...args) {
  return (array) => array.slice(...args);
}

module.exports = {
  splitInput,
  pipe,
  range,
  sum,
  identityFunction,
  functionalMap,
  pick,
  sort,
  multiply,
  functionalSlice,
};
