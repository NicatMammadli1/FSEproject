let img;
let homeButton;
let startButton;
let countButton;
let count = 0;
let buttonSize = 156;
let displayCount = '';
let timer = 30;
let lastUpdate = 0;
let isTiming = false;

let medalDisplayed = false;
let isGameOver = false;

let confetti = [];
let confettiDuration = 8;
let confettiTimer = 0;
let confettiCount = 0; // Counter to keep track of the number of confetti pieces generated

function preload() {
  img = loadImage('walk.jpg');
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

function setup() {
  createCanvas(432, 624);
  
  homeButton = createButton('');
  homeButton.position(1, 1);
  homeButton.size(37, 40);
  homeButton.style('background-color', 'transparent');
  homeButton.style('border', 'none');
  homeButton.style('color', 'white');
  homeButton.mousePressed(homeButtonPressed);

  startButton = createButton('');
  startButton.position(216 - buttonSize / 2, 318 - buttonSize / 2);
  startButton.size(buttonSize, buttonSize);
  startButton.style('background-color', 'transparent');
  startButton.style('border', 'none');
  startButton.mousePressed(startButtonPressed);
  
  countButton = createButton('');
  countButton.position(216 - buttonSize / 2, 515 - buttonSize / 2);
  countButton.size(buttonSize, buttonSize);
  countButton.style('background-color', 'transparent');
  countButton.style('border', 'none');
  countButton.mousePressed(countButtonPressed);
  
  restartButton = createButton('');
  restartButton.position(382, 145 - 100 / 2);
  restartButton.size(50, 100);
  restartButton.style('background-color', 'transparent');
  restartButton.style('border', 'none');
  restartButton.mousePressed(resetTimer);
}

function draw() {
  if (!isGameOver) {
    background(img);
  }

  displayTimerAndCount();
  
  if (timer === 0 && !isGameOver && confettiTimer < confettiDuration) {
    generateConfetti();
    drawConfetti();
    confettiTimer += deltaTime / 1000;
  } else if (timer === 0 && !isGameOver) {
    showMedal();
  }

  fill(0, 0, 0, 0);
  beginShape();
  vertex(382, 145 - 100 / 2);
  vertex(402 + 50 / 2, 142);
  vertex(382, 89 + 200 / 2);
  vertex(468 - 265 / 2, 141);
  endShape(CLOSE);
}

function homeButtonPressed() {
      window.location.href = 'main.html';
}

function startButtonPressed() {
  if (timer === 0) {
    resetTimer();
  }
  isTiming = true;
  lastUpdate = millis();
}

function countButtonPressed() {
  if (isTiming) {
    displayCount = '';
    redraw();

    setTimeout(() => {
      count++;
      displayCount = count;
      redraw();
    }, 0);
  }
}

function displayTimerAndCount() {
  textAlign(CENTER, CENTER);
  textSize(70);
  fill(0);
  text(displayCount, 314, 195);

  let minutes = floor(timer / 60);
  let seconds = timer % 60;
  let timerString = nf(minutes, 2) + ':' + nf(seconds, 2);
  textSize(90);
  text(timerString, width / 2, 115);
  
  if (isTiming && timer > 0) {
    if (millis() - lastUpdate > 1000) {
      timer -= 1;
      lastUpdate = millis();
    }
  } else if (timer <= 0) {
    isTiming = false;
  }
}

function showMedal() {
  let medal = '';
  
  if (count >= 25) {
    medal = '🥇';
    storeItem('2m', 'g');
  } else if (count >= 15) {
    medal = '🥈';
    storeItem('2m', 's');
  } else if (count >= 5) {
    medal = '🥉';
    storeItem('2m', 'b');
  } else {
  }

  fill(0);
  textSize(30);
  text("Time's Up!", width / 2 - 120, height / 2 + 90);
  textSize(60);
  text(medal, width / 2 - 120, height / 2 + 140);
  isGameOver = true;
}

function resetTimer() {
  timer = 30;
  isTiming = false;
  lastUpdate = millis();
  count = 0;
  displayCount = count;
  medalDisplayed = false;
  isGameOver = false;
  confetti = [];
  confettiTimer = 0;
  confettiCount = 0; // Reset the confetti counter
  background(img);
}

function generateConfetti() {
  if (confettiCount < 500) {  // Check if we have generated less than 1000 confetti pieces
    for (let i = 0; i < 12; i++) {
      let c = new Confetti(random(width), random(-200, -5));
      confetti.push(c);
      confettiCount++;  // Increment the confetti count
      if (confettiCount >= 1000) break;  // Stop if we have generated 1000 confetti pieces
    }
  }
}

function drawConfetti() {
  for (let i = 0; i < confetti.length; i++) {
    confetti[i].update();
    confetti[i].display();
  }

  confetti = confetti.filter(c => !c.hasFallen());
}

class Confetti {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(4, 8);
    this.speedY = random(2, 5);
    this.speedX = random(-1, 1);
    this.color = color(random(255), random(255), random(255));
  }

  update() {
    this.y += this.speedY;
    this.x += this.speedX;
  }

  display() {
    noStroke();
    fill(this.color);
    rect(this.x, this.y, this.size, this.size);
  }

  hasFallen() {
    return this.y > height;
  }
}

function mousePressed() {
  if (mouseX > 340 && mouseX < 470 && mouseY > (145 - 100 / 2) && mouseY < (145 + 100 / 2)) {
    resetTimer();
  }
}
