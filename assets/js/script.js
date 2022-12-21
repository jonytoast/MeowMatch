var startButton = document.querySelector('.start-button');

var searchFormEl = document.querySelector('.search-form');
var searchBoxEl = document.querySelector('.search-box');
var selectionEl = document.querySelector('.select1');


function startUserFlow(){
    console.log("i've started")
}

function getData(){
  var pf = new petfinder.Client({apiKey: "8xTjKkX9rqOoNSgYVcICbmHSHx7E8NcVyYx0pXUxWTPBB8RzJG", secret: "7B3fC5cIclR0jWTEliyi7cM52VgwzLrPm382rKwe"});

  pf.animal.search()
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
      console.log(animals[i].name)
  }
}


// Form
var formSubmitHandler = function (event) {
  event.preventDefault();

  var searchContent = searchBoxEl.value.trim();
  var selectContent = selectionEl.value.trim();

  console.log(searchContent + " " + selectContent);

  searchBoxEl.value = "";
  selectionEl.value = "";

  // if (searchCity) {
  //   updateHistoryButtons(searchCity);
  //   getForecastData(searchCity);

  //   forecastContainerEl.textContent = '';
  //   cityInputEl.value = '';

  // } else {
  //   alert('Please enter a valid city name');
  // }
};


getData();
startButton.addEventListener('click', startUserFlow);
searchFormEl.addEventListener('submit', formSubmitHandler);