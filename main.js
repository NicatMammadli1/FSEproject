let img; 
let button;
let button2;
let button3;
let button4;
let settButton;
let sett1Button;
let sett2Button;
let resetButton;
let music;
function preload() {
    try{
      getItem('3m');
    }
    catch(error){
      storeItem('3m','bl');
    }
    try{
      getItem('1m');
    }
    catch(error){
      storeItem('1m','bl')
    }
  try{
      getItem('4m');
    }
    catch(error){
      storeItem('4m','bl');
    }
  try{
      getItem('2m');
    }
    catch(error){
      storeItem('2m','bl');
    }
  img = loadImage('blankHome.jpg');
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
  button = createButton('');
  button.position(34, 260);
  button.size(75,95);
  button.style('background-color', 'transparent');
  button.style('border', 'none');
  button.style('color', 'white');
  button.mousePressed(buttonPressed); 
  
  button2 = createButton('');
  button2.position(135, 260);
  button2.size(75,95);
  button2.style('background-color', 'transparent');
  button2.style('border', 'none');
  button2.style('color', 'white');
  button2.mousePressed(button2Pressed);
  
  button3 = createButton('');
  button3.position(236,260);
  button3.size(75,95);
  button3.style('background-color', 'transparent');
  button3.style('border', 'none');
  button3.style('color', 'white');
  button3.mousePressed(button3Pressed);  
  
  button4 = createButton('');
  button4.position(337,260);
  button4.size(75,95);
  button4.style('background-color', 'transparent');
  button4.style('border', 'none');
  button4.style('color', 'white');
  button4.mousePressed(button4Pressed);
  
  gearButton = createButton('');
  gearButton.position(152,448);
  gearButton.size(150,152);
  gearButton.style('background-color', 'transparent');
  gearButton.style('border', 'none');
  gearButton.style('color', 'white');
  gearButton.mousePressed(gearButtonPressed);
  
  
  settButton = createButton('');
  settButton.position(152,448);
  settButton.size(150,152);
  settButton.style('background-color', 'transparent');
  settButton.style('border', 'none');
  settButton.style('color', 'white');
  settButton.mousePressed(settButtonPressed);
  settButton.hide();
  
  sett1Button = createButton('Sound On');
  sett1Button.position(50,448);
  sett1Button.style('background-color', 'rgb(7,246,7)');
  sett1Button.style('color', 'black');
  sett1Button.size(80,30);
  sett1Button.hide();
  sett1Button.mousePressed(sett1ButtonPressed);
  
  sett2Button = createButton('Sound Off');
  sett2Button.position(50,515);
  sett2Button.style('background-color', 'rgb(234,175,40)');
  sett2Button.style('color', 'black');
  sett2Button.size(80,30);
  sett2Button.hide();
  sett2Button.mousePressed(sett2ButtonPressed);
  
  resetButton = createButton('Reset');
  resetButton.position(100,515);
  resetButton.style('background-color', 'rgb(234,175,40)');
  resetButton.style('color', 'black');
  resetButton.size(80,30);
  resetButton.mousePressed(resetButtonPressed);
  resetButton.hide();

}
  

function draw() {
  background(220);
  if (img) {  // Check if img is loaded
    image(img, 0, 0);
  }
  else{
    img=loadImage('blankHome.jpg');
    image(img, 0, 0);
  }
  star(65, 330, 17, 9, 5,getItem('1m'));
  star(165, 330, 17, 9, 5,getItem('2m'));
  star(265, 330, 17, 9, 5,getItem('3m'));
  star(370, 330, 17, 9, 5,getItem('4m'));
}
function star(x, y, radius1, radius2, npoints,medal) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  if(medal=='g'){
    fill(255,215,0);
  }
  if(medal=='s'){
    fill(192,192,192);
  }
  if(medal=='b'){
    fill(205, 127, 50);
  }
  if(medal=='bl'){
    fill(211,211,211);
  }
  endShape(CLOSE);
}
// Callback function for button presses
function buttonPressed() {
   window.location.href = 'activity 1.html';
}
  
function button2Pressed() {
  window.location.href = 'activity 2.html';
}
  
function button3Pressed() {
    window.location.href = 'activity 3.html';
}
  
function button4Pressed() {
   window.location.href = 'activity 4.html';
}
  
  
  
function gearButtonPressed() {
   if(getItem('sound') == true){
   sett1Button.show();
   sett2Button.hide();
} else {
    sett1Button.hide();
    sett2Button.show();
}
  settButton.show();
  gearButton.hide();
}
  

function settButtonPressed(){
  gearButton.show();
  sett1Button.hide();
  sett2Button.hide();
  settButton.hide();
  
}


function sett1ButtonPressed() {
  storeItem('sound', false)
   sett1Button.hide();
   sett2Button.show();
  music.stop()
}
  
function sett2ButtonPressed() {
  storeItem('sound', true)
  music.loop(true);
   sett2Button.hide();
   sett1Button.show();
}

function resetButtonPressed(){
    storeItem('r', true);
  storeItem('3m', 'bl');
  storeItem('1m', 'bl');
  storeItem('2m', 'bl');
  storeItem('4m', 'bl');
  img = loadImage('blankHome.jpg');
}
