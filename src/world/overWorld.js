let width = innerWidth;
let height = innerHeight;

var frame;

var SCENE_W = width*2;
var SCENE_H = height*2;

function preload() {
  world = loadImage('/src/world/Map-overview-min.png')
}

function setup() {
  createCanvas(width, height);

  nut = createSprite(width/2,height/2,50,50);
  nut.addAnimation('forward','/src/world/nut001.png');


  bg = new Group();

  for(var i=0; i<80; i++)
  {
    //create a sprite and add the 3 animations
    var rock = createSprite(random(-width, SCENE_W+width), random(-height, SCENE_H+height));
    //cycles through rocks 0 1 2
    rock.addAnimation('normal', '/src/world/nut001.png');
    bg.add(rock);
  }

}

function draw() {
  background(255,255,255);
  image(world, width/2-nut.position.x, height/2+nut.position.y);

  if (mouseIsPressed) {
    camera.zoom = .5;
  } else {
    camera.zoom = 1;
  }

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
  drawSprites(bg);

  //I can turn on and off the camera at any point to restore
  //the normal drawing coordinates, the frame will be drawn at
  //the absolute 0,0 (try to see what happens if you don't turn it off
  camera.off();
  
}