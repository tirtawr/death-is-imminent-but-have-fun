/*
jack class
1. stores name
2. stores whether the button is occupied by instruction
3. updates its data at every frame
4. event listener when its hit
*/

class matrix{
    constructor(name){
      this.type = "Matrix";
      this.name = name;
      this.occupied = false;
      
      
      this.state = [false,false,false];
      
      this.on = [-1,-1,-1];
    }
    
    //run as serial input comes in
    //stores the sensor data
    update(input){
      //console.log(input);
      this.on = input;
    }
    
    //listen event
    //return true if its a hit
    //return false if its a false;
    listen(){
      //recognize as a hit
      //return an array
      //[0]: true if triggered
      //[1]: switch data

      var result;
      for(var i = 0 ; i < 3 ; i ++){
        if(this.on[i] == 1 && this.state[i] == false){
          this.state[i] = true;
          //return true for trigger
          //return the state for that trigger 
          //return the index
          return [true,this.on[i],i];
        }
        else if(this.on[i] == 0 && this.state[i] == true){
          this.state[i] = false;
          result = [false,this.on[i],i];
        }
        else{
          result = [false,this.on,-1];
        }
      
      }
      return result;
    }
    
    //generate instruction
    //return the name and the state
    instruct(){
      var text;
      var determinant;
      
      if(this.on[0] == 1){
        determinant = random([3,4]);
        
      }
      else if(this.on[1] == 1){
        determinant = random([2,4]);
      }
      else if(this.on[2] == 1){
        determinant = random([2,3]);
      } 
      else  determinant = random([2,3,4]);

      text = 'On '+this.name+'Connect Jack 1 to Jack'+determinant;
      
      return [this.name,text,determinant];
    }
  }