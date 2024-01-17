class Rocket extends Autotapper{
    constructor()
    {
        super();
        
        this.mPrice = this.SetPrice(5_100_000_000);
        this.mName = "Rocket";
        this.mOriginalPrice = this.mOriginalPrice;
        this.mAmount = 260000;
        this.mTiming = 1;
        
        this.SetIconX(0);
        this.SetIconY(-540);
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