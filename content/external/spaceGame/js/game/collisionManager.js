class ColisionManager {
    constructor(pEnemyManager, pPlayer, pBarriers) {
        this.mEnemyManager = pEnemyManager;
        this.mPlayer = pPlayer;
        this.mBarriers = pBarriers;
    }

    CalculateBarrierCollisions() {
        var projectile = this.mPlayer.GetProjectile();
        if (projectile != null) {

            this.mBarriers.forEach(element => {
                let pieces = element.GetPieces();
                pieces.forEach(piece => {
                    piece.getPosition();

                    if (!piece.GetIsDead()) {

                        if (this.CalculateCircleCircle(piece, projectile)) {
                            piece.TakeLife();
                            projectile.ProjectileHit();

                        }
                    }
                });
            });
        }
    }

    CalculateCircleCircle(pPiece, pProjectile) {
        let isHit = false;
        let distX = pPiece.getPosition().getX() - pProjectile.getPosition().getX();
        let distY = pPiece.getPosition().getY() - pProjectile.getPosition().getY();
        let distance = Math.sqrt((distX * distX) + (distY * distY));

        if (distance <= pPiece.GetRadius() + pProjectile.GetRadius()) {
            isHit = true;
        }
        return isHit;
    }

    CalculateCollisions() {

        let projectile = this.mPlayer.GetProjectile();
        if (projectile != null) {

            this.mEnemyManager.GetEnemies().forEach(alien => {

                if (!alien.GetIsDead()) {

                    // let distX = alien.getPosition().getX() - projectile.getPosition().getX();
                    // let distY = alien.getPosition().getY() - projectile.getPosition().getY();
                    // let distance = Math.sqrt((distX * distX) + (distY * distY));

                    if (this.CalculateCircleCircle(alien, projectile)) {
                        alien.KillAlien();
                        projectile.ProjectileHit();
                        this.mPlayer.ConfirmAlienHit();
                    }
                }
            });
        }
    }
}