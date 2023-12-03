class KVP
{
    constructor(pKey, pValue)
    {
        this.mKey = pKey;
        this.mValue = pValue
    }

    GetKey()
    {
        return this.mKey;
    }

    GetValue()
    {
        return this.mValue;
    }
    SetValue(pVal)
    {
        this.mValue = pVal;
    }


}