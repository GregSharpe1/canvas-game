// This will request which browser!
(function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

// setup for the global varaibles
// this will hold the current level number
var levelNum = 1;
// current score of the player
var score = 0;
// holding the varaible for the sound toggle
var sound = true;

// Importing all of the sounds used
var coin_collect = new Audio("sounds/coin-collect.wav");
var level_up = new Audio("sounds/level-up.wav");
var jump = new Audio("sounds/jump.wav");
var splash = new Audio("sounds/splash.wav");


// Create the canvas from the given element in the HTML
var canvas = document.getElementById("main"),
    // Give the canvas 2D context
    context = canvas.getContext("2d"),

// setting the hieght and width of the canvas
    height = 600,
    width = 800,

// Create the player giving some config
    player = {
// this is where the player will start
        x: 30,
        y: height - 50,
// How tall and wide the player is
        height: 50,
        width: 30,
// speed of which the player moves
        speed: 3,
        velX: 0,
        velY: 0,
// create a varabile for jumping
        jumping: false,
// create a variable for if the player is grounded or not
        grounded: false
    },


// this declares the inital location, height and width of the
// treasure chest.
    prize = {
        // this is where the 'prize' (obstacles) will be placed.
        x: 50,
        y: 50,
        height: 45,
        width: 30
    },

// this will be used to create the layer of water on level 3
  water = {
        x: 0,
        y: height - 50,
        height: 10,
        width: 800
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

// background images
var bg = new Image();
bg.src = "img/bg.png";

// coin images
var coin = new Image();
coin.src = "img/coin.png";

// treasure
var treasure = new Image();
treasure.src = "img/treasure.png";

var water_img = new Image();
water_img.src = "img/water.png";

var wood_img = new Image();
wood_img.src = "img/wood.png";

// this will be the main function where bsically everything will
// happen. From placing the images to playing the sounds.
// this function will take user input

// this function will process keypresses
function processUserInput() {


    // W  || spacebar || up arrow (Jump)
    if (keys[87] || keys[32] || keys[38]) {
        if (!player.jumping && player.grounded) {
            player.jumping = true;
            player.grounded = false;
            player.velY = -player.speed * 2;
            jump.play();
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
    // escape on the x axis
    if (player.x >= width - player.width) {
        player.x = width - player.width;
    } else if (player.x <= 0) {
        player.x = 0;
    }

    // Creating a border for the player not to
    // escape on the y axis
    if (player.y >= height - player.height) {
        player.y = height - player.height;
        player.jumping = false;
    }

    // set the grounded variable to false
    player.grounded = false;


    // Clear the context
    context.clearRect(0, 0, width, height);

    // this function will check that I can jump
    // and move when on top of the floor

    var floorCollision = checkCollisions(player, floor);

    // left or right
    if (floorCollision === "l" || floorCollision === "r") {
        player.velX = 0;
        player.jumping = false;
    // collision on the bottom
    } else if (floorCollision === "b") {
        player.grounded = true;
        player.jumping = false;
    // collision on the top
    } else if (floorCollision === "t") {
        player.velY *= -1;
    }

    // this big if statement is for

    context.drawImage(bg, 0, 0);

    if (levelNum == 1) {
        context.drawImage(character, player.x, player.y);
        context.fillRect(floor.x, floor.y, floor.width, floor.y);
        //  context.drawImage(coin, 50, 50);


        // this for loop is repeated in each levelNum if statement.
        // therefor I will make a general comment about this loop

        // This loop draw the coins based on the positions set below
        // it also check for collisions using the checkcol
        for (var j = 0; j < coin_a.length; j++) {

            context.drawImage(coin, coin_a[j].x, coin_a[j].y, coin_a[j].width, coin_a[j].height);

            var collect = checkCollisions(player, coin_a[j]);

            if (collect === "l" || collect === "r") {
                coin_a[j] = 0;
                coin_collect.play();
                score++;
            } else if (collect === "b") {
                coin_a[j] = 0;
                coin_collect.play();
                score++;
            } else if (collect === "t") {
                coin_a[j] = 0;
                coin_collect.play();
                score++;
            }

        }



        for (var i = 0; i < platform.length; i++) {


            context.drawImage(wood_img,platform[i].x, platform[i].y, platform[i].width, platform[i].height);


            var dir = checkCollisions(player, platform[i]);

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


        for (var j = 0; j < coin_a1.length; j++) {

            context.drawImage(coin, coin_a1[j].x, coin_a1[j].y, coin_a1[j].width, coin_a1[j].height);

            var collect = checkCollisions(player, coin_a1[j]);

            if (collect === "l" || collect === "r") {
                coin_a1[j] = 0;
                coin_collect.play();
                score++;
            } else if (collect === "b") {
                coin_a1[j] = 0;
                coin_collect.play();
                score++;
            } else if (collect === "t") {
                coin_a1[j] = 0;
                coin_collect.play();
                score++;
            }

        }





        for (var i = 0; i < platform1.length; i++) {

            context.drawImage(wood_img, platform1[i].x, platform1[i].y, platform1[i].width, platform1[i].height);


            var dir2 = checkCollisions(player, platform1[i]);

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

        context.fillRect(floor.x, floor.y, floor.width, floor.y);

        bg.src = "img/bg3.png";
        context.drawImage(water_img,water.x,water.y,water.width,50);

        for (var j = 0; j < coin_a2.length; j++) {

            context.drawImage(coin, coin_a2[j].x, coin_a2[j].y, coin_a2[j].width, coin_a2[j].height);

            var collect = checkCollisions(player, coin_a2[j]);

            if (collect === "l" || collect === "r") {
                coin_a2[j] = 0;
                coin_collect.play();
                score++;
            } else if (collect === "b") {
              coin_a2[j] = 0;
              coin_collect.play();
              score++;
            } else if (collect === "t") {
              coin_a2[j] = 0;
              coin_collect.play();
              score++;
            }

        }



        for (var i = 0; i < platform2.length; i++) {

            context.drawImage(wood_img,platform2[i].x, platform2[i].y, platform2[i].width, platform2[i].height);


            var dir3 = checkCollisions(player, platform2[i]);

            if (dir3 === "l" || dir3 === "r") {
                player.velX = 0;
                player.jumping = false;
            } else if (dir3 === "b") {
                player.grounded = true;
                player.jumping = false;
            } else if (dir3 === "t") {
                player.velY *= -1;
            }

            var inWater = checkCollisions(player, water);

              if (inWater === "t") {
              score--;
              player.x = 15;
              player.y = height - 467;
              splash.play();
            }

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
        level_up.play();
        levelNum++;
        player.x = 0;
        player.y = height - 0;

        if (levelNum == 3) {
            player.x = 15;
            player.y = height - 467;
        }

    }

    // add velocity to the current players position
    // in both X and Y positions

    player.x += player.velX;
    player.y += player.velY;

    // if the varaible levelNum is over three
    // call the game over function

    if (levelNum > 3) {
        game_over();
    }

    // refresh the page
    window.requestAnimationFrame(processUserInput);
    // run the score_counter function
    score_counter();
    // run the level_counter function
    level_counter();
}

// this function will completely clear the canvas and
// place the final score onto the canvas.

var game_over = function() {


    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(bg,0,0);
    var c = document.getElementById("main");
    var ctx = c.getContext("2d");
    ctx.font = "50px Arial";
    ctx.fillText("You finished with a score of: " + score, 60, 300);

    score_counter.ctx.clearRect(0,0,canvas.width, canvas.height);

}

// testing


// this function is used to display the current score of
// the player. It does this by simply adding one to the
// global varaible 'score' every time a coin is collected

var score_counter = function() {

    var c = document.getElementById("main");
    var ctx = c.getContext("2d");
    ctx.font = "30px Arial";
    ctx.fillText("Score: " + score, 650, 40);

}

// This function displays the current level on the
// top left of the canvas. It does this by grabbing
// and writing out the global variable 'levelNum'.
// the level number is increased every time I
// move onto the next level or "collect the treasure".

var level_counter = function() {

        var c = document.getElementById("main");
        var ctx = c.getContext("2d");
        ctx.font = "30px Arial";
        ctx.fillText("Level: " + levelNum, 20, 40);

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

// this function will check whether or not there has been a
// collosion between shapeA and shapeB. The function works by
// taking the positions of each shape in this case. and finding
// out if they overlap. If so, collision is detected and with
// code above I have used that to allow the player to jump
// onto the platforms, collect coins and move onto the next level.

function checkCollisions(shapeA, shapeB) {

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


// The below code is giving parameters to the
// platforms that the player jumps on
// it is also giving positions of where each
// coin or platform should be placed.

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

coin_a.push({
    x: 300,
    y: canvas.height - 500,
    width: 30,
    height: 30
});

coin_a.push({
    x: 5,
    y: canvas.height - 340,
    width: 30,
    height: 30
});

// level 2 coins

var coin_a1 = [];

coin_a1.push({
    x: 220,
    y: canvas.height - 190,
    width: 30,
    height: 30
});

coin_a1.push({
    x: 700,
    y: canvas.height - 60,
    width: 30,
    height: 30
});

coin_a1.push({
    x: 650,
    y: canvas.height - 450,
    width: 30,
    height: 30
});

coin_a1.push({
    x: 175,
    y: canvas.height - 320,
    width: 30,
    height: 30
});

// level 3 coins

var coin_a2 = [];

coin_a2.push({
    x: 400,
    y: 200,
    width: 30,
    height: 30
});

coin_a2.push({
    x: 145,
    y: 200,
    width: 30,
    height: 30
});

coin_a2.push({
    x: 765,
    y: canvas.height - 210,
    width: 30,
    height: 30
});

coin_a2.push({
    x: 610,
    y: 110,
    width: 30,
    height: 30
});







var platform = [];

// Here i'm creating the first level platforms
// platform 1
platform.push({
    x: 0,
    y: canvas.height - 300,
    width: 40,
    height: 10
});

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


var platform2 = [];

// starting position for the player is changing!!!

platform2.push({
    x: 770,
    y: canvas.height - 160,
    width: 60,
    height: 10
});

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
