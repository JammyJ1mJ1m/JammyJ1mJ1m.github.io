class Grandad extends Autotapper{
    constructor()
    {
        super();
        this.mPrice = this.SetPrice(100);
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
        this.mTappers.push(new Tap(this.mTiming, this.mAmount));
        this.mAmount = this.mTappers.length;
        this.IncreasePrice();
        this.UpdateLabel();
    }
}