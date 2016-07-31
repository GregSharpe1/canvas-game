// This will request which browser!
(function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

// Generate a number between 105 and 560.
// why? in the documentation.



// Math.floor(Math.random() * (max value - min value)) + min value;
var randomXPos = Math.floor(Math.random() * (560 - 105)) + 105;
var randomSizeY = Math.floor(Math.random() * (60 - 20)) + 20;
var randomYPos = Math.floor(Math.random() * (560 - 105)) + 105;
var lives = 5;
// Setup of the game




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
      y : height - 30,
      height : 45,
      width : 30,
      speed : 2,
      velX : 0,
      velY : 0,
      jumping : false
    },

    enemy = {
      x : randomXPos,
      y : height - randomSizeY,
      height : 45,
      width : 30
    },


    keys = [],
    friction = 0.1,
    gravity = 0.1;

canvas.width = width;
canvas.height = height;


  var kang = new Image();
  kang.src = "img/kangaroo.jpg";

  var bg = new Image();
  bg.src = "img/background.png";


  // Add Image for Obstacle.
  var obstacle1 = new Image();
  obstacle1.src = "img/obstacle1.jpg";

  var obstacle2 = new Image();
  obstacle2.src = "img/obstacle2.jpg";




function processUserInput() {

  // W  || spacebar (Jump)
  if (keys[87] || keys[32]) {
    if(!player.jumping){
      player.jumping = true;
      player.velY = -player.speed*2;
    }
  }
  // S DOWN
  if (keys[83]){
    player.y = player.y + 3;
  }
  // A LEFT
  if (keys[65]) {
    player.x = player.x - 3;
  }
  // D RIGHT
  if (keys[68]) {
    player.x = player.x + 3;
  }
  player.velX *= friction;
  player.velY += gravity;
  player.x += player.velX;
  player.y += player.velY;

  // Creating a border for the player not to
  // escape
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
  context.drawImage(kang, player.x, player.y);
  // Drawing the enemy
  context.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);


  if (
		player.x <= (enemy.x + 32)
		&& enemy.x <= (player.x + 32)
		&& player.y <= (enemy.y + 32)
		&& enemy.y <= (player.y + 32)
	){
    lives--;
    alert("You have: " + lives + " left");
    reset();

  }

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
    drawObstacles();
});

var reset = function() {


  // Kind of works

  // Sets the player to starting point
  player.x = 30;
  player.y = height - 30;


  // TODO: Randomly move the enemy.



}
