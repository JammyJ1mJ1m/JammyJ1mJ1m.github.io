class Alien {
    constructor(pPosition, pIndex) {
        this.mPosition = pPosition;
        this.mOriginalPosition = pPosition;
        this.mScale = 40;
        this.mVelocity = new Vector(30, 5);

        this.img = new Image();
        this.mHitRadius = 20;
        this.mIsDead = false;
        this.mMoveAmountX = 100;

        this.mGameOverBounds = 750;

        this.mLastBulletShotTime = Date.now();

        // time interval in milliseconds
        this.mLastBulletShotInterval = 2000;

        switch (pIndex) {
            case 0:
                this.img.src = "assets/Alien_1.png";
                break;
            case 1:
                this.img.src = "assets/Alien_2.png";
                break;
            case 2:
                this.img.src = "assets/Alien_3.png";
                break;
            default:
                this.img.src = "assets/Alien_3.png";
                break;
        }
    }

    GetRadius() { return this.mHitRadius; }

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

    DrawRadius() {
        const canvas = document.getElementById("canvas");
        if (canvas.getContext) {
            const ctx = canvas.getContext("2d");

            ctx.strokeStyle = '#ff0000';
            ctx.beginPath();
            ctx.arc(this.getPosition().getX(), this.getPosition().getY(), this.GetRadius(), 0, Math.PI * 2, true); // Outer circle
            ctx.stroke();
        }
    }

    KillAlien() {
        this.mIsDead = true;
    }
    GetIsDead() {
        return this.mIsDead;
    }


    /**
     * Gets a random int
     * @param {*} pMin - Min range for number gen
     * @param {*} pMax - Max range for number gen
     * @returns A random int within the min/max range
     */
     randomNum(pMin, pMax) {
        let num;
        num = Math.floor(Math.random() * (pMax - pMin) + pMin);
        return num;
    }

    ShootBullet()
    {
        return true;
    }

    ProcessBulletChoice()
    {

        if( Date.now() >  this.mLastBulletShotTime +  this.mLastBulletShotInterval )
        {
            let rng = randomNum(0,2000)
            if(rng == 1)
            {
                return this.ShootBullet()
            }
        }
        return false;
    }

    TranslateAlien(deltaTime) {
        if (this.getPosition().getX() >= this.mOriginalPosition.getX() + this.mMoveAmountX || this.getPosition().getX() <= this.mOriginalPosition.getX() - this.mMoveAmountX) {
            this.setVelocity(new Vector(this.getVelocity().getX() * -1, this.getVelocity().getY()));
        }

        if (this.getPosition().getY() > this.mGameOverBounds) {
            // console.log("GameOver");
            this.setVelocity(new Vector(0,0));
            return true;

        }

        let currentVelocity = this.getVelocity().multiply(deltaTime);
        let newPosition = this.getPosition().add(currentVelocity);
        this.setPosition(newPosition);
        return false;


    }

    Draw(layout, deltaTime) {
        let gameState;
        if (!this.mIsDead) {
            gameState = this.TranslateAlien(deltaTime);
            // this.DrawRadius();
            layout.drawImage(this.img, this.getCenteredPos().getX(), this.getCenteredPos().getY(), this.getScale(), this.getScale());
        }
        return gameState;
    }
}
