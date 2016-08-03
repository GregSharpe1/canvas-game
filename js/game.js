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
var levelNum = 1;

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
      y : height - 50,
      height : 45,
      width : 30,
      speed : 3,
      velX : 0,
      velY : 0,
      jumping : false,
      grounded : false
    },


// level 1!!!
  fBlock = {
    x : 0,
    y : height - 5,
    width : 600,
    height : 5,
  }



    block = {
      x : 150,
      y : 290,
      width : 70,
      height : 10
    },

    block1 = {
      x : 300,
      y : 230,
      width : 70,
      height : 10
    }

    block2 = {
      x : 430,
      y : 180,
      width : 70,
      height : 10
    }

    block3 = {
      x : 350,
      y : 120,
      width : 70,
      height : 10
    }

    block4 = {
      x : 180,
      y : 140,
      width : 70,
      height : 10
    }

    block5 = {
      x : 50,
      y : 100,
      width : 40,
      height : 10
    }


    // door = {
    //   // this is where the 'door' (obstacles) will be placed.
    //   x : randomXPos,
    //   y : height - randomSizeY,
    //   height : 45,
    //   width : 30
    // },

    // Array to hold the keys
    keys = [],
    // friction of the player
    friction = 0.8,
    // gravity of the player
    gravity = 0.2;

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


  // W  || spacebar (Jump)
  if (keys[87] || keys[32]) {
    if(!player.jumping && player.grounded){
      player.jumping = true;
      player.grounded = false;
      player.velY = -player.speed*2;
    }
  }

  // A LEFT
  if (keys[65] || keys[37]) {
    kang_jump.src = "img/kangaroo-jump-inverted.png";
    if (player.velX < player.speed){
      player.velX--;
    }
  }
  // D RIGHT
  if (keys[68] || keys[39]) {
    kang_jump.src = "img/kangaroo-jump.png";
    if (player.velX < player.speed){
      player.velX++;
    }
  }

  player.velX *= friction;
  player.velY += gravity;



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

    player.grounded = false;


  // Clear the context
  context.clearRect(0,0,width,height);

  // drawing the character
var dir1 = colCheck(player, fBlock);
if (dir1 === "l" || dir1 === "r") {
    player.velX = 0;
    player.jumping = false;
} else if (dir1 === "b") {
    player.grounded = true;
    player.jumping = false;
} else if (dir1 === "t") {
    player.velY *= -1;
}

  context.fillRect(fBlock.x, fBlock.y, fBlock.width, fBlock.y);

  context.fillRect(block.x, block.y, block.width, block.height);
  context.fillRect(block1.x, block1.y, block1.width, block1.height);
  context.fillRect(block2.x, block2.y, block2.width, block2.height);
  context.fillRect(block3.x, block3.y, block3.width, block3.height);
  context.fillRect(block4.x, block4.y, block4.width, block4.height);
  context.fillRect(block5.x, block5.y, block5.width, block5.height);

  var dir = colCheck(player, block);

  if (dir === "l" || dir === "r") {
      player.velX = 0;
      player.jumping = false;
  } else if (dir === "b") {
      player.grounded = true;
      player.jumping = false;
  } else if (dir === "t") {
      player.velY *= -1;
  }

  if(player.grounded){
       player.velY = 0;
  }

  player.x += player.velX;
  player.y += player.velY;





  // Drawing the door
  context.drawImage(kang_jump, player.x, player.y);

  window.requestAnimationFrame(processUserInput);

}

// this function will place the remaining lives on the canvas
// and the score

// this function will run when lives are below 0
// it will add a game over layer to the canvas and
// reset the game



// var game_over = function() {
//
//
//   var cGame_Over = document.getElementById("game_over"),
//   // Give the canvas 2D context
//       cxtGame_Over = canvas.getContext("2d");
//
//       // add text to the canvas saying "game over"
//   cxtGame_Over.font = "50px Arial";
//   cxtGame_Over.fillText("Game Over", 155, 120);
//
//
// }

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

function colCheck(shapeA, shapeB) {

    var vX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width / 2)),
        vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2)),

        hWidths = (shapeA.width / 2) + (shapeB.width / 2),
        hHeights = (shapeA.height / 2) + (shapeB.height / 2),
        colDir = null;


    if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {

        var oX = hWidths - Math.abs(vX),
            oY = hHeights - Math.abs(vY);
        if (oX >= oY) {
            if (vY > 0) {
                colDir = "t";
                shapeA.y += oY;
            } else {
                colDir = "b";
                shapeA.y -= oY;
            }
        } else {
            if (vX > 0) {
                colDir = "l";
                shapeA.x += oX;
            } else {
                colDir = "r";
                shapeA.x -= oX;
            }
        }
    }
    return colDir;
}
// this function will reset the player to the start position
var reset = function() {

  // decrease the lives by one every time the game is reset
  lives--;
  // Kind of works

  // Sets the player to starting point
  player.x = 30;
  player.y = height - 30;

  // TODO: Randomly move the door.

}
