//search bar to pull weather forecast from API
const APIKey = "169cda39df4fc06ddd2b2e7fd2a06986";
let cityName = "Lakewood";
let state = "Denver";
const searchBtn = $("#searchBtn");
var queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName},${state}&appid=${APIKey}`;

searchBtn.click(function() {
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
            // Log the resulting object
            console.log(response);
            //results display in currentweather div with city name, date, icon of weather cond, temp, humidity, wind spped, UV index

            //display 5 days forecast for current city in fiveDayForecast


    });
}


//render search results - current and future conditions and add to history on the left panel
//UX index needs to be displayed as button with color to show condition - green, orange and red levels
//storage search history in local storage and pull it to display on the left panel
//history will retrieve weather forecast on click
