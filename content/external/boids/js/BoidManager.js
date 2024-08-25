class BoidManager {
    constructor(pBoidsAmount) {
        this.mBoidsAmount = pBoidsAmount;

        this.mBoids = [];
        this.mBoidSettings = new Dictionary();
        // ranges for the boid rules
        this.seperationRange = new KVP("seperationRange", 0);
        this.alignmentRange = new KVP("alignmentRange", 0);
        this.cohesionRange = new KVP("cohesionRange", 0);

        // weightings
        this.seperationFactor = new KVP("seperationFactor", 0);
        this.alignmentFactor = new KVP("alignmentFactor", 0);
        this.cohesionFactor = new KVP("cohesionFactor", 0);

        this.boidSpeed = new KVP("boidSpeed", 0);

        this.boundaryHeight = new KVP("boundaryHeight", 0);
        this.boundaryWidth = new KVP("boundaryWidth", 0);
        this.boundaryDepth = new KVP("boundaryDepth", 0);

        this.viewRange = new KVP("viewRange", 0);
        this.viewAngle = new KVP("viewAngle", 0);
        this.maxSpeed = new KVP("maxSpeed", 0);
        this.minSpeed = new KVP("minSpeed", 0);
        this.rotationSpeed = new KVP("rotationSpeed", 0);

        this.mBoidSettings.AddKVP(this.seperationRange);
        this.mBoidSettings.AddKVP(this.alignmentRange);
        this.mBoidSettings.AddKVP(this.cohesionRange);
        this.mBoidSettings.AddKVP(this.seperationFactor);
        this.mBoidSettings.AddKVP(this.alignmentFactor);
        this.mBoidSettings.AddKVP(this.cohesionFactor);
        this.mBoidSettings.AddKVP(this.boidSpeed);
        this.mBoidSettings.AddKVP(this.boundaryHeight);
        this.mBoidSettings.AddKVP(this.boundaryWidth);
        this.mBoidSettings.AddKVP(this.boundaryDepth);
        this.mBoidSettings.AddKVP(this.viewRange);
        this.mBoidSettings.AddKVP(this.viewAngle);
        this.mBoidSettings.AddKVP(this.maxSpeed);
        this.mBoidSettings.AddKVP(this.minSpeed);
        this.mBoidSettings.AddKVP(this.rotationSpeed);

        this.mBoids[0] = new Boid(new Vector(400,400,0),new Vector(10,10,0),0)
    }

    Update(dt) {
        if(this.mBoids.length == 0)
            return;

         this.UpdateBoids(dt);
        // this.DrawBoids();
    }

    UpdateBoids(deltaTime) {
        for (let i = 0; i < 1; i++) {
            this.mBoids[i].UpdateBoid(this.mBoids,deltaTime);
        }
    }

    DrawBoids(pContext) {
        for (let i = 0; i < 1; i++) {
            this.mBoids[i].DrawBoid(pContext);
        }
    }
}