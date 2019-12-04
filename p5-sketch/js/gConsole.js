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
  }
  
  //get a instruction randomly
  //from its interacts 
  getInstruction() {
    var interact = random(this.allButtons);
    //testing
    interact = this.allButtons[2];
    var instruction = interact.instruct();
    this.curIns = instruction;
    console.log(this.curIns);
  }
  
  //update the serial communication data
  updateAll() {
    for (var button in this.allButtons) {
      this.allButtons[button].update(this.serialData[button]); 
    }
  }
  
  //event-listener
  //only runs when there is a current instruction 
  listenAll() {
    if (this.curIns != null) {
      for (var button of this.allButtons) {
        var result = button.listen();
        // if(button.name == "Doper"){
        //   console.log(result);
        // }

        result.push(button.name);
        
        //if it is an active interaction from on kind
        if (result[0]) {
          //record the last hit interacts
          this.lastHit = result;

          //do further determination
          //console.log(button);
          var determine = this.determineHits(button,result);

          if(determine){
            console.log("great!");
            hits ++;
            this.curIns = null;

            //once the instruction is done
            //stop listen
            return;
          }
          
          else{
            console.log("fuck!");
            lives--;
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
    } 
  }

}