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
  currentPlayer = random(players);
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
}

function nextTurn(){
  let index = floor(random(available.length));
  let spot = available.splice(index,1);
}




       