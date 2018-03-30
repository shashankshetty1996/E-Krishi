//TEST CODE
#include<dht.h>
#include<LiquidCrystal.h>
#include<SoftwareSerial.h>

dht dsens;
LiquidCrystal lcd(12, 11, 5, 4, 3, 2);

const int mq6 = A0; //MQ-6
const int spl = A1; //SP
const int mq5 = A2; //MQ-5
const int ldr = A3; //LDR
#define DHT11_PIN 7 //HUMIDITY AND TEMPERATURE

int mq6_val;
int spl_val;
int mq5_val;
int ldr_val;
int tem_val;
int hum_val;
int temp;
int N_val;
int O_val;

void setup() {
  Serial.begin(9600); //BAUD-RATE
  lcd.begin(16, 2); //SET-UP LCD NUMBER OF COLUMNS AND ROWS
  pinMode(mq6, INPUT);
  pinMode(spl, INPUT);
  pinMode(mq5, INPUT);
  pinMode(ldr, INPUT);

  Serial.println("-------------------------------------");
  Serial.println("Warming up sensors.. Please wait...");
  lcd.setCursor(0, 0);
  lcd.print("E-KRISHI");
  Serial.println("-------------------------------------");
  Serial.println(">>");
  delay(1000);
  Serial.println(">>");
  delay(1000);
  lcd.setCursor(0, 1);
  lcd.print("LOADING...");
  Serial.println(">>");
  delay(1000);
  lcd.clear();
  Serial.println("-------------------------------------");
}

void loop() {
  mq6_val = analogRead(mq6);
  spl_val = analogRead(spl);
  mq5_val = analogRead(mq5);
  ldr_val = analogRead(ldr);
  tem_val = dsens.temperature;
  hum_val = dsens.humidity;
  int chk = dsens.read11(DHT11_PIN);

  Serial.println("-------------------------------------");

  //MQ-6 SENSOR VALUE

  //Serial.print("MQ-6 VALUE : ");
  //Serial.println(mq6_val);
  Serial.print("NATURAL GASES CONTENT : ");
  Serial.print(map(mq6_val, 0, 1023, 0, 100));
  Serial.println("%");

  temp = 1024 - mq6_val;
  N_val = 0.07 * temp;
  O_val = 0.03 * temp;

  Serial.print("NITROGEN CONTENT : ");
  Serial.print(map(N_val, 0, 1024, 0, 100));
  Serial.println("/10");

  Serial.print("OXYGEN CONTENT : ");
  Serial.print(map(O_val, 0, 1024, 0, 100));
  Serial.println("/10");

  //SOIL PROBE VALUE

  //Serial.print("SOIL PROBE VALUE : ");
  //Serial.println(spl_val);
  Serial.print("SOIL DRYNESS PERCENTAGE : ");
  Serial.print(map(spl_val, 0, 1023, 0, 100));
  Serial.println("%");

  //MQ-5 VALUE

  //Serial.print("MQ-5 VALUE : ");
  //Serial.println(mq5_val);
  Serial.print("TOXIC GASES CONTENT : ");
  Serial.print(map(mq5_val, 0, 1023, 0, 100));
  Serial.println("%");

  //LDR VALUE

  //Serial.print("LDR VALUE : ");
  //Serial.println(ldr_val);
  Serial.print("SUNLIGHT INTENSITY : ");
  Serial.print(map(ldr_val, 0, 1023, 0, 100));
  Serial.println("%");

  //HUMIDITY AND TEMPERATURE VALUE

  Serial.print("TEMPERATURE VALUE : ");
  Serial.print(tem_val);
  Serial.println("*C");
  Serial.print("HUMIDITY VALUE : ");
  Serial.print(hum_val);
  Serial.println("%");

  Serial.println("-------------------------------------");

  //LCD DISPLAY

  lcd.setCursor(0, 0);
  lcd.print("O2:");
  lcd.print(O_val);
  lcd.print("%");

  lcd.setCursor(0, 1);
  lcd.print("N2:");
  lcd.print(N_val);
  lcd.print("%");

  lcd.setCursor(8, 0);
  lcd.print("TxG:");
  lcd.print(map(mq5_val, 0, 1023, 0, 100));
  lcd.print("%");

  lcd.setCursor(8, 1);
  lcd.print("Sun:");
  lcd.print(map(ldr_val, 0, 1023, 0, 100));
  lcd.print("%");

  delay(2000);
  lcd.clear();

  lcd.setCursor(0, 0);
  lcd.print("Dryness:");
  lcd.print(map(spl_val, 0, 1023, 0, 100));
  lcd.print("%");

  lcd.setCursor(0, 1);
  lcd.print("Temp:");
  lcd.print(tem_val);
  lcd.print("C");

  lcd.setCursor(9, 1);
  lcd.print("Hum:");
  lcd.print(hum_val);
  lcd.print("%");

  delay(2000);
  lcd.clear();
}
