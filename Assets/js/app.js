//loads CSS Foundation Framework
$(document).foundation();

var spoonKey = "6e157552cb0f4af9b51602e19cc654a3";
var movieKey = "d4a209b34d618c9571d82786a8f1c751";

var finalResults = function (movieID, recipeID) {
    let movieString = "https://api.themoviedb.org/3/movie/" + movieID + "?api_key=" + movieKey;
    let recipeString = "https://api.spoonacular.com/recipes/" + recipeID + "/information?apiKey=" + spoonKey;

    fetch(movieString)
        .then(Response => Response.json()).then((data) => {
            let image = document.getElementById("movie-poster");
            $("#movie-title").text(data.title); 
            $("#movie-tagline").text(data.tagline);
            $("#movie-rating").text("Rating: " + data.vote_average);
            $("#movie-description").text(data.overview);
            $("#genre").text("Genre: " + data.genres[0].name)

            console.log(data);
            image.setAttribute("src", "https://image.tmdb.org/t/p/original" + data.poster_path)
        }).catch((err) => {
            //error handling
            console.log(err);
        });

    fetch(recipeString)
    .then(Response => Response.json()).then((data) => {
        let dinnerTitle = document.getElementById("dinnerTitle");
        let dinnerPicture = document.getElementById("dinnerPicture");
        let ingredientList = document.getElementById("ingredient-list");
        let instructions = document.getElementById("instructions");
        let servings = document.getElementById("servings");
        
        dinnerTitle.innerText = data.title;
        dinnerPicture.setAttribute("src", data.image);
        instructions.innerHTML = data.instructions;
        servings.innerText = "Servings: " + data.servings;

        for(let food in data.extendedIngredients){
            let li = document.createElement("li");
            li.innerText = data.extendedIngredients[food].name;
            $(ingredientList).append(li);
        }

    }).catch((err) => {
        //error handling
        console.log(err);
    });
};