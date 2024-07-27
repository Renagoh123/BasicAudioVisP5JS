//constructor function to draw a single
function Particle(){
    
    //initialize the variable for each particle's 
    this.acceleration = createVector(0, -0.5);
    this.velocity = createVector(random(-3, 3), random(-3, 3));
    this.pos = createVector(0,0);
    this.lifespan = 255;
    this.width = 10;
    this.colour = [random(255),random(255),random(255)];
    
    //updates position and colour of the particles based on the amplitude level.
    this.update = function(cond){
       // add a random offset to the position of particle
      if (cond) {
        let offset = p5.Vector.random2D().mult(5);
        this.pos.add(offset);
      }
      // move the particle along its velocity vector
      this.pos.add(this.velocity);
      // reduce the particle's lifespan
      this.lifespan -= 2;
    }
    
    //draw the particle 
    this.show = function(){
        push();
        noStroke();
        fill(this.colour,this.lifespan);
        ellipse(this.pos.x, this.pos.y, this.width, this.width);
        pop();
    }
    
    //checks whether the particle is off-screen or 
    //whether the particle's lifespan has ended. 
    //if either condition is true, then remove the particle
    this.isDead = function(){
         let x = this.pos.x;
        let y = this.pos.y;
        let w = width / 2;
        let h = height / 2;
        let offScreen = x < -w || x > w || y < -h || y > h;
        if(offScreen && this.lifespan <= 0 )
        {
            return true;
        }else{
            return false;
        }
    }  
}

