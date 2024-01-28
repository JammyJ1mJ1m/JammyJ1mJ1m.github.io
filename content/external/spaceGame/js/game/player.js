class Player {
    constructor(pPosition, pIndex) {
        this.mPosition = pPosition;
        this.mScale = 40;
        this.mVelocity = new Vector(0, 0);

        this.img = new Image();


        this.img.src = "assets/player.png";
        this.mProjectiles = [];

    }

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
    Draw(layout, deltaTime) {

        let body = document.querySelector("body");
        body.addEventListener("keydown", (event) => {
            if (IsClickUp && event.key === 'a') {   
                IsClickUp = false;
                this.setVelocity(new Vector(-80,0));
                // this.setPosition(new Vector(this.getPosition().getX() + (1 * deltaTime),this.getPosition().getY
            }
            if (IsRightUP && event.key === 'd') {
                IsRightUP = false;
                this.setVelocity(new Vector(80,0));
                // this.setPosition(new Vector(this.getPosition().getX() + (1 * deltaTime),this.getPosition().getY
            }
            if (IsShootUp && event.key === ' ') {
                IsShootUp = false;
                this.mProjectiles.push(new Projectile(this.getPosition()));
                // this.setPosition(new Vector(this.getPosition().getX() + (1 * deltaTime),this.getPosition().getY
            }
        });

        body.addEventListener("keyup", (event) => {
            if (event.key === 'a') {
                IsClickUp = true;
                this.setVelocity(new Vector(0,0));
               
                return;
            }
            if (event.key === 'd') {
                IsRightUP = true;
                this.setVelocity(new Vector(0,0));
               
                return;
            }
            if (event.key === ' ') {
                IsShootUp = true;              
                return;
            }
        });

        let currentVelocity = this.getVelocity().multiply(deltaTime);
        let newPosition = this.getPosition().add(currentVelocity);
        this.setPosition(newPosition);

        
        layout.drawImage(this.img, this.getCenteredPos().getX(), this.getCenteredPos().getY(), this.getScale(), this.getScale());
this.mProjectiles.forEach(element => {
    element.Draw(layout,deltaTime);
});
    }
}