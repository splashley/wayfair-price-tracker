const express = require("express");
let handleScraping = require("./functions/handlescraping");
let compareProductSku = require("./functions/compareproductsku");

const PORT = process.env.PORT || 3001;

const app = express();

// Endpoints
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.json({ message: "Hello, can you see this message?" });
});
app.post("/scraping", async function (req, res) {
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

  console.log("yay!");
});
// .get("/dailyscraping", handleDailyScraping)
// .get("/sendemails", sendEmailNotification)
// .post("/notifyuser", notifyUser)
// .post("/storeddesiredprice", storeDesiredPrice);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
