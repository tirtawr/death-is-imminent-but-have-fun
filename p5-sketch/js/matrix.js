/*
jack class
1. stores name
2. stores whether the button is occupied by instruction
3. updates its data at every frame
4. event listener when its hit
*/

class Matrix{
    constructor(name){
      this.type = "Matrix";
      this.name = name;
      this.occupied = false;
      
      
      this.state = [false,false,false];
      this.initial = -1;
      this.on = [-1,-1,-1];
    }
    
    //run as serial input comes in
    //stores the sensor data
    update(input){
      
      if(this.initial == -1){
        //console.log(input);
        for(var i = 0 ; i < this.on.length ; i++){
          if(input[i] == 1){
            this.initial = i;
            return;
          }
        }
      }
      

      this.on = input;
      //console.log(this.on)
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

      var result;
      for(var i = 0 ; i < 3 ; i ++){
        if(this.on[i] == 1 && this.state[i] == false){
          this.state[i] = true;
          //return true for trigger
          //return the state for that trigger 
          //return the index
          //console.log(this.initial);
          if(this.avoidInitial(i)){
            return [true,this.on[i],i];
          }

          else {
            return [false,this.on[i],i];
          }
          
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
      var text1;
      var determinant;
      //console.log(this.on)
      console.log(this.name+" "+" on:"+this.on);
      if(this.on[0] == 1){
        determinant = random([3,4]);
        this.initial = 0;
      }
      else if(this.on[1] == 1){
        determinant = random([2,4]);
        this.initial = 1;
        //console.log("triggered")
      }
      else if(this.on[2] == 1){
        determinant = random([2,3]);
        this.initial = 0;
      } 
      else  determinant = random([2,3,4]);
      this.initial = -1;

      text1 = 'Connect '+this.name[0]+' to '+this.name[determinant-1];
      
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
        this.initial = -1;
        return true;
      }
    }
  }