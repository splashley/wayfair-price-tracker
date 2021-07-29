const puppeteer = require("puppeteer");

async function handleDailyScraping(data) {
    const incomingInputUrl = data.productURL;
    const inputURL = String(incomingInputUrl);
    const browser = await puppeteer.launch({
      headless: true,
      defaultViewport: null,
    });
    const page = await browser.newPage();
    const priceSelector = "#bd span.pl-Price-V2";
    await page.setUserAgent(
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
    );
    await page.goto(inputURL);

    await Promise.all([
      await page.mainFrame().waitForSelector(priceSelector),
    ]).catch(function (error) {
      console.log(error);
    });

    let productPrice = await page.$eval(priceSelector, (element) => {
      return element.innerHTML;
    });

    await browser.close();
    return {
      productPrice: productPrice,
      id: data.id
    };
  }
module.exports = handleDailyScraping;
