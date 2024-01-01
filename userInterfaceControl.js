
const puppeteer = require('puppeteer');

async function runN11UITest() {
  const browser = await puppeteer.launch({ headless: false }); 
  const page = await browser.newPage();

  try {
    await page.goto('https://www.n11.com/', { waitUntil: 'domcontentloaded' });

    // Checking required HTML elements
    const imageElements = await page.$$('img[src^="https://n11scdn.akamaized.net"]');
    const inputElement = await page.$('input#searchData');
    const lazyImageElement = await page.$('img.lazy[data-original^="https://n11scdn.akamaized.net"]');
    const myAccountElement = await page.$('div.myAccount');
    const myLocationElement = await page.$('div.myLocation');

    // Domain control
    const currentUrl = page.url();
    if (!currentUrl.includes('n11.com')) {
      console.error('UI Test Failed - Invalid Domain!');
      return;
    }

    // Checking the existence of HTML elements
    if (imageElements.length > 0 && inputElement && lazyImageElement && myAccountElement && myLocationElement) {
      console.log('UI Test Successful - Required HTML Elements Found!');
    } else {
      console.error('UI Test Failed - Required HTML Elements Not Found!');
    }

  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    await browser.close();
  }
}

runN11UITest();
