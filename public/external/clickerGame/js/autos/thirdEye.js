class Thirdeye extends Autotapper{
    constructor()
    {
        super();
        
        this.mPrice = this.SetPrice(1_900_000_000_000_000_000_000_000);
        this.mName = "Thirdeye";
        this.mOriginalPrice = this.mOriginalPrice;
        this.mAmount = 64000000000000;
        this.mTiming = 1;
        
        this.SetIconX(0);
        this.SetIconY(-1140);
        this.AddButton()

    }

    AddTapper()
    {
        this.mTappers.push(new Tap(this.mTiming, this.mAmount));
        this.IncrementTotalAmount();
        //this.mAmount = this.GetTotalAmount();
        this.IncreasePrice();
        this.UpdateLabel();
    }
}