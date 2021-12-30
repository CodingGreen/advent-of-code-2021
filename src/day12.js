const { identityFunction, sum } = require('./utils');

function createEdges(input) {
  return input.split('\n').filter(identityFunction).map((edgeString) => edgeString.split('-'));
}

function isLowerCase(string) {
  return string.toUpperCase() !== string;
}

function findChildrenForEdges(edges) {
  return (node) => edges
    .map((edge) => edge.filter((edgeNode) => edgeNode !== node))
    .filter((edge) => edge.length === 1)
    .map((array) => array[0]);
}

function searchGraph(edges) {
  const findChildren = findChildrenForEdges(edges);
  const searchGraphRecursive = (pathSoFar, nextCave) => {
    if (nextCave === 'end') return 1;

    if (isLowerCase(nextCave) && pathSoFar.includes(nextCave)) {
      return 0;
    }

    const children = findChildren(nextCave);

    return sum(children.map((child) => searchGraphRecursive(
      [...pathSoFar, nextCave],
      child,
    )));
  };

  return searchGraphRecursive([], 'start');
}

function searchGraphPartTwo(edges) {
  const findChildren = findChildrenForEdges(edges);
  const searchGraphRecursive = (pathSoFar, nextCave, repeatedSmallCaveVisitOccurred) => {
    if (nextCave === 'end') return 1;

    const repeatedSmallCaveVisit = isLowerCase(nextCave) && pathSoFar.includes(nextCave);

    if (repeatedSmallCaveVisit && (repeatedSmallCaveVisitOccurred || nextCave === 'start')) return 0;

    const children = findChildren(nextCave);

    return sum(children.map((child) => searchGraphRecursive(
      [...pathSoFar, nextCave],
      child,
      repeatedSmallCaveVisitOccurred || repeatedSmallCaveVisit,
    )));
  };

  return searchGraphRecursive([], 'start');
}

function partOne(input) {
  const edges = createEdges(input);
  return searchGraph(edges);
}

function partTwo(input) {
  const edges = createEdges(input);
  return searchGraphPartTwo(edges);
}

module.exports = { partOne, partTwo };
