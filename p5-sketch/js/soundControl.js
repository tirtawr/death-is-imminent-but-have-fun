var progressSound = [];
var failSound;
var introSound;

var progressTrigger = [false,false,false,false,false,false];

function preload(){
    failSound = loadSound("./sounds/lose.wav");
    introSound = loadSound("./sounds/introduction.wav");
    progressSound.push(loadSound("./sounds/10.wav"));
    progressSound.push(loadSound("./sounds/30.wav"));
    progressSound.push(loadSound("./sounds/50.wav"));
    progressSound.push(loadSound("./sounds/70.wav"));
    progressSound.push(loadSound("./sounds/90.wav"));
    progressSound.push(loadSound("./sounds/100.wav"));
}

function newPlay(a){
    a.stop();
    a.play();
}

function playProgress(){
    if(progress >= 10 && progress <30){
        if(progressTrigger[0] == false){
            newPlay(progress[0]);
            progressTrigger[0] = true;
        }  
    }
    else if(progress >= 30 && progress <50){
        if(progressTrigger[1] == false){
            newPlay(progress[1]);
            progressTrigger[1] = true;
        } 

    }
    else if(progress >= 50 && progress <70){
        if(progressTrigger[2] == false){
            newPlay(progress[2]);
            progressTrigger[2] = true;
        } 

    }
    else if(progress >= 70 && progress <90){
        if(progressTrigger[3] == false){
            newPlay(progress[3]);
            progressTrigger[3] = true;
        } 

    }
    else if(progress >= 90 && progress <100){
        if(progressTrigger[4] == false){
            newPlay(progress[4]);
            progressTrigger[4] = true;
        } 

    }
    else if(progress >= 100){
        if(progressTrigger[5] == false){
            newPlay(progress[5]);
            progressTrigger[5] = true;
        } 

    }
}