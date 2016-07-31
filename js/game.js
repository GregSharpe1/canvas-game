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
      // this is where the 'enemy' (obstacles) will be placed.
      x : randomXPos,
      y : height - randomSizeY,
      height : 45,
      width : 30
    },

    // Array to hold the keys
    keys = [],
    // friction of the player
    friction = 0.1,
    // gravity of the player
    gravity = 0.1;

canvas.width = width;
canvas.height = height;

// loding the images to canvas

// player jumping image
  var kang_jump = new Image();
  kang_jump.src = "img/kangaroo-jump.png";
// player jumping image inverted
  var kang_jump_inverted = new Image();
  kang_jump_inverted.src = "img/kangaroo-jump-inverted.png";
// player running images
  var kang_running = new Image();
  kang_running.src = "img/kangaroo-running.gif";

// player running images inverted
  var kang_running_inverted = new Image();
  kang_running_inverted.src = "img/kang-running-inverted.gif";

// background images
  var bg = new Image();
  bg.src = "img/background.png";


  // Add Image for Obstacle.
  //tumble weed
  var obstacle1 = new Image();
  obstacle1.src = "img/tumbleweed.png";
  // another obstacle.. haven't thought what yet
  var obstacle2 = new Image();
  obstacle2.src = "img/obstacle2.jpg";



// this function will process keypresses
function processUserInput() {

  var invert = false;
  kang_jump.src = "img/kangaroo-jump.png";
  // W  || spacebar (Jump)
  if (keys[87] || keys[32]) {
    if(!player.jumping){
      player.jumping = true;
      player.velY = -player.speed*2;
    }
  }
  // S DOWN
  if (keys[83]){s
    player.y = player.y + 3;
  }
  // A LEFT
  if (keys[65]) {
    invert = true;
    player.x = player.x - 3;
  }
  // D RIGHT
  if (keys[68]) {
    invert = false;
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

    if (invert == true){
      kang_jump.src = "img/kangaroo-jump-inverted.png";
    }


  // Clear the context
  context.clearRect(0,0,width,height);
  // drawing the character
  context.drawImage(kang_jump, player.x, player.y);
  // Drawing the enemy
  context.drawImage(obstacle1, enemy.x, enemy.y, 40,40);

  // if statement to check if it's making contact with the obstacles
  if (
		player.x <= (enemy.x + 32)
		&& enemy.x <= (player.x + 32)
		&& player.y <= (enemy.y + 32)
		&& enemy.y <= (player.y + 32)
	){
    // if the lives fall under 1 (aka zero lives)
    // run game over function
    if (lives < 1){

      game_over();
      // alert("Game Over");

    }
    // if hit an obstacle then run reset function
    else {

    reset();
    }

  }
  // place the score on the canvas
  score();
  // request frame
  requestAnimationFrame(processUserInput);

}

// this function will place the remaining lives on the canvas
// and the score
var score = function() {

  var cScore = document.getElementById("score"),
  // Give the canvas 2D context
      ctxScore = canvas.getContext("2d");

      // add the remaining lives to the canvas
  ctxScore.font = "20px Arial";
  ctxScore.fillText("Lives left: " + lives, 10, 20);


}

// this function will run when lives are below 0
// it will add a game over layer to the canvas and
// reset the game

var game_over = function() {


  var cGame_Over = document.getElementById("game_over"),
  // Give the canvas 2D context
      cxtGame_Over = canvas.getContext("2d");

      // add text to the canvas saying "game over"
  cxtGame_Over.font = "50px Arial";
  cxtGame_Over.fillText("Game Over", 155, 120);


}

// lsiten for key presses down
document.body.addEventListener("keydown", function(e) {
    keys[e.keyCode] = true;
});
// listen for when the keypress has been released
document.body.addEventListener("keyup", function(e) {
    keys[e.keyCode] = false;
});
// listen for the key presses on these functions
window.addEventListener("load",function(){
    processUserInput();
});

// do i need this function?
// this function will end the game and display the score
var end_game = function() {

}

// this function will reset the player to the start position
var reset = function() {

  // decrease the lives by one every time the game is reset
  lives--;
  // Kind of works

  // Sets the player to starting point
  player.x = 30;
  player.y = height - 30;

  // TODO: Randomly move the enemy.

}
