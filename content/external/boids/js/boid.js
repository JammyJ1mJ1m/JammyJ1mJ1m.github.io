class Boid
{
    // vector position and velocity
    constructor(pPos, pVelocity, pSettings)
    {
        this.mPosition = pPos;
        this.mVelocity = pVelocity;
        this.mSettings = pSettings;
        this.mBoidsInView;
    }

    GetPosition() { return this.mPosition; }
    SetPosition(pPos) {this.mPosition = pPos}
    GetVelocity() { return this.mVelocity; }
    SetVelocity(pVelocity) {this.mPosition = pVelocity}

    UpdateBoid(pBoids,dt)
    {
        // // find the neighboring boids
        // this.mBoidsInView = this.FindBoidsInView(pBoids);

        // let newVelocity = new Vector(0,0,0);

        // let SeperationVelocity = this.Seperation();
        // let AlignmentVelocity = this.Alignment();
        // let CohesionVecloty = this.Cohesion();

        // newVelocity += SeperationVelocity + AlignmentVelocity + CohesionVecloty;
        // this.mVelocity = newVelocity;
        this.UpdatePosition(dt);
    }

    Seperation()
    {
        // check if current boid is too close to another boid
        // if so, move away from that boid

        let newVelocity = new Vector(0,0,0);

        for (let i = 0; i < this.mBoidsInView.length; i++)
        {
            let distance = this.mPosition.distance(this.mBoidsInView[i].GetPosition());
            if (distance < this.mSettings.mSeperationDistance)
            {
                let moveAway = this.mPosition.subtract(this.mBoidsInView[i].GetPosition());
                newVelocity += moveAway;
            }
        }
    }
    Alignment()
    {  

    }

    Cohesion()
    {

    }

    FindBoidsInView(pBoids)
    {

    }

    ClampVelocity()
    {

    }

    UpdatePosition(dt)
    {
        let t = this.mVelocity.multiply(dt);
        let newPos = this.mPosition.add(t);
        this.mPosition = newPos;
    }


    canvasDrawEnd() { 
        this.getContext().closePath();
        this.getContext().fill();
        this.getContext().stroke();
    }

    drawPolygon(pPolygon) {
        this.canvasDrawStart(pPolygon);

        this.getContext().moveTo(pPolygon.getIndex(0).getX(), pPolygon.getIndex(0).getY());

        for (let i = 1; i < pPolygon.getMVectorsLength(); i++) {
            this.getContext().lineTo(pPolygon.getIndex(i).getX(), pPolygon.getIndex(i).getY());
        }

        this.canvasDrawEnd();
    }


    DrawBoid(pContext)
    {
        // draw a square on the pContext
        let pos = this.GetPosition();
        let offset = 150;
        let scale = 1;
        offset *= scale;

        // pContext.beginPath();
        //  pContext.moveTo(pos.getX(), pos.getY());
        

        pContext.strokeStyle = "blue";
        // top left
        pContext.lineTo(pos.getX() - offset, pos.getY() + offset);


        // // top right
         pContext.lineTo(pos.getX() + offset, pos.getY() + offset);
        // // bottom right
        // pContext.lineTo(pos.getX() + offset, pos.getY() - offset);
        // // bottom left
        // pContext.lineTo(pos.getX() - offset, pos.getY() - offset);

        pContext.closePath();
        pContext.fill();
        pContext.stroke();
        // pContext.strokeStyle = "blue";
        // pContext.lineWidth = 5;
        // pContext.strokeRect(pos.getX(),pos.getY(), 100,100);

    }
}