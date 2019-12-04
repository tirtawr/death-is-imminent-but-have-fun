 //serial communication
//four serial objects
var serials = [];
var portNames = ['COM12','COM11'];
let options = {
    baudRate: 9600
}

 function serialSetup(){
    //serial setup
    for(var i = 0 ; i < 2 ; i ++){
        serials[i] = new p5.SerialPort()
        let portlist = serials[i].list();
        serials[i].open(portNames[i]);
        serials[i].on('connected', serverConnected);
        serials[i].on('list', gotList);
        serials[i].on('error', gotError);
        serials[i].on('open', gotOpen);
    }
    serials[0].on('data', gotDataC1);
    serials[1].on('data', gotDataC2);
    // serials[2].on('data', gotDataC3);
    // serials[3].on('data', gotDataC4);
 }

 function serverConnected() {
    console.log("We are connected!");
  }
  
  function gotList(thelist) {
    for (let i = 0; i < thelist.length; i++) {
      console.log(i + " " + thelist[i]);
    }
  }
  
  function gotOpen() {
    console.log("Serial Port is open!");
  }
  
  function gotError(theerror) {
    console.log(theerror);
  }
  
  //console 1 serial data
  function gotDataC1() {
    //currentAvailable = serial.available();
    var currentString1 = serials[0].readStringUntil("\r\n");
    //console.log(currentString1);
    //flip 1, flip 2, slider, rotate, matrix[0][1][2]

    if (currentString1) {
        currentString1 = split(currentString1, ',');
        serialDatas[0] = [parseInt(currentString1[0]),
        parseInt(currentString1[1]),
            parseInt(currentString1[2]),
                parseInt(currentString1[3]),
                    [parseInt(currentString1[4]),parseInt(currentString1[5]),parseInt(currentString1[6])]];
    }
    //console.log(serialDatas[0])
  
  }

    //console 2 serial data
    function gotDataC2() {
        //currentAvailable = serial.available();
        var currentString2 = serials[1].readStringUntil("\r\n");
        
        //flip 1, flip 2, flip3, slider1, slider2, sonic
    
        if (currentString2) {
            currentString2 = split(currentString2, ',');
            serialDatas[1] = [parseInt(currentString2[0]),
            parseInt(currentString2[1]),
                parseInt(currentString2[2]),
                    parseFloat(currentString2[3]),
                        parseFloat(currentString2[4]),
                            parseInt(currentString2[5])];
        }
        //console.log(currentString2);
      
      }