// Sound effects
var click = new Audio();
click.src = "assets/audio/Click.wav";
click.volume = 0.1;

var click2 = new Audio();
click2.src = "assets/audio/Click-2.wav";
click2.volume = 0.1;

var collapse = new Audio();
collapse.src = "assets/audio/Collapse.wav";
collapse.volume = 0.1;

var warning = new Audio();
warning.src = "assets/audio/warning.wav";
warning.volume = 0.1;

var search = new Audio();
search.src = "assets/audio/Search.wav";
search.volume = 0.1;

var meow1 = new Audio()
meow1.src = "assets/audio/Meow-1.wav";
meow1.volume = 0.1;

var meow2 = new Audio();
meow2.src = "assets/audio/Meow-2.wav";
meow2.volume = 0.1;

var meow3 = new Audio();
meow3.src = "assets/audio/Meow-3.wav";
meow3.volume = 0.1;

var meow4 = new Audio();
meow4.src = "assets/audio/Meow-4.wav";
meow4.volume = 0.1;

var meow5 = new Audio();
meow5.src = "assets/audio/Meow-5.wav";
meow5.volume = 0.1;

var meow6 = new Audio();
meow6.src = "assets/audio/Meow-6.wav";
meow6.volume = 0.1;

var meow7 = new Audio();
meow7.src = "assets/audio/Meow-7.wav";
meow7.volume = 0.1;

var meow8 = new Audio();
meow8.src = "assets/audio/Meow-8.wav";
meow8.volume = 0.1;


$("#cat-facts-container").hide();
$("#about-us").hide();
$("#about-us").show("slow");
$("#about-us-text").hide();
$("#about-us-text").fadeIn(3000);
$("#intro-container").hide();
$("#intro-container").fadeIn(5000);
$("#gender-alert").hide();
$("#age-alert").hide();
$("#zip-alert").hide();
$("#error").hide();
$("#collapse-list").hide();
$("#empty-list").hide();
$("#show-clicked-list").show();
$("#clear-list").hide();
$("#search-again").hide();


$("#start").on("click",function() {
    $("#intro-text").attr("style","visibility:hidden");
})

$("#dismiss").on("click",function() {
    $("#intro-text").attr("style","visibility:hidden");
    collapse.play();
})

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

    $("#cat-facts-container").fadeIn(3000);

    $("#fact-container").children().remove();

    meow2.play();

    

    var requestFactUrl = "https://catfact.ninja/fact?max_length=140"

    var requestGifUrl= "https://cataas.com/cat/gif"

    // GET request for random cat gifs
    fetch(requestGifUrl)
    .then(function(response){
        $("#fact-container").append($("<img>").attr("src",response.url).attr("class","rounded-lg"))
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

    $("#fact-container").children().remove();

    search.play();

    var requestNextFactUrl = "https://catfact.ninja/fact?max_length=140"

    var requestNextGifUrl= "https://cataas.com/cat/gif"

    // GET request for next random cat gifs
    fetch(requestNextGifUrl)
    .then(function(response){
        $("#fact-container").append($("<img>").attr("src",response.url).attr("class","rounded-lg"))
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

    click2.play();
    $("#clear-list").hide();
    $("#show-list").hide();
    $("#show-clicked-list").show();
    $("#list").empty();
    $("#empty-list").hide();


    var requestNonProfitUrl = "https://partners.every.org/v0.2/browse/cats?take=100&apiKey=f7f12b23de0a26a6c9af08f844f5c3ba"

    // GET request for Nonprofit list
    fetch(requestNonProfitUrl)
    .then(function(response){
        return response.json()

    })
    .then(function(data){

        var remainingCharityString = localStorage.getItem("charityList") || "";


        for (var x=0; x < data.nonprofits.length; x++) {

            // Excludes already-saved charities from being displayed in the charity list
            if (remainingCharityString.includes(data.nonprofits[x].name)) {

                continue;
            } 

            var container = $("<div>");
            container.attr("class","charity");
            var saveBtn = $("<p>").html("Save This Charity");
            saveBtn.attr("class","btn block mx-auto my-1.5 rounded-lg px-1.5 py-0 text-base font-semibold leading-7 text-white shadow-sm");
            
            var NPName = $("<a>").text(data.nonprofits[x].name);
            NPName.attr("href",data.nonprofits[x].profileUrl);
            NPName.attr("target","blank");
            var NPDescription = $("<p>").html(data.nonprofits[x].description + '<a href=' + data.nonprofits[x].profileUrl + ' target="blank"> ... LEARN MORE >></a>');
            container.append(NPName);
            container.append(saveBtn);
            container.append(NPDescription);

            $("#list").append(container);

            saveBtn.attr("data-name", data.nonprofits[x].name);
            saveBtn.attr("data-content",data.nonprofits[x].description);
            saveBtn.attr("data-link",data.nonprofits[x].profileUrl);

        }

    })

    $("#collapse-list").show();
    
}



function collapseList() {
    collapse.play();
    $("#list").empty();
    $("#show-list").show();
    $("#collapse-list").hide();
    $("#show-clicked-list").show();
    $("#clear-list").hide();

}

function clearList() {
    collapse.play();
    $("#list").empty();
    $("#empty-list").show();
    localStorage.clear();
    $("#clear-list").hide();
    $("#collapse-list").hide();
}


// Save charity to list function 
$("#list").on("click", function(event) {



    var savedList = localStorage.getItem("charityList") || "";

    var target = event.target
    event.stopPropagation(); 




    if (target.textContent === "Save This Charity" && !savedList.includes(target.getAttribute("data-name"))) {

        // Remove already-clicked charity from charity list
        target.parentElement.setAttribute("style","display:none");

        search.play();

        var charityObj = {
            charityName: target.getAttribute("data-name"),
            charityInfo: target.getAttribute("data-content"),
            charityUrl: target.getAttribute("data-link")
        }

        var charityString = JSON.stringify(charityObj);

        savedList += charityString + "^"

        localStorage.setItem("charityList",savedList);


    }


})

// Display saved list function
$("#show-clicked-list").on("click",function() {

    click2.play();
    $("#show-clicked-list").hide();
    $("#clear-list").show();
    $("#show-list").show();
    $("#collapse-list").show();
    $("#list").empty();

    var savedString = localStorage.getItem("charityList") || "";

    var savedArray = savedString.split("^");
    savedArray.pop();

    if (savedArray[0] === "") {
        savedArray.shift();
    }

    if (savedString === "") {
        $("#empty-list").show();
        $("#collapse-list").hide();
        $("#clear-list").hide();
    } 
    

    for (var i=0; i<savedArray.length; i++) {

        var listContainer = $("<div>").attr("class","saved-charity");
        var savedObj = JSON.parse(savedArray[i]);

        var removeBtn = $("<p>").html("Remove from List");
        removeBtn.attr("class", "btn block mx-auto my-1.5 rounded-lg px-1.5 py-0 text-base font-semibold leading-7 text-white shadow-sm");

        $("#list").append(listContainer);
        listContainer.append($("<a>").text(savedObj.charityName).attr("href", savedObj.charityUrl).attr("target","blank"));
        listContainer.append(removeBtn);
        listContainer.append($("<p>").html(savedObj.charityInfo + " ..." + '<a href=' + savedObj.charityUrl + ' target="blank"> ... LEARN MORE >></a>'));
        
        
    }

    // removing charity from saved list
    $(".saved-charity").on("click",function(event) {

        
        
        var target = event.target;
        var targetContent = target.previousElementSibling.textContent;

  

        // identifies and removes charity from saved list and saves updated list to local storage
        for (var y=0; y<savedArray.length; y++) {

            if (target.textContent === "Remove from List" && savedArray[y].includes(targetContent)) {

                collapse.play();
                savedArray.splice(y,1);

                var newSavedString = savedArray.toString();

                var newFormattedString = newSavedString.replaceAll("},{","}^{") + "^";

                localStorage.setItem("charityList",newFormattedString);

                target.parentElement.setAttribute("style","display:none");


            }
        }

        if (newFormattedString === "^") {
            localStorage.clear();
            $("#empty-list").show();
            $("#clear-list").hide();
            $("#collapse-list").hide();
        }
        
        
    })

})






// Event Listeners

// handle form submit
var formSubmitHandler = function (event) {

    event.stopPropagation();
    event.preventDefault();
    $("#error").hide();

    
  
    // gender
    var genderSelection;

    var maleChoice = document.querySelector('.male-radio');
    var femaleChoice = document.querySelector('.female-radio');
    var eitherGenderChoice = document.querySelector('.eitherGender-radio');

    if (maleChoice.checked){ 
        genderSelection = "male"
    } else if (femaleChoice.checked) {
        genderSelection = "female"
    } else if (eitherGenderChoice.checked) {
        genderSelection = "";
    } else {
        $("input").val("");
        $("input").prop('checked', false);
        $("#gender-alert").show();
        $("#age-alert").show();
        $("#zip-alert").show();
        warning.play();
        return;
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
    } else if (anyAgeChoice.checked) {
        ageSelection = "";
    } else {
        $("input").val("");
        $("input").prop('checked', false);
        $("#gender-alert").show();
        $("#age-alert").show();
        $("#zip-alert").show();
        warning.play();
        return;
        
    }

    // zip
    var zipSelection = (document.querySelector('.zip-entry')).value || null;

    if(zipSelection === null) {
        $("input").val("");
        $("input").prop('checked', false);
        $("#gender-alert").show();
        $("#age-alert").show();
        $("#zip-alert").show();
        warning.play();
        return;
        
    }
    
    // data call
    getData(genderSelection, ageSelection, zipSelection);



  };



function showData(animals){

    // Scrolls screen down to result section 
    window.scrollBy(0,750);

    $("#match-example").html("Matches");
    $("#match-example-text").hide();
    $("#search-again").show();
    
    var resultsContainerEl = document.querySelector('#match-results-container')
    while (resultsContainerEl.firstChild) {
        resultsContainerEl.removeChild(resultsContainerEl.firstChild);
    }
    
    for (var i = 0; i < animals.length; i++) {  
    

        // variables
        var petName = animals[i].name;     
        var petImageURL;

        
        if(animals[i].primary_photo_cropped){
            petImageURL = animals[i].primary_photo_cropped.small;
        } else {
            // Skip over results without image
            continue;
        }

        var petGender = animals[i].gender;
        var petBreed = animals[i].breeds.primary;
        var petAge = animals[i].age;
        var petLocation = animals[i].contact.address.city + ", " + animals[i].contact.address.state;
        var petEmail = animals[i].contact.email || "not listed";
        var petPhone = animals[i].contact.phone || "not listed";

        // Continer elements
        var petBoxEl = document.createElement('div');
        petBoxEl.classList = 'pet-box result-item form overflow-hidden bg-white shadow rounded-lg sm:rounded-lg';

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
        petImage.setAttribute("src", petImageURL);
        petImage.setAttribute("class","rounded-lg");
        
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
     
            fieldText.classList = "text-sm font-medium text-gray-500";
            fieldText.textContent = labelsArray[j];
            
            var fieldValue = document.createElement('dd');
            fieldValue.classList = "mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0";

            if(labelsArray[j] == "Email" && valuesArray[j] !== "not listed"){
                var addressLink = document.createElement('a');
                addressLink.setAttribute("href", "mailto: " + valuesArray[j]);
                addressLink.setAttribute("style","color:blue; text-decoration:underline; cursor:pointer");
                addressLink.textContent = valuesArray[j];
                fieldValue.appendChild(addressLink)
            }
            else{
                fieldValue.textContent = valuesArray[j];
            }

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

    $("#gender-alert").hide();
    $("#age-alert").hide();
    $("#zip-alert").hide();
    meow6.play();

    var pf = new petfinder.Client({apiKey: "8xTjKkX9rqOoNSgYVcICbmHSHx7E8NcVyYx0pXUxWTPBB8RzJG", secret: "7B3fC5cIclR0jWTEliyi7cM52VgwzLrPm382rKwe"});
  
    pf.animal.search({type: "cat", gender: petGender, age: petAge, location: petZip})
      .then(function (response) {
          console.log(response.data.animals)
          showData(response.data.animals)
      })
      .catch(function (error) {
        $("#error").show();
        $("input").val("");
        $("input").prop('checked', false);
        warning.play();
        console.log(error)
      });
  }



submitBtnEl.addEventListener('click', formSubmitHandler);


$("#show-facts").on("click",showFact);
$("#next").on("click",nextFact)
$("#show-list").on("click",showNonProfit);
$("#collapse-list").on("click",collapseList);
$("#clear-list").on("click",clearList);

$("#why").on("click",function() {
    meow3.play();
});
$("#matches").on("click",function() {
    meow5.play();
});
$("#donate").on("click",function() {
    meow7.play();
});
$("#start").on("click",function() {
    meow8.play();
});

$("#back-to-top").on("click",function() {
    meow1.play();
});
$("input").on("focus", function() {
    click.play();
});


// Resets form when user clicks on "Do Another Search"
$("#search-again").on("click",function() {
    collapse.play();
    $("input").val("");
    $("input").prop('checked', false);
})

