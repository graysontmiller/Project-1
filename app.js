//adding event listeners to trigger search functions

$("#searchRecipes").on("click", () => {
    let userCuisine = $("#recipeTitle").val();
    searchRecipes(userCuisine);
})

$("#searchGenre").on("click", () => {
    let userGenre = $("#pickGenre").val();
    searchGenre(userGenre);
})

$("#getMovie").on("click", () => {
    displayMovie(580489);
});

$("#getRecipe").on("click", () => {
    displayRecipe(715594);
});

