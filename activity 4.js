let count = 0;
let state = "start";
let timerValue = 20;
let timerActive = false;
let currentObject = null;
let lastObjectTime = timerValue;
let objectsDisplayed = 0;
const objectAppearInterval = 2;  
const objectDisplayTime = 0.2; 
const maxObjects = 9;
let userScore = "";
let resultsVisible = false;
let confetti = [];
let confettiActive = false;
let confettiStartTime = 0;
const confettiDuration = 5; 
const confettiColor = ['orange', 'cyan', 'pink', 'blue', 'yellow', 'lime', 'red'];
let confettiPlayedOnce = false; 
const objectColors = ['purple', 'blue', 'green', 'red', 'orange','gold'];

class Confetti 
{
    constructor(_x, _y, _s) 
  {
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

    confettiDisplay() 
  {
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

function setup() 
{
    createCanvas(400, 620);
    textAlign(CENTER, CENTER);
    setInterval(timeIt, 1000);
}

function generateNewObject() {
    let size = random(80, 120);
    let randomX = random(50 + size / 2, 350 - size / 2); 
    let randomY = random(250 + size / 2, 500 - size / 2); 
    let type = random(['ellipse', 'rect']);
    let color = random(objectColors);
    currentObject = { x: randomX, y: randomY, type: type, size: size, color: color };
}


function draw() 
{
    background(220);
    if (state === "start") 
    {
        drawMainPage();
    } 
  else if (state === "begin") 
    {
        drawGamePage();
    } 
  else if (state === "enterScore") 
    {
        drawEnterScorePage();
    } 
  else if (state === "submit" && resultsVisible) 
    {
        drawResultPage();
    } 
  else if (state === "error") 
    {
        drawErrorPage();
    } 
  else if (state === "home") 
    {
        window.location.href = 'main.html'; 
    }

    if (timerActive) 
    {
        displayTimer();
    }

    if (confettiActive) 
    {
        drawConfetti();
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
function drawMainPage() 
{
   
    textSize(36);
    fill('gold');
    stroke('darkred');
    strokeWeight(3);
    text("ScreenShot Game", 200, 65);


    stroke("black");
    strokeWeight(2);
    fill("green");
    rect(125, 150, 150, 60);
    
    fill("white");
    textSize(20);
    text("Start", 200, 180);

   
    noFill();
    noStroke();

  
    stroke("black");
    strokeWeight(2);
    fill("red");
    ellipse(200, 290, 120, 120);
    
    fill("white");
    text("Restart", 200, 290);

   
    noFill();
    noStroke();


    stroke("black");
    strokeWeight(2);


    if (userScore === "0" || (userScore >= "1" && userScore <= "3")) 
    {
        fill("black"); 
    } 
  else if (userScore === "4" || userScore === "5") 
    {
        fill("#CD7F32");
    } 
  else if (userScore === "6" || userScore === "7") 
    {
        fill("#C0C0C0"); 
    } 
  else if (userScore === "8" || userScore === "9") 
    {
        fill("#FFD700"); 
    } 
  else {
        fill('black');
    }
    rect(125, 380, 150, 60); 

    fill('white'); 
    text("Submit", 200, 410);

    noFill();
    noStroke();

  
    textSize(36);
    fill("black");
    text("🏠", 66, 570);


    textSize(24);
    stroke("white");
    strokeWeight(5);
    fill("black");
    text("Count: " + (userScore || count), 200, 100);
}

function drawGamePage() 
{
    noStroke();
    textSize(24);
    fill('black');
    text("Take The ScreenShot", 200, 100);

    if (currentObject) 
    {
        fill(currentObject.color);
        if (currentObject.type === 'ellipse') 
        {
            ellipse(currentObject.x, currentObject.y,                               currentObject.size);
        } 
      else if (currentObject.type === 'rect') 
        {
            rect(currentObject.x, currentObject.y, currentObject.size,             currentObject.size);
        }
    }
}

function drawEnterScorePage() 
{
    noStroke();
    textSize(28);
    fill(0);
    text("Enter your score:", 200, 200);
    fill(255);
    rect(100, 300, 200, 50);
    fill(0);
    textSize(30);
    text(userScore, 200, 325);

    if (userScore === "0") 
    {
        fill('black');
    } 
  else if (userScore >= "1" && userScore <= "3") 
    {
        fill('black');
    } 
  else if (userScore === "4" || userScore === "5") 
    {
        fill('#CD7F32'); 
    } 
  else if (userScore === "6" || userScore === "7") 
    {
        fill('#C0C0C0');
    } 
  else if (userScore === "8" || userScore === "9") 
    {
        fill('#FFD700');
    }

    stroke('black');
    strokeWeight(1); 
    rect(150, 400, 100, 50);
    noStroke(); 
    fill(255);
    textSize(20);
    text("Submit", 200, 425);
}

function drawResultPage() 
{
    textSize(34); 

    let medalText = "";
  let MedalText = "";
    if (userScore === "8" || userScore === "9") 
    {
        medalText = "🥇 You won gold!";
      storeItem('4m','g');
        if (!confettiPlayedOnce) 
        { 
            activateConfetti();
            confettiPlayedOnce = true;
        }
    } 
  else if (userScore === "6" || userScore === "7") 
    {
        medalText = "🥈 You won silver!";
      storeItem('4m','s');
    } 
  else if (userScore === "4" || userScore === "5") 
    {
        medalText = "🥉 You won bronze!";
      storeItem('4m','b');
    } 
  else if (userScore >= "1" && userScore <= "3") 
    {
        medalText = "You Can Do Better!";
    } 
  else 
    {
        noStroke();
        fill('black');
        medalText = "Complete the Game First!";
    }

    text(medalText, 200, 200);
    textSize(20);

    fill("lightblue");
    rect(80, 500, 100, 40);
    fill("black");
    text("Back", 130, 520);
    text("🏠", 270, 520);
}

function drawErrorPage() 
{
    textSize(36);
    fill(255, 0, 0);
    noStroke();
    text("Error", 200, 200);

    textSize(28);
    fill(0);
    noStroke(); 
    text("Complete the game first!", 200, 300);

   
    noStroke();
    fill("lightblue");
    rect(150, 400, 100, 50);
    
    fill(0);
    noStroke(); 
    text("Back", 200, 425);
}

function displayTimer() 
{
    textSize(30);
    fill(0);
    let formattedTime = timerValue > 9 ? "0:" + timerValue : "0:0" + timerValue;
    text(formattedTime, 200, 50);

    if (timerValue % objectAppearInterval === 0 && timerValue !==           lastObjectTime && objectsDisplayed < maxObjects) 
    {
        generateNewObject();
        lastObjectTime = timerValue;
        objectsDisplayed++;
    }

    if (timerValue % objectAppearInterval > objectDisplayTime) 
    {
        currentObject = null;  
    }

    if (timerValue === 0) 
    {
        timerActive = false;
        state = "enterScore";
    }
}

function mousePressed() 
{
    if (state === "start") 
    {
        if (mouseX > 125 && mouseX < 275 && mouseY > 150 && mouseY <       210) 
    {  
            state = "begin";
            timerActive = true;
            timerValue = 20;
            lastObjectTime = timerValue;
            objectsDisplayed = 0;
            count = 0;
            userScore = "";  
            confettiPlayedOnce = false;

    } 
    else if (dist(mouseX, mouseY, 200, 290) < 60)  
    { 
            state = "start";
            count = 0;
            timerValue = 20;
            timerActive = false;
            objectsDisplayed = 0;
            userScore = "";
    } 
    else if (mouseX > 125 && mouseX < 275 && mouseY > 380 && mouseY <       440) 
    {
            state = "submit"; 
            resultsVisible = true;
    } 
    else if (mouseX > 40 && mouseX < 90 && mouseY > 550 && mouseY     <     590) 
    {
            state = "home";
    }
    } 
    else if (state === "error" && mouseX > 150 && mouseX < 250 &&           mouseY > 400 && mouseY < 450) 
    {
        state = "start";
    } 
    else if (state === "begin" && currentObject && dist(mouseX, mouseY,     currentObject.x, currentObject.y) < currentObject.size / 2) 
    {
        count++;
    } 
    else if (state === "enterScore" && mouseX > 150 && mouseX < 250 &&     mouseY > 400 && mouseY < 450 && userScore.length === 1) 
    {
        state = "submit";
        resultsVisible = true;
        count = parseInt(userScore);  
    } 
    else if (state === "submit" && mouseX > 80 && mouseX < 180 &&           mouseY > 500 && mouseY < 540) 
    {
        state = "start";
        resultsVisible = false;
    } 
    else if (state === "submit" && mouseX > 220 && mouseX < 320 &&         mouseY > 500 && mouseY < 540) 
    {
        state = "home";
    }
}

function keyPressed() 
{
    if (state === "enterScore") 
    {
        if (keyCode >= 48 && keyCode <= 57 && userScore.length === 0) 
        {
            userScore = key;
        } 
      else if (keyCode === BACKSPACE) 
        {
            userScore = "";
        }
    }
}

function timeIt() 
{
    if (timerActive && timerValue > 0) 
    {
        timerValue--;
    }
}

function activateConfetti() 
{
    confetti = [];
    for (let i = 0; i < 100; i++)
    {
        confetti.push(new Confetti(random(0, width), random(-200, -100), random(2, 5)));
    }
    confettiActive = true;
    confettiStartTime = millis();
}

function drawConfetti() 
{
    for (let conf of confetti) 
    {
        conf.confettiDisplay();
    }
  
    if (millis() - confettiStartTime >= confettiDuration * 1000) 
    {
        confettiActive = false;
        confetti = [];
    }
}
