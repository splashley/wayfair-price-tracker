const puppeteer = require("puppeteer");
const knex = require("../data/knex");

async function handleScraping(request, response) {
  // Assign the url that frontend is sending to backend to a variable
  const incomingInputUrl = request.body.inputURL;
  const inputURL = String(incomingInputUrl);
  // We need to pass the URL to Puppeteer so it can begin scrapping off that page
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });
  const page = await browser.newPage();
  const productNameSelector = "#bd div.pl-Wrapper h1";
  const priceSelector = "span.pl-Price-V2";
  const imageSelector = "#bd div.pl-Wrapper img";
  await page.setUserAgent(
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
  );
  await page.goto(inputURL);

  await Promise.all(
    [
      await page.mainFrame().waitForSelector(productNameSelector),
      await page.mainFrame().waitForSelector(priceSelector),
      await page.mainFrame().waitForSelector(imageSelector),
    ],
    console.log("wow we're here")
  ).catch(function (error) {
    console.log(error);
  });
}

module.exports = handleScraping;
