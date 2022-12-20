var formEL = $("#ingredient-form");
var listEL = $("#ingredient-list");
var submitInput = $("#ingredientInput");
var addIngredient = $("#sbmit");
var erase = $("#clear");
var submitbutton = $("#submitbutton");
var apikey = "d118999455904a82adf6e360ee3fa28e";
var cardcontainer = document.getElementById("cardcontainer");
console.log(submitInput);

function submissionForm(event) {
  event.preventDefault();
  $(".error").remove();
  var ingredientItem = submitInput.val();

  listEL.append("<li>" + ingredientItem + "</li>");
  if (!ingredientItem) {
    listEL.append(`<li class = "error"> please enter an ingredient</li>`);
  }
  saveIngredients();
  submitInput.val("");
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

  if (storedIngredients.includes(ingredients) || !ingredients.trim()) {
    return;
  }
  storedIngredients.push(ingredients);
  localStorage.setItem("ingredient", JSON.stringify(storedIngredients));
}

function clearLocalStorage(storedIngredients) {
  listEL.empty();
  storedIngredients = [];
  localStorage.setItem("ingredient", JSON.stringify(storedIngredients));
}
// working
function Searchbutton(event) {
  event.preventDefault();

  reset();
  var storedIngredients = JSON.parse(localStorage.getItem("ingredient"));
  console.log(storedIngredients);
  console.log(storedIngredients.join(",+"));

  var seperatedIngredients = storedIngredients.toString().replaceAll(",", ",+");
  var api =
    "https://api.spoonacular.com/recipes/findByIngredients?ingredients=" +
    seperatedIngredients +
    "&number=4&limit=3&apiKey=" +
    apikey;
  console.log(api);
  // working
  fetch(api, {
    method: "GET",
    credntials: "same-orgin",
    redirect: "follow",
  })
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      for (var i = 0; i < data.length; i++) {
        cardcontainer.innerHTML += `
    <div class="col s12 m6 l3">
                  <div class="card">
                      <div class="card-image">
                          <img src="${data[i].image}">
                      </div>
                      <div class="card-content">
                      <p>'${data[i].title}'</p>
                      </div>
                  </div>

              </div>
    `;
      }
    });
  clearLocalStorage();
}
function reset() {
  while (cardcontainer.firstChild) {
    cardcontainer.removeChild(cardcontainer.firstChild);
  }
}

submitbutton.on("click", Searchbutton);
addIngredient.on("click", submissionForm);
erase.on("click", clearIngredients);
