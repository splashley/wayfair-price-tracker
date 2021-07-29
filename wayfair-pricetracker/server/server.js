const express = require("express");
let handleScraping = require("./functions/handlescraping");
let compareProductSku = require("./functions/compareproductsku");
let storeDesiredPrice = require("./functions/storedesiredprice");
let handleDailyScraping = require("./functions/handledailyscraping");
let getProductIdsForScraping = require("./functions/getproductidsforscraping");
let updateDailyPrices = require("./functions/updatedailyprices");
const cors = require("cors");

const PORT = process.env.PORT || 3001;

const app = express();

// Endpoints
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
    console.log("data on serverjs", data);
    res.status(200).json(data);
  });
});

app.get("/dailyscraping", async function (req, res) {
  const startDailyScraping = await getProductIdsForScraping(req, res).then(
    async (data) => { 
      console.log("we're right at the for loop");
      function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }
      for (let item of data) {
        await handleDailyScraping(item).then(res => { updateDailyPrices(res)})
        await sleep(30000);
      }
    }
  );
  // const result = await handleDailyScraping()
  //   .then((data) => {

  //     res.status(200).json(data);
  // }
  // )
});
// .get("/sendemails", sendEmailNotification)
// .post("/notifyuser", notifyUser)

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
