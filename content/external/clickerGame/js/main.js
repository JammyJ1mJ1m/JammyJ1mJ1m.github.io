let upgradeManager = new UpgradeManager();
let MainShop = new Shop();

function checkTapperClick() {
    upgradeManager.GetUpgrades().forEach(element => {

        if (element.GetClickState()) {
            element.SetClickState(false);
            console.log('trying to buy an upgrade')
            Test(element.GetName());

        }
    });
}

function Test(p) {
    // TODO get the price of the auto from upgrade manager
    let price = upgradeManager.FindPrice(p);

    if (MainShop.BuyAuto(price)) {
        upgradeManager.AddAuto(p);
    }
}
function Save() {
    let saveContent = 'cash:' + MainShop.GetCash() + ';';
    saveContent = upgradeManager.Save(saveContent);

    var fileName = "CookieSave.txt";
    var myFile = new Blob([saveContent], { type: 'text/plain' });

    window.URL = window.URL || window.webkitURL;
    var dlBtn = document.getElementById("download");

    dlBtn.setAttribute("href", window.URL.createObjectURL(myFile));
    dlBtn.setAttribute("download", fileName);

}

function Load() {
    let input = document.getElementById("loadInput");
    let inputData = input.value;
    if (inputData == '') {
        alert("Cannot load data");
        return;
    }

    const argsArr = inputData.split(";");
    const cash = argsArr[0].split(":")[1];
    if (cash != null) {
        MainShop.SetCash(+cash);
    }

    upgradeManager.Load(argsArr)

    //document.body.appendChild(x);
}

/// formats a large number with a 
function formatLargeNumber(number) {
    const units = {
        veryLongNumber: 102,
        duotrigintillion: 99,
        untrigintillion: 96,
        trigintillion: 93,
        novemvigintillion: 90,
        octovigintillion: 87,
        septenvigintillion: 84,
        sexvigintillion: 81,
        quinvigintillion: 78,
        quattuorvigintillion: 75,
        trevigintillion: 72,
        duovigintillion: 69,
        unvigintillion: 66,
        Vigintillion: 63,
        Novemdecillion: 60,
        Octodecillion: 57,
        Septendecillion: 54,
        Sexdecillion: 51,
        Quindecillion: 48,
        Quattuordecillion: 45,
        Tredecillion: 42,
        Duodecillion: 39,
        Undecillion: 36,
        Decillion: 33,
        Nonillion: 30,
        Octillion: 27,
        septillion: 24,
        quintillion: 21,
        sextillion: 18,
        quadrillion: 15,
        trillion: 12,
        billion: 9,
        million: 6,
        thousand: 3,
        none: 0,
    };


    let unit;
    for (unit in units) {
        if (Math.abs(number) >= 10 ** units[unit]) {
            break;
        }
    }

    if (unit != 'none' && unit != 'thousand') {
        const unitValue = Math.pow(10, units[unit]);
        const wholeNumber = Math.floor(Math.abs(number) / unitValue);
        const fractionalPart = Math.abs(number) % unitValue;

        const formattedNumber = wholeNumber.toLocaleString("en-US");

        if (fractionalPart > 0) {
            const formattedFraction = Math.floor(fractionalPart / (unitValue / 1000)).toLocaleString("en-US", {
                maximumFractionDigits: 1,
            });
            return `${formattedNumber}.${formattedFraction} ${unit}`;
        } else {
            return `${formattedNumber} ${unit}`;
        }
    }
    else {
        return number.toLocaleString();
    }
}

function isMobile() {
    return ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0);
}

function setupCanvas() {

    let cookieSize = 400;
    let canvasWidth = 720;
    let canvasHeight = 880;

    if (isMobile()) {
        cookieSize = 100;
        canvasWidth = 220;
        canvasHeight = 580;

        //alert("This is a mobile device.");
    }



    let layout;
    let tapCount = 0;
    let cookieList = [];
    let tappedCookies = [];
    let autoList = [];
    let lastClickTime = Date.now();
    let isDonut = false;
    let IsClickUp = true;
    let lastTime = Date.now();
    let mousePos = new Vector(0, 0);
    let newDistance = -1;

    let goldCookieLimit = 1500;

    let isClickable = false;

    var canvas = document.getElementById("canvas");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    let BigCookie = new Cookie(new Vector(canvas.clientWidth / 2, canvas.clientHeight / 2), cookieSize, new Vector(0, 0), false, layout);
    let cheatCode = '';
    //let myTapper = new Tapper();


    if (canvas.getContext) {
        layout = canvas.getContext('2d');
    }


    //=======================================================
    //                    Events
    //=======================================================
    let screenLog = document.querySelector("#screen-log");
    document.addEventListener("mousemove", logKey);

    function logKey(e) {
        mousePos = getMousePos(canvas, e);
    }

    var body = document.querySelector("body");
    body.addEventListener("keydown", (event) => {
        if (IsClickUp && event.key === ' ') {
            // console.log("key")
            MainShop.AddCash(1);
            createCookie(cookieList);
            IsClickUp = false;
            BigCookie.click();
        }
    });

    body.addEventListener("keydown", (event) => {
        if (event.key === "d") {
            this.isDonut = !this.isDonut;
            for (let index = 0; index < cookieList.length; index++) {
                cookieList[index].setDonut(this.isDonut);
            }
            BigCookie.setDonut(this.isDonut);
        }

        if (event.key === "m") {
            cheatCode = 'm';
        }

    });

    body.addEventListener("keyup", (event) => {
        if (event.key === ' ') {
            IsClickUp = true;
            return;
        }
    });

    body.addEventListener("mousedown", (event) => {
        if (isClickable) {
            MainShop.AddCash(1);
            createCookie(cookieList);
            BigCookie.click();
            createTapCookie();
        }
    });

    initialiseSceneGraph();

    animationLoop();


    //=======================================================
    //                    functions 
    //=======================================================



    function AddButton(pName) {
        let buttonDiv = document.getElementById('buttons');
        let button = document.createElement('BUTTON');
        button.setAttribute("id", 'AutoButton' + pName);
        button.setAttribute("class", 'AutoButton');
        button.setAttribute("onClick", "Test(" + "'" + pName + "'" + ");");

        let div = document.createElement('DIV');
        div.setAttribute("id", 'AutoDiv' + pName);

        let text = document.createTextNode(pName);
        let text2 = document.createTextNode(" ...Test");

        // appending text to button
        button.appendChild(text);
        button.appendChild(text2);
        div.appendChild(button);
        buttonDiv.appendChild(div);
        return;
    }

    // function AddAutoButtons() {
    //     AddButton("Tapper")
    //     AddButton("Grandad")
    //     AddButton("Farm")
    //     AddButton("Mine")
    //     AddButton("Factory")
    // }
    // AddAutoButtons();


    // returns the distance between a point and a circle
    function calculateDistance(pMousePos, pBigCookieCenter) {
        let distX = pMousePos.getX() - pBigCookieCenter.getPosition().getX() - pBigCookieCenter.getScale() / 2;
        let distY = pMousePos.getY() - pBigCookieCenter.getPosition().getY() - pBigCookieCenter.getScale() / 2;
        let distance = Math.sqrt((distX * distX) + (distY * distY));
        newDistance = distance;
        return distance;
    }

    function getMousePos(canvas, evt) {
        if (evt != null) {
            var rect = canvas.getBoundingClientRect();
            return new Vector(evt.clientX - rect.left, evt.clientY - rect.top);
        }
    }

    function initialiseSceneGraph() {
        let rootTransform, originNode, originTranslation, housesNode, house, sun;
        let originVector = new Vector(canvas.clientWidth, canvas.clientHeight, 0);
        originVector = originVector.multiply(0.5);
        let originMatrix = Matrix.createTranslation(originVector);

        rootNode = new Group();
        rootTransform = new Transform(originMatrix);

        rootNode.addChild(rootTransform);
    }


    function drawText(pFPS, pPos, pFont) {
        layout.lineJoin = 'round';
        layout.setTransform(layout);
        layout.font = pFont;
        layout.textAlign = "center";

        layout.fillStyle = "#000000";
        layout.fillText(pFPS, pPos.getX() + 2, pPos.getY() + 2);
        layout.fillStyle = "#ffffff";
        layout.fillText(pFPS, pPos.getX(), pPos.getY());


    }

    function draw(deltaTime) {

        layout.clearRect(0, 0, canvas.width, canvas.height);

        drawCookies(deltaTime);

        // layout.beginPath();
        // layout.moveTo(0, canvas.clientHeight / 2);
        // layout.lineTo(canvas.clientWidth, canvas.clientHeight / 2);
        // layout.stroke();

        // layout.beginPath();
        // layout.moveTo(canvas.clientWidth / 2, 0);
        // layout.lineTo(canvas.clientWidth / 2, canvas.clientHeight);
        // layout.stroke();

        let fps = Math.round(1 / deltaTime);
        // drawText("FPS: " + fps, new Vector(10, 25));
        // document.title = "FPS: " + fps;
        drawText("Cookies: " + formatLargeNumber(MainShop.GetCash()), new Vector(canvas.clientWidth / 2, 30), "30px Arial");
        drawText("CPS: " + formatLargeNumber(upgradeManager.getCPS()), new Vector(canvas.clientWidth / 2, 65), "20px Arial");

        // drawText("MouseX: " + mousePos.getX(), new Vector(10, 65));
        // drawText("MouseY: " + mousePos.getY(), new Vector(10, 85));
        // drawText("dist: " + newDistance, new Vector(10, 105));
    }

    function update() {

        checkTapperClick();

        if (cheatCode == 'm') {
            MainShop.AddCash(0);
        }
        // console.log(mousePos);


        if (calculateDistance(mousePos, BigCookie) < BigCookie.getScale() / 2)
            isClickable = true;
        else
            isClickable = false;



        upgradeManager.GetUpgrades().forEach(element => {
            let val = element.Run(MainShop);

            for (let index = 0; index < val; index++)
                createCookie()

            // if (val[1]) {
            //MainShop.AddCash(val[0]) ;
            //createCookie();

            //}
        });
    }

    function animationLoop() {
        let thisTime, deltaTime;
        thisTime = Date.now();
        deltaTime = (thisTime - lastTime) / 1000;

        draw(deltaTime);
        lastTime = thisTime;

        requestAnimationFrame(animationLoop);

        for (let index = 0; index < cookieList.length; index++) {
            if (cookieList[index].getPosition().getY() > canvas.clientHeight + 50) {
                cookieList.splice(index, 1);
            }
        }

        for (let index = 0; index < tappedCookies.length; index++) {
            if (tappedCookies[index].getPosition().getY() > canvas.clientHeight + 50) {
                tappedCookies.splice(index, 1);
            }
        }

        update();

    }

    function randomNum(pMin, pMax) {
        return Math.floor(Math.random() * (pMax - pMin) + pMin);
    }

    function createCookie() {
        let pos = new Vector(randomNum(0, canvas.clientWidth), -50);
        let rng = randomNum(30, 70);
        let cookie = new Cookie(pos, rng, new Vector(0, rng), this.isDonut);
        if (randomNum(0, goldCookieLimit) == 1)
            cookie.setGoldcookie();

        cookieList.push(cookie);
    }

    function createTapCookie() {
        let rng = randomNum(40, 40);

        let offset = 10;
        let pos = new Vector(randomNum(mousePos.getX() - offset, mousePos.getX() + offset),
            randomNum(mousePos.getY() - offset, mousePos.getY() + offset)
        );

        // console.log("MousePos: " + mousePos.getX() +","+ mousePos.getY() + " | " + "Pos: " + pos.getX() +","+ pos.getY());

        let cookie = new TapCookie(pos, rng, new Vector(0, 70), false, 2);
        tappedCookies.push(cookie);
    }

    function drawCookies(deltaTime) {

        for (let index = 0; index < cookieList.length; index++) {
            cookieList[index].drawCookie(layout, deltaTime);
        }

        BigCookie.drawCookie(layout, deltaTime);

        for (let index = 0; index < tappedCookies.length; index++) {
            tappedCookies[index].Run(layout, deltaTime);
        }
    }
}