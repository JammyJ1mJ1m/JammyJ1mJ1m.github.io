class EnemyManager {
    constructor(pPosition) {
        this.mEnemies = [];
        this.mGameState = false;
        //this.SetupEnemies();
        this.row = 4;
        this.columns = 8;
        this.mTotalEnemies = this.row * this.columns;
    }
    SetupEnemies() {

        this.mRootPosition = new Vector(50, 50)

        let offsetX = 60;
        let offsetY = 60;


        let xPos = this.mRootPosition.getX() + 40;
        let yPos = this.mRootPosition.getY() + 50;
        for (let y = 0; y < this.row; y++) {
            for (let x = 0; x < this.columns; x++) {
                let alien = new Alien(new Vector(xPos + offsetX, yPos + offsetY), y);

                this.mEnemies.push(alien);
                xPos += offsetX;

            }
            yPos += offsetY;
            xPos = this.mRootPosition.getX() + 40;

        }
    }
    GetEnemies() { return this.mEnemies; }
    GetGameState() { return this.mGameState; }
    getTotalEnemies() { return this.mTotalEnemies; }

    DrawEnemies(pLayout, deltaTime) {

        this.mEnemies.forEach(alien => {
            this.mGameState = alien.Draw(pLayout, deltaTime);
        });
if(this.mGameState)
{
    this.mEnemies.forEach(alien => {
            alien.setVelocity(new Vector(0,0));
        });
}
        
    }

    GetRootNode() {
        return this.mEnemiesParentNode;
    }


}
