//search bar to pull weather forecast from API
const APIKey = "166a433c57516f51dfab1f7edaed8413";
let cities = [];
const savedCityStorageKey = "savedCities";
let savedCities = JSON.parse(localStorage.getItem(savedCityStorageKey)) || [];

const updateStorage = () => {
    localStorage.setItem(savedCityStorageKey, JSON.stringify(savedCities));
};

const timeFormat = "MMM Do YYYY";

$("document").ready(function () {
    $("#searchBtn").on("click", function (e) {
        e.preventDefault();
        let city = $("#cityInput").val();
        geoInfoCall(city);
    });
});

function renderCityList() {
    const $cityList = $("#cityList .list-group");
    $cityList.empty();
    for (let i = 0; i < cities.length; i++) {
        let citybtn = $("<li>").addClass("btn btn-light border").text(cities[i]);
        citybtn.on("click", function (e) {
            e.preventDefault();
            geoInfoCall(cities[i]);
        });
        $cityList.append(citybtn);
        
    }
}

function geoInfoCall(city) {
    $("#cityInput").val("");
    $("#errors").empty();
    $("#currentWeather .card-body").empty();
    
    let queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}`;

    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        let lat = response.city.coord.lat;
        let lon = response.city.coord.lon;
        let h3 = $('<h3>').addClass('card-title').text(city);        
        $("#currentWeather .card-body").append(h3);
        let cityName = response.city.name;
        if (!cities.includes(cityName)) {
            cities.push(cityName);
            savedCities = cities;
            updateStorage();
        }
        
        renderCityList();
        oneCall(lat,lon);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        let errorAlert = $("<div>").addClass("alert alert-danger").text(jqXHR.responseJSON.message);

        $("#errors").append(errorAlert);
    });
}


function oneCall(lat, lon) {
    // API Documentation https://openweathermap.org/api/one-call-api#example
    let queryURL =`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&
    exclude=currnet&units=imperial&appid=${APIKey}`;

    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function(response) {
        let currentWeather = response.current;
        let currentDateTime = moment.unix(currentWeather.dt).format(timeFormat);
        let current = $("<p>").addClass("card-text").text(`Current Weather: ${currentWeather.temp}°F`);

        let currentWeatherIconID = currentWeather.weather[0].icon;
        let currentWeatherImgURL =`http://openweathermap.org/img/wn/${currentWeatherIconID}@2x.png`;
        
        let currentWeatherIcon = $("<img>").attr("src", currentWeatherImgURL);
        let currentHumidity = $("<p>").addClass("card-text").text(`Humidity: ${currentWeather.humidity}`);
        let currentWind = $("<p>").addClass("card-text").text(`Wind Speed: ${currentWeather.wind_speed}`);
        let currentUVI = $("<p>").addClass("uvi").text(`UV Index: ${currentWeather.uvi}`);

        $("#currentWeather .card-body").append(currentDateTime, currentWeatherIcon, current, currentHumidity, currentWind, currentUVI);

        //UVI Colors
        let uvIndex = currentWeather.uvi;
        if (uvIndex <= 2){
            currentUVI.css("background-color", "green");
        } else if (uvIndex <= 5) {
            currentUVI.css("background-color", "yellow");
        } else if (uvIndex <=6) {
            currentUVI.css("background-color", "orange");
        } else {
            currentUVI.css("background-color", "red");
        }  

        

        //forecast
        const forecastCards = $("#forecastCards");
        forecastCards.empty();
        const dailyForecasts = response.daily;
        const forecastCount = dailyForecasts.length < 5 ? dailyForecasts.length : 5;
        for (let i = 0; i < forecastCount; i++) {
            const dailyForecast = dailyForecasts[i];
            let forecastTimeStamp = moment.unix(dailyForecast.dt).format(timeFormat);
            let forecastWeatherIcon = dailyForecast.weather[0].icon;
            let forecastImgURL =`http://openweathermap.org/img/wn/${forecastWeatherIcon}@2x.png`;

            let forecastTimeStampEl = $("<h4>").addClass("card-title").text(forecastTimeStamp);
            let icon = $("<img>").attr("src", forecastImgURL);
            let forecastTemp = $("<p>").addClass("card-text").text(`Temp: ${dailyForecast.temp.day}°F`);
            let forecastHumidity = $("<p>").addClass("card-text").text(`Humidity: ${dailyForecast.humidity}`);
            
            let forecastCardBody = $("<div>").addClass("card-body");
            forecastCardBody.append(forecastTimeStampEl, icon, forecastTemp, forecastHumidity);

            let forecastCard = $("<div>").addClass("card text-white bg-dark mb-3").css("max-width", "18rem");
            forecastCard.append(forecastCardBody);

            forecastCards.append(forecastCard);
        }
    });
    
}

//render search results - current and future conditions and add to history on the left panel
//UX index needs to be displayed as button with color to show condition - green, orange and red levels
