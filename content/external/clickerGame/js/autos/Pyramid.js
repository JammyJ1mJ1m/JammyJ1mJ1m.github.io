class Pyramid extends Autotapper{
    constructor(pPrice)
    {
        super();
        this.mPrice = this.SetPrice(pPrice);
        this.mName = "Pyramid";
        this.mOriginalPrice = this.mOriginalPrice;
        this.mAmount = 1400;
        this.mTiming = 1;
        
        this.SetIconX(0);
        this.SetIconY(-420);
        this.AddButton()

    }

    AddTapper()
    {
        this.mTappers.push(new Tap(1, 7800));
        this.mAmount = this.mTappers.length;
        this.IncreasePrice();
        this.UpdateLabel();
    }
}