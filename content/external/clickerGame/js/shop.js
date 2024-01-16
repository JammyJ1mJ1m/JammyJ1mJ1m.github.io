class Shop {
  constructor() {
    this.mCash = 999999999990;

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