class Alien {
    constructor(pPosition, pIndex) {
        this.mPosition = pPosition;
        this.mScale = 50;
        this.mVelocity = new Vector(0, 0);

        this.img = new Image();

        switch (pIndex) {
            case 0:
                this.img.src = "assets/Alien_1.png";
                break;
            case 1:
                this.img.src = "assets/Alien_2.png";
                break;
            case 2:
                this.img.src = "assets/Alien_3.png";
                break;
            default:
                this.img.src = "assets/Alien_3.png";
                break;
        }

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

    getCenteredPos() {
        return new Vector(this.getPosition().getX() - this.getScale() / 2, this.getPosition().getY() - this.getScale() / 2);
    }
    Draw(layout) {
        layout.drawImage(this.img, this.getCenteredPos().getX(), this.getCenteredPos().getY(), this.getScale(), this.getScale());

    }
}
