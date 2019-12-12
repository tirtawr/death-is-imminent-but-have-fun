int button = 0;
int flip = 0;
int matrix[] = {0,0,0};
int rotary = 0;
int sonic = 0;
int slider = 0;

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
  pinMode(4,INPUT);
  pinMode(5,INPUT);
  pinMode(6,INPUT);
  pinMode(A2,INPUT);
  pinMode(A3,INPUT);

// ultrasonic
  pinMode(echoPin,INPUT);
  pinMode(trigPin,OUTPUT);


  //rotary
  pinMode(outputA,INPUT);
  pinMode(outputB,INPUT);
  aLastState = digitalRead(outputA);

  //LCD
  lcd.begin(20,4);
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
    clearText();
    //digitalWrite(10,HIGH);
    instruction = Serial.readStringUntil('\r\n');
    //inHolder.toCharArray(instruction,81);
    //Serial.print(instruction);
    printText();
    //Serial.println(instruction);
  }
  else{
    //digitalWrite(10,LOW);
  }

  //rotary
  aState = digitalRead(outputA);
  if(aState != aLastState){
    if(digitalRead(outputB) != aState){
      rotary ++;
    } else {
      //rotary --;
    }
  }
  aLastState = aState;


  //ultra sonic
  digitalWrite(trigPin, LOW);
  delayMicroseconds(5);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  sonic = (pulseIn(echoPin,HIGH)/2) / 29.1;

  button = digitalRead(2);
  flip = digitalRead(3);
  slider = analogRead(A2);
  matrix[0] = digitalRead(4);
  matrix[1] = digitalRead(A3);
  matrix[2] = digitalRead(6);


  Serial.print(button);
  Serial.print(',');
  Serial.print(flip);
  Serial.print(',');
  Serial.print(matrix[0]);
  Serial.print(',');
  Serial.print(matrix[1]);
  Serial.print(',');
  Serial.print(matrix[2]);
  Serial.print(',');
  Serial.print(rotary);
  Serial.print(',');
  Serial.print(sonic);
  Serial.print(',');
  Serial.println(slider);

  delay(2);
  
}
