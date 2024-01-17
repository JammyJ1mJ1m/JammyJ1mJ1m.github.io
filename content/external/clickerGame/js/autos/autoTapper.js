class Autotapper {
    constructor() {
        this.mPrice = 0;
        //this.mName = "Undefined Name"
        this.mOriginalPrice = 0;
        this.mExponent = 1.15;
        // this.mAmount = 0;
        //this.mTiming = 0;
        this.mTappers = [];

        this.mCostLabel = 0;
        this.mAmountLabel = 0;
        this.mCostDiv = 0;
        this.mAmountDiv = 0;
        this.mContainerDiv = 0;
        this.mIsClicked = false;
        this.mIconX;
        this.mIconY;
    }

    SetIconX(pX)
    {
        this.mIconX = pX;
    }
    

    SetIconY(pY)
    {    
        this.mIconY = pY;
    }
    

    formatCompactNumber(number) {
        const formatter = Intl.NumberFormat("en", { notation: "compact" });
        return formatter.format(number);
    }

    GetClickState() { return this.mIsClicked; }
    SetClickState(pState) { this.mIsClicked = pState; }

    GetCPS() {
        let am = 0;
        let t = this.mTiming;
        let cps = 0;
        this.mTappers.forEach(element => {
            am += element.mClickAmount;
        });
        cps = am / t;
        return cps;
    }

    GetTiming() {
        return this.mTiming;
    }

    GetAmount() {
        return this.mAmount;
    }
    GetName() {
        return this.mName;
    }
    GetPrice() {
        return this.mPrice;
    }
    SetPrice(pPrice) {
        this.mPrice = pPrice;
        this.mOriginalPrice = pPrice;
        return this.GetPrice();
    }


    IncreasePrice() {
        this.mPrice = Math.ceil(this.mOriginalPrice * Math.pow(this.mExponent, this.mAmount));
    }

    DeleteLabels() {
        document.getElementById('ProductDiv').remove();
    }

    AddButton() {
        // this is the main shop div that contains all of the tappers
        let masterDiv = document.getElementById('buttons');

        // main container / product div
        let productDiv = document.createElement('DIV');
        productDiv.setAttribute("id", 'ProductDiv' + this.mName);
        productDiv.setAttribute("class", 'ProductDiv');
        productDiv.addEventListener("click", this.ClickButton.bind(this));
        productDiv.nameParam = this.mName;

        // icon div
        let iconDiv = document.createElement('DIV');
        iconDiv.setAttribute("id", 'IconDiv' + this.mName);
        iconDiv.setAttribute("class", 'IconDiv');
        iconDiv.setAttribute("style", "background-position:" + (+this.mIconX) + "px " + (+this.mIconY) + "px;")


        // container div
        let containerDiv = document.createElement('DIV');
        containerDiv.setAttribute("id", 'ContainerDiv' + this.mName);
        containerDiv.setAttribute("class", 'ContainerDiv');


        // name div
        let nameDiv = document.createElement('DIV');
        nameDiv.setAttribute("id", 'ProductName' + this.mName);
        nameDiv.setAttribute("class", 'ProductName');

        let text = document.createTextNode(this.mName);

        // appending text to button
        nameDiv.appendChild(text);
        //button.appendChild(text2);
        containerDiv.appendChild(nameDiv);
        // add cost
        // add amount
        this.mCostLabel = document.createTextNode("Cost: " + this.mPrice);
        this.mAmountLabel = document.createTextNode("Amount: " + this.mTappers.length);


        // cost div
        this.mCostDiv = document.createElement('DIV')
        this.mCostDiv.setAttribute("id", 'AutoCost' + this.mName);
        this.mCostDiv.setAttribute("class", 'CostDiv');

        const formatter = Intl.NumberFormat('en', { notation: 'compact' });
        const numberToDisplay = formatter.format(this.mPrice);

        this.mCostDiv.innerText = formatLargeNumber(this.mPrice);
        containerDiv.appendChild(this.mCostDiv);

        this.mAmountDiv = document.createElement('DIV')
        this.mAmountDiv.setAttribute("id", 'AutoAmount' + this.mName);

        this.mAmountDiv.setAttribute("class", 'AmountDiv');

        this.mAmountDiv.innerText = this.mTappers.length;
        containerDiv.appendChild(this.mAmountDiv);
        //div.appendChild(this.mAmountLabel);
        productDiv.appendChild(iconDiv);
        productDiv.appendChild(containerDiv);

        masterDiv.appendChild(productDiv);
        return;

    }

    ClickButton(event) {

        event.containerDivParam = document.getElementById('AutoDiv' + event.currentTarget.nameParam);
        this.mIsClicked = true;

    }


    UpdateLabel() {
        this.mCostDiv = document.getElementById('AutoCost' + this.mName);
        this.mAmountDiv = document.getElementById('AutoAmount' + this.mName);

        this.mCostDiv.innerText = formatLargeNumber(this.mPrice);
        this.mAmountDiv.innerText = this.mTappers.length;
    }

    Run(pShop) {
        let amount = 0;
        this.mTappers.forEach(element => {
            let val = element.RunClick();
            if (val[1]) {
                pShop.AddCash(val[0]);
                //createCookie();
                amount++;
            }

        });

        return amount;
        // run the clickers

    }

    Save(pFile) {
        if (this.mTappers.length != 0) {

            pFile += (this.mName + ':' + this.mTappers.length + ';');
            return pFile;
        }
        return pFile;
    }
}