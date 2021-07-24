const express = require("express");
let handleScraping = require("./functions/handlescraping");
let compareProductSku = require("./functions/compareproductsku");
let storeDesiredPrice = require("./functions/storedesiredprice");
const cors = require("cors");

const PORT = process.env.PORT || 3001;

const app = express();

// Endpoints
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.post("/api/scraping/", async function (req, res) {
  const handleScrapingProcess = await handleScraping(req, res)
  const result = await compareProductSku(handleScrapingProcess);
  console.log("result", result);
    res.status(200).json({
      productName: handleScrapingProcess.productName,
      productPrice: handleScrapingProcess.productPrice,
      productImage: handleScrapingProcess.productImage,
      productSkuNumber: handleScrapingProcess.productSkuNumber,
      productURL: handleScrapingProcess.productURL,
      productId: result
    });
});

app.post("/api/storedesiredprice", async function (req, res) {
  await storeDesiredPrice(req, res).then((data) => {
    res.status(200).json({
    
    });
  });
});
// .get("/dailyscraping", handleDailyScraping)
// .get("/sendemails", sendEmailNotification)
// .post("/notifyuser", notifyUser)

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
