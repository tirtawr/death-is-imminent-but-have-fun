/*     Arduino Rotary Encoder Tutorial
 *      
 *  by Dejan Nedelkovski, www.HowToMechatronics.com
 *  
 */
 
 #define reOutputA 6
 #define reOutputB 7

 int reCounter = 0; 
 int reState;
 int reLastState;  

 void setup() { 
   pinMode (reOutputA,INPUT);
   pinMode (reOutputB,INPUT);
   
   Serial.begin (9600);
   // Reads the initial state of the outputA
   reLastState = digitalRead(reOutputA);   
 } 

 void loop() { 

 }

 void reLoop() {
   reState = digitalRead(reOutputA); // Reads the "current" state of the outputA
   // If the previous and the current state of the outputA are different, that means a Pulse has occured
   if (reState != reLastState){     
     // If the outputB state is different to the outputA state, that means the encoder is rotating clockwise
     if (digitalRead(reOutputB) != reState) { 
       reCounter ++;
     } else {
       reCounter --;
     }
     Serial.print("Position: ");
     Serial.println(reCounter);
   } 
   reLastState = reState; // Updates the previous state of the outputA with the current state
 }
