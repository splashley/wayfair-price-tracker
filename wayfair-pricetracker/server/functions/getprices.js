const { default: knex } = require("knex");
const db = require("../models/dbhelpers");
async function getPrices() {
const currentDate = new Date();
const currentYear = "" + currentDate.getUTCFullYear()
const currentMonth = "" + (currentDate.getUTCMonth() + 1)
const currentDay = "" + currentDate.getUTCDate()
const timestamp = `${currentYear}-${currentMonth.padStart(2, "0")}-${currentDay - 1}`;

  return (
    db
      .select("productData.id", "productData.productURL", "productData.productName", "productPriceData.productPrice", "productPriceData.createdAt")
      .from("productPriceData")
      .innerJoin(
        "productData",
        "productData.id",
        "=",
        "productPriceData.productID"
      )
      .where("productPriceData.createdAt", ">=", timestamp)
        .then((data) => {
          return data
        })
      .catch((err) => console.log(err))
  );
}

module.exports = getPrices;
