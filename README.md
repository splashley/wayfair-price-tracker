# Wayfair Price Tracker
This project is a complete refactor of my final project from November 2020 at my Full-Stack Web Development bootcamp. I thought it would be a good opportunity to review a past project to see how I could improve on the code by starting from scratch (and with a slightly different tech stack). This Wayfair price tracker allows you save a desired price for the product. Once a desired price is saved for a product, a daily cronjob will review that product to see if your desired price has been met or exceeded. If met/exceeded, an e-mail notification is sent out via Nodemailer to communicate to the user that their price has been met or exceeded.

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
- Used Knex.js (with SQLite3) for the first time to create schemas,
- Because I used SQLite3, I had to relearn a bit of SQL.
- Learned a bit about relational databases, specially about primary and foreign keys.
- Refactoring an old project was a good learning experience. Reviewing how I previously coded vs how I coded in the present with greater knowledge was an insightful experience. It showcases how much you've grown as a developer.
- Developed a deeper understanding of The Map() object and incorporated it into my project.
