class Factory extends Autotapper{
    constructor(pPrice)
    {
        super();
        this.mPrice = this.SetPrice(pPrice);
        this.mName = "Factory";
        this.mOriginalPrice = this.mOriginalPrice;
        this.mAmount = 260;
        this.mTiming = 1;
        //this.AddTapper(new Tap(10, 1))
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