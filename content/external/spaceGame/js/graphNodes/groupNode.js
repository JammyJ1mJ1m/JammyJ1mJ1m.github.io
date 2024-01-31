class Group extends GraphNode{
    constructor(pName) {
        super();
        this.mName = pName;
        this.setType('Group');
        this.setChildren();
    }
    setChildren() { 
        this.mChildren = [];
    }

    getChildren() {
        return this.mChildren;
    }

    addChild(pParameter) { 
        this.mChildren.push(pParameter);
    }

    getChildAt(index) { 
        return this.mChildren[index];
    } 

    getNumberOfChildren() {
        return this.mChildren.length;
    }
}