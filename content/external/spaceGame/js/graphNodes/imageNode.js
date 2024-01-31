class ImageNode extends GraphNode{
    constructor(pImage) {
       super();
       this.setType('Image');
       this.setImage(pImage);
    }

    setImage(pImage) { 
        this.mImage = pImage;
    }

    getImage() { 
        return this.mImage;
    }
}