const express = require("express");
let handleScraping = require("./functions/handlescraping");
let compareProductSku = require("./functions/compareproductsku");

const PORT = process.env.PORT || 3001;

const app = express();

// Endpoints
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../"));
});
app.post("/api/scraping", async function (req, res) {
  await handleScraping(req, res).then((data) => {
    compareProductSku(data);
    res.status(200).json({
      productName: productName,
      productPrice: productPrice,
      productImage: productImage,
      productSkuNumber: productSkuNumber,
      productURL: incomingInputUrl,
    });
  });
});

// .post("/storeddesiredprice", storeDesiredPrice);
// .get("/dailyscraping", handleDailyScraping)
// .get("/sendemails", sendEmailNotification)
// .post("/notifyuser", notifyUser)

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
