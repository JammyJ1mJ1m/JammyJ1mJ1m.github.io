class Cookie{
    constructor(pPosition, pScale, pVelocity){
        this.img = new Image();
        this.img.src = "assets/cookie.png";
console.log("Scale: ", pScale);
        let offsetPos = new Vector(pPosition.getX() - pScale /2, pPosition.getY() - pScale /2 );
        this.setPosition(offsetPos);
        this.mOriginalPosition = pPosition;
        this.mOriginalScale = pScale;

        this.setScale(pScale);

        // this.setVelocity(pVelocity);
        // this.setRootNode(new Group('Cookie'));

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

    drawCookie(layout)
    {
        layout.drawImage(this.img, this.getPosition().getX() , this.getPosition().getY() , this.getScale(),this.getScale());
    }
}