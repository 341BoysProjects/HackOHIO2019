//canvas setup
let width = innerWidth/1.3;
let height = innerHeight/1.3;

//boundary setup
let boundaries = [];
let boundaryWidth = 20;

//Player setup
let player;
let pX = 100;
let pY = 100;
let pSpeed = 2;
let pAngle = 0.0;

//Bullets
let bullets;

//Enemies
let enemies;

function setup() {
    createCanvas(width, height);
    background(255);
    
    //Outside lines
    boundaries[0] = new boundary(0, 0, width, 0);
    boundaries[1] = new boundary(width, 0, width, height);
    boundaries[2] = new boundary(width, height, 0, height);
    boundaries[3] = new boundary(0, height, 0, 0);

    //Inside lines
    boundaries[4] = new boundary(width/2, 0, width/2, height/3);
    boundaries[5] = new boundary(width/2, height*2/3, width/2, height);
    boundaries[6] = new boundary(width*2/3, height/3, width*2/3, height*2/3);

    //Player
    player = createSprite(pX, pY, 35, 35);

    //Bullets
    bullets = new Group();

    //Enemies
    enemies = new Group();
}

function draw() {
    background(255);
    for (i = 0; i < boundaries.length; i++) {
        player.collide(boundaries[i].sprite);
        boundaries[i].sprite.shapeColor = color(0);
        boundaries[i].sprite.debug = true;
        boundaries[i].draw();
    }

    enemies.overlap(bullets, enemyHit);
    player.debug = true;
    move();
    pAngle = atan2(mouseY - player.position.y, mouseX - player.position.x);
    player.rotation = pAngle * 180 / Math.PI;
    drawSprite(player);

    drawSprites(bullets);
}

function mouseClicked() {
    var bullet = createSprite(player.position.x, player.position.y, 10, 10);
    bullet.setSpeed(10 + player.getSpeed(), player.rotation);
    bullet.life = 30;
    bullets.add(bullet);
}

function move() {
    if (keyIsDown(87)) { //W
        player.velocity.y = -1 * pSpeed;
    } else if (keyIsDown(83)) { //S
        player.velocity.y = pSpeed;
    } else {
        player.velocity.y = 0;
    }
    if (keyIsDown(65)) { //A
        player.velocity.x = -1 * pSpeed;
    } else if (keyIsDown(68)) { //D
        player.velocity.x = pSpeed;
    } else {
        player.velocity.x = 0;
    }    
}

function enemyHit(enemy, bullet) {  
    for(var i=0; i<10; i++) {
      var p = createSprite(bullet.position.x, bullet.position.y);
      p.addImage(particles);
      p.setSpeed(random(3, 5), random(360));
      p.friction = 0.95;
      p.life = 15;
    }
  
    bullet.remove();
    enemy.remove();
  }

class boundary{
    constructor(x1, y1, x2, y2){

        // Location variables
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;


        // Sprite var to instantiate sprite object
        this.sprite;

        // Set offsets for x and y
        this.xOff;
        this.yOff;

        if(this.x1<this.x2){
            this.xOff = this.x1;
        }else{
            this.xOff = this.x2;
        }

        if(this.y1<this.y2){
            this.yOff = this.y1;
        }else{
            this.yOff = this.y2;
        }
        
        // If line is vertical, else if line is horizontal
        this.isVertical = (this.x2-this.x1 == 0);

        if (this.isVertical) {
            this.sprite = createSprite(this.x1, this.yOff + (Math.abs(this.y2-this.y1) / 2), boundaryWidth, Math.abs(this.y2-this.y1));
        } else {
            this.sprite = createSprite(this.xOff + (Math.abs(this.x2-this.x1) / 2), this.y1, Math.abs(this.x2-this.x1), boundaryWidth);
        }

    }

    draw() {
        //line(this.x1, this.y1, this.x2, this.y2);
        //this.sprite.visible = false;
        drawSprite(this.sprite);
    }

}