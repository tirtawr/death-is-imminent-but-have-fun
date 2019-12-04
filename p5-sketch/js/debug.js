function printAllConsoles(){
  //textAlign(CENTER);
  for(var i = 0 ; i < consoles.length ; i ++){
    text("console "+consoles[i].id, 10, 15 + i * 1/4*height);
    if(consoles[i].curIns != null){
      text("  current Instruction: " + consoles[i].curIns[1],10, 30 + i * 1/4*height);
    }
    else text("  current Instruction: done",10, 30 + i * 1/4*height);

    //its a flip switch with only 3 parameters
    if(consoles[i].lastHit[3] == undefined){
      text("  Event Listener: " + consoles[i].lastHit[2]+" to "+consoles[i].lastHit[1],10, 45 + i * 1/4*height);
    }
    // the matrix
    else{
      text("  Event Listener: on " + consoles[i].lastHit[3]+" Jack 1 connects to Jack "+(consoles[i].lastHit[2]+2),10, 45 + i * 1/4*height);
    }
  }
}