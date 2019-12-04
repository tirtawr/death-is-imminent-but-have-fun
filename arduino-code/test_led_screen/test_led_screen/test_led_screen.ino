#include <LiquidCrystal_I2C.h>

// NOTE: On the nanos, only A4 and A5 can be used, dont use any other pins
#define LCD_SCL_PIN 4 //Analog
#define LCD_SDA_PIN 5 //Analog 

LiquidCrystal_I2C lcd(0x27, 2, 1, 0, LCD_SCL_PIN, LCD_SDA_PIN, 6, 7, 3, POSITIVE);  // Set the LCD I2C address

void setup()  
{
  lcd.begin(20,4); 
  printText("this_is_line_1_abcdethis_is_line_2_abcdethis_is_line_3_abcdethis_is_line_4_abcde");
}

void loop() 
{
    delay(100);
}

void printText(String lines) {
    lcd.setCursor(0,0);
    lcd.print(lines.substring(0,20));
    lcd.setCursor(0,1);
    lcd.print(lines.substring(20,40));
    lcd.setCursor(0,2);
    lcd.print(lines.substring(40,60));
    lcd.setCursor(0,3);
    lcd.print(lines.substring(60,80));
}
