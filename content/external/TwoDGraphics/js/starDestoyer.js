class StarDestoyer {
    constructor(pPosition, pScale, pAngle, pColour, pRotationRate, pScaleRate, pVelocity) {
        this.setPosition(pPosition);
        this.mOriginalPosition = pPosition;
        this.mOriginalScale = pScale;
        this.mOriginalScaleRate = pScaleRate;

        this.mFlippedScale = false;
        this.setRotation(pAngle);
        this.setScale(pScale);
        this.setColour(pColour);
        this.setRotationRate(pRotationRate);
        this.setScaleRate(pScaleRate);

        this.setVelocity(pVelocity);
        this.setRootNode(new Group('Star Destoyer root Node'));
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

    getRotation() {
        return this.mRotation;
    }

    setRotation(pRotation) {
        this.mRotation = pRotation;
    }

    getRotationRate() {
        return this.mRotationRate;
    }

    setRotationRate(pRotationRate) {
        this.mRotationRate = pRotationRate;
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

    getScaleRate() {
        return this.mScaleRate;
    }

    setScaleRate(pScaleRate) {
        this.mScaleRate = pScaleRate;
    }
    getScale() {
        return this.mScale;
    }

    setScale(pScale) {
        this.mScale = pScale;
    }
    setColour(pColour) {
        this.mColour = pColour;
    }
    getColour() {
        return this.mColour;
    }
    setName(pName) {
        this.mName = pName;
    }
    getName() {
        return this.mName;
    }
    

    draw(pPolygon, pTranslationVector, pRotation = 0, pScaleVector = new Vector(1,1,1)) {

        let wallNode, translationNode, rotationNode, scaleNode, polygon, polygonNode;

        wallNode = new Group();
        polygon = pPolygon;
        polygonNode = new Geometry(polygon);

        translationNode = new Transform(Matrix.createTranslation(pTranslationVector));
        rotationNode = new Transform(Matrix.createRotation(pRotation));
        scaleNode = new Transform(Matrix.createScale(pScaleVector));

        translationNode.addChild(polygonNode);
        rotationNode.addChild(translationNode);
        scaleNode.addChild(rotationNode);

        wallNode.addChild(scaleNode);
        return wallNode;
    }



    createSceneGraphNodes() {
        let translationNode, rotationNode, scaleNode, ObjectNode;

        translationNode = this.getRootNode();
        ObjectNode = new Group('Star Destroyer parent node');

        rotationNode = new Transform(Matrix.createRotation(this.getRotation()));
        this.setRotationNode(rotationNode);
        scaleNode = new Transform(Matrix.createScale(this.getScale()));
        this.setScaleNode(scaleNode);


        translationNode.addChild(rotationNode);
        rotationNode.addChild(scaleNode);
        scaleNode.addChild(ObjectNode);

        ObjectNode.addChild(this.draw(new Polygon([25, 32], '#000000', '#909392', 'Circle'),new Vector(80,25,0)));
        ObjectNode.addChild(this.draw(new Polygon([10, 8], '#000000', '#909392', 'Circle'),new Vector(175,-100,0)));
        ObjectNode.addChild(this.draw(new Polygon([new Vector(-5,0), new Vector(-5, -35), new Vector(-25, -35),new Vector(-25, -65),new Vector(15, -65),new Vector(30, 0)], '#000000', '#909392', 'Basic'),new Vector(180,-30,0))); // drawWall
        ObjectNode.addChild(this.draw(new Polygon([new Vector(50,-15), new Vector(100, -45), new Vector(180, -45),new Vector(180, -15)], '#000000', '#909392', 'Basic'),new Vector(20,-5,0))); // drawWall
        ObjectNode.addChild(this.draw(new Polygon([new Vector(50,-35), new Vector(80, -65), new Vector(120, -65),new Vector(120, -35)], '#000000', '#909392', 'Basic'),new Vector(0,35,0))); // drawWall
        
        ObjectNode.addChild(this.draw(new Polygon([new Vector(0,0), new Vector(20,-10), new Vector(20,30), new Vector(0,20)], '#000000', '#909392', 'Basic'),new Vector(195,-3,0))); // drawWall

        ObjectNode.addChild(this.draw(new Polygon([new Vector(-190, 0), new Vector(-190, 15), new Vector(200, 15), new Vector(200, 0)], '#000000', '#909392', 'Basic'),new Vector(0,0,0))); // drawWall
        ObjectNode.addChild(this.draw(new Polygon([new Vector(-200,35), new Vector(200, 35), new Vector(210, 65)], '#000000', '#909392', 'Basic'),new Vector(0,-20,0))); // drawWall
        ObjectNode.addChild(this.draw(new Polygon([new Vector(-200,-35), new Vector(200, -35), new Vector(210, -65)], '#000000', '#909392', 'Basic'),new Vector(0,35,0))); // drawWall
        
        return translationNode;
    }

    update(pDeltaTime, pStaticLines) { 
        let currentRotationDelta = this.getRotationRate() * pDeltaTime;
        let newRotation = this.getRotation() + currentRotationDelta;
        this.setRotation(newRotation);
        let rotationNode = this.getRotationNode();
        let rotationMatrix = Matrix.createRotation(newRotation);
        rotationNode.setTransform(rotationMatrix);


        let currentScale = this.getScaleRate().multiply(pDeltaTime);
        let newScale = this.getScale().add(currentScale);
        this.setScale(newScale);

        let scaleNode = this.getScaleNode();
        let newScaleMatrix = Matrix.createScale(newScale);
        scaleNode.setTransform(newScaleMatrix);


        let currentVelocity = this.getVelocity().multiply(pDeltaTime);
        let newPosition = this.getPosition().add(currentVelocity);
        this.setPosition(newPosition);

        let firePos = new Vector (-300,0);
        let firepos2 = new Vector (-290,0);
        
        if(this.getPosition().getX() >firepos2.getX() && this.getPosition().getX() < firePos.getX()   ){
            let zeroVel = new Vector(0,0,0)
            this.setVelocity(zeroVel) 
        }

        let translationNode = this.getRootNode();
        let newTranslationMatrix = Matrix.createTranslation(newPosition);
        translationNode.setTransform(newTranslationMatrix);
    }
}