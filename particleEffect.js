//constructor function to draw 
function ParticleEffect(){
    
    //creates a new p5.Amplitude object to analyze the sound input.
    let amplitude = new p5.Amplitude();
    //variable for storing particles
    let particles = [];
    
    //add Particle object to the particles array
    this.addParticle = function(){
        let particle = new Particle();
        particles.push(particle);
    };
    
    //updates and display particles
    this.draw = function(){
        //gets the current level of the sound amplitude 
        let ampLevel = amplitude.getLevel()
   
        //updates position and colour of the particles based on the amplitude level.
        //check if the amplitude level and whether a particle is dead
        //if the condition is met, then update and display the particles
        //if not remove particle from array
        if(ampLevel>0.035){
            for(var i=particles.length-1;i>=0;i--)
            {
                let p = particles[i];
                if(!p.isDead())
                {
                    p.update(ampLevel>0.05);
                    p.show(); 
                }else{
                    particles.splice(i,2);
                }
            }
        }
    };
    
    //combination of add new particle and draw the particles
    this.run = function(){
        this.addParticle();
        this.draw();
    };
    
}