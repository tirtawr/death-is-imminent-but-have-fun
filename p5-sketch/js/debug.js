function printAllConsoles(){
  //textAlign(CENTER);
  for(var i = 0 ; i < consoles.length ; i ++){
    text("console "+consoles[i].id, 10, 15 + i * 1/4*height);
    if(consoles[i].curIns != null){
      text("  current Instruction: " + consoles[i].curIns[1],10, 30 + i * 1/4*height);
    }
    else text("  current Instruction: done",10, 30 + i * 1/4*height);
    text("  Event Listener: " + consoles[i].lastHit[2]+" to "+consoles[i].lastHit[1],10, 45 + i * 1/4*height);
  }
}