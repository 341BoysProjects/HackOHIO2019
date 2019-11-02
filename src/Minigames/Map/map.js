let width = innerWidth;
let height = innerHeight;

// For loading map image
let frame;

// Player character
let nut;

// Dimensions of 

function preload(){

    
}



function setup(){
    createCanvas(width, height);
    frame = loadImage("./Map-overview.png");
    
}


function draw(){

    if(frame!=null){
        console.log("Loaded correctly.");
        Image(frame,0,0);
    }else{
        console.log("Didn't load correctly.");
    }
    
}