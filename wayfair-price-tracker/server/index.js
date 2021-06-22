const express = require("express");
const handleScraping = require("./functions/handlescraping");

const PORT = process.env.PORT || 3001;

const app = express();

// Endpoints
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.post("/scraping", handleScraping);
// .get("/dailyscraping", handleDailyScraping)
// .get("/sendemails", sendEmailNotification)
// .post("/notifyuser", notifyUser)
// .post("/storeddesiredprice", storeDesiredPrice);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
