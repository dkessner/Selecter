//
// pick.js
//


let selecter;
let segment;

let cat;
let catPosition;
let catPositionPrevious;
let catVelocity;


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
    catPosition = selecter.targets[1].position;
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

    image(cat, catPosition.x-39, catPosition.y+25);

    selecter.displayTargets();
    segment.display();

    if (catVelocity)
    {
        catPosition.add(catVelocity);
        catVelocity.mult(.9);

        // wrap
        while (catPosition.x<0) catPosition.x+=width;
        while (catPosition.x>width) catPosition.x-=width;
        while (catPosition.y<0) catPosition.y+=height;
        while (catPosition.y>height) catPosition.y-=height;
    }
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

    if (selecter.selectedTarget === selecter.targets[1])
    {
        catPositionPrevious = catPosition.copy();
    }
} 


function mouseDragged()
{
    selecter.dragSelectedTarget();

    if (selecter.selectedTarget === selecter.targets[1])
    {
        let d = dist(mouseX, mouseY, pmouseX, pmouseY);

        if (d < 5)
        {
            // if user pauses during drag, reset initial position
            // for velocity calculation
            catPositionPrevious = catPosition.copy();
        }
    }
}


function mouseReleased() 
{
    if (selecter.selectedTarget === selecter.targets[1])
    {
        catVelocity = catPosition.copy();
        catVelocity.sub(catPositionPrevious);
        if (catVelocity.mag() < .5)
            catVelocity.setMag(0);

        catVelocity.mult(10);
        if (catVelocity.mag() > 30)
            catVelocity.setMag(30);
    }
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

