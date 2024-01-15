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
    }

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

    // AddTapper(pTapper)
    // {
    //     this.mTappers.push(pTapper);
    //     this.mAmount = this.mTappers.length;
    //     this.IncreasePrice();
    // }

    IncreasePrice() {
        this.mPrice = Math.ceil(this.mOriginalPrice * Math.pow(this.mExponent, this.mAmount));
    }

    AddButton() {

        let buttonDiv = document.getElementById('buttons');
        let button = document.createElement('BUTTON');
        button.setAttribute("id", 'AutoButton' + this.mName);
        button.setAttribute("class", 'AutoButton');
        button.setAttribute("onClick", "Test(" + "'" + this.mName + "'" + ");");

        let div = document.createElement('DIV');
        div.setAttribute("id", 'AutoDiv');
        div.setAttribute("class", 'AutoDiv');

        let text = document.createTextNode(this.mName);
        // let text2 = document.createTextNode(" ...Test");

        // appending text to button
        button.appendChild(text);
        //button.appendChild(text2);
        div.appendChild(button);
        // add cost 
        // add amount
        this.mCostLabel = document.createTextNode("Cost: " + this.mPrice);
        this.mAmountLabel = document.createTextNode("Amount: " + this.mTappers.length);

        this.mCostDiv = document.createElement('DIV')
        this.mCostDiv.setAttribute("class", 'CostDiv');

        this.mCostDiv.innerText = "Cost: " + this.mPrice;
        div.appendChild(this.mCostDiv);

        this.mAmountDiv = document.createElement('DIV')
        this.mAmountDiv.setAttribute("class", 'AmountDiv');

        this.mAmountDiv.innerText = "Amount: " + this.mTappers.length;
        div.appendChild(this.mAmountDiv);
        //div.appendChild(this.mAmountLabel);


        buttonDiv.appendChild(div);
        return;

    }

    UpdateLabel() {
        this.mCostDiv.innerText = "Cost: " + this.mPrice;
        this.mAmountDiv.innerText = "Amount: " + this.mTappers.length;
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
}