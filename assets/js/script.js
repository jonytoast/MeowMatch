var startButton = document.querySelector('.start-button');

var searchFormEl = document.querySelector('.search-form');
var searchBoxEl = document.querySelector('.search-box');
var petTypeEl = document.querySelector('.petType');

var resultsContainerEl = document.querySelector('#results-container')


function startUserFlow(){
    console.log("i've started")
}

function getData(type){
  var pf = new petfinder.Client({apiKey: "8xTjKkX9rqOoNSgYVcICbmHSHx7E8NcVyYx0pXUxWTPBB8RzJG", secret: "7B3fC5cIclR0jWTEliyi7cM52VgwzLrPm382rKwe"});

  pf.animal.search({type: type, gender: "male", location: "10598"})
    .then(function (response) {
        console.log(response.data.animals)
        showData(response.data.animals)
    })
    .catch(function (error) {
        alert("error occured")
    });
}

function showData(animals){
  for (var i = 0; i < animals.length; i++) {  
    console.log(animals[i].name + " " + animals[i].type + " " + animals[i].gender);

    var petBoxEl = document.createElement('div');
    petBoxEl.classList = 'results-list-item';

    var petNameEl = document.createElement('div');
    petNameEl.textContent = animals[i].name;

    var petTypeEl = document.createElement('div');
    petTypeEl.textContent = animals[i].type;

    var petGenderEl = document.createElement('div');
    petGenderEl.textContent = animals[i].gender;

    if (animals[i].primary_photo_cropped.small){
      var petImgEl = document.createElement('img');
      petImgEl.setAttribute("src", animals[i].primary_photo_cropped.small);
      petBoxEl.appendChild(petImgEl);
    }
    
    petBoxEl.appendChild(petNameEl);
    petBoxEl.appendChild(petTypeEl);
    petBoxEl.appendChild(petGenderEl);

    resultsContainerEl.appendChild(petBoxEl);
  }
}


// Form
var formSubmitHandler = function (event) {
  event.preventDefault();

  var searchContent = searchBoxEl.value.trim();
  var petType = petTypeEl.value.trim();

  console.log(searchContent + " " + petType);

  searchBoxEl.value = "";
  petTypeEl.value = "";

  getData(petType);
  

  // if (searchCity) {
  //   updateHistoryButtons(searchCity);
  //   getForecastData(searchCity);

  //   forecastContainerEl.textContent = '';
  //   cityInputEl.value = '';

  // } else {
  //   alert('Please enter a valid city name');
  // }
};

startButton.addEventListener('click', startUserFlow);
searchFormEl.addEventListener('submit', formSubmitHandler);