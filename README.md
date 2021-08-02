# Wayfair Price Tracker
This project is a complete refactor of my final project from November 2020 at my Full-Stack Web Development bootcamp. This Wayfair price tracker allows you to look up products and save a desired price for the product. Once a desired price is saved for a product, a cronjob will review that product on a daily prices to see if your desired price has been met or exceeded. If met/exceeded, an e-mail notification is sent out via Nodemailer to communicate to the user that their price has been met or exceeded.

### Database Schemas
![Database Schemas](https://i.imgur.com/2RHJJqG.png)

## How It's Made:

### Endpoints
#### POST http://localhost:3001/api/scraping/
This endpoint calls on Puppeteer to scrape data from Wayfair url that is provided by the user. Once the data is scraped, it's verified whether the data already exists in the database or not. The scraped data is returned to be passed to the frontend.
#### POST http://localhost:3001/api/storedesiredprice
This endpoint reads the json response from the frontend and stores the data in the database.
#### GET http://localhost:3001/api/dailyscraping
This endpoint calls on Puppeteer to scrape the prices from the products that are stored in the database and stores the prices from that day.
#### GET http://localhost:3001/api/sendemails
This endpoint compares the prices from the storedDesiredPrices and priceData to see if there are any desired prices that are met or exceeded. If so, an email notification is sent to the user using Node Mailer.

**Tech used:** React.js, Node.js, Express, Puppeteer, Knex.js (SQLite3), Axios, and Node Mailer

## Lessons Learned:
- 
