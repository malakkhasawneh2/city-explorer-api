'use strict';
const express = require('express');//import express
const cors = require('cors');//import cors
const server = express();
server.use(cors());// make my server opened for any client
require('dotenv').config();//to import dotenv
// const weatherData = require('./data/weather.json');
const PORT = process.env.PORT;//take the port from .env file
//axios
const axios = require('axios');


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
server.get('/weather', getWeather)
server.get('/movies', getMovies)
// getWeatherinfo
function getWeather(req, res) {
    // const lat=req.query.lat;
    // const lon=req.query.lon;
   
    const name = req.query.cityName
    console.log(req.query);
    const URL = `https://api.weatherbit.io/v2.0/forecast/daily?city=${name}&key=${process.env.WEATHER_API_KEY}`;
    let weatherInfo = [];
    axios
        .get(URL)
        .then(result => {
            weatherInfo = result.data.data.map(item => {
                return new Forecast(item)
            })
            res.send(weatherInfo)
        })
        .catch(error => {
            console.log(error);
            res.send('Error!',error);
        })
}


function getMovies(req, res) {
    const name = req.query.cityName

    const moviesURL = `https://api.themoviedb.org/3/search/movie?query=${name}&api_key=${process.env.MOVIE_API_KEY}&language=en-US&page=1&include_adult=false`
    let movieInfo = [];
    axios
        .get(moviesURL)
        .then(result => {
            movieInfo = result.data.results.map((item) => {
                return new Movie(item)
            })
            res.send(movieInfo)
        })
        .catch(error => {
            console.log(error);
            res.status(500).send('Error!');
        })
}



//http://localhost:3333/weather?lat=lat&lon=lon
// server.get ("/weather",async (req, res) => {
//     const lon = req.query.lon;
//     const lat = req.query.lat;    
//     const URL = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}`;
//     let weatherArray = [];
//     let urlData = await axios.get(URL);


//     // let result = weatherData.find((item) => {
//     //     if(item.lat === lat && item.lon === lon)
//     //     {            
//             weatherArray = urlData.data.data.map(day => {
//                 return new Forcast(day)

//             })
//     res.send(weatherArray);
// });

class Forecast {
    constructor(day) {
        this.date = day.valid_date;
        this.description = `Low of ${day.low_temp}, high of ${day.high_temp} with ${day.weather.description}`;
    }
}

//http://localhost:3333/movie?cityName=Amman
// server.get("/movies",async (req, res) => {
//     const movieName = req.query.moviename;
//     const URL = `https://api.themoviedb.org/3/search/movie?api_key=process.env.MOVIE_API_KEY;&query=${movieName}`

//     let moviesData= await axios.get(URL)
//     let moviesArray=[];
//     moviesArray=moviesData.data.results.map(item=>{
//         return new MoviesCreator(item)
//     })
//     res.status(200).send(moviesArray);
// });
class Movie {
    constructor(item) {

        this.title = item.title
        this.overview = item.overview
        this.average_votes = item.vote_average
        this.total_votes = item.vote_count
        this.image_url = `https://image.tmdb.org/t/p/w500${item.poster_path}`
        this.popularity = item.popularity
        this.released_on = item.release_date
    }

}

