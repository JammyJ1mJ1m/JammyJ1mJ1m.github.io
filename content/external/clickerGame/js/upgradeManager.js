class UpgradeManager {
    constructor() {
        this.mUpgradeList = [];

        this.mPriceList = new Dictionary();
        this.mPriceList.AddKVP(new KVP("Tapper", 15));
        this.mPriceList.AddKVP(new KVP("Grandad", 100));
        this.mPriceList.AddKVP(new KVP("Farm", 1100));
        this.mPriceList.AddKVP(new KVP("Mine", 12000));
        this.mPriceList.AddKVP(new KVP("Factory", 130000));

// upgrades
 this.tapper = new Tapper(this.mPriceList.GetKVP(0).GetValue());
 this.grandad = new Grandad(this.mPriceList.GetKVP(1).GetValue());
 this.farm = new Farm(this.mPriceList.GetKVP(2).GetValue());
 this.mine = new Mine(this.mPriceList.GetKVP(3).GetValue());
 this.factory = new Factory(this.mPriceList.GetKVP(4).GetValue());

 this.AddUpgrade(this.tapper);
 this.AddUpgrade(this.grandad);
 this.AddUpgrade(this.farm);
 this.AddUpgrade(this.mine);
 this.AddUpgrade(this.factory);

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
           // console.log("Tapper: " + element.GetKey() + ", " + element.GetValue());
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
        else if (pName == "Mine") {
            this.AddMine();
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
        // this.AddUpgrade(new Tap(10, 1, "Tapper", this.mPriceList.GetKVP(0).GetValue()));
         this.tapper.AddTapper();
         let t = this.mPriceList.GetKVP(0);//.SetValue(this.tapper.GetPrice());
         t.SetValue(this.tapper.GetPrice());
        }

     AddGrandad() {
        this.grandad.AddTapper();
        let t = this.mPriceList.GetKVP(1);//.SetValue(this.tapper.GetPrice());
        t.SetValue(this.grandad.GetPrice());
     }

     AddFarm() {
        this.farm.AddTapper();
        let t = this.mPriceList.GetKVP(2);//.SetValue(this.tapper.GetPrice());
        t.SetValue(this.farm.GetPrice());
     }

     AddMine() {
        this.mine.AddTapper();
        let t = this.mPriceList.GetKVP(3);//.SetValue(this.tapper.GetPrice());
        t.SetValue(this.mine.GetPrice());
     }

     AddFactory() { 
        this.factory.AddTapper();
        let t = this.mPriceList.GetKVP(4);//.SetValue(this.tapper.GetPrice());
        t.SetValue(this.factory.GetPrice());
     }
}