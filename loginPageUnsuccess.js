const { Builder, By, until } = require('selenium-webdriver');

async function checkErrorMessage(driver) {
  await driver.wait(until.elementLocated(By.css('.error-message span:nth-child(2)')), 5000);
  
  const errorMessage = await driver.findElement(By.css('.error-message span:nth-child(2)')).getText();

  if (errorMessage.includes('E-posta adresi veya şifre hatalı')) {
    console.log('E-posta adresi veya şifre hatalı, message is displayed.');
  } else {
    console.error('An unexpected error occurred:', errorMessage);
  }
}

async function performLogin(driver, username, password) {
  await driver.get('https://www.n11.com/');

  await driver.wait(until.elementLocated(By.className('btnSignIn')), 10000);

  await driver.findElement(By.className('btnSignIn')).click();

  await driver.wait(until.elementLocated(By.id('email')), 5000);

  await driver.findElement(By.id('email')).sendKeys(username);
  await driver.findElement(By.id('password')).sendKeys(password);

  await driver.wait(until.elementIsEnabled(driver.findElement(By.id('loginButton'))), 5000);

  await driver.findElement(By.id('loginButton')).click();
}

async function runFailedLoginTest() {
  let driver;

  try {
    driver = await new Builder().forBrowser('chrome').build();

    await performLogin(driver, 'hatali_kullanici@gmail.com', 'YanlisSifre');

    await checkErrorMessage(driver);
    console.log("Login Test Completed with Incorrect User.");
  } finally {
    if (driver && (await driver.getSession())) {
      try {
        await driver.quit();
      } catch (quitError) {
        console.error('Error terminating WebDriver:', quitError.message);
      }
    }
  }
}

runFailedLoginTest();
