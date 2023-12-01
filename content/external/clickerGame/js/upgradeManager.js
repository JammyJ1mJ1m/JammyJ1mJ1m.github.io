class UpgradeManager {
    constructor() {
        this.mUpgradeList = [];

        this.mPriceList = new Dictionary();
        this.mPriceList.AddKVP(new KVP("Tapper", 15));
        this.mPriceList.AddKVP(new KVP("Grandad", 100));
        this.mPriceList.AddKVP(new KVP("Farm", 1100));
        this.mPriceList.AddKVP(new KVP("Mine", 12000));
        this.mPriceList.AddKVP(new KVP("Factory", 130000));



        this.currentUpgrade;

    }

    FindPrice(pName) {

        // const upgrades = {
        //     Tapper: 'Tapper',
        //     Grandad: 'Grandad',
        //     Farm: 'Farm',
        // }

        let price = -1;
        this.mPriceList.GetKVPs().forEach(element => {
            console.log("Tapper: " + element.GetKey() + ", " + element.GetValue());
            if (element.GetKey() == pName) {
                price = element.GetValue();

            }
        });
        return price;
    }

    AddAuto(pName) {

        if (pName == "Tapper") {
            this.AddTapper();
        }
        else if (pName == "Grandad") {
            this.AddGrandad();
        }
        else if (pName == "Farm") {
            this.AddFarm();
        }
        else if (pName == "Factory") {
            this.AddFactory();
        }

    }

    AddUpgrade(pUpgrade) {
        this.mUpgradeList.push(pUpgrade);
    }

    GetUpgrades() {
        return this.mUpgradeList;
    }

    AddTapper() {
        // let price = this.mPriceList.GetKVP(0).GetValue();
        this.AddUpgrade(new Tap(10, 1, "Tapper", this.mPriceList.GetKVP(0).GetValue()));
    }

    AddGrandad() {
        this.AddUpgrade(new Tap(1, 1, "Grandad", this.mPriceList.GetKVP(0).GetValue()));
    }

    AddFarm() {
        this.AddUpgrade(new Tap(1, 8, "Farm", this.mPriceList.GetKVP(0).GetValue()));
    }

    AddMine() {
        this.AddUpgrade(new Tap(1, 47, "Mine", this.mPriceList.GetKVP(0).GetValue()));
    }

    AddFactory() {
        this.AddUpgrade(new Tap(1, 260, "Mine", this.mPriceList.GetKVP(0).GetValue()));
    }
}