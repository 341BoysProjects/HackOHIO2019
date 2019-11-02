let bg;
let y = 0;
let width = innerWidth;
let height = innerHeight;

function setup() {
  // The background image must be the same size as the parameters
  // into the createCanvas() method. In this program, the size of
  // the image is 720x400 pixels.
  bg = loadImage('/src/world/Map-overview.png');
  createCanvas(width, height);
}

function draw() {
  background(bg);

}
