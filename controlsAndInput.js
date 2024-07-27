//Constructor function to handle the onscreen menu, keyboard and mouse
//controls
function ControlsAndInput(){
	
	this.menuDisplayed = false;
	
	//playback button displayed in the top left of the screen
	this.playbackButton = new PlaybackButton();

	//make the window fullscreen or revert to windowed
	this.mousePressed = function(){
		//check if the playback button has been clicked
		var isButtonClicked = this.playbackButton.hitCheck();
        
        //if not make the visualisation fullscreen
        if(isButtonClicked == false && isMouseInGUI == false){
            let fs = fullscreen();
            fullscreen(!fs);
        }
        
	};

	//responds to keyboard presses
	//@param keycode the ascii code of the keypressed
	this.keyPressed = function(keycode){
		console.log(keycode);
		if(keycode == 32){
			this.menuDisplayed = !this.menuDisplayed;
		}

		if(keycode > 48 && keycode < 58){
			var visNumber = keycode - 49;
			vis.selectVisual(vis.visuals[visNumber].name); 
  			
		}
	};

	//draws the playback button and potentially the menu
	this.draw = function(){
		push();
		fill("white");
		stroke("black");
		strokeWeight(2);
		textSize(30);

        this.instruction();
		//playback button 
		this.playbackButton.draw();
        //instruction
        if(!this.instrDisplayed){
            this.instruction();
        }
    
		//only draw the menu if menu displayed is set to true.
		if(this.menuDisplayed){
			text("Select a visualisation:", 100, 30);
			this.menu();
		}
        
		pop();

	};

	this.menu = function(){
		//draw out menu items for each visualisation
        for(var i=0;i<vis.visuals.length;i++){
            text((i+1)+":"+vis.visuals[i].name,100,30+(i+1)*35);
        }
        
	};
    
    this.instruction = function(){
        //display the intruction to the user
        //if the music is loaded and menu displayed is set to true.
        if(isLoaded && !sound.isPlaying())
        {
            push();
            textAlign(CENTER);
            text("ITP2 Music Visualization", width/2,250);
            text("Instruction:",width/2, 300);
            text("1.Press space bar to display the visualizer menu", width/2, 350);
            text("2.Select visualization", width/2, 400); 
            text("3.Play / Pause the music with playback button",width/2,450);
            text("Enjoy the Music Visualization!", width/2, 550);
            pop();
        }
        
    }
    
    this.isMouseInGUI = function(){
        //declare and define the variables that represent the size of the gui element.
        var inGUI = false;
        var gui_x = gui.prototype._panel.style.left;
        var gui_y = gui.prototype._panel.style.top;
        var gui_height = gui.prototype._panel.clientHeight;
        var gui_width = gui.prototype._panel.clientWidth;
        
        //initialise the height and width of the GUI element
        gui_x = parseInt(gui_x, 10);
        gui_y = parseInt(gui_y, 10);
        gui_height = parseInt(gui_height,10);
        gui_width = parseInt(gui_width,10);
        
        //check whether the current mouse coordinates
        //are within the bounds of the GUI element
        if(mouseX>gui_x && mouseX<gui_x + gui_width)
        {
         if(mouseY>gui_y && mouseY<gui_y+gui_height)
             {
                 inGUI = true;
             }
        }
        
        return inGUI; 
    }
}


