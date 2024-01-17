class Player extends Autotapper{
    constructor()
    {
        super();
        this.mPrice = this.SetPrice(540_000_000_000_000_000_000_000_000);
        this.mName = "Player";
        this.mOriginalPrice = this.mOriginalPrice;
        this.mAmount = 510000000000000;
        this.mTiming = 1;
        
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