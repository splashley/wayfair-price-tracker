const { default: knex } = require("knex");
const db = require("../models/dbhelpers");

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
        return data
      });
  };
 return getProductIDs();
}
module.exports = getProductIdsForScraping;
