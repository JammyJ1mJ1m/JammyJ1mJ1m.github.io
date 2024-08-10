class Projectile {
    constructor(pPosition, pVelocity) {
        this.mPosition = pPosition;
        this.mScale = 40;
        this.mVelocity = new Vector(0, 0);

        this.img = new Image();

        this.img.src = "assets/projectile.png";
        this.mVelocity = pVelocity;
        this.mHitRadius = 5;
        this.mIsDead = false;
        // this.mShootSound = new Audio('sounds/shoot.wav');
        this.mShootSound = new AudioSource('sounds/shoot.wav');
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

    playAudio()
    {
        this.mShootSound.play();
    }

    DrawRadius() {
        const canvas = document.getElementById("canvas");
        if (canvas.getContext) {
            const ctx = canvas.getContext("2d");

            ctx.beginPath();
            ctx.arc(this.getPosition().getX(), this.getPosition().getY(), this.GetRadius(), 0, Math.PI * 2, true); // Outer circle
            ctx.stroke();
        }
    }

    ProjectileHit() {
        this.mIsDead = true;
    }
    GetActiveStat() {
        return this.mIsDead;
    }

    Draw(layout, deltaTime) {
        if (!this.mIsDead) {
            let currentVelocity = this.getVelocity().multiply(deltaTime);
            let newPosition = this.getPosition().add(currentVelocity);
            this.setPosition(newPosition);
            this.DrawRadius();
            layout.drawImage(this.img, this.getCenteredPos().getX(), this.getCenteredPos().getY(), this.getScale(), this.getScale());
        }

    }
}