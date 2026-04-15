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
  currentPlayer = floor(random(players.length));
  for(let j = 0; j < 3; j++){
    for(let i = 0; i < 3; i++){
      available.push([i,j]);
    }
  }
}

function draw() {
  background(220);
  let w = width / 3;
  let h = height / 3;

  //setting up the grid
  //try to automize it, so so lame drawing. For loop?
  line(w, 0 , w, height);
  line(w*2, 0 , w*2, height);
  line(0, h , width, h);
  line(0, h * 2, width, h*2);

  //make it as a separate function, so lame
  for(let j = 0; j < 3; j++){
    for(let i = 0; i < 3; i++){
      let x = w * j + w/2;
      let y = h * i + h/2;
      let spot = board[i][j];
      textSize(32);
      strokeWeight(4);
      if(spot === players[1]){
        noFill();
        ellipse(x, y, w/2);
      }
      else if(spot === players[0]){
        let xsize = w / 4;
        line(x-xsize, y-xsize, x + xsize, y + xsize);
        line(x + xsize, y-xsize, x-xsize, y + xsize);
      }
      
    }
  }

  nextTurn();
  let result = checkWinner();
  if(result !== null){
    noLoop();
    console.log(result);
  }
}

// function mousePressed(){
//   nextTurn();
// }

function checkWinner(){

  let winner = null;

  //horizontal win
  for(let i = 0; i < 3; i++ ){
    //why is it feels so lame. I'll spend most of time optimzing it...
    if(board[i][0] === board[i][1] === board[i][2]){
      winner = board[i][0];
    }
  }

  //vertical win
  for(let i = 0; i < 3; i++ ){
    //why is it feels so lame. I'll spend most of time optimzing it...
    if(board[0][i] === board[0][i] === board[0][i]){
      winner = board[0][i];
    }
  }

  //Diagonal 
  if(board[0][0] === board[1][1] === board[2][2]){
    winner = board[0][0];
  }

  if(board[2][0] === board[1][1] === board[0][2]){
    winner = board[2][0];
  }

  if(winner === null && available.length === 0){
    console.log('tie');
  }
  else{
    console.log(winner);
  }
}

function nextTurn(){
  let index = floor(random(available.length));
  let spot = available.splice(index,1)[0];
  let i = spot[0];
  let j = spot[1];
  board[i][j] = players[currentPlayer];
  currentPlayer = (currentPlayer + 1) % players.length;
}




       