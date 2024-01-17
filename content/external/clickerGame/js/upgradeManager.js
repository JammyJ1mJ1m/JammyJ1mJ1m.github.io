class UpgradeManager {
    constructor() {
        this.mUpgradeList = [];

        this.mCPS = 0;

        // upgrades
        this.tapper ;
        this.grandad ;
        this.farm ;
        this.mine ;
        this.factory;
        this.bank ;

        this.pyramid ;
        this.witchTower ;
        this.rocket ;
        this.potionsLab ;
        this.portal ;
        this.timeTravel ;
        this.condenser ;

        this.quantumGlass ;
        this.clover ;
        this.fractal ;
        this.code ;
        this.universe ;
        this.thirdEye ;
        this.player ;

        this.AddAllupgrades();
    }

    AddAllupgrades() {
        this.deleteAllAutos();

        this.tapper = new Tapper(15);
        this.grandad = new Grandad(100);
        this.farm = new Farm(1_100);
        this.mine = new Mine(12_000);
        this.factory = new Factory(130_000);

        this.bank = new Bank(1_400_000);
        this.pyramid = new Pyramid(20_000_000);
        this.witchTower = new WitchTower(330_000_000);
        this.rocket = new Rocket(5_100_000_000);
        this.potionsLab = new PotionsLab(75_000_000_000);

        this.portal = new Portal(1_000_000_000_000);
        this.timeTravel = new TimeTravel(14_000_000_000_000);
        this.condenser = new Condenser(170_000_000_000_000);
        this.quantumGlass = new QuantumGlass(2_100_000_000_000_000);
        this.clover = new Clover(26_000_000_000_000_000);
        
        this.fractal = new Fractal(310_000_000_000_000_000);
        this.code = new Code(71_000_000_000_000_000_000);
        this.universe = new Universe(12_000_000_000_000_000_000_000);
        this.thirdEye = new Thirdeye(1_900_000_000_000_000_000_000_000);
        this.player = new Player(540_000_000_000_000_000_000_000_000);

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

    deleteAllAutos() {
        this.mUpgradeList.forEach(element => {
            element.DeleteLabels();
        });
        this.mUpgradeList = [];
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
                return;
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

    Save(pFile) {
        this.mUpgradeList.forEach(element => {
            pFile = element.Save(pFile);
        });
        return pFile;
    }

    Load(pFile) {
        this.AddAllupgrades();
        for (let i = 1; i < pFile.length; i++) {

            const name = pFile[i].split(":")[0];
            const amount = +pFile[i].split(":")[1];
            if (amount != 0) {

                for (let index = 0; index < amount; index++) {
                    this.AddAuto(name)

                }
            }

        }
    }
}