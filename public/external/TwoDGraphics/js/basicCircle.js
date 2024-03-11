class BasicCircle {
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
        return this.mOldPosition;
    }

    setOldPosition(pOldPosition) {
        this.mOldPosition = pOldPosition;
    }

    getOldOldPosition() {
        return this.mOldPosition;
    }

    setOldOldPosition(pOldOldLocation) {
        this.mOldOldLocation = pOldOldLocation;
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

    setHasCollided(pHasCollided) {
        this.mHasCollided = pHasCollided;
    }

    getHasCollided() {
        return this.mHasCollided;
    }

    getSpeed() {
        return this.mSpeed;
    }

    setSpeed() {
        this.mSpeed = new Vector(this.getVelocity().getX(), this.getVelocity().getY(), this.getVelocity().getZ());
        this.mSpeed = this.mSpeed.magnitude();
        this.mSpeed = this.mSpeed.toFixed(3);
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
        objectGroupNode = new Group('Basic circle parent node');

        rotationNode = new Transform(Matrix.createRotation(this.getRotation()));
        this.setRotationNode(rotationNode);
        scaleNode = new Transform(Matrix.createScale(this.getScale()));
        this.setScaleNode(scaleNode);

        translationNode.addChild(rotationNode);
        rotationNode.addChild(scaleNode);
        scaleNode.addChild(objectGroupNode);

        objectGroupNode.addChild(this.draw(new Polygon([0, 0, this.getRadius(), 0, 4 * Math.PI, true], '#000000', this.getColour(), 'Arc'), new Vector(0, 0, 0)));
        objectGroupNode.addChild(this.draw(new Polygon([new Vector(10, 0), new Vector(30, -5), new Vector(20, -15)], '#000000', this.getColour(), 'Basic'), new Vector(0, 0, 0)));
        objectGroupNode.addChild(this.draw(new Polygon([new Vector(-10, 0), new Vector(-30, -5), new Vector(-20, -15)], '#000000', this.getColour(), 'Basic'), new Vector(0, 0, 0)));

        objectGroupNode.addChild(this.draw(new Polygon([new Vector(10, 20), new Vector(0, 30), new Vector(-10, 20)], '#000000', this.getColour(), 'Basic'), new Vector(0, 0, 0)));

        return translationNode;
    }

    update(pDeltaTime, pBoundaryLines, pStaticCircles) {
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
        let hasCollided = this.detectCollision(pBoundaryLines, pStaticCircles, pDeltaTime);

        if (hasCollided == false) {
            this.setOldPosition(newPosition);
        }

        let translationNode = this.getRootNode();
        let newTranslationMatrix = Matrix.createTranslation(newPosition);
        translationNode.setTransform(newTranslationMatrix);

    }


    randomNum(pMin, pMax) {
        let num;
        num = Math.floor(Math.random() * (pMax - pMin) + pMin);
        return num;
    }


    randomHex() {
        let chars = '0123456789abcdef';
        let hex = '#';
        for (let i = 0; i < 6; i++) {
            let num = this.randomNum(0, chars.length)
            let item = chars[num];
            hex += item;
        }
        return hex;
    }

    detectCollision(pBoundaryLines, pStaticCircles, pDeltaTime) {
        this.detectBoundingBoxCollision(pBoundaryLines);
        let hasCollided = this.detectCircleCollision(pStaticCircles, pDeltaTime);

        return hasCollided;
    }

    

    detectCircleCollision(pStaticCircles) {
        let pCircle2 = this;
        let pCircle1;
        let colldiingCircle;
        let hasCollided = false;
        let distance;

        for (let i = 0; i < pStaticCircles.length; i++) {
            if(pCircle2.getPosition() != pStaticCircles[i].getPosition()) {
                pCircle1 = pStaticCircles[i];
                let absX = Math.abs(pCircle1.getPosition().getX() - pCircle2.getPosition().getX());
                let absY = Math.abs(pCircle1.getPosition().getY() - pCircle2.getPosition().getY());
    
                distance = (absX * absX) + (absY * absY);
    
                distance = Math.sqrt(distance);
    
                if (distance <= pCircle1.getRadius() + pCircle2.getRadius()) {
    
                    colldiingCircle = pCircle1;
                    hasCollided = true;
                    break;
                }
            }
            

        }

        if (hasCollided == true) {
            let movingCirclePos = new Vector(this.getPosition().getX(), this.getPosition().getY(), this.getPosition().getZ());
            let stationaryCircle = new Vector(colldiingCircle.getPosition().getX(), colldiingCircle.getPosition().getY(), colldiingCircle.getPosition().getZ());
            let currentVelocity = new Vector(this.getVelocity().getX(), this.getVelocity().getY(), this.getVelocity().getZ());

            let normalVec = movingCirclePos.subtract(stationaryCircle);
            normalVec = normalVec.normalise();

            let dotProdVec = normalVec;

            let dot = dotProdVec.dotProduct(currentVelocity);
            dot = dot * -1;

            normalVec = normalVec.multiply(2);
            normalVec = normalVec.multiply(dot);

            normalVec = normalVec.add(currentVelocity);

            this.setVelocity(normalVec);
            this.setPosition(this.getOldPosition());

        }
        return hasCollided;
    }

    detectBoundingBoxCollision(pBoundaryLines) {
        let rightLine = pBoundaryLines[0].getPosition();
        let leftLine = pBoundaryLines[1].getPosition();
        let topLine = pBoundaryLines[2].getPosition();
        let bottomLine = pBoundaryLines[3].getPosition();

        let circlePositionX = this.getPosition().getX();
        let circlePositionY = this.getPosition().getY();
        let newVelocity;

        if (rightLine.getX() - circlePositionX < this.getRadius()) {
            newVelocity = new Vector(this.getVelocity().getX() * -1, this.getVelocity().getY(), 0);
            this.setVelocity(newVelocity);
            this.setPosition(this.getOldPosition())
        }

        if (leftLine.getX() - circlePositionX > this.getRadius() - this.getDiameter()) {
            newVelocity = new Vector(this.getVelocity().getX() * -1, this.getVelocity().getY(), 0);
            this.setVelocity(newVelocity);
            this.setPosition(this.getOldPosition())
        }

        if (topLine.getY() - circlePositionY > this.getRadius() - this.getDiameter()) {
            newVelocity = new Vector(this.getVelocity().getX(), this.getVelocity().getY() * -1, 0);
            this.setVelocity(newVelocity);
            this.setPosition(this.getOldPosition())
        }

        if (bottomLine.getY() - circlePositionY < this.getRadius()) {
            newVelocity = new Vector(this.getVelocity().getX(), this.getVelocity().getY() * -1, 0);
            this.setVelocity(newVelocity);
            this.setPosition(this.getOldPosition());
        }
    }

    loopStaticLines(i, pStaticLines) {
        pStaticLines;

        return pStaticLines[i].getPosition();

    }
}