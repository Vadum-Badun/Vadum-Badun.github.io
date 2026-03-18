// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let theGrid = [[0,0,1,0],
              [1,0,1,0],
              [0,1,0,0],
              [0,1,0,1]];

const SQUARE_DIMENSIONS = theGrid.length;

let cellSize;

function setup() {
  createCanvas(windowWidth, windowHeight);
  if(width < height){
    cellSize = width / SQUARE_DIMENSIONS;
  }
  else{
    cellSize = height / SQUARE_DIMENSIONS;
  }
  
}

function draw() {
  background(220);
  showGrid();
}
function showGrid(){
  for(let  y = 0; y < SQUARE_DIMENSIONS; y++){
    for(let x = 0; x < SQUARE_DIMENSIONS; x++){
      if(theGrid[y][x] === 1 || (mouseClicked &&(theGrid[y][x] === 0))){
        fill("black");
      }
      if(theGrid[y][x] === 0 || (mouseClicked &&(theGrid[y][x] === 1))){
        fill("white");
      }
      square(x * cellSize, y* cellSize, cellSize);
    }
  }
}
