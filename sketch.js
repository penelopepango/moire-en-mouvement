let numLines = 100;
let angleOffset = 5.01;
let spacing = 8;

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
}

function draw() {
  background(255, 90);
  translate(width / 2, height / 2);

  // Automatic movement
  let t = millis() * 0.0002;

  let autoX = sin(t * 0.7) * width * 0.3;
  let autoY = cos(t * 0.5) * height * 0.3;

  // Mouse / touch position relative to center
  let inputX;
  let inputY;

  if (touches.length > 0) {
    // Use finger position on iPad
    inputX = touches[0].x - width / 2;
    inputY = touches[0].y - height / 2;
  } else {
    // Use mouse on computer
    inputX = mouseX - width / 2;
    inputY = mouseY - height / 2;
  }

  // Automatic movement + interaction
  let fx = autoX + inputX * 0.5;
  let fy = autoY + inputY * 0.5;

  for (let y = -height; y < height * 2; y += spacing) {

    let angle = atan2(y - fy, fx);

    let x1 = -width / 2;
    let y1 = y;

    let x2 = width / 2;
    let y2 = y;

    // Distance from center
    let d = dist(fx, fy, 0, 0);
    let alpha = map(d, 0, width / 2, 255, 80);

    stroke(0, alpha);

    // Horizontal line
    line(x1, y1, x2, y2);

    // Diagonal lines
    let x3 = cos(angle + angleOffset * t) * width / 2;
    let y3 = sin(angle + angleOffset * t) * width / 2;

    line(x1, y1, x3, y3);
    line(x2, y2, x3, y3);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}