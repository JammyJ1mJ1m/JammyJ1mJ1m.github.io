class EnemyManager {
    constructor(pPosition) {
        this.mEnemies = [];
        //this.SetupEnemies();
    }
    SetupEnemies() {
        let offsetX = 60;
        let offsetY = 60;

        let xPos = 50;
        let yPos = 50;
        for (let y = 0; y < 4; y++) {
            for (let x = 0; x < 8; x++) {
                
                this.mEnemies.push( new Alien(new Vector(xPos + offsetX, yPos + offsetY), y));
                xPos += offsetX;
                
            }
            yPos += offsetY;
            xPos = 50;

        }
    }

    DrawEnemies(pLayout) {
        this.mEnemies.forEach(alien => {
            alien.Draw(pLayout);
        });
    }


}