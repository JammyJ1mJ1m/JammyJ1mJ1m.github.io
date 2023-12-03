class Farm extends Autotapper{
    constructor(pPrice)
    {
        super();
        this.mPrice = this.SetPrice(pPrice);
        this.mName = "Farm";
        this.mOriginalPrice = this.mOriginalPrice;
        this.mAmount = 0;
        //this.AddTapper(new Tap(10, 1))
    }

    AddTapper()
    {
        this.mTappers.push(new Tap(1, 8));
        this.mAmount = this.mTappers.length;
        this.IncreasePrice();
    }
}