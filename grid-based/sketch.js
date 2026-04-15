// Grid based Tic Tac Toe
// Vadym Kolomiiets
// Date
//
// Extra for Experts:
//

//----------------------------------------------------CREDITS--------------------------------------------------
//https://youtu.be/GTWrWM1UsnA?si=TCFLqeE1PYHtJNuw 
//
//--------------------------------------------------END OF CREDITS---------------------------------------------

let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

let players = ['X', 'O'];

let available = [];

let currentPlayer;

function setup() {
  createCanvas(400, 400);
  frameRate(2);
  currentPlayer = floor(random(players.length));
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      available.push([i, j]);
    }
  }
}

function draw() {
  background(220);

  drawGrid();
  drawPieces();

  let result = checkWinner();
  if (result !== null) {
    noLoop();
    if (result === 'tie') {
      console.log("It's a tie!");
    } else {
      console.log(result + ' wins!');
    }
    return;
  }

  nextTurn();
}

function drawGrid() {
  let w = width / 3;
  let h = height / 3;
  for (let i = 1; i < 3; i++) {
    line(w * i, 0, w * i, height);
    line(0, h * i, width, h * i);
  }
}

function drawPieces() {
  let w = width / 3;
  let h = height / 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let spot = board[i][j];
      if (spot === '') continue;

      let x = w * j + w / 2;
      let y = h * i + h / 2;
      strokeWeight(4);

      if (spot === players[1]) {
        noFill();
        ellipse(x, y, w / 2);
      } else if (spot === players[0]) {
        let xsize = w / 4;
        line(x - xsize, y - xsize, x + xsize, y + xsize);
        line(x + xsize, y - xsize, x - xsize, y + xsize);
      }
    }
  }
}

function equals_three(a, b, c) {
  return a !== '' && a === b && b === c;
}

function checkWinner() {
  let winner = null;

  // horizontal
  for (let i = 0; i < 3; i++) {
    if (equals_three(board[i][0], board[i][1], board[i][2])) {
      winner = board[i][0];
    }
  }

  // vertical
  for (let i = 0; i < 3; i++) {
    if (equals_three(board[0][i], board[1][i], board[2][i])) {
      winner = board[0][i];
    }
  }

  // diagonals
  if (equals_three(board[0][0], board[1][1], board[2][2])) winner = board[0][0];
  if (equals_three(board[2][0], board[1][1], board[0][2])) winner = board[2][0];

  if (winner === null && available.length === 0) return 'tie';
  return winner;
}

function nextTurn() {
  let index = floor(random(available.length));
  let spot = available.splice(index, 1)[0];
  board[spot[0]][spot[1]] = players[currentPlayer];
  currentPlayer = (currentPlayer + 1) % players.length;
}




       