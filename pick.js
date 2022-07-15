//
// pick.js
//


let selecter;
let segment;


function setup()
{
    createCanvas(400, 400);

    selecter = new Selecter();

    for (let i=0; i<5; i++)
        selecter.targets.push(new Target(random(0, width), random(0, height)));

    for (let i=0; i<5; i++)
    {   
        let t = new Target(random(0, width), random(0, height));
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
    background(0);

    // constraint circle
    stroke(128);
    strokeWeight(2);
    noFill();
    ellipse(200, 200, 200, 200);

    selecter.displayTargets();

    segment.display();
}


function mouseMoved()
{
    selecter.selectBestTarget();
}



// function mousePressed() {} 


function mouseDragged()
{
    selecter.dragSelectedTarget();
}

// function mouseReleased() {}



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



document.addEventListener('onmousedown', event => event.preventDefault());

