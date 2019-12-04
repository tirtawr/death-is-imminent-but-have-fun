int flip1 = 0;
int flip2 = 0;
int flip3 = 0;
float slider1 = .0;
float slider2 = .0;
int sonic = 0;


void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  pinMode(2,INPUT);
}

void loop() {
  // put your main code here, to run repeatedly:
  flip1 = digitalRead(2);

  Serial.print(flip1);
  Serial.print(',');
  Serial.print(flip2);
  Serial.print(',');
  Serial.print(flip3);
  Serial.print(',');
  Serial.print(slider1);
  Serial.print(',');
  Serial.print(slider2);
  Serial.print(',');
  Serial.println(sonic);

  delay(100);
}
