$("#cat-facts-container").hide();
$("#about-us").hide();
$("#about-us").fadeIn(3000);
$("#collapse-list").hide();

var submitBtnEl = document.querySelector('.submit-btn');


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

// handle form submit
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

    // zip
    var zipSelection = (document.querySelector('.zip-entry')).value || null;
    
    // data call
    getData(genderSelection, ageSelection, zipSelection);

    // searchBoxEl.value = "";
    // petTypeEl.value = "";

  };



function showData(animals){
    
    var resultsContainerEl = document.querySelector('#match-results-container')
    while (resultsContainerEl.firstChild) {
        resultsContainerEl.removeChild(resultsContainerEl.firstChild);
    }
    
    for (var i = 0; i < animals.length && i < 7; i++) {  
        // console.log(animals[i].contact.address.postcode + " " + animals[i].age + " " + animals[i].gender);
        // console.log("loop: " + i)

        // variables
        var petName = animals[i].name;     
        var petImageURL;
        if(animals[i].primary_photo_cropped){
            petImageURL = animals[i].primary_photo_cropped.small;
        } else{
            petImageURL = "./assets/images/pet-example-img.jpg";
        }

        var petGender = animals[i].gender;
        var petBreed = animals[i].breeds.primary;
        var petAge = animals[i].age;
        var petLocation = animals[i].contact.address.city + ", " + animals[i].contact.address.state;
        var petEmail = animals[i].contact.email || "not listed"
        var petPhone = animals[i].contact.phone || "not listed"

        // Continer elements
        var petBoxEl = document.createElement('div');
        petBoxEl.classList = 'pet-box result-item form overflow-hidden bg-white shadow sm:rounded-lg';

        // Description section
        var boxIntro = document.createElement('div');
        boxIntro.classList = 'box-intro px-4 py-5 sm:px-6';

        var catInformation = document.createElement('h3');
        catInformation.classList = "cat-info text-lg font-medium leading-6 text-gray-900"
        catInformation.textContent = "Cat information"

        var catDetails = document.createElement('p');
        catDetails.classList = "cat-details mt-1 max-w-2xl text-sm text-gray-500"
        catDetails.textContent = "Details of the cat up for adoption"

        boxIntro.appendChild(catInformation);
        boxIntro.appendChild(catDetails);

        petBoxEl.appendChild(boxIntro);


        // // Main elements
        var mainSection = document.createElement('div');
        mainSection.classList = "main-result-info border-t border-gray-200"

        var mainSectionContainer = document.createElement('dl');
        mainSectionContainer.classList = "main-section-container"

            // name
        var petNameField = document.createElement('div');
        petNameField.classList = "pet-name-field bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"

        var petNameLabel = document.createElement('dt');
        petNameLabel.classList = "pet-name-label text-sm font-medium text-gray-500"
        petNameLabel.textContent = "Pet name"

        var petNameValue = document.createElement('dd');
        petNameValue.classList = "pet-name-value mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0"
        petNameValue.textContent = petName;

        petNameField.appendChild(petNameLabel);
        petNameField.appendChild(petNameValue);
        mainSectionContainer.appendChild(petNameField);
            
            // image
        var petImageDiv = document.createElement('div');
        petImageDiv.classList = "pet-image px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
        petImageDiv.setAttribute("id", "example-image")
        
        var petImage = document.createElement('img');
        petImage.setAttribute("src", petImageURL)
        
        petImageDiv.appendChild(petImage)
        mainSectionContainer.appendChild(petImageDiv);

            // additional fields

        var valuesArray = [petGender, petBreed, petAge, petLocation, petEmail, petPhone];
        var labelsArray = ["Gender", "Breed", "Age", "Location", "Email", "Phone"];    

        for (var j = 0; j < valuesArray.length; j++) {  
        
            var fieldContainer = document.createElement('div');
            fieldContainer.classList = "px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6";
            if (j % 2 == 0){
                fieldContainer.classList.add("bg-white");
            }

            var fieldText = document.createElement('dt');
            // fieldText.classList = labelsArray[j].toLowerCase() + "-text-field text-sm font-medium text-gray-500";
            fieldText.classList = "text-sm font-medium text-gray-500";
            fieldText.textContent = labelsArray[j];
            
            var fieldValue = document.createElement('dd');
            fieldValue.classList = "mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0";
            fieldValue.textContent = valuesArray[j];

            fieldContainer.appendChild(fieldText);
            fieldContainer.appendChild(fieldValue);
            mainSectionContainer.appendChild(fieldContainer);
        }

        // container EL
        mainSection.appendChild(mainSectionContainer);
        petBoxEl.appendChild(mainSection);
        resultsContainerEl.appendChild(petBoxEl);

    }
}

// get pet data

function getData(petGender, petAge, petZip){
    var pf = new petfinder.Client({apiKey: "8xTjKkX9rqOoNSgYVcICbmHSHx7E8NcVyYx0pXUxWTPBB8RzJG", secret: "7B3fC5cIclR0jWTEliyi7cM52VgwzLrPm382rKwe"});
  
    pf.animal.search({type: "cat", gender: petGender, age: petAge, location: petZip})
      .then(function (response) {
          console.log(response.data.animals)
          showData(response.data.animals)
      })
      .catch(function (error) {
          alert("error occured")
          console.log(error)
      });
  }



submitBtnEl.addEventListener('click', formSubmitHandler);

$("#show-facts").on("click",showFact);
$("#next").on("click",nextFact)
$("#show-list").on("click",showNonProfit);
$("#collapse-list").on("click",collapseList);




