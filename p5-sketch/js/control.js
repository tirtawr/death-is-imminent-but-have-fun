//initiate all consoles
//with specific types of interactions
//run in setup
function initConsole() {
  consoles.push(new gConsole(1, [
    new Button("Hydron"),
    new flipSwitch("Scroll"),
    new Matrix(["Vega","Sirius","Rigel","Mizar"]),
    new Rotary("Matrix"),
    new Sonic("North"),
    new sliderPot("Counter")
  ]));
  
  consoles.push(new gConsole(2, [
    new flipSwitch("Thuban"),
    new flipSwitch("Lunar"),
    new sliderPot("Nova"),
    new sliderPot("Gamma"),
    new Sonic("My Eyes"),
    new Rotary("Grasper"),

  ]));
  
  consoles.push(new gConsole(3, [
    new flipSwitch("Ion"),
    new Button("Handler"),
    new sliderPot("Motion"),
    new sliderPot("Nano"),
    new Matrix(["Algol","Bupbup","Pollux","Rios"]),
    new Rotary("Reactor"),

  ]));
  
  consoles.push(new gConsole(4, [
    new flipSwitch("Pump"),
    new Button("Big Red Button"),
    new sliderPot("Plasma"),
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
var LCDInfo = [["",-1],["",-1],["",-1],["",-1]]

//function to populate space to fill the serial string
function populate(text1){
  var tLength = text1.length;
  if(tLength <= 20){
    for(var i = 0 ; i < 20-tLength ; i++){
      text1 = text1 + " ";
    }
  }
  else if(tLength > 20){
    for(var i = 0 ; i < 40-tLength ; i++){
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
  infoArray[2] = populate("Progress: "+ progress+"%");
  infoArray[3] = populate("life: "+ lives);
  
  var pIns = populate(infoArray[0]);
  
  infoArray[4] = infoArray[2]+infoArray[3]+pIns;

  if(infoArray[4].length == 60){
    
    infoArray[4] = infoArray[4] + populate(" ")
  }
  return infoArray;
}

//update intructions from four consoles
function newRoundInstruct(){

  for (var i = 0; i < consoles.length; i++) {
    allInstructs[i] = consoles[i].getInstruction();
    
  }
  
  //randomize
  for(var j = 0 ; j < LCDInfo.length ; j ++){
    LCDInfo[j][0] = allInstructs[j][1];
    LCDInfo[j][1] = j;
    
  }

  //make sure first 3 rounds assign not themselve instruction
  // if(round == 0 || round == 1 || round == 2){
  //   LCDInfo = specficAssign(LCDInfo);
  // }
  // else{
  //   LCDInfo = shuffle(LCDInfo);
  // }
  //console.log(LCDInfo)
  //generate 
  LCDInfo = shuffle(LCDInfo);
  pushInfo();
}

function pushInfo(){
  //generate 
  for (var k = 0 ; k < LCDInfo.length ; k ++){
    LCDInfo[k] = createLCDText(LCDInfo[k]);
    
  }

  for (var LCD in LCDInfo){
    serials[LCD].write(LCDInfo[LCD][4]);
    console.log(LCDInfo[LCD][4]);
  }
}

//starts from the console that does the job
//find the console that shows the instruction
function traceLCDConsole(i){
  for(var LCD in LCDInfo){
    if(LCDInfo[LCD][1] == i){
      return LCD;
    }
  }
  return -1;
}
function shuffle(array) {
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
  return array;
}

function specificAssign(array){
  var t1 = array[0];
  var t2 = array[1];
  var t3 = array[2];
  var t4 = array[3];
  if(round == 0){
    return [t2,t3,t4,t1];
  }

  if(round == 1){
    return [t3,t4,t1,t2];
  }

  if(round == 2){
    return [t4,t1,t2,t3];
  }
}