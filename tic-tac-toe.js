let movesCount = 0;
let currentPlayer = 1;
const BOARD_SIZE = 3;

let squareList = generateSquareList();
const gameSquares = document.querySelectorAll(".game-square");
const resetButton = document.getElementById("restart-board");
const gameHeading = document.getElementById("game-heading");

// generate the square list of rows columns
function generateSquareList() {
  return new Array(BOARD_SIZE).fill().map(() => new Array(BOARD_SIZE).fill());
}

// Add listener to each game square and the callback function to determine move
gameSquares.forEach((gameSquare, index) => {
  gameSquare.addEventListener("click", () => {
    const row = Math.floor(index / BOARD_SIZE);
    const column = index % BOARD_SIZE;
    nextMove(gameSquare, row, column);
  });
});

// Add event listener to reset board button
resetButton.addEventListener("click", resetBoardGame);

// To Reset the game we have to update 3 things
// 1. game squares
// 2. square List
// 3. current Player

function resetBoardGame() {
  gameSquares.forEach((gameSquare) => {
    gameSquare.textContent = "";
    gameSquare.disabled = false;
  });

  squareList = generateSquareList();
  currentPlayer = 1;
  movesCount = 0;
  resetButton.style.display = "none";

  setCurrentPlayerHeading();
  // gameHeading.textContent = `Player ${currentPlayer}\' turn`;
}

// Next move has to be the event fired when user click on any of the game square
// 1. Update respective game square
// 2. Update game heading
// 3. Update squareList
// 4. Check if current user won or not handle it.

function nextMove(gameSquare, row, col) {
  const playerSymbol = currentPlayer === 1 ? "X" : "O";
  gameSquare.textContent = playerSymbol;
  gameSquare.disabled = true;
  movesCount++;

  squareList[row][col] = playerSymbol;

  if (currentPlayerWon()) {
    gameHeading.textContent = `Player ${currentPlayer} won!`;
    endBoardGame();
  } else if (movesCount >= BOARD_SIZE * BOARD_SIZE) {
    gameHeading.textContent = `Game Tie!`;
    endBoardGame();
  } else {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    setCurrentPlayerHeading();
  }
}

// checking and updating if current player won the game
// There could be 8 possible combinations where current player can win game
// 1. All rows matches (board size)
// 2. All column matches (board size)
// 3. Top diagonal
// 4. Bottom diagonal

function currentPlayerWon() {
  // check rows;
  const playerSymbol = currentPlayer === 1 ? "X" : "O";
  let rowResult = false;
  for (let index = 0; index < BOARD_SIZE; index++) {
    rowResult = squareList.some((list) =>
      list.every((item) => item === playerSymbol)
    );
  }

  // check columns
  let columnResult = false;
  for (let index = 0; index < BOARD_SIZE; index++) {
    for (let x = 0; x < BOARD_SIZE; x++) {
      columnResult = squareList[x][index] === playerSymbol;
      if (!columnResult) {
        break;
      }
    }
    if (columnResult) {
      break;
    }
  }
  // Diagonal check
  let topDiagonal = false;
  for (let index = 0; index < BOARD_SIZE; index++) {
    topDiagonal = squareList[index][index] === playerSymbol;
    if (!topDiagonal) {
      break;
    }
  }
  // Diagonal check
  let bottomDiagonal = false;
  for (let index = 0; index < BOARD_SIZE; index++) {
    bottomDiagonal =
      squareList[index][BOARD_SIZE - (index + 1)] === playerSymbol;
    if (!bottomDiagonal) {
      break;
    }
  }
  return rowResult || columnResult || topDiagonal || bottomDiagonal;
}

// function currentPlayerWon() {
//   console.log("testing the functionality");
// }

// When game ends or tie few things to be confirmed
// 1. all squares are disabled
// 2. user should able to reset the game
// 3. Game heading to be updated

function endBoardGame() {
  gameSquares.forEach((gameSquare) => {
    gameSquare.disabled = true;
  });
  resetButton.style.display = "block";
}

// Set the current player heading
function setCurrentPlayerHeading() {
  gameHeading.textContent = `Player ${currentPlayer}\' turn`;
}
