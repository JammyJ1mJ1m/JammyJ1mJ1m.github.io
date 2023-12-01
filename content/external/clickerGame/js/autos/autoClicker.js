class AutoClick{
    constructor() {
       this.mMlickRate;
       this.mClickAmount;
       this.mLastClick = Date.now();
       this.mName;
       this.mPrice;
    }

    GetClickrate(){
        return this.mClickRate * 1000;
    }

    SetClickRate(pRate){
        this.mClickRate = pRate;
    }

    GetClickAmount()
    {
        return this.mClickAmount;
    }
    SetClickAmount(pAmount){
        this.mClickAmount = pAmount;
    }

    GetName(){
        return this.mName;
    }

    SetName(pName)
    {
        this.mName = pName;
    }


    RunClick()
    {
        if(Date.now() > this.mLastClick + this.GetClickrate())
        {
            this.mLastClick =  Date.now();
            return [this.GetClickAmount(),true];
        }
        return 0;
    }
}