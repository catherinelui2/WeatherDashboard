//search bar to pull weather forecast from API
const APIKey = "166a433c57516f51dfab1f7edaed8413";
let cityName = "Denver";
const searchBtn = $("#searchBtn");
let cities = [];

function geoInfoCall() {
    let queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIKey}`;

    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        // let infoDiv = $("<div class='infoDiv'>");
        // let pCity = $("<p>").text(`Location: ${cityName}, ${state}`);
        // infoDiv.append(pCity);

        // let lat = response.city.coord.lat;
        // let pLat = $("<p>").text(lat);
        // let lon = reponse.city.coord.lon;
        // let pLon = $("<p>").text(lon);
        // pCity.append(`${pLat}, ${pLon}`);
        console.log(response);


//forecast.time
// forecast.time.from Beginning of the period of data forecasted
// forecast.time.to End of the period of data forecasted
    });
}

geoInfoCall();

function uvIndexCall() {
    let lat = "39.7392";
    let lon = "-104.9847";
    let queryURL =`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&
    exclude=currnet&appid=${APIKey}`;


    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function(response) {
        console.log(response);

        


    });
    
}

uvIndexCall();
    //results display in currentweather div with city name, date, icon of weather cond, temp, humidity, wind spped, UV index

    //display 5 days forecast for current city in fiveDayForecast

    



searchBtn.on("click", function() {

    let city = $("#cityInput").val().trim();
    cities.push(city);

    renderbtn(); 
});


//render search results - current and future conditions and add to history on the left panel
//UX index needs to be displayed as button with color to show condition - green, orange and red levels
//storage search history in local storage and pull it to display on the left panel
//history will retrieve weather forecast on click
