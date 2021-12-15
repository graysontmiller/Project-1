//API Key for Spoonuclar API to be used for later. This will condense our fetch strings
var spoonKey = "6e157552cb0f4af9b51602e19cc654a3";

var searchRecipes = function (userCuisine) {
    //call out to Spooncular to request cuisine using user input
    let recipeString = "https://api.spoonacular.com/recipes/complexSearch?cuisine=" + userCuisine + "&apiKey=" + spoonKey;

    //calls out to the API using the fetch method.
    //it THEN returns a promise, which once resolved will THEN returns data to be processed
    fetch(recipeString)
        .then(Response => Response.json()).then((data) => {
            //narrows down data to just bring back the results
            data = data.results;
            
            //we receive several items in array, we only want to show the user 6 items.
            data.length = 6;

            //For loop set to cycle 6 times, each time selecting a unique image element
            //using the variable i declared in our loop.
            for (let i = 0; i <= 5; i++) {
                let image = document.getElementById("image" + i);

                image.setAttribute("src", data[i].image);
                image.setAttribute("value", data[i].id);
                $("#foodTitle" + i).text(data[i].title);

                //the above sets each element with unique attributes for both the source and value
                //we assign the recipe id to each of these elements for later use when the user selects a card
            }
        }).catch((err) => {
            //error handling
            console.log(err);
        });
};


var displayRecipe = function(recipeID){
    //creates a unique string using recipeID parameter passed to our 
    //DisplayRecipe function and API key for later use in our fetch method call.
    let recipeString = "https://api.spoonacular.com/recipes/" + recipeID + "/information?apiKey=" + spoonKey;

    //calls out to the API using the fetch method.
    //it THEN returns a promise, which once resolved will THEN returns data to be processed
    fetch(recipeString)
    .then(Response => Response.json()).then((data) => {
        //assigns multipe elements on page to variables for later use
        let title = document.getElementById("title");
        let image = document.getElementById("image");
        let ingredients = document.getElementById("ingredients");
        let instructions = document.getElementById("instructions");

        //sets title to our title returned in our data object
        title.innerText = data.title;

        //sets source for our image to display 
        image.setAttribute("src", data.image);

        //sets inner text for our instruction data
        instructions.innerText = data.instructions;

        //For each object in data.extendedIngredients array, we loop through and 
        //create an "li" element to append to our ingredients element (declared earlier
        // in our .then() method. Yay scope!)
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


// On clicking submit button w/ the class of .option, sets session
// storage to the cuisineID based on the value of the element clicked. 
$(".option").on("click", function(){
    let myValue = $(this).val();
    sessionStorage.setItem("Cuisine", myValue);
});

//creates listener event for element with class of "card"
$(".card").on("click", () => {
    //declares varible to hold the value of attribute "Value"
    let myValue = this.event.target;
    myValue = myValue.getAttribute("value");

    //the value is the unique recipe ID we assigned to the element.
    //We then store in session storage for later use when calling DisplayRecipe function
    sessionStorage.setItem("recipeID", myValue);
});
