class SpaceBG {
    constructor(pPosition, pScale, pAngle, pColour, pCanvasSize) {
        this.setPosition(pPosition);
        this.setRotation(pAngle);
        this.setScale(pScale);
        this.setColour(pColour);
        this.setCanvasSize(pCanvasSize);
    }

    getPosition() {
        return this.mPosition;
    }

    setPosition(pPosition) {
        this.mPosition = pPosition;
    }

    getRotation() {
        return this.mRotation;
    }

    setRotation(pRotation) {
        this.mRotation = pRotation;
    }

    getScale() {
        return this.mScale;
    }

    setScale(pScale) {
        this.mScale = pScale;
    }

    getColour() { 
        return this.mColour;
    }

    setColour(pColour) {
        this.mColour = pColour;
    }


    setCanvasSize(pCanvasSize) { 
        this.mCanvasSize = pCanvasSize;
    }

    getCanvasSize() { 
        return this.mCanvasSize;
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
        let translationNode, rotationNode, scaleNode, houseNode, houseGroupNode;

        houseNode = new Group();
        houseGroupNode = new Group();

        let bgOffset = new Vector(this.getCanvasSize().getX() - this.getCanvasSize() /2,this.getCanvasSize().getY() - this.getCanvasSize() /2, 1).multiply(-1)

        translationNode = new Transform(Matrix.createTranslation(bgOffset));
        rotationNode = new Transform(Matrix.createRotation(this.getRotation()));
        scaleNode = new Transform(Matrix.createScale(this.getScale()));

        houseNode.addChild(translationNode);
        translationNode.addChild(rotationNode);
        rotationNode.addChild(scaleNode);
        scaleNode.addChild(houseGroupNode);


        houseGroupNode.addChild(this.draw(new Polygon([new Vector(0, 0), new Vector(this.getCanvasSize().getX(),0), new Vector(this.getCanvasSize().getX(),this.getCanvasSize().getY()),new Vector(0,this.getCanvasSize().getY())], '#000000', this.getColour(), 'Basic'),new Vector(0,50,0))); // drawWall

        return houseNode;
    }

    update() { 
        
    }
}