var mySong;
var logo;
var stella;
var volhistory = [];

var fighter1X=20;
var fighter2X=600;
var fighterY=100;
var fighters1Image=['./assets/ranma.png', './assets/ranma2.png'];
var fighters2Image=['./assets/genma.png', './assets/panda.png' ];
var fighter1Index=0;
var fighter2Index=fighters2Image.length-1;
var deadZone=50;
var midPointX=400;


function preload(){
  mySong = loadSound("./assets/Ranma  Opening 1 1989 CREDITLESS - japanese.mp3");
  logo= loadImage("./assets/logo.png");
  stella= loadImage("./assets/stella.png");
  fighter1= loadImage(fighters1Image[fighter1Index]);
  fighter2=loadImage(fighters2Image[fighter2Index]);
}

function setup() {
  mySong.play();
  createCanvas(windowWidth, windowHeight);

  analyser=new p5.Amplitude();
  analyser.setInput(mySong);
  frequency = new p5.FFT();
  frequency.setInput(mySong);
  amp=new p5.Amplitude;
  //mySong.setVolume(0.5);
  angleMode(DEGREES);
}

function draw() {
  background(157, 210, 240);

  var vol= amp.getLevel();
  var dim= map(vol,0,1,width/15,width/4);

  if (volhistory.length > 360) {
    volhistory.splice(0, 1);
  }
  pop();

  push();
  scale(2, 2);
  if(mouseX<(midPointX-deadZone)){
    image(fighter1, fighter1X, fighterY);
  } else {
    image(fighter1, fighter1X, fighterY, dim+width/40, dim+height/25);
  }
  if(mouseX>(midPointX+deadZone)){
    image(fighter2, fighter2X-fighter2.width, fighterY);
    fighter1= loadImage(fighters1Image[fighter1Index]);
  } else {
    image(fighter2, fighter2X, fighterY, -(dim+width/40), dim+height/25);
  }
  pop();

  image(logo, width/2-logo.width/2, height/2-logo.height/2);

  if (mySong.isPlaying() == true) {
    //mySong.play();
    noFill();
    stroke(252, 211, 49);
    strokeWeight(3);
    freqGen();
  }else{}

  if(mouseX>midPointX){
    fighter1Index=(fighter1Index+1)%fighters1Image.length;
    //fighter1= loadImage(fighters1Image[fighter1Index]);
  }else{
  }
  if(mouseX<midPointX){
    fighter2Index=(fighter2Index+1)%fighters2Image.length;

    if(fighter2Index<0){
      fighter2Index=fighter2Index+(-1);
    }
    fighter2= loadImage(fighters2Image[fighter2Index]);
  }else{
  }
}


function freqGen() {
  var spectrum = frequency.analyze();

  push();
  strokeWeight(6);
  var vol = amp.getLevel();
  volhistory.push(vol);

  translate(width / 2, height / 2);
  beginShape();
  for (var v = 0; v < 360; v++) {
    stroke(spectrum[v]*2,10,10);
    strokeWeight(spectrum[v]/10);
    var r = map(volhistory[v], 0, 1, 200, 300);
    var x = r * cos(v);
    var y = r * sin(v);
    vertex(x, y);
  }
  endShape();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
