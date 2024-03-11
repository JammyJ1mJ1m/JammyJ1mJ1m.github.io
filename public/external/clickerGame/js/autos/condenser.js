class Condenser extends Autotapper{
    constructor()
    {
        super();
        
        this.mPrice = this.SetPrice(170_000_000_000_000);
        this.mName = "Cookie Condenser";
        this.mOriginalPrice = this.mOriginalPrice;
        this.mAmount = 430000000;
        this.mTiming = 1;
        
        this.SetIconX(0);
        this.SetIconY(-780);
        this.AddButton()

    }

    AddTapper()
    {
        this.mTappers.push(new Tap( this.mTiming , this.mAmount));
        this.IncrementTotalAmount();
        //this.mAmount = this.GetTotalAmount();
        this.IncreasePrice();
        this.UpdateLabel();
    }
}