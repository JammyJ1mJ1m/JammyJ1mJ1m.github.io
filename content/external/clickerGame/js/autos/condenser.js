class Condenser extends Autotapper{
    constructor(pPrice)
    {
        super();
        this.mPrice = this.SetPrice(pPrice);
        this.mName = "Cookie Condenser";
        this.mOriginalPrice = this.mOriginalPrice;
        this.mAmount = 1400;
        this.mTiming = 1;
        
        this.SetIconX(0);
        this.SetIconY(-780);
        this.AddButton()

    }

    AddTapper()
    {
        this.mTappers.push(new Tap(1, 430000000));
        this.mAmount = this.mTappers.length;
        this.IncreasePrice();
        this.UpdateLabel();
    }
}