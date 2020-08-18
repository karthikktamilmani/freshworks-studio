const puppeteer = require('puppeteer');

describe('Contact Form', () => {
  beforeAll(async() => {
            await page.goto('http://localhost:5000/',{
              waitUntil: ["networkidle0", "domcontentloaded"]
            });
        });
    test('Can submit contact form', async() => {
        let browser = await puppeteer.launch();
        //
        await page.waitForSelector('#add-form');
        await page.click("#numberDucksFed");
        await page.type("#numberDucksFed", "3");
        await page.click("#timeFed");
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('Enter');
        await page.click("#fedLocation");
        await page.type("#fedLocation", "Lake");
        await page.click("#food");
        await page.type("#food", "Grapes");
        await page.click("#foodKind");
        await page.type("#foodKind", "Fruit");
        await page.click("#foodQuantity");
        await page.type("#foodQuantity", "5");

        await page.click("button[type=submit]");

        await page.waitForSelector("#swal2-title");

        browser.close();
    }, 9000000);
});