$("#cat-facts-container").hide();
$("#about-us").hide();
$("#about-us").fadeIn(3000);
$("#collapse-list").hide();

var searchFormEl = document.querySelector('.search-form');
var submitBtnEl = document.querySelector('.submit-btn');
var genderEl = document.querySelector('.gender-field');




function backgroundImage() {



    setInterval(function() {
        var requestImageUrl = "https://api.thecatapi.com/v1/images/search?api_key=live_lZBJdQ1ecQZc9JU2ukmJv99RO1tv7mY4bc4POLm4xjKf1pXJhN01UblBZGaUEqgZ"
    
        fetch(requestImageUrl)
        .then(function(response){
            return response.json()
        })
        .then(function(data){
            
            $("#intro-container").css('background-image', 'url(' + data[0].url + ')')
        })

    },4000);
    
}

backgroundImage();



// random cat facts and cat gifs
function showFact() {

    $("#cat-facts-container").show();

    var requestFactUrl = "https://catfact.ninja/fact?max_length=140"

    var requestGifUrl= "https://cataas.com/cat/gif"

    // GET request for random cat gifs
    fetch(requestGifUrl)
    .then(function(response){
        $("#fact-container").append($("<img>").attr("src",response.url))
    })

    // GET request for random cat facts
    fetch(requestFactUrl)
    .then(function(response) {
        return response.json()
    })
    .then(function(data){
        $("#fact-container").append($("<h3>").text(data.fact))
    })

    $("#next").show();

}

function nextFact() {

    var requestNextFactUrl = "https://catfact.ninja/fact?max_length=140"

    var requestNextGifUrl= "https://cataas.com/cat/gif"

    $("#fact-container").children().filter("img").attr("src","");
    $("#fact-container").children().filter("h3").text("");

    // GET request for next random cat gifs
    fetch(requestNextGifUrl)
    .then(function(response){
        $("#fact-container").append($("<img>").attr("src",response.url))
    })

    // GET request for next random cat facts
    fetch(requestNextFactUrl)
    .then(function(response) {
        return response.json()
    })
    .then(function(data){
        $("#fact-container").append($("<h3>").text(data.fact))
    })


}

// Cat Charity Nonprofit List
function showNonProfit() {

    $("#show-list").hide();


    var requestNonProfitUrl = "https://partners.every.org/v0.2/browse/cats?take=30&apiKey=f7f12b23de0a26a6c9af08f844f5c3ba"

    // GET request for Nonprofit list
    fetch(requestNonProfitUrl)
    .then(function(response){
        return response.json()

    })
    .then(function(data){


        for (var x=0; x < data.nonprofits.length; x++) {

            var container = $("<div>");
            var NPName = $("<a>").text(data.nonprofits[x].name);
            NPName.attr("href",data.nonprofits[x].profileUrl);
            NPName.attr("target","blank");
            var NPDescription = $("<p>").html(data.nonprofits[x].description + '<a href=' + data.nonprofits[x].profileUrl + ' target="blank"> ... LEARN MORE >></a>');
            container.append(NPName);
            container.append(NPDescription);

            $("#list").append(container);

        }




    })

    $("#collapse-list").show();
}

function collapseList() {
    $("#list").empty();
    $("#show-list").show();
    $("#collapse-list").hide();

}


var formSubmitHandler = function (event) {
    event.preventDefault();
  
    // gender
    var genderSelection;

    var maleChoice = document.querySelector('.male-radio');
    var femaleChoice = document.querySelector('.female-radio');
    var eitherGenderChoice = document.querySelector('.eitherGender-radio');

    if (maleChoice.checked){
        genderSelection = "male"
    } else if (femaleChoice.checked) {
        genderSelection = "female"
    } else {
        genderSelection = "";
    }

    // age
    var ageSelection;

    var babyChoice = document.querySelector('.baby-radio');
    var youngChoice = document.querySelector('.young-radio');
    var adultChoice = document.querySelector('.adult-radio');
    var seniorChoice = document.querySelector('.senior-radio');
    var anyAgeChoice = document.querySelector('.anyAge-radio');

    if (babyChoice.checked){
        ageSelection = "baby"
    } else if (youngChoice.checked) {
        ageSelection = "young"
    } else if (adultChoice.checked) {
        ageSelection = "adult"
    } else if (seniorChoice.checked) {
        ageSelection = "senior"
    } else{
        ageSelection = "";
    }

  
    getData(genderSelection, ageSelection);

    // searchBoxEl.value = "";
    // petTypeEl.value = "";

    
  };



function showData(animals){
    console.log("hi")

    for (var i = 0; i < animals.length; i++) {  
        console.log(animals[i].type + " " + animals[i].age + " " + animals[i].gender);
    }
}

// get pet data

function getData(petGender, petAge){
    var pf = new petfinder.Client({apiKey: "8xTjKkX9rqOoNSgYVcICbmHSHx7E8NcVyYx0pXUxWTPBB8RzJG", secret: "7B3fC5cIclR0jWTEliyi7cM52VgwzLrPm382rKwe"});
  
    pf.animal.search({type: "cat", gender: petGender, age: petAge, location: "10598"})
      .then(function (response) {
          console.log(response.data.animals)
          showData(response.data.animals)
      })
      .catch(function (error) {
          alert("error occured")
          console.log(error)
      });
  }





getData("male", "adult");

submitBtnEl.addEventListener('click', formSubmitHandler);

$("#show-facts").on("click",showFact);
$("#next").on("click",nextFact)
$("#show-list").on("click",showNonProfit);
$("#collapse-list").on("click",collapseList);




