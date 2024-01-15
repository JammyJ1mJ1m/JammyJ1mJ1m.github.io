class UpgradeManager {
    constructor() {
        this.mUpgradeList = [];

        this.mCPS = 0;

        // upgrades
        this.tapper = new Tapper(15);
        this.grandad = new Grandad(100);
        this.farm = new Farm(1100);
        this.mine = new Mine(12000);
        this.factory = new Factory(130000);
        this.bank = new Bank(1400000);

        this.AddUpgrade(this.tapper);
        this.AddUpgrade(this.grandad);
        this.AddUpgrade(this.farm);
        this.AddUpgrade(this.mine);
        this.AddUpgrade(this.factory);
        this.AddUpgrade(this.bank);
    }

    FindPrice(pName) {
        let price = -1;
        this.mUpgradeList.forEach(element => {
            if (element.GetName() == pName) {
                price = element.GetPrice();
            }
        });
        return price;
    }

    AddAuto(pName) {
        this.mUpgradeList.forEach(element => {
            if (element.GetName() == pName) {
                element.AddTapper();
            }
        });
    }
    getCPS() {
        this.mCPS = 0;
        this.mUpgradeList.forEach(element => {
            this.mCPS += element.GetCPS();
        });
        return this.mCPS;
    }
    AddUpgrade(pUpgrade) {
        this.mUpgradeList.push(pUpgrade);
    }

    GetUpgrades() {
        return this.mUpgradeList;
    }
}