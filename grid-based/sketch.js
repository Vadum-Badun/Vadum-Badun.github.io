// Grid based Tic Tac Toe
// Vadym Kolomiiets
// Date 04/15/2026
//
// Extra for Expert: Added Music to the game, which plays without local file
//
//----------------------------------------------------CREDITS--------------------------------------------------
// https://youtu.be/GTWrWM1UsnA?si=TCFLqeE1PYHtJNuw
//--------------------------------------------------END OF CREDITS---------------------------------------------

let bgMusic;

function preload() {
  bgMusic = loadSound('https://cdn.freecodecamp.org/curriculum/js-music-player/scratching-the-surface.mp3');
}

let board;
let humanPlayer = 'X';
let aiPlayer = 'O';
let currentPlayer;
let gameOver;
let available;


//------------------------------------------P5JS----------------------------------------------
function setup() {
  createCanvas(windowWidth, windowHeight);
  resetGame();
  bgMusic.loop();
}

function draw() {
  background(220);
  drawGrid();
  drawPieces();
}

//Player move
function mousePressed() {
  if (gameOver || currentPlayer !== humanPlayer) return;

  // Convert pixel position to grid cell
  let col = floor(mouseX / (width / 3));
  let row = floor(mouseY / (height / 3));

  // Ignore clicks outside the grid and taken cells
  if (col < 0 || col > 2 || row < 0 || row > 2) return;
  if (board[row][col] !== '') return;

  // Place players move and remove this cell from list
  available.splice(available.findIndex(([r, c]) => r === row && c === col), 1);
  board[row][col] = humanPlayer;

  if (checkWinner() !== null) { gameOver = true; return; }

  currentPlayer = aiPlayer;
  setTimeout(aiMove, 200);
}

//---------------------------------------------------MY OWN FUNCTIONS---------------------------------------------------


//----------------------------------------------------GAME LOGIC----------------------------------------------------

function mouseReleased() {
  if (gameOver) resetGame();
}

//Reset the game
function resetGame() {
  board =
  [['', '', ''], 
  ['', '', ''], 
  ['', '', '']];
  available = [];
  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++)
      available.push([i, j]);
  currentPlayer = humanPlayer;
  gameOver = false;
  if (bgMusic && !bgMusic.isPlaying()) bgMusic.loop();
}

//Makes AI to choose random spot
function aiMove() {
  if (gameOver) return;

  let index = floor(random(available.length));
  let spot = available.splice(index, 1)[0];
  board[spot[0]][spot[1]] = aiPlayer;

  if (checkWinner() !== null) { gameOver = true; return; }

  currentPlayer = humanPlayer;
}


//--------------------------------------------------------DRAWING-------------------------------------------------------------

function drawGrid() {
  let w = width / 3;
  let h = height / 3;
  strokeWeight(3);
  stroke(80);

  for (let i = 1; i < 3; i++) {
    line(w * i, 0, w * i, height);
    line(0, h * i, width, h * i);
  }
}

//Draw us the move of both player and AI
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

      if (spot === 'O') {
        noFill();
        stroke(50, 100, 200);
        ellipse(x, y, w / 2);
      } else {
        stroke(200, 60, 60);
        let s = w / 4;
        line(x - s, y - s, x + s, y + s);
        line(x + s, y - s, x - s, y + s);
      }
    }
  }
}


//----------------------------------------------------------------RESULTS--------------------------------------------------


function equals_three(a, b, c) {
  return a !== '' && a === b && b === c;
}

//Returns the winning player
function checkWinner() {
  for (let i = 0; i < 3; i++) {
    if (equals_three(board[i][0], board[i][1], board[i][2])){ 
      console.log(board[i][0] + ' wins!');
      return board[i][0];
      
    }
    if (equals_three(board[0][i], board[1][i], board[2][i])) {
      console.log(board[0][i] + ' wins!');
      return board[0][i];
    };
  }
  if (equals_three(board[0][0], board[1][1], board[2][2])) {
    console.log(board[0][0] + ' wins!');
    return board[0][0];
  };
  if (equals_three(board[2][0], board[1][1], board[0][2])) {
    console.log(board[2][0] + ' wins!');
    return board[2][0];
  }

  if (available.length === 0) { 
    console.log("It's a tie!");
    return 'tie'; 
  }

  return null;
}    