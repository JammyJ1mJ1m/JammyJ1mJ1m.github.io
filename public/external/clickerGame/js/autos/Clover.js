class Clover extends Autotapper{
    constructor()
    {
        super();
        
        this.mPrice = this.SetPrice(26_000_000_000_000_000);
        this.mName = "Clover";
        this.mOriginalPrice = this.mOriginalPrice;
        this.mAmount = 21000000000;
        this.mTiming = 1;
        
        this.SetIconX(0);
        this.SetIconY(-900);
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