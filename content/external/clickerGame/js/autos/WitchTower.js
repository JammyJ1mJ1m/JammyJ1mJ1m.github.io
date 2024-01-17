class WitchTower extends Autotapper{
    constructor()
    {
        super();
        
        this.mPrice = this.SetPrice(330_000_000);
        this.mName = "Witch Tower";
        this.mOriginalPrice = this.mOriginalPrice;
        this.mAmount = 44000;
        this.mTiming = 1;
        
        this.SetIconX(0);
        this.SetIconY(-480);
        this.AddButton()

    }

    AddTapper()
    {
        this.mTappers.push(new Tap(this.mTiming, this.mAmount));
        this.mAmount = this.mTappers.length;
        this.IncreasePrice();
        this.UpdateLabel();
    }
}