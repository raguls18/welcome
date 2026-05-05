AIM: To test the e-commerce application and report the defects in it.
PROCEDURE:
Defect 1: Incorrect Product Search
Defect Aim: Verify that the product search functionality returns correct results.
Test Steps:
 Navigate to the e-commerce website's homepage.
 Enter "Laptop" in the search bar.
 Click the search button.
 Verify that search results are displayed.


import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;

public class DefectSearchTest {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://www.example-ecommerce.com");

        // DEFECT: Wrong element ID
        WebElement searchInput = driver.findElement(By.id("wrong-search-input"));
        searchInput.sendKeys("Laptop");
        driver.findElement(By.id("search-button")).click();

        WebElement results = driver.findElement(By.id("search-results"));
        System.out.println(results.isDisplayed() ? "Results displayed." : "Defect: Results not displayed.");
        driver.quit();
    }
}
DEFECT OUTPUT:

Defect: Search results not displayed.

correct test code:


import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;

public class ProductSearchTest {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://www.example-ecommerce.com");

        // CORRECT: Right element ID
        WebElement searchInput = driver.findElement(By.id("search-input"));
        searchInput.sendKeys("Laptop");
        driver.findElement(By.id("search-button")).click();

        WebElement results = driver.findElement(By.id("search-results"));
        System.out.println(results.isDisplayed() ? "Search results displayed." : "Defect: Results not displayed.");
        driver.quit();
    }
}

EXPECTED OUTPUT

Search results displayed.








    AIM
To build a BDD (Behavior Driven Development) framework using Selenium, Cucumber, and TestNG for automating login functionality


PROCEDURE
Create a Maven project in Eclipse/IntelliJ

Add dependencies (Selenium, TestNG, Cucumber)

Create Page Object class (LoginPage.java)

Create Feature file (login.feature)

Write Step Definitions

Configure TestNG XML

Write Selenium automation code

Run using TestNG Suite

Update driver path and URL

Enhance with reports and parallel execution



LoginPage.java

class LoginPage {
 WebDriver driver;

 LoginPage(WebDriver d){ driver = d; }

 void open() { driver.get("http://yourapp.com"); }
 void login(String u, String p){
   driver.findElement(By.id("username")).sendKeys(u);
   driver.findElement(By.id("password")).sendKeys(p);
   driver.findElement(By.id("loginButton")).click();
 }
}

Feature: Login

Scenario: Valid login
Given User is on login page
When User enters valid credentials
Then Login successful

StepDefinitions.java

WebDriver driver;
LoginPage lp;

@Given("User is on login page")
public void openPage(){
 driver = new ChromeDriver();
 lp = new LoginPage(driver);
 lp.open();
}

@When("User enters valid credentials")
public void login(){
 lp.login("admin","admin123");
}

@Then("Login successful")
public void success(){
 driver.quit();
}


testng.xml

<suite name="Suite">
 <test name="BDD Test">
  <classes>
   <class name="io.cucumber.testng.CucumberRunner"/>
  </classes>
 </test>
</suite>
