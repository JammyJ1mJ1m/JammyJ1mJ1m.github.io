class BarrierPiece {
    constructor(pPosition, pScale) {
        this.mPosition = pPosition;
        this.mHitRadius = pScale / 2;
        this.mScale = pScale;
        this.mIsDead = false;

        this.img = new Image();

        this.img.src = "assets/barrierPiece.png";
        this.mLife = 4;

        // this offset is used in the spritesheet
        this.mImageOffset = 60;

    }

    GetRadius() { return this.mHitRadius; }

    getPosition() {
        return this.mPosition;
    }

    setPosition(pPosition) {
        this.mPosition = pPosition;
    }

    TakeLife() {
        this.mImageOffset -= 20;
        this.mLife--;
        if(this.mLife == 0)
        {
                 this.KillPiece();
        }
        
        
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

    DrawRadius() {
        const canvas = document.getElementById("canvas");
        if (canvas.getContext) {
            const ctx = canvas.getContext("2d");

            ctx.strokeStyle = '#ff0000';
            ctx.beginPath();
            ctx.arc(this.getPosition().getX(), this.getPosition().getY(), this.GetRadius(), 0, Math.PI * 2, true); // Outer circle
            ctx.stroke();
        }
    }

    GetIsDead() {
        return this.mIsDead;
    }

    KillPiece() {
        this.mIsDead = true;
    }

    drawimage(layout, offset) {
        var sourceX = 0;       // X-coordinate of the top-left corner of the source image
        var sourceY = offset;       // Y-coordinate of the top-left corner of the source image
        var sourceWidth = 20;   // Width of the clipped image (adjust to 20 for your case)
        var sourceHeight = 20;  // Height of the clipped image (adjust to 20 for your case)

        var destX = this.getCenteredPos().getX();        // X-coordinate on the canvas to draw the image
        var destY = this.getCenteredPos().getY();        // Y-coordinate on the canvas to draw the image
        var destWidth = this.mScale;     // Width of the drawn image on the canvas
        var destHeight = this.mScale;    // Height of the drawn image on the canvas

        layout.drawImage(this.img, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);

    }

    Draw(layout) {
        if (!this.GetIsDead()) {

            //layout.drawImage(this.img, this.getCenteredPos().getX(), this.getCenteredPos().getY(), this.getScale(), this.getScale());
            this.drawimage(layout,  this.mImageOffset);
            //this.DrawRadius();
        }
    }
}