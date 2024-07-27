//global for the controls and input 
var controls = null;
//store visualisations in a container
var vis = null;
//variable for the p5 sound object
var sound = null;
//variable for p5 fast fourier transform
var fourier;
//variable for checking if the sound is loaded
var isLoaded = false;

//load sound file
function preload(){
	sound = loadSound('assets/stomper_reggae_bit.mp3', soundLoadSuccess,soundLoadError,soundLoadProgress);
}

function setup(){
    createCanvas(windowWidth, windowHeight);
    background(0);
    
    //instantiate the controls and input object
    controls = new ControlsAndInput();
    //instantiate the fft object
    fourier = new p5.FFT();
  
    //create a new visualisation container and add visualisations
    vis = new Visualisations();
    vis.add(new Spectrum());
    vis.add(new WavePattern());
    vis.add(new Needles());
    vis.add(new Empty());
    vis.add(new RidgePlots());
    vis.add(new BlockMidHighLow());
    vis.add(new SpinningWheel());

}

function draw(){
	background(0);
	//draw the selected visualisation
	vis.selectedVisual.draw();
	//draw the controls on top.
	controls.draw();
}

function mouseClicked(){
	controls.mousePressed();
}

function keyPressed(){
	controls.keyPressed(keyCode);
}

//when the window has been resized. Resize canvas to fit 
//if the visualisation needs to be resized call its onResize method
function windowResized(){
	resizeCanvas(windowWidth, windowHeight);
	if(vis.selectedVisual.hasOwnProperty('onResize')){
		vis.selectedVisual.onResize();
	}
}


//logs message when the sound file is successfully loaded
function soundLoadSuccess(){
    console.log("load sound success:"+sound.duration());
    isLoaded = true;
}

//displays an alert message with error info when failed to load the sound file
function soundLoadError(err){
    alert("error: " + err);
}

//logs message when the sound file is being loaded
function soundLoadProgress(prog){
      console.log("load sound progress:"+prog);
}


