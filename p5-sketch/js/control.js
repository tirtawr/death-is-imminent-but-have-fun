//initiate all consoles
//with specific types of interactions
//run in setup
function initConsole() {
  consoles.push(new gConsole(1, [
    new Sonic("Doper"),
    new flipSwitch("Bumper"),
    new sliderPot("Nuts"),
    new flipSwitch("empty1"),
    new matrix("Matrix")
    
  ]));
  
  consoles.push(new gConsole(2, [
    new flipSwitch("Booster")
  ]));
  
  consoles.push(new gConsole(3, [
    new flipSwitch("Pasta")
  ]));
  
  consoles.push(new gConsole(4, [
    new flipSwitch("Pizza")
  ]));
}

//update serial data in each conoles
function serialUpdate() {
  for (var i = 0; i < consoles.length; i++) {
    consoles[i].serialData = serialDatas[i];
    consoles[i].updateAll();
    // if(i == 0){
    //   console.log(consoles[0].serialData[4])
    // }
    
  }
  
}

//listens to all interacts
function listenEvents() {
  for (var i = 0; i < consoles.length; i++) {
    consoles[i].listenAll();
  }
}

//update intructions from four consoles
function newRoundInstruct(){
  // for (var i = 0; i < consoles.length; i++) {
  //   allInstructs[i] = consoles[i].getInstruction();
  // }
  allInstructs[0] = consoles[0].getInstruction();
  
}