const { default: knex } = require("knex");
const db = require("../models/dbhelpers");

async function compareProductSku(data) {
  // Take productSKU from (data), see if it exists in productData under productSKU column
  let productSku = JSON.stringify(data.productSkuNumber);
  console.log("productSKU", productSku)
  console.log(data)
  const insertData = await db
    .select("*")
    .where("productSKU", productSku)
    .from("productData");
  console.log("insertData", insertData);
  const obj = {...insertData[0]};
  console.log(obj);
  const compareData = await db("productData")
    .then((rows) => {
      // Here we are checking to see if any rows are returned or not for productSku
      if (!insertData.length > 0) {
        // Add productName, productURL, productPrice in productData db
        // Also add productPrice to productPriceData
        db("productData")
          .insert([
            {
              productName: data.productName,
              productURL: data.productURL,
              productSKU: productSku,
            },
          ])
          // Insert productPrice and ID from productData into the productPriceData
          .then(function (resp) {
            db("productPriceData")
              .insert([
                {
                  productId: db.select(db.raw("last_insert_rowid() as id")),
                  productPrice: data.productPrice,
                },
              ])
              .catch((err) => console.error(err));
          })
          .catch((err) => console.error(err));
      } else {
        // AddproductPrice to productPriceData
        db("productPriceData")
          .insert([
            {
              productId: obj.id,
              productPrice: data.productPrice,
            },
          ])
          .then(function (res) {
            return;
          })
          .catch((err) => console.error(err));
      }
    })
    .catch((err) => {
      console.error(err);
    });
}

module.exports = compareProductSku;
