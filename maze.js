let img;
let restartButton, homeButton;
let startArea, endArea;
let walls = [];
let gameActive = false;
let gameWon = false;
let drawingPath = false;
let pathPoints = []; 
let startTime = 0;   
let currentTime = 0; 
let confettiArray = []; 
let confettiColor = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff']; 
let count = 0;




function preload() {
  img = loadImage('2maze.jpg'); 
}

function setup() {
  createCanvas(435, 620);
 
  
  startArea = { x: 175, y: 120, w: 75, h: 20 }; 
  endArea = { x: 235, y: 570, w: 40, h: 10 };  

  
  walls.push({ x: 0, y: 0, w: 555, h: 118 });  
  walls.push({ x: 0, y: 580, w: 425, h: 318 }); 
  walls.push({ x: 418, y: 40, w: 130, h: 620 });
  walls.push({ x: 2, y: 40, w: 10, h: 620 });
  walls.push({ x: 103, y: 40, w: 12, h: 264 });
  walls.push({ x: 112, y: 377, w: 12, h: 250 });
  walls.push({ x: 40, y: 420, w: 13, h: 105 });
  walls.push({ x: 77, y: 460, w: 13, h: 65 });
  walls.push({ x: 40, y: 250, w: 13, h: 51 });
  walls.push({ x: 70, y: 330, w: 13, h: 58 });
  walls.push({ x: 168, y: 116, w: 13, h: 75 });
  walls.push({ x: 148, y: 466, w: 13, h: 55 });
  walls.push({ x: 223, y: 466, w: 13, h: 95 });
  walls.push({ x: 211, y: 376, w: 13, h: 55 });
  walls.push({ x: 305, y: 456, w: 13, h: 135 });
  walls.push({ x: 266, y: 411, w: 13, h: 152 });
  walls.push({ x: 270, y: 249, w: 13, h: 92 });
  walls.push({ x: 330, y: 174, w: 13, h: 95 });
  walls.push({ x: 371, y: 174, w: 13, h: 95 });
  walls.push({ x: 380, y: 328, w: 13, h: 123 });
  walls.push({ x: 380, y: 474, w: 13, h: 95 });
  walls.push({ x: 340, y: 367, w: 13, h: 162 });
  walls.push({ x: 10, y: 133, w: 162, h: 13 });
  walls.push({ x: 227, y: 133, w: 200, h: 13 });
  walls.push({ x: 236, y: 113, w: 200, h: 23 });
  walls.push({ x: 11, y: 172, w: 63, h: 13 });
  walls.push({ x: 135, y: 176, w: 122, h: 13 });
  walls.push({ x: 381, y: 174, w: 63, h: 13 });
  walls.push({ x: 40, y: 209, w: 148, h: 13 });
  walls.push({ x: 223, y: 208, w: 120, h: 13 });
  walls.push({ x: 11, y: 252, w: 71, h: 13 });
  walls.push({ x: 169, y: 250, w: 102, h: 13 });
  walls.push({ x: 307, y: 290, w: 111, h: 13 });
  walls.push({ x: 81, y: 289, w: 154, h: 13 });
  walls.push({ x: 35, y: 331, w: 80, h: 13 });
  walls.push({ x: 145, y: 328, w: 216, h: 13 });
  walls.push({ x: 12, y: 374, w: 60, h: 13 });
  walls.push({ x: 12, y: 420, w: 71, h: 13 });
  walls.push({ x: 112, y: 376, w: 79, h: 13 });
  walls.push({ x: 212, y: 376, w: 108, h: 13 });
  walls.push({ x: 152, y: 419, w: 71, h: 13 });
  walls.push({ x: 272, y: 411, w: 71, h: 13 });
  walls.push({ x: 152, y: 465, w: 71, h: 13 });
  walls.push({ x: 77, y: 460, w: 41, h: 13 });
  walls.push({ x: 387,y: 438, w: 41, h: 13 });
  walls.push({ x: 157, y: 508, w: 41, h: 13 });
  walls.push({ x: 7, y: 550, w: 221, h: 13 });
  walls.push({ x: 267, y: 550, w: 221, h: 13 });
  walls.push({ x: 7, y: 560, w: 221, h: 20 });
  walls.push({ x: 267, y: 560, w: 221, h: 20 });
  walls.push({ x: 7, y: 110, w: 159, h: 20 });
  
  
 
  
  homeButton = createButton('Home');
  homeButton.position(0, 0);
  homeButton.mousePressed(homeButtonPressed);
  homeButton.size(50, 50);
  homeButton.style('background-color', 'transparent'); 
  homeButton.style('border', 'none');                
  homeButton.style('font-size', '0px');              

}



  
function draw() {
  background(255);
  image(img, 0, 0); 
  let c = [255, 255, 255];
  noStroke();
  fill(c);
  rect(285, 10, 120, 100);
 
  
  
  
 
  if (!gameActive && isMouseInRect(startArea)) {
    gameActive = true;
    drawingPath = true;
    startTime = millis();
  }

 
  if (gameActive && !gameWon) {
    pathPoints.push({ x: mouseX, y: mouseY })
  }
if (gameWon) {
    displayGrayOverlay();
  }
  
  stroke(0, 0, 255); 
  strokeWeight(3);
  noFill();
  beginShape();
  for (let i = 0; i < pathPoints.length; i++) {
    vertex(pathPoints[i].x, pathPoints[i].y);
  }
  endShape();
  
  
  
  noStroke();
  drawTimer();

  
  if (gameActive && !gameWon) {
    checkMousePosition();
  }

  
 fill(0);
  textSize(16);
  textAlign(CENTER);
  if (!gameActive && !gameWon) {
    text("Hover on Start to Begin", width / 4.9, height / 5.4);
  } else if (gameWon) {
    drawResultPage();
  }

  
  if (gameWon) {
    for (let i = 0; i < confettiArray.length; i++) {
      confettiArray[i].confettiDisplay();
    }
  }
}
function homeButtonPressed() {
  homeButton.style('background-color', 'red');
}

function drawTimer() {
 
  fill(200); 
  rect(156, 60, 95, 25); 

 
  if (gameActive && !gameWon) {
    currentTime = millis() - startTime;
  }

 
  let minutes = floor(currentTime / 60000);
  let seconds = floor((currentTime % 60000) / 1000);

  
  let formattedMinutes = nf(minutes, 2); 
  let formattedSeconds = nf(seconds, 2); 

  
  fill(0); 
  textSize(18);
  textAlign(CENTER, CENTER);
  text(formattedMinutes + ":" + formattedSeconds, 156 + 95 / 2, 60 + 25 / 2); 
}

function checkMousePosition() {
  
  if (gameActive && isMouseInRect(endArea)) {
    gameWon = true;
    gameActive = false;
    drawingPath = false;
    console.log("Mouse reached the end area");
    currentTime = millis() - startTime;

   
    if (currentTime < 10000) {
      count = 4; 
    } else if (currentTime < 20000) {
      count = 3;
    } else if (currentTime < 30000) {
      count = 2; 
    } else {
      count = 1; 
    }
    

    generateConfetti();
  }

  
  if (gameActive && touchingWall()) {
    console.log("Mouse touched the wall");
    restartGame();
  }
}

function displayGrayOverlay() {
  
  fill(0, 0, 0, 150); 
  rect(0, 0, width, height);

  
  drawResultPage();

  
  drawReturnButton();
}

function drawResultPage() {
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(36);
  text("Congratulations!", width / 2, height / 3);
  
  
  if (count === 1) {
    textSize(25);
    text("You Can Do Better!", width / 2, height / 2);
  } else if (count === 2) {
    textSize(60);
    text("🥉", width / 2, height / 2);
  } else if (count === 3) {
    textSize(60);
    text("🥈", width / 2, height / 2);
  } else if (count === 4) {
    textSize(60);
    text("🥇", width / 2, height / 2);
  }
}
function drawReturnButton() {
  fill(200, 0, 0);
  rect(width / 2 - 50, height - 80, 100, 40, 5);
  fill(255);
  textSize(16);
  text("Return", width / 2, height - 60);
}

function mousePressed() {
  if (gameWon && mouseX > width / 2 - 50 && mouseX < width / 2 + 50 && mouseY > height - 80 && mouseY < height - 40) {
    restartGame();
  }
}

function isMouseInRect(area) {
  return mouseX > area.x && mouseX < area.x + area.w && mouseY > area.y && mouseY < area.y + area.h;
}

function touchingWall() {
  
  for (let i = 0; i < walls.length; i++) {
    if (isMouseInRect(walls[i])) {
      return true;  
    }
  }
  return false; 
}

function restartGame() {
  console.log("Game restarted");
  gameActive = false;
  gameWon = false;
  drawingPath = false;
  pathPoints = []; 
  currentTime = 0; 
  clear(); 
  setTimeout(() => {
    background(255); 
    image(img, 0, 0);
  }, 0); 
}
function generateConfetti() {
  for (let i = 0; i < 100; i++) {
    confettiArray.push(new Confetti(random(width), random(-height, 0), random(1, 3)));
  }
}


class Confetti {
  constructor(_x, _y, _s) {
    this.x = _x;
    this.y = _y;
    this.speed = _s;
    this.time = random(0, 100);
    this.color = random(confettiColor);
    this.amp = random(2, 30);
    this.phase = random(0.5, 2);
    this.size = random(width / 25, height / 50);
    this.form = round(random(0, 1));
  }

  confettiDisplay() {
    fill(this.color);
    noStroke();
    push();
    translate(this.x, this.y);
    translate(this.amp * sin(this.time * this.phase), this.speed * cos(2 * this.time * this.phase));
    rotate(this.time);
    rectMode(CENTER);
    scale(cos(this.time / 4), sin(this.time / 4));
    if (this.form === 0) {
      rect(0, 0, this.size, this.size / 2);
    } else {
      ellipse(0, 0, this.size);
    }
    pop();

    this.time = this.time + 0.1;

    this.speed += 1 / 200;

    this.y += this.speed;
  }
}

