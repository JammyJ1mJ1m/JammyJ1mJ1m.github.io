function onLoad() {
    console.log("Onload");
    animationLoop();
}


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
   // let smallCookie = new Cookie(new Vector(0, 0), 50, new Vector(0, 10));

    if (canvas.getContext) {
        layout = canvas.getContext('2d');

        img = new Image();
        img.src = "assets/cookie.png";

        img2 = new Image();
        img2.src = "assets/goldCookie.png";


    }


    //=======================================================
    //                    Events
    //=======================================================

    var body = document.querySelector("body");
    body.addEventListener("keydown", (event) => {
        if (IsClickUp) {
            tapCount++;
            createCookie(cookieList);
            IsClickUp = false;
        }
    });

    body.addEventListener("keydown", (event) => {
        if (event.key === "d") {
            this.isDonut = !this.isDonut;
            for (let index = 0; index < cookieList.length; index++) {
            //this.img.src = "assets/dony.png";


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
        // IsClickUp = false;
    });

    animationLoop();






    //=======================================================
    //                    functions 
    //=======================================================
    function drawText(pFPS, pPos) {
        layout.fillStyle = "#ffffff";
        layout.lineJoin = 'round';
        layout.setTransform(layout);
        layout.font = "20px Arial";
        layout.fillText(pFPS, pPos.getX(), pPos.getY());
    }

    function draw(pFPS) {

        drawText("FPS: " + pFPS, new Vector(10, 25));
        drawText("Cookies: " + cookieList.length, new Vector(10, 45));
    }

    function animationLoop() {
        let thisTime, deltaTime;
        thisTime = Date.now();
        deltaTime = (thisTime - lastTime) / 1000;
        let fps = Math.round(1 / deltaTime);
        layout.clearRect(0, 0, canvas.width, canvas.height);

        drawCookies(deltaTime);
        draw(fps);
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
        // let smallCookie = new Cookie(new Vector(0, 0), 50, new Vector(0, 10));

        let width = canvas.clientWidth - 50;
        let vec1 = new Vector(0, 0, -50);


        let vec2 = new Vector(randomNum(0, canvas.clientWidth), -50);
        let rng = randomNum(30, 70);
        cookieList.push(new Cookie(vec2, rng, new Vector(0, rng),this.isDonut));
    }

    function drawCookies(deltaTime) {

        for (let index = 0; index < cookieList.length; index++) {


            cookieList[index].drawCookie(layout, deltaTime);
        }
        BigCookie.drawCookie(layout);
    }
}