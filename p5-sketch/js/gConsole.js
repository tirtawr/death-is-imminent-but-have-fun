/*
console class
1. receives instruction from central control
2. listen on hits from microcontroller
3. stores the hits
4. decides whether its a hit or mistake
*/

class gConsole {
  /*
  params:
  1. id #
  2. all interacts in a array
  3. the generated 
  4. stores serial communication data
  5. current instruction to be done 
  6. last hit interaction
  */
  constructor(id, interacts) {
    this.id = id;
    this.allButtons = interacts;
    this.instruction = [];
    this.serialData = [];
    this.curIns = null;
    this.lastHit = ['null','null'];

    this.pushInfo = null;
  }
  
  //get a instruction randomly
  //from its interacts 
  getInstruction() {
    var interact = random(this.allButtons);
    //testing
    // if(this.id == 1){
    //   interact = this.allButtons[5];
    // }

    // if(this.id == 2){
    //   interact = this.allButtons[3];
    // }

    // if(this.id == 3){
    //   interact = this.allButtons[5];
    // }

    // else if(this.id == 4){
    //   interact = this.allButtons[3];
    // }
    
    //interact = this.allButtons[2];
    //console.log(interact.name+" giving ins");
    var instruction = interact.instruct();
    
    this.curIns = instruction;

    return instruction;
    //console.log(this.curIns);
  }
  
  //update the serial communication data
  updateAll() {
    for (var button in this.allButtons) {
      this.allButtons[button].update(this.serialData[button]); 
      if(this.id == 2){
        
          //console.log(this.allButtons[button].name+ " "+this.serialData[button]); 

      }
      //console.log(this.allButtons[button].name+": "+this.serialData[button])
    }
  }
  
  //event-listener
  //only runs when there is a current instruction 
  listenAll() {
    if (this.curIns != null) {
      for (var button of this.allButtons) {
        var result = button.listen();
        // if(button.name == "South"){
        //   console.log(result);
        // }

        result.push(button.name);
        
        //if it is an active interaction from on kind
        if (result[0]) {
          console.log(result)
          //record the last hit interacts
          this.lastHit = result;

          //do further determination
          //console.log(button);
          var determine = this.determineHits(button,result);

          if(determine){
            console.log("great!");
            newPlay(goodHitSound);
            hits ++;
            this.curIns = null;
            //console.log(this.id);
            LCDInfo[traceLCDConsole(this.id-1)][0] = "Good JOB!";
            pushInfo();
            //once the instruction is done
            //stop listen
            return;
          }    

          else{
            console.log("fuck! "+result);
            newPlay(badHitSound);
            lives--;
            pushInfo();
            //this.updateFail(traceLCDConsole(this.id-1));
          }         
        }
      }
    }
  }


  determineHits(button,result){
    //ok if the interact is correct
    if (button.name == this.curIns[0]) {
      //further clarification
      if(button.type == "Button"){
        return true;
      }

      else if (button.type == "Flip"){
        if(result[1] == this.curIns[2])
        {
          return true;
        }
        else return false;
      }

      else if (button.type == "Sonic"){
        if(result[1] == this.curIns[2])
        {
          return true;
        }
        else return false;
      }

      else if (button.type == "Matrix"){
        //console.log(result[2]);
        
        //the jack from result is 2 less than their index
        //ex. jack 2 is at [0]
        if(result[2] == this.curIns[2] - 2)
        {
          return true;
        }
        else return false;
      }

      else if (button.type == "Slider"){
        
        if(result[1] == this.curIns[2])
        {
          return true;
        }
        else return false;
      }

      else if (button.type == "Rotary"){
        if(result[0])
        {
          return true;
        }
        else return false;
      }
    } 
  }

  updateDone(i){
      //generate 
    
    
    LCDInfo[i] = createLCDText(LCDInfo[i]);
    serials[i].write(LCDInfo[i][4]);
    
    console.log("Good job: "+ LCDInfo[i][4])
  }


}