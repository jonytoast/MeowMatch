var startButton = document.querySelector('.start-button');

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

getData();
startButton.addEventListener('click', startUserFlow);