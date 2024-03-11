class Factory extends Autotapper{
    constructor()
    {
        super();

        this.mPrice = this.SetPrice(130_000);
        this.mName = "Factory";
        this.mOriginalPrice = this.mOriginalPrice;
        this.mAmount = 260;
        this.mTiming = 1;
        
        this.SetIconX(0);
        this.SetIconY(-300);
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