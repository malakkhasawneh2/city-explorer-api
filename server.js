'use strict';
const express = require('express');//import express
const cors = require('cors');//import cors
const server = express();
server.use(cors());// make my server opened for any client

require('dotenv').config();//to import dotenv
const weatherData = require('./data/weather.json');
const PORT = process.env.PORT;//take the port from .env file


// to make our server listen on PORT
server.listen(PORT, () => {
console.log(`Hello, I am listening on ${PORT}`);
})

// http://localhost:3333/test
server.get('/test',(req,res) => {
    res.send('Hi from test route');
  })

class ForCast {
    constructor(date, description) {
        this.date = date;
        this.description = description;
    }
}
// http://localhost:3333/weather
server.get('/weather', (req, res) => {
    let city = req.query.searchQuery;
    let lat =req.query.lat;
    let long = req.query.long;
    let found = weatherData.find((element) => {
            return element;
        }
    )
    try {
        let forcastArr = [];
        let date;
        let description;
        let forcastData;
        for(let i=0;i<found.data.length;i++){
            date = found.data[i].valid_date;
            description = `low of ${found.data[i].min_temp}, hight of ${found.data[i].max_temp} with ${found.data[i].weather.description}`;
            forcastData = new ForCast(date,description);
            forcastArr.push(forcastData);
        }
        
        res.send(forcastArr);
    } catch(error) {
        res.status(404).send('Sorry, page not found');
    }
})




