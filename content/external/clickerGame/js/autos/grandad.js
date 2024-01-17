class Grandad extends Autotapper{
    constructor(pPrice)
    {
        super();
        this.mPrice = this.SetPrice(pPrice);
        this.mName = "Grandad";
        this.mOriginalPrice = this.mOriginalPrice;
        this.mAmount = 1;
        this.mTiming = 1;
        
        this.SetIconX(0);
        this.SetIconY(-120);
        this.AddButton()
        

    }

    AddTapper()
    {
        this.mTappers.push(new Tap(1, 1));
        this.mAmount = this.mTappers.length;
        this.IncreasePrice();
        this.UpdateLabel();
    }
}