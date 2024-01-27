class Geometry extends GraphNode{
    constructor(pPolygon) {
       super();
       this.setType('Geometry');
       this.setPolygon(pPolygon);
    }

    setPolygon(pPolygon) { 
        this.mPolygon = pPolygon;
    }

    getPolygon() { 
        return this.mPolygon;
    }
}