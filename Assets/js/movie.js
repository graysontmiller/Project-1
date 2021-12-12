//API Key for the movie DB
var movieKey = "d4a209b34d618c9571d82786a8f1c751";
var movieGenres;
var myStorage = window.sessionStorage;


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

    //removes previous search results
    $("#displayMovies").children().remove();
    
    fetch(movieString)
        .then(Response => Response.json()).then((data) => {
            data = data.results;
            let movieList = [];

            for (i = 0; i < 5; i++) {            
                let movie = {
                    "Title": data[i].title,
                    "Image": "https://image.tmdb.org/t/p/original" + data[i].poster_path,
                    "ID": data[i].id
                }

                movieList.push(movie);
            }
            console.log(movieList);
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

$(".option").on("click", function(){
    let userGenre = $(this).val();

    for (let genre in movieGenres) {
        if (movieGenres[genre].name == userGenre) {
            sessionStorage.setItem("GenreID", movieGenres[genre].id);
        }
    }
});

$(".button").on("click", function(){
    let myValue = $(this).val();
    console.log(myValue);
});

$(".card").on("click", () => {
    let myValue = this.event.target;
    myValue = myValue.getAttribute("value");
    sessionStorage.setItem("MovieID", myValue);
});
