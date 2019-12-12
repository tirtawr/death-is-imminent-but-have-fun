var progressSound = [];
var failSound;
var introSound;
var goodHitSound;
var badHitSound;
var progressTrigger = [false,false,false,false,false,false];

function preload(){
    failSound = loadSound("./sounds/lose.mp3");
    introSound = loadSound("./sounds/introduction.mp3");
    goodHitSound = loadSound("./sounds/good.ogg");
    badHitSound = loadSound("./sounds/bad.mp3");
    progressSound.push(loadSound("./sounds/10.mp3"));
    progressSound.push(loadSound("./sounds/30.mp3"));
    progressSound.push(loadSound("./sounds/50.mp3"));
    progressSound.push(loadSound("./sounds/70.mp3"));
    progressSound.push(loadSound("./sounds/90.mp3"));
    progressSound.push(loadSound("./sounds/100.mp3"));
}

function newPlay(a){
    a.stop();
    a.play();
}

function playProgress(){
    if(progress >= 10 && progress <30){
        if(progressTrigger[0] == false){
            newPlay(progressSound[0]);
            progressTrigger[0] = true;
        }  
    }
    else if(progress >= 30 && progress <50){
        if(progressTrigger[1] == false){
            newPlay(progressSound[1]);
            progressTrigger[1] = true;
        } 

    }
    else if(progress >= 50 && progress <70){
        if(progressTrigger[2] == false){
            newPlay(progressSound[2]);
            progressTrigger[2] = true;
        } 

    }
    else if(progress >= 70 && progress <90){
        if(progressTrigger[3] == false){
            newPlay(progressSound[3]);
            progressTrigger[3] = true;
        } 

    }
    else if(progress >= 90 && progress <100){
        if(progressTrigger[4] == false){
            newPlay(progressSound[4]);
            progressTrigger[4] = true;
        } 

    }
    else if(progress >= 100){
        if(progressTrigger[5] == false){
            newPlay(progressSound[5]);
            progressTrigger[5] = true;
        } 

    }
}