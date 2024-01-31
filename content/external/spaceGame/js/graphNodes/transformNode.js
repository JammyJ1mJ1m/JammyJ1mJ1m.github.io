class Transform extends Group{
    constructor(pTransform) {
        super();
        this.mName = "transformNode"
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