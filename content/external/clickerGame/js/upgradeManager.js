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

        this.pyramid = new Pyramid(20000000); 
        this.witchTower = new WitchTower(330000000); 
        this.rocket = new Rocket(5100000000); 
        this.potionsLab = new PotionsLab(75000000000); 
        this.portal = new Portal(1000000000000); 
        this.timeTravel = new TimeTravel(14000000000000);
        this.condenser = new Condenser(170000000000000);

        this.quantumGlass = new QuantumGlass(2100000000000000);
        this.clover = new Clover(26000000000000000);
        this.fractal = new Fractal(310000000000000000);
        this.code = new Code(71000000000000000000);
        this.universe = new Universe(12000000000000000000000);
        this.thirdEye = new Thirdeye(19000000000000000000000000);
        this.player = new Player(5400000000000000000000000000);

        this.AddUpgrade(this.tapper);
        this.AddUpgrade(this.grandad);
        this.AddUpgrade(this.farm);
        this.AddUpgrade(this.mine);
        this.AddUpgrade(this.factory);
        this.AddUpgrade(this.bank);

        this.AddUpgrade(this.pyramid);
        this.AddUpgrade(this.witchTower);
        this.AddUpgrade(this.rocket);
        this.AddUpgrade(this.potionsLab);
        this.AddUpgrade(this.portal);
        this.AddUpgrade(this.timeTravel);
        this.AddUpgrade(this.condenser);
        this.AddUpgrade(this.quantumGlass);
        this.AddUpgrade(this.clover);
        this.AddUpgrade(this.fractal);
        this.AddUpgrade(this.code);
        this.AddUpgrade(this.universe);
        this.AddUpgrade(this.thirdEye);
        this.AddUpgrade(this.player);
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