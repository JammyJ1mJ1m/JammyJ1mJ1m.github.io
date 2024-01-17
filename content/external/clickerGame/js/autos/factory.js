class Factory extends Autotapper{
    constructor(pPrice)
    {
        super();
        this.mPrice = this.SetPrice(pPrice);
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
        this.mTappers.push(new Tap(1, 260));
        this.mAmount = this.mTappers.length;
        this.IncreasePrice();
        this.UpdateLabel();
    }
}