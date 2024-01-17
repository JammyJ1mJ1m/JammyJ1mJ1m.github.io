class Code extends Autotapper{
    constructor()
    {
        super();
        
        this.mPrice = this.SetPrice(71_000_000_000_000_000_000);
        this.mName = "Code";
        this.mOriginalPrice = this.mOriginalPrice;
        this.mAmount = 1100000000000;
        this.mTiming = 1;
        
        this.SetIconX(0);
        this.SetIconY(-1020);
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