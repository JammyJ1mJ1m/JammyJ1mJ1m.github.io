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

        canvasWidth = 720;
        canvasHeight = 880;
    }

    let layout;

    let lastTime = Date.now();
    let mousePos = new Vector(0, 0);
    IsClickUp = true;
    IsRightUP = true;
    IsShootUp = true;
    IsDebugKeyUp = true;

    let canvas = document.getElementById("canvas");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    if (canvas.getContext) {
        layout = canvas.getContext('2d');
    }
    //let Alien1 = new Alien(new Vector(canvas.clientWidth / 2, canvas.clientHeight / 2));
    let player = new Player(new Vector(canvas.clientWidth / 2, 800));
    let debugManager = new DebugManager();
    
    let barriers = [];
    
    let seperator = (canvasWidth / 8) / 2;
    
    barriers.push(new Barrier(new Vector(seperator  ,675)));
    barriers.push(new Barrier(new Vector(seperator * 4,675)));
    barriers.push(new Barrier(new Vector(seperator * 8,675)));
    barriers.push(new Barrier(new Vector(seperator * 11,675)));
    
    let colisionManager = new ColisionManager(enemyManager, player, barriers);

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
        rootTransform.addChild(enemyManager.GetRootNode())
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
        // layout.beginPath();
        // layout.moveTo(0, canvas.clientHeight / 2);
        // layout.lineTo(canvas.clientWidth, canvas.clientHeight / 2);
        // layout.stroke();

        // layout.beginPath();
        // layout.moveTo(canvas.clientWidth / 2, 0);
        // layout.lineTo(canvas.clientWidth / 2, canvas.clientHeight);
        // layout.stroke();

        enemyManager.DrawEnemies(layout, deltaTime);
        player.Draw(layout, deltaTime);
        debugManager.Draw(player, enemyManager);

        barriers.forEach(element => {
            element.Draw(layout);
        });
    }

    // handle physics updates
    function update() {
        //console.log(mousePos);
        colisionManager.CalculateCollisions();
        colisionManager.CalculateBarrierCollisions();
        // handles game win/lose state
        if(enemyManager.GetGameState())
        {
            drawText("Game Over!",new Vector(canvas.width / 2, canvas.height / 2), 'italic 60pt Arial')
        }
        if(player.GetEnemiesHit() == enemyManager.getTotalEnemies())
        {
            drawText("Game Won!",new Vector(canvas.width / 2, canvas.height / 2), 'italic 60pt Arial')
        }
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