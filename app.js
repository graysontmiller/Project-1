//API Keys for Spoontacular and OMDb 
var spoonKey = "6ad98c8c55ae4c2c9233218dc232d4ca";
var movieKey = "4ae54f61";


var searchRecipeTitle = function(userRecipe){
    //call out to Spooncular to request title using user input
    let recipeString = "https://api.spoonacular.com/recipes/complexSearch?query=" + userRecipe + "&apiKey=" + spoonKey;
    
    //removes all previous search results
    $("#displayRecipes").children().remove();

    fetch(recipeString)
        .then(Response => Response.json()).then((data) => {
            //narrows down data to just bring back the results
            data = data.results;

            //should the results be an Array, this loops through all items and appends to UL
            if (Array.isArray(data)){
                for (let recipe in data){
                    let recipeTitle = document.createElement("li");
                    recipeTitle.innerText = data[recipe].title;
                    $("#displayRecipes").append(recipeTitle);
                }
            } else {
                //if only one result, still appends with no loop
                let recipeTitle = document.createElement("li");
                recipeTitle.innerText = data.title;
                $("#displayMovies").append(recipeTitle);
            }
        }).catch((err) => {
            console.log(err);
        });
};


var searchMovieTitle = function(userTitle){
    //removes previous search history
    $("#displayMovies").children().remove();
    let movieString = "http://www.omdbapi.com/?s=" + userTitle + "&apikey=" + movieKey;
        fetch(movieString)
            .then(Response => Response.json()).then((data) => {
                //narrows down data to just provide relevant search data
                data = data.Search;

                //should results return an array, loops through array and appends title to UL
                if (Array.isArray(data)){
                    for (let movie in data){
                        let title = document.createElement("li");
                        title.innerText = data[movie].Title;
                        $("#displayMovies").append(title);
                    }
                } else {
                    let title = document.createElement("li");
                    title.innerText = data.Title;
                    $("#displayMovies").append(title);
                }
            }).catch((err) => {
                console.log(err);
            });
    };
    

//adding event listeners to trigger search functions

$("#searchMovieTitle").on("click", () => {
    let title = $("#movieTitle").val();
    searchMovieTitle(title);
})

$("#searchRecipes").on("click", () => {
    let title = $("#recipeTitle").val();
    searchRecipeTitle(title);
})