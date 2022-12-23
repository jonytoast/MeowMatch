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

    $("#fact-container").empty();

    meow2.play();

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

    search.play();

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
    collapse.play();
    $("#list").empty();
    $("#show-list").show();
    $("#collapse-list").hide();

}


// Event Listeners
$("#show-facts").on("click",showFact);
$("#next").on("click",nextFact)
$("#show-list").on("click",showNonProfit);
$("#collapse-list").on("click",collapseList);
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
$("#search").on("click",function() {
    meow4.play()
});
$("#back-to-top").on("click",function() {
    meow1.play();
});
$("#zipcode").on("focus", function() {
    click.play();
});




