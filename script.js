// GameBoard Function to add the board to frontend

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

  // To get the index of the board

  const getField = (index) => {
    if (index > board.length) return;
    return board[index];
  };
  return { getField };
})();

// Player Object

function player(symbol) {
  this.symbol = symbol;
  const getSymbol = () => {
    return symbol;
  };
  return { getSymbol };
}

// Gameplay Object

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
      }
      const result = document.getElementById("result");
      if (checkWinner(index)) {
        result.textContent = getPlayerSymbol() + " " + "is the winner";
        model();
        board.splice(0, board.length);
        return;
      } else if (round === 9) {
        result.textContent = " It's a draw";
      }
    });
  });

  // To change player turns

  const getPlayerSymbol = () => {
    return round % 2 === 1 ? player1.getSymbol() : player2.getSymbol();
  };

  // Win Condition

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

  //To desplay model and restart the game

  const model = () => {
    const containerBody = document.getElementById("model");
    containerBody.classList.remove("none");
  };
  const result = document.getElementById("restart");
  result.addEventListener("click", () => {
    window.location.reload();
  });
}
