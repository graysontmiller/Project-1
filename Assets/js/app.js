//loads CSS Foundation Framework
$(document).foundation();


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
        let title = document.getElementById("title");
        let image = document.getElementById("image");
        let ingredients = document.getElementById("ingredients");
        let instructions = document.getElementById("instructions");

        title.innerText = data.title;
        image.setAttribute("src", data.image);
        instructions.innerText = data.instructions;

        for(let food in data.extendedIngredients){
            let li = document.createElement("li");
            li.innerHTML = data.extendedIngredients[food].name;
            $(ingredients).append(li);
        }

    }).catch((err) => {
        //error handling
        console.log(err);
    });
};