class ColisionManager {
    constructor(pEnemyManager, pPlayer) {
        this.mEnemyManager = pEnemyManager;
        this.mPlayer = pPlayer;
    }
    CalculateCollisions() {

        let projectile = this.mPlayer.GetProjectile();
        if (projectile != null) {

            this.mEnemyManager.GetEnemies().forEach(alien => {

                let distX = alien.getPosition().getX() - projectile.getPosition().getX();
                let distY = alien.getPosition().getY() - projectile.getPosition().getY();
                let distance = Math.sqrt((distX * distX) + (distY * distY));

                if (distance <= alien.GetRadius() + projectile.GetRadius()) {
                    console.log("Hit");

                }

                
            });
        }
    }
}