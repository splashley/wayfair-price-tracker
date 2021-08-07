const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 3001;
const app = express();

// Functions
const handleScraping = require("./functions/handlescraping");
const compareProductSku = require("./functions/compareproductsku");
const storeDesiredPrice = require("./functions/storedesiredprice");
const handleDailyScraping = require("./functions/handledailyscraping");
const getProductIdsForScraping = require("./functions/getproductidsforscraping");
const getPrices = require("./functions/getPrices");
const updateDailyPrices = require("./functions/updatedailyprices");
const compareProductPrices = require("./functions/compareproductprices");
const sendEmails = require("./functions/sendemails")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Endpoints
app.post("/api/scraping", async function (req, res) {
  const handleScrapingProcess = await handleScraping(req, res);
  const result = await compareProductSku(handleScrapingProcess);
  res.status(200).json({
    productName: handleScrapingProcess.productName,
    productPrice: handleScrapingProcess.productPrice,
    productImage: handleScrapingProcess.productImage,
    productSkuNumber: handleScrapingProcess.productSkuNumber,
    productURL: handleScrapingProcess.productURL,
    productId: result,
  });
});

app.post("/api/storedesiredprice", async function (req, res) {
  await storeDesiredPrice(req, res).then((data) => {
    res.status(200).json(data);
    console.log("data", data);
  });
});

app.get("/api/dailyscraping", async function (req, res) {
  const startDailyScraping = await getProductIdsForScraping(req, res).then(
    async (data) => { 
      function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }
      for (let item of data) {
        console.log(item);
        await handleDailyScraping(item).then(res => { updateDailyPrices(res)})
        await sleep(60000);
      }
    }
  );
});

app.get("/api/sendemails", async function (req, res) {
  const getAllPrices = await getPrices(req, res).then(res => res);
  const comparePrices = await compareProductPrices(getAllPrices).then(res => res);
  const notifyUsers = await sendEmails(comparePrices).then(res => res);
})

//

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
