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
var levelNum = 2;

// Setup of the game

// Create the canvas from the given element in the HTML
var canvas = document.getElementById("main"),
// Give the canvas 2D context
    context = canvas.getContext("2d"),

// Set the canvas with boundaries
// to allow the user not to go outside
// the boundaries
    height = 600,
    width = 800,

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


    door = {
      // this is where the 'door' (obstacles) will be placed.
      x : 50,
      y : 50,
      height : 45,
      width : 30
    },

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




if (levelNum == 1){

    context.fillRect(fBlock.x, fBlock.y, fBlock.width, fBlock.y);

for (var i=0; i < block.length; i++) {


  context.fillRect(block[i].x, block[i].y, block[i].width, block[i].height);


  var dir = colCheck(player, block[i]);

  if (dir === "l" || dir === "r") {
      player.velX = 0;
      player.jumping = false;
  } else if (dir === "b") {
      player.grounded = true;
      player.jumping = false;
  } else if (dir === "t") {
      player.velY *= -1;
  }

}


}
 else if (levelNum == 2){

     context.fillRect(fBlock.x, fBlock.y, fBlock.width, fBlock.y);

  for (var i=0; i < 7; i++) {

    context.fillRect(block1[i].x, block1[i].y, block1[i].width, block1[i].height);


    var dir2 = colCheck(player, block1[i]);

    if (dir2 === "l" || dir2 === "r") {
        player.velX = 0;
        player.jumping = false;
    } else if (dir2 === "b") {
        player.grounded = true;
        player.jumping = false;
    } else if (dir2 === "t") {
        player.velY *= -1;
    }
  }


}
else if (levelNum == 3){

    context.fillRect(fBlock.x, fBlock.y, fBlock.width, fBlock.y);

  for (var i=0; i < 7; i++) {

    context.fillRect(block2[i].x, block2[i].y, block2[i].width, block2[i].height);


    var dir3 = colCheck(player, block2[i]);

    if (dir3 === "l" || dir3 === "r") {
        player.velX = 0;
        player.jumping = false;
    } else if (dir3 === "b") {
        player.grounded = true;
        player.jumping = false;
    } else if (dir3 === "t") {
        player.velY *= -1;
    }
  }


}
// make sure that the player is grounded
  if(player.grounded){
       player.velY = 0;
  }

  player.x += player.velX;
  player.y += player.velY;

  // Drawing the player
  context.drawImage(kang_jump, player.x, player.y);

  context.drawImage(obstacle1, door.x, door.y);

  if (
  		player.x <= (door.x + 32)
   		&& door.x <= (player.x + 32)
   		&& player.y <= (door.y + 32)
   		&& door.y <= (player.y + 32)
   	){

        context.clearRect(0,0,width,height);
        levelNum++;
        alert("next level");

  }



  // refresh the page
  window.requestAnimationFrame(processUserInput);

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

  // Sets the player to starting point
  player.x = 30;
  player.y = height - 45;

  // make sure the player's facing the right way
  kang_jump.src = "img/kangaroo-jump.png";

  processUserInput();

  // TODO: Randomly move the door.

}

// This block is used to create the floor on which
// the player starts on
  fBlock = {
    x : 0,
    y : height - 5,
    width : canvas.width,
    height : canvas.height,
  }

// Level 1

var block = [];

// Here i'm creating the first level blocks
// block 1
block.push({
  x : 100,
  y : canvas.height - 60,
  width : 20,
  height : 10
});

block.push({
  x : 170,
  y : canvas.height - 130,
  width : 70,
  height : 10
});

block.push({
  x : 300,
  y : canvas.height - 150,
  width : 70,
  height : 10
});

block.push({
  x : 430,
  y : canvas.height - 230,
  width : 80,
  height : 10
});

block.push({
  x : 500,
  y : canvas.height - 280,
  width : 20,
  height : 10
});

block.push({
  x : 640,
  y : canvas.height - 340,
  width : 20,
  height : 10
});


block.push({
  x : 750,
  y : canvas.height - 370,
  width : 50,
  height : 10
});


block.push({
  x : 600,
  y : canvas.height - 450,
  width : 60,
  height : 10
});


block.push({
  x : 520,
  y : canvas.height - 500,
  width : 20,
  height : 10
});


block.push({
  x : 270,
  y : canvas.height - 450,
  width : 80,
  height : 10
});


block.push({
  x : 140,
  y : canvas.height - 500,
  width : 90,
  height : 10
});


block.push({
  x : 40,
  y : canvas.height - 500,
  width : 60,
  height : 10
});

// level 2 blocks
var block1 = [];

block1.push({
  x : 140,
  y : canvas.height - 50,
  width : 20,
  height : 10
});
