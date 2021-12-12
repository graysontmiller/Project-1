//API Key for Spoonuclar
var spoonKey = "05efc9acc12b43bfb802a1d2755035db";

var searchRecipes = function (userCuisine) {
    //call out to Spooncular to request cuisine using user input
    let recipeString = "https://api.spoonacular.com/recipes/complexSearch?cuisine=" + userCuisine + "&apiKey=" + spoonKey;

    fetch(recipeString)
        .then(Response => Response.json()).then((data) => {
            //narrows down data to just bring back the results
            data = data.results;

            //should the results be an Array, this loops through all items and appends to UL
            if (Array.isArray(data)) {
                for (let recipe in data) {
                    let myRecipe = {
                        "Title": data[recipe].title,
                        "Image": data[recipe].image
                    };
                    
                    console.log(myRecipe);
                }
            } else {
                //if only one result, still appends with no loop
                console.log(data);
            }
        }).catch((err) => {
            console.log(err);
        });
};

var displayRecipe = function(recipeID){


    let recipeString = "https://api.spoonacular.com/recipes/" + recipeID + "/information?apiKey=" + spoonKey;

    fetch(recipeString)
    .then(Response => Response.json()).then((data) => {
        return data;
    }).catch((err) => {
        console.log(err);
    });
};

// On clicking submit button w/ the class of .option, sets local storage to the cuisine ID of the cuisine on button. 
$(".option").on("click", function(){
    let myValue = $(this).val();
    sessionStorage.setItem("Cuisine", myValue);
});


