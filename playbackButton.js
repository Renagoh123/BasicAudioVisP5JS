//displays and handles clicks on the playback button.
function PlaybackButton(){
	
    //variable for the position and size of the button
	this.x = width/2 - 20;
	this.y = height-80;
	this.width = 35;
	this.height = 35;
    this.forwardX = width/2 + 45;
    this.backwardX = width/2 - 55;

	//flag to determine whether to play or pause after button click and
	//to determine which icon to draw
    //draw forward button and backward button
	this.playing = false;

    //draw the button to the screen
	this.draw = function(){
        push();
        
		if(this.playing){
            //play button
			rect(this.x, this.y, this.width/2 - 2, this.height);
			rect(this.x + (this.width/2 + 2), this.y, this.width/2 - 2, this.height);
		}
		else{
            //pause button
			triangle(this.x, this.y, this.x + this.width, this.y + this.height/2, this.x, this.y+this.height);
		}
        
        //forward button and backwarrd button
        fill(255);
        triangle(this.forwardX, this.y, this.forwardX + this.width, this.y + this.height/2, this.forwardX, this.y+this.height);
        triangle(this.backwardX, this.y, this.backwardX, this.y + this.height, this.backwardX-this.width, this.y+this.height/2);
        stroke(255);
        strokeWeight(5);
        line(this.forwardX+this.width, this.y, this.forwardX+this.width, this.y+this.height);
        line(this.backwardX-35, this.y, this.backwardX-35, this.y+this.height);
        strokeWeight(2);
        
        pop();
	};

	//checks for clicks on the button, starts or pauses playback.
    //checks for clicks on the forward button and backward button, fast-forward or rewind 3 seconds
	//@returns true if clicked false otherwise.
	this.hitCheck = function(){
        //starts or pauses 
		if(mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height){
			if (sound.isPlaying()) {
    			sound.pause();
                
  			} else {
    			sound.loop();
  			}
  			this.playing = !this.playing;
  			return true;
		}
			
        //fast-forward  
        if(mouseX > this.forwardX && mouseX < this.forwardX + this.width && mouseY > this.y && mouseY < this.y + this.height){
            sound.jump(sound.currentTime() + 3);
            return true;
        }
        
        //rewind
         if(mouseX < this.backwardX && mouseX > this.backwardX - this.width && mouseY > this.y && mouseY < this.y + this.height){
            sound.jump(sound.currentTime() - 3);
            return true;
        }
        
        return false;
	};

}