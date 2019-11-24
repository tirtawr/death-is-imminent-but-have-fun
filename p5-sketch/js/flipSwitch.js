/*
button class
1. stores name
2. stores whether the button is occupied by instruction
3. updates its data at every frame
4. event listener when its hit
*/

class flipSwitch{
  constructor(name){
    this.name = name;
    this.occupied = false;
    
    this.flip = 0;
    this.state = false;
    
    this.on = false;
  }
  
  //run as serial input comes in
  //stores the sensor data
  update(input){
    this.flip = input;
  }
  
  //listen event
  //return true if its a hit
  //return false if its a false;
  listen(){
    //recognize as a hit
    //return an array
    //[0]: true if triggered
    //[1]: switch data
    if(this.flip == 1 && this.state == false){

      this.state = true;
      this.on = !this.on;
      return [true,this.on];
    }
    else if(this.flip == 0 && this.state == true){
      this.state = false;
      return [false,this.on];
    }
    else{
      return [false,this.on];
    }
  }
  
  //generate instruction
  //return the name and the state
  instruct(){
    var text;
    if(this.on){
       text = 'Turn '+this.name+' to off';
    }
    else text = 'Turn '+this.name+' to on';
    return [this.name,text];
  }
}