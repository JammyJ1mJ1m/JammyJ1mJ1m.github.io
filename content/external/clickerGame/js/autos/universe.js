class Universe extends Autotapper{
    constructor()
    {
        super();
        
        this.mPrice = this.SetPrice(12_000_000_000_000_000_000_000);
        this.mName = "Universe";
        this.mOriginalPrice = this.mOriginalPrice;
        this.mAmount = 8300000000000;
        this.mTiming = 1;
        
        this.SetIconX(0);
        this.SetIconY(-1080);
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