// This will request which browser!
(function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

// Setup of the game
var img = new Image(); //creating the instance of the image
img.src = "img/kangaroo.jpg";



// Create the canvas from the given element in the HTML
var canvas = document.getElementById("main"),
// Give the canvas 2D context
    context = canvas.getContext("2d"),

// Set the canvas with boundaries
// to allow the user not to go outside
// the boundaries
    height = 360,
    width = 600,



// Create the player giving some config
    player = {
  // this is where the player will start
      x : 50,
      y : height - 45,
      height : 30,
      width : 30
    },

    keys = [];

canvas.height = height;
canvas.width = width;

function processUserInput() {

  // W
  if (keys[87]) {
    player.y = player.y - 10;
  }
  // S
  if (keys[83]){
    player.y = player.y + 10;
  }
  // A
  if (keys[65]) {
    player.x = player.x - 10;
  }
  // D
  if (keys[68]) {
    player.x = player.x + 10;
  }


  // Clear the context
  context.clearRect(0,0,width,height);
  // drawing the character
  context.drawImage(img, player.x, player.y);


  requestAnimationFrame(processUserInput);

}



document.body.addEventListener("keydown", function(e) {
    keys[e.keyCode] = true;
});

document.body.addEventListener("keyup", function(e) {
    keys[e.keyCode] = false;
});

window.addEventListener("load",function(){
    processUserInput();

});
