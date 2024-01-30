class DebugManager {
    constructor() {
        this.mIsDebug = false;
    }

    PollInput() {
        let body = document.querySelector("body");
        body.addEventListener("keydown", (event) => {
            if (IsDebugKeyUp && event.key === 's') {
                this.mIsDebug = !this.mIsDebug;

                IsDebugKeyUp = false;
            }

        });

        body.addEventListener("keyup", (event) => {
            if (event.key === 's') {
                this.mIsDebug = false;
                IsDebugKeyUp = true;
            }

        });
    }

    Draw(pPlayer, pEnemyManager) {
        this.PollInput();
        // console.log(this.mIsDebug)
        if (this.mIsDebug) {
            let projectile = pPlayer.GetProjectile();
            if (projectile != undefined) {
                projectile.DrawRadius(this.mIsDebug);
            }
            pEnemyManager.DrawDebug(this.mIsDebug);
        }
    }
}