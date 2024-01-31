class EnemyManager {
    constructor(pPosition) {
        this.mEnemies = [];
        //this.SetupEnemies();

         this.setRootNode(new Group('Alien manager root Node'));
        // this.createSceneGraphNodes();
    }

    getRootNode() {
        return this.mRootNode;
    }
    setRootNode(pSceneNode) {
        //let translationNode = new Transform(Matrix.createTranslation(this.getPosition()))
        this.mRootNode = pSceneNode;
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

    createSceneGraphNodes() {
        let translationNode, rotationNode, scaleNode, ObjectNode;

        translationNode = this.getRootNode();
        //ObjectNode = new Group('enemyManager parent node');

        rotationNode = new Transform(Matrix.createRotation(this.getRotation()));
        this.setRotationNode(rotationNode);
        scaleNode = new Transform(Matrix.createScale(this.getScale()));
        this.setScaleNode(scaleNode);


        translationNode.addChild(rotationNode);
        rotationNode.addChild(scaleNode);
        scaleNode.addChild(ObjectNode);

       //ObjectNode.addChild(this.img);
        return translationNode;
    }

    SetupEnemies(pRootTransformNode) {

        this.mRootPosition = new Vector(50,50)

        let offsetX = -60;
        let offsetY = -60;

        let xPos = this.mRootPosition.getX() + 40;
        let yPos = this.mRootPosition.getX() + 50;
        for (let y = 0; y < 4; y++) {
            for (let x = 0; x < 8; x++) {
                let alien = new Alien(new Vector(xPos + offsetX, yPos + offsetY), y);

                pRootTransformNode.addChild(alien.createSceneGraphNodes());


                this.mEnemies.push( alien);
                xPos += offsetX;
                
            }
            yPos += offsetY;
            xPos = this.mRootPosition.getX() + 40;

        }

       // rootNode.addChild(rootTransform);
        // rootTransform.addChild(housesNode);
    }
    GetEnemies() { return this.mEnemies; }

    DrawEnemies(pLayout) {
        this.mEnemies.forEach(alien => {
            alien.Draw(pLayout);
        });
    }

    GetRootNode()
    {
        return this.mEnemiesParentNode;
    }


}