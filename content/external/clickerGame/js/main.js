function setupCanvas() {
    let lastTime, layout;
    let tapCount = 0;
    let cookieList = [];
    let lastClickTime = Date.now();
    let isDonut = false;
    let IsClickUp = true;
    lastTime = Date.now();

    var canvas = document.getElementById("canvas");
    let BigCookie = new Cookie(new Vector(canvas.clientWidth / 2, canvas.clientHeight / 2), 512, new Vector(0, 0));

    if (canvas.getContext) {
        layout = canvas.getContext('2d');
        // img = new Image();
        // img.src = "assets/cookie.png";

        // img2 = new Image();
        // img2.src = "assets/goldCookie.png";
    }


    //=======================================================
    //                    Events
    //=======================================================

    var body = document.querySelector("body");
    body.addEventListener("keydown", (event) => {
        if (IsClickUp && event.key === ' ') {
            console.log("key")
            tapCount++;
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
        tapCount++;
        createCookie(cookieList);
        BigCookie.click();
    });

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

        let fps = Math.round(1 / deltaTime);
        drawText("FPS: " + fps, new Vector(10, 25));
        drawText("Cookies: " + cookieList.length, new Vector(10, 45));
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
    }

    function randomNum(pMin, pMax) {
        return Math.floor(Math.random() * (pMax - pMin) + pMin);
    }

    function createCookie() {
        let pos = new Vector(randomNum(0, canvas.clientWidth), -50);
        let rng = randomNum(30, 70);
        cookieList.push(new Cookie(pos, rng, new Vector(0, rng),this.isDonut));
    }

    function drawCookies(deltaTime) {

        for (let index = 0; index < cookieList.length; index++) {


            cookieList[index].drawCookie(layout, deltaTime);
        }
        
        BigCookie.drawCookie(layout,deltaTime);
    }
}