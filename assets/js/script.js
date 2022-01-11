//$(document).foundation();

// var cityInputEl = document.querySelector("#city");
var weatherCards = $("#weather-cards");
const city = $("#city");



  fetch("http://www.mapquestapi.com/geocoding/v1/address?key=hA7ssNDOXBS2CZMbFpA3HIjzn3G1FtIG&location=Washington,DC").then(function (response) {
    if(response.ok) {
        response.json().then(function(data) {
            console.log(data)
        })
    }
})

$(document).ready(function() {
    $(".button").click(function() {
        weatherCardCreator();
        var cityName = document.querySelector("#city").value;
        console.log(cityName);
        var history = $("#history-list")
        $(history).append('<li><p>' + cityName + '</p></li>');

        localStorage.setItem("city", city);
    })
})

var map = document.querySelector(".map");

L.mapquest.key = '6h73dOw9yQbo0VBrclSGCwuoWCGN3vHE'

L.mapquest.map('map', {
    canter: [36.1069, 112.1129],
    layers: L.mapquest.tileLayer('map'),
    zoom: 12
});

function weatherCardCreator() {
    var container = $("<div class='weather-card cell margin-1 small-12 medium-6'></div>");
    var day = $("<p>1/1/11</p>");
    var rainChance = $("<p>1.1%</p>");
    container.append(day);
    container.append(rainChance);
    weatherCards.append(container);
}

