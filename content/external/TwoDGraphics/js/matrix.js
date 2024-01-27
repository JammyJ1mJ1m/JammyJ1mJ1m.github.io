class Matrix {
    constructor(pTopLeft, pTopCenter, pTopRight, pCenterLeft, pCenterCenter, pCenterRight, pBottomLeft, pBottomCenter, pBottomRight) {
        this.mMatrix = this.create2DArray(3, 3);
        this.setElement(0, 0, pTopLeft);
        this.setElement(0, 1, pTopCenter);
        this.setElement(0, 2, pTopRight);
        this.setElement(1, 0, pCenterLeft);
        this.setElement(1, 1, pCenterCenter);
        this.setElement(1, 2, pCenterRight);
        this.setElement(2, 0, pBottomLeft);
        this.setElement(2, 1, pBottomCenter);
        this.setElement(2, 2, pBottomRight);
    }
    setElement(pElementOne, pElementTwo, pValue) {
        this.mMatrix[pElementOne][pElementTwo] = pValue;
    }

    getElement(pElementOne, pElementTwo) {
        return this.mMatrix[pElementOne][pElementTwo];
    }

    create2DArray(pRows, pCols) {
        let array = [];
        for (let i = 0; i < pRows; i++) {
            for (let j = 0; j < pCols; j++) {
                array[i] = [];
            }
        }
        return array;
    }

    static createIdentity() {
        return new Matrix(1, 0, 0, 0, 1, 0, 0, 0, 1);;
    }

    static createTranslation(pVector) {
        return new Matrix(1, 0, pVector.getX(), 0, 1, pVector.getY(), 0, 0, 1);;
    }

    static createScale(pVector) {
        return new Matrix(pVector.getX(), 0, 0, 0, pVector.getY(), 0, 0, 0, 1);;
    }

    static createRotation(pScalar) {
        return new Matrix(Math.cos(pScalar), -Math.sin(pScalar), 0, Math.sin(pScalar), Math.cos(pScalar), 0, 0, 0, 1);;
    }

    multiply(pMatrix) {
        let downVectorNums = [];
        let acrossVectorNums = [];
        let vectorThisArray = [];
        let vectorParray = [];

        for (let i = 0; i < this.mMatrix.length; i++) {
            downVectorNums.push(this.mMatrix[i]);
        }

        for (let i = 0; i < this.mMatrix.length; i++) {
            let numArray = [];
            for (let j = 0; j < this.mMatrix.length; j++) {
                numArray.push(pMatrix.getElement(j, i));
            }
            acrossVectorNums.push(numArray);
        }

        for (let i = 0; i < downVectorNums.length; i++) {
            vectorThisArray.push(new Vector(downVectorNums[i][0], downVectorNums[i][1], downVectorNums[i][2]));
            vectorParray.push(new Vector(acrossVectorNums[i][0], acrossVectorNums[i][1], acrossVectorNums[i][2]));
        }

        let finalMatrix = new Matrix(0, 0, 0, 0, 0, 0, 0, 0, 0);

        for (let i = 0; i < finalMatrix.mMatrix.length; i++) {
            for (let j = 0; j < finalMatrix.mMatrix.length; j++) {
                finalMatrix.setElement(i, j, vectorThisArray[i].dotProduct(vectorParray[j]));
            }

        }

        return finalMatrix;
    }

    multiplyVector(pVector) {
        let downVectorNums = [];
        let acrossVectorNums = [];

        let vectorThisArray = [];

        let finalVector = new Vector(0, 0, 0);

        for (let i = 0; i < this.mMatrix.length; i++) {
            downVectorNums.push(this.mMatrix[i]);
        }

        for (let i = 0; i < downVectorNums.length; i++) {
            vectorThisArray.push(new Vector(downVectorNums[i][0], downVectorNums[i][1], downVectorNums[i][2]));
        }

        for (let i = 0; i < downVectorNums.length; i++) {
            acrossVectorNums.push(vectorThisArray[i].dotProduct(pVector));

        }
        finalVector.setVectorValues(acrossVectorNums[0],acrossVectorNums[1],acrossVectorNums[2])

        return finalVector;
    }

    setTransform(pContext) {
        pContext.setTransform(this.getElement(0,0),this.getElement(1,0),this.getElement(0,1),this.getElement(1,1),this.getElement(0,2),this.getElement(1,2));
    }

    transform(pContext) {
        pContext.transform(this.getElement(0,0),this.getElement(1,0),this.getElement(0,1),this.getElement(1,1),this.getElement(0,2),this.getElement(1,2));
    }
}