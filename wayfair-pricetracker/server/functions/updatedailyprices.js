const { default: knex } = require("knex");
const db = require("../models/dbhelpers");

async function updateDailyPrices(data) {
  // Need to receive email, desired price, and productid
  console.log(data);
  const incomingPrice = data.productPrice;
  const incomingProductId = data.id;

  // Check to see if there is an entry in the db that matches the email and productId
  const addNewPrice = await db("productPriceData")
  .insert([{
      productPrice: incomingPrice,
      productID: incomingProductId
  }])
    .catch((err) => console.err(err));

    return addNewPrice;
}

module.exports = updateDailyPrices;
