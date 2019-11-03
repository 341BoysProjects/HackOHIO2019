//canvas setup
let width = innerWidth/2;
let height = innerHeight/2;

//boundary setup
let boundaries = [];
let boundaryWidth = 20;

//Player setup
let player;
let pX = 100;
let pY = 100;
let pSpeed = 5;
let pAngle = 0.0;

//Bullets
let bullets;

function setup() {
    createCanvas(width, height);
    background(255);
    
    //Outside lines
    boundaries[0] = new boundary(0, 0, width, 0);
    boundaries[1] = new boundary(width, 0, width, height);
    boundaries[2] = new boundary(width, height, 0, height);
    boundaries[3] = new boundary(0, height, 0, 0);

    //Player
    player = createSprite(pX, pY, 50, 50);

    //Bullets
    bullets = new Group();
}

function draw() {
    background(255);
    for (i = 0; i < boundaries.length; i++) {
        player.collide(boundaries[i].sprite);
        boundaries[i].draw();
    }

    // enemies.overlap(bullets, enemyHit);

    move();
    pAngle = atan2(mouseY - player.position.y, mouseX - player.position.x);
    player.rotation = pAngle * 180 / Math.PI;
    drawSprite(player);

    if (mouseIsPressed) {
        var bullet = createSprite(player.position.x, player.position.y, 30, 30);
        bullet.setSpeed(10+player.getSpeed(), player.rotation);
        bullet.life = 30;
        bullets.add(bullet);
    } else {

    }
    drawSprites(bullets);
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
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.isVertical = (x2-x1 == 0);
        this.sprite;

        if (this.isVertical) {
            this.sprite = createSprite(x1, Math.abs(y2-y1) / 2, boundaryWidth, Math.abs(y2-y1));
        } else {
            this.sprite = createSprite(Math.abs(x2-x1) / 2, y1, Math.abs(x2-x1), boundaryWidth);
        }


    }

    draw() {
        //line(this.x1, this.y1, this.x2, this.y2);
        //this.sprite.visible = false;
        drawSprite(this.sprite);
    }

}