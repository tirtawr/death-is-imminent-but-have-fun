/*
slider class
1. stores name
2. stores whether the button is occupied by instruction
3. updates its data at every frame
4. event listener when its hit
*/

class Rotary{
    constructor(name){
      this.type = "Rotary";
      this.name = name;
      this.occupied = false;
      
      this.reading = 0;
      this.state = false;
      this.prvReading = [0,0,0,0,0];

      this.goal = 5;
      this.last = -1;

      this.ranges = [0,33,66,100];
      this.currentRange = -1;
      
      this.on = -1;
    }
    
    //run as serial input comes in
    //stores the sensor data
    update(input){
      //console.log(this.name + " " + input)
      this.reading = input;
      this.prvReading.unshift(this.reading);
      if(this.prvReading.length == 41){
        this.prvReading.pop();
      }
      //console.log(this.prvReading);
    }
    
    initialize(){
      
    }
    
    //listen event
    //return true if its a hit
    //return false if its a false;
    listen(){
      //recognize as a hit
      //return an array
      //[0]: true if triggered
      //[1]: slider data
      //console.log(this.name+" reading: "+this.reading);
      var stopped = -1;
      //initialization
      if(this.last == -1){
        this.last = this.reading;
      }

      for(var read of this.prvReading){
          //if everyone in the prvReading = the current reading
          if(abs(read - this.reading)>3){
            
            stopped = 0;
            this.state = false;
            //console.log("non-stop "+abs(read - this.reading))
            break;
          }
          stopped = 1;
      }

      // if(stopped == 0){
      //   console.log(this.name+" rolling")
      // }
      // else if(stopped == 1){
      //   console.log(this.name+"stopped")
      // }

      if(stopped == 1){
        //console.log("current reading: "+this.reading)
        //if the rotary is correct
        
        //console.log("reading: "+this.reading);
        if(this.reading - this.last >= this.goal && this.state == false){
            
            this.state = true;
            this.on = this.reading - this.last;
            this.last = this.reading;
            return [true,this.on];
          }
          //if the rotary is not correct
          else if(this.reading != this.last && this.reading - this.last < this.goal && this.state == false){
            //console.log("move in progress: "+this.reading + " last: "+this.last)
            this.state = true;
            this.on = this.reading - this.last;
            //this.last = this.reading;
            return [false,this.on];
          }
          //if the rotary is not moved at all
          else if(this.reading == this.last){
            //console.log("not moved: "+this.reading)
            this.state = true;
            this.on = 0;
            return [false,this.on];
          }
      }
      
      
      return [false,this.on];
    }

    //generate instruction
    //return the name and the state
    instruct(){

        var text1;
        var determinant = this.goal;
        this.last = this.reading;
           text1 = 'Rotate '+this.name+' clockwise of '+determinant+" clicks";
        
        return [this.name,text1,determinant];
    }
  }