class Dictionary
{
    constructor()
    {
        this.mKVPs = [];
    }
    AddKVP(kvp)
    {
        this.mKVPs.push(kvp);
    }

    GetKVPs()
    {
        return this.mKVPs;
    }
}
