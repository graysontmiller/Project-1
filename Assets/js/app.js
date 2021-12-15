//loads CSS Foundation Framework
$(document).foundation();

var spoonKey = "6e157552cb0f4af9b51602e19cc654a3";
var movieKey = "d4a209b34d618c9571d82786a8f1c751";

var finalResults = function (movieID, recipeID) {
    let movieString = "https://api.themoviedb.org/3/movie/" + movieID + "?api_key=" + movieKey;
    let recipeString = "https://api.spoonacular.com/recipes/" + recipeID + "/information?apiKey=" + spoonKey;

    fetch(movieString)
        .then(Response => Response.json()).then((data) => {
            let image = document.getElementById("image");
            $("#title").text(data.title);
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

        console.log(data);
        dinnerTitle.innerText = data.title;
        dinnerPicture.setAttribute("src", data.image);
        instructions.innerHTML = data.instructions;

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