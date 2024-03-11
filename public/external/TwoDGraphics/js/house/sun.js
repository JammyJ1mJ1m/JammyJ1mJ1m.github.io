class Sun {
    constructor(pPosition, pScale, pAngle, pColour, pRotationRate, pScaleRate, pVelocity) {
        this.setPosition(pPosition);
        this.mOriginalPosition = pPosition;
        this.mOriginalScaleRate = pScaleRate;

        this.setRotation(pAngle);
        this.setScale(pScale);
        this.setColour(pColour);
        this.setRotationRate(pRotationRate);
        this.setScaleRate(pScaleRate);

        this.setVelocity(pVelocity);
        this.setRootNode(new Group('Sun root Node'));
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
    makeSunRay(pContext, pFillColour, pMatrix, pRayAmount) {
        let arrayPolygon = [];
        let translation, transform, rotation, angle, radian, currentAngle;

        angle = 360 / pRayAmount;
        radian = angle * Math.PI / 180;
        currentAngle = 0;
        translation = Matrix.createTranslation(new Vector(0, -120, 0));

        for (let i = 0; i < pRayAmount; i++) {
            rotation = Matrix.createRotation(currentAngle);
            transform = pMatrix.multiply(rotation);
            transform = transform.multiply(translation);
            transform.setTransform(pContext);
            this.drawSunRay(pContext, pFillColour);
            currentAngle += radian;

            arrayPolygon.push(new Polygon([new Vector(0, -50), new Vector(25, 0), new Vector(-25, 0)], '#000000', '#ff9900', 'Basic'));
        }
        pMatrix.setTransform(pContext);

        return arrayPolygon;
    }

    createRayNodes(pParentNode, pRayAmount, pSunOffset) {

        let raysGroupNode = new Group('raysGroupNode');

        let raysParent = new Group('raysParent');

        let angle, radian, currentAngle;

        angle = 360 / pRayAmount;
        radian = angle * Math.PI / 180;
        currentAngle = 0;

        for (let i = 0; i < pRayAmount; i++) {
            let translationNode = new Transform(Matrix.createTranslation(new Vector(150, 0, 0)));
            let rotationNode = new Transform(Matrix.createRotation(currentAngle));

            raysParent.addChild(rotationNode);

            rotationNode.addChild(translationNode);
            translationNode.addChild(raysGroupNode);

            raysGroupNode.addChild(this.draw(new Polygon([new Vector(0, -50), new Vector(25, 0), new Vector(-25, 0)], '#000000', '#ff9900', 'Basic'), pSunOffset, currentAngle));

            currentAngle += radian;
        }

        pParentNode.addChild(raysGroupNode);

        return pParentNode;
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
        let translationNode, rotationNode, scaleNode, sunGroupNode;

        translationNode = this.getRootNode();
        sunGroupNode = new Group('Sun parent node');

        rotationNode = new Transform(Matrix.createRotation(this.getRotation()));
        this.setRotationNode(rotationNode);
        scaleNode = new Transform(Matrix.createScale(this.getScale()));

        translationNode.addChild(rotationNode);
        rotationNode.addChild(scaleNode);
        scaleNode.addChild(sunGroupNode);

        sunGroupNode.addChild(this.draw(new Polygon([100, 32], '#000000', '#ff9900', 'Circle'), new Vector(0, 0, 0))); // draw sun body

        sunGroupNode = this.createRayNodes(sunGroupNode, 8, new Vector(0, -110, 0));

        return translationNode;
    }

    update(pDeltaTime, pStaticLines) {
        let currentRotationDelta = this.getRotationRate() * pDeltaTime;
        let newRotation = this.getRotation() + currentRotationDelta;
        this.setRotation(newRotation);
        let rotationNode = this.getRotationNode();
        let rotationMatrix = Matrix.createRotation(newRotation);
        rotationNode.setTransform(rotationMatrix);

        let newPosition;
        let velocity = this.getVelocity();

        let currentVelocity = velocity.multiply(pDeltaTime);

        let pos = this.getPosition();
        newPosition = this.getPosition().add(currentVelocity);
        this.setPosition(newPosition);

        let boundaryPosX = new Vector(800, 0, 0);
        let boundaryMinusX =  new Vector(-800, 0, 0);
        let boundaryPosY = new Vector(0, 800, 0);
        let boundaryMinusY = new Vector(0, -800, 0);
        
        if (newPosition.getX() > boundaryPosX.getX() || newPosition.getX() < boundaryMinusX.getX() || newPosition.getY() > boundaryPosY.getY() || newPosition.getY() < boundaryMinusY.getY()) {
            
            this.resetPosition();
        }

        let translationNode = this.getRootNode();
        let newTranslationMatrix = Matrix.createTranslation(newPosition);
        translationNode.setTransform(newTranslationMatrix);

    }
}