// returns the distance between a point and a circle
function calculateDistance(pMousePos, pBigCookieCenter) {
    let distX = pMousePos.getX() - pBigCookieCenter.getPosition().getX() - pBigCookieCenter.getScale() / 2;
    let distY = pMousePos.getY() - pBigCookieCenter.getPosition().getY() - pBigCookieCenter.getScale() / 2;
    let distance = Math.sqrt((distX * distX) + (distY * distY));
    
    return distance;
}

function getMousePos(canvas, evt) {
    if (evt != null) {
        var rect = canvas.getBoundingClientRect();
        return new Vector(evt.clientX - rect.left, evt.clientY - rect.top);
    }
}

function isMobile() {
    return ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0);
}

function randomNum(pMin, pMax) {
    return Math.floor(Math.random() * (pMax - pMin) + pMin);
}

function setupCanvas() {
    let canvasWidth = 720;
    let canvasHeight = 880;
    let enemyManager = new EnemyManager();
    enemyManager.SetupEnemies();
    
    if (isMobile()) {
        
        canvasWidth = 220;
        canvasHeight = 580;
    }
    
    let layout;
    
    let lastTime = Date.now();
    let mousePos = new Vector(0, 0);
    IsClickUp = true;
    
    let canvas = document.getElementById("canvas");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    
    if (canvas.getContext) {
        layout = canvas.getContext('2d');
    }
    //let Alien1 = new Alien(new Vector(canvas.clientWidth / 2, canvas.clientHeight / 2));


    //=======================================================
    //                    Events
    //=======================================================
    let screenLog = document.querySelector("#screen-log");
    document.addEventListener("mousemove", logKey);

    function logKey(e) {
        mousePos = getMousePos(canvas, e);
    }

    let body = document.querySelector("body");
    body.addEventListener("keydown", (event) => {
        if (IsClickUp && event.key === ' ') {
            console.log("key down")

            IsClickUp = false;

        }
    });

    body.addEventListener("keyup", (event) => {
        if (event.key === ' ') {
            IsClickUp = true;
            console.log("key up")

            return;
        }
    });

    /*
    body.addEventListener("keydown", (event) => {
        

    });
    
    
    body.addEventListener("mousedown", (event) => {
        if (isClickable) {
            MainShop.AddCash(1);
            createCookie(cookieList);
            BigCookie.click();
            createTapCookie();
        }
    });
    */
    
    initialiseSceneGraph();

    animationLoop();


    //=======================================================
    //                    functions 
    //=======================================================

    

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

    // draw the canvas elements
    function draw(deltaTime) {

        layout.clearRect(0, 0, canvas.width, canvas.height);
        layout.fillStyle = '#111';
        layout.fillRect(0, 0, canvas.width, canvas.height);
        let fps = Math.round(1 / deltaTime);
        //drawText("FPS: " + fps, new Vector(60, 25),"30px Arial");
layout.beginPath();
        layout.moveTo(0, canvas.clientHeight / 2);
        layout.lineTo(canvas.clientWidth, canvas.clientHeight / 2);
        layout.stroke();

        layout.beginPath();
        layout.moveTo(canvas.clientWidth / 2, 0);
        layout.lineTo(canvas.clientWidth / 2, canvas.clientHeight);
        layout.stroke();

        enemyManager.DrawEnemies(layout);
    }

    // handle physics updates
    function update() {
        //console.log(mousePos);

    }

    // main render loop
    function animationLoop() {
        let thisTime, deltaTime;
        thisTime = Date.now();
        deltaTime = (thisTime - lastTime) / 1000;

        draw(deltaTime);
        lastTime = thisTime;

        requestAnimationFrame(animationLoop);
        update();
    }
}