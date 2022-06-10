var cityData = [];
var searchCityBtn = document.querySelector("#btn-search-city");
var searchCity = document.querySelector("#search-city");
var historyEl = document.querySelector(".history-part");

function searchCityEl() {
    var city = searchCity.value.toLowerCase();
    if (!city) {
        alert("please enter a city");
    } else {
        cityData.push(city);
        searchCity.value = "";
        console.log(cityData);

        searchHistoryEl(city);
        savedata();
    }
}

function searchHistoryEl(info) {
    var cityList = document.createElement("button");
    cityList.classList.add("city-list", "mt-2");
    cityList.textContent = info;
    historyEl.appendChild(cityList);
    console.log(historyEl);
}














function savedata() {
    localStorage.setItem("city", cityData);
}

searchCityBtn.addEventListener("click", searchCityEl)













// https://api.openweathermap.org/data/2.5/onecall/timemachine?lat={lat}&lon={lon}&dt={time}&appid={API key}
// API key: 4f585493f941e0eeef3857860aa417e6