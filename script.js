const gameboard = (() => {
  let board = Array(8);
  console.log(board);
  const containerBody = document.getElementById("main-container");
  const container = document.createElement("div");
  container.classList.add("game-container");
  containerBody.appendChild(container);
  for (i = 0; i <= 8; i++) {
    const cells = document.createElement("div");
    cells.classList.add("cells");
    cells.setAttribute("data-index", i);
    container.appendChild(cells);
  }
  gameplay(board);

  const getField = (index) => {
    if (index > board.length) return;
    return board[index];
  };
  return { getField };
})();

function player(symbol) {
  this.symbol = symbol;
  const getSymbol = () => {
    return symbol;
  };
  return { getSymbol };
}
function gameplay(board) {
  const player1 = player("X");
  const player2 = player("O");
  let round = 0;

  const cells = document.querySelectorAll(".cells");
  cells.forEach((cell) => {
    cell.addEventListener("click", () => {
      const index = parseInt(cell.dataset.index);
      if (cell.textContent === "") {
        round++;
        cell.textContent = getPlayerSymbol();
        board.splice(index, 1, cell.textContent);
        board.join();
        console.log(index);
      }
      const result = document.getElementById("resultText");
      if (checkWinner(index)) {
        console.log(index);
        result.textContent = getPlayerSymbol() + " " + "is the winner";
        return;
      } else if (round === 9) {
        result.textContent = " It's a draw";
      }
    });
  });
  const getPlayerSymbol = () => {
    return round % 2 === 1 ? player1.getSymbol() : player2.getSymbol();
  };

  const checkWinner = (index) => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    return winConditions
      .filter((combination) => combination.includes(index))
      .some((possibleCombination) =>
        possibleCombination.every(
          (index) => gameboard.getField(index) === getPlayerSymbol()
        )
      );
  };
}
