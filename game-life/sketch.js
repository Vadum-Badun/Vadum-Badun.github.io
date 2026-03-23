const CELL_SIZE = 100;
let grid;
let rows;
let cols;


function setup() {
  createCanvas(windowWidth, windowHeight);
  rows = Math.floor(height / CELL_SIZE);
  cols = Math.floor(width / CELL_SIZE);
  grid = generateRandomGrid(cols, rows);
}

function draw() {
  background(220);
  grid = updateGrid();
  displayGrid();
}

function mouseClicked(){
  let x = Math.floor(mouseX / CELL_SIZE);
  let y = Math.floor(mouseY / CELL_SIZE);

  //self
  toggleCell( x, y);
}

function keyPressed(){
  if(key === "r"){
    grid = generateRandomGrid(cols,rows);
  }
  if(key === "e"){
    grid = generateEmptyGrid(cols, rows);
  }
}


function updateGrid(){
  let nextTurn = generateEmptyGrid(cols, rows);


  //look at every cell
  for(let y = 0; y < rows; y++){
    for(let x = 0; x < cols; x++){
      let neighbours = 0;

      for(let i = -1; i <= 1; i++){
        for(let j = 1; j <= 1; j++){
          if(x + j >= 0 && x + j < cols && y+ 1 >= 0 && y+1 < rows)
          {
            neighbours += grid[y + i][x + j];
          }

        }
      }
      //don't count self
      neighbours -= grid[y][x];


      //apply the rules
      if(grid[y][x] === 1){
        //alive
        if(neighbours === 2 || neighbours === 3){
          nextTurn[y][x] = 1;
        }
        else{
          nextTurn[y][x] = 0;
        }
      }
      if(grid[y][x] === 0){
        //dead
        if(neighbours === 3){
          nextTurn[y][x] = 1;
        }
        else{
          nextTurn[y][x] = 0;
        }
      }
    }
  }
  return nextTurn;
}

function displayGrid(){
  for(let y = 0; y < rows; y++){
    for(let x = 0; x < cols; x++){
      if(grid[y][x] === 0){
        fill("white");
      }
      if(grid[y][x] === 1){
        fill("black");
      }
      square(x* CELL_SIZE, y * CELL_SIZE, CELL_SIZE);
    }
  }
}

function toggleCell(x, y){
  if( x>= 0 && x < cols && y >= 0 && y < rows){
    if(grid[y][x] === 1){
      grid[y][x] = 0;
    }
    else if (grid[y][x] === 0) {
      grid[y][x] = 1;
    }
  }

}

function generateRandomGrid(cols, rows){
  let newGrid = [];
  for(let y = 0; y < rows; y++){
    newGrid.push([]);
    for(let x = 0; x < cols; x++){
      if(random(100) < 50) {
        newGrid[y].push(1);
      }
      else{
        newGrid[y].push(0);
      }
    }
  }
  return newGrid;
}

function generateEmptyGrid(cols,rols){
  let newGrid = [];
  for(let y = 0; y < rows; y++){
    newGrid.push([]);
    for(let x = 0; x < cols; x++){

      newGrid[y].push(0);
    }
  }
  
  return newGrid;
}