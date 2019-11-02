var positionX;
let court;
var xSpeed;
var positionY;
var ySpeed;
var h = window.innerHeight;
var w = window.innerWidth;
var score = 0;

function preload() {
  // preload() runs once
  court = loadImage('court.jpg');
  court.resize(1000, 477);
}

function setup() { 
  
  positionX = random(w);
    positionY = random(h);
    createCanvas(1000, 477);
  xSpeed = 2;
	ySpeed = 3;
} 

function draw() { 
  background(court);
  
  // When the ball passes either side of the canvas, TURNAROUND
  if(positionX > width || positionX < 0) { 
    xSpeed = xSpeed * -1; 
  }
    
  if(positionY < 0) { 
    ySpeed = ySpeed * -1; 
  }

  if((positionY>(h-35)&&positionY<h-25)&&(positionX>mouseX&&positionX<mouseX+60)){
    ySpeed = ySpeed * -1.15;
    xSpeed = xSpeed*1.15;
    score = score+1;

  }

  if((positionY<h&&positionY>h-32)&&((positionX>mouseX&&positionX<mouseX+2)||positionX>mouseX+58&&positionX<mouseX+60)){
    xSpeed = xSpeed * -1; 

  }

  // if(ySpeed>0&&(positionY<h-15&&positionY>h-100)){
  //   background('green');
  // }

  // if(positionY>h){
  //   background('red');
  // }
 positionX = positionX + xSpeed;  
 positionY = positionY - ySpeed;
  ellipse(positionX, positionY, 10, 10);
  rect(0,mouseY,30,60);
  // text(score.toString(10),mouseX+27,h-25,60,30);
}