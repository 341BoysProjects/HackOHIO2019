let width = innerWidth;
let height = innerHeight;


let frame;
let SCENE_W = 1600;
let SCENE_H = 800;
let img;

function preload() {
    img = loadImage('./Oval_Picture.png')
}
function setup() {
    createCanvas(width,height);
    frame = loadImage('./Oval_Picture.png');
}

function draw() {
    ellipse(50,50,50,50);
    console.log('draw');
    image(frame,0,0);
}