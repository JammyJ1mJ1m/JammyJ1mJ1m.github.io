class Mine extends Autotapper{
    constructor(pPrice)
    {
        super();
        this.mPrice = this.SetPrice(pPrice);
        this.mName = "Mine";
        this.mOriginalPrice = this.mOriginalPrice;
        this.mAmount = 1;
        this.mTiming = 1;
        this.SetIconX(0);
        this.SetIconY(-240);
        
        this.AddButton()

    }

    AddTapper()
    {
        this.mTappers.push(new Tap(1, 47));
        this.mAmount = this.mTappers.length;
        this.IncreasePrice();
        this.UpdateLabel();
    }
}