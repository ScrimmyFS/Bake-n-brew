var formEL = $("#ingredient-form");
var listEL = $("#ingredient-list");
var submitInput = $("#ingredientInput");
var addIngredient = $("#sbmit");
var erase = $("#clear");
var submitbutton = $("#submitbutton");
var apikey = "d118999455904a82adf6e360ee3fa28e";
var cardcontainer = $('#cardcontainer');
console.log(submitInput);

function submissionForm(event) {
  event.preventDefault();
  var ingredientItem = submitInput.val();
  listEL.append("<li>" + ingredientItem + "<li>");
  saveIngredients()


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

function clearLocalStorage(storedIngredients) {
  storedIngredients = [];
  localStorage.setItem("ingredient", JSON.stringify(storedIngredients));
}

function Searchbutton(event) {
  event.preventDefault()

 var storedIngredients = JSON.parse(localStorage.getItem("ingredient"));
 console.log(storedIngredients)

  var api = "https://api.spoonacular.com/recipes/findByIngredients?ingredients=" + storedIngredients +  "&number=4&limit=3&apiKey=" + apikey;



fetch(api, {
      method: "GET",
      credntials: 'same-orgin',
      redirect: 'follow',
    })
    
    .then(function (response) {
      return response.json();
    })
    .then(function (data){
      console.log(data);
    

    for (var i = 0; i = data.length; i++){
      cardcontainer.innerhtml +=`
      <div class="col s12 m6 l3">
                    <div class="card">
                        <div class="card-image">
                            <img src="${data[i].image}">
                            <span class="card-title"></span>
                        </div>
                        <div class="card-content">
                        </div>
                    </div>

                </div>
      `

      // var picture = document.createElement('<img>')

      // picture.





    }
  })

}
submitbutton.on("click", Searchbutton)
addIngredient.on("click", submissionForm);
erase.on("click", clearIngredients);
