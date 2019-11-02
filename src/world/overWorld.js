var ghost;
var bg;
var frame;

let width = innerWidth;
let height = innerHeight;
//the scene is twice the size of the canvas
var SCENE_W = 1600;
var SCENE_H = 800;


function setup() {
  createCanvas(width, height);


  frame = loadImage('/src/world/Map-overview-min.png');
}

function draw() {
  background(255, 255, 255);


  //a camera is created automatically at the beginning

  //.5 zoom is zooming out (50% of the normal size)
  if(mouseIsPressed)
    camera.zoom = 0.5;
  else
    camera.zoom = 1;

  //set the camera position to the ghost position
  camera.position.x = ghost.position.x;
  camera.position.y = ghost.position.y;






  //I can turn on and off the camera at any point to restore
  //the normal drawing coordinates, the frame will be drawn at
  //the absolute 0,0 (try to see what happens if you don't turn it off
  camera.off();
  image(frame, 0, 0);
}