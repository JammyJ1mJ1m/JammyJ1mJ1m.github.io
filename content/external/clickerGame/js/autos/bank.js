class Bank extends Autotapper{
    constructor()
    {
        super();
        
        this.mPrice = this.SetPrice(1_400_000);
        this.mName = "Bank";
        this.mOriginalPrice = this.mOriginalPrice;
        this.mAmount = 1400;
        this.mTiming = 1;
        
        this.SetIconX(0);
        this.SetIconY(-360);
        this.AddButton()

    }

    AddTapper()
    {
        this.mTappers.push(new Tap(this.mTiming,  this.mAmount));
        this.mAmount = this.mTappers.length;
        this.IncreasePrice();
        this.UpdateLabel();
    }
}