const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const scraper = require('./services/scraper.service');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_DB,{useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log("Database connected");

    app.use('', (req,res) => {
        let scrap = new scraper('all');
        
        scrap.scrapeWebsites();
    });
})
.catch((error) => {
    console.log("Failed to connect to database");
})

module.exports = app;