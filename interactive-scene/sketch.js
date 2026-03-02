// "Put in order"
// Vadym Kolomiiets
// 03/03/2026
//
// Extra for Experts:
// 


let player;
let places = [];
let bar;
let isDead = false;
let points = 0;
let button = null;

function setup(){
  createCanvas(500, 500);
  player = new Player();
  bar = new Bar();
  places.push(new Place(true));  // first place starts active
}

function draw(){
  background(220);

  if(!isDead){

    // Bar
    bar.display();
    bar.update();

    // Places
    for(let i = 0; i < places.length; i++){
      places[i].display();

      if(!places[i].active){
        places[i].spawn();
      }
      else if(places[i].guessed){
        places[i].transform(places[i].dir);
      }
    }

    // Player
    player.display();

    // Points
    textSize(18);
    fill(30);
    textAlign(LEFT);
    text(`Points : ${points}`, 20, 30);

    // Controls hint
    textSize(14);
    fill(80);
    textAlign(CENTER);
    text("A = Left   |   D = Right", width / 2, height - 15);

  }
  else {

    noLoop();

    textAlign(CENTER);
    fill(30);
    textSize(40);
    text("Oops, you're dead!", width/2, height/2 - 40);

    textSize(30);
    text(`Points : ${points}`, width/2, height/2);

    // Create button only once
    if(button === null){
      button = createButton('Play Again');
      button.position(width/2 - 50, height/2 + 30);
      button.mousePressed(restart);
    }
  }
}

function keyPressed(){
  if(isDead) {
    return;
  }

  // Find the place that is active but not yet guessed
  let target = places.find(p => p.active && !p.guessed);
  if(!target) {
    return;
  }

  if(key === 'a' || key === 'A'){
    target.move("left");
  }
  else if(key === 'd' || key === 'D'){
    target.move("right");
  }
}


function Place(startActive = false){
  this.l = 50;
  this.x = width / 2;
  this.y = startActive ? height / 2 : this.l;
  this.v = 20;
  this.active = startActive;
  this.guessed = false;

  this.dir = random() < 0.5 ? "left" : "right";

  this.display = () => {
    rectMode(CENTER);
    noStroke();
    fill(30);
    rect(this.x, this.y, this.l, this.l);

    fill(50, 220, 160);

    if(this.dir === "left"){
      rect(this.x - 20, this.y, 10, this.l); 
    }
    else{
      rect(this.x + 20, this.y, 10, this.l);
    }
  };

  this.spawn = () => {
    if(this.y < height/2){
      this.y += this.v;
    }
    else {
      this.active = true;
    }
  };

  this.transform = (dir) => {
    if(dir === "left"){
      if(this.x > 75){
        this.x -= this.v/2;
      }
    }
    else {
      if(this.x < width - 75){
        this.x += this.v/2;
      }
    }
  };

  this.move = (dir) => {
    if(dir !== this.dir){
      isDead = true;
    }
    else {
      bar.f = 0;
      this.guessed = true;
      places.unshift(new Place());
      places.splice(2, 1);
      points++;
    }
  };
}


function Player(){
  this.d = 25;
  this.x = width / 2;
  this.y = height / 2;

  this.display = () =>{
    noStroke();
    fill(50, 220, 160);
    ellipse(this.x, this.y, this.d);
  };
}


function Bar(){
  this.x = width/2;
  this.y = 30;
  this.l = 200;
  this.f = 0;

  this.display = () => {
    strokeWeight(4);
    stroke(30);
    fill(220);
    rectMode(CENTER);
    rect(this.x, this.y, this.l, this.l/20);

    noStroke();
    fill(30);
    rectMode(CORNER);
    rect(this.x - this.l/2, this.y - this.l/40, this.f, this.l/20);
  };

  this.update = () => {
    if(this.f < this.l){
      this.f += 3.9;
    }
    else {
      isDead = true;
    }
  };
}


function restart(){
  points = 0;
  places = [];
  places.push(new Place(true));  // first place starts active
  bar.f = 0;
  isDead = false;

  if(button){
    button.remove();
    button = null;
  }

  loop();
}