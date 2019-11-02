let width = innerWidth;
let height = innerHeight;

let SCENE_W = 1600;
let SCENE_H = 800;
let oval;

function preload() {
    oval = loadImage('./Oval_Picture.png')
}
function setup() {
    createCanvas(width,height);
}

function draw() {
    image(oval,0,0);
    oval.width = width;
    oval.height = height;
    ellipse(50,50,50,50);
}