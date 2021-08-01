const { default: knex } = require("knex");
const db = require("../models/dbhelpers");

async function updateDailyPrices(data) {
  const incomingPrice = data.productPrice;
  const incomingProductId = data.id;

  const addNewPrice = await db("productPriceData")
  .insert([{
      productPrice: incomingPrice,
      productID: incomingProductId
  }])
    .catch((err) => console.log(err));

    return addNewPrice;
}

module.exports = updateDailyPrices;
