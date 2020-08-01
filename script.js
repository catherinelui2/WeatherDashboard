//search bar to pull weather forecast from API
const APIKey = "166a433c57516f51dfab1f7edaed8413";
let cityName = "";
let cities = [];
const divTag = $("<div>");
const currentDateTime = moment().format("MMM Do YYYY");
const forecast1 = moment().add(1, 'days').format("MMM Do YYYY");
const forecast2 = moment().add(2, 'days').format("MMM Do YYYY");
const forecast3 = moment().add(3, 'days').format("MMM Do YYYY");
const forecast4 = moment().add(4, 'days').format("MMM Do YYYY");
const forecast5 = moment().add(5, 'days').format("MMM Do YYYY");

$("document").ready(function () {
    $("#searchBtn").on("click", function (e) {
        e.preventDefault();
        let city = $("#cityInput").val();
        
        geoInfoCall(city);
    });
});


function geoInfoCall(city) {
    cities.push(city);
    cityName = city;

    let queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIKey}`;

    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        let lat = response.city.coord.lat;
        let lon = response.city.coord.lon;
        let h3 = $('<h3>').addClass('card-title').text(city);        
        $("#currentWeather .card-body").append(h3);
        
    oneCall(lat,lon);
        
});
}

function oneCall(lat, lon) {
    let queryURL =`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&
    exclude=currnet&units=imperial&appid=${APIKey}`;

    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function(response) {
        console.log(response);

        let current = $("<p>").addClass("card-text").text(`Current Weather: ${response.current.temp}°F`);

        // let currentWeather = $("<p>").addClass("card-body").text(`${response.current.weather[0].main} & ${response.current.weather[1].main}`);

        let currentHumidity = $("<p>").addClass("card-text").text(`Humidity: ${response.current.humidity}`);

        let currentWind = $("<p>").addClass("card-text").text(`Wind Speed: ${response.current.wind_speed}`);

        let currentUVI = $("<p>").addClass("card-text").text(`UV Index: ${response.current.uvi}`);

        //forecastOne

    
        $("#currentWeather .card-body").append(currentDateTime, current, currentHumidity, currentWind, currentUVI);

        let forecastOne = $("<h3>").addClass("card-title").text(forecast1);
        
        let forecastOneWeather = $("<p>").addClass("card-text").text(`Temp: ${response.daily[0].temp.day}°F`);

        let forecastOneHumidity = $("<p>").addClass("card-text").text(`Humidity: ${response.daily[0].humidity}`);

        $("#oneDayForecast .card-body").append(forecastOne, forecastOneWeather, forecastOneHumidity);

        //forecastTwo

        let forecastTwo = $("<h3>").addClass("card-title").text(forecast2);
        
        let forecastTwoWeather = $("<p>").addClass("card-text").text(`Temp: ${response.daily[1].temp.day}°F`);

        let forecastTwoHumidity = $("<p>").addClass("card-text").text(`Humidity: ${response.daily[1].humidity}`);

        $("#twoDayForecast .card-body").append(forecastTwo, forecastTwoWeather, forecastTwoHumidity);

        //forecastThree

        let forecastThree = $("<h3>").addClass("card-title").text(forecast3);
        
        let forecastThreeWeather = $("<p>").addClass("card-text").text(`Temp: ${response.daily[2].temp.day}°F`);

        let forecastThreeHumidity = $("<p>").addClass("card-text").text(`Humidity: ${response.daily[2].humidity}`);

        $("#threeDayForecast .card-body").append(forecastThree, forecastThreeWeather, forecastThreeHumidity);

        //forecastFour

        let forecastFour = $("<h3>").addClass("card-title").text(forecast4);
        
        let forecastFourWeather = $("<p>").addClass("card-text").text(`Temp: ${response.daily[3].temp.day}°F`);

        let forecastFourHumidity = $("<p>").addClass("card-text").text(`Humidity: ${response.daily[3].humidity}`);

        $("#fourDayForecast .card-body").append(forecastFour, forecastFourWeather, forecastFourHumidity);

        //Forecast Five

        let forecastFive = $("<h3>").addClass("card-title").text(forecast5);
        
        let forecastFiveWeather = $("<p>").addClass("card-text").text(`Temp: ${response.daily[4].temp.day}°F`);

        let forecastFiveHumidity = $("<p>").addClass("card-text").text(`Humidity: ${response.daily[4].humidity}`);

        $("#fiveDayForecast .card-body").append(forecastFive, forecastFiveWeather, forecastFiveHumidity);











    });
    
}


//geoInfoCall();

// function oneCall() {
//     let lat = JSON.stringify($(".lat").val());
//     console.log(lat);
//     let lon = JSON.stringify($(".lon"));
//     let queryURL =`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&
//     exclude=currnet&appid=${APIKey}`;


//     $.ajax({
//         url: queryURL,
//         method: "GET",
//     }).then(function(response) {
//         console.log(response);




//     });
    
// }

    //results display in currentweather div with city name, date, icon of weather cond, temp, humidity, wind spped, UV index

    //display 5 days forecast for current city in fiveDayForecast









//render search results - current and future conditions and add to history on the left panel
//UX index needs to be displayed as button with color to show condition - green, orange and red levels
//storage search history in local storage and pull it to display on the left panel
//history will retrieve weather forecast on click
