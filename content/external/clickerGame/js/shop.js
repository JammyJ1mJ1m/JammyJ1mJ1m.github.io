class Shop{

    constructor() {
        console.log("This is the shop")
        this.mCash = 0;   
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
        // return and call the upgrade manager in parent
      }
      return false;
    }

    
}
