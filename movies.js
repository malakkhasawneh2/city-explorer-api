const axios = require("axios");
let movieMemory = {};
function getMovies(req, res) {
    const name = req.query.cityName
    if (movieMemory[name] !== undefined) {
        res.send(movieMemory[name]);
    } else {
        const moviesURL = `https://api.themoviedb.org/3/search/movie?query=${name}&api_key=${process.env.MOVIE_API_KEY}&language=en-US&page=1&include_adult=false`
        let movieInfo = [];
        axios
            .get(moviesURL)
            .then(result => {
                movieInfo = result.data.results.map((item) => {
                    return new Movie(item)
                })
                movieMemory[name] = movieInfo;
                res.send(movieInfo)
            })
            .catch(error => {
                console.log(error);
                res.status(500).send('Error!');
            })
    }
}
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


module.exports = getMovies;
