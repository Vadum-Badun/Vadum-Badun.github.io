// Ball Collision

class Ball{
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.radius = random(15,30);
    this.dx = random(-5,5);
    this.dy = random(-5,5);
    this.r = random(255);
    this.g = random(255);
    this.b = random(255);
  }
  display(){
    fill(this.r, this.g, this.b);
    circle(this.x, this.y, this.radius*2);
    noStroke();
  }

  move(){
    this.x += this.dx;
    this.y += this.dy;

    //check top/bottom for bounce
    if(this.y - this.radius < 0 || this.y + this.radius > height){
      this.dy *= -1;
    }

    //check sides
    if(this.x - this.radius < 0 || this.x + this.radius > width){
      this.dx *= -1;
    }

  }

  bounceOff(otherBall){
    let radiiSum = this.radius + otherBall.radius;
    let distanceApart = dist(this.x, this.y, otherBall.x, otherBall.y);
    if(radiiSum > distanceApart){
      //hitting each other 
      let tempX = this.dx;
      let tempY = this.dy;

      this.dy = otherBall.dy;
      this.dx = otherBall.dx;

      otherBall.dx = tempX;
      otherBall.dy = tempY;
    }
  }
}

let ballArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);

  for(let ball of ballArray){
    ball.move();
    for(let otherBall of ballArray){
      //avoid hitting itself
      if(ball !== otherBall){
        ball.bounceOff(otherBall);
      }
      
    }
    ball.display();
   
  }
}

function mousePressed(){
  let theBall = new Ball(mouseX, mouseY);
  ballArray.push(theBall);
}
