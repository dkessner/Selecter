//
// Selecter.js
//


class Selecter
{
    constructor()
    {
        this.targets = [];
        this.selectedTarget = null;
    }

    displayTargets()
    {
        for (let t of this.targets)
            t.display(t === this.selectedTarget);
    }

    selectBestTarget()
    {
        let minDistance = width;
        let minTarget = null;

        for (let t of this.targets)
        {
            let d = dist(t.position.x, t.position.y, mouseX, mouseY);
            if (d < t.radius && d < minDistance)
            {
                minDistance = d;
                minTarget = t;
            }
        }

        this.selectedTarget = minTarget;
    }

    dragSelectedTarget()
    {
        if (this.selectedTarget)
        {
            this.selectedTarget.position.x = mouseX;
            this.selectedTarget.position.y = mouseY;
            this.selectedTarget.constrain();
        }
    }
}


class Target
{
    constructor(x, y, radius = 50) 
    {
        this.position = createVector(x, y);
        this.radius = radius;
        this.colorFill = color(128);
        this.colorStroke = this.colorFill;
        this.colorFillSelected = this.colorFill;
        this.colorStrokeSelected = color(0, 255, 0);
    }

    display(isSelected) 
    {
        stroke(isSelected ? this.colorStrokeSelected : this.colorStroke);
        strokeWeight(isSelected ? 3 : 0);
        fill(isSelected ? this.colorFillSelected : this.colorFill);

        ellipse(this.position.x, this.position.y, this.radius, this.radius);
    }

    constrain(){}

    constrainCircle(center, radius)
    {
        this.position.sub(center);
        this.position.setMag(radius);
        this.position.add(center);
    }
}



