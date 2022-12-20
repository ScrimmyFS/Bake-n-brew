var formEL = $("#ingredient-form");
var listEL = $("#ingredient-list");
var submitInput = $("#ingredientInput");
var addIngredient = $("#sbmit");
var erase = $("#clear");
console.log(submitInput);

function submissionForm(event) {
  event.preventDefault();
  var ingredientItem = submitInput.val();
  listEL.append("<li>" + ingredientItem + "<li>");
}

function clearIngredients(event) {
  event.preventDefault();
  listEL.empty();
}

function saveIngredients() {
  var ingredients = submitInput.val();
  console.log(ingredients);
  var storedIngredients = JSON.parse(localStorage.getItem("ingredient"));
  if (storedIngredients === null) {
    storedIngredients = [];
  }

  if (storedIngredients.includes(ingredients)) {
    return;
  }
  storedIngredients.push(ingredients);
  localStorage.setItem("ingredient", JSON.stringify(storedIngredients));
}

function clearLocalStorage() {
  storedIngredients = [];
  localStorage.setItem("ingredient", JSON.stringify(storedIngredients));
}

addIngredient.on("click", submissionForm);
erase.on("click", clearIngredients);
