class ColisionManager {
    constructor(pEnemyManager, pPlayer) {
        this.mEnemyManager = pEnemyManager;
        this.mPlayer = pPlayer;
    }
    CalculateCollisions() {

        let projectile = this.mPlayer.GetProjectile();
        if (projectile != null) {

            this.mEnemyManager.GetEnemies().forEach(alien => {

                if(!alien.GetIsDead())
                {

                    let distX = alien.getPosition().getX() - projectile.getPosition().getX();
                    let distY = alien.getPosition().getY() - projectile.getPosition().getY();
                    let distance = Math.sqrt((distX * distX) + (distY * distY));
                    
                    if (distance <= alien.GetRadius() + projectile.GetRadius()) {
                        alien.KillAlien();
                        projectile.ProjectileHit();
                        this.mPlayer.ConfirmAlienHit();
                    }
                }
            });
        }
    }
}