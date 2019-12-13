/*
button class
1. stores name
2. stores whether the button is occupied by instruction
3. updates its data at every frame
4. event listener when its hit
*/

class Sonic{
    constructor(name){
      this.type = "Sonic";
      this.name = name;
      this.occupied = false;
      
      this.reading = 0;
      this.state = false;
      this.prvReading = [0,0,0,0,0];
      this.initial = -1;
      this.on = -1;
    }
    //run as serial input comes in
    //stores the sensor data
    update(input){
      //console.log(input)
      //console.log(this.name+" "+input);
      this.reading = input;
      if(this.initial == -1){
        
        if(this.reading < 8){
          this.initial = 1;
        }
        else{
          this.initial = 0;
        }
        console.log(this.name + " give initials: "+this.initial)
      }
      //console.log("initial is "+this.initial)

        
        this.prvReading.unshift(this.reading);
        if(this.prvReading.length == 11){
          this.prvReading.pop();
        }
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
      //[1]: switch data
      var stopped = -1;
      // if(this.name == "My Eyes"){
      //   console.log("reading is "+this.reading);
      // }
      if(this.on == 0 || this.on == -1){
        for(var read of this.prvReading){
          //if everyone in the prvReading = the current reading
          if(abs(read - this.reading)>3){
            stopped = 0;
            //console.log("non-stop "+abs(read - this.reading))
            break;
          }
          stopped = 1;
        }
      }
      
      

      if(stopped == 1){
        // if(this.name == "My Eyes"){
        //   console.log("determine covering");
        //   console.log("initial is "+this.initial);
        // }
        //console.log("reading is "+this.reading);
        //console.log("current reading: "+this.reading)
        if(this.reading < 8 && this.state == false){
            
            this.state = true;
            this.on = 1;
            var result1 = this.avoidInitial(this.on);
            //console.log(result1);
            if(result1){
              console.log(this.name + " cover")
              return [true,this.on];
              
            }
            
          }
      }

      // console.log("on: "+this.on)
      // if(this.on == 1){
      //   console.log("state: "+this.state == true);
      //   console.log("out: "+this.reading > 20);
      // }
      

      if(this.reading > 20 && this.state == true){
        if(this.name == "My Eyes"){
          console.log("determine uncovering");
          console.log("initial is "+this.initial);
        }
        //console.log("reading is "+this.reading);
        this.state = false;
        this.on = 0;
        var result1 = this.avoidInitial(this.on);
        console.log(result1);
        if(result1){
          console.log(this.name +" uncover")
          return [true,this.on];
        }
        else{
          return [false,this.on];
        }
      }
      
      return [false,this.on];
      
    }
    
    //generate instruction
    //return the name and the state
    instruct(){
      var text1;
      var determinant;
      
      

      if(this.on == 0){
        determinant = 1;
        text1 = 'COVER '+this.name;
      }
      else if(this.on == 1){
        determinant = 0;
        text1 = 'UNCOVER '+this.name;
      }
      else if (this.on == -1){
        if(this.reading > 10){
            determinant = 1;
            text1 = 'COVER '+this.name;
        }
        else if(this.reading < 10){
            determinant = 0;
            text1 = 'UNCOVER '+this.name;
        }
      }
      return [this.name,text1,determinant];
    }

    avoidInitial(a){
      //base case
      
      if(this.initial == -1){
        return true;
      }
      //when detection is on the initial
      if(a == this.initial){
        return false;
      }
      else {
        console.log("initial: "+this.initial)
        this.initial = -1;
        return true;
      }
    }
  }