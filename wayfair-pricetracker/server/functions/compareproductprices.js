const { default: knex } = require("knex");
const db = require("../models/dbhelpers");

async function compareProductPrices(storedPrices) {
  return db
    .from("storedDesiredPrices")
    .select("productID", "desiredPrice")
    .then((desiredPrices) => {
      const productPrices = new Map();
      for (let item of storedPrices) {
        productPrices.set(item.productID, item.productPrice);
      }
      const winningPrices = [];
      for (let item of desiredPrices) {
        if (item.desiredPrice >= productPrices.get(item.productID)) {
      winningPrices.push({id: item.productID, desiredPrice: item.desiredPrice, productPrice: productPrices.get(item.productID)})
        } else {
            console.log("Boo the price is not right yet")
        }
      }
      return winningPrices;
    })
    .catch((err) => console.log(err));
}

module.exports = compareProductPrices;
