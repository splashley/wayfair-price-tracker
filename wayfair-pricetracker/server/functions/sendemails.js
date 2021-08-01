const nodemailer = require("nodemailer");
require('dotenv').config()

async function sendEmails(data) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        type: "login",
      user: process.env.user,
      pass: process.env.password,
    },
  });


  // send mail with defined transport object
  data.forEach(async (item) => {
    let info = await transporter.sendMail({
        from: '"HHH 👻" <hunterhunterhuntersite@gmail.com>', // sender address
        to: item.email, // list of receivers
        subject:
          "Price Achieved, " +
          item.desiredPrice +
          " ✔", // Subject line
        text:
          "Congrats, " +
          item.productName +
          " is below your desired price of: $" +
          item.desiredPrice +
          "\n\n\nGo buy now at this url: " +
          item.productURL, // plain text body
        // html: "<b>Hello world?</b>", // html body
      });
      console.log("Message sent: %s", info.messageId);
  })
  
}

module.exports = sendEmails;
