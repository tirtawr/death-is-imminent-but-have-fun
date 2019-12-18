//initiate all consoles
//with specific types of interactions
//run in setup
function initConsole() {
  consoles.push(new gConsole(1, [
    new Button("Hydron"),
    new flipSwitch("Scroll"),
    new Matrix(["Vega","Sirius","Rigel","Reactor"]),
    new Rotary("Matrix"),
    new Sonic("North"),
    new sliderPot("Counter")
  ]));
  
  consoles.push(new gConsole(2, [
    new flipSwitch("Lunar"),
    new flipSwitch("Thuban"),
    new sliderPot("Nova"),
    new sliderPot("Gamma"),
    new Sonic("My Eyes"),
    new Rotary("Grasper"),

  ]));
  
  consoles.push(new gConsole(3, [
    new flipSwitch("Noi"),
    new Button("Handler"),
    //new sliderPot("Motion"),
    new sliderPot("Nano"),
    new Matrix(["Algol","Bupbup","Pollux","Rios"]),
    new Rotary("Mizar"),

  ]));
  
  consoles.push(new gConsole(4, [
    new flipSwitch("Pump"),
    new Button("Big Red Button"),
    new sliderPot("Anode"),
    new sliderPot("Cathode"),
    new Rotary("Blender"),
    new Sonic("South"),
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





//critical to track each console's LCD information
//index represents each console
//[0] represents the texts
//  could  be inst or done
//[1] represents target console to do the job
//var LCDInfo = [["",-1],["",-1],["",-1],["",-1]]

//function to populate space to fill the serial string
function populate(text1, index){
  var tLength = text1.length;
  if(index == 0){
    for(var i = 0 ; i < 20-tLength ; i++){
      text1 = text1 + " ";
    }
  }
  else if(index == 1){
    for(var i = 0 ; i < 120-tLength ; i++){
      text1 = text1 + " ";
    }
  }
  return text1;
}

//function to create 80 char long LCD
function createLCDText(info){
  var infoArray = info;
  //console.log(infoArray);
  //[0] stores instruction or done
  //[1] stores the console#
  //[2] stores progress
  //[3] stores life
  //[4] stores the output




  infoArray[2] = populate("Progress: "+ progress+"%",0);
  infoArray[3] = populate("Group Lives: "+ lives,0);
  
  var pIns = populate(infoArray[0],1);
  
  infoArray[4] = infoArray[2]+infoArray[3]+pIns;

  if(infoArray[4].length == 60){
    
    infoArray[4] = infoArray[4] + populate(" ",1)
  }
  return infoArray;
}

//update intructions from four consoles
function newRoundInstruct(){

  for (var i = 0; i < consoles.length; i++) {
    allInstructs[i] = consoles[i].getInstruction();
    
  }
  
  //give instructions to the original
  for(var j = 0 ; j < 4 ; j ++){
    consoles[j].LCDInfo[0] = allInstructs[j][1];
    consoles[j].LCDInfo[1] = j;
    
  }

  //make sure first 3 rounds assign not themselve instruction
  if(rounds == 0 || rounds == 1 || rounds == 2){
    
    specificAssign();
    
  }
  else{
    myShuffle();
  }
  //console.log(LCDInfo)
  //generate 
  
  pushInfo();
  
  
}

// function clearScreen() {
//   console.log('clearScreen');
//   for (var LCD in LCDInfo){
//     serials[LCD].write('                                                                                ');
//   }
// }


function pushInfo(){
  //generate 
  
  for (var k = 0 ; k < 4 ; k ++){
    console.log("creating: "+consoles[k].LCDInfo);
    consoles[k].LCDInfo = createLCDText(consoles[k].LCDInfo);
    
  }

  for (var i = 0 ; i < 4 ; i++){
    serials[i].write(consoles[i].LCDInfo[4]);
    console.log("writing: "+consoles[i].LCDInfo[4]);
  }
}

//starts from the console that does the job
//find the console that shows the instruction
function traceLCDConsole(i){
  for(var j = 0 ; j < 4 ; j++){
    if(consoles[j].LCDInfo[1] == i){
      return j;
    }
  }
  return -1;
}
function myShuffle() {
  var array = [consoles[0].LCDInfo, consoles[1].LCDInfo, consoles[2].LCDInfo, consoles[3].LCDInfo];
  var currentIndex = array.length, temporaryValue, randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  consoles[0].LCDInfo = array[0];
  consoles[1].LCDInfo = array[1];
  consoles[2].LCDInfo = array[2];
  consoles[3].LCDInfo = array[3];
}

function specificAssign(){
  var t1 = consoles[0].LCDInfo;
  var t2 = consoles[1].LCDInfo;
  var t3 = consoles[2].LCDInfo;
  var t4 = consoles[3].LCDInfo;
  
  if(rounds == 0){
    consoles[0].LCDInfo = t2;
    consoles[1].LCDInfo = t3;
    consoles[2].LCDInfo = t4;
    consoles[3].LCDInfo = t1;
    
  }

  if(rounds == 1){
    consoles[0].LCDInfo = t3;
    consoles[1].LCDInfo = t4;
    consoles[2].LCDInfo = t1;
    consoles[3].LCDInfo = t2;
  }

  if(rounds == 2){
    consoles[0].LCDInfo = t4;
    consoles[1].LCDInfo = t1;
    consoles[2].LCDInfo = t2;
    consoles[3].LCDInfo = t3;
  }
}