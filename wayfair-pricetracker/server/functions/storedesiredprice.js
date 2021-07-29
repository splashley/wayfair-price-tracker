const { default: knex } = require("knex");
const db = require("../models/dbhelpers");

async function storeDesiredPrice(req, res) {
  const incomingEmail = req.body.email;
  const incomingDesiredPrice = req.body.desiredPrice;
  const incomingProductId = req.body.productId;
  const incomingDesiredPriceReplacement = req.body.priceReplacementFlag;

  const replaceDesiredPrice = () => {
    return db("storedDesiredPrices")
      .where({ email: incomingEmail, productID: incomingProductId })
      .update({
        email: incomingEmail,
        desiredPrice: incomingDesiredPrice,
        productID: incomingProductId,
      })
      .then((otherRes) => otherRes);
  };

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
          .then((otherRes) => {
            if (incomingDesiredPriceReplacement === true) {
             } else { otherRes
            }
          });
      } else {
        // Need to ask user if they want to replace their price or not
        let currentPrice = rows[0].desiredPrice;
        if (incomingDesiredPriceReplacement === true) {
          return replaceDesiredPrice();
        } else {
          return currentPrice;
        }
        // If not, leave entry as is
        // If so, update the entry with new price
      }
    })
    .catch((err) => console.err(err));

  return checkEntryExists;
}

module.exports = storeDesiredPrice;
