//
// pick.js
//


let selecter;
let segment;


function setup()
{
    createCanvas(600, 600);
    resizeCanvas(windowWidth, windowHeight);
    initialize();
}


function initialize()
{
    selecter = new Selecter();

    for (let i=0; i<5; i++)
        selecter.targets.push(new Target(random(100, width-100), random(100, height-100)));

    for (let i=0; i<5; i++)
    {   
        let t = new Target(random(100, width-100), random(100, height-100));
        t.colorFill = t.colorFillSelected = color(0, 0, 128);
        t.constrain = () => t.constrainCircle(createVector(200, 200), 100);
        t.constrain();
        selecter.targets.push(t);
    }

    segment = new Segment(selecter.targets[0], selecter.targets[5]);
    selecter.targets[0].colorFill = color(255, 0, 0);
    selecter.targets[5].colorFill = color(0, 0, 255);
}


function draw()
{
    if (width !== windowWidth || height !== windowHeight)
    {
        // full screen hack:  fullscreen() seems to be async,
        // with windowWidth/Height not set immediately;
        // this forces a canvas resize and re-initialization
        resizeCanvas(windowWidth, windowHeight);
        initialize();
    }

    background(0);

    // constraint circle
    stroke(128, 128, 0);
    strokeWeight(2);
    noFill();
    ellipse(200, 200, 200, 200);

    selecter.displayTargets();

    segment.display();

    fill(255);
    stroke(0);
    rect(0, 0, 130, 50);
    fill(0);
    textSize(24);
    text("full screen", 10, 30);
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

