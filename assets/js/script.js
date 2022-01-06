
var apiKey = "05f629a6a4d93216a57d8401030d50a8";
var searchHistory = [];
var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + "Las Vegas" + "&appid=" + apiKey;
var cityInput = document.getElementById("city-input");

fetch(apiUrl).then(function(response) {
    
    if (response.ok) {
        console.log(response);
        response.json().then (function(data){
            console.log(data);
        })
       
    }
})

