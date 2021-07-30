const express = require("express");
const cors = require("cors");
const handleScraping = require("./functions/handlescraping");
const compareProductSku = require("./functions/compareproductsku");
const storeDesiredPrice = require("./functions/storedesiredprice");
const handleDailyScraping = require("./functions/handledailyscraping");
const getProductIdsForScraping = require("./functions/getproductidsforscraping");
const getPrices = require("./functions/getPrices");
const updateDailyPrices = require("./functions/updatedailyprices");
const compareProductPrices = require("./functions/compareproductprices");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.post("/api/scraping/", async function (req, res) {
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
  });
});

app.get("/dailyscraping", async function (req, res) {
  const startDailyScraping = await getProductIdsForScraping(req, res).then(
    async (data) => { 
      function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }
      for (let item of data) {
        await handleDailyScraping(item).then(res => { updateDailyPrices(res)})
        await sleep(30000);
      }
    }
  );
});

app.get("/sendemails", async function (req, res) {
  const getAllPrices = await getPrices(req, res).then(res => res);
  const comparePrices = await compareProductPrices(getAllPrices).then(res => console.log("res", res));
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
