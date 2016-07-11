var c = document.getElementById("main");
c.addEventListener('keydown', doKeyDown, true);

// Initial Size of the Box

var boxWidth = 30;
var boxHeight = 30;

// Initail Placment of the Box
var x = 275;
var y = 310;

// Boolean for Jumping
var jumping = false;

var ctx = c.getContext("2d");
ctx.fillRect(x,y, boxWidth, boxHeight);


function doKeyDown(e)
{

  // D Key (Right)

  if (e.keyCode == 68) {
    clearCanvas();
    x = x + 10;
    ctx.fillRect(x,y, boxWidth, boxHeight);
  }

  // A Key (LEFT)

  if (e.keyCode == 65) {
    clearCanvas();
    x = x - 10;
    ctx.fillRect(x,y, boxWidth, boxHeight);
  }

  // S key (Down)

  if (e.keyCode == 83) {
    clearCanvas();
    y = y + 10;
    ctx.fillRect(x,y, boxWidth, boxHeight);
  }

  // W key (Up)

  if (e.keyCode == 87) {
    clearCanvas();
    y = y - 50  ;
    ctx.fillRect(x,y, boxWidth, boxHeight);

  }
}

// function jump() {
//
//   if (!jumping) {
//     jumping = true;
//     y = y + 50;
//     ctx.fillRect(x,y boxWidth, boxHeight);
//     setTimeout(land, 500);
//   }
// }
//
// function land() {
//   jumping = false;
//   y = y;
//   ctx.fillRect(x,y,boxWidth, boxHeight);
// }
//

function clearCanvas() {
  c.width = c.width;
}
