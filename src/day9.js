const {
  pipe, identityFunction, sum, functionalMap, pick, sort, multiply, functionalSlice,
} = require('./utils');

function parseInput(input) {
  return input.split('\n').filter(identityFunction).map((row) => Array.from(row).map(Number));
}

function findLowPoints(heightMap) {
  return heightMap.flatMap((row, rowIndex) => row.reduce((accumulator, cell, columnIndex) => {
    const lowerThanAbove = rowIndex < 1
      ? true
      : cell < heightMap[rowIndex - 1][columnIndex];
    const lowerThanBelow = rowIndex > heightMap.length - 2
      ? true
      : cell < heightMap[rowIndex + 1][columnIndex];
    const lowerThanLeft = columnIndex < 1
      ? true
      : cell < row[columnIndex - 1];
    const lowerThanRight = columnIndex > row.length - 2
      ? true
      : cell < row[columnIndex + 1];

    if (lowerThanAbove && lowerThanBelow && lowerThanLeft && lowerThanRight) {
      return [
        ...accumulator,
        {
          height: cell,
          coordinates: {
            x: columnIndex,
            y: rowIndex,
          },
        },
      ];
    }

    return accumulator;
  }, []));
}

function calculateRiskLevel(height) {
  return height + 1;
}

function partOne(input) {
  return pipe(
    parseInput,
    findLowPoints,
    functionalMap(pick('height')),
    functionalMap(calculateRiskLevel),
    sum,
  )(input);
}

function createSet(comparisonFunction) {
  return {
    add: (setArray, element) => {
      if (setArray.some(comparisonFunction(element))) return setArray;
      return [...setArray, element];
    },
  };
}

function compareCoordinates(reference) {
  return (current) => reference.x === current.x && reference.y === current.y;
}

function getElementFrom2DArray(twoDArray, x, y) {
  const row = twoDArray[y];
  return row && row[x];
}

function markSpot(heightMap, x, y) {
  return heightMap.map((row, rowIndex) => {
    if (rowIndex === y) {
      return row.map((cell, columnIndex) => {
        if (columnIndex === x) return 'X';
        return cell;
      });
    }
    return row;
  });
}

function printHeightMap(heightMap) {
  const logString = heightMap
    .map((row) => row.join(''))
    .join('\n');

  console.log(logString);
}

function findBasinSize(heightMap, lowPointCoordinates) {
  const coordinatesSet = createSet(compareCoordinates);

  const findBasinSizeRecursive = (currentHeightMap, coordinatesToCheck) => {
    if (!coordinatesToCheck.length) return 0;

    const [{ x, y }, ...rest] = coordinatesToCheck;
    const height = getElementFrom2DArray(currentHeightMap, x, y);

    if (height === undefined || height === 9 || height === 'X') {
      return findBasinSizeRecursive(currentHeightMap, rest);
    }

    const newHeightMap = markSpot(currentHeightMap, x, y);

    const newCoordinatesToCheck = [
      { x: x - 1, y },
      { x: x + 1, y },
      { x, y: y - 1 },
      { x, y: y + 1 },
    ].reduce((accumulator, coordinates) => coordinatesSet.add(accumulator, coordinates), rest);

    return 1 + findBasinSizeRecursive(newHeightMap, newCoordinatesToCheck);
  };

  return findBasinSizeRecursive(heightMap, [lowPointCoordinates]);
}

function partTwo(input) {
  const heightMap = parseInput(input);

  const lowPoints = findLowPoints(heightMap);
  const basinSizes = lowPoints.map(({ coordinates }) => findBasinSize(heightMap, coordinates));

  return pipe(
    sort,
    functionalSlice(0, 3),
    multiply,
  )(basinSizes);
}

module.exports = { partOne, partTwo };
