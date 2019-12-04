/*
slider class
1. stores name
2. stores whether the button is occupied by instruction
3. updates its data at every frame
4. event listener when its hit
*/

class sliderPot{
    constructor(name){
      this.type = "Slider";
      this.name = name;
      this.occupied = false;
      
      this.reading = -1;
      this.state = false;
      this.prvReading = [0,0,0,0,0];

      this.ranges = [0,50,100];
      this.currentRange = -1;
      
      this.on = -1;
    }
    
    //run as serial input comes in
    //stores the sensor data
    update(input){
      console.log(input)
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

        if(this.on == -1){
            this.on = this.reading;
        }
        if(this.on != -1 && abs(this.on-this.reading) >= 100 && !this.state){
            //sliding
            this.state = true;
            console.log("sliding: "+this.on)
        }

        if(this.state){
            if(abs(this.prvReading[19] - this.reading) < 5){
                //not sliding
                this.state = false;
                //do the reading
                this.on = this.reading;
                console.log("stopped: "+this.on)
                console.log(" ")
                return this.determineRange();
            }
            //console.log(this.reading+" "+this.prvReading[19]+(abs(this.prvReading[19] - this.reading) < 5))
        }
        return [false,0];
    }
    
    determineRange(){
        if(this.on >= 900){
            this.currentRange = this.ranges[0]
            return [true,this.ranges[0]];
        }
        else if(this.on >= 600 && this.on <= 800){
            this.currentRange = this.ranges[1]
            return [true,this.ranges[1]];
        }

        else if(this.on <= 600){
            this.currentRange = this.ranges[2]
            return [true,this.ranges[2]];
        }
        else return[false,-1];
    }

    //generate instruction
    //return the name and the state
    instruct(){
        var text;
        var determinant;
        if(this.currentRange == 0){
          determinant = random([50,100]);
        }
        else if(this.currentRange == 50){
          determinant = random([0,100]);
        }
        else if(this.currentRange == 100)  determinant = random([0,50]);
        else if(this.currentRange == -1){
          if(this.reading >= 900){
            determinant = random([50,100]);
          }

          else if(this.reading >= 600 && this.reading <= 800){
            determinant = random([0,100]);
          }

          else if(this.reading <= 600){
            determinant = random([50,0]);
          }
          else determinant = random([100,50,0]);
        }
        
        text = 'Slide '+this.name+' to '+determinant;
  
        return [this.name,text,determinant];
    }
  }