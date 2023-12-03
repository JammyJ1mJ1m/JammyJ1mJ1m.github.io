let upgradeManager = new UpgradeManager();
let MainShop = new Shop();


function Test(p)
{
    // TODO get the price of the auto from upgrade manager
    let price = upgradeManager. FindPrice(p);

    if(MainShop.BuyAuto(price))
    {
        upgradeManager.AddAuto(p);
    }
}

function setupCanvas() {
    let layout;
    let tapCount = 0;
    let cookieList = [];
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
    let BigCookie = new Cookie(new Vector(canvas.clientWidth / 2, canvas.clientHeight / 2), 400, new Vector(0, 0), false, layout);

let myTapper = new Tapper();


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
            console.log("key")
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
        button.setAttribute("id",'AutoButton'+pName);
        button.setAttribute("class",'AutoButton');
        button.setAttribute("onClick", "Test("+ "'"+ pName+ "'"+");");
    
        let div = document.createElement('DIV');
        div.setAttribute("id",'AutoDiv'+pName);

        let text = document.createTextNode(pName);
        let text2 = document.createTextNode(" ...Test");

        // appending text to button
        button.appendChild(text);
        button.appendChild(text2);
        div.appendChild(button);
        buttonDiv.appendChild(div);
        return;
    }

    function AddAutoButtons() {
        AddButton("Tapper")
        AddButton("Grandad")
        AddButton("Farm")
        AddButton("Mine")
        AddButton("Factory")
    }
    AddAutoButtons();


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


    function drawText(pFPS, pPos) {
        layout.fillStyle = "#ffffff";
        layout.lineJoin = 'round';
        layout.setTransform(layout);
        layout.font = "20px Arial";
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
        drawText("Cookies: " + MainShop.GetCash(), new Vector(10, 25));

        // drawText("MouseX: " + mousePos.getX(), new Vector(10, 65));
        // drawText("MouseY: " + mousePos.getY(), new Vector(10, 85));
        // drawText("dist: " + newDistance, new Vector(10, 105));
    }

    function update() {
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

    function drawCookies(deltaTime) {

        for (let index = 0; index < cookieList.length; index++) {
            cookieList[index].drawCookie(layout, deltaTime);
        }

        BigCookie.drawCookie(layout, deltaTime);
    }
}