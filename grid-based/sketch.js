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
  ['O', 'X', 'O'],
  ['X', 'X', 'O'],
  ['X', 'O', 'X'],
];

let player_one = 'X';
let player_two = 'O';


function setup() {
  createCanvas(400, 400);

}

function draw() {
  background(220);
  let w = width / 3;
  let h = height / 3;

  for(let i = 0; i < 3; i++){
    for(let j = 0; j < 3; j++){
      let x = w * i + w / 2;
      let y = h * j + h /2;
      let spot = board[i][j];
      textSize(32);
      if(spot === player_two){
        noFill();
        ellipseMode(CORNER);
        ellipse(x, y, w);
      }
      else if(spot === player_one){
        let xsize = w / 2;
        line(x,y,x+w,y+h);
        line(x + w, y, x, y+h);
      }
      
    }
  }
}




       