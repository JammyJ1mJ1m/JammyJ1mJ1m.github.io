class QuantumGlass extends Autotapper{
    constructor()
    {
        super();
        
        this.mPrice = this.SetPrice(2_100_000_000_000_000);
        this.mName = "Quantum Glass";
        this.mOriginalPrice = this.mOriginalPrice;
        this.mAmount = 2900000000;
        this.mTiming = 1;
        
        this.SetIconX(0);
        this.SetIconY(-840);
        this.AddButton()

    }

    AddTapper()
    {
        this.mTappers.push(new Tap(1, 2900000000));
        this.mAmount = this.mTappers.length;
        this.IncreasePrice();
        this.UpdateLabel();
    }
}