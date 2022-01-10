//$(document).foundation();

// var cityInputEl = document.querySelector("#city");

  fetch("http://www.mapquestapi.com/geocoding/v1/address?key=hA7ssNDOXBS2CZMbFpA3HIjzn3G1FtIG&location=Washington,DC").then(function (response) {
    if(response.ok) {
        response.json().then(function(data) {
            console.log(data)
        })
    }
})

$(document).ready(function() {
    $(".button").click(function() {
        $("ul").append('<li></li>');

        const city = document.querySelector("#city");
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

