let width = innerWidth/2;
let height = innerHeight/2;
let boundaries = [];

function setup() {
    createCanvas(width, height);
    background(255);
    strokeWeight(10);
    boundaries[0] = new boundary(0, 0, width, 0);
    boundaries[1] = new boundary(width, 0, width, height);
    boundaries[2] = new boundary(width, height, 0, height);
    boundaries[3] = new boundary(0, height, 0, 0);
}

function draw() {
    for (i = 0; i < boundaries.length; i++) {
        boundaries[i].draw();
    }
}

class boundary{
    constructor(x1, y1, x2, y2){
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.isVertical = (x2-x1 == 0);
        this.sprite;

        if (isVertical) {
            this.sprite = createSprite(x1, Math.abs(y2-y1) / 2, 5, Math.abs(y2-y1));
        } else {
            this.sprite = createSprite(x1, Math.abs(y2-y1) / 2, 5, Math.abs(y2-y1));
        }


    }

    draw() {
        line(this.x1, this.y1, this.x2, this.y2);
    }

}