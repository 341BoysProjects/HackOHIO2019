let width = innerWidth;
let height = innerHeight;

let SCENE_W = 1600;
let SCENE_H = 800;
let oval;
xPos = width/2;
yPos = height/2;

function preload() {
    oval = image('./Oval_Picture.png')
}
function setup() {
    createCanvas(width,height);

}

function draw() {
    background(oval);
    ellipse(xPos,yPos,50,50);
    x=+1;
    y+=1;
}