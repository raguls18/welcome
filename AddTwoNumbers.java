import io.appium.java_client.AppiumDriver;
import io.appium.java_client.MobileBy;
import io.appium.java_client.MobileElement;
import io.appium.java_client.android.AndroidDriver;
import org.openqa.selenium.remote.DesiredCapabilities;
import java.net.URL;
public class AppiumLoginTest {
 public static void main(String[] args) {
 AppiumDriver<MobileElement> driver;
 DesiredCapabilities caps = new DesiredCapabilities();
 caps.setCapability("platformName", "Android");
25
 caps.setCapability("deviceName", "emulator-5554"); // Device ID from adb devices
 caps.setCapability("app", "path/to/YourMobileApp.apk");
 
 try {
 driver = new AndroidDriver<>(new URL("http://127.0.0.1:4723/wd/hub"), caps);
 MobileElement usernameField = driver.findElement(MobileBy.id("username"));
 MobileElement passwordField = driver.findElement(MobileBy.id("password"));
 MobileElement loginButton = driver.findElement(MobileBy.id("loginButton"));
 // Enter credentials
 usernameField.sendKeys("testuser");
 passwordField.sendKeys("testpass");
 // Click login button
 loginButton.click();
 // Verify successful login
 MobileElement welcomeMessage = driver.findElement(MobileBy.id("welcomeMessage"));
 if (welcomeMessage.getText().equals("Welcome, testuser!")) {
 System.out.println("Login successful.");
 } else {
 System.out.println("Defect: Login failed.");
 }
 driver.quit();
 } catch (Exception e) {
 System.out.println("Error: " + e.getMessage());
 }
 }
}
