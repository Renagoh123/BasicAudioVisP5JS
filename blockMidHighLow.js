//the gui object
var gui;
//gui params
var rotateThresh;
var progThresh;
var seedThresh;
var boxColour = "#0000FF";
var lineColour = "#00FF00";

//constructor function to draw a
function BlockMidHighLow(){
    //name of the visualisation
    this.name = "Block Mid High Low"
    
    //declare and initialise variable for blocks
    var rot = 0;
    var noiseStep = 0.01;
    var prog = 0;
    
    this.setup = function(){
        //initialize gui params
        rotateThresh = 67;
        progThresh = 180;
        seedThresh = 100;
        
        //create the GUI
        gui = createGui("Audio Visualizer");
        gui.addGlobals("rotateThresh","progThresh","seedThresh","boxColour","lineColour");
   
        //set slider range for rotateThresh,progThresh,seedThresh,
        //boxColour, and lineColour
        sliderRange(0, 255, 1);
        
        gui.hide();
        
    }
    
    this.setup();
    
    //resize the gui 
    this.onResize = function(){
        gui.setPosition(width-200, 0);
    }
    //call onResize to set initial values when the object is created
    this.onResize();
    
    this.draw = function(){
        //create an array amplitude values from the fft.
        fourier.analyze();
        //declare and initialise variables for bass and treble level
        var b = fourier.getEnergy("bass");
        var t = fourier.getEnergy("treble");
        
        //draw the blocks
        rotatingBlocks(b);
        //draw the squiggly line
        noiseLine(b, t);
    }
    
    //hide the gui
    this.unSelectVisual = function(){
        gui.hide();
    }
    
    //show the gui
    this.selectVisual = function(){
        gui.show();
    }
    
    /*
    *draw the squiggly line
    *@param energy1: work with specific energy
    *@param energy2: work with specific energy
    */
    function noiseLine(energy1, energy2){
        push();
        translate(width/2, height/2);
        
        beginShape();
        noFill();
        stroke(lineColour);
        strokeWeight(3);
        
        for(var i=0; i<100; i++){
            //calculate x and y coordinates of the line
            var noiseX = noise(i*noiseStep + prog);
            var x = map(noiseX, 0, 1, -250, 250);
            var noiseY = noise(i*noiseStep + prog + 1000);
            var y = map(noiseY, 0, 1, -250, 250);
            
            //draw the line
            vertex(x,y);
        }
        endShape();
        
        //check if the energy1 is greater than progThresh
        //then the line can move with the music
        if(energy1>progThresh){
            prog += 0.05;
        }
        
        //check if the energy2 is greater than seedThresh
        //then keep resetting the noise seed to make it more random
        if(energy2>seedThresh){
            noiseSeed(); 
        }
        pop();
    }
    
    /*
    *draw a rotating blocks to the screen 
    *@param energy: work with specific energy
    */
    function rotatingBlocks(energy){
        if(energy<rotateThresh){
            rot+=0.01;
        }
        
        //r is the length of the block
        //map energy level (0 to 255) to (20 to 100)
        var r = map(energy, 0, 255, 20, 100);
        
        push();
        rectMode(CENTER);
        //translate so 0 is at the middle of the screen
        translate(width/2, height/2);
        //rotate the blocks
        rotate(rot); 
        //draw the diagonal of squares
        fill(boxColour);
        var incr = width/9;
        for (var i=0; i<10; i++){
            rect(i*incr - width/2, 0, r, r);
        }
        
        pop();
        
    }
}