class Vector {
    constructor(pX, pY, pZ) {
        this.setX(pX);
        this.setY(pY);
        this.setZ(pZ);
    }
    getX() {
        return this.mX;
    }
    setX(pX) {
        this.mX = pX;
    }

    getY() {
        return this.mY;
    }
    setY(pY) {
        this.mY = pY;
    }

    getZ() {
        return this.mZ;
    }
    setZ(pZ) {
        this.mZ = pZ;
    }

    add(pVector) {
        pVector.setVectorValues(this.getX() + pVector.getX(), this.getY() + pVector.getY(), this.getZ() + pVector.getZ())
        return pVector;
    }

    subtract(pVector) {
        pVector.setVectorValues(this.getX() - pVector.getX(), this.getY() - pVector.getY(),this.getZ() - pVector.getZ())
        return pVector;
    }

    multiply(pScalar) {
        let vector = new Vector(this.getX() * pScalar, this.getY() * pScalar, this.getZ() * pScalar);
        return vector;
    }

    divide(pScalar) {
        let vector = new Vector(this.getX() / pScalar, this.getY() / pScalar, this.getZ() / pScalar);
        return vector;
    }

    magnitude() {
        let mag = Math.sqrt((this.getX() * this.getX()) + (this.getY() * this.getY()) + (this.getZ() * this.getZ()));
        return mag;
    }

    normalise() {
        let mag = this.magnitude();
        return this.divide(mag);
    }

    limitTo(pScalar) {
        let mag = this.magnitude();
        let vector = new Vector(this.getX(), this.getY(), this.getZ());
        if (mag > pScalar) {
            vector = this.normalise();

            vector.setVectorValues(vector.getY() * pScalar, vector.getZ() * pScalar, vector.getX() * pScalar)
        }
        return vector;
    }

    dotProduct(pVector) {
        let angle = this.getX() * pVector.getX() + this.getY() * pVector.getY() + this.getZ() * pVector.getZ();
        return angle;
    }

    interpolate(pBVector, pScalar) {
        let newVector = new Vector(0, 0, 0);

        newVector.setVectorValues(pBVector.getX() - this.getX(),pBVector.getY() - this.getY(),pBVector.getZ() - this.getZ());
        newVector.setVectorValues(this.getX() + (newVector.getX() * pScalar),this.getY() + (newVector.getY() * pScalar),this.getZ() + (newVector.getZ() * pScalar));

        return newVector;
    }

    rotate(pScalar) {
        let newVector = new Vector(0, 0, 0);
        newVector.setX(Math.cos(pScalar) * this.getX() - (Math.sin(pScalar) * this.getY()));
        newVector.setY(Math.sin(pScalar) * this.getX() + Math.cos(pScalar) * this.getY());
        
        return newVector;
    }

    angleBetween(pVector) {
        return Math.acos(this.dotProduct(pVector) / this.magnitude(new Vector(this.getX(), this.getY(), this.getZ())) * this.magnitude(pVector));
    }

    setVectorValues(pX,pY,pZ) { 
        this.setX(pX)
        this.setY(pY)
        this.setZ(pZ)

        return this;
    }
}