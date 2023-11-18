class House {
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
        this.setRootNode(new Group('House root Node'));
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
    checkScaleStat(pVector) {
        if (pVector.getX() > new Vector(1.5,1.5,1).getX()) {
            this.setScaleRate(new Vector(-(this.mOriginalScaleRate.getX()),-(this.mOriginalScaleRate.getY()),-1));
        }
        if (pVector.getX() < new Vector(.25,.25,1).getX()) {
            this.setScaleRate(this.mOriginalScaleRate);
        }
    }

    draw(pPolygon, pTranslationVector, pRotation = 0, pScaleVector = new Vector(1,1,0)) {

        if( pScaleVector == null)
        {
            pScaleVector = pScaleVector = new Vector(1,1,0);
        }
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
        houseGroupNode = new Group('House parent node');

        rotationNode = new Transform(Matrix.createRotation(this.getRotation()));
        this.setRotationNode(rotationNode);
        scaleNode = new Transform(Matrix.createScale(this.getScale()));
        this.setScaleNode(scaleNode);


        translationNode.addChild(rotationNode);
        rotationNode.addChild(scaleNode);
        scaleNode.addChild(houseGroupNode);

        houseGroupNode.addChild(this.draw(new Polygon([new Vector(-100, -50), new Vector(-100, 50), new Vector(100, 50), new Vector(100, -50)], '#000000', '#ffffff', 'Basic'),new Vector(0,50,0))); // drawWall
        houseGroupNode.addChild(this.draw(new Polygon([0, 0, 100, 0, 3 * Math.PI, true], '#000000', '#ff0000', 'Arc'),new Vector(0,0,0))); // draw round roof
        houseGroupNode.addChild(this.draw(new Polygon([new Vector(20,-30), new Vector(20,30), new Vector(-20,30), new Vector(-20,-30)], '#000000', this.mColour, 'Basic'),new Vector(0,70,0)));; // draw door
        houseGroupNode.addChild(this.draw(new Polygon([25, 32], '#000000', '#06ffff', 'Circle'),new Vector(-60,50,0))); // draw right circle window
        houseGroupNode.addChild(this.draw(new Polygon([new Vector(25,0), new Vector(-25,0)], '#000000', '#66ffff', 'Basic'), new Vector(-60,50,0))); // right window across
        houseGroupNode.addChild(this.draw(new Polygon([new Vector(0,25), new Vector(0,-25)], '#000000', '#66ffff', 'Basic'), new Vector(-60,50,0))); // right window down
        houseGroupNode.addChild(this.draw(new Polygon([25, 32], '#000000', '#06ffff', 'Circle'),new Vector(60,50,0))); // draw left circle window
        houseGroupNode.addChild(this.draw(new Polygon([new Vector(25,0), new Vector(-25,0)], '#000000', '#66ffff', 'Basic'), new Vector(60,50,0))); // left window across
        houseGroupNode.addChild(this.draw(new Polygon([new Vector(0,25), new Vector(0,-25)], '#000000', '#66ffff', 'Basic'), new Vector(60,50,0))); // left window down

        let angle = this.randomNum(-145,-25);
        houseGroupNode.addChild(this.draw(new Polygon([new Vector(0,0),new Vector(50,50),new Vector(100,40),new Vector(120,70),new Vector(160,60),new Vector(220,80),new Vector(230,60),new Vector(250,50),new Vector(300,50), new Vector(350,0)], '#000000', '#666666', 'Basic'), new Vector(-170,100,0))); // left window down
        houseGroupNode.addChild(this.draw(new Polygon([new Vector(0,-15), new Vector(60,-40), new Vector(60,40), new Vector(0,15)], '#000000', '#444444', 'Basic'),new Vector(30,-5,0),angle * Math.PI / 180)); // drawWall
        houseGroupNode.addChild(this.draw(new Polygon([25, 32], '#000000', '#06ffff', 'Circle'),new Vector(120,-5,0),angle * Math.PI / 180)); // draw left circle window
        houseGroupNode.addChild(this.draw(new Polygon([new Vector(0,-10), new Vector(90,-25), new Vector(90,25), new Vector(0,10)], '#000000', '#909392', 'Basic'),new Vector(30,-5,0),angle * Math.PI / 180)); // drawWall
        houseGroupNode.addChild(this.draw(new Polygon([new Vector(0,-20), new Vector(20,-25), new Vector(20,25), new Vector(0,20)], '#000000', '#555555', 'Basic'),new Vector(80,-5,0),angle * Math.PI / 180)); // drawWall
        houseGroupNode.addChild(this.draw(new Polygon([new Vector(10,-15), new Vector(30,-20), new Vector(30,20), new Vector(10,15)], '#000000', '#555555', 'Basic'),new Vector(30,-5,0),angle * Math.PI / 180)); // drawWall

        return translationNode;
    }
    randomNum(pMin, pMax) {
        let num;
        num = Math.floor(Math.random() * (pMax - pMin) + pMin);
        return num;
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

        this.checkScaleStat(newScale);

        let scaleNode = this.getScaleNode();
        let newScaleMatrix = Matrix.createScale(newScale);
        scaleNode.setTransform(newScaleMatrix);

        let currentVelocity = this.getVelocity().multiply(pDeltaTime);
        let newPosition = this.getPosition().add(currentVelocity);
        this.setPosition(newPosition);

        let boundaryPosX = new Vector(850, 0, 0);
        let boundaryMinusX =  new Vector(-850, 0, 0);
        let boundaryPosY = new Vector(0, 850, 0);
        let boundaryMinusY = new Vector(0, -850, 0);
        
        if (newPosition.getX() > boundaryPosX.getX() || newPosition.getX() < boundaryMinusX.getX() || newPosition.getY() > boundaryPosY.getY() || newPosition.getY() < boundaryMinusY.getY()) {
            this.resetPosition();
        }

        let translationNode = this.getRootNode();
        let newTranslationMatrix = Matrix.createTranslation(newPosition);
        translationNode.setTransform(newTranslationMatrix);
    }
}