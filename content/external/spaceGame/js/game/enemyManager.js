class EnemyManager {
    constructor(pPosition) {
        this.mEnemies = [];
        //this.SetupEnemies();

        this.setRootNode(new Group('Alien root Node ' + pIndex));
        this.createSceneGraphNodes();
    }

    createSceneGraphNodes() {
        let translationNode, rotationNode, scaleNode, ObjectNode;

        translationNode = this.getRootNode();
        ObjectNode = new Group('enemyManager parent node');

        rotationNode = new Transform(Matrix.createRotation(this.getRotation()));
        this.setRotationNode(rotationNode);
        scaleNode = new Transform(Matrix.createScale(this.getScale()));
        this.setScaleNode(scaleNode);


        translationNode.addChild(rotationNode);
        rotationNode.addChild(scaleNode);
        scaleNode.addChild(ObjectNode);

       ObjectNode.addChild(this.img);
        return translationNode;
    }

    SetupEnemies() {

        this.mRootPosition = new Vector(50,50)

        let offsetX = 60;
        let offsetY = 60;

        let xPos = this.mRootPosition.getX() + 40;
        let yPos = this.mRootPosition.getX() + 50;
        for (let y = 0; y < 1; y++) {
            for (let x = 0; x < 1; x++) {
                let alien = new Alien(new Vector(xPos + offsetX, yPos + offsetY), y);

                housesNode.addChild(sceneComponents[i].createSceneGraphNodes());


                this.mEnemies.push( alien);
                xPos += offsetX;
                
            }
            yPos += offsetY;
            xPos = this.mRootPosition.getX() + 40;

        }

        rootNode.addChild(rootTransform);
        rootTransform.addChild(housesNode);
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