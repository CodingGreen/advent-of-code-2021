const { range, sum } = require('./utils');

function chunkArray(chunkSize) {
  return (array) => {
    const requiredChunks = Math.ceil(array.length / chunkSize);
    return range(requiredChunks)
      .map((_, index) => array.slice(index * chunkSize, (index * chunkSize) + chunkSize));
  };
}

function markNumber(number, board) {
  return board.map((row) => row.map((boardNumber) => {
    const { value } = boardNumber;
    if (value === number) return { ...boardNumber, marked: true };
    return boardNumber;
  }));
}

function isWinHorizontal(board) {
  return board.some((row) => row.every(({ marked }) => marked));
}

function isWinVertical(board) {
  return board[0].some((column, columnIndex) => board.every((row) => row[columnIndex].marked));
}

function isWin(board) {
  return isWinHorizontal(board) || isWinVertical(board);
}

function findWinningBoard(boards, numberDraws) {
  const [drawnNumber, ...remainingDraws] = numberDraws;
  const markedBoards = boards.map((board) => markNumber(drawnNumber, board));
  const winningBoard = markedBoards.find((board) => isWin(board));
  if (winningBoard) return { winningBoard, winningNumber: drawnNumber };
  if (remainingDraws.length === 0) return null;
  return findWinningBoard(markedBoards, remainingDraws);
}

function scoreWinningBoard(board, winningNumber) {
  const uncheckedValues = board.flat().map(({ value, marked }) => (marked ? 0 : value));
  return sum(uncheckedValues) * winningNumber;
}

function partOne(input) {
  const firstNewlineIndex = input.indexOf('\n');

  const numberDraws = input.slice(0, firstNewlineIndex).split(',').map(Number);

  const boards = input
    .slice(firstNewlineIndex + 2, -1)
    .split('\n\n')
    .map((board) => board
      .split('\n')
      .map(chunkArray(3))
      .map((row) => row.map((stringValue) => ({
        marked: false,
        value: Number(stringValue),
      }))));

  const { winningBoard, winningNumber } = findWinningBoard(boards, numberDraws);

  return scoreWinningBoard(winningBoard, winningNumber);
}

function partTwo(input) {

}

module.exports = { partOne, partTwo };
