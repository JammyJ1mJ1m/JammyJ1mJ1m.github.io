class Shop{

    constructor() {
<<<<<<< Updated upstream
        this.mCash = 0;   
=======
        console.log("This is the shop")
        this.mCash = 99999999;   
>>>>>>> Stashed changes
    }

    GetCash()
    {
      return this.mCash;
    }
    AddCash(pCash)
    {
      this.mCash += pCash;
    }

    BuyAuto(pPrice)
    {
      if(this.mCash >= pPrice)
      {
        this.mCash -= pPrice;
        return true;
      }
      return false;
    }  
}