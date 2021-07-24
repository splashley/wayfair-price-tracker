const puppeteer = require("puppeteer");

async function handleScraping(req, res) {
  // Assign the url that frontend is sending to backend to a variable
  const incomingInputUrl = req.body.inputURL;
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
  const skuSelector = "#bd span.Breadcrumbs-item";
  await page.setUserAgent(
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
  );
  await page.goto(inputURL);

  await Promise.all([
    await page.mainFrame().waitForSelector(productNameSelector),
    await page.mainFrame().waitForSelector(priceSelector),
    await page.mainFrame().waitForSelector(imageSelector),
    await page.mainFrame().waitForSelector(skuSelector),
  ]).catch(function (error) {
    console.log(error);
  });

  let productName = await page.$eval(productNameSelector, (element) => {
    return element.innerText;
  });

  let productPrice = await page.$eval(priceSelector, (element) => {
    return element.innerHTML;
  });

  let productImage = await page.$eval(imageSelector, (element) => {
    return element.getAttribute("src");
  });

  let originalProductSkuNumber = await page.$eval(skuSelector, (element) => {
    return element.innerText;
  });

  let productSkuNumber = originalProductSkuNumber.replace("SKU: ", "");

  console.log(inputURL);

  await browser.close();
  return {
    productName: productName,
    productPrice: productPrice,
    productImage: productImage,
    productSkuNumber: productSkuNumber,
    productURL: inputURL,
  };
}

module.exports = handleScraping;
