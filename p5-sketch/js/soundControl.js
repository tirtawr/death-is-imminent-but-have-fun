var progressSound = [];
var timerAnnouncer = [];
var failSound;
var introSound;
var goodHitSound;
var badHitSound;
var progressTrigger = [false,false,false,false,false,false];
var timerTrigger = [false,false,false,false,false,false,false,false,false,false,false,false]
var bgm;
function preload(){
    failSound = loadSound("./sounds/lose.mp3");
    introSound = loadSound("./sounds/intro.mp3");
    goodHitSound = loadSound("./sounds/good.ogg");
    badHitSound = loadSound("./sounds/bad.mp3");
    progressSound.push(loadSound("./sounds/10.mp3"));//2 round
    progressSound.push(loadSound("./sounds/30.mp3"));//4 round
    progressSound.push(loadSound("./sounds/50.mp3"));//6 round
    progressSound.push(loadSound("./sounds/70.mp3"));//8 round
    progressSound.push(loadSound("./sounds/90.mp3"));//10 round
    progressSound.push(loadSound("./sounds/100.mp3"));
    timerAnnouncer.push(loadSound("./sounds/rounds/50.mp3"));
    timerAnnouncer.push(loadSound("./sounds/rounds/45.mp3"));
    timerAnnouncer.push(loadSound("./sounds/rounds/40.mp3"));
    timerAnnouncer.push(loadSound("./sounds/rounds/30.mp3"));
    timerAnnouncer.push(loadSound("./sounds/rounds/27.mp3"));
    timerAnnouncer.push(loadSound("./sounds/rounds/24.mp3"));
    timerAnnouncer.push(loadSound("./sounds/rounds/21.mp3"));
    timerAnnouncer.push(loadSound("./sounds/rounds/18.mp3"));
    timerAnnouncer.push(loadSound("./sounds/rounds/15.mp3"));
    timerAnnouncer.push(loadSound("./sounds/rounds/12.mp3"));
    timerAnnouncer.push(loadSound("./sounds/rounds/10.mp3"));
    timerAnnouncer.push(loadSound("./sounds/rounds/8.mp3")); 
    //bgm = loadSound("./sounds/bgm.mp3");
}

// function playBgm(){
//     bgm.setVolume(0.1);
//     bgm.play();
// }

function newPlay(a){
    a.stop();
    a.play();
}

function playTimer(){
    for(var announcer in timerAnnouncer){
        // console.log(rounds)
        // console.log(announcer)
        if(rounds == announcer && !timerTrigger[announcer]){
            newPlay(timerAnnouncer[announcer]);
            timerTrigger[announcer] = true;
        }
    }
}

function playProgress(){
    if(progress >= 10 && progress <30){
        //console.log(timerAnnouncer[2].isPlaying())
        if(progressTrigger[0] == false && !timerAnnouncer[2].isPlaying()){
            newPlay(progressSound[0]);
            progressTrigger[0] = true;
        }  
    }
    else if(progress >= 30 && progress <50 && !timerAnnouncer[4].isPlaying()){
        if(progressTrigger[1] == false){
            newPlay(progressSound[1]);
            progressTrigger[1] = true;
        } 

    }
    else if(progress >= 50 && progress <70 && !timerAnnouncer[6].isPlaying()){
        if(progressTrigger[2] == false){
            newPlay(progressSound[2]);
            progressTrigger[2] = true;
        } 

    }
    else if(progress >= 70 && progress <90 && !timerAnnouncer[8].isPlaying()){
        if(progressTrigger[3] == false){
            newPlay(progressSound[3]);
            progressTrigger[3] = true;
        } 

    }
    else if(progress >= 90 && progress <100 && !timerAnnouncer[10].isPlaying()){
        if(progressTrigger[4] == false){
            newPlay(progressSound[4]);
            progressTrigger[4] = true;
        } 

    }
    else if(progress >= 100){
        if(progressTrigger[5] == false && !timerAnnouncer[12].isPlaying()){
            newPlay(progressSound[5]);
            progressTrigger[5] = true;
        } 

    }
}