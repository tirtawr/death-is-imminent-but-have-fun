int flip1 = 0;
int flip2 = 0;
int slider = 0;
int rotary = 0;
int matrix[] = {0,0,0};
int sonic = 0;


char instruction[] = "put some thing to:5:2";

//ultra sonic
int trigPin = 7;
int echoPin = 8;

int outputA = 8;
int outputB = 7;

int aState;
int aLastState;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  pinMode(2,INPUT);
  pinMode(A2,INPUT);
  pinMode(4,INPUT);
  pinMode(5,INPUT);
  pinMode(6,INPUT);

////  //ultrasonic
//  pinMode(echoPin,INPUT);
//  pinMode(trigPin,OUTPUT);


  //rotary
  pinMode(outputA,INPUT);
  pinMode(outputB,INPUT);
  
  aLastState = digitalRead(outputA);
}

void loop() {
// if (Serial.available() > 0) { // if there's serial data available
// strcpy(instruction,Serial.read());   // read it
// //Serial.write(inByte);         // send it back out as raw binary data
// //analogWrite(5, inByte);       // use it to set the LED brightness
// // if you're using a speaker instead of an LED, uncomment line below  and comment out the previous line:
// //  tone(5, inByte*10);     // play tone on pin 5
// }

//  char *test = strtok(instruction," ");
//
//  while(test != NULL){
//    Serial.print(test);
//    test = strtok(NULL," ");
//  }
//  Serial.print(instruction);
  // put your main code here, to run repeatedly:

  aState = digitalRead(outputA);
  if(aState != aLastState){
    if(digitalRead(outputB) != aState){
      rotary ++;
    } else {
      //rotary --;
    }
  }
//    Serial.print(digitalRead(outputA));
//    Serial.print(" ");
//    Serial.print(digitalRead(outputB));
//    Serial.print(" ");
//    Serial.println(rotary);
  aLastState = aState;

  //ultra sonic
  digitalWrite(trigPin, LOW);
  delayMicroseconds(5);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  sonic = (pulseIn(echoPin,HIGH)/2) / 29.1;
  
  //flip1 = digitalRead(2);
//  slider = analogRead(A2);
  matrix[0] = digitalRead(4);
  matrix[1] = digitalRead(5);
  matrix[2] = digitalRead(6);

//  
  Serial.print(sonic);
  Serial.print(',');
  Serial.print(flip2);
  Serial.print(',');
  Serial.print(slider);
  Serial.print(',');
  Serial.print(rotary);
  Serial.print(',');
  Serial.print(matrix[0]);
  Serial.print(',');
  Serial.print(matrix[1]);
  Serial.print(',');
  Serial.println(matrix[2]);

  delay(2);
}
