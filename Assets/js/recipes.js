//API Key for Spoonuclar
var spoonKey = "6e157552cb0f4af9b51602e19cc654a3";

var searchRecipes = function (userCuisine) {
    //call out to Spooncular to request cuisine using user input
    let recipeString = "https://api.spoonacular.com/recipes/complexSearch?cuisine=" + userCuisine + "&apiKey=" + spoonKey;

    fetch(recipeString)
        .then(Response => Response.json()).then((data) => {
            //narrows down data to just bring back the results
            data = data.results;
            data.length = 6;

            for (let i = 0; i <= 5; i++) {
                let image = document.getElementById("image" + i);
                image.setAttribute("src", data[i].image);
                image.setAttribute("value", data[i].id);
            }
        }).catch((err) => {
            console.log(err);
        });
};


var displayRecipe = function(recipeID){
    let recipeString = "https://api.spoonacular.com/recipes/" + recipeID + "/information?apiKey=" + spoonKey;

    fetch(recipeString)
    .then(Response => Response.json()).then((data) => {
        console.log(data);
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
        console.log(err);
    });
};


// On clicking submit button w/ the class of .option, sets local storage to the cuisine ID of the cuisine on button. 
$(".option").on("click", function(){
    let myValue = $(this).val();
    sessionStorage.setItem("Cuisine", myValue);
});

$(".card").on("click", () => {
    let myValue = this.event.target;
    myValue = myValue.getAttribute("value");
    sessionStorage.setItem("recipeID", myValue);
});
