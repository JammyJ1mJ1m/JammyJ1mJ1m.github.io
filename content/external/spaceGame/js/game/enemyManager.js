class EnemyManager {
    constructor(pPosition) {
        this.mEnemies = [];
        //this.SetupEnemies();
    }
    SetupEnemies() {

        this.mRootPosition = new Vector(50,50)

        let offsetX = 60;
        let offsetY = 60;

        let xPos = this.mRootPosition.getX() + 40;
        let yPos = this.mRootPosition.getX() + 50;
        for (let y = 0; y < 4; y++) {
            for (let x = 0; x < 8; x++) {
                let alien = new Alien(new Vector(xPos + offsetX, yPos + offsetY), y);

                this.mEnemies.push( alien);
                xPos += offsetX;
                
            }
            yPos += offsetY;
            xPos = this.mRootPosition.getX() + 40;

        }
    }

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