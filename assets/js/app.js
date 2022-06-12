var cityData = []; 
// need to change array to object for saving data in localstorage
// not finish yet.
var cityData = [{

}];

var cityId = 0;
var searchCityBtn = document.querySelector("#btn-search-city");
var searchCity = document.querySelector("#search-city");
var historyEl = document.querySelector(".history-part");
var btnClearEl = document.querySelector("#btn-clear");
var todayWeatherEl = document.querySelector(".today");

// starting search
function searchCityEl() {
    var city = searchCity.value.toLowerCase();
    if (!city) {
        alert("please enter a city");
    } else {
        cityData.push(city);
        searchCity.value = "";

        searchHistoryEl(city);
        fetchApiData(city);
        savedata();
    }
}

// create search history in historyEl(".history-part")
function searchHistoryEl(info) {
    var cityList = document.createElement("button");
    cityList.classList.add("city-list", "mt-2");
    cityList.setAttribute("data-city-id", cityId);
    cityList.textContent = info;
    historyEl.appendChild(cityList);
    cityId++;
}

// clear search history
function clearHistoryEl() {
    var removeAll = historyEl;

    while (removeAll.hasChildNodes()) {
        removeAll.removeChild(removeAll.firstChild);
    }

    cityData.length = 0;
    // console.log(cityData);
    window.localStorage.clear();
}

// refresh page, load localstorage
function loadsearch() {
    var load = localStorage.getItem("city");
    var loadArr = load.split(",");
    for (var i=0; i<loadArr.length; i++) {
        searchHistoryEl(loadArr[i]);
    }
}

// save search city in localstorage
function savedata() {
    localStorage.setItem("city", cityData);
}

// city, date, & icon
function fetchApiData(city) {
    apiCity = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

    fetch(apiCity).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
            // console.log(data);

            // clear old
            var removeAll = todayWeatherEl;
            while (removeAll.hasChildNodes()) {
                removeAll.removeChild(removeAll.firstChild);
            }
            // get city coordinates
            var cityCoord = data.coord;
            // get date
            var dt = data.dt;
            dt = new Date(dt*1000);
            var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
            var year = dt.getFullYear();
            var month = months[dt.getMonth()];
            var date = dt.getDate();
            var time = month + ' ' + date + ' ' + year;
            // get icon
            // it's wrong, 
            var icon = data.weather[0].icon;
            var iconUrl = `<img src = "http://openweathermap.org/img/wn/${icon}@2x.png" alt = "" />`;
            // display city, date, icon
            // icon does not finish
            var displayCity = document.createElement("h2");
            displayCity.classList.add("city-name");
            displayCity.innerHTML = data.name + " (" + time + ") " + iconUrl;
            todayWeatherEl.appendChild(displayCity);

            fetchApiWeather(cityCoord);
            });        
        } else {
            alert("Error: The City is Not Found");
            removeLastOne();
        }
    }).catch(function(error) {
        alert("Unable to connect to the Weather Dashboard");
    })
}

function fetchApiWeather(cityCoord) {
    apiWeather = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityCoord.lat}&lon=${cityCoord.lon}&exclude=minutely,hourly,alerts,daily&units=metric&appid=${apiKey}`;
    
    fetch(apiWeather)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        // temperature
        var temperatureEl = document.createElement("li");
        temperatureEl.classList.add("today-weather");
        temperatureEl.innerHTML = "<span>Temperature: " + data.current.temp + "&#8451</span>";
        todayWeatherEl.appendChild(temperatureEl);
        // wind speed
        var windSpeedEl = document.createElement("li");
        windSpeedEl.classList.add("today-weather");
        windSpeedEl.textContent = "Wind Speed: " + data.current.wind_speed + "m/s";
        todayWeatherEl.appendChild(windSpeedEl);
        // humidity
        var humidityEl = document.createElement("li");
        humidityEl.classList.add("today-weather");
        humidityEl.textContent = "Humidity: " + data.current.humidity + "%";
        todayWeatherEl.appendChild(humidityEl);
        // UV index
        var uvIndexEl = document.createElement("li");
        uvIndexEl.classList.add("today-weather");
        uvIndexEl.innerHTML = "UV Index: <span class='uv-index'>" + data.current.uvi + "</span>";
        todayWeatherEl.appendChild(uvIndexEl);

        if (data.current.uvi>=0 && data.current.uvi<3) {
            var uvColor = document.querySelector(".uv-index");
            uvColor.classList.add("green");
        } else if (data.current.uvi>=3 && data.current.uvi<6) {
            var uvColor = document.querySelector(".uv-index");
            uvColor.classList.add("yellow");
        } else if (data.current.uvi>=6 && data.current.uvi<8) {
            var uvColor = document.querySelector(".uv-index");
            uvColor.classList.add("orange");
        } else if (data.current.uvi>=8 && data.current.uvi<11) {
            var uvColor = document.querySelector(".uv-index");
            uvColor.classList.add("red");
        } else {
            var uvColor = document.querySelector(".uv-index");
            uvColor.classList.add("violet");
        }
    });
}

// when alert, remove last one record
function removeLastOne() { // not fishish
    var removeLastOne = historyEl;

    if (removeLastOne.hasChildNodes()) {
        removeLastOne.removeChild(removeLastOne.lastChild);
    }

    cityData.pop();
    window.localStorage.removeItem("city");
    // localstorage does not accomplish, it need to delete last one data, not all element.
}





searchCityBtn.addEventListener("click", searchCityEl)
btnClearEl.addEventListener("click", clearHistoryEl)

loadsearch();




// https://api.openweathermap.org/data/2.5/onecall/timemachine?lat={lat}&lon={lon}&dt={time}&appid={API key}
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
// http://api.openweathermap.org/geo/1.0/reverse?lat={lat}&lon={lon}&limit={limit}&appid={API key}
// API key: 4f585493f941e0eeef3857860aa417e6
