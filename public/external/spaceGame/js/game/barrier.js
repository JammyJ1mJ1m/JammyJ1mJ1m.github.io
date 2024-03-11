class Barrier {
    constructor(pPosition) {
        this.mPosition = pPosition;

        this.mScale = 15;
        this.mPieces = [];
        this.setupPieces();
    }

    GetPieces()
    {return this.mPieces;}

    setupPieces() {
        let row = 3;
        let column = 5;

      
        
        this.mRootPosition = this.mPosition;
        
        let offsetX = this.mScale ;
        let offsetY = this.mScale ;
        
        
        let xPos = this.mRootPosition.getX() + 40;
        let yPos = this.mRootPosition.getY() + 50;
        for (let y = 0; y < row; y++) {
            for (let x = 0; x < column; x++) {
                let barrier = new BarrierPiece(new Vector(xPos + offsetX, yPos + offsetY), this.mScale);
                
                this.mPieces.push(barrier);
                xPos += offsetX;

            }
            yPos += offsetY;
            xPos = this.mRootPosition.getX() + 40;

        }
    }

    GetRadius() { return this.mHitRadius; }

    getPosition() {
        return this.mPosition;
    }

    setPosition(pPosition) {
        this.mPosition = pPosition;
    }






    setScale(pScale) {
        this.mScale = pScale;
    }
    getScale() {
        return this.mScale;
    }

    getCenteredPos() {
        return new Vector(this.getPosition().getX() - this.getScale() / 2, this.getPosition().getY() - this.getScale() / 2);
    }





    Draw(layout) {
        this.mPieces.forEach(element => {
            element.Draw(layout);
        });
        //layout.drawImage(this.img, this.getCenteredPos().getX(), this.getCenteredPos().getY(), this.getScale(), this.getScale());
    }
}