const axios = require("axios");

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

class Forecast {
    constructor(day) {
        this.date = day.valid_date;
        this.description = `Low of ${day.low_temp}, high of ${day.high_temp} with ${day.weather.description}`;
    }
}

module.exports = getWeather;