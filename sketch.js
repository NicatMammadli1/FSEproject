let img; 
let button;
let button2;
let button3;
let button4;
let settButton;
let sett1Button;
let sett2Button;

function preload() {
  img = loadImage('AppHome2.jpg'); // Load the image
} 

function setup() {
  createCanvas(432, 624);
  background(img)
  button = createButton('');
  button.position(26, 251);
  button.size(75,95);
  button.style('background-color', 'transparent');
  button.style('border', 'none');
  button.style('color', 'white');
  button.mousePressed(buttonPressed); 
  
  button2 = createButton('');
  button2.position(128, 251);
  button2.size(75,95);
  button2.style('background-color', 'transparent');
  button2.style('border', 'none');
  button2.style('color', 'white');
  button2.mousePressed(button2Pressed);
  
  button3 = createButton('');
  button3.position(229,251);
  button3.size(75,95);
  button3.style('background-color', 'transparent');
  button3.style('border', 'none');
  button3.style('color', 'white');
  button3.mousePressed(button3Pressed);  
  
  button4 = createButton('');
  button4.position(330,251);
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
  

function draw() {
  background(220);
  image(img, 0, 0);
}

let sound = true;
// Callback function for button presses
function buttonPressed() {
   button.style("background-color", "blue");
}
  
function button2Pressed() {
   button2.style("background-color", "green");
}
  
function button3Pressed() {
   button3.style("background-color", "orange");
}
  
function button4Pressed() {
   button4.style("background-color", "purple");
}
  
  
  
function gearButtonPressed() {
   if(sound == true){
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
   sound = false;
   sett1Button.hide();
   sett2Button.show();
}
  
function sett2ButtonPressed() {
   sound = true;
   sett2Button.hide();
   sett1Button.show();
}
  
  

}
