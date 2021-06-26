const db = require("../models/dbhelpers");

function compareProductSku(data) {
  // Take productSKU from (data), see if it exists in productData under productSKU column
  let productSku = JSON.stringify(data.productSkuNumber);

  db.select("*")
    .where("productSKU", productSku)
    .from("productData")
    .then((rows) => {
      if (rows.length === 0) {
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
          .catch((error) => console.error(error));
        console.log("maybe this worked?");
      } else {
        // AddproductPrice to productPriceData
        console.log("did not work");
      }
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      db.destroy();
    });

  console.log("the end");
  // If it exists

  // If it doesn't exist,
}

module.exports = compareProductSku;
