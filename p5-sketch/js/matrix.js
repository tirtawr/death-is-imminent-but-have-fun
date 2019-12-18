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
      this.on = input;
      if(this.initial == -1){
        //console.log(input);
        for(var i = 0 ; i < this.on.length ; i++){
          if(input[i] == 1){
            this.initial = i;
            return;
          }
        }
      }
      

      
      // if(this.name[0] == "Vega"){
      //   console.log(this.on)
      //   console.log(this.initial);
      // }
      
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
            if(this.name[0] == "Vega"){
              console.log(this.on)
              console.log(this.initial);
            }
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
      //console.log(this.name+" "+" on:"+this.on);

      if(this.name[0] == "Algol"){
        
        

        if(this.on[0] == 1){
          determinant = random([3,4]);
          this.initial = 0;
        }
        else if(this.on[1] == 1){
          determinant = 4;
          this.initial = 1;
          //console.log("triggered")
        }
        else if(this.on[2] == 1){
          determinant = 3;
          this.initial = 2;
        } 
        
        else  {
          determinant = random([3,4]);
          this.initial = -1;
        }
      }
      else{
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
          this.initial = 2;
        } 
        else  {
          determinant = random([2,3,4]);
          this.initial = -1;
        }
      }
      
      this.initial = -1;

      text1 = 'CONNECT '+this.name[0]+' and '+this.name[determinant-1];
      
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