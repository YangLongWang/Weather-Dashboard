var cityData = [];
var searchCityBtn = document.querySelector("#btn-search-city");
var searchCity = document.querySelector("#search-city");
var historyEl = document.querySelector(".history-part");
var btnClearEl = document.querySelector("#btn-clear");

// starting search
function searchCityEl() {
    var city = searchCity.value.toLowerCase();
    if (!city) {
        alert("please enter a city");
    } else {
        cityData.push(city);
        searchCity.value = "";

        searchHistoryEl(city);
        getApiSearch()
        savedata();
    }
}

// create search history in historyEl(".history-part")
function searchHistoryEl(info) {
    var cityList = document.createElement("button");
    cityList.classList.add("city-list", "mt-2");
    cityList.textContent = info;
    historyEl.appendChild(cityList);
}

// clear search history
function clearHistoryEl() {
    var remove = historyEl;

    while (remove.hasChildNodes()) {
        remove.removeChild(remove.firstChild);
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

// get API
function getApiSearch() {
    console.log("123");
}








searchCityBtn.addEventListener("click", searchCityEl)
btnClearEl.addEventListener("click", clearHistoryEl)

loadsearch();










// https://api.openweathermap.org/data/2.5/onecall/timemachine?lat={lat}&lon={lon}&dt={time}&appid={API key}
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
// http://api.openweathermap.org/geo/1.0/reverse?lat={lat}&lon={lon}&limit={limit}&appid={API key}
// API key: 4f585493f941e0eeef3857860aa417e6
