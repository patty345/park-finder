//$(document).foundation();

// var cityInputEl = document.querySelector("#city");
var apiKey = "05f629a6a4d93216a57d8401030d50a8";
var weatherCards = $("#weather-cards");
const city = $("#city");
var cityName = document.querySelector("#city").value;
var displayParks = document.querySelector("#map");
//Testing 3

function getParks(lat, lon) {
  console.log(lat, lon);
  fetch(
    "http://www.mapquestapi.com/geocoding/v1/address?key=hA7ssNDOXBS2CZMbFpA3HIjzn3G1FtIG&location=Washington,DC"
  ).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
      });
    }
  });
  fetch(
    "https://www.mapquestapi.com/search/v4/place?location=" +
      lon +
      "%2C" +
      lat +
      "&sort=relevance&feedback=false&key=hA7ssNDOXBS2CZMbFpA3HIjzn3G1FtIG&pageSize=5&q=parks"
  ).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
        for (i = 0; i < data.results.length; i++) {
          console.log("park name: " + data.results[i].name);
          console.log(
            "iframe src: https://www.mapquest.com/' + data.results[i].slug"
          );
          var pSlug = data.results[i].slug;
          var pSlugFrame = document.createElement("iframe");

          pSlugFrame.setAttribute(
            "src",
            "https://www.mapquest.com/" + pSlug,
            "scrolling",
            "no"
          );

          displayParks.appendChild(pSlugFrame);
        }
      });
    }
  });
}

function weatherRequest(cityName) {
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    cityName +
    "&appid=" +
    apiKey;
  fetch(apiUrl).then(function (response) {
    response.json().then(function (data) {
        console.log(data);
      weatherCardCreator(data, cityName);
      getParks(data.city.coord.lat, data.city.coord.lon);
    });
  });
}

$(document).ready(function () {
  $(".button").click(function () {
    var cityName = document.querySelector("#city").value;
    weatherRequest(cityName);
    console.log(cityName);
    var history = $("#history-list");
    $(history).append("<li><p>" + cityName + "</p></li>");

    localStorage.setItem("city", city);
  });
});

// var map = document.querySelector(".map");

// window.onload = function() {
//     L.mapquest.key = '6h73dOw9yQbo0VBrclSGCwuoWCGN3vHE';

//     var map = L.mapquest.map('map', {
//       center: [37.7749, -122.4194],
//       layers: L.mapquest.tileLayer('map'),
//       zoom: 12
//     });

//     map.addControl(L.mapquest.control());
//   }

function weatherCardCreator(data, cityName) {
    weatherCards.empty();
    console.log(data);
    for (i = 0; i < data.list.length; i = i + 8) {
        var date = dateCreator(data, i);
        var container = $("<div class='weather-card cell medium-12 large-6'></div>");
        var day = $("<h5>"+ date +"</h5>");
        var temp = $("<p>Temp: " + data.list[i].main.temp + "°F</p>");
        var humidity = $("<p>Humidity: " + data.list[i].main.humidity + " %</p>");
        var wind = $("<p>Wind: " + data.list[i].wind.speed + " MPH</p>")
        container.append(day);
        container.append(temp);
        container.append(humidity);
        container.append(wind);
        weatherCards.append(container);
    }
}

function dateCreator(data, i) {
    var unixTime = data.list[i].dt;
    var date = new Date(unixTime*1000);
    var finalDate = date.toLocaleDateString("en-US");
    return finalDate;
}
