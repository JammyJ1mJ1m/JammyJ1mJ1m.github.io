function onLoad() {

    console.log("Test");
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

function setupCanvas()
{
    var canvas = document.getElementById("canvas");

    if(canvas.getContext){
        var layout = canvas.getContext('2d');

        var img = new Image();
        img.src = "assets/cookie.png";
        img.onload = function()
        {
            for (let index = 0; index < 500; index++) {
                
                layout.drawImage(img, getRandomArbitrary(50, 1180 ),getRandomArbitrary(50, canvas.clientWidth / 2 - 10),50,50);
                
            }
        }
    }
}