let width = innerWidth;
let height = innerHeight;

let SCENE_W = 1600;
let SCENE_H = 800;
let oval;
let x = width/2;
let y = height/2;

function preload() {
    oval = loadImage('Oval_Picture.png')
}
function setup() {
    createCanvas(width,height);

}

function draw() {
    background(oval);
    ellipse(x,y,50,50);
    x+=1;
    y+=1;
}