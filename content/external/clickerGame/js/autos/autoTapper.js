class Autotapper{
    constructor()
    {
        this.mPrice = 0;
        this.mName = "UndefinedName"
        this.mOriginalPrice = 0;
        this.mExponent = 0;
        this.mAmount = 0;
        this.mTappers = [];
    }

    GetPrice()
    {
        return this.mPrice;
    }
    SetPrice(pPrice)
    {
        this.mPrice = pPrice;
        this.mOriginalPrice = pPrice;
        // return this.GetPrice();
    }

    // AddTapper(pTapper)
    // {
    //     this.mTappers.push(pTapper);
    //     this.mAmount = this.mTappers.length;
    //     this.IncreasePrice();
    // }

    IncreasePrice()
    {
        this.mPrice = Math.ceil(this.mOriginalPrice * 1.15 * this.mAmount);
    }

    Run(pShop)
    {
        let amount = 0;
        this.mTappers.forEach(element => {
            let val = element.RunClick();
            if (val[1]) {
                pShop.AddCash(val[0]) ;
                //createCookie();
                amount++;
            }

        });
        return amount;
        // run the clickers

    }
}