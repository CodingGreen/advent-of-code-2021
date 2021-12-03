function splitInput(input) {
  return input
    .split('\n')
    .filter((entry) => entry);
}

module.exports = {
  splitInput,
};
