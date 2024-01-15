class Shop {
  constructor() {
    this.mCash = 0;

  }

  GetCash() {
    return this.mCash;
  }
  AddCash(pCash) {
    this.mCash += pCash;
  }

  BuyAuto(pPrice) {
    if (this.mCash >= pPrice) {
      this.mCash -= pPrice;
      return true;
    }
    return false;
  }
}