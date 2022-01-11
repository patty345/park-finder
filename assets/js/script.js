//$(document).foundation();

// var cityInputEl = document.querySelector("#city");
var apiKey = "05f629a6a4d93216a57d8401030d50a8";
var weatherCards = $("#weather-cards");
const city = $("#city");


  fetch("http://www.mapquestapi.com/geocoding/v1/address?key=hA7ssNDOXBS2CZMbFpA3HIjzn3G1FtIG&location=Washington,DC").then(function (response) {
    if(response.ok) {
        response.json().then(function(data) {
            console.log(data)
        })
    }
})

function weatherRequest(cityName) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;
    fetch(apiUrl)
    .then(function(response) {
    response.json().then(function(data) {
        weatherCardCreator(data, cityName);
    })
})
}

$(document).ready(function() {
    $(".button").click(function() {
        weatherCardCreator();
        var cityName = document.querySelector("#city").value;
        weatherRequest(cityName);
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

function weatherCardCreator(data, cityName) {
    var container = $("<div class='weather-card cell margin-1 small-12 medium-6'></div>");
    var day = $("<p>1/1/11</p>");
    console.log(data);
    var rainChance = $("<p>1.1%</p>");
    container.append(day);
    container.append(rainChance);
    weatherCards.append(container);
}



