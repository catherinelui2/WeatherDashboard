//search bar to pull weather forecast from API
const APIKey = "166a433c57516f51dfab1f7edaed8413";
let cityName = "";
let cities = [];
const currentDateTime = moment().format("MMM Do YYYY");
const forecast1 = moment().add(1, 'days').format("MMM Do");
const forecast2 = moment().add(2, 'days').format("MMM Do");
const forecast3 = moment().add(3, 'days').format("MMM Do");
const forecast4 = moment().add(4, 'days').format("MMM Do");
const forecast5 = moment().add(5, 'days').format("MMM Do");

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

        let currentWeather = response.current.weather[0].icon;
        let imgURL =`http://openweathermap.org/img/wn/${currentWeather}@2x.png`;
        let icon = $("<img>").attr("src", imgURL);

        let currentHumidity = $("<p>").addClass("card-text").text(`Humidity: ${response.current.humidity}`);

        let currentWind = $("<p>").addClass("card-text").text(`Wind Speed: ${response.current.wind_speed}`);

        let currentUVI = $("<p>").addClass("card-text").text(`UV Index: ${response.current.uvi}`);

        $("#currentWeather .card-body").append(currentDateTime, icon, current, currentHumidity, currentWind, currentUVI);

        //forecastOne


        let forecastOne = $("<h4>").addClass("card-title").text(forecast1);

        let forecastOneWeatherIcon = response.daily[0].weather[0].icon;
        let imgURLOne =`http://openweathermap.org/img/wn/${forecastOneWeatherIcon}@2x.png`;
        let iconOne = $("<img>").attr("src", imgURLOne);
        
        let forecastOneWeather = $("<p>").addClass("card-text").text(`Temp: ${response.daily[0].temp.day}°F`);

        let forecastOneHumidity = $("<p>").addClass("card-text").text(`Humidity: ${response.daily[0].humidity}`);

        $("#oneDayForecast .card-body").append(forecastOne, iconOne, forecastOneWeather, forecastOneHumidity);

        //forecastTwo

        let forecastTwo = $("<h4>").addClass("card-title").text(forecast2);

        let forecastTwoWeatherIcon = response.daily[1].weather[0].icon;
        let imgURLTwo =`http://openweathermap.org/img/wn/${forecastTwoWeatherIcon}@2x.png`;
        let iconTwo = $("<img>").attr("src", imgURLTwo);
        
        let forecastTwoWeather = $("<p>").addClass("card-text").text(`Temp: ${response.daily[1].temp.day}°F`);

        let forecastTwoHumidity = $("<p>").addClass("card-text").text(`Humidity: ${response.daily[1].humidity}`);

        $("#twoDayForecast .card-body").append(forecastTwo, iconTwo, forecastTwoWeather, forecastTwoHumidity);

        //forecastThree

        let forecastThree = $("<h4>").addClass("card-title").text(forecast3);

        let forecastThreeWeatherIcon = response.daily[2].weather[0].icon;
        let imgURLThree =`http://openweathermap.org/img/wn/${forecastThreeWeatherIcon}@2x.png`;
        let iconThree = $("<img>").attr("src", imgURLThree);
        
        let forecastThreeWeather = $("<p>").addClass("card-text").text(`Temp: ${response.daily[2].temp.day}°F`);

        let forecastThreeHumidity = $("<p>").addClass("card-text").text(`Humidity: ${response.daily[2].humidity}`);

        $("#threeDayForecast .card-body").append(forecastThree, iconThree, forecastThreeWeather, forecastThreeHumidity);

        //forecastFour

        let forecastFour = $("<h4>").addClass("card-title").text(forecast4);

        let forecastFourWeatherIcon = response.daily[3].weather[0].icon;
        let imgURLFour =`http://openweathermap.org/img/wn/${forecastFourWeatherIcon}@2x.png`;
        let iconFour = $("<img>").attr("src", imgURLFour);
        
        let forecastFourWeather = $("<p>").addClass("card-text").text(`Temp: ${response.daily[3].temp.day}°F`);

        let forecastFourHumidity = $("<p>").addClass("card-text").text(`Humidity: ${response.daily[3].humidity}`);

        $("#fourDayForecast .card-body").append(forecastFour, iconFour, forecastFourWeather, forecastFourHumidity);

        //Forecast Five

        let forecastFive = $("<h4>").addClass("card-title").text(forecast5);

        let forecastFiveWeatherIcon = response.daily[4].weather[0].icon;
        let imgURLFive =`http://openweathermap.org/img/wn/${forecastFiveWeatherIcon}@2x.png`;
        let iconFive = $("<img>").attr("src", imgURLFive);
        
        let forecastFiveWeather = $("<p>").addClass("card-text").text(`Temp: ${response.daily[4].temp.day}°F`);

        let forecastFiveHumidity = $("<p>").addClass("card-text").text(`Humidity: ${response.daily[4].humidity}`);

        $("#fiveDayForecast .card-body").append(forecastFive, iconFive, forecastFiveWeather, forecastFiveHumidity);











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
