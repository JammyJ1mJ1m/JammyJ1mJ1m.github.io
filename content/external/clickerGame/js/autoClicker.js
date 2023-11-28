class AutoClick{
    constructor() {
       this.mMlickRate;
       this.mClickAmount;
       this.mLastClick = Date.now();
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