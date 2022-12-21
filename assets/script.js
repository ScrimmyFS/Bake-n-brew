var formEL = $("#ingredient-form");
var listEL = $("#ingredient-list");
var submitInput = $("#ingredientInput");
var addIngredient = $("#sbmit");
var erase = $("#clear");
var submitbutton = $("#submitbutton");
var apikey = "d118999455904a82adf6e360ee3fa28e";
var cardcontainer = document.getElementById("cardcontainer");
var beercontainer = document.getElementById("beer");
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
  var beerIngredients = storedIngredients.toString().replaceAll(",", "_");
  var beerapi =
    "https://api.punkapi.com/v2/beers?food=" +
    beerIngredients +
    "&page=1&per_page=4";
  fetch(beerapi, {
    method: "GET",
    credntials: "same-orgin",
    redirect: "follow",
  })
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (beer) {
      console.log(beer);

      for (var i = 0; i < beer.length; i++) {
        beercontainer.innerHTML += `
    <div class="col s12 m6 l3">
                  <div class="card" data-id="$">
                      <div class="card-image">
                          <img src="${beer[i].image_url}">
                      </div>
                      <div class="card-content">
                      <p>'${beer[i].name}'</p>
                      </div>
                  </div>

              </div>
    `;
      }

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
                  <div class="card" data-id="${data[i].id}">
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
    });
}

function sendtorecipe(event) {
  event.preventDefault();

  var card = event.target;
  console.log(event.target);
  if (card.matches(".card, .card img, .card p")) {
    card = card.closest(".card");

    var id = card.dataset.id;

    urlapi =
      "https://api.spoonacular.com/recipes/" +
      id +
      "/information?includeNutrition=false&apiKey=" +
      apikey;

    fetch(urlapi, {
      method: "GET",
      credntials: "same-orgin",
      redirect: "follow",
    })
      .then(function (response) {
        console.log(response);
        return response.json();
      })
      .then(function (link) {
        console.log(link);

        var recipelink = link.sourceUrl;

        window.open(recipelink, "_blank");
      });
  }
}

function reset() {
  while (cardcontainer.firstChild) {
    cardcontainer.removeChild(cardcontainer.firstChild);
  }
}

submitbutton.on("click", Searchbutton);
addIngredient.on("click", submissionForm);
erase.on("click", clearIngredients);
cardcontainer.addEventListener("click", sendtorecipe);
