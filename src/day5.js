const coordinatesMatcher = /(\d+),(\d+) -> (\d+),(\d+)/g;

function parseLineCoordinates(input) {
  const matches = [...input.matchAll(coordinatesMatcher)];
  return matches.map(((match) => {
    const [x1, y1, x2, y2] = match
      .slice(1)
      .map(Number);
    return [{ x: x1, y: y1 }, { x: x2, y: y2 }];
  }
  ));
}

function isHorizontal(line) {
  return (line[0].x === line[1].x);
}

function isVertical(line) {
  return (line[0].y === line[1].y);
}

function isHorizontalOrVertical(line) {
  return isHorizontal(line) || isVertical(line);
}

function nullRange(rangeSize) {
  return [...Array(rangeSize).fill(null)];
}

function generateGrid(gridSize) {
  return nullRange(gridSize).map(() => nullRange(gridSize));
}

function isBetween(a, b) {
  const [low, high] = a > b ? [b, a] : [a, b];
  return (number) => (low <= number && high >= number);
}

function drawHorizontalOrVerticalLine(grid, line) {
  const inXRange = isBetween(line[0].x, line[1].x);
  const inYRange = isBetween(line[0].y, line[1].y);

  return grid.map((row, rowIndex) => {
    if (inYRange(rowIndex)) {
      return row.map((cell, columnIndex) => {
        if (inXRange(columnIndex)) {
          return cell ? cell + 1 : 1;
        }
        return cell;
      });
    }
    return row;
  });
}

function countOverlaps(grid) {
  return grid.flat().reduce((count, cell) => {
    if (cell > 1) return count + 1;
    return count;
  }, 0);
}

function findLargestCoordinate(lines) {
  return lines.flat().reduce((currentHighestCoordinate, coordinates) => {
    if (coordinates.x > coordinates.y) {
      if (coordinates.x > currentHighestCoordinate) return coordinates.x;
    }
    if (coordinates.y > currentHighestCoordinate) return coordinates.y;
    return currentHighestCoordinate;
  }, 0);
}

function partOne(input) {
  const horizontalAndVerticalLines = parseLineCoordinates(input)
    .filter(isHorizontalOrVertical);

  const largestCoordinate = findLargestCoordinate(horizontalAndVerticalLines);
  const initialGrid = generateGrid(largestCoordinate + 1);

  const finalGrid = horizontalAndVerticalLines
    .reduce((grid, lineToDraw) => drawHorizontalOrVerticalLine(grid, lineToDraw), initialGrid);

  return countOverlaps(finalGrid);
}

function partTwo(input) {

}

module.exports = { partOne, partTwo };
