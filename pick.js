//
// pick.js
//


let selecter;
let segment;
let cat;


function preload()
{
    cat = loadImage("cat.png");
}


function setup()
{
    createCanvas(600, 600);
    resizeCanvas(windowWidth, windowHeight);
    initialize();
    cat.resize(100, 100);
}


function initialize()
{
    selecter = new Selecter();

    for (let i=0; i<5; i++)
        selecter.targets.push(new Target(random(100, width-100), random(100, height-100)));

    for (let i=0; i<5; i++)
    {   
        let t = new Target(random(100, width-100), random(100, height-100));
        t.constrain = () => t.constrainCircle(createVector(200, 200), 100);
        t.constrain();
        selecter.targets.push(t);
    }

    segment = new Segment(selecter.targets[0], selecter.targets[5]);
}


function windowResized()
{
    // mobile
    resizeCanvas(windowWidth, windowHeight);
    initialize();
}


function draw()
{
    background(200);

    // constraint circle
    stroke(0, 0, 128);
    strokeWeight(2);
    noFill();
    ellipse(200, 200, 200, 200);


    // full screen button
    fill(255);
    stroke(0);
    rect(0, 0, 130, 50);
    fill(0);
    textSize(24);
    text("full screen", 10, 30);

    let position = selecter.targets[1].position;
    image(cat, position.x-39, position.y+25);

    selecter.displayTargets();
    segment.display();
}


function mouseMoved()
{
    selecter.selectBestTarget();
}


function mousePressed() 
{
    selecter.selectBestTarget();

    // full screen button pressed

    if (0<mouseX && mouseX<130 && 0<mouseY && mouseY<50)
    {
        let fs = fullscreen();
        fullscreen(!fs);
    }
} 


function mouseDragged()
{
    selecter.dragSelectedTarget();
}

function mouseReleased() 
{
}



class Segment
{
    constructor(begin, end) 
    {
        this.begin = begin;
        this.end = end;
    }

    display()
    {
        stroke(255, 255, 0);
        strokeWeight(2);
        line(this.begin.position.x, this.begin.position.y, 
             this.end.position.x, this.end.position.y);
    }
}


/*
document.addEventListener('mousedown', event => event.preventDefault());
document.addEventListener('mousemove', event => event.preventDefault());
document.addEventListener('mouseup', event => event.preventDefault());
*/

