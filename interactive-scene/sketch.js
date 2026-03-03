// "Put in order"
// Vadym Kolomiiets
// 03/03/2026
//
//Extra for Experts: Usage of HTML DOM elements, such as button,
//Extra for Experts: Advanced Array Logic(e.g places.unshift(new Place())),
//Extra for Experts: Game Loop control(noLoop and loop).


let player;

//Array holding Place objects (the falling squares the player must react to) 
let places = []; 
let bar;
let isDead = false;
let points = 0;
let button = null;

function setup(){
    createCanvas(500, 500);
    player = new Player();
    bar = new Bar();
    places.push(new Place());
}

function draw(){
    background(220);

    if(!isDead){

        //Timer Bar
        bar.display();
        bar.update();

        //Places
        for(let i = 0; i < places.length; i++){
            //Draws the squares
            places[i].display();

            //Animation of falling down
            if(!places[i].active){
                places[i].spawn();
            }
            else if(places[i].guessed){
                // Slide it sideways after a correct guess
                places[i].transform(places[i].dir);
            }
        }

        //Player displaying
        player.display();

        //Points
        textSize(18);
        fill(30);
        textAlign(LEFT);
        text(`Points : ${points}`, 20, 30);

        //Controls hint
        textSize(14);
        fill(80);
        textAlign(CENTER);
        text("A = Left   |   D = Right", width / 2, height - 15);

    } 

    //Game over Screen
    else {
        //Stops the draw loop
        noLoop();

        textAlign(CENTER);
        fill(30);
        textSize(40);
        text("Oops, you're dead!", width/2, height/2 - 40);

        textSize(30);
        text(`Points : ${points}`, width/2, height/2);

        // Creates only one button, so it doesn't duplicate
        if(button === null){
            button = createButton('Play Again');
            button.position(width/2 - 50, height/2 + 30);
            //Once pressed, restarts the game
            button.mousePressed(restart);
        }
    }
}

// Keyboard input, listens for A (left) or D (right) key presses
function keyPressed(){
    if(!isDead && places[0].active){
        // A key = left, D key = right
        if(key === 'a' || key === 'A'){
            places[0].move("left");
        }
        else if(key === 'd' || key === 'D'){
            places[0].move("right");
        }
    }
}


//Creates the falling square with indicator of direction. 
//Player must match direction before time runs out
function Place(){
    //Side length
    this.l = 50;

    //Starting position x
    this.x = width / 2;

    //Starting position y
    this.y = this.l;

    //Speed of square falling
    this.v = 20;

    //Checking if square finished falling
    this.active = false;

    //Checking the answer given by player
    this.guessed = false;

    //Randomly select the direction for the square
    this.dir = random() < 0.5 ? "left" : "right";


    //Draws square and its direction
    this.display = () => {
        rectMode(CENTER);
        noStroke();
        fill(30);
        rect(this.x, this.y, this.l, this.l);

        fill(204, 0, 102);

        //Places indicator on the left or right side
        if(this.dir === "left"){
           rect(this.x - 20, this.y, 10, this.l); 
        }
        else{
           rect(this.x + 20, this.y, 10, this.l);
        }
    }

    //Animates the square falling down
    this.spawn = () => {
        if(this.y < height/2){
            this.y += this.v;
        } else {
            this.active = true;
        }
    }

    //Sliding the square after correct guess
    this.transform = (dir) => {
        if(dir === "left"){
            if(this.x > 75){
                this.x -= this.v/2;
            }
        } else {
            if(this.x < width - 75){
                this.x += this.v/2;
            }
        }
    }

    //Is called only when the player presses a direction button
    //Either call the function to add points, reset timer and spawn a new Place, or game over
    this.move = (dir) => {
        if(dir !== this.dir){
            isDead = true;
        } else {
            bar.f = 0;
            this.guessed = true;
            places.unshift(new Place());
            places.splice(2, 1);
            points++;
        }
    }
}


//Creates the player. Doesn't do anything, just visual design
function Player(){
    this.d = 25;
    this.x = width / 2;
    this.y = height / 2;

    this.display = () =>{
        noStroke();
        fill(51, 255, 255);
        ellipse(this.x, this.y, this.d);
    }
}


//A timer that fills up at the top. Once filled, game is over.
function Bar(){
    this.x = width/2;
    this.y = 30;
    this.l = 200;

    //Current fill amount, which increses each frame
    this.f = 0;

    //Draws the bar outline and filling level
    this.display = () => {
        strokeWeight(4);
        stroke(30);
        fill(220);
        rectMode(CENTER);
        rect(this.x, this.y, this.l, this.l/20);

        noStroke();
        fill(204, 0, 0);
        rectMode(CORNER);
        rect(this.x - this.l/2, this.y - this.l/40, this.f, this.l/20);
    }

    //Increses the fill each frame and gives a game over
    this.update = () => {
        if(this.f < this.l){
            this.f += 3.2;
        } else {
            isDead = true;
        }
    }
}

//Restart the game
function restart(){
    points = 0;
    places = [];
    places.push(new Place());
    bar.f = 0;
    isDead = false;

    //Removes the button
    if(button){
        button.remove();
        button = null;
    }

    //Restarts draw loop
    loop();
}
