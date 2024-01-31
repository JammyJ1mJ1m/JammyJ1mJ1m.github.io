class RenderVisitor {
    constructor(pContext) {
        this.mStack = [];
        this.setContext(pContext);
    }

    setContext(pContext) {
        this.mContext = pContext;
    }

    getContext() {
        return this.mContext;
    }

    visit(pNode) {
        if (pNode.getType() === 'Group') {
            this.visitGroup(pNode);
        }
        if (pNode.getType() === 'Transform') {
            this.visitTransform(pNode);
        }
        if (pNode.getType() === 'Geometry') {
            this.visitGeometry(pNode);
        }
        if (pNode.getType() === 'Image') {
            this.visitImage(pNode);
        }
    }

    visitGroup(pNode) {
        let child;
        for (let i = 0; i < pNode.getNumberOfChildren(); i++) {
            child = pNode.getChildAt(i);
            child.accept(this);
        }
    }

    visitTransform(pNode) {
        this.push(pNode.getTransform());
        this.visitGroup(pNode);
        this.pop();
    }

    visitGeometry(pNode) {
        this.peek().setTransform(this.getContext());
        if (pNode.getPolygon().getType() === "Basic") {
            this.drawPolygon(pNode.getPolygon());
        }

        if (pNode.getPolygon().getType() === "Arc") {
            this.drawArc(pNode.getPolygon());
        }

        if (pNode.getPolygon().getType() === "Circle") {
            this.drawCircle(pNode.getPolygon());
        }
    }

    visitImage(pNode) {
        this.peek().setTransform(this.getContext());
        this.drawImage(pNode);
    }

    pop() {
        this.mStack.pop();
    }

    peek() {
        return this.mStack[this.mStack.length - 1];
    }

    push(pTransform) {
        let newTransform;

        if (this.mStack.length == 0) {
            newTransform = pTransform;
        }
        else {
            let matrix = this.peek();
            newTransform = matrix.multiply(pTransform);
        }

        this.mStack.push(newTransform);
    }

    canvasDrawStart(pPolygon) {
        this.getContext().fillStyle = pPolygon.getFillColour();
        this.getContext().fillStyle = pPolygon.getStrokeColour();
        this.getContext().beginPath();
    }

    canvasDrawEnd() {
        this.getContext().closePath();
        this.getContext().fill();
        this.getContext().stroke();
    }

    drawPolygon(pPolygon) {
        this.canvasDrawStart(pPolygon);

        this.getContext().moveTo(pPolygon.getIndex(0).getX(), pPolygon.getIndex(0).getY());

        for (let i = 1; i < pPolygon.getMVectorsLength(); i++) {
            this.getContext().lineTo(pPolygon.getIndex(i).getX(), pPolygon.getIndex(i).getY());
        }

        this.canvasDrawEnd();
    }

    drawArc(pPolygon) {
        this.canvasDrawStart(pPolygon);

        this.getContext().arc(pPolygon.mVectors[0], pPolygon.mVectors[1], pPolygon.mVectors[2], pPolygon.mVectors[3], pPolygon.mVectors[4], pPolygon.mVectors[5]);

        this.canvasDrawEnd();
    }

    drawCircle(pPolygon) {
        this.canvasDrawStart(pPolygon);


        let pCircleSize = pPolygon.mVectors[0];
        let pSides = pPolygon.mVectors[1];


        let anglePerSegment = Math.PI * 2 / pSides;
        for (let i = 0; i <= pSides; i = i + 1) {
            let angle = anglePerSegment * i;
            let x = pCircleSize * Math.cos(angle);
            let y = pCircleSize * Math.sin(angle);
            if (i == 0) {
                this.getContext().moveTo(x, y);
            }
            else {
                this.getContext().lineTo(x, y);
            }
        }

        this.getContext().arc(pPolygon.mVectors[0], pPolygon.mVectors[1], pPolygon.mVectors[2], pPolygon.mVectors[3], pPolygon.mVectors[4], pPolygon.mVectors[5]);

        this.canvasDrawEnd();
    }

    drawImage(pNode) {
        pNode.mImage.Draw(this.getContext());
    }
}