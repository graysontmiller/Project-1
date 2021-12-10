//API Keys for Spoontacular and OMDb 
var spoonKey = "6ad98c8c55ae4c2c9233218dc232d4ca";
var movieKey = "d4a209b34d618c9571d82786a8f1c751";

var movieGenres;

let generateGenreString = "https://api.themoviedb.org/3/genre/movie/list?api_key=" + movieKey + "&language=en-US";
fetch(generateGenreString)
    .then(Response => Response.json()).then((data) => {
        movieGenres = data.genres;
    }).catch((err) => {
        console.log(err);
    });


var searchGenre = function (userGenre) {
    let movieString = "https://api.themoviedb.org/3/discover/movie?api_key=" + movieKey + "&with_genres=" + userGenre;

    for (let genre in movieGenres) {
        if (movieGenres[genre].name == userGenre) {
            userGenre = movieGenres[genre].id;
        }
    }

    $("#displayMovies").children().remove();
    
    fetch(movieString)
        .then(Response => Response.json()).then((data) => {
            data = data.results;
            let movieList = [];
            for (i = 0; i <= 5; i++) {
                let movieTitle = document.createElement("li");
                movieTitle.innerText = data[i].title;
                $("#displayMovies").append(movieTitle);
                movieList.push(data[i].title);
            }
            return movieList;
        }).catch((err) => {
            console.log(err);
        });
};

var searchRecipes = function (userGenre) {
    //call out to Spooncular to request title using user input
    let recipeString = "https://api.spoonacular.com/recipes/complexSearch?cuisine=" + userGenre + "&apiKey=" + spoonKey;

    //removes all previous search results
    $("#displayRecipes").children().remove();

    fetch(recipeString)
        .then(Response => Response.json()).then((data) => {
            //narrows down data to just bring back the results
            data = data.results;

            //should the results be an Array, this loops through all items and appends to UL
            if (Array.isArray(data)) {
                for (let recipe in data) {
                    let recipeTitle = document.createElement("li");
                    recipeTitle.innerText = data[recipe].title;
                    $("#displayRecipes").append(recipeTitle);
                }
            } else {
                //if only one result, still appends with no loop
                let recipeTitle = document.createElement("li");
                recipeTitle.innerText = data.title;
                $("#displayRecipes").append(recipeTitle);
            }
        }).catch((err) => {
            console.log(err);
        });
};

//adding event listeners to trigger search functions

$("#searchGenre").on("click", () => {
    let title = $("#pickGenre").val();
    searchGenre(title);
})

$("#searchRecipes").on("click", () => {
    let title = $("#recipeTitle").val();
    searchRecipes(title);
})