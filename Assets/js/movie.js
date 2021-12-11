//API Key for the movie DB
var movieKey = "d4a209b34d618c9571d82786a8f1c751";
var movieGenres;

//generators an array of movie genres to later sort through 
let generateGenreString = "https://api.themoviedb.org/3/genre/movie/list?api_key=" + movieKey + "&language=en-US";
fetch(generateGenreString)
    .then(Response => Response.json()).then((data) => {
        movieGenres = data.genres;
    }).catch((err) => {
        console.log(err);
    });


var searchGenre = function (userGenre) {
    let movieString = "https://api.themoviedb.org/3/discover/movie?api_key=" + movieKey + "&with_genres=" + userGenre;

    //loops through each genre to find correct genre ID
    for (let genre in movieGenres) {
        if (movieGenres[genre].name == userGenre) {
            userGenre = movieGenres[genre].id;
        }
    }

    //removes previous search results
    $("#displayMovies").children().remove();
    
    fetch(movieString)
        .then(Response => Response.json()).then((data) => {
            data = data.results;
            console.log(data);
            let movieList = [];

            //loops through the first 6 movies to display titles
            //note that it assign each movie a value. this is the movie ID
            for (i = 0; i <= 5; i++) {
                let movieTitle = document.createElement("li");
                movieTitle.innerText = data[i].title;
                movieTitle.setAttribute("value", data[i].id);
                $("#displayMovies").append(movieTitle);
                movieList.push(data[i].title);
            }
            return movieList;
        }).catch((err) => {
            console.log(err);
        });
};

var displayMovie = function(movieID){
    let titleString = "https://api.themoviedb.org/3/movie/" + movieID + "?api_key=" + movieKey;
    fetch(titleString)
    .then(Response => Response.json()).then((data) => {
        return data;
    }).catch((err) => {
        console.log(err);
    });
}
