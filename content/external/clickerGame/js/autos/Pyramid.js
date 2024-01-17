class Pyramid extends Autotapper{
    constructor()
    {
        super();

        this.mPrice = this.SetPrice(20_000_000);
        this.mName = "Pyramid";
        this.mOriginalPrice = this.mOriginalPrice;
        this.mAmount = 7800;
        this.mTiming = 1;
        
        this.SetIconX(0);
        this.SetIconY(-420);
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