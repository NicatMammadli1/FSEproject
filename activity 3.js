let count = 0;
let state = "start";
let redCircles = [];
let whiteCircles = [];
let circleRemoved = [false, false, false, false];
let showSubmitButton = true;
let timerValue = 15;
let timerActive = false;
let draggingCircle = null;
let resultsVisible = false;



let confetti = [];
let confettiActive = false;
let confettiTimer = 0; 
const confettiDuration = 6; 
const confettiColor = ['orange', 'cyan', 'pink', 'blue', 'yellow', 'lime', 'red'];

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

function setup() {
  createCanvas(400, 620);
  textAlign(CENTER, CENTER);
  setInterval(timeIt, 1000);
  if(getItem('r')==true){
  storeItem('3m', 'bl');
}
}
function preload(){
  music = createAudio('gameMusic.mp3');
  try{
  if(getItem('sound')==true){
    music.loop(true);
  }
    else{
      music.stop();
    }
  }
catch(error){
storeItem('sound', true);
  music.loop(true)
}
}
function resetCircles() {
  redCircles = [];
  whiteCircles = [];
  circleRemoved = [false, false, false, false];
  count = 0;
  for (let i = 0; i < 4; i++) {
    let randomX = random(50, 350);
    let randomY = random(350, 550);
    redCircles.push({ x: randomX, y: randomY });
  }
  for (let i = 0; i < 4; i++) {
    let randomX = random(50, 350);
    let randomY = random(200, 300);
    whiteCircles.push({ x: randomX, y: randomY });
  }
  timerValue = 15;
  timerActive = false;
  draggingCircle = null;
  showSubmitButton = true;
  resultsVisible = false;
  confetti = [];
  confettiActive = false;
  confettiTimer = 0; 
}

function draw() {
  background(220);

  if (state === "start") {
    drawMainPage();
  } else if (state === "begin") {
    drawBeginPage();
  } else if (state === "submit" && resultsVisible) {
    drawResultPage();
  } else if (state === "home") {
    storeItem('r', false);
    window.location.href = 'main.html';
  } else if (state === "error") {
    drawErrorPage();
  }

  if (timerActive) {
    fill(0);
    textSize(30);
    if (timerValue >= 10) {
      text("0:" + timerValue, 200, 50);
    } else {
      text("0:0" + timerValue, 200, 50);
    }
    if (timerValue === 0) {
      timerActive = false;
      state = "start";
    }
  }

  if (confettiActive) {
    drawConfetti();
    if (confettiTimer >= confettiDuration) {
      confettiActive = false; 
      
    }
    confettiTimer += 0.018; 
    
  }
}

function drawMainPage() {
  textSize(36);
  fill('darkred');
  text("OBJECT PICK UP", 200, 65);
  textFont('Comic Sans MS');
  fill("orange");
  rect(125, 175, 150, 60);
  fill('black');
  textSize(20);
  text("Begin", 200, 205);
  fill("violet");
  ellipse(200, 325, 130, 130);
  fill('black');
  text("Restart", 200, 330);
  fill("lime");
  rect(125, 420, 150, 90);
  fill(0);
  textSize(20);
  text("Home", 200, 470);

  if (showSubmitButton) {
    if (count === 2) {
      fill('#a3470f');
    } else if (count === 3) {
      fill('#BFC1C2');
    } else if (count === 4) {
      fill('#FFBF00');
    } else {
      fill('black');
    }
    rect(150, 550, 100, 40);
    fill('white');
    text("Submit", 200, 570);
  }
  textSize(24);
  fill('darkred');
  text("Count: " + count, 200, 100);
}

function drawBeginPage() {
  textSize(24);
  text("Drag the circles to the target", 200, 100);
  drawWhiteCircles();
  drawRedCircles();

  if (count === 4) {
    state = "submit";
    timerActive = false;
    resultsVisible = true;
    if (!confettiActive) {
      generateColorBurst(); 
    }
  }
}

function drawRedCircles() {
  for (let i = 0; i < redCircles.length; i++) {
    if (!circleRemoved[i]) {
      fill("blue");
      ellipse(redCircles[i].x, redCircles[i].y, 35, 35);
    }
  }
}

function drawWhiteCircles() {
  for (let i = 0; i < whiteCircles.length; i++) {
    fill("white");
    stroke("black");
    ellipse(whiteCircles[i].x, whiteCircles[i].y, 35, 35);
  }
}

function drawErrorPage() {
  textSize(30);
  fill("red");
  text("Complete the game first!", 200, 150);
  fill("lightblue");
  rect(150, 500, 100, 40);
  fill("black");
  textSize(18);
  text("Back", 200, 520);
}

function drawResultPage() {
  textSize(36);
  fill(0);
  text("Results:", 200, 100);
  if (count === 1) {
    textSize(25);
    text("You Can Do Better!", 200, 250);
  } else if (count === 2) {
    textSize(60);
    text("🥉", 200, 250);
    storeItem('3m', 'b');
  } else if (count === 3) {
    textSize(60);
    text("🥈", 200, 250);
    storeItem('3m', 's');
  } else if (count === 4) {
    textSize(60);
    text("🥇", 200, 250);
    storeItem('3m', 'g');
  }
  fill("lightblue");
  rect(80, 500, 100, 40);
  fill("black");
  textSize(20);
  text("Back", 130, 520);
  fill(200);
  rect(220, 500, 100, 40);
  fill(0);
  textSize(20);
  text("Home", 270, 520);
}

function mousePressed() {
  if (state === "start") {
    if (mouseX > 125 && mouseX < 275 && mouseY > 175 && mouseY < 235) {
      state = "begin";
      resetCircles();
      timerActive = true;
    } else if (dist(mouseX, mouseY, 200, 325) < 65) {
      count = 0;
      resetCircles();
    } else if (mouseX > 125 && mouseX < 275 && mouseY > 455 && mouseY < 545) {
      state = "home";
    } else if (mouseX > 150 && mouseX < 250 && mouseY > 550 && mouseY < 590) {
      if (count > 0) {
        state = "submit";
        resultsVisible = true;
      } else {
        state = "error";
      }
    }
  } else if (state === "error") {
    if (mouseX > 150 && mouseX < 250 && mouseY > 500 && mouseY < 540) {
      state = "start";
    }
  } else if (state === "submit") {
    if (mouseX > 80 && mouseX < 180 && mouseY > 500 && mouseY < 540) {
      state = "start";
      resultsVisible = false;
      showSubmitButton = true;
    } 
    else if (mouseX > 220 && mouseX < 320 && mouseY > 500 && mouseY < 540) {
      state = "home";
    }
  }
  if (state === "begin") {
    for (let i = 0; i < redCircles.length; i++) {
      if (!circleRemoved[i] && dist(mouseX, mouseY, redCircles[i].x, redCircles[i].y) < 35) {
        draggingCircle = i;
        break;
      }
    }
  }
}

function mouseDragged() {
  if (state === "begin" && draggingCircle !== null) {
    let i = draggingCircle;
    redCircles[i].x = mouseX;
    redCircles[i].y = mouseY;
    if (dist(redCircles[i].x, redCircles[i].y, whiteCircles[i].x, whiteCircles[i].y) < 35 && !circleRemoved[i]) {
      circleRemoved[i] = true;
      count++;
      draggingCircle = null;
    }
  }
}

function mouseReleased() {
  draggingCircle = null;
}

function timeIt() {
  if (timerActive && timerValue > 0) {
    timerValue--;
  } else if (timerValue === 0) {
    timerActive = false;
  }
}

function drawConfetti() {
  for (let i = 0; i < confetti.length; i++) {
    confetti[i].confettiDisplay();
  }
}

function generateColorBurst() {
  for (let i = 0; i < 100; i++) {
    confetti.push(new Confetti(random(0, width), random(-200, -100), random(2, 5)));
  }
  confettiActive = true;
  confettiTimer = 0; 
}
