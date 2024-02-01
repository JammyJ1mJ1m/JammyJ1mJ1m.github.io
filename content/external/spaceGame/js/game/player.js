class Player {
    constructor(pPosition, pIndex) {
        this.mPosition = pPosition;
        this.mScale = 40;
        this.mVelocity = new Vector(0, 0);

        this.img = new Image();


        this.img.src = "assets/player.png";
        this.mProjectiles = [];
        this.mEnemiesHit = 0;

        this.mLives = 3;
        this.mRadius = 20;

    }

    GetRadius() { return this.mRadius; }
    GetProjectile() { if(this.mProjectiles.length > 0) {return this.mProjectiles[0]} }
    getPosition() {
        return this.mPosition;
    }

    setPosition(pPosition) {
        this.mPosition = pPosition;
    }

    resetPosition() {
        this.mPosition = this.mOriginalPosition;
    }

    getVelocity() {
        return this.mVelocity;
    }

    setVelocity(pVelocity) {
        this.mVelocity = pVelocity;
    }

    setScale(pScale) {
        this.mScale = pScale;
    }
    getScale() {
        return this.mScale;
    }

    getCenteredPos() {
        return new Vector(this.getPosition().getX() - this.getScale() / 2, this.getPosition().getY() - this.getScale() / 2);
    }

    ConfirmAlienHit()
    {
        this.mEnemiesHit++;
    }

    GetEnemiesHit() { return this.mEnemiesHit; }
    
    TakeLife(){ this.mLives--; }
    GetLife() { return this.mLives; }
    PollInput()
    {
        let body = document.querySelector("body");
        body.addEventListener("keydown", (event) => {
            if (IsClickUp && event.key === 'a') {
                IsClickUp = false;
                this.setVelocity(new Vector(-80, 0));
                // this.setPosition(new Vector(this.getPosition().getX() + (1 * deltaTime),this.getPosition().getY
            }
            if (IsRightUP && event.key === 'd') {
                IsRightUP = false;
                this.setVelocity(new Vector(80, 0));
                // this.setPosition(new Vector(this.getPosition().getX() + (1 * deltaTime),this.getPosition().getY
            }
            if (IsShootUp && event.key === ' ') {
                if(this.mProjectiles.length ==0)
                {
                    IsShootUp = false;
                    this.mProjectiles.push(new Projectile(this.getPosition(),new Vector(0,-120)));
                    // this.setPosition(new Vector(this.getPosition().getX() + (1 * deltaTime),this.getPosition().getY
                }
            }
        });

        body.addEventListener("keyup", (event) => {
            if (event.key === 'a') {
                IsClickUp = true;
                this.setVelocity(new Vector(0, 0));

                return;
            }
            if (event.key === 'd') {
                IsRightUP = true;
                this.setVelocity(new Vector(0, 0));

                return;
            }
            if (event.key === ' ') {
                IsShootUp = true;
                return;
            }
        });
    }

    Draw(layout, deltaTime) {

        this.PollInput();
        if(this.mProjectiles.length >0 && this.mProjectiles[0].GetActiveStat())
        {
            this.mProjectiles.pop(this.mProjectiles[0]);
        }

        let currentVelocity = this.getVelocity().multiply(deltaTime);
        let newPosition = this.getPosition().add(currentVelocity);
        this.setPosition(newPosition);

        if (this.mProjectiles.length >0) {
            if (this.mProjectiles[0].getPosition().getY() <= -20) {
                this.mProjectiles.pop(this.mProjectiles[0]);
            }
        }
        layout.drawImage(this.img, this.getCenteredPos().getX(), this.getCenteredPos().getY(), this.getScale(), this.getScale());
        this.mProjectiles.forEach(element => {
            element.Draw(layout, deltaTime);
        });
    }
}