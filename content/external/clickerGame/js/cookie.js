class Cookie {
    constructor(pPosition, pScale, pVelocity,booly, canvas) {
        this.img = new Image();

        this.mCanvas = canvas;

        this.mClickTime = -1;

        if (booly) {
            this.img.src = "assets/dony.png";
        }
        else {
            this.img.src = "assets/cookie.png";

        }

        let offsetPos = new Vector(pPosition.getX() - pScale / 2, pPosition.getY() - pScale / 2);
        this.setPosition(offsetPos);
        this.mOriginalPosition = pPosition;
        this.mOriginalScale = pScale;

        this.setScale(pScale);

        this.setVelocity(pVelocity);

        this.mShrinkAmount = 10;

        this.setRootNode(new Group('Cookie'));

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

    //=======================================================
    //                    Node  stuff
    //=======================================================
    getRootNode() {
        return this.mRootNode;
    }
    setRootNode() {
        let translationNode = new Transform(Matrix.createTranslation(this.getPosition()))
        this.mRootNode = translationNode;
    }

    getRotationNode() {
        return this.mRotationNode;
    }
    setRotationNode(pSceneNode) {
        this.mRotationNode = pSceneNode;
    }

    getScaleNode() {
        return this.mScaleNode;
    }
    setScaleNode(pSceneNode) {
        this.mScaleNode = pSceneNode;
    }

    getScaleRate() {
        return this.mScaleRate;
    }

    setScaleRate(pScaleRate) {
        this.mScaleRate = pScaleRate;
    }
    //=======================================================
    //                    end of nodes
    //=======================================================
setGoldcookie()
{
    this.img.src = "assets/goldCookie.png";

}
    getShrinkRate() {
        return this.mShrinkRate = 0.01;
    }

    setDonut(booly) {
        if (booly)
            this.img.src = "assets/dony.png";
        else
            this.img.src = "assets/cookie.png";
    }

    click() {
        if (!this.mIsClicked) {
            this.mIsClicked = true;
            console.log("Clicked");
            this.setScale(this.getScale() - 10);
            this.setPosition(new Vector(this.mOriginalPosition.getX() - this.getScale() / 2, this.mOriginalPosition.getY() - this.getScale() / 2))

            this.mClickTime = Date.now();
        }
    }



    drawCookie(layout, pDeltaTime) {
        if (this.mVelocity.getY() > 0) {
            let currentVelocity = this.getVelocity().multiply(pDeltaTime);
            let newPosition = this.getPosition().add(currentVelocity);
            this.setPosition(newPosition);
        }

        if (this.mIsClicked && Date.now() > this.mClickTime + 50) {
            this.mIsClicked = false;
            this.mClickTime = -1;
            this.setScale(this.getScale() + 10);
            this.setPosition(new Vector(this.mOriginalPosition.getX() - this.getScale() / 2, this.mOriginalPosition.getY() - this.getScale() / 2))
        }

        layout.drawImage(this.img, this.getPosition().getX(), this.getPosition().getY(), this.getScale(), this.getScale());
    }
}