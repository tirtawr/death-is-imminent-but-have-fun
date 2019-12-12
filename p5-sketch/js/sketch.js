var consoles = [];

//fake the serial output
//0: console 1
//1: console 2
//2: console 3 
//3: console 4
//supposed to be done in serial communication
var serialDatas = [];

//stores all four instructions
//generated by the consoles
var allInstructs = [];

//flow of control
//var countdown = [50,45,40,30,27,24,21,18,15,12,10,8];
var countdown = [15,15,15,25,25,25,25,25,25,25,10,10,10,10,10,10,10,10,10,10];
var progress = 0;
var lives = 10;
var offset = 0;
var rounds = 0;
var roundGoing = false;
var hits = 0;
var timer = 0;
var phase = 0;
var lastTimer = 0;

function setup() {
  //failSound.play();

  createCanvas(400, 400);
  initConsole();
  
  //serial data initialization
  serialDatas[0] = [0,0,[0,0,0],0,0,0];
  serialDatas[1] = [0,0,0,0,0,0];
  serialDatas[2] = [0,0,0,0,[0,0,0],0];
  serialDatas[3] = [0,0,0,0,0,0];
  
  serialSetup();
  //get instruction in each round
  //newRoundInstruct();
}

function draw() {
  background(220);
  //phase 0 : introduction

  if(lives < 0){
    phase = 2;
  }

  if(phase == 0){
    //text("earth is fucked.",width/2,height/2)
  }
  else if(phase == 1){
    //if it is a new round
    //record timestamp
    //put hits to 0
    //fetch new round of instruction
    serialUpdate();
    if(roundGoing == false){
      playProgress();
      offset = int(millis());
      roundGoing = true;
      hits = 0;
      newRoundInstruct();
    }

    //if in round
    else{
      //if lives goes to 0
      //game fails
      
      
      //if within time 
      if(int(millis()) - offset < countdown[rounds]*1000){
        timer = (countdown[rounds]*1000 - (int(millis()) - offset));
        // if(int(timer/1000) != lastTimer){
        //   console.log(lastTimer);
        //   lastTimer = int(timer/1000);
        //   pushInfo();
        // }
        lastTimer = int(timer/1000);
        printAllStats();
      }
      //if time runs out
      else{
        roundGoing = false;

        //progress += 1.5 * hits;
        progress += 9;
        lives -= 4-hits;
        
        
        //if progress goes to full 
        if(progress > 100){
          phase = 3;
        }

        if(lives < 0){
          phase = 2;
        }

        rounds++;
      }
    }
  }
  //failure
  else if (phase ==2){
    text("you fucked.",width/2,height/2)
    newPlay(failSound);
    for (var LCD in LCDInfo){
      var text1 = "OMG Your Ship explodes"
      text1 = populate(text1);
      if(text.length < 80){
        text1 += "                    ";
      }
      serials[LCD].write(text1);
      
    }
    noLoop();
  }

  else if (phase ==3){
    text("you fucking good.",width/2,height/2)
    noLoop();
  }



  //update serial inputs
  
  //force event listen on every interact
  listenEvents();
  //debug
  printAllConsoles();
}

function printAllStats(){
  text(int(timer/1000),width/2,height/2);
  text("Lives: "+lives,width/2,height/2+15);  
  text("progress: "+progress,width/2,height/2+30);
  text("round: "+rounds,width/2,height/2+45);
  text("hits: "+hits,width/2,height/2+60);
  text("Ins: "+LCDInfo,width/2,height/2+75)
}


//fake serial communication
//console 1:
  //a: 1st button
function keyTyped(){
  if(key === 'q'){
    serialDatas[0][0] = 1;
  }
  if(key === 'a'){
    serialDatas[0][1] = 1;
  }
  if(key === 'w'){
    serialDatas[1][0] = 1;
  }
  if(key === 'e'){
    serialDatas[2][0] = 1;
  }
  if(key === 'r'){
    serialDatas[3][0] = 1;
  }
}

function keyReleased(){
  if(key === 'q'){
    serialDatas[0][0] = 0;
  }
  if(key === 'a'){
    serialDatas[0][1] = 0;
  }
  if(key === 'w'){
    serialDatas[1][0] = 0;
  }
  if(key === 'e'){
    serialDatas[2][0] = 0;
  }
  if(key === 'r'){
    serialDatas[3][0] = 0;
  }
}
//track each console whether they hit or not

function keyPressed(){
  if(key == '.'){
    phase ++;
  }
  if(phase == 0){
    if(key == " "){
      newPlay(introSound);  
    }
  }

  else if(keyCode == UP_ARROW){
    hits++;
  }
  else if(keyCode == RIGHT_ARROW){
    timer += 1000;
  }
}