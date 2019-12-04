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
    this.state = false;
    
    this.on = -1;
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
      this.on = 1;
      return [true,this.on];
    }
    else if(this.flip == 0 && this.state == true){
      this.state = false;
      this.on = 0;
      return [true,this.on];
    }
    else{
      return [false,this.on];
    }
  }
  
  //generate instruction
  //return the name and the state
  instruct(){
    var text;
    var determinant;

    
    if(this.on == 1){
       determinant = 0;
       text = 'Turn '+this.name+' to off';
    }
    else if(this.on == 0){
      determinant = 1;
      text = 'Turn '+this.name+' to on';
    }

    //when at initial state
    //this.on is not initialized yet
    else if(this.on == -1){
      if(this.flip == 1){
        determinant = 0;
        text = 'Turn '+this.name+' to off';
      }
      else{
        determinant = 1;
        text = 'Turn '+this.name+' to on';
      }
    }
    
    //return:
    //the name of the interacts
    //the instruction texts
    //the state that needs to be achieved 
    return [this.name,text,determinant];
  }
}