var formEL = $("#ingredient-form");
var listEL = $("#ingredient-list");
var submitInput = $("#ingredientInput");
var addIngredient = $("#sbmit");
var erase = $("#clear");
var submitbutton = $("#submitbutton");
var apikey = "d118999455904a82adf6e360ee3fa28e";
var cardcontainer = document.getElementById("cardcontainer");
var beercontainer = document.getElementById("beer");
var clearSlate = document.getElementById("gone");

console.log(submitInput);

// saves ingredients entered to local storage and puts them in a list
function submissionForm(event) {
  event.preventDefault();
  // removes error msg
  $(".error").remove();
  var ingredientItem = submitInput.val().trim();
  // if no ingredient is added, display error 
  if (!ingredientItem) {
    listEL.append(`<li class = "error"> please enter an ingredient</li>`);
  } else{
    listEL.append(
    ` <li class = "ing"> ${ingredientItem} </li> <button class="remove">remove</button>`
  )};

 

  eventListenerAdd();

 
  saveIngredients();
  // keeps input area blank
  submitInput.val("");
}

function eventListenerAdd() {
  var clearButton = $(".remove");
  for (i = 0; i < clearButton.length; i++) {
    clearButton[i].addEventListener("click", ingredientErase);
  }
}

// empties the list when button is clicked
function clearIngredients(event) {
  event.preventDefault();
  listEL.empty();
  clearLocalStorage()
}

// saves ingredients to local storage
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
// clears local storage
function clearLocalStorage(storedIngredients) {
  var storedIngredients = [];
  localStorage.setItem("ingredient", JSON.stringify(storedIngredients));
}

// searches the api
function Searchbutton(event) {
  event.preventDefault();
  // if cards exist, overwrites on search
  reset();
  // searches ingredient based on local storage
  var storedIngredients = JSON.parse(localStorage.getItem("ingredient"));
  console.log(storedIngredients);
  console.log(storedIngredients.join(",+"));
  // adds (+ for comma in seperatedIngredients) adds (_ for beerIngredients)
  var seperatedIngredients = storedIngredients.toString().replaceAll(",", ",+");
  var beerIngredients = storedIngredients.toString().replaceAll(",", "_");
  var beerapi =
    "https://api.punkapi.com/v2/beers?food=" +
    beerIngredients +
    "&page=1&per_page=4";
  var randomapi = "https://api.punkapi.com/v2/beers/random";
  fetch(beerapi, {
    method: "GET",
    credntials: "same-orgin",
    redirect: "follow",
  })
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    // if beer api does not find a match for ingredients call a random beer
    .then(function (beer) {
      console.log(beer);
      if (beer.length <= 0) {
        fetch(randomapi, {
          method: "GET",
          credntials: "same-orgin",
          redirect: "follow",
        })
          .then(function (response) {
            console.log(response);
            return response.json();
          })
          .then(function (random) {
            console.log(random);
            // makes a card for beer results
            for (var i = 0; i < random.length; i++) {
              beercontainer.innerHTML += `
          <div class="col s12 m6 l3">
                        <div class="card" data-id="$">
                            <div class="card-image">
                                <img src="${random[i].image_url}">
                            </div>
                            <div class="card-content">
                            <p>'${random[i].name}'</p>
                            </div>
                        </div>
      
                    </div>
          `;
            }
          });
      }
      //  makes card for beer results
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
      // calls ingredients for recipe api
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
      
    });
}

function ingredientErase(event) {
  event.preventDefault();
  var button = event.target;
  console.log(event.target);
  console.log(button); 
  
  var found = this.previousElementSibling.textContent.trim()
  
  var storedIngredients = JSON.parse(localStorage.getItem("ingredient"));

   storedIngredients = storedIngredients.filter(function(ingredient) {
    console.log(ingredient)
    return ingredient != found });
  localStorage.setItem("ingredient", JSON.stringify(storedIngredients));
console.log(found)
  $(this).prev().remove();
  $(this).remove();
}

// links to beer website
function beerRun(event) {
  event.preventDefault();
  var card = event.target;
  if (card.matches(".card, .card img, .card p")) {
    card = card.closest(".card");
    beerLink = "https://www.brewdog.com/usa/beer";
    window.open(beerLink, "_blank");
  }
}
// calls api to send user to specific recipe when clicked
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

// resets card container
function reset() {
  while (cardcontainer.firstChild) {
    cardcontainer.removeChild(cardcontainer.firstChild);
  }
  while (beercontainer.firstChild) {
    beercontainer.removeChild(beercontainer.firstChild);
  }
}

submitbutton.on("click", Searchbutton);
addIngredient.on("click", submissionForm);
erase.on("click", clearIngredients);
cardcontainer.addEventListener("click", sendtorecipe);
beercontainer.addEventListener("click", beerRun);
clearSlate.addEventListener("click", reset);
clearSlate.addEventListener('click', clearLocalStorage)

clearLocalStorage();
