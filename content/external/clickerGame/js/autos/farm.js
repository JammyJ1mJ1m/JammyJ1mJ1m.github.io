class Farm extends Autotapper{
    constructor()
    {
        super();
        
        this.mPrice = this.SetPrice(1_100);
        this.mName = "Farm";
        this.mOriginalPrice = this.mOriginalPrice;
        this.mAmount = 8;
        this.mTiming = 1;
        this.SetIconX(0);
        this.SetIconY(-180);
        
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