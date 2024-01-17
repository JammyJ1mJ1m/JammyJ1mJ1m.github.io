class Tapper extends Autotapper{
    constructor()
    {
        super();
        
        this.mPrice = this.SetPrice(15);
        this.mName = "Tapper";
        this.mOriginalPrice = this.mOriginalPrice;
        this.mAmount = 1;
        this.mTiming = 10;
        
        this.SetIconX(0);
        this.SetIconY(-60);
        this.AddButton()
        

    }

    AddTapper()
    {
        this.mTappers.push(new Tap(this.mTiming , this.mAmount));
        this.mAmount = this.mTappers.length;
        this.IncreasePrice();
        this.UpdateLabel();
    }
}