# Weather-Dashboard
## Table of contents

- [Overview](#overview)
  - [Purpose](#purpose)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
- [Author](#author)

## Overview

### Purpose
- Seeing the weather outlook for multiple cities, travelers can plan a trip accordingly

### The challenge

Users should be able to:

- search a city to check current weather
- show 5 more days weather forecast
- click a city in search history, then show that weather condition


### Screenshot

![](./assets/images/Weather%20Dashboard%201.png)
![](./assets/images/Weather%20Dashboard%202.png)

### Links

- Solution URL: [https://github.com/YangLongWang/Weather-Dashboard](https://github.com/YangLongWang/Weather-Dashboard)
- Live Site URL: [https://yanglongwang.github.io/Weather-Dashboard/](https://yanglongwang.github.io/Weather-Dashboard/)

## My process

### Build with

- HTML-BOOTSTRAP
- CSS
- JAVASCRIPT

### What I learned

- According to the openweather Api document to set url.
- According api document to find data.

To see how I add code snippets, see below:

```Javascript
apiCity = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
apiWeather = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityCoord.lat}&lon=${cityCoord.lon}&exclude=minutely,hourly,alerts&units=metric&appid=${apiKey}`;
var fiveDaydt = daily[i].dt;
fiveDaydt = new Date(fiveDaydt*1000);
var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
var year = fiveDaydt.getFullYear();
var month = months[fiveDaydt.getMonth()];
var date = fiveDaydt.getDate();
var time = month + ' ' + date + ' ' + year;
var fiveDayIcon = daily[i].weather[0].icon;
var fiveDayTemp = daily[i].temp.day;     
var fiveDayWind = daily[i].wind_speed;
var fiveDayHumidity = daily[i].humidity;
```

## Author

- Github - [Longyang Wang](https://github.com/YangLongWang)