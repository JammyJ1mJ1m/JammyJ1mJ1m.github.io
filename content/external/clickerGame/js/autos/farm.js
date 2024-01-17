class Farm extends Autotapper{
    constructor(pPrice)
    {
        super();
        this.mPrice = this.SetPrice(pPrice);
        this.mName = "Farm";
        this.mOriginalPrice = this.mOriginalPrice;
        this.mAmount = 8;
        this.mTiming = 1;
        this.SetIconX(0);
        this.SetIconY(-180);
        //this.AddTapper(new Tap(10, 1))
        this.AddButton()

    }

    AddTapper()
    {
        this.mTappers.push(new Tap(1, 8));
        this.mAmount = this.mTappers.length;
        this.IncreasePrice();
        this.UpdateLabel();
    }
}