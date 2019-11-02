let width = innerWidth;
let height = innerHeight;

let SCENE_W = 1600;
let SCENE_H = 800;
let oval;
let xPos = width/2;
let yPos = height/2;

function preload() {
    oval = loadImage('Oval_Picture.png')
}
function setup() {
    createCanvas(width,height);
}

function draw() {
    background(oval);
    ellipse(xPos,yPos,50,50);
    xPos+=1;
    yPos+=1;
}