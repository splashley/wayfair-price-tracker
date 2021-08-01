const { default: knex } = require("knex");
const db = require("../models/dbhelpers");

async function compareProductSku(data) {
  // Take productSKU from (data), see if it exists in productData under productSKU column
  let productSku = JSON.stringify(data.productSkuNumber);
  const insertData = await db
    .select("*")
    .where("productSKU", productSku)
    .from("productData");
  const obj = { ...insertData[0] };
  const compareData = await db("productData")
    .then((rows) => {
      if (!insertData.length > 0) {
        return db("productData")
          .insert([
            {
              productName: data.productName,
              productURL: data.productURL,
              productSKU: productSku,
            },
          ])
          .then(function (res) {
            return db("productPriceData")
              .insert([
                {
                  productId: db.select(db.raw("last_insert_rowid() as id")),
                  productPrice: data.productPrice,
                },
              ])
              .then(() => 
                res
              );
          })
          .then((res) => {
            return res;
          });
      } else {
        return db("productPriceData")
          .insert([
            {
              productId: obj.id,
              productPrice: data.productPrice,
            },
          ])
          .then((res) => [obj.id]);
      }
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
  return compareData;
}

module.exports = compareProductSku;
