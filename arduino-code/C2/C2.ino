int flip1 = 0;
int flip2 = 0;
int slider1 = 0;
int slider2 = 0;
int sonic = 0;
int rotary = 0;



//LCD
#include <LiquidCrystal_I2C.h>
// NOTE: On the nanos, only A4 and A5 can be used, dont use any other pins
#define LCD_SCL_PIN 4 //Analog
#define LCD_SDA_PIN 5 //Analog 
LiquidCrystal_I2C lcd(0x27, 2, 1, 0, LCD_SCL_PIN, LCD_SDA_PIN, 6, 7, 3, POSITIVE);  // Set the LCD I2C address
String instruction;

//ultra sonic
int trigPin = 9;
int echoPin = 10;

//Rotary
int outputA = 8;
int outputB = 7;
int aState;
int aLastState;


void setup() {
  Serial.begin(9600);
  pinMode(2,INPUT);
  pinMode(3,INPUT);
  pinMode(A1,INPUT);
  pinMode(A2,INPUT);

// ultrasonic
  pinMode(echoPin,INPUT);
  pinMode(trigPin,OUTPUT);


  //rotary
  pinMode(outputA,INPUT);
  pinMode(outputB,INPUT);
  aLastState = digitalRead(outputA);

  //LCD
  lcd.begin(20,4); 
  //printText();
}

void clearText() {
    lcd.setCursor(0,0);
    lcd.print("                                                                                ");
 }

void printText() {
    lcd.setCursor(0,0);
    lcd.print(instruction.substring(0,20));
    lcd.setCursor(0,1);
    lcd.print(instruction.substring(20,40));
    lcd.setCursor(0,2);
    lcd.print(instruction.substring(40,60));
    lcd.setCursor(0,3);
    lcd.print(instruction.substring(60,80));
}

void loop() {

  //get info
  if(Serial.available()>0){
    //digitalWrite(10,HIGH);
    clearText();
    instruction = Serial.readStringUntil('\r\n');
    //inHolder.toCharArray(instruction,81);
    printText();
    //Serial.println(instruction);
  }
  else{
    //digitalWrite(10,LOW);
  }

  //rotary
//  Serial.print(digitalRead(outputA));
//  Serial.print(',');
//  Serial.print(digitalRead(outputB));
//  Serial.print(',');
  aState = digitalRead(outputA);
  if(aState != aLastState){
    if(digitalRead(outputB) != aState){
      rotary ++;
    } else {
      //rotary --;
    }
  }
//  Serial.println(rotary);
  aLastState = aState;


  //ultra sonic
  digitalWrite(trigPin, LOW);
  delayMicroseconds(5);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  sonic = (pulseIn(echoPin,HIGH)/2) / 29.1;
  
  flip1 = digitalRead(2);
  flip2 = digitalRead(3);
  slider1 = analogRead(A2);
  slider2 = analogRead(A3);



  Serial.print(flip1);
  Serial.print(',');
  Serial.print(flip2);
  Serial.print(',');
  Serial.print(slider1);
  Serial.print(',');
  Serial.print(slider2);
  Serial.print(',');
  Serial.print(sonic);
  Serial.print(',');
  Serial.println(rotary);
  
  delay(2);
}
