let song;
let levels = [];
let sx,
  sy,
  r = 0,
  angle = 0;
function preload() {
  // load song
  song = loadSound("songs/song.mp3");
}
function clicked() {
  // if no song is alredy playing
  if (amp.getLevel() == 0) song.play();
}
document.onclick = clicked;
function setup() {
  angleMode(DEGREES);
  createCanvas(window.innerWidth, window.innerHeight);
  // song.play(); // no longer works without user input

  // init
  fft = new p5.FFT();
  amp = new p5.Amplitude();
}

function draw() {
  translate(width / 2, height / 2);
  background(0);
  colorMode(HSB);
  var level = amp.getLevel();
  noStroke();
  var waveForm = fft.waveform();
  let speakerSize = map(level, 0, 1, 50, height * 0.6);
  // console.log(level);
  var colorLevel = map(level, 0, 1, 0, 255);
  // amp up the colors
  colorLevel = (colorLevel * 1.44) % 255;
  let revColorLevel = map(colorLevel, 0, 160, 70, 0);
  beginShape();

  // the speaker spikes
  fill(colorLevel, 190, 130);
  for (angle = 0; angle <= 360; angle++) {
    if (angle % 2 === 0) {
      r = speakerSize * 1;
    } else {
      r = speakerSize * 0.65;
    }
    sx = r * cos(angle);
    sy = r * sin(angle);
    vertex(sx, sy);
  }
  endShape(CLOSE);
  // end of spikes

  // wave start
  noFill();
  beginShape();
  console.log(revColorLevel);
  strokeWeight(2);
  stroke(colorLevel, 190, 130);
  for (i = 0; i < waveForm.length; i++) {
    x = map(i, 0, waveForm.length, -width, width);
    y = map(waveForm[i], -1, 1, -height * 0.5, height * 0.5);
    vertex(x, y);
  }
  endShape();
  // wave end

  // speaker start
  strokeWeight(1);
  fill(20);
  ellipse(0, 0, speakerSize * 1.7);
  fill(revColorLevel);
  ellipse(0, 0, speakerSize * 1.45);
  fill(20);
  ellipse(0, 0, speakerSize * 0.8);
  // speaker end

  // song not yet started
  fill(255);
  noStroke();
  if (level == 0) {
    textAlign(CENTER, CENTER);
    text("click anywhere to start!", 0, -200);
  }
}
