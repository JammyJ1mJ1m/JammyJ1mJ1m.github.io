function onLoad() {
    console.log("Onload");
    animationLoop();
}


function setupCanvas() 
{
    let lastTime, layout, img, img2;
    let tapCount = 0;
    let cookieList = [];

    lastTime = Date.now();

    var canvas = document.getElementById("canvas");
    let BigCookie = new Cookie(new Vector(canvas.clientWidth / 2, canvas.clientHeight / 2), 512, new Vector(0, 0));
    let smallCookie = new Cookie(new Vector(0, 0), 50, new Vector(0, 10));

    if (canvas.getContext) {
        layout = canvas.getContext('2d');

        img = new Image();
        img.src = "assets/cookie.png";

        img2 = new Image();
        img2.src = "assets/goldCookie.png";


    }


    var body = document.querySelector("body");
    body.addEventListener("keydown", function (e) {
        var isInput = ~["TEXTAREA", "INPUT"].indexOf(e.target.tagName);
        if (e.key === " " && !isInput) {
            // resetUI();
            
            tapCount++;
            createCookie(cookieList);
        }
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
        layout.clearRect(0, 0, canvas.width, canvas.height);
        drawCookies(img, img2);
        drawText("FPS: " + pFPS, new Vector(10, 25));
        drawText("Cookies: " + cookieList.length, new Vector(10, 45));
    }

    function animationLoop() {
        let thisTime, deltaTime;
        thisTime = Date.now();
        deltaTime = (thisTime - lastTime) / 1000;
        let fps = Math.round(1 / deltaTime);

        draw(fps);

        lastTime = thisTime;
        requestAnimationFrame(animationLoop);
    }

    function randomNum(pMin, pMax) {
        return Math.floor(Math.random() * (pMax - pMin) + pMin);
    }

    function createCookie()
    {
        // let smallCookie = new Cookie(new Vector(0, 0), 50, new Vector(0, 10));

        let width = canvas.clientWidth - 50;
        console.log("width: " + width);

        

        let vec1 = new Vector(0,0, -50);

        console.log("vec1 " +  vec1.getX(), vec1.getY());

       let vec2 = new Vector(randomNum(0, canvas.clientWidth), randomNum(0, canvas.clientHeight))
        cookieList.push(new Cookie(vec2,50)); 
    }

    function drawCookies(img, img2) {

        console.log(tapCount);
        for (let index = 0; index < cookieList.length; index++) {
            
            console.log(cookieList[index]);
            cookieList[index].drawCookie(layout);
        }
         BigCookie.drawCookie(layout);
    }
}