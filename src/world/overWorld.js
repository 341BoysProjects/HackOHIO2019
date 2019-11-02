let width = innerWidth;
let height = innerHeight;

var frame;

var SCENE_W = 6179;
var SCENE_H = 7997;


function setup() {
  createCanvas(width, height);

  nut = createSprite(width/2,height/2,50,50);

  frame = loadImage('Map-overview-min.png');
}

function draw() {
  background(255, 255, 255);

  nut.velocity.x = (camera.mouseX-nut.position.x)/20;
  nut.velocity.y = (camera.mouseY-nut.position.y)/20;

  camera.position.x = nut.position.x;
  camera.position.y = nut.position.y;

  //limit the ghost movements
  if(nut.position.x < 0)
    nut.position.x = 0;
  if(nut.position.y < 0)
    nut.position.y = 0;
  if(nut.position.x > SCENE_W)
    nut.position.x = SCENE_W;
  if(nut.position.y > SCENE_H)
    nut.position.y = SCENE_H;

  drawSprite(nut);

  //I can turn on and off the camera at any point to restore
  //the normal drawing coordinates, the frame will be drawn at
  //the absolute 0,0 (try to see what happens if you don't turn it off
  camera.off();
  image(frame, 0, 0);
}