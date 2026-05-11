Aim: To establish serial communication between an Arduino Nano and a computer (using
Python) to perform data transfer operations.
Required Items:
● PC/Laptop: Windows 7 or above.
● Arduino Nano: Microcontroller board.
● USB Cable: For power and data connection.
● Arduino IDE: For writing and uploading the Arduino code.
● Python (Thonny IDE): To run the receiving script on the PC.
Algorithm:
1. Start the program.
2. Initialize the Serial port with a specific Baud Rate (e.g., 9600).
3. In an infinite loop:
○ Arduino: Send a data string (e.g., "Hello from Arduino") to the serial port every
second.
○ Python: Check if data is available in the serial buffer.
○ Python: Read the incoming string and display it on the screen.
4. Stop the program.

Procedure:

1. Connect the Arduino Nano to your computer using the USB cable.

2. Open Arduino IDE, select Tools > Board > Arduino Nano, and choose the correct COM

Port.

3. Type the Arduino program below and click Upload.

4. Open Thonny IDE, write the Python program provided below, and ensure the pyserial

library is installed.

5. Run the Python script to see the data transferred from the Arduino.

Arduino Program (Sender):

C++

void setup() {

// Initialize serial communication at 9600 bits per second:

Serial.begin(9600);

}

void loop() {

// Send data string followed by a newline:

Serial.println("Hello from Arduino!");

delay(1000); // Wait for 1 second

}

Python Program (Receiver):
Python
import serial
import time
# Create serial object (Update 'COM3' to your specific port)
ser = serial.Serial('COM3', 9600)
time.sleep(2) # Wait for connection to stabilize
while True:
if ser.in_waiting > 0:
# Read the incoming line of data
data = ser.readline().decode('utf-8').rstrip()
print(f"Data Received: {data}")
Circuit Diagram Description: The Arduino Nano connects directly to the PC via its mini-USB
port. No external wiring is required as the USB cable handles both the 5V power supply and the
RX/TX serial signals.
Result: Data transfer between the Arduino Nano and the PC was successfully performed. The
message sent by the Arduino appeared correctly in the Python console.
