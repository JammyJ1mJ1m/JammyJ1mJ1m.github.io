class Line {
    constructor(pPosition, pScale, pAngle, pColour, pRotationRate, pScaleRate, pVelocity, pLineData, pType) {
        this.setPosition(pPosition);
        this.mOriginalPosition = pPosition;
        this.mOriginalScale = pScale;
        this.mOriginalScaleRate = pScaleRate;

        this.setType(pType);

        this.mFlippedScale = false;
        this.setRotation(pAngle);
        this.setScale(pScale);
        this.setColour(pColour);
        this.setRotationRate(pRotationRate);
        this.setScaleRate(pScaleRate);

        this.setVelocity(pVelocity);
        this.setLineData(pLineData);
        this.setRootNode(new Group('Line root Node'));
    }
    setType(pType) {
        this.mType = pType;
    }

    getType() {
        return this.mType;
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

    setLineData(pLineData) {
        this.mLineData = pLineData;
    }

    getLinedata() {
        return this.mLineData;
    }

    setName(pName) {
        this.mName = pName;
    }
    getName() {
        return this.mName;
    }

    checkScaleStat(pVector) {
        if (pVector.getX() > new Vector(2, 2, 1).getX()) {
            this.setScaleRate(new Vector(-(this.mOriginalScaleRate.getX()), -(this.mOriginalScaleRate.getY()), -1));
        }
        if (pVector.getX() < new Vector(.25, .25, 1).getX()) {
            this.setScaleRate(this.mOriginalScaleRate);
        }
    }

    draw(pPolygon, pTranslationVector, pRotation = 0, pScaleVector = new Vector(1, 1, 1)) {

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
        let translationNode, rotationNode, scaleNode, lineNodeGroup;

        translationNode = this.getRootNode();
        lineNodeGroup = new Group('Line parent node');

        rotationNode = new Transform(Matrix.createRotation(this.getRotation()));
        this.setRotationNode(rotationNode);
        scaleNode = new Transform(Matrix.createScale(this.getScale()));
        this.setScaleNode(scaleNode);


        translationNode.addChild(rotationNode);
        rotationNode.addChild(scaleNode);
        scaleNode.addChild(lineNodeGroup);

        lineNodeGroup.addChild(this.draw(new Polygon(this.getLinedata(), '#000000', '#ffffff', 'Basic'), new Vector(0, 0, 0)));

        return translationNode;
    }

    update(pDeltaTime) {

    }
}