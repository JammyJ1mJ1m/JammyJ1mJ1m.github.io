class StaticPolygon {
    constructor(pPosition, pScale, pAngle, pColour, pRotationRate, pScaleRate, pVelocity, pDiameter, pName) {
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
        this.setDiameter(pDiameter);
        this.setRadius();
        this.setName(pName);
        this.setRootNode(new Group(this.getName() + ' node'));

        this.setOldPosition(this.getPosition());
        this.getOldPosition();

    }

    getOldPosition() {
        return this.mOldLocation;
    }

    setOldPosition(pOldLocation) {
        this.mOldLocation = pOldLocation;
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

    getVelocity() {
        return this.mVelocity;
    }

    setVelocity(pVelocity) {
        this.mVelocity = pVelocity;
    }

    setRadius() {
        this.mRadius = this.getDiameter() / 2;
    }

    getRadius() {
        return this.mRadius;
    }

    setDiameter(pDiameter) {
        this.mDiameter = pDiameter;

    }

    getDiameter() {
        return this.mDiameter;
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
        let translationNode, rotationNode, scaleNode, objectGroupNode;

        translationNode = this.getRootNode();
        objectGroupNode = new Group('Static polygon parent node');

        rotationNode = new Transform(Matrix.createRotation(this.getRotation()));
        this.setRotationNode(rotationNode);
        scaleNode = new Transform(Matrix.createScale(this.getScale()));
        this.setScaleNode(scaleNode);

        translationNode.addChild(rotationNode);
        rotationNode.addChild(scaleNode);
        scaleNode.addChild(objectGroupNode);

        objectGroupNode.addChild(this.draw(new Polygon([0, 0, this.getRadius(), 0, 4 * Math.PI, true], '#000000', this.getColour(), 'Arc'), new Vector(0, 0, 0)));

        return translationNode;
    }

    update(pDeltaTime, pStaticLines, pStaticCircles) {

    }
}