class Transform extends Group{
    constructor(pTransform) {
        super();
        this.setType('Transform');
        this.setTransform(pTransform); 
    }

    setTransform (pTransform) {
        this.mLocalMatrix = pTransform;
    }

    getTransform () {
        return this.mLocalMatrix;
    }   
}