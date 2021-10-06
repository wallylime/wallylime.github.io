const board = document.getElementById("board");
board.addEventListener("touchend", makeMove);
const statusDiv = document.getElementById("game-status");
let player = true;
let moves = 0;
let player1 = [];
let player2 = [];
let winKey = [
  [1,2,3],
  [4,5,6],
  [7,8,9],
  [1,5,9],
  [3,5,7],
  [1,4,7],
  [2,5,8],
  [3,6,9]
];

function makeMove(event) {
  let squareId = parseInt(event.target.id);
  if (player) {
    event.target.innerHTML = "X";
    player1.push(squareId);
    moves++;
    //Can't win at tic-tac-toe unless you've had at least 3 moves
    if (player1.length >= 3) {
      checkForWin(winKey, player1);
      }
    player = false;   
  }
  
  else {
    event.target.innerHTML = "O";
    player2.push(squareId);
    moves++;
    //Can't win at tic-tac-toe unless you've had at least 3 moves
    if (player2.length >= 3) {
      checkForWin(winKey, player2);
    }
    player = true;
  }
}

function checkForWin(winKey, playerArray) {
  for(i=0; i < winKey.length; i++) {
    let winBoulean = winKey[i].every(val => playerArray.includes(val));
    if (winBoulean == true) {
      statusDiv.innerHTML = "You won!"
    };
  }

  if (moves == 9) {
    statusDiv.innerHTML = "It was a tie!";
  }
}

function reset() {
  const gameSquares = document.querySelectorAll(".gameSquares");
  gameSquares.forEach(square => {
    square.innerHTML = "";
    player1 = [];
    player2 = [];
    player = true;
    moves = 0;
    statusDiv.innerHTML = "";
  });
}