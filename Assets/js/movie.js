//API Key for the movie DB
var movieKey = "d4a209b34d618c9571d82786a8f1c751";
var movieGenres;
var myStorage = window.sessionStorage;


//generators an array of movie genres to later sort through 
let generateGenreString = "https://api.themoviedb.org/3/genre/movie/list?api_key=" + movieKey + "&language=en-US";
fetch(generateGenreString)
    .then(Response => Response.json()).then((data) => {
        movieGenres = data.genres;
        console.log(movieGenres);
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

            for (i = 0; i <= 5; i++) {
                console.log(data[i]);
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

$(".option").on("click", function(){
    let userGenre = $(this).val();

    console.log(userGenre);

    for (let genre in movieGenres) {
        if (movieGenres[genre].name == userGenre) {
            sessionStorage.setItem("Genre ID", movieGenres[genre].id);
        }
    }
});