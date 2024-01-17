class Tapper extends Autotapper{
    constructor(pPrice)
    {
        super();
        this.mPrice = this.SetPrice(pPrice);
        this.mName = "Tapper";
        this.mOriginalPrice = this.mOriginalPrice;
        this.mAmount = 1;
        this.mTiming = 10;
        //this.AddTapper(new Tap(10, 1))
        this.SetIconX(0);
        this.SetIconY(-60);
        this.AddButton()
        //this.UpdateLabel();

    }

    AddTapper()
    {
        this.mTappers.push(new Tap(10, 1));
        this.mAmount = this.mTappers.length;
        this.IncreasePrice();
        this.UpdateLabel();
    }
}