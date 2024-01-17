class Mine extends Autotapper{
    constructor()
    {
        super();
        
        this.mPrice = this.SetPrice(12_000);
        this.mName = "Mine";
        this.mOriginalPrice = this.mOriginalPrice;
        this.mAmount = 47;
        this.mTiming = 1;
        this.SetIconX(0);
        this.SetIconY(-240);
        
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