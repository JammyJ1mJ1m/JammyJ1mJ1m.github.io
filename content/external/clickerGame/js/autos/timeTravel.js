class TimeTravel extends Autotapper{
    constructor()
    {
        super();
        
        this.mPrice = this.SetPrice(14_000_000_000_000);
        this.mName = "Time Travel";
        this.mOriginalPrice = this.mOriginalPrice;
        this.mAmount = 65000000;
        this.mTiming = 1;
        
        this.SetIconX(0);
        this.SetIconY(-720);
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