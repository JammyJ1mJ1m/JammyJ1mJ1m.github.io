class Grandad extends Autotapper{
    constructor(pPrice)
    {
        super();
        this.mPrice = this.SetPrice(pPrice);
        this.mName = "Grandad";
        this.mOriginalPrice = this.mOriginalPrice;
        this.mAmount = 0;
        //this.AddTapper(new Tap(10, 1))
    }

    AddTapper()
    {
        this.mTappers.push(new Tap(1, 1));
        this.mAmount = this.mTappers.length;
        this.IncreasePrice();
    }
}