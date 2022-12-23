$("#cat-facts-container").hide();
$("#about-us").hide();
$("#about-us").fadeIn(1000);

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

$("#show-facts").on("click",showFact);
$("#next").on("click",nextFact)





