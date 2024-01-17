class PotionsLab extends Autotapper{
    constructor()
    {
        super();
        
        this.mPrice = this.SetPrice(75_000_000_000);
        this.mName = "Potions Lab";
        this.mOriginalPrice = this.mOriginalPrice;
        this.mAmount = 1600000;
        this.mTiming = 1;
        
        this.SetIconX(0);
        this.SetIconY(-600);
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