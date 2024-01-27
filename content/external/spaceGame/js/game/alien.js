class Alien
{
    constructor(pPosition)
    {
        this.mPosition = pPosition;
        this.mScale = 50;
        this.mVelocity = new Vector(0,0);

        this.img = new Image();

            this.img.src = "assets/Alien_1.png";
    }

    getPosition() {
        return this.mPosition;
    }

    setPosition(pPosition) {
        this.mPosition = pPosition;
    }

    resetPosition() {
        this.mPosition = this.mOriginalPosition;
    }

    getVelocity() {
        return this.mVelocity;
    }

    setVelocity(pVelocity) {
        this.mVelocity = pVelocity;
    }

    setScale(pScale) {
        this.mScale = pScale;
    }
    getScale() {
        return this.mScale;
    }

    getCenteredPos()
    {
        return new Vector( this.getPosition().getX() - this.getScale() / 2, this.getPosition().getY() - this.getScale() / 2);
    }
    Draw(layout)
    {
        layout.drawImage(this.img, this.getCenteredPos().getX(), this.getCenteredPos().getY(), this.getScale(), this.getScale());

    }
}
