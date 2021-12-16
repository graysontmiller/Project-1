//Assigns the API key and Session Storage to variables for later use.
var movieKey = "d4a209b34d618c9571d82786a8f1c751";
var myStorage = window.sessionStorage;

//Declares a named variable to later store an array of movie genres into. 
//This solves any issues related to scope and/or hoisting
var movieGenres;

let generateGenreString = "https://api.themoviedb.org/3/genre/movie/list?api_key=" + movieKey + "&language=en-US";

//calls out to the API using the fetch method.
//it THEN returns a promise, which once resolved will THEN returns data to be processed
//we will later use the genres to compare the user input to and retrieve the correct genre ID
fetch(generateGenreString)
    .then(Response => Response.json()).then((data) => {
        //stores genres in varible created at top of the page
        movieGenres = data.genres;
    }).catch((err) => {
        //catch method 
        console.log(err);
    });


var searchGenre = function (userGenre) {
    //created unique string for our API call using our API key and the parameter passed to 
    //our searchGenre function. The value passed in is from our event listener declared in the HTML
    //script tag.
    let movieString = "https://api.themoviedb.org/3/discover/movie?api_key=" + movieKey + "&with_genres=" + userGenre;

    //calls out to the API using the fetch method.
    //it THEN returns a promise, which once resolved will THEN returns data to be processed
    fetch(movieString)
        .then(Response => Response.json()).then((data) => {
            data = data.results;

            //The data returned is an array of objects. For each item in the array UNTIL
            //it hits the length of 5, we run through each object and process data
            for (i = 0; i <= 5; i++) {
                let movieImg = document.getElementById("image" + i);
                let movieTitle = document.getElementById("title" + i);

                //We assign the movie with a unique value and src, allowing the user to see each
                //poster and title for the movies displayed. We also assign a unique value to each
                //image element, as this is later used when the user selects their movie. We will pass 
                //this unique value to our function, displayMovie.
                movieImg.setAttribute("value", data[i].id)
                movieImg.setAttribute("src", "https://image.tmdb.org/t/p/original" + data[i].poster_path);
                movieTitle.innerHTML = data[i].title;
            }
        }).catch((err) => {
            console.log(err);
        });
};

var displayMovie = function (movieID) {
    //creates unique title string using the movie ID and API key passed through the called function.
    let titleString = "https://api.themoviedb.org/3/movie/" + movieID + "?api_key=" + movieKey;

    //calls out to the API using the fetch method.
    //it THEN returns a promise, which once resolved will THEN returns data to be processed
    fetch(titleString)
        .then(Response => Response.json()).then((data) => {
            //creates and assigns a new element to image variable
            let image = document.getElementById("image");

            //locates element with ID of "title" and sets the text to the value of data.title
            $("#title").text(data.title);

            //sets the source for our element to the image poster provided in our data object
            image.setAttribute("src", "https://image.tmdb.org/t/p/original" + data.poster_path)
        }).catch((err) => {
            //error handling
            console.log(err);
        });
}
 
//creates an event listener for when any element of class "option" is clicked.
$(".options-card").on("click", function () {
    //stores user data using "this" selector
    let userGenre = $(this).val();

    //loops through each object in movie genres to compare user data
    //Once located, we use the movie ID associated with genre title 
    //and store into sessionStorage
    for (let genre in movieGenres) {
        if (movieGenres[genre].name == userGenre) {
            //sets item in session storage
            sessionStorage.setItem("GenreID", movieGenres[genre].id);
        }
    }
});


//creates listener event for element with class of "card"
$(".card").on("click", () => {
    //declares varible to hold the value of attribute "Value"
    let myValue = this.event.target;
    myValue = myValue.getAttribute("value");

    //the value is the unique movie ID we assigned to the element.
    //We then store in session storage for later use when calling DisplayMovie function
    sessionStorage.setItem("MovieID", myValue);
});
