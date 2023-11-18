class Polygon {
    constructor(pVectors, pFillColour, pStrokeColour, pType) {
        this.mVectors = pVectors;
        this.setFillColour(pFillColour);
        this.setStrokeColour(pStrokeColour);
        this.setType(pType);
    }

    setFillColour(pFillColour) { 
        this.mFillColour = pFillColour;
    }

    getFillColour() { 
        return this.mFillColour;
    }

    setStrokeColour(pStrokeColour) { 
        this.mStrokeColour = pStrokeColour;
    }

    getStrokeColour() { 
        return this.mStrokeColour;
    }

    setType(pType) { 
        this.mType = pType;
    }
    
    getType() { 
        return this.mType;
    }

    getIndex(pIndex) {
        return this.mVectors[pIndex];
    }

    getMVectorsLength() {
        return this.mVectors.length;
    }
    
    draw(pContext, pMatrix) {
        this.drawPolygon(pContext, pMatrix);
    }
}