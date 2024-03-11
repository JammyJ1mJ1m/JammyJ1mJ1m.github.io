class SceneGraphTemplate {
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
        this.setRootNode(new Group('SGT node'));
    }

    getPosition() {
        console.log("Position: " + this.mPosition.getX() + " " +this.mPosition.getY() );
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

    checkScaleStat(pVector) {
        if (pVector.getX() > new Vector(2,2,1).getX()) {
            this.setScaleRate(new Vector(-(this.mOriginalScaleRate.getX()),-(this.mOriginalScaleRate.getY()),-1));
        }
        if (pVector.getX() < new Vector(.25,.25,1).getX()) {
            this.setScaleRate(this.mOriginalScaleRate);
        }
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
        let translationNode, rotationNode, scaleNode, houseGroupNode;

        translationNode = this.getRootNode();
        houseGroupNode = new Group('SGT parent node');

        rotationNode = new Transform(Matrix.createRotation(this.getRotation()));
        this.setRotationNode(rotationNode);
        scaleNode = new Transform(Matrix.createScale(this.getScale()));
        this.setScaleNode(scaleNode);


        translationNode.addChild(rotationNode);
        rotationNode.addChild(scaleNode);
        scaleNode.addChild(houseGroupNode);

        houseGroupNode.addChild(this.draw(new Polygon([75, 32], '#000000', this.getColour(), 'Circle'), new Vector(0, 0, 0))); 
        // add more drawable objects
        
        
        return translationNode;
    }

    update(pDeltaTime) { 
        let currentRotationDelta = this.getRotationRate() * pDeltaTime;
        let newRotation = this.getRotation() + currentRotationDelta;
        this.setRotation(newRotation);
        let rotationNode = this.getRotationNode();
        let rotationMatrix = Matrix.createRotation(newRotation);
        rotationNode.setTransform(rotationMatrix);


        let currentScale = this.getScaleRate().multiply(pDeltaTime);
        let newScale = this.getScale().add(currentScale);
        this.setScale(newScale);

        this.checkScaleStat(newScale);

        let scaleNode = this.getScaleNode();
        let newScaleMatrix = Matrix.createScale(newScale);
        scaleNode.setTransform(newScaleMatrix);


        let currentVelocity = this.getVelocity().multiply(pDeltaTime);
        let newPosition = this.getPosition().add(currentVelocity);
        this.setPosition(newPosition);

        let boundaryPosX = new Vector(500, 0, 0);
        let boundaryMinusX =  new Vector(-500, 0, 0);
        let boundaryPosY = new Vector(0, 500, 0);
        let boundaryMinusY = new Vector(0, -500, 0);
        
        if (newPosition.getX() > boundaryPosX.getX() || newPosition.getX() < boundaryMinusX.getX() || newPosition.getY() > boundaryPosY.getY() || newPosition.getY() < boundaryMinusY.getY()) {
            this.resetPosition();
        }

        let translationNode = this.getRootNode();
        let newTranslationMatrix = Matrix.createTranslation(newPosition);
        translationNode.setTransform(newTranslationMatrix);
    }
}