///variable to store the p5.Amplitude object which analyzes the audio input
var amplitude;
//sets the angle between each section of the spinning wheel.
var angle = 72;
// variable for tracking of the last angle drawn
var lastAngle = 0;
//the gui object
var gui2; 
//gui params
var rotateDir = ["left","right"];
var wheelSize = 280;
var centerShape=['ellipse','square','triangle'];
var centerColour = "#f73636";

//constructor function to draw a
function SpinningWheel()
{
    //name of the visualization
    this.name = "Spinning Wheel"; 
    
    //instantiate the ParticleEffect object
    this.particleEffect = new ParticleEffect();
   
    //frequencies used by the energyfunction to retrieve a value for each plot.    
    this.frequencyBins = ["bass", "lowMid", "mid", "highMid", "treble"];
    
    this.setup = function(){
        //creates a new p5.Amplitude object to analyze the sound input.
        amplitude = new p5.Amplitude();
        
        //create layout GUI
        gui2 = createGui('Audio Visualizer');
        gui2.addGlobals('rotateDir','wheelSize','centerShape','centerColour');
        //sets the range and step size of the slider.
        sliderRange(0, 400, 50);
        
        gui2.hide();

    }
    this.setup();
    
    //resize the gui 
    this.onResize = function(){
        gui2.setPosition(width-200, 0);
    }
     //call onResize to set initial values when the object is created
    this.onResize();
    
    //draw the spinning wheel to the screen
    this.draw = function(){
        push();
        //move the origin to a new point on the window
        translate(width/2,height/2);
        
        //create an array amplitude values from the fft.
        let spectrum = fourier.analyze();

        //note the output for each energy is 0 to 255
        var bassEnergy = fourier.getEnergy(this.frequencyBins[0]);
        var lowMidEnergy = fourier.getEnergy(this.frequencyBins[1]);
        var midEnergy = fourier.getEnergy(this.frequencyBins[2]);
        var highMidEnergy = fourier.getEnergy(this.frequencyBins[3]);
        var trebleEnergy = fourier.getEnergy(this.frequencyBins[4]);
        
        //store each energy into an array
        var energies = [bassEnergy, lowMidEnergy, midEnergy, highMidEnergy, trebleEnergy];
           
        //changing the color mode to HSB
        colorMode(HSB, 255);
  
        //draw the particle effect
        this.particleEffect.run();
        
        //rotates the spinning wheel based on the current frame count and the chosen rotation direction
        rotate(frameCount * rotateDir);
        //variable for speed rotation
        let rotSpeed = 0.015;
        //check if rotate counterclockwise if left is selected,
        //rotate clockwise if right is selected
        if(rotateDir=="left"){
            rotate(-(frameCount * rotSpeed));
        }else if (rotateDir=="right"){
             rotate(frameCount * rotSpeed);
        }
        
        //draw the wheel to the screen
        for (let i = 0; i < energies.length; i++) 
        { 
            let startColor = color(energies[i] % 255, 255, 255);
            let endColor = color(energies[i] % 255, 100, 255);
            let colour = lerpColor(startColor, endColor, 0.5);
            fill(colour);
            stroke(0);
            strokeWeight(12);
            
            arc(
              0,0,
              wheelSize + energies[i],
              wheelSize + energies[i],
              lastAngle, lastAngle + radians(angle),PIE
                );
            lastAngle += radians(angle);
       }
         
        //draw the shape in the center of the wheel
        shapeOfBeats();
        
        //Reset back to default RGB mode
        colorMode(RGB, 255);
        
        pop();
    }  
    
    //hide the gui
    this.unSelectVisual = function(){
        gui2.hide();
    }
    
    //show the gui
    this.selectVisual = function(){
        gui2.show();
    }
}

//Draw the shape at the center of the wheel which will beat with the sound.
//the shape is based on the selection
function shapeOfBeats(){
    //retrieve the current level of sound amplitude
    let level = amplitude.getLevel();
    //variable for the size of shape
    let size = map(level,0,0.2,50,200);
    fill(centerColour);

    // select a shape and draw it to the wheel center 
    switch(centerShape)
    {
        case'ellipse':
           ellipse(0,0,size,size);
        break;

        case'square':
            ngon(4,0,0,size);
        break;

        case'triangle':
            ngon(3, 0, 0, size);
        break;
    }
}

//Draw the different shapes in shapeOfBeats().
function ngon(n, x, y, d) {
  beginShape();
  for(var i = 0; i < n; i++) {
	let angle = TWO_PI / n * i;
	let px = x + cos(angle) * d / 2;
	let py = y + sin(angle) * d / 2;
	vertex(px, py);
  }
  endShape(CLOSE);
}
