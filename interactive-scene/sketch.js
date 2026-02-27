// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let cellSize;

function setup() {
  createCanvas(400, 400);
  cellSize = width / 8;
}


function draw() {
  background(240);
  chessBoard();
}

function chessBoard(){
  let isWhite = true;
  for(let x = 0; x < 8; x++ ){
    for(let y = 0; y < 8; y++ ){
      if(isWhite){
        fill("white");
      }
      else{
        fill("black");
      }
      square(x*cellSize,y*cellSize,cellSize);
      isWhite = !isWhite;
    }
    isWhite = !isWhite;
  }
}