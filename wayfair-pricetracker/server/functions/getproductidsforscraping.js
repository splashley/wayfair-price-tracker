const { default: knex } = require("knex");
const db = require("../models/dbhelpers");
const storeDesiredPrice = require("./storedesiredprice");

async function getProductIdsForScraping() {
  // Review all entries in storedDesiredPrices table

  const getProductIDs = () => {
    return db
      .select("productData.id", "productData.productURL")
      .from("storedDesiredPrices")
      .innerJoin(
        "productData",
        "productData.id",
        "=",
        "storedDesiredPrices.productID"
      )
      .then((data) => {
          console.log("we got the product ids!")
        return data
      });
  };
  // Take each productID from storedDesiredPrices + on productData, using the productIDs, retrieve the
  // productURLs
 return getProductIDs();
  // One at a time, send a productURL to handleScrapingForCronjob
}
module.exports = getProductIdsForScraping;
