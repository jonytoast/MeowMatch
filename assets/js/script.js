// Sound effects
var click = new Audio();
click.src = "../audio/Click.wav";

var click2 = new Audio();
click2.src = "../audio/Click-2.wav";

var collapse = new Audio();
collapse.src = "../audio/Collapse.wav";

var search = new Audio();
search.src = "../audio/Search.wav";

var meow1 = new Audio();
meow1.src = "../audio/Meow-1.wav";

var meow2 = new Audio();
meow2.src = "../audio/Meow-2.wav";

var meow3 = new Audio();
meow3.src = "../audio/Meow-3.wav";

var meow4 = new Audio();
meow4.src = "../audio/Meow-4.wav";

var meow5 = new Audio();
meow5.src = "../audio/Meow-5.wav";

var meow6 = new Audio();
meow6.src = "../audio/Meow-6.wav";

var meow7 = new Audio();
meow7.src = "../audio/Meow-7.wav";

var meow8 = new Audio();
meow8.src = "../audio/Meow-8.wav";


$("#cat-facts-container").hide();
$("#about-us").hide();
$("#about-us").fadeIn(3000);
$("#collapse-list").hide();

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

    click2.play();
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

$("#show-facts").on("click",showFact);
$("#next").on("click",nextFact)
$("#show-list").on("click",showNonProfit);
$("#collapse-list").on("click",collapseList);




