//constructor function to draw a
function RidgePlots(){
    //name of the visualisation
    this.name = "Ridge Plots";

    //variable for the postion and size of the ridge plots sizes
    var startX;
    var startY;
    var endY;
    var spectrumWidth;
    var speed = 0.7;
    var output = [];
    
    //resize the ridge plots sizes when the screen is resized.
    this.onResize = function(){
        startX = width/5;
        endY = height/5;
        startY = height - endY;
        spectrumWidth = (width/5)*3;
    }
    //call onResize to set initial values when the object is created
	this.onResize();
    
    //clears the output array
    this.selectVisual = function(){
        output=[];
    }
    
    //draw the ridge plots to the screen
    this.draw = function(){
        push();
        background(0);
        stroke(255);
        strokeWeight(2);
        
        //changing the color mode to HSB
        colorMode(HSB,360);
        var hue = frameCount%360;
        fill(hue,360,360);
        stroke(360-hue,360,360);
        
        //add waves every few frames 
        if(frameCount%10 == 0){
            addWave();
        }
        
        //Draw the animation lines of each wave.
        //A nested for loop to add lines to the array every x frames
        for(var i=output.length-1; i>=0; i--)
        {
            var wave = output[i];
            beginShape();
            for(var j=0; j<wave.length; j++)
            {
                //move up the screen in regular intervals
                wave[j].y -= speed;
                vertex(wave[j].x,wave[j].y);
            }
            endShape();
            
            //remove wave that has reaches the end of display
            if(wave[0].y<endY){
                output.slice(i,1);
            }
        }
        //Reset back to default RGB mode
        colorMode(RGB); 
        pop();
    }
    
    //add the wave sound output
    function addWave(){
        //calculate the waveform from the fft.
        var w = fourier.waveform();
        //store the coordinates of the wave 
        var outputWave = [];
        //scaling variables variables used to adjust the amplitude of the wave for different frequency ranges.
        var smallScale = 3;
        var bigScale = 40;
        
        for(var i=0; i<w.length; i++)
        {
            if(i%20==0){
                var x = map(i,0,1024,startX,startX+spectrumWidth);
                
                //left 25%  ||  right 25%
                if(i<1024*0.25 || i>1024*0.75){
                    var y = map(w[i],-1,1,-smallScale,smallScale);
                    var o = {"x":x,"y":startY+y};
                    outputWave.push(o);
                    
                //middle 50%  
                }else{
                    var y = map(w[i],-1,1,-bigScale,bigScale);
                    var o = {"x":x,"y":startY+y};
                    outputWave.push(o);
                }
            }
        }
        output.push(outputWave);
    }
}