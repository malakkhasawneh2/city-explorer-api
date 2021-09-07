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
    console.log(`Hello, I am listening on ${PORT}`)
})

server.get('/', (req, res) => {
    res.send('Hello from the home route')
})

// http://localhost:3333/test
server.get('/test', (req, res) => {
    res.send('Hi from test route');
})

//http://localhost:3333/weather?cityName=Amman
server.get("/weather", (req, res) => {
    const lon = req.query.lon;
    const lat = req.query.lat;    
    
    let weatherArray = [];
    let result = weatherData.find((item) => {
        if(item.lat === lat && item.lon === lon)
        {            
            weatherArray = item.data.map(day => {
                const dayObj = new Forecast(day);
                return dayObj;
                
            })
        }
    })
    res.send(weatherArray);
});


function Forecast(day) {
    this.date = day.valid_date;
    this.description = `Low of ${day.low_temp}, high of ${day.high_temp} with ${day.weather.description}`;
}


