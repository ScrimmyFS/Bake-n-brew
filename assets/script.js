var formEL = $("#ingredient-form");
var listEL = $("#ingredient-list");
var submitInput = $("#ingredientInput");
var addIngredient = $("#sbmit");
var erase = $("#clear");
console.log(submitInput);
function submissionForm(event) {
  event.preventDefault();
  var ingredientItem = submitInput.val();
  console.log(ingredientItem);
  listEL.append("<li>" + ingredientItem + "<li>");


  
}

function clearIngredients(event) {
  event.preventDefault();
  listEL.empty();
}

addIngredient.on("click", submissionForm);
erase.on("click", clearIngredients);
