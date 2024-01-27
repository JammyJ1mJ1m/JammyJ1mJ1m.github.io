// the window load event handler
function onLoad() {
    let mainCanvas, mainContext, lastTime, rootNode, sceneComponents, boundaryLines, staticCircles, dynamicCircles;

    // this function will initialise our letiables
    function initialiseCanvasContext() {
        // Find the canvas element using its id attribute.
        mainCanvas = document.getElementById('mainCanvas');
        // if it couldn't be found 
        if (!mainCanvas) {
            // make a message box pop up with the error.
            alert('Error: I cannot find the canvas element!');
            return;
        }
        // Get the 2D canvas context.
        mainContext = mainCanvas.getContext('2d');
        if (!mainContext) {
            alert('Error: failed to get context!');
            return;
        }

        initialiseSceneGraph();

        lastTime = Date.now();
    }

    sceneComponents = []; // array to hold all of the scene components such as the house and the sun
    boundaryLines = [];
    staticCircles = [];
    dynamicCircles = [];
    function initialiseSceneGraph() {
        let rootTransform, originNode, originTranslation, housesNode, house, sun;
        let originVector = new Vector(mainCanvas.width, mainCanvas.height, 0);
        originVector = originVector.multiply(0.5);
        let originMatrix = Matrix.createTranslation(originVector);

        let bgPosition = new Vector(0, 0, 0); // new Vector(0,0,0); 
        let bgScale = new Vector(1, 1, 0);
        let bgRotation = 0 * Math.PI / 180;
        let spaceBG = new SpaceBG(bgPosition, bgScale, bgRotation, '#222222', new Vector(mainCanvas.width, mainCanvas.height, 0));
        sceneComponents.push(spaceBG);

        let lineRPosition = new Vector(mainCanvas.width / 2, (mainCanvas.height / 2) * -1, 0)
        let lineRScale = new Vector(1, 1, 0);
        let lineRRotation = 0 * Math.PI / 180;
        let lineR = new Line(lineRPosition, lineRScale, lineRRotation, '#ff09af', Math.PI / 0, new Vector(0, 0, 0), new Vector(0, 0, 0), [new Vector(0, mainCanvas.height), new Vector(0, 0, 0)], "vertical");
        sceneComponents.push(lineR);
        boundaryLines.push(lineR);

        let lineLPosition = new Vector((mainCanvas.width / 2) * -1, mainCanvas.height / 2 * -1, 0);
        let lineLScale = new Vector(1, 1, 0);
        let lineLRotation = 0 * Math.PI / 180;
        let lineL = new Line(lineLPosition, lineLScale, lineLRotation, '#ff09af', Math.PI / 0, new Vector(0, 0, 0), new Vector(0, 0, 0), [new Vector(0, mainCanvas.height, 0), new Vector(0, 0, 0)], "vertical");
        sceneComponents.push(lineL);
        boundaryLines.push(lineL);

        let lineTPosition = new Vector((mainCanvas.width / 2) * -1, mainCanvas.height / 2 * -1, 0);
        let lineTScale = new Vector(1, 1, 0);
        let lineTRotation = 0 * Math.PI / 180;
        let lineT = new Line(lineTPosition, lineTScale, lineTRotation, '#ff09af', Math.PI / 0, new Vector(0, 0, 0), new Vector(0, 0, 0), [new Vector(0, 0, 0), new Vector(mainCanvas.width, 0, 0)], "horizontal");
        sceneComponents.push(lineT);
        boundaryLines.push(lineT);

        let lineBPosition = new Vector((mainCanvas.width / 2) * -1, mainCanvas.height / 2, 0);
        let lineBScale = new Vector(1, 1, 0);
        let lineBRotation = 0 * Math.PI / 180;
        let lineB = new Line(lineBPosition, lineBScale, lineBRotation, '#ff09af', Math.PI / 0, new Vector(0, 0, 0), new Vector(0, 0, 0), [new Vector(0, 0, 0), new Vector(mainCanvas.width, 0, 0)], "horizontal");
        sceneComponents.push(lineB);
        boundaryLines.push(lineB);

        //dynamic objects

        let sunPosition = new Vector(0, -500, 0);
        let sunScale = new Vector(.75, .75, 0);
        let sunRotation = 0 * Math.PI / 180;
        sun = new Sun(sunPosition, sunScale, sunRotation, '#ff9900', Math.PI / 2, new Vector(1, 1, 0), new Vector(-5, 25, 0));
        sceneComponents.push(sun);

        let housePosition = new Vector(-799, -600, 0);
        let houseScale = new Vector(1, 1, 0);
        let houseRotation = 0 * Math.PI / 180;
        house = new House(housePosition, houseScale, houseRotation, randomHex(), Math.PI / 5, new Vector(1, 1, 0), new Vector(15, 15, 0)); //
        sceneComponents.push(house);

        // spawning lots of mini circles
        let isClipping = false;
        let randomNumOfCircles = randomNum(50,150);
        for (let i = 0; i < randomNumOfCircles; i++) {

            let newCirclePosition = new Vector(randomNum(-600, 600), randomNum(-350, 350), 0);
            let newCircleScale = new Vector(1, 1, 0);
            let newCircleRotation = 0 * Math.PI / 180;
            newCircle = new StaticPolygon(newCirclePosition, newCircleScale, newCircleRotation, randomHex(), Math.PI / 2, new Vector(0, 0, 0), new Vector(0, 0, 0), randomNum(10, 15), "circle lorge");

            isClipping = checkCircleIntersect(staticCircles, newCircle);
            if (isClipping == true) {
                i -= 1;
            }
            else {
                sceneComponents.push(newCircle);
                staticCircles.push(newCircle)
            }
        }

        // spawning main circle
        let isMainClipping = false;
        let isMoveableClipping = false;

        for (let i = 0; i < 1; i++) {
            let mainCirclePosition = new Vector(randomNum(-500, 500), randomNum(-325, 325), 0);
            let mainCircleScale = new Vector(1, 1, 0);
            let mainCircleRotation = 0 * Math.PI / 180;
            mainCircle = new BasicCircle(mainCirclePosition, mainCircleScale, mainCircleRotation, '#3CD070', randomNum(-360, 360) * Math.PI / 180, new Vector(0, 0, 0), new Vector(randomNum(randomNum(-300, -150), randomNum(150, 300)), randomNum(randomNum(-300, -150), randomNum(150, 300)), 0), 65, "mainCircle smol");//randomNum(-400,400), randomNum(-400,400) //(randomNum(randomNum(-300, -150), randomNum(150, 300)), randomNum(randomNum(-300, -150), randomNum(150, 300)), 0)

            isMainClipping = checkCircleIntersect(staticCircles, mainCircle)
            
            if (isMainClipping == true || isMoveableClipping == true) {
                i -= 1;
            }
            else {
                sceneComponents.push(mainCircle);
            }
        }

        let StarDestoyerPosition = new Vector(900, 0, 0);
        let StarDestoyerScale = new Vector(1.2, 1.2, 0);
        let StarDestoyerRotation = -20 * Math.PI / 180;
        let starDestoyer = new StarDestoyer(StarDestoyerPosition, StarDestoyerScale, StarDestoyerRotation, randomHex(), 0, new Vector(0, 0, 0), new Vector(-50, 18, 0));
        sceneComponents.push(starDestoyer);


        rootNode = new Group();
        rootTransform = new Transform(originMatrix);

        housesNode = new Group();

        for (let i = 0; i < sceneComponents.length; i++) {
            housesNode.addChild(sceneComponents[i].createSceneGraphNodes());
        }

        rootNode.addChild(rootTransform);
        rootTransform.addChild(housesNode);
    }

    function checkCircleIntersect(pSceneComponents, pNewCircle) {

        let isClipping = false;

        for (let i = 0; i < pSceneComponents.length; i++) {

            let circleComponent = pSceneComponents[i];
            let absX = Math.abs(circleComponent.getPosition().getX() - pNewCircle.getPosition().getX());
            let absY = Math.abs(circleComponent.getPosition().getY() - pNewCircle.getPosition().getY());

            distance = (absX * absX) + (absY * absY);

            distance = Math.sqrt(distance);

            if (distance <= circleComponent.getRadius() + pNewCircle.getRadius()) {

                console.log("circle clip")
                isClipping = true;
            }
        }
        return isClipping;
    }

    /**
     * Gets a random int
     * @param {*} pMin - Min range for number gen
     * @param {*} pMax - Max range for number gen
     * @returns A random int within the min/max range
     */
    function randomNum(pMin, pMax) {
        let num;
        num = Math.floor(Math.random() * (pMax - pMin) + pMin);
        return num;
    }

    /**
     * Generates a random hex code
     * @returns A correctcly formatted hex code
     */
    function randomHex() {
        let chars = '0123456789abcdef';
        let hex = '#';
        for (let i = 0; i < 6; i++) {
            let num = randomNum(0, chars.length)
            let item = chars[num];
            hex += item;
        }
        return hex;
    }

    /**
     * Creates a random translation matrix based on canvas size
     * @param {*} pMin - Minimum int used for random number
     * @param {*} pMax - Maximum int used for random number
     * @returns - A translation matrix 
     */
    function getRandomMatrix(pMin, pMax) {
        let origin = new Vector(mainCanvas.clientWidth / 2 + randomNum(pMin, pMax), mainCanvas.clientHeight / 2 + randomNum(pMin, pMax), 0);
        let translate = Matrix.createTranslation(origin);
        let rotation = Matrix.createRotation(0); //randomNum(0,360)
        translate = translate.multiply(rotation);
        return translate;
    }

    /**
     * Sets the canvas drawing style, line width, stroke, colour etc..
     */
    function makeCanvasDrawStyle() {
        mainContext.fillStyle = "#ffffff";
        mainContext.fillRect(0, 0, mainCanvas.width, mainCanvas.height);
        mainContext.lineWidth = 3;
        mainContext.lineJoin = 'round';
        mainContext.setTransform(mainContext);

    }

    function drawText(pFPS, pPos) {
        mainContext.fillStyle = "#ffffff";
        mainContext.lineJoin = 'round';
        mainContext.setTransform(mainContext);
        mainContext.font = "20px Arial";
        mainContext.fillText(pFPS, pPos.getX(), pPos.getY());
        //makeCanvasDrawStyle();
    }
    /**
     * Does the drawing on the actual canvas
     */
    function draw(pFPS) {

        makeCanvasDrawStyle();

        let visitor = new RenderVisitor(mainContext);

        rootNode.accept(visitor);
        drawText("FPS: " + pFPS, new Vector(10, 25));
    }

    function update(pDeltaTime) {
        for (let i = 0; i < sceneComponents.length; i++) {
            let sceneObject = sceneComponents[i];
            sceneObject.update(pDeltaTime, boundaryLines, staticCircles);
        }
    }

    function animationLoop() {
        let thisTime, deltaTime;
        thisTime = Date.now();
        deltaTime = (thisTime - lastTime) / 1000;
        let fps = Math.round(1 / deltaTime);

        update(deltaTime);
        draw(fps);

        lastTime = thisTime;


        requestAnimationFrame(animationLoop);
    }

    initialiseCanvasContext();
    animationLoop();

}
window.addEventListener('load', onLoad, false);