class Portal extends Autotapper{
    constructor()
    {
        super();
        
        this.mPrice = this.SetPrice(1_000_000_000_000);
        this.mName = "Portal";
        this.mOriginalPrice = this.mOriginalPrice;
        this.mAmount = 10000000;
        this.mTiming = 1;
        
        this.SetIconX(0);
        this.SetIconY(-660);
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