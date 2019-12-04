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
      
      this.reading = -1;
      this.state = false;
      this.prvReading = [0,0,0,0,0];

      this.goal = -1;
      this.currentReading = 0;

      this.ranges = [0,33,66,100];
      this.currentRange = -1;
      
      this.on = -1;
    }
    
    //run as serial input comes in
    //stores the sensor data
    update(input){
      this.reading = input;
      this.prvReading.unshift(this.reading);
      if(this.prvReading.length == 21){
        this.prvReading.pop();
      }
      //console.log(this.prvReading);
    }
    
    //listen event
    //return true if its a hit
    //return false if its a false;
    listen(){
      //recognize as a hit
      //return an array
      //[0]: true if triggered
      //[1]: slider data

      var stopped = -1;

      for(var read of this.prvReading){
          //if everyone in the prvReading = the current reading
          if(abs(read - this.reading)>3){
            stopped = 0;
            //console.log("non-stop "+abs(read - this.reading))
            break;
          }
          stopped = 1;
      }

      if(stopped == 1){
        //console.log("current reading: "+this.reading)
        if(this.reading < 8 && this.state == false){
        
            this.state = true;
            this.on = 1;
            return [true,this.on];
          }
          else if(this.reading > 20 && this.state == true){
            this.state = false;
            this.on = 0;
            return [true,this.on];
          }
      }
      
      return [false,this.on];
    }

    //generate instruction
    //return the name and the state
    instruct(){
        var text;
        if(this.currentRange == 0){
           text = 'Slide '+this.name+' to '+random([33,66,100]);
        }
        else if(this.currentRange == 33){
          text = 'Slide '+this.name+' to '+random([0,66,100]);
        }
        else if(this.currentRange == 66){
          text = 'Slide '+this.name+' to '+random([0,33,100]);
        } 
        else  text = 'Slide '+this.name+' to '+random([0,33,66]);
  
  
        return [this.name,text];
    }
  }