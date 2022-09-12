const gameboard = () => {
  const board = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
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
  gameplay();
};

function player(symbol) {
  this.symbol = symbol;
  const getSymbol = () => {
    return symbol;
  };
  return { getSymbol };
}
function gameplay() {
  const player1 = player("jhon", "X");
  const player2 = player("jack", "O");
  let round = 1;

  const cells = document.querySelectorAll(".cells");
  cells.forEach((cell) => {
    cell.addEventListener("click", () => {
      round++;
      console.log("clicked");
      getPlayerSymbol();
    });
  });
  console.log(cells);
  const getPlayerSymbol = () => {
    console.log("turn");
    return round % 2 === 1 ? player1.getSymbol() : player2.getSymbol();
  };
}
gameboard();
