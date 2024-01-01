const { Builder, By, until } = require('selenium-webdriver');

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

async function runLoginTest() {
  let driver;

  try {
    driver = await new Builder().forBrowser('chrome').build();

    await performLogin(driver, 'kubradrmz06@gmail.com', 'Deneme-1212');

    await driver.wait(until.elementLocated(By.className('myAccount')), 10000);

    console.log("Entry Test Successful!");
  } catch (error) {
    console.error('Login Test Failed:', error.message);
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

runLoginTest();
