//search bar to pull weather forecast from API
const APIKey = "166a433c57516f51dfab1f7edaed8413";
let cityName = "";
let state = "";
const searchBtn = $("#searchBtn");
let cities = [];

function geoInfoCall() {
    let queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName},${state}&appid=${APIKey}`;

    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        let infoDiv = $("<div class='infoDiv'>");
        let pCity = $("<p>").text(`Location: ${cityName}, ${state}`);
        infoDiv.append(pCity);

        let lat = response.city.coord.lat;
        let pLat = $("<p>").text(lat);
        let lon = reponse.city.coord.lon;
        let pLon = $("<p>").text(lon);
        pCity.append(`${pLat}, ${pLon}`);
    

            // Log the resulting object
            console.log(response);

    
    });
}

geoInfoCall();

function uvIndexCall() {
    let queryURL =`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&
    exclude=currnet&appid=${APIKey}`;
    //results display in currentweather div with city name, date, icon of weather cond, temp, humidity, wind spped, UV index

    //display 5 days forecast for current city in fiveDayForecast

    
}


searchBtn.on("click", function() {

    let city = $("#cityInput").val().trim();
    cities.push(city);

    renderbtn(); 
});


//render search results - current and future conditions and add to history on the left panel
//UX index needs to be displayed as button with color to show condition - green, orange and red levels
//storage search history in local storage and pull it to display on the left panel
//history will retrieve weather forecast on click
