const { default: knex } = require("knex");
const db = require("../models/dbhelpers");
async function getPrices() {
    return db
    .from("productPriceData")
    .select("productID", "productPrice")
      .then((data) => {
        return data
      })
      .catch((err) => console.log(err))
// Using the productID from sDP, get price from today
// pD.productPrice =< sDP.desiredPrices
}

module.exports = getPrices;
