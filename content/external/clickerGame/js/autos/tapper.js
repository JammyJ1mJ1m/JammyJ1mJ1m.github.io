class Tapper extends Autotapper{
    constructor(pPrice)
    {
        super();
        this.mPrice = this.SetPrice(pPrice);
        this.mName = "Tapper";
        this.mOriginalPrice = this.mOriginalPrice;
        this.mAmount = 0;
        //this.AddTapper(new Tap(10, 1))
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