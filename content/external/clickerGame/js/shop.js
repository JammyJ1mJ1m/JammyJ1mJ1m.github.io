class Shop {
  constructor() {
    this.mCash = 170000000000000;

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