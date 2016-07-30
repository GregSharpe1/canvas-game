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
      x : 30,
      y : height - 20,
      height : 45,
      width : 30,
      speed : 2,
      velX : 0,
      velY : 0,
      jumping : false
    },

    keys = [],
    friction = 0.1,
    gravity = 0.1;

canvas.width = width;
canvas.height = height;


function processUserInput() {

  // W
  if (keys[87]) {
    if(!player.jumping){
      player.jumping = true;
      player.velY = -player.speed*2;
    }
  }
  // S
  if (keys[83]){
    player.y = player.y + 3;
  }
  // A
  if (keys[65]) {
    player.x = player.x - 3;
  }
  // D
  if (keys[68]) {
    player.x = player.x + 3;
  }
  player.velX *= friction;
  player.velY += gravity;
  player.x += player.velX;
  player.y += player.velY;

  if (player.x >= width-player.width) {
      player.x = width-player.width;
     } else if (player.x <= 0) {
      player.x = 0;
    }

  if(player.y >= height-player.height){
      player.y = height - player.height;
      player.jumping = false;
    }



  // Clear the context
  context.clearRect(0,0,width,height);
  // drawing the character
  context.drawImage(img, player.x, player.y);


  requestAnimationFrame(processUserInput);

}

function drawObstacles() {

  var min = 105;
  var max = 560;

  var randomX = Math.floor(Math.random() * (max - min)) + min;


  context.fillStyle = "red";
  context.fillRect(randomX, height - 30, 30,30);

}

document.body.addEventListener("keydown", function(e) {
    keys[e.keyCode] = true;
});

document.body.addEventListener("keyup", function(e) {
    keys[e.keyCode] = false;
});

window.addEventListener("load",function(){
    processUserInput();
    drawObstacles();
});
