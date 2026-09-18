let numLines = 200;
let angleOffset = 5.01;

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  frameRate(40);
}

function draw() {
  // White background
  background(255);

  translate(width / 2, height / 2);

  // Automatic movement
  let t = millis() * 0.00013;

  let autoX = sin(t * 0.7) * width * 0.3;
  let autoY = cos(t * 0.5) * height * 0.3;

  // Mouse / touch position
  let inputX = 0;
  let inputY = 0;

  if (touches.length > 0) {
    inputX = touches[0].x - width / 2;
    inputY = touches[0].y - height / 2;
  } else {
    inputX = mouseX - width / 2;
    inputY = mouseY - height / 2;
  }

  // Combine automatic movement + touch
  let fx = autoX + inputX * 0.5;
  let fy = autoY + inputY * 0.5;

  // Drawing area
  let drawSize = max(width, height) * 1.5;
  let spacing = drawSize / numLines;

  // Calculate distance once per frame
  let d = sqrt(fx * fx + fy * fy);
  let alpha = map(d, 0, width / 2, 255, 80, true);

  stroke(0, alpha);

  // Draw lines
  for (let i = 0; i < numLines; i++) {

    let y = -drawSize / 2 + i * spacing;

    let angle = atan2(y - fy, fx);

    let x1 = -drawSize / 2;
    let x2 = drawSize / 2;

    // Horizontal line
    line(x1, y, x2, y);

    // Diagonal lines
    let x3 = cos(angle + angleOffset * t) * drawSize / 2;
    let y3 = sin(angle + angleOffset * t) * drawSize / 2;

    line(x1, y, x3, y3);
    line(x2, y, x3, y3);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

