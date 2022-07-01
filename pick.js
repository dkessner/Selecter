//
// pick.js
//


let targets;
let selectedTarget;

let segment;


function setup()
{
    createCanvas(400, 400);
    targets = [];
    selectedTarget = null;

    for (let i=0; i<5; i++)
        targets.push(new Target(random(0, width), random(0, height)));

    for (let i=0; i<5; i++)
    {   
        let t = new Target(random(0, width), random(0, height));
        t.c = color(0, 0, 128);
        t.constrain = () => t.constrainCircle(createVector(200, 200), 100);
        t.constrain();
        targets.push(t);
    }

    segment = new Segment(targets[0], targets[5]);
    targets[0].c = color(255, 0, 0);
    targets[5].c = color(0, 0, 255);
}


function draw()
{
    background(0);

    stroke(128);
    strokeWeight(1);
    noFill();
    ellipse(200, 200, 200, 200);

    for (let t of targets)
        t.display(t === selectedTarget);

    segment.display();
}


function mouseMoved()
{
    selectedTarget = selectBestTarget();
}


function selectBestTarget()
{
    let minDistance = width;
    let minTarget = null;

    for (let t of targets)
    {
        let d = dist(t.position.x, t.position.y, mouseX, mouseY);
        if (d < t.r && d < minDistance)
        {
            minDistance = d;
            minTarget = t;
        }
    }

    return minTarget;
}


// function mousePressed() {} 


function mouseDragged()
{
    if (selectedTarget)
    {
        selectedTarget.position.x = mouseX;
        selectedTarget.position.y = mouseY;
        selectedTarget.constrain();
    }
}

// function mouseReleased() {}


class Target
{
    constructor(x, y) 
    {
        this.position = createVector(x, y);
        this.r = 25;
        this.c = color(255);
    }

    display(selected) 
    {
        if (selected)
        {
            stroke(0, 255, 0);
            strokeWeight(5);
        }
        else
        {
            noStroke();
        }

        fill(this.c);
        ellipse(this.position.x, this.position.y, this.r, this.r);
    }

    constrain(){}

    constrainCircle(center, radius)
    {
        this.position.sub(center);
        this.position.setMag(radius);
        this.position.add(center);
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



