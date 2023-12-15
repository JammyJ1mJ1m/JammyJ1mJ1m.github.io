class TapCookie extends Cookie {
    constructor(pPosition, pScale, pVelocity, booly, opacityRate) {
        super(pPosition, pScale, pVelocity, booly);
        this.mOpacityRate = opacityRate;
        this.mOpacity = 1.0;
    }

    lowerOpacity(pDelta) 
    {
        let decrement = 1 / this.mOpacityRate * pDelta;
        this.mOpacity -= decrement;
        if (this.mOpacity < 0.01)
            this.mOpacity = 0.01;
    }

    Run(layout, pDeltaTime) 
    {
        this.lowerOpacity(pDeltaTime);
        layout.globalAlpha = this.mOpacity;
        this.drawCookie(layout, pDeltaTime);
        layout.globalAlpha = 1.0;
    }
}

