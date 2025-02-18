let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;

// in p5.js, the function runs on page load:
function setup() {
  createCanvas(canvasWidth, canvasHeight);

  // invoke any drawing functions inside of setup.
  // functions should all go between "createCanvas()" and "drawGrid()"
  //draw5Circles();
  //draw5RedSquares();
  // I promise they work, you just need to comment out each one to test each!
  draw5CirclesWhile();
  draw5CirclesFor();
  drawNCircles(5);
  drawNCirclesFlexible(30, 25, 400, 0);
  drawNCirclesFlexible(4, 100, 100, 200);
  drawNCirclesFlexible(8, 50, 700, 100);
  drawNShapesFlexible(30, 30, 335, 0, 'square');
  drawNShapesFlexible(4, 100, 120, 200, 'circle');
  drawNShapesFlexible(8, 50, 725, 25, 'square');
  drawNShapesDirectionFlexible(30, 30, 335, 0, 'square', 'column');
  drawNShapesDirectionFlexible(4, 100, 120, 200, 'circle', 'row');
  drawNShapesDirectionFlexible(8, 50, 725, 425, 'circle', 'row');
  drawGrid(canvasWidth, canvasHeight);
}

// my first function
function draw5Circles() {
  noFill();
  // fill('red');
  let x = 100;
  let y = 200;
  let d = 50;
  let i = 0;
  while (i < 200) {
    /*
    if i is even, make it pink
    else make it teal */
    if (i % 2 === 0) {
      fill('hotpink');
    } else fill('teal');
    circle(x, y, d);
    d += 1;
    y += 10;
    i++;
  }
  circle(100, 200, 50); // centerX, centerY, radius
  circle(100, 250, 50);
  circle(100, 300, 50);
  circle(100, 350, 50);
  circle(100, 400, 50);
}

function draw5CirclesWhile() {
  let x = 100;
  let y = 200;
  let z = 50;
  let i = 0;
  while (i < 5) {
    circle(x, y + z * i, z);
    i++;
  }
}

function draw5CirclesFor() {
  let x = 300;
  let y = 200;
  let z = 50;

  for (let i = 0; i < 5; i++) {
    circle(x, y, z);
    x += 50;
  }
}

function drawNCircles(n) {
  let x = 300;
  let y = 300;
  let z = 50;
  for (i = 0; i < n; i++) {
    circle(x, y + z * i, z);
  }
}

function drawNCirclesFlexible(n, size, x, y) {
  for (let i = 0; i < n; i++) {
    circle(x, y + size * i, size);
  }
}

function drawNShapesFlexible(n, size, x, y, shape) {
  for (let i = 0; i < n; i++) {
    if (shape === 'square') {
      square(x, y + size * i, size);
    } else {
      circle(x, y + size * i, size);
    }
  }
}
// Could not stop it from saving the parameters like that, I am sorry!
function drawNShapesDirectionFlexible(
  n,
  size,
  x,
  y,
  shape,
  direction
) {
  for (let i = 0; i < n; i++) {
    if (shape === 'square') {
      square(x, y, size);
    } else {
      circle(x, y, size);
    }

    if (direction === 'column') {
      y += size;
    } else {
      x += size;
    }
  }
}

function draw5RedSquares() {
  fill('red');
  square(320, 200, 50); // topLeftX, topLeftY, width
  square(320, 250, 50);
  square(320, 300, 50);
  square(320, 350, 50);
  square(320, 400, 50);
}
