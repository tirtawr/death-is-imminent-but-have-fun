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
    var instruction = interact.instruct();
    this.curIns = instruction;
    console.log(this.curIns);
  }
  
  //update the serial communication data
  updateAll() {
    for (var button in this.allButtons) {
      this.allButtons[button].update(this.serialData[button]);
      // console.log("flip is"+this.allButtons[button].on);
    }
  }
  
  //event-listener
  //only runs when there is a current instruction 
  listenAll() {
    if (this.curIns != null) {
      for (var button of this.allButtons) {
        var result = button.listen();
        result.push(button.name);
        if (result[0]) {
          //record the last hit interacts
          this.lastHit = result;
          if (button.name === this.curIns[0]) {
            console.log("great!");
            this.curIns = null;
          } else console.log("fuck!");
        }

      }
    }

  }

}