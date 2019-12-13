/*
button class
1. stores name
2. stores whether the button is occupied by instruction
3. updates its data at every frame
4. event listener when its hit
*/

class flipSwitch{
  constructor(name){
    this.type = "Flip";
    this.name = name;
    this.occupied = false;
    
    this.flip = 0;
    this.state = [false,false];
    
    this.initial = -1;
    this.on = -1;
  }
  
  //run as serial input comes in
  //stores the sensor data
  update(input){
    //console.log("initial is "+this.initial)
    //console.log(input);
    this.flip = input;
    if(this.initial == -1){
      if(this.flip == 1){
        this.initial = 1;
      }
      else{
        this.initial = 0;
      }
    }
    
  }

  
  //listen event
  //return true if its a hit
  //return false if its a false;
  listen(){
    //recognize as a hit
    //return an array
    //[0]: true if triggered
    //[1]: switch data
    // if(this.initial == 0){
    //   console.log("the flip is "+this.flip)
    // }

    if(this.flip == 1 && this.state[0] == false){
      this.state[0] = true;
      this.state[1] = false;
      this.on = 1;
      // console.log("good hit")
      // console.log("initial is "+this.initial)
      // console.log("this on is "+ this.on)
      var result1 = this.avoidInitial(this.on);
      //console.log(result1);
      
      if(result1){
        return [true,this.on];
      }
      else{
        return [false,this.on];
      } 
    }
    else if(this.flip == 0 && this.state[1] == false){
      this.state[1] = true;
      this.state[0] = false;
      this.on = 0;
      //console.log("good hit")
      var result1 = this.avoidInitial(this.on);
      //console.log(result1);
      if(result1){
        return [true,this.on];
      }
      else{
        return [false,this.on];
      }
    }
    else{
      return [false,this.on];
    }
  }
  
  //generate instruction
  //return the name and the state
  instruct(){
    var text1;
    var determinant;

    
    if(this.on == 1){
       determinant = 0;
       text1 = 'TURN '+this.name+' to off';
    }
    else if(this.on == 0){
      determinant = 1;
      text1 = 'TURN '+this.name+' to on';
    }

    //when at initial state
    //this.on is not initialized yet
    else if(this.on == -1){
      //console.log(this.flip);
      if(this.flip == 1){
        determinant = 0;
        text1 = 'TURN '+this.name+' to off';
      }
      else{
        determinant = 1;
        text1 = 'TURN '+this.name+' to on';
      }
    }
    
    //return:
    //the name of the interacts
    //the instruction texts
    //the state that needs to be achieved 
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
    //the it is a hit
    else {
      this.initial = -1;
      return true;
    }
  }
}