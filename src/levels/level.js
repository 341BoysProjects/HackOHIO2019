//canvas setup
let width = innerWidth/1.3;
let height = innerHeight/1.3;

//Level Setup
let levelJson;
let loots = [];
let lootImage;

//boundary setup
let boundaries = [];
let boundaryWidth = 20;

//Player setup
let player;
let pX = 100;
let pY = 100;
let pSpeed = 2;
let pAngle = 0.0;
let pSize = 35;
let pHealth = 100;
let pSpriteSheet;
let player_walk;
let player_stand;

//Bullets
let bullets;

//Enemies
let enemies = [];
let eBullets;

function readTextFile(file) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                var allText = rawFile.responseText;
                levelJson = JSON.parse(allText);
            }
        }
    }
    rawFile.send(null);
}

function booleanizeObject(obj) {
    var keys = Object.keys(obj);
    keys.forEach(function(key) {
      var value = obj[key];
      if (typeof value === 'string') {
        var lvalue = value.toLowerCase();
        if (lvalue.includes("width")) {
          obj[key] = width / 2;
        } else if (lvalue.includes("height")) {
          obj[key] = height;
        }
      } else if (typeof value === 'object') {
        booleanizeObject(obj[key]);
      }
    });
}

function preload() {
    player_walk = loadAnimation(new SpriteSheet('src/assets/characters/Player/walkingBanana.gif',
        [{'name':'player_walk', 'frame':{'x':0, 'y': 0, 'width': 62, 'height': 62}}]));
    player_stand = loadAnimation(new SpriteSheet('src/assets/characters/Player/standingBanana.png',
        [{'name':'player_stand', 'frame':{'x':0, 'y': 0, 'width': 62, 'height': 62}}]));
}

function setup() {
    createCanvas(width, height);
    background(255);
    
    readTextFile("src/levels/data/level1.json");

    booleanizeObject(levelJson);     
    pX = levelJson.level[0].player.location.x;
    pY = levelJson.level[0].player.location.y; 

    //Outside lines
    boundaries[0] = new boundary(0, 0, width, 0);
    boundaries[1] = new boundary(width, 0, width, height);
    boundaries[2] = new boundary(width, height, 0, height);
    boundaries[3] = new boundary(0, height, 0, 0);

    //Inside lines 
    for (i = 0; i < Object.keys(levelJson.level[0].boundaries.x1).length; i++) {
        boundaries[i+4] = new boundary(levelJson.level[0].boundaries.x1[(i).toString()], levelJson.level[0].boundaries.y1[(i).toString()], levelJson.level[0].boundaries.x2[(i).toString()], levelJson.level[0].boundaries.y2[(i).toString()]);
    }

    //Player
    player = createSprite(pX, pY, pSize, pSize);
    player.debug = true;
    player.addAnimation('walk', player_walk);
    player.addAnimation('stand', player_stand);


    //Enemies
    for (i = 0; i < Object.keys(levelJson.level[0].enemies.x).length; i++) {
        enemyImage = loadImage("src/assets/characters/Enemies/alienStanding.png");
        enemies[i] = new enemy(levelJson.level[0].enemies.x[(i).toString()], levelJson.level[0].enemies.y[(i).toString()], levelJson.level[0].enemies.difficulty[(i).toString()]);
        enemies[i].sprite.addImage(enemyImage);
    }

    //Loot Setup
    for (i = 0; i < Object.keys(levelJson.level[0].loot).length; i++) {
        lootImage = loadImage(levelJson.level[0].loot["loot" + (i+1).toString()].image);
        loots[i] = new loot(levelJson.level[0].loot["loot" + (i+1).toString()].x, levelJson.level[0].loot["loot" + (i+1).toString()].y, lootImage);
        loots[i].sprite.addImage(lootImage);
    }

    //Bullets
    bullets = new Group();
    eBullets = new Group();
}

function draw() {
    background(255);

    //Draw boundaries
    for (i = 0; i < boundaries.length; i++) {
        player.collide(boundaries[i].sprite);
        boundaries[i].sprite.shapeColor = color(0);
        boundaries[i].draw();
        boundaries[i].sprite.overlap(bullets, boundaryHit);
        boundaries[i].sprite.overlap(eBullets, eBoundaryHit);
    }

    //Draw enemies
    for (i = 0; i < enemies.length; i++) {
        player.collide(enemies[i].sprite);
        enemies[i].draw();
        let hit = enemies[i].sprite.overlap(bullets, enemyHit);
        if (hit) {
            enemies[i].hit();
        }
    }

    //Draw loots
    for (i = 0; i < loots.length; i++) {
        player.collide(loots[i].sprite);
        loots[i].sprite.shapeColor = color(100, 100, 100);
        loots[i].draw();

        let hit1 = loots[i].sprite.overlap(bullets, lootHit);
        let hit2 = loots[i].sprite.overlap(eBullets, lootHitE);
        
        
    }

    //Check bullet collisions w player
    player.overlap(eBullets, playerHit);
    

    //Movement of Player
    move();
    pAngle = atan2(mouseY - player.position.y, mouseX - player.position.x);
    player.rotation = pAngle * 180 / Math.PI;

    if (player.velocity.y != 0 || player.velocity.x != 0) {
        player.changeAnimation('walk');
    } else {
        player.changeAnimation('stand');
    }

    drawSprite(player);
    drawSprites(bullets);
    drawSprites(eBullets);
}

function mouseClicked() {
    var bullet = createSprite(player.position.x, player.position.y, 10, 10);
    bullet.setSpeed(20 + player.getSpeed(), player.rotation);
    bullet.life = 150;
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

function boundaryHit(boundary, bullet) {
    bullet.remove();
}

function eBoundaryHit(boundary, eBullet) {
    eBullet.remove();
}

function playerHit(player, eBullet) {
    eBullet.remove();
    pHealth -= 10;
}

function enemyHit(enemy, bullet) {  
    bullet.remove();
}

function lootHit(loot, bullet) {
    bullet.remove();
}

function lootHitE(loot, eBullet) {
    bullet.remove();
}

class boundary {
    constructor(x1, y1, x2, y2) {

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
        drawSprite(this.sprite);
    }

}

class enemy {
    constructor(x, y, diff) {
        this.x = x;
        this.y = y;
        this.diff = diff;
        this.health = 100;
        this.time = 1;
        this.sprite = createSprite(this.x, this.y, pSize, pSize);
    }

    draw() {
        //TODO: Remove enemies from array on death
        if (this.health > 0) {
            drawSprite(this.sprite);

            let eAngle = atan2(player.position.y - this.y, player.position.x - this.x);
            this.sprite.rotation = eAngle * 180 / Math.PI;
    
            if (this.time % 120 == 0) {
                let eBullet = createSprite(this.x, this.y, 10, 10);
                eBullet.setSpeed(10 * this.diff, this.sprite.rotation);
                eBullet.life = 150;
                eBullets.add(eBullet);
            }
            this.time++;
        }
    }

    hit() {
        this.health -= 10;
        if (this.health <= 0) {
            this.sprite.remove();
        }
    }
}

class loot {
    constructor(x, y, image) {
        this.x = x;
        this.y = y;
        this.image = image;
        this.sprite = createSprite(this.x, this.y, pSize, pSize);
    }

    draw() {
        drawSprite(this.sprite);
    }

    // //Event for when player captures the loot
    // capture() {

    // }
}