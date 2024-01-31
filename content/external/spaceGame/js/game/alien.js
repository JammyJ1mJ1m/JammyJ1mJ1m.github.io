class Alien {
    constructor(pPosition, pIndex) {
        this.mPosition = pPosition;
        this.setScale (new Vector(40,40,0));
        this.mVelocity = new Vector(0, 0);

        this.img = new Image();
        this.mHitRadius = 20;
        this.mIsDead = false;
        this.mName = "Alien "+pIndex;

        this.setRootNode(new Group('Alien root Node ' + pIndex));
        //this.createSceneGraphNodes();

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

    getRootNode() {
        return this.mRootNode;
    }
    setRootNode(pSceneNode) {
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

    GetRadius() { return this.mHitRadius; }

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
    getRotation() {
        return this.mRotation;
    }

    setRotation(pRotation) {
        this.mRotation = pRotation;
    }

    getCenteredPos() {
        return new Vector(this.getPosition().getX() - this.getScale() / 2, this.getPosition().getY() - this.getScale() / 2);
    }



    createSceneGraphNodes() {
        let wallNode, translationNode, rotationNode, scaleNode, polygon, imageNode;

        wallNode = new Group(this.mName);
        
        imageNode = new ImageNode(this);

        translationNode = new Transform(Matrix.createTranslation(this.getPosition()));
        rotationNode = new Transform(Matrix.createRotation(0));
        scaleNode = new Transform(Matrix.createScale(this.getScale()));

        translationNode.addChild(imageNode);
        rotationNode.addChild(translationNode);
        scaleNode.addChild(rotationNode);

        wallNode.addChild(scaleNode);
        return wallNode;
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

    KillAlien()
    {
        this.mIsDead = true;
    }
    GetIsDead()
    {
        return this.mIsDead;
    }

    Draw(layout) {
        if( !this.mIsDead)
        {
            this.DrawRadius();
            layout.drawImage(this.img, this.getCenteredPos().getX(), this.getCenteredPos().getY(), this.getScale(), this.getScale());
        }
    }
}
