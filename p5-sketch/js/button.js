/*
button class
1. stores name
2. stores whether the button is occupied by instruction
3. updates its data at every frame
4. event listener when its hit
*/

class Button{
    constructor(name){
      this.type = "Button";
      this.name = name;
      this.occupied = false;
      
      this.hit = 0;
      this.state = false;
      
      this.on = false;
    }
    
    //run as serial input comes in
    //stores the sensor data
    update(input){
      this.hit = input;
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
      if(this.hit == 1 && this.state == false){
  
        this.state = true;
        this.on = !this.on;
        return [true,this.on];
      }
      else if(this.hit == 0 && this.state == true){
        this.state = false;
        this.on = !this.on;
        return [false,this.on];
      }
      else{
        return [false,this.on];
      }
    }
    
    //generate instruction
    //return the name and the state
    instruct(){
      var text1;
      text1 = 'Hit '+this.name;
      return [this.name,text1];
    }
  }