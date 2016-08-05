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
var score = 0;
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
        x: 30,
        y: height - 50,
        height: 50,
        width: 30,
        speed: 3,
        velX: 0,
        velY: 0,
        jumping: false,
        grounded: false
    },



    prize = {
        // this is where the 'prize' (obstacles) will be placed.
        x: 50,
        y: 50,
        height: 45,
        width: 30
    },

    badfloor = {
        x: 0,
        y: height - 5,
        height: 5,
        wdith: canvas.width
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
var character = new Image();
character.src = "img/player.png";
// player jumping image inverted
var character_inverted = new Image();
character_inverted.src = "img/player-inverted.png";
// player running images
var kang_running = new Image();
kang_running.src = "img/kangaroo-running.gif";

// player running images inverted
var kang_running_inverted = new Image();
kang_running_inverted.src = "img/kang-running-inverted.gif";

// background images
var bg = new Image();
bg.src = "img/background.png";

// coin images
var coin = new Image();
coin.src = "img/coin.png";

// Add Image for Obstacle.
//tumble weed
var treasure = new Image();
treasure.src = "img/treasure.png";
// another obstacle.. haven't thought what yet
var obstacle2 = new Image();
obstacle2.src = "img/obstacle2.jpg";



// this function will process keypresses
function processUserInput() {


    // W  || spacebar || up arrow (Jump)
    if (keys[87] || keys[32] || keys[38]) {
        if (!player.jumping && player.grounded) {
            player.jumping = true;
            player.grounded = false;
            player.velY = -player.speed * 2;

        }
    }

    // A LEFT or left arrow
    if (keys[65] || keys[37]) {
        character.src = "img/player-inverted.png";
        if (player.velX < player.speed) {
            player.velX--;
        }
    }
    // D or RIGHT arrow
    if (keys[68] || keys[39]) {
        character.src = "img/player.png";
        if (player.velX < player.speed) {
            player.velX++;
        }
    }

    player.velX *= friction;
    player.velY += gravity;


    // Creating a border for the player not to
    // escape
    if (player.x >= width - player.width) {
        player.x = width - player.width;
    } else if (player.x <= 0) {
        player.x = 0;
    }

    if (player.y >= height - player.height) {
        player.y = height - player.height;
        player.jumping = false;
    }

    player.grounded = false;


    // Clear the context
    context.clearRect(0, 0, width, height);

    // drawing the character
    var dir1 = colCheck(player, floor);
    if (dir1 === "l" || dir1 === "r") {
        player.velX = 0;
        player.jumping = false;
    } else if (dir1 === "b") {
        player.grounded = true;
        player.jumping = false;
    } else if (dir1 === "t") {
        player.velY *= -1;
    }



    if (levelNum == 1) {
        context.drawImage(character, player.x, player.y);
        context.fillRect(floor.x, floor.y, floor.width, floor.y);
      //  context.drawImage(coin, 50, 50);


        for (var j = 0; j < coin_a.length; j++) {

            context.drawImage(coin, coin_a[j].x, coin_a[j].y, coin_a[j].width, coin_a[j].height);

            var collect = colCheck(player, coin_a[j]);

            if (collect === "l" || collect === "r") {
                coin_a[j] = 0;
                score++;
            } else if (collect === "b") {
              coin_a[j] = 0;
              score++;
            } else if (collect === "t") {
              coin_a[j] = 0;
              score++;
            }

        }



        for (var i = 0; i < platform.length; i++) {


            context.fillRect(platform[i].x, platform[i].y, platform[i].width, platform[i].height);


            var dir = colCheck(player, platform[i]);

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


    } else if (levelNum == 2) {
        context.drawImage(character, player.x, player.y);
        prize.y = 100;
        context.fillRect(floor.x, floor.y, floor.width, floor.y);

        for (var i = 0; i < platform1.length; i++) {

            context.fillRect(platform1[i].x, platform1[i].y, platform1[i].width, platform1[i].height);


            var dir2 = colCheck(player, platform1[i]);

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

        prize.x = 30;
        prize.y = height - 400;


    } else if (levelNum == 3) {

        context.drawImage(character, player.x, player.y);


        context.fillRect(badfloor.x, badfloor.y, badfloor.width, badfloor.height);

        for (var i = 0; i < platform2.length; i++) {

            context.fillRect(platform2[i].x, platform2[i].y, platform2[i].width, platform2[i].height);


            var dir3 = colCheck(player, platform2[i]);

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

        var dir33 = colCheck(player, badfloor);

        if (dir33 == "t") {
            alert("dead");
        }
        prize.x = 725;
        prize.y = height - 560;

    }

    // make sure that the player is grounded
    if (player.grounded) {
        player.velY = 0;
    }

    context.drawImage(treasure, prize.x, prize.y);

    if (
        player.x <= (prize.x + 32) &&
        prize.x <= (player.x + 32) &&
        player.y <= (prize.y + 32) &&
        prize.y <= (player.y + 32)
    ) {

        context.clearRect(0, 0, width, height);

        levelNum++;
        player.x = 0;
        player.y = height - 0;

        if (levelNum == 3) {
            player.x = 15;
            player.y = height - 467;
        }

    }

    player.x += player.velX;
    player.y += player.velY;


    // refresh the page
    window.requestAnimationFrame(processUserInput);
    score_counter();
    level_counter();
}



var score_counter = function() {

  var c = document.getElementById("main");
  var ctx = c.getContext("2d");
  ctx.font = "30px Arial";
  ctx.fillText("Score: " + score,680,40);

}

var level_counter = function() {

  var c = document.getElementById("main");
  var ctx = c.getContext("2d");
  ctx.font = "30px Arial";
  ctx.fillText("Level: " + levelNum,20,40);

}
// testing
if (levelNum == 3) {
    player.x = 15;
    player.y = height - 467;
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
window.addEventListener("load", function() {
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



    // make sure the player's facing the right way
    character.src = "img/player.png";



    // TODO: Randomly move the prize.

}

// This platform is used to create the floor on which
// the player starts on
var floor = {
    x: 0,
    y: height - 5,
    width: canvas.width,
    height: canvas.height,
}

// Level 1

var coin_a = [];

coin_a.push({
    x: 500,
    y: canvas.height - 70,
    width: 30,
    height: 30
});

coin_a.push({
    x: 635,
    y: canvas.height - 390,
    width: 30,
    height: 30
});

coin_a.push({
    x: 200,
    y: canvas.height - 180,
    width: 30,
    height: 30
});



var platform = [];

// Here i'm creating the first level platforms
// platform 1
platform.push({
    x: 100,
    y: canvas.height - 60,
    width: 20,
    height: 10
});

platform.push({
    x: 170,
    y: canvas.height - 130,
    width: 70,
    height: 10
});

platform.push({
    x: 300,
    y: canvas.height - 150,
    width: 70,
    height: 10
});

platform.push({
    x: 430,
    y: canvas.height - 230,
    width: 80,
    height: 10
});

platform.push({
    x: 500,
    y: canvas.height - 280,
    width: 20,
    height: 10
});

platform.push({
    x: 640,
    y: canvas.height - 340,
    width: 20,
    height: 10
});


platform.push({
    x: 750,
    y: canvas.height - 370,
    width: 50,
    height: 10
});


platform.push({
    x: 600,
    y: canvas.height - 450,
    width: 60,
    height: 10
});


platform.push({
    x: 520,
    y: canvas.height - 500,
    width: 20,
    height: 10
});


platform.push({
    x: 270,
    y: canvas.height - 450,
    width: 80,
    height: 10
});


platform.push({
    x: 140,
    y: canvas.height - 500,
    width: 90,
    height: 10
});


platform.push({
    x: 40,
    y: canvas.height - 500,
    width: 60,
    height: 10
});

// level 2 platforms
var platform1 = [];

platform1.push({
    x: 140,
    y: canvas.height - 50,
    width: 20,
    height: 10
});

platform1.push({
    x: 20,
    y: canvas.height - 120,
    width: 50,
    height: 10
});

platform1.push({
    x: 200,
    y: canvas.height - 150,
    width: 70,
    height: 10
});

platform1.push({
    x: 340,
    y: canvas.height - 100,
    width: 40,
    height: 10
});

platform1.push({
    x: 470,
    y: canvas.height - 110,
    width: 60,
    height: 10
});

platform1.push({
    x: 650,
    y: canvas.height - 150,
    width: 20,
    height: 10
});

platform1.push({
    x: 740,
    y: canvas.height - 200,
    width: 20,
    height: 10
});

platform1.push({
    x: 775,
    y: canvas.height - 260,
    width: 25,
    height: 10
});

platform1.push({
    x: 700,
    y: canvas.height - 330,
    width: 60,
    height: 10
});

platform1.push({
    x: 550,
    y: canvas.height - 300,
    width: 60,
    height: 10
});

platform1.push({
    x: 400,
    y: canvas.height - 380,
    width: 80,
    height: 10
});

platform1.push({
    x: 300,
    y: canvas.height - 300,
    width: 30,
    height: 10
});

platform1.push({
    x: 170,
    y: canvas.height - 280,
    width: 40,
    height: 10
});

platform1.push({
    x: 10,
    y: canvas.height - 350,
    width: 90,
    height: 10
});

// prize position for this level
// x : 30
// y : canvas.height - 300

var platform2 = [];

// starting position for the player is changing!!!

platform2.push({
    x: 0,
    y: canvas.height - 420,
    width: 60,
    height: 10
});

platform2.push({
    x: 140,
    y: canvas.height - 350,
    width: 40,
    height: 10
});

platform2.push({
    x: 270,
    y: canvas.height - 370,
    width: 40,
    height: 10
});

platform2.push({
    x: 420,
    y: canvas.height - 270,
    width: 30,
    height: 10
});

platform2.push({
    x: 560,
    y: canvas.height - 180,
    width: 40,
    height: 10
});

platform2.push({
    x: 660,
    y: canvas.height - 220,
    width: 50,
    height: 10
});

platform2.push({
    x: 760,
    y: canvas.height - 280,
    width: 40,
    height: 10
});

platform2.push({
    x: 600,
    y: canvas.height - 350,
    width: 80,
    height: 10
});

platform2.push({
    x: 470,
    y: canvas.height - 400,
    width: 30,
    height: 10
});

platform2.push({
    x: 660,
    y: canvas.height - 220,
    width: 50,
    height: 10
});

platform2.push({
    x: 600,
    y: canvas.height - 450,
    width: 50,
    height: 10
});

// final platform
platform2.push({
    x: 730,
    y: canvas.height - 500,
    width: 50,
    height: 10
});

// prize position
