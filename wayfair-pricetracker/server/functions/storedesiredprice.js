const { default: knex } = require("knex");
const db = require("../models/dbhelpers");

async function storeDesiredPrice(req, res) {
  // Need to receive email, desired price, and productid
  const incomingEmail = req.body.email;
  const incomingDesiredPrice = req.body.desiredPrice;
  const incomingProductId = req.body.productId;

  console.log(incomingProductId, incomingEmail, incomingDesiredPrice);

  // Check to see if there is an entry in the db that matches the email and productId
  const checkEntryExists = await db
    .select("*")
    .where("email", incomingEmail)
    .andWhere("productID", incomingProductId)
    .from("storedDesiredPrices")
    .then((rows) => {
      if (!rows.length) {
        return db("storedDesiredPrices")
          .insert([
            {
              email: incomingEmail,
              desiredPrice: incomingDesiredPrice,
              productID: incomingProductId,
            },
          ])
          .then((res) => res);
      } else {
          console.log("else!!!");
      }
    })

    .catch((err) => console.err(err));
}

module.exports = storeDesiredPrice;
