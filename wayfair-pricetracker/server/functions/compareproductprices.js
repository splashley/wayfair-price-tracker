const { default: knex } = require("knex");
const db = require("../models/dbhelpers");

async function compareProductPrices(storedPrices) {
  return db
    .from("storedDesiredPrices")
    .select("productID", "desiredPrice", "id", "email")
    .then((desiredPrices) => {
      const productPrices = new Map();
      for (let item of storedPrices) {
        productPrices.set(item.id, item);
      }
      const winningPrices = [];
      for (let item of desiredPrices) {
        const product = productPrices.get(item.productID)
        if (product && item.desiredPrice >= product.productPrice) {
          winningPrices.push({
            productId: item.productID,
            desiredPrice: item.desiredPrice,
            productPrice: product.productPrice,
            id: item.id,
            email: item.email,
            productURL: product.productURL,
            productName: product.productName
          });
        } else {
          console.log("this is the else!!");
        }
      }
      return winningPrices;
    })
    .catch((err) => console.log(err));
}

module.exports = compareProductPrices;
