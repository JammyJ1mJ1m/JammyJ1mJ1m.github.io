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

        var img2 = new Image();
        img2.src = "assets/goldCookie.png";
        
        img.onload = function()
        {
            layout.drawImage(img2, getRandomArbitrary(50, 1180 ),getRandomArbitrary(50, canvas.clientWidth / 2 - 10),50,50);
            for (let index = 0; index < 50; index++) {
                
                layout.drawImage(img, getRandomArbitrary(50, 1180 ),getRandomArbitrary(50, canvas.clientWidth / 2 - 10),50,50);
                
            }
            
        }
        
    }
}